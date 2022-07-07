import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { Character } from "../types"
import { CHARACTERS } from "../Variables/DataFile.js"

export default class CharacterFormComponent extends HTMLElement {
    private _Character : Character = CHARACTERS[0];
    private _Level: number = 0
    private _Rank : number = 0
    
    constructor() {
        super()

        this.render()
    }

    private render(): void {
        this.innerHTML = `
            <div>
                <img src="${this._Character.Image}">

                <select id="Character">
                    ${
                        CHARACTERS.map(a => `<option value="${a.Name}">${a.Name}</option>`)
                    }
                </select>
                <select id="Level">
                    ${
                        ['1/20','20/20','20/40','40/40','40/50','50/50','50/60','60/60','60/70','70/70','70/80','80/80','80/90','90/90']
                            .map((a,b) => `<option value="${b}">${a}</option>`)
                    }
                </select>
                <select id="Rank">
                    ${
                        ['C0','C1','C2','C3','C4','C5','C6'].map((a,b) => `<option value="${b}">${a}</option>`)
                    }
                </select>
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
    }

    disconnectedCallback() : void {
        (this.querySelector('#Character') as HTMLSelectElement).onchange = null;
        (this.querySelector('#Level') as HTMLSelectElement).onchange = null;
    }

    static get observedAttributes() : string[] {
        return ['character','level','rank']
    }

    attributeChangedCallback(name : string, oldValue : string, newValue : string) : void {
        switch (name) {
            case 'character':
                console.log(oldValue, newValue)
                break;
            case 'level':
                console.log(oldValue, newValue)
                break;
            case 'rank':
                console.log(oldValue, newValue)
                break;
            
        }
    }
    
}