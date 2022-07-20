import TALENTS from "../Variables/Talents.js";
import CharacterFormComponent from "./CharacterComponent";
import { Talent } from "../types";
import { IHTMLElement } from '../typeGuard.js';

export default class TalentBoardComponent extends HTMLElement implements IHTMLElement{
    private talents : Talent[] = [];
    
    constructor() {
        super();

        this.render()
    }

    private render() {
        const TALENTTemp : Talent[] = [];

        this.innerHTML = `
            <div>
                ${(()=>{
                    const CHARACTER = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character

                    const CharTalents =  Object.values(CHARACTER.Talents).map(a => {
                        const TLNT = TALENTS.find(b => b.name === a)
                        
                        if (TLNT) {
                            TALENTTemp.push(TLNT)
                            return TLNT.formRender()
                        }
                    })

                    return CharTalents
                })().join('')}
                
            </div>
        `
        this.talents = TALENTTemp
    }

    connectedCallback() {
        this.talents.forEach(a => a.connect())
    }
    
    disconnectedCallback() {
        
    }

    attributechangedCallback(name: string, oldV: string, newV: string) {
        
    }

    private sourceCheck() : void {
        
    }
}