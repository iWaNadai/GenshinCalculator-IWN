import { Artifact, Character, Weapon } from "../types"
import ArtifactFormComponent from "./ArtifactComponent"
import CharacterFormComponent from "./CharacterComponent.js"
import WeaponFormComponent from "./WeaponComponent.js"

const TYPES = ['HP','ATK','DEF','ElementalMastery','EnergyRecharge','CriticalRate','CriticalDamage','HealingBonus','ShieldStrength','AnemoDamage','AnemoResistance','GeoDamage','GeoResistance','ElectroDamage','ElectroResistance',,'DendroDamage','DendroResistance','HydroDamage','HydroResistance','PyroDamage','PyroResistance','CryoDamage','CryoResistance','PhysicalDamage','PhysicalResistance']

export default class StatBoardComponent extends HTMLElement {
    private base : number[] = []
    private final : number[] = []

    
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
            let Artifacts : Artifact[] = Array.from(document.querySelectorAll('iwn-artifact-form')).map(a => (a as ArtifactFormComponent).Artifact)

            Bases([Character, Weapon]);
            Finals(this.base, [Character, Weapon, ...Artifacts]);
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
                            return `<li>${value ?? 0}</li>`;
                        case 'ATK':
                            value = Number(character.Stats.Base.ATK) + Number(weapon.Stats.Base.ATK)
                            return `<li>${value}</li>`;
                        default:
                            value = character.Stats.Base[a as string]
                            return `<li>${value ?? 0}%</li>`
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
function Finals(base? : number[], value?: (Character|Weapon|Artifact)[]) : string | void {
    if (base && value) {
        (document.querySelector('[data-header="FINAL"]') as HTMLElement).innerHTML = `
            <ul>
                ${
                    TYPES.map((val,ind) => {
                        const character = (value[0] as Character)
                        const weapon = (value[1] as Weapon)
                        const artifacts = [...value.slice(2)]

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
                    let character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character

                    if (!character.Stats.Base[a as string]) return 0

                    return character.Stats.Base[a as string]
                }).map(a => `<li>${a}</li>`).join('')
            }
        </ul>    
    `
}


//Calculatr Functions

function Calculator(base : number, flats : number, percents : number) {
    return flats + ((base / 100) * percents)
}