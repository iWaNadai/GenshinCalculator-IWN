import { CHARACTERS } from "../Variables/DataFile.js";
export default class CharacterFormComponent extends HTMLElement {
    constructor() {
        super();
        this._Character = CHARACTERS[0];
        this._Level = 0;
        this._Rank = 0;
        this.render();
    }
    render() {
        this.innerHTML = `
            <div>
                <img src="${this._Character.Image}">

                <select id="Character">
                    ${CHARACTERS.map(a => `<option value="${a.Name}">${a.Name}</option>`)}
                </select>
                <select id="Level">
                    ${['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90']
            .map((a, b) => `<option value="${b}">${a}</option>`)}
                </select>
                <select id="Rank">
                    ${['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map((a, b) => `<option value="${b}">${a}</option>`)}
                </select>
            </div>
        `;
        this.setAttribute('character', this.querySelector('#Character').value);
        this.setAttribute('level', this.querySelector('#Level').value);
        this.setAttribute('rank', this.querySelector('#Rank').value);
    }
    connectedCallback() {
        this.querySelector('#Character').onchange = e => {
            this.setAttribute('character', e.target.value);
        };
        this.querySelector('#Level').onchange = e => {
            this.setAttribute('level', e.target.value);
        };
    }
    disconnectedCallback() {
        this.querySelector('#Character').onchange = null;
        this.querySelector('#Level').onchange = null;
    }
    static get observedAttributes() {
        return ['character', 'level', 'rank'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'character':
                console.log(oldValue, newValue);
                break;
            case 'level':
                console.log(oldValue, newValue);
                break;
            case 'rank':
                console.log(oldValue, newValue);
                break;
        }
    }
}
