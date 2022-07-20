import TALENTS from "../Variables/Talents.js";
export default class TalentBoardComponent extends HTMLElement {
    constructor() {
        super();
        this.talents = [];
        this.render();
    }
    render() {
        const TALENTTemp = [];
        this.innerHTML = `
            <div>
                ${(() => {
            const CHARACTER = document.querySelector('iwn-character-form').Character;
            const CharTalents = Object.values(CHARACTER.Talents).map(a => {
                const TLNT = TALENTS.find(b => b.name === a);
                if (TLNT) {
                    TALENTTemp.push(TLNT);
                    return TLNT.formRender();
                }
            });
            return CharTalents;
        })().join('')}
                
            </div>
        `;
        this.talents = TALENTTemp;
    }
    connectedCallback() {
        this.talents.forEach(a => a.connect());
    }
    disconnectedCallback() {
    }
    attributechangedCallback(name, oldV, newV) {
    }
    sourceCheck() {
    }
}
