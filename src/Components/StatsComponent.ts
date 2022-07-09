import { Character } from "../types"
import CharacterFormComponent from "./CharacterComponent.js"

const TYPES = ['HP','ATK','DEF','ElementalMastery','EnergyRecharge','CriticalRate','CriticalDamage','HealingBonus','ShieldStrength','AnemoDamage','AnemoResistance','GeoDamage','GeoResistance','ElectroDamage','ElectroResistance',,'DendroDamage','DendroResistance','HydroDamage','HydroResistance','PyroDamage','PyroResistance','CryoDamage','CryoResistance','PhysicalDamage','PhysicalResistance']

export default class StatBoardComponent extends HTMLElement {
    
    
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
function Bases() : string {
    return `
        <ul>
            ${
                TYPES.map(a => {
                    let character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character

                    console.log(character)

                    if (!character.Stats.Base[a as string]) return 0

                    return character.Stats.Base[a as string]
                }).map(a => `<li>${a}</li>`).join('')
            }
        </ul>    
    `
}
function Finals() : string {
    return `
        <ul>
            ${
                TYPES.map(a => {
                    let character = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character as Character

                    console.log(character)

                    if (!character.Stats.Base[a as string]) return 0

                    return character.Stats.Base[a as string]
                }).map(a => `<li>${a}</li>`).join('')
            }
        </ul>    
    `
}