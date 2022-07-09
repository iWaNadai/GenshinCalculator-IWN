import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { Character } from "../types"
import { CHARACTERS } from "../Variables/DataFile.js"

export default class CharacterFormComponent extends HTMLElement {
    private character : Character = CHARACTERS[0];
    private level: number = 0
    private rank : number = 0
    
    constructor() {
        super()

        this.render()
    }

    private render(): void {
        this.innerHTML = `
            <div>
                ${CharacterImage()}
                ${CharacterSelector()}
                ${CharacterLevel()}
                ${CharacterRank()}
            </div>
        `

        this.setAttribute('character', (this.querySelector('#Character') as HTMLSelectElement).value)
        this.setAttribute('level', (this.querySelector('#Level') as HTMLSelectElement).value)
        this.setAttribute('rank', (this.querySelector('#Rank') as HTMLSelectElement).value)
    }

    connectedCallback() : void {
        (this.querySelector('#Character') as HTMLSelectElement).onchange = e => {
            this.setAttribute('character', (e.target as HTMLSelectElement).value)
        }

        (this.querySelector('#Level') as HTMLSelectElement).onchange = e => {
            this.setAttribute('level', (e.target as HTMLSelectElement).value)
        }

        (this.querySelector('#Rank') as HTMLSelectElement).onchange = e => {
            this.setAttribute('Rank', (e.target as HTMLSelectElement).value)
        }
    }

    disconnectedCallback() : void {
        (this.querySelector('#Character') as HTMLSelectElement).onchange = null;
        (this.querySelector('#Level') as HTMLSelectElement).onchange = null;
        (this.querySelector('#Rank') as HTMLSelectElement).onchange = null;
    }

    static get observedAttributes() : string[] {
        return ['character','level','rank']
    }

    attributeChangedCallback(name : string, oldValue : string, newValue : string) : void {
        switch (name) {
            case 'character':
                EventDispatcher('Character', changeCharacter(oldValue, newValue))
                CharacterImage(changeCharacter(oldValue, newValue).NewCh)
                this.character = changeCharacter(oldValue, newValue).NewCh as Character
                break;
            case 'level':
                EventDispatcher('CharacterLevel', changeLevel(oldValue, newValue))
                this.level = Number(changeLevel(oldValue, newValue).New)
                break;
            case 'rank':
                EventDispatcher('CharacterRank', changeRank(oldValue, newValue))
                this.rank = Number(changeRank(oldValue, newValue).New)
                break;
        }
    }
    
    get Character() : Character{
        const character = JSON.parse(JSON.stringify(this.character)) as Character

        character.Rank = this.rank;

        const base = character.Stats.Base;
        const bonus = character.Stats.Bonus;

        for (let key in base) {
            base[key] = base[key][this.level]
        }
        for (let key in bonus) {
            bonus[key] = bonus[key][this.level]
        }

        return character
    }
}

//Renderer
function CharacterImage(value? : Character) : string | void {
    if (value) {
        (document.querySelector('iwn-character-form img') as HTMLImageElement).src = value.Image
        return
    }
    
    return `
        <img src="${CHARACTERS[0].Image}">

    `
}
function CharacterSelector() : string | void {
    return `
        <select id="Character">
            ${
                CHARACTERS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')                
            }
        </select>
    `
}
function CharacterLevel() : string | void {
    return `
        <select id="Level">
            ${
                ['1/20','20/20','20/40','40/40','40/50','50/50','50/60','60/60','60/70','70/70','70/80','80/80','80/90','90/90']
                    .map((a,b) => `<option value="${b}">${a}</option>`).join('')
            }
        </select>
    `
}
function CharacterRank() : string | void {
    return `
        <select id="Rank">
            ${
                ['C0','C1','C2','C3','C4','C5','C6'].map((a,b) => `<option value="${b}">${a}</option>`).join('')
            }
        </select>
    `
}

//Attribute Handlers
function changeCharacter(Old : string, New : string) {
    const [OldCh, NewCh] = [Old, New].map(a => CHARACTERS.find(b => b.Name === a))
    
    const WeapTypeChange = OldCh?.Type !== NewCh?.Type

    return {
        NewCh,
        WeapTypeChange
    }
}
function changeLevel(Old : string, New : string) {
    return {
        New
    }
}
function changeRank(Old : string, New : string) {
    return {
        New
    }
}