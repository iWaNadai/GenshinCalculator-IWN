import { Character, Effect } from "../types";
import EFFECTS from "../Variables/Effects.js";
import CharacterFormComponent from "./CharacterComponent";

const DEFAULT_EFFECTS = [EFFECTS.find(a => a.name === 'Character State') as Effect,
                         EFFECTS.find(a => a.name === 'Elemental Resonance') as Effect]

export default class EffectsFormComponenet extends HTMLElement {
    private effects : Effect[] = DEFAULT_EFFECTS; 
    private bonus : {[key:string] : any} = {}
    constructor() {
        super()

        this.render()
    }

    private render(val? : true) {
        if (val) {
            this.effects.forEach(a => (a.disconnect()))
        }

        this.sourceCheck();

        this.innerHTML = `
            <div>
                ${
                    this.effects.map(a => a.formRender()).join('')
                }
            </div>
        `

        this.effects.forEach(a => (a.connect()))
    }

    connectedCallback() : void {
        window.addEventListener('gic:Update', e => {
            const event = e as CustomEvent;

            const changed : string = event.detail?.changed

            if (changed !== 'Effect') {
                this.render(true)
            }

            // this.effects.forEach(a => console.log((a?.output) ?  a.output() : 'undefined'))
            this.bonus = {}
            for (const value of this.effects) {
                const ARG = (value?.output) ?  value.output() : {}
                this.setValues(ARG)
            }
        })
    }

    disconnectedCallback() : void {
        this.effects.forEach(a => (a.disconnect()))
    }

    private sourceCheck () : (Effect|null)[] {
        const CURRENT_CHARACTER = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character

        let source : Effect[] = []

        if ((CURRENT_CHARACTER.Level as number) >= 2) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Passives[0]) as Effect
            source.push(PAS)
        }
        if ((CURRENT_CHARACTER.Level as number) >= 8) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Passives[1]) as Effect
            source.push(PAS)
        }

        this.effects = this.effects.concat(source)

        return source
    }

    private setValues (obj : {[key:string]:any}) {        
        Object.keys(obj).forEach(a => {
            this.bonus[a] = obj[a]
        })
    }

    public get Bonus() {
        return this.bonus
    }
}