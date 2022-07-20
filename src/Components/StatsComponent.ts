import { EventDispatcher } from "../Helpers/EventDispatcher.js"
import { Artifact, Character, Weapon} from "../types"
import { IHTMLElement } from '../typeGuard.js';
import ArtifactFormComponent from "./ArtifactComponent"
import CharacterFormComponent from "./CharacterComponent.js"
import EffectsFormComponenet from "./EffectsComponent"
import WeaponFormComponent from "./WeaponComponent.js"
import {types} from "./../Variables/Characters.js"

const TYPES = Object.keys(types)
export default class StatBoardComponent extends HTMLElement implements IHTMLElement {
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
            const changed = (e as CustomEvent).detail.changed

            if (changed === 'Stats') {return}

            let Character = (document.querySelector('iwn-weapon-form') as CharacterFormComponent).Character as Character;
            let Weapon = (document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon as Weapon;

            Bases([Character, Weapon]);
            this.base = [...(document.querySelectorAll('[data-header="BASE"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))
            Finals(this.base);
            this.final = [...(document.querySelectorAll('[data-header="FINAL"] li'))].map(a => parseFloat((a as HTMLElement).innerHTML))

            EventDispatcher('Stats', {base : this.base, final : this.Final})
        })
    }
    
    disconnectedCallback() {
        
    }

    public get Final() {
        return JSON.parse(JSON.stringify(this.final))
    }

    public get SecretBonus() {
        const EFFECT_BONUS = (document.querySelector('iwn-effect-form') as EffectsFormComponenet).Bonus
        
        const state : {[key:string]:any} = {}
        Object.keys(EFFECT_BONUS).forEach(a => {
            if (!(a in types)) {
                state[a] = EFFECT_BONUS[a]
            }
        })

        return state
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
                        const effects = (document.querySelector('iwn-effect-form') as EffectsFormComponenet).Bonus

                        const BASE = base

                        const BONUS : {[key:string]:any} = {
                            flat : 0,
                            percent : 0
                        }

                        // console.group('Character')
                        if (character.Stats.Bonus[val]) {
                            // console.log(character.Stats.Bonus)
                            // console.log(character.Stats.Bonus[val] || '0',val)
                            BONUS.flat += character.Stats.Bonus[val] || 0
                        }
                        
                        if (character.Stats.Bonus[`${val}%`]) {
                            // console.log(character.Stats.Bonus)
                            // console.log(character.Stats.Bonus[`${val}%`] || '0',`${val}%`)
                            BONUS.percent += character.Stats.Bonus[`${val}%`] || 0
                        }
                        // console.groupEnd()

                        // console.group('Weapon')
                        if (weapon.Stats.Bonus[val]) {
                            // console.log(weapon.Stats.Bonus)
                            // console.log(weapon.Stats.Bonus[val] || '0', val)
                            BONUS.flat += weapon.Stats.Bonus[val] || 0
                        }
                        if (weapon.Stats.Bonus[`${val}%`]) {
                            // console.log(weapon.Stats.Bonus)
                            // console.log(weapon.Stats.Bonus[`${val}%`] || '0', `${val}%`)
                            BONUS.percent += weapon.Stats.Bonus[`${val}%`] || 0
                        }

                        // console.groupEnd();

                        (artifacts as unknown as Artifact[]).forEach(a => {
                            // console.log(a.Stats)
                            // console.group(a.Type)
                            if (a.Stats[val]) {
                                // console.log(a.Stats)
                                // console.log(a.Stats[val] || '0', val)
                                BONUS.flat += a.Stats[val] || 0
                            }
                            if (a.Stats[`${val}%`]) {
                                // console.log(a.Stats)
                                // console.log(a.Stats[`${val}%`] || '0', `${val}%`)
                                BONUS.percent += a.Stats[`${val}%`] || 0
                            }
                            // console.groupEnd()
                        })

                        // console.group('effects')
                        if (effects[val]) {
                            // console.log(effects)
                            // console.log(effects[val] || '0', val)
                            BONUS.flat += effects[val] || 0
                        }
                        if (effects[`${val}%`]) {
                            // console.log(effects)
                            // console.log(effects[`${val}%`] || '0', val)
                            BONUS.percent += effects[`${val}%`] || 0
                        }
                        // console.groupEnd()

                        switch (val) {
                            case 'HP':
                            case 'ATK':
                            case 'DEF':
                            case 'ElementalMastery':
                                return (Calc(val, BASE[ind], BONUS.flat, BONUS.percent) as number).toFixed(2)
                            default:
                                return `${(Calc(val, BASE[ind], BONUS.flat, BONUS.percent) as number).toFixed(2)}%`
                        }

                    }).map((a,b)=> {
                        switch (parseFloat(a) > base[b]) {
                            case true:
                                return `<li class="increase">${a}</li>`
                            case false:
                                return `<li>${a}</li>`
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
                    let character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character

                    if (!character.Stats.Base[a as string]) return 0

                    return character.Stats.Base[a as string]
                }).map(a => `<li>${a}.00</li>`).join('')
            }
        </ul>    
    `
}


//Calculatr Functions

function Calc(stat : string, base : number, flats : number, percent : number) {
    // console.log(...arguments)
    
    return base + (((base || 1)/100) * percent) + flats
}