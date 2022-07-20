import EFFECTS from "../Variables/Effects.js";
const DEFAULT_EFFECTS = [EFFECTS.find(a => a.name === 'Character State'),
    EFFECTS.find(a => a.name === 'Elemental Resonance')];
export default class EffectsFormComponenet extends HTMLElement {
    constructor() {
        super();
        this.effects = DEFAULT_EFFECTS;
        this.bonus = {};
        this.render();
    }
    render(val) {
        if (val) {
            this.effects.forEach(a => (a.disconnect()));
        }
        this.sourceCheck();
        this.innerHTML = `
            <div>
                ${this.effects.map(a => a.formRender()).join('')}
            </div>
        `;
        this.effects.forEach(a => (a.connect()));
    }
    connectedCallback() {
        window.addEventListener('gic:Update', e => {
            var _a;
            const event = e;
            const changed = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.changed;
            if (changed !== 'Effect') {
                this.render(true);
            }
            // this.effects.forEach(a => console.log((a?.output) ?  a.output() : 'undefined'))
            if (changed === 'Stats') {
                this.bonus = {};
                for (const value of this.effects) {
                    const ARG = (value === null || value === void 0 ? void 0 : value.output) ? value.output() : {};
                    this.setValues(ARG);
                }
            }
        });
    }
    disconnectedCallback() {
        this.effects.forEach(a => (a.disconnect()));
    }
    sourceCheck() {
        const CURRENT_CHARACTER = document.querySelector('iwn-character-form').Character;
        const CURRENT_WEAPON = document.querySelector('iwn-weapon-form').Weapon;
        let source = [];
        const tmp = ['NormalAttack', 'ElementalSkill', 'ElementalBurst'];
        tmp.forEach(a => {
            const PAS = EFFECTS.find(b => b.name === CURRENT_CHARACTER.Talents[a]);
            if (!PAS)
                return;
            source.push(PAS);
        });
        if (CURRENT_CHARACTER.Level >= 2) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Talents['A1Passive']);
            if (PAS)
                source.push(PAS);
        }
        if (CURRENT_CHARACTER.Level >= 8) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Talents['A4Passive']);
            if (PAS)
                source.push(PAS);
        }
        CURRENT_WEAPON.Passive.forEach(a => {
            const PAS = EFFECTS.find(b => b.name === a);
            if (PAS)
                source.push(PAS);
        });
        this.effects = DEFAULT_EFFECTS.concat(source);
        return source;
    }
    setValues(obj) {
        Object.keys(obj).forEach(a => {
            this.bonus[a] = obj[a];
        });
    }
    get Bonus() {
        return this.bonus;
    }
}
