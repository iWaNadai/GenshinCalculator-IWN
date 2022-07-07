import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { ARTIFACT_MAIN_STATS, ARTIFACT_MAIN_STATS_VALUES, ARTIFACT_SETS } from "../Variables/DataFile.js";
export default class ArtifactForm extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('set', ARTIFACT_SETS[0].Name);
        this.Type = this.getAttribute('type');
        this.Set = ARTIFACT_SETS.find(a => a.Name === this.getAttribute('set'));
        this.MainStat = JSON.parse(this.getAttribute('main-stat'));
        this.SubStats = [['HP', 0], ['HP', 0], ['HP', 0], ['HP', 0]];
        this.renderComponent();
    }
    renderComponent() {
        this.innerHTML = `
            <div>
                ${renderImage(this.Type)}
                ${renderSet()}
                ${renderMainStats(this.Type)}
                ${renderSubStats()}
            </div>
        `;
    }
    connectedCallback() {
        this.querySelector('#Set').onchange = e => {
            this.setAttribute('set', e.target.value);
        };
        this.querySelector('#MainStat #Type').onchange = e => {
            let payload = JSON.parse(this.getAttribute('main-stat'));
            payload[0] = e.target.value;
            this.setAttribute('main-stat', JSON.stringify(payload));
        };
        [...this.querySelectorAll('#SubStat #Type')].forEach(a => {
            a.onchange = e => {
                var _a;
                console.log((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList[0], e.target.value);
            };
        });
        [...this.querySelectorAll('#SubStat #Value')].forEach(a => {
            a.onchange = e => {
                var _a;
                console.log((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.classList[0], e.target.value);
            };
        });
    }
    disconnectedCallback() {
        this.querySelector('#Set').onchange = null;
        this.querySelector('#MainStat #Type').onchange = null;
        [...this.querySelectorAll('#SubStat #Type')].forEach(a => {
            a.onchange = null;
        });
        [...this.querySelectorAll('#SubStat #Value')].forEach(a => {
            a.onchange = null;
        });
    }
    static get observedAttributes() {
        return ['set', 'main-stat', 'sub-stat'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a, _b, _c;
        if (oldValue === null && (this.hasAttribute(name)))
            return;
        switch (name) {
            case 'set':
                EventDispatcher(`${this.Type}Set`, changedSet(oldValue, newValue));
                this.Set = (_a = changedSet(oldValue, newValue)) === null || _a === void 0 ? void 0 : _a.set;
                renderImage(this.Type, this.Set);
                break;
            case 'main-stat':
                const oldArray = JSON.parse(oldValue);
                const newArray = JSON.parse(newValue);
                if (oldArray[0] !== newArray[0]) {
                    EventDispatcher(`${this.Type}MainStatType`, changedMainStat(oldArray, newArray));
                    this.MainStat = (_b = changedMainStat(oldArray, newArray)) === null || _b === void 0 ? void 0 : _b.mainStats;
                    renderMainStats(this.Type, this.MainStat[0]);
                }
                else {
                    EventDispatcher(`${this.Type}MainStatValue`, changedMainStat(oldArray, newArray));
                    this.MainStat = (_c = changedMainStat(oldArray, newArray)) === null || _c === void 0 ? void 0 : _c.mainStats;
                }
                break;
        }
    }
}
//Renderers 
function renderImage(type, value) {
    if (value) {
        document.querySelector(`[type="${type}"] img`).src = value.Image[type];
        return;
    }
    return `
        <img src="${ARTIFACT_SETS[0].Image[type]}">
    `;
}
function renderSet() {
    return `
        <select id="Set">
            ${ARTIFACT_SETS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        </select>
    `;
}
function renderMainStats(type, value) {
    if (value) {
        document.querySelector(`[type="${type}"] #MainStat #Value`).innerHTML = `
            ${ARTIFACT_MAIN_STATS_VALUES[value].map(a => `<option value="${a}">${a}</option>`).join('')}
        `;
        return;
    }
    return `
        <span id="MainStat">
            <select id="Type">
                ${ARTIFACT_MAIN_STATS[type].map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <select id="Value">
                ${ARTIFACT_MAIN_STATS_VALUES[(() => {
        switch (type) {
            case 'Flower':
                return 'HP';
            case 'Feather':
                return 'ATK';
            default:
                return 'HP%';
        }
    })()].map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
        </span>
    `;
}
function renderSubStats() {
    return `
        <span id="SubStat" class="0">
            <select id="Type">
                ${['HP', 'ATK', 'DEF', 'HP%', 'ATK%', 'DEF%', 'CriticalRate', 'CriticalDamage', 'ElementalMastery', 'EnergyRecharge']
        .map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <input id="Value" type="number" value="0" min=0 step=".1">
        </span>
        <span id="SubStat" class="1">
            <select id="Type">
                ${['HP', 'ATK', 'DEF', 'HP%', 'ATK%', 'DEF%', 'CriticalRate', 'CriticalDamage', 'ElementalMastery', 'EnergyRecharge']
        .map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <input id="Value" type="number" value="0" min=0 step=".1">
        </span>
        <span id="SubStat" class="2">
            <select id="Type">
                ${['HP', 'ATK', 'DEF', 'HP%', 'ATK%', 'DEF%', 'CriticalRate', 'CriticalDamage', 'ElementalMastery', 'EnergyRecharge']
        .map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <input id="Value" type="number" value="0" min=0 step=".1">
        </span>
        <span id="SubStat" class="3">   
            <select id="Type">
                ${['HP', 'ATK', 'DEF', 'HP%', 'ATK%', 'DEF%', 'CriticalRate', 'CriticalDamage', 'ElementalMastery', 'EnergyRecharge']
        .map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
            <input id="Value" type="number" value="0" min=0 step=".1">
        </span>
    `;
}
//Attribute Handlers
function changedSet(oldValue, newValue) {
    const payload = {
        set: ARTIFACT_SETS.find(a => a.Name === newValue)
    };
    return payload;
}
function changedMainStat(oldValue, newValue) {
    const payload = {
        mainStats: newValue
    };
    return payload;
}
