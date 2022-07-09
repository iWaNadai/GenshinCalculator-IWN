import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { ARTIFACT_MAIN_STATS, ARTIFACT_MAIN_STATS_VALUES, ARTIFACT_SETS } from "../Variables/DataFile.js";
export default class ArtifactFormComponent extends HTMLElement {
    constructor() {
        super();
        this.type = 'Flower';
        this.set = ARTIFACT_SETS[0];
        this.subStat = [['HP', 0],
            ['HP', 0],
            ['HP', 0],
            ['HP', 0]];
        this.type = this.getAttribute('type');
        this.mainStat = (() => {
            switch (this.type) {
                case 'Flower':
                    return ['HP', 717];
                case 'Feather':
                    return ['ATK', 47];
                default:
                    return ['HP%', 7];
            }
        })();
        this.render();
    }
    render() {
        this.innerHTML = `
            <div>
                ${ArtifactImage(this.type)}
                ${ArtifactSet()}
                ${ArtifactMainStat(this.type)}
                ${ArtifactSubStat()}
            </div>
        `;
        this.setAttribute('set', this.querySelector('#Set').value);
        this.setAttribute('main-stat', (JSON.stringify([this.querySelector('#MainStat #Type').value,
            Number(this.querySelector('#MainStat #Value').value)])));
        this.setAttribute('sub-stats', JSON.stringify(this.subStat));
    }
    connectedCallback() {
        this.querySelector('#Set').onchange = e => {
            this.setAttribute('set', e.target.value);
        };
        this.querySelector('#MainStat #Type').onchange = e => {
            const temp = JSON.parse(this.getAttribute('main-stat'));
            temp[0] = e.target.value;
            this.setAttribute('main-stat', JSON.stringify(temp));
        };
        this.querySelector('#MainStat #Value').onchange = e => {
            const temp = JSON.parse(this.getAttribute('main-stat'));
            temp[1] = Number(e.target.value);
            this.setAttribute('main-stat', JSON.stringify(temp));
        };
        [0, 1, 2, 3].forEach(a => {
            this.querySelector(`#ss${a} select`).onchange = e => {
                const order = a;
                const tempArray = (() => {
                    let b = JSON.parse(JSON.stringify(this.subStat));
                    b[order][0] = e.target.value;
                    return JSON.stringify(b);
                })();
                this.setAttribute('sub-stats', tempArray);
            };
            this.querySelector(`#ss${a} input`).onchange = e => {
                const order = a;
                const tempArray = (() => {
                    let b = JSON.parse(JSON.stringify(this.subStat));
                    b[order][1] = Number(e.target.value);
                    return JSON.stringify(b);
                })();
                this.setAttribute('sub-stats', tempArray);
            };
        });
    }
    diconnectedCallback() {
        this.querySelector('#Set').onchange = null;
        this.querySelector('#MainStat #Type').onchange = null;
        this.querySelector('#MainStat #Value').onchange = null;
    }
    static get observedAttributes() {
        return ['set', 'main-stat', 'sub-stats'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === null && this.hasAttribute(name))
            return;
        switch (name) {
            case 'set':
                EventDispatcher(`${this.type}Set`, changeSet(oldValue, newValue));
                ArtifactImage(this.type, changeSet(oldValue, newValue).NewSt);
                this.set = changeSet(oldValue, newValue).NewSt;
                break;
            case 'main-stat':
                EventDispatcher(`${this.type}MainStat`, changeMainStat(oldValue, newValue));
                if (changeMainStat(oldValue, newValue).TypeChange) {
                    ArtifactMainStat(this.type, changeMainStat(oldValue, newValue).NewMS[0]);
                }
                this.mainStat = changeMainStat(oldValue, newValue).NewMS;
                break;
            case 'sub-stats':
                EventDispatcher(`${this.type}SubStat`, changeSubStat(oldValue, newValue));
                this.subStat = changeSubStat(oldValue, newValue).NewSS;
                break;
        }
    }
    get Artifact() {
        const artifact = {
            Set: this.set.Name,
            Type: this.type,
            MainStat: this.mainStat,
            SubStat: this.subStat
        };
        return artifact;
    }
}
//Renderer
function ArtifactImage(type, value) {
    if (value) {
        document.querySelector(`[type="${type}"] img`).src = value.Image[type];
        return;
    }
    return `
        <img src="${ARTIFACT_SETS[0].Image[type]}">
    `;
}
function ArtifactSet() {
    return `
        <select id="Set">
            ${ARTIFACT_SETS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        </select>
    `;
}
function ArtifactMainStat(type, value) {
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
                ${ARTIFACT_MAIN_STATS_VALUES[ARTIFACT_MAIN_STATS[type][0]].map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
        </span>
    `;
}
function ArtifactSubStat() {
    return `
        ${[0, 1, 2, 3].map(a => `
                <span id="ss${a}">
                    <select>
                        ${['HP', 'ATK', 'DEF', 'HP%', 'ATK%', 'DEF%', 'EnergyRecharge', 'ElementalMastery', 'CriticalRate', 'CriticalDamage']
        .map(b => `<option value="${b}">${b}</option>`).join('')}
                    </select>
                    <input type="number" step="0.1" min="0" value="0">
                </span>
            `).join('')}
    `;
}
//Attribute Handlers
function changeSet(Old, New) {
    const NewSt = ARTIFACT_SETS.find(b => b.Name === New);
    return {
        NewSt
    };
}
function changeMainStat(Old, New) {
    const [OldMS, NewMS] = [Old, New].map(a => JSON.parse(a));
    return {
        NewMS,
        TypeChange: OldMS[0] !== NewMS[0]
    };
}
function changeSubStat(Old, New) {
    const [OldSS, NewSS] = [Old, New].map(a => JSON.parse(a));
    return {
        NewSS
    };
}
