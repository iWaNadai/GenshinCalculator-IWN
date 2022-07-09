const TYPES = ['HP', 'ATK', 'DEF', 'ElementalMastery', 'EnergyRecharge', 'CriticalRate', 'CriticalDamage', 'HealingBonus', 'ShieldStrength', 'AnemoDamage', 'AnemoResistance', 'GeoDamage', 'GeoResistance', 'ElectroDamage', 'ElectroResistance', , 'DendroDamage', 'DendroResistance', 'HydroDamage', 'HydroResistance', 'PyroDamage', 'PyroResistance', 'CryoDamage', 'CryoResistance', 'PhysicalDamage', 'PhysicalResistance'];
export default class StatBoardComponent extends HTMLElement {
    constructor() {
        super();
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
function Bases() {
    return `
        <ul>
            ${TYPES.map(a => {
        let character = document.querySelector('iwn-character-form').Character;
        console.log(character);
        if (!character.Stats.Base[a])
            return 0;
        return character.Stats.Base[a];
    }).map(a => `<li>${a}</li>`).join('')}
        </ul>    
    `;
}
function Finals() {
    return `
        <ul>
            ${TYPES.map(a => {
        let character = document.querySelector('iwn-character-form').Character;
        console.log(character);
        if (!character.Stats.Base[a])
            return 0;
        return character.Stats.Base[a];
    }).map(a => `<li>${a}</li>`).join('')}
        </ul>    
    `;
}
