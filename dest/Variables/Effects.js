import { EventDispatcher } from '../Helpers/EventDispatcher.js';
import { types } from './Characters.js';
export default [
    {
        type: 'Effect',
        name: 'Character State',
        id: 'Character-State',
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
            `;
        },
        connect() {
            document.querySelector(`#${this.id} [name="isShielded"]`).onchange = shieldHandler;
            document.querySelector(`#${this.id} [name="currentHP"]`).onchange = currentHPHanlder;
            function shieldHandler(e) {
                EventDispatcher('Effect', { type: 'CharacterState', subType: 'isShielded' });
            }
            function currentHPHanlder(e) {
                EventDispatcher('Effect', { type: 'CharacterState', subType: 'currentHP' });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} [name="isShielded"]`).onchange = null;
            document.querySelector(`#${this.id} [name="currentHP"]`).onchange = null;
        },
    },
    {
        type: 'Effect',
        name: 'Elemental Resonance',
        id: 'Elemental-Resonance',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p>
                        Elemental Resistance <var>+15%</var>, <br> Physical Resistance <var>+15%</var>
                    </p>
                    <select id="Selector">
                        ${(() => {
                const EFFECT_NAMES = {
                    Anemo: 'Impetuous Winds',
                    Geo: 'Enduring Rock',
                    Electro: 'High Voltage',
                    Dendro: 'DENDRO EFFECT NAME HERE',
                    Hydro: 'Soothing Water',
                    Pyro: 'Fervent Flames',
                    Cryo: 'Shattering Ice'
                };
                const OPTIONS = ['Protective Canopy'];
                const ELEMENT = document.querySelector('iwn-character-form').Character.Element;
                let temp = '';
                Object.entries(EFFECT_NAMES).forEach(([k, v]) => {
                    if (temp === '') {
                        if (k === ELEMENT) {
                            temp = v;
                        }
                        else {
                            temp = `${EFFECT_NAMES[ELEMENT]} & ${v}`;
                        }
                    }
                    OPTIONS.push(temp);
                    temp = '';
                });
                return OPTIONS.map(a => `<option value="${a}">${a}</option>`);
            })().join('')}
                    </select>
                </div>
            `;
        },
        connect() {
            document.querySelector(`#${this.id} #Selector`).onchange = handler;
            const ID = this.id;
            function handler(e) {
                let effect = '';
                const EFFECT_NAME = document.querySelector(`#${ID} #Selector`).value;
                if (EFFECT_NAME.includes('Protective Canopy')) {
                    effect += 'Elemental Resistance <var>+15%</var>,<br>Physical Resistance <var>+15%</var>,<br>';
                }
                if (EFFECT_NAME.includes('Impetuous Winds')) {
                    effect += 'Move Speed <var>+10%</var>,<br>Cooldown Reduction <var>+5%</var>,<br>';
                }
                if (EFFECT_NAME.includes('Enduring Rock')) {
                    effect += 'Shield Strength <var>+15%</var>,<br>Total Damage Bonus <var>+15%</var><br>(When Shielded),<br>';
                }
                if (EFFECT_NAME.includes('Soothing Water')) {
                    effect += 'Incoming Healing <var>+30%</var>,<br>';
                }
                if (EFFECT_NAME.includes('Fervent Flames')) {
                    effect += 'ATK% <var>+25%</var>,<br>';
                }
                document.querySelector(`#${ID} p`).innerHTML = effect;
                EventDispatcher('Effect', { type: 'ElementalResonance', subType: 'NA' });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} #Selector`).onchange = null;
        },
        output() {
            const state = {};
            const ID = this.id;
            const EFFECT_NAME = document.querySelector(`#${ID} #Selector`).value;
            if (EFFECT_NAME.includes('Protective Canopy')) {
                protectiveCanopy(state);
            }
            if (EFFECT_NAME.includes('Impetuous Winds')) {
                impetuousWinds(state);
            }
            if (EFFECT_NAME.includes('Enduring Rock')) {
                enduringRock(state);
            }
            if (EFFECT_NAME.includes('Soothing Water')) {
                soothingWater(state);
            }
            if (EFFECT_NAME.includes('Fervent Flames')) {
                ferventFlames(state);
            }
            if (EFFECT_NAME.includes('Shattering Ice')) {
                shatteringIce(state);
            }
            function protectiveCanopy(obj) {
                obj.AnemoResistance = 15;
                obj.GeoResistance = 15;
                obj.ElectroResistance = 15;
                obj.DendroResistance = 15;
                obj.HydroResistance = 15;
                obj.PyroResistance = 15;
                obj.CryoResistance = 15;
                obj.PhysicalResistance = 15;
            }
            function impetuousWinds(obj) {
                obj.CooldownReduction = 5;
                obj.MoveSpeed = 10;
            }
            function enduringRock(obj) {
                obj.ShieldStrength = 15;
                if (document.querySelector('#Character-State [name="isShielded"]').checked) {
                    obj.TotalDamage = 15;
                }
            }
            function soothingWater(obj) {
                obj.IncomingHealingBonus = 30;
            }
            function ferventFlames(obj) {
                obj['ATK%'] = 25;
            }
            function shatteringIce(obj) {
                console.log('add this next time');
            }
            return state;
        }
    },
    {
        type: 'Effect',
        name: 'Calcite Might',
        id: 'Calcite-Might',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p>
                        Transient Blossom Damage\n <var>+25%</var><br>(when enemy is < 50% HP)
                    </p>
                </div>
            `;
        },
        connect() {
        },
        disconnect() {
        },
        output() {
            const state = {};
            const CONDITION = parseFloat(document.querySelector(`#Enemy-State [name="currentHP"]`) ? document.querySelector(`#Enemy-State [name="currentHP"]`).value : '100');
            if (true) {
                state['TransientBlossomDamage'] = 25;
                console.log(state);
            }
            return state;
        }
    },
    {
        type: 'Effect',
        name: 'Homuncular Nature',
        id: 'Homuncular-Nature',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p>
                        Elemental Mastery <var>+125</var><br>(After using Burst)
                    </p>
                    <span>
                        <label for="usedBurst">Used Burst</label>
                        <input type="checkbox" name="usedBurst">
                    </span>
                </div>
            `;
        },
        connect() {
            document.querySelector(`#${this.id} [name="usedBurst"]`).onchange = handler;
            function handler() {
                EventDispatcher('Effect', { type: 'Homuncular Nature', subType: 'usedBurst' });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} [name="usedBurst"]`).onchange = null;
        },
        output() {
            let state = {};
            const CONDITION = document.querySelector(`#${this.id} [name="usedBurst"]`).checked;
            if (CONDITION) {
                state.ElementalMastery = 125;
            }
            return state;
        }
    },
    {
        type: 'Effect',
        name: 'Spotless Heart',
        id: 'Spotless-Heart',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}">
                    <p>
                        Elemental Skill DMG \n<var>+40% DEF</var>
                    </p>
                </div>
            `;
        },
        connect() {
            window.addEventListener('gic:Update', e => {
                const CHANGED = e.detail.changed;
                if (CHANGED === 'Stats') {
                    const REF_RANK = document.querySelector('iwn-weapon-form').Weapon.Rank;
                    const DEF = document.querySelector('iwn-statboard').Final[types.DEF];
                    const VAR = document.querySelector(`#${this.id} p var`);
                    const SCALING = [.4, .5, .6, .7, .8][REF_RANK];
                    VAR.innerHTML = `+${(SCALING * DEF).toFixed(2)}`;
                }
            });
        },
        disconnect() {
        },
        output() {
            let state = {};
            const REF_RANK = document.querySelector('iwn-weapon-form').Weapon.Rank;
            const DEF = document.querySelector('iwn-statboard').Final[types.DEF];
            const VAR = document.querySelector(`#${this.id} p var`);
            const SCALING = [.4, .5, .6, .7, .8][REF_RANK];
            console.log(DEF);
            state.ElementalSkillBoost = parseFloat((SCALING * DEF).toFixed(2));
            return state;
        }
    }
];
