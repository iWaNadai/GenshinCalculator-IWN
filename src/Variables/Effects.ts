import { Character, Weapon, ArtifactSet, Effect} from '../types';
import { EventDispatcher } from '../Helpers/EventDispatcher.js';
import CharacterFormComponent from '../Components/CharacterComponent.js';

export default [
    {
        name : 'Character State',
        id : 'Character-State',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <span>
                        <label for="isShielded">Shielded</label>
                        <input type="checkbox" name="isShielded">
                    </span>
                    <span>
                        <label for="currentHP">currentHP</label>
                        <input type="number" name="currentHP" value="100" step="1" min="1" max="100">
                    </span>
                </div>
            `
        },
        connect() {
            (document.querySelector(`#${this.id} [name="isShielded"]`) as HTMLInputElement).onchange = shieldHandler;
            (document.querySelector(`#${this.id} [name="currentHP"]`) as HTMLInputElement).onchange = currentHPHanlder;

            function shieldHandler(e : Event) {
               EventDispatcher('Effect', {type : 'CharacterState', subType : 'isShielded'}) 
            }
            function currentHPHanlder(e : Event) {
                EventDispatcher('Effect', {type : 'CharacterState', subType : 'currentHP'}) 
            }
        },
        disconnect() {
            (document.querySelector(`#${this.id} [name="isShielded"]`) as HTMLInputElement).onchange = null;
            (document.querySelector(`#${this.id} [name="currentHP"]`) as HTMLInputElement).onchange = null;

        },
    },
    {
        name : 'Elemental Resonance',
        id : 'Elemental-Resonance',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p data-effect_name="Elemental Resistance +15%, \n Physical Resistance +15%"></p>
                    <select id="Selector">
                        ${
                            (()=>{
                                const EFFECT_NAMES : {[key:string]:string} = {
                                    Anemo : 'Impetuous Winds',
                                    Geo : 'Enduring Rock',
                                    Electro : 'High Voltage',
                                    Dendro : 'DENDRO EFFECT NAME HERE',
                                    Hydro : 'Soothing Water',
                                    Pyro : 'Fervent Flames',
                                    Cryo : 'Shattering Ice'
                                }

                                const OPTIONS : string[] = ['Protective Canopy'];

                                const ELEMENT = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character.Element

                                let temp = '';

                                Object.entries(EFFECT_NAMES).forEach(([k,v]) => {
                                    if (temp === '') {
                                        if (k === ELEMENT) {
                                            temp = v
                                        }
                                        else {
                                            temp = `${EFFECT_NAMES[ELEMENT]} & ${v}`
                                        }
                                    }
                                    OPTIONS.push(temp)
                                    temp = ''
                                })

                                return OPTIONS.map(a => `<option value="${a}">${a}</option>`)
                            })().join('')
                        }
                    </select>
                </div>
            `
        },
        connect() {
            (document.querySelector(`#${this.id} #Selector`) as HTMLSelectElement).onchange = handler
            
            const ID = this.id

            function handler(e : Event) {
                let effect : string = '';

                const EFFECT_NAME = (document.querySelector(`#${ID} #Selector`) as HTMLSelectElement).value;

                if (EFFECT_NAME.includes('Protective Canopy')) {
                    effect += 'Elemental Resistance +15%,\nPhysical Resistance +15%,\n'
                } 
                if (EFFECT_NAME.includes('Impetuous Winds')) {
                    effect += 'Move Speed +10%,\nCooldown Reduction +5%,\n';
                } 
                if (EFFECT_NAME.includes('Enduring Rock')) {
                    effect += 'Shield Strength +15%,\nTotal Damage Bonus +15%\n(When Shielded),\n';
                } 
                if (EFFECT_NAME.includes('Soothing Water')) {
                    effect += 'Incoming Healing +30%,\n';
                } 
                if (EFFECT_NAME.includes('Fervent Flames')) {
                    effect += 'ATK% +25%,\n';
                } 

                (document.querySelector(`#${ID} p`) as HTMLElement).dataset.effect_name = effect

                EventDispatcher('Effect', {type : 'ElementalResonance', subType : 'NA'}) 
            }
        },
        disconnect() {
            (document.querySelector(`#${this.id} #Selector`) as HTMLSelectElement).onchange = null
        },
        output() {
            const state : {[key:string]:any} = {}

            const ID = this.id

            const EFFECT_NAME = (document.querySelector(`#${ID} #Selector`) as HTMLSelectElement).value;

                if (EFFECT_NAME.includes('Protective Canopy')) {
                    protectiveCanopy(state)
                } 
                if (EFFECT_NAME.includes('Impetuous Winds')) {
                    impetuousWinds(state)
                } 
                if (EFFECT_NAME.includes('Enduring Rock')) {
                    enduringRock(state)
                } 
                if (EFFECT_NAME.includes('Soothing Water')) {
                    soothingWater(state)
                } 
                if (EFFECT_NAME.includes('Fervent Flames')) {
                    ferventFlames(state)
                }
                if (EFFECT_NAME.includes('Shattering Ice')) {
                    shatteringIce(state)
                }

                function protectiveCanopy(obj : {[key:string]:any}) {
                    obj.AnemoResistance = 15
                    obj.GeoResistance = 15
                    obj.ElectroResistance = 15
                    obj.DendroResistance = 15
                    obj.HydroResistance = 15
                    obj.PyroResistance = 15
                    obj.CryoResistance = 15
                    obj.PhysicalResistance = 15
                }
                function impetuousWinds(obj : {[key:string]:any}) {
                    obj.CooldownReduction = 5;
                    obj.MoveSpeed = 10
                }
                function enduringRock(obj : {[key:string]:any}) {
                    obj.ShieldStrength = 15
                    if ((document.querySelector('#Character-State [name="isShielded"]') as HTMLInputElement).checked) {
                        obj.TotalDamage = 15
                    }
                }
                function soothingWater(obj : {[key:string]:any}) {
                    obj.IncomingHealingBonus = 30
                }
                function ferventFlames(obj : {[key:string]:any}) {
                    obj['ATK%'] = 25
                }
                function shatteringIce(obj : {[key:string]:any}) {
                    console.log('add this next time')
                }

            return state
        }
    },
    {
        name : 'Calcite Might',
        id : 'Calcite-Might',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name }">
                    <p data-effect_name="Burst Damage +25%\n(when enemy is < 50% HP)"></p>
                </div>
            `
        },
        connect() {
            
        },
        disconnect() {
            
        },
        output() {
            const state : {[key:string]:any} = {}

            const CONDITION = parseFloat((document.querySelector(`#Enemy-State [name="currentHP"]`) as HTMLInputElement) ? (document.querySelector(`#Enemy-State [name="currentHP"]`) as HTMLInputElement).value : '100') 

            if ( CONDITION < 50 ) {
                state.BurstDamage = 25;
            }
            return state

        }
    },
    {
        name : 'Homuncular Nature',
        id : 'Homuncular-Nature',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p data-effect_name="Elemental Mastery +125\n(After using Burst)"></p>
                    <span>
                        <label for="usedBurst">Used Burst</label>
                        <input type="checkbox" name="usedBurst">
                    </span>
                </div>
            `
        },
        connect() {
            (document.querySelector(`#${this.id} [name="usedBurst"]`) as HTMLInputElement).onchange = handler

            function handler() {
                EventDispatcher('Effect', {type : 'Homuncular Nature' , subType : 'usedBurst'}) 
            } 
        },
        disconnect() {
            (document.querySelector(`#${this.id} [name="usedBurst"]`) as HTMLInputElement).onchange = null
        },
        output() {
            let state : {[key : string]:any} = {}

            const CONDITION = (document.querySelector(`#${this.id} [name="usedBurst"]`) as HTMLInputElement).checked

            if (CONDITION) {
                state.ElementalMastery = 125;
            }

            return state
        }
    },
    {
        name : '',
        id : '',
        formRender() {
            return ``
        },
        connect() {

        },
        disconnect() {

        }
    }
] as Effect[]