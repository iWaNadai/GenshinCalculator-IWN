import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import CHARACTERS from "../Variables/Characters.js";
export default class CharacterFormComponent extends HTMLElement {
    constructor() {
        super();
        this.character = CHARACTERS[0];
        this.level = 0;
        this.rank = 0;
        this.render();
    }
    render() {
        this.innerHTML = `
            <div>
                ${CharacterImage()}
                ${CharacterSelector()}
                ${CharacterLevel()}
                ${CharacterRank()}
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
        this.querySelector('#Rank').onchange = e => {
            this.setAttribute('Rank', e.target.value);
        };
    }
    disconnectedCallback() {
        this.querySelector('#Character').onchange = null;
        this.querySelector('#Level').onchange = null;
        this.querySelector('#Rank').onchange = null;
    }
    static get observedAttributes() {
        return ['character', 'level', 'rank'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'character':
                CharacterImage(changeCharacter(oldValue, newValue).NewCh);
                this.character = changeCharacter(oldValue, newValue).NewCh;
                EventDispatcher('Character', changeCharacter(oldValue, newValue));
                break;
            case 'level':
                this.level = Number(changeLevel(oldValue, newValue).New);
                EventDispatcher('CharacterLevel', changeLevel(oldValue, newValue));
                break;
            case 'rank':
                this.rank = Number(changeRank(oldValue, newValue).New);
                EventDispatcher('CharacterRank', changeRank(oldValue, newValue));
                break;
        }
    }
    get Character() {
        const character = JSON.parse(JSON.stringify(this.character));
        character.Rank = this.rank;
        character.Level = this.level;
        const base = character.Stats.Base;
        const bonus = character.Stats.Bonus;
        for (let key in base) {
            base[key] = base[key][this.level];
        }
        for (let key in bonus) {
            bonus[key] = bonus[key][this.level];
        }
        return character;
    }
}
//Renderer
function CharacterImage(value) {
    if (value) {
        document.querySelector('iwn-character-form img').src = value.Image;
        return;
    }
    return `
        <img src="${CHARACTERS[0].Image}">

    `;
}
function CharacterSelector() {
    return `
        <select id="Character">
            ${CHARACTERS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        </select>
    `;
}
function CharacterLevel() {
    return `
        <select id="Level">
            ${['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
function CharacterRank() {
    return `
        <select id="Rank">
            ${['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'].map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
//Attribute Handlers
function changeCharacter(Old, New) {
    const [OldCh, NewCh] = [Old, New].map(a => CHARACTERS.find(b => b.Name === a));
    const WeapTypeChange = (OldCh === null || OldCh === void 0 ? void 0 : OldCh.Type) !== (NewCh === null || NewCh === void 0 ? void 0 : NewCh.Type);
    return {
        NewCh,
        WeapTypeChange
    };
}
function changeLevel(Old, New) {
    return {
        New
    };
}
function changeRank(Old, New) {
    return {
        New
    };
}
