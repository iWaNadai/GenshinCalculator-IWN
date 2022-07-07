import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { CHARACTERS } from "../Variables/DataFile.js";
export default class CharacterForm extends HTMLElement {
    constructor() {
        super();
        this.listenedEvents = [''];
        this.setAttribute('character', 'Albedo');
        this.setAttribute('level', `0`);
        this.setAttribute('rank', `0`);
        this.Character = CHARACTERS.find(a => a.Name === this.getAttribute('character'));
        this.Level = Number(this.getAttribute('level'));
        this.Rank = Number(this.getAttribute('rank'));
        this.renderComponent();
    }
    renderComponent() {
        this.innerHTML = `
            <div>
                ${renderImage()}
                ${renderSelector()}
                ${renderLevel()}
                ${renderRank()}
            </div>
        `;
    }
    connectedCallback() {
        this.querySelector('#Selector').onchange = e => {
            this.setAttribute('character', e.target.value);
        };
        this.querySelector('#Level').onchange = e => {
            this.setAttribute('level', e.target.value);
        };
        this.querySelector('#Rank').onchange = e => {
            this.setAttribute('rank', e.target.value);
        };
    }
    disconnectedCallback() {
        this.querySelector('#Selector').onchange = null;
        this.querySelector('#Level').onchange = null;
        this.querySelector('#Rank').onchange = null;
    }
    static get observedAttributes() {
        return ['character', 'level', 'rank'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a, _b, _c;
        if (oldValue === null && (this.hasAttribute(name)))
            return;
        switch (name) {
            case 'character':
                EventDispatcher('Character', changedCharacter(oldValue, newValue));
                this.Character = (_a = changedCharacter(oldValue, newValue)) === null || _a === void 0 ? void 0 : _a.character;
                renderImage(this.Character);
                break;
            case 'level':
                EventDispatcher('CharacterLevel', changedLevel(oldValue, newValue));
                this.Level = (_b = changedLevel(oldValue, newValue)) === null || _b === void 0 ? void 0 : _b.level;
                break;
            case 'rank':
                EventDispatcher('CharacterRank', changedRank(oldValue, newValue));
                this.Rank = (_c = changedRank(oldValue, newValue)) === null || _c === void 0 ? void 0 : _c.rank;
                break;
        }
    }
}
//Renderers
function renderImage(value) {
    if (value) {
        document.querySelector('iwn-character-form img').src = value.Image;
        return;
    }
    return `
        <img src="${CHARACTERS[0].Image}">
    `;
}
function renderSelector() {
    return `
        <select id="Selector">
            ${CHARACTERS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        </select>
    `;
}
function renderLevel() {
    return `
        <select id="Level">
            ${['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
function renderRank() {
    return `
        <select id="Rank">
            ${['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
//Attribute Handlers
function changedCharacter(oldValue, newValue) {
    const Old = CHARACTERS.find(a => a.Name === oldValue);
    const New = CHARACTERS.find(a => a.Name === newValue);
    const payload = {
        weaponTypeChanged: !(Old.Type === New.Type),
        character: New
    };
    return payload;
}
function changedLevel(oldValue, newValue) {
    const payload = {
        level: Number(newValue)
    };
    return payload;
}
function changedRank(oldValue, newValue) {
    const payload = {
        rank: Number(newValue)
    };
    return payload;
}
