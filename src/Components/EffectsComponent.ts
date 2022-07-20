import { Character, Effect } from "../types";
import { IHTMLElement } from '../typeGuard.js';
import EFFECTS from "../Variables/Effects.js";
import CharacterFormComponent from "./CharacterComponent.js";
import WeaponFormComponent from "./WeaponComponent.js";

const DEFAULT_EFFECTS = [EFFECTS.find(a => a.name === 'Character State') as Effect,
                         EFFECTS.find(a => a.name === 'Elemental Resonance') as Effect]

export default class EffectsFormComponenet extends HTMLElement implements IHTMLElement {
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
            if (changed === 'Stats') {
                this.bonus = {}
                for (const value of this.effects) {
                    const ARG = (value?.output) ?  value.output() : {}
                    this.setValues(ARG)
                }
            }
            
        })
    }

    disconnectedCallback() : void {
        this.effects.forEach(a => (a.disconnect()))
    }

    private sourceCheck () : (Effect|null)[] {
        const CURRENT_CHARACTER = (document.querySelector('iwn-character-form') as CharacterFormComponent).Character
        const CURRENT_WEAPON = (document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon

        let source : Effect[] = []
        const tmp = ['NormalAttack','ElementalSkill','ElementalBurst'];

        tmp.forEach(a => {
            const PAS = EFFECTS.find(b => b.name === CURRENT_CHARACTER.Talents[a]);
            if (!PAS) return
            
            source.push(PAS)
        })

        if ((CURRENT_CHARACTER.Level as number) >= 2) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Talents['A1Passive']) as Effect
            if (PAS) source.push(PAS)
        }
        if ((CURRENT_CHARACTER.Level as number) >= 8) {
            const PAS = EFFECTS.find(a => a.name === CURRENT_CHARACTER.Talents['A4Passive']) as Effect
            if (PAS) source.push(PAS)
        }

        CURRENT_WEAPON.Passive.forEach(a => {
            const PAS = EFFECTS.find(b => b.name === a) as Effect
            if (PAS) source.push(PAS)
        })

        this.effects = DEFAULT_EFFECTS.concat(source);
        

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