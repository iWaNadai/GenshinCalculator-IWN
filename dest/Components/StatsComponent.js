const TYPES = ['HP', 'ATK', 'DEF', 'ElementalMastery', 'EnergyRecharge', 'CriticalRate', 'CriticalDamage', 'HealingBonus', 'ShieldStrength', 'AnemoDamage', 'AnemoResistance', 'GeoDamage', 'GeoResistance', 'ElectroDamage', 'ElectroResistance', , 'DendroDamage', 'DendroResistance', 'HydroDamage', 'HydroResistance', 'PyroDamage', 'PyroResistance', 'CryoDamage', 'CryoResistance', 'PhysicalDamage', 'PhysicalResistance'];
export default class StatBoardComponent extends HTMLElement {
    constructor() {
        super();
        this.base = [];
        this.final = [];
        this.render();
    }
    render() {
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
        `;
        this.base = [...(document.querySelectorAll('[data-header="BASE"] li'))].map(a => parseFloat(a.innerHTML));
        this.final = [...(document.querySelectorAll('[data-header="FINAL"] li'))].map(a => parseFloat(a.innerHTML));
    }
    connectedCallback() {
        window.addEventListener('gic:Update', e => {
            let Character = document.querySelector('iwn-character-form').Character;
            let Weapon = document.querySelector('iwn-weapon-form').Weapon;
            let Artifacts = Array.from(document.querySelectorAll('iwn-artifact-form')).map(a => a.Artifact);
            Bases([Character, Weapon]);
            Finals(this.base, [Character, Weapon, ...Artifacts]);
        });
    }
}
//Renderers 
function Types() {
    return `
        <ul>
            ${TYPES.map(a => `<li>${a}</li>`).join('')}
        </ul>
    `;
}
function Bases(value) {
    if (value) {
        document.querySelector('[data-header="BASE"]').innerHTML = `
        <ul>
            ${TYPES.map(a => {
            const character = document.querySelector('iwn-character-form').Character;
            const weapon = document.querySelector('iwn-weapon-form').Weapon;
            let value;
            switch (a) {
                case 'HP':
                case 'DEF':
                case 'ElementalMastery':
                    value = character.Stats.Base[a];
                    return `<li>${value !== null && value !== void 0 ? value : 0}</li>`;
                case 'ATK':
                    value = Number(character.Stats.Base.ATK) + Number(weapon.Stats.Base.ATK);
                    return `<li>${value}</li>`;
                default:
                    value = character.Stats.Base[a];
                    return `<li>${value !== null && value !== void 0 ? value : 0}%</li>`;
            }
        }).join('')}
        </ul>    
    `;
        return;
    }
    return `
        <ul>
            ${TYPES.map(a => {
        switch (a) {
            case 'HP':
            case 'DEF':
            case 'ElementalMastery':
                return `<li>${0}</li>`;
            case 'ATK':
                return `<li>${0}</li>`;
            default:
                return `<li>${0}%</li>`;
        }
    }).join('')}
        </ul>  
    `;
}
function Finals(base, value) {
    if (base && value) {
        document.querySelector('[data-header="FINAL"]').innerHTML = `
            <ul>
                ${TYPES.map((val, ind) => {
            const character = value[0];
            const weapon = value[1];
            const artifacts = [...value.slice(2)];
        }).join('')}
            </ul>
        `;
        return;
    }
    return `
        <ul>
            ${TYPES.map(a => {
        let character = document.querySelector('iwn-character-form').Character;
        if (!character.Stats.Base[a])
            return 0;
        return character.Stats.Base[a];
    }).map(a => `<li>${a}</li>`).join('')}
        </ul>    
    `;
}
//Calculatr Functions
function Calculator(base, flats, percents) {
    return flats + ((base / 100) * percents);
}
