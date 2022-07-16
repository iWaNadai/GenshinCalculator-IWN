import { Artifact, Character, Weapon } from "../types"
import ArtifactFormComponent from "./ArtifactComponent"
import CharacterFormComponent from "./CharacterComponent.js"
import WeaponFormComponent from "./WeaponComponent.js"

const TYPES : string[] = ['HP','ATK','DEF','ElementalMastery','EnergyRecharge','CriticalRate','CriticalDamage','HealingBonus','ShieldStrength','AnemoDamage','AnemoResistance','GeoDamage','GeoResistance','ElectroDamage','ElectroResistance','DendroDamage','DendroResistance','HydroDamage','HydroResistance','PyroDamage','PyroResistance','CryoDamage','CryoResistance','PhysicalDamage','PhysicalResistance'] as string[]

export default class StatBoardComponent extends HTMLElement {
    public base : number[] = []
    public final : number[] = []
    
    constructor() {
        super()

        this.render()
    }

    private render() {
        this.innerHTML = `
            <div id="Type" data-header="TYPE">
                ${Types()}
            </div>
            <div id="Base" data-header="BASE">
                ${Bases()}
            </div>
            <div id="Final" data-header="FINAL">
                ${Finals()}
            </div>
        `

        this.base = [...(document.querySelectorAll('[data-header="BASE"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))
        this.final = [...(document.querySelectorAll('[data-header="FINAL"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))
    }

    connectedCallback() {
        window.addEventListener('gic:Update', e => {
            let Character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character;
            let Weapon = (document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon as Weapon;

            Bases([Character, Weapon]);
            this.base = [...(document.querySelectorAll('[data-header="BASE"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))
            Finals(this.base);
            this.final = [...(document.querySelectorAll('[data-header="FINAL"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))

        })
    }
}

//Renderers 
function Types() : string {
    return `
        <ul>
            ${TYPES.map(a => `<li>${a}</li>`).join('')}
        </ul>
    `
}
function Bases(value? : [Character, Weapon]) : string | void {
    if (value) {
        (document.querySelector('[data-header="BASE"]') as HTMLElement).innerHTML = `
        <ul>
            ${
                TYPES.map(a => {
                    const character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character;
                    const weapon = (document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon as Weapon;
                    
                    let value;

                    switch (a) {
                        case 'HP':
                        case 'DEF':
                        case 'ElementalMastery':
                            value = character.Stats.Base[a]
                            return `<li>${((value ?? 0) as number).toFixed(2)}</li>`;
                        case 'ATK':
                            value = Number(character.Stats.Base.ATK) + Number(weapon.Stats.Base.ATK)
                            return `<li>${(value).toFixed(2)}</li>`;
                        default:
                            value = character.Stats.Base[a as string]
                            return `<li>${((value ?? 0) as number).toFixed(2)}%</li>`
                    }
                    
                }).join('')
            }
        </ul>    
    `
        return 
    }
    return `
        <ul>
            ${
                TYPES.map(a => {
                    switch (a) {
                        case 'HP':
                        case 'DEF':
                        case 'ElementalMastery':
                            return `<li>${0}</li>`
                        case 'ATK':
                            return `<li>${0}</li>`
                        default:
                            return `<li>${0}%</li>`
                    }
                }).join('')
            }
        </ul>  
    `
}
function Finals(base? : number[]) : string | void {
    if (base) {
        (document.querySelector('[data-header="FINAL"]') as HTMLElement).innerHTML = `
            <ul>
                ${
                    TYPES.map((val,ind) => {
                        const character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character
                        const weapon = (document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon
                        const artifacts = Array.from(document.querySelectorAll('iwn-artifact-form')).map(a => (a as ArtifactFormComponent).Artifact)

                        const BASE = base

                        const BONUS : {[key:string]:any} = {
                            flat : 0,
                            percent : 0
                        }

                        console.group('Character')
                        if (character.Stats.Bonus[val]) {
                            console.log(character.Stats.Bonus)
                            console.log(character.Stats.Bonus[val] || '0',val)
                            BONUS.flat += character.Stats.Bonus[val] || 0
                        }
                        
                        if (character.Stats.Bonus[`${val}%`]) {
                            console.log(character.Stats.Bonus)
                            console.log(character.Stats.Bonus[`${val}%`] || '0',`${val}%`)
                            BONUS.percent += character.Stats.Bonus[`${val}%`] || 0
                        }
                        console.groupEnd()

                        console.group('Weapon')
                        if (weapon.Stats.Bonus[val]) {
                            console.log(weapon.Stats.Bonus)
                            console.log(weapon.Stats.Bonus[val] || '0', val)
                            BONUS.flat += weapon.Stats.Bonus[val] || 0
                        }
                        if (weapon.Stats.Bonus[`${val}%`]) {
                            console.log(weapon.Stats.Bonus)
                            console.log(weapon.Stats.Bonus[`${val}%`] || '0', `${val}%`)
                            BONUS.percent += weapon.Stats.Bonus[`${val}%`] || 0
                        }

                        console.groupEnd();

                        (artifacts as unknown as Artifact[]).forEach(a => {
                            console.group(a.Type)
                            if (a.Stats[val]) {
                                console.log(a.Stats)
                                console.log(a.Stats[val] || '0', val)
                                BONUS.flat += a.Stats[val] || 0
                            }
                            if (a.Stats[`${val}%`]) {
                                console.log(a.Stats)
                                console.log(a.Stats[`${val}%`] || '0', `${val}%`)
                                BONUS.percent += a.Stats[`${val}%`] || 0
                            }
                            console.groupEnd()
                        })

                        switch (val) {
                            case 'HP':
                            case 'ATK':
                            case 'DEF':
                            case 'ElementalMastery':
                                return (Calc(val, BASE[ind], BONUS.flat, BONUS.percent) as number).toFixed(2)
                            default:
                                return `${(Calc(val, BASE[ind], BONUS.flat, BONUS.percent) as number).toFixed(2)}%`
                        }

                    }).map(a => `<li>${a}</li>`).join('')
                }
            </ul>
        `
        return 
    }
    
    return `
        <ul>
            ${
                TYPES.map(a => {
                    let character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character

                    if (!character.Stats.Base[a as string]) return 0

                    return character.Stats.Base[a as string]
                }).map(a => `<li>${a}.00</li>`).join('')
            }
        </ul>    
    `
}


//Calculatr Functions

function Calculator(base : number, flats : number, percents : number) {
    return flats + ((base / 100) * percents)
}

function Calc(stat : string, base : number, flats : number, percent : number) {
    console.log(...arguments)
    
    return base + (((base || 1)/100) * percent) + flats
}