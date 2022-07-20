import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { Character, Weapon } from "../types";
import WEAPONS from "../Variables/Weapons.js";
import { IHTMLElement } from '../typeGuard.js';

export default class WeaponFormComponent extends HTMLElement implements IHTMLElement{
    private weapon : Weapon = WEAPONS[0];
    private level : number = 0;
    private rank : number = 0;
    
    constructor() {
        super()

        this.render()
    }

    private render() : void {
        this.innerHTML = `
            <div>
                ${WeaponImage()}
                ${WeaponSelector()}
                ${WeaponLevel()}
                ${WeaponRank()}
            </div>
        `

        this.setAttribute('weapon', (this.querySelector('#Weapon') as HTMLSelectElement).value)
        this.setAttribute('level', (this.querySelector('#Level') as HTMLSelectElement).value)
        this.setAttribute('rank', (this.querySelector('#Rank') as HTMLSelectElement).value)

    }

    connectedCallback() : void {
        (this.querySelector('#Weapon') as HTMLSelectElement).onchange = e => {
            this.setAttribute('weapon', (e.target as HTMLSelectElement).value)
        };
        (this.querySelector('#Level') as HTMLSelectElement).onchange = e => {
            this.setAttribute('level', (e.target as HTMLSelectElement).value)
        };
        (this.querySelector('#Rank') as HTMLSelectElement).onchange = e => {
            this.setAttribute('rank', (e.target as HTMLSelectElement).value)
        };

        window.addEventListener('gic:Update', e => {
            const event = e as CustomEvent;

            switch (event.detail.changed) {
                case 'Character':
                    if (!event.detail.value.WeapTypeChange) return;

                    WeaponSelector(event.detail.value.NewCh as Character)
                    this.setAttribute('weapon', (this.querySelector('#Weapon') as HTMLSelectElement).value)
                    break;
            }
        })
    }

    disconnectedCallback() : void {
        (this.querySelector('#Weapon') as HTMLSelectElement).onchange = null;
        (this.querySelector('#Level') as HTMLSelectElement).onchange = null;
        (this.querySelector('#Rank') as HTMLSelectElement).onchange = null;
    }

    static get observedAttributes() : string[] {
        return ['weapon','level','rank']
    }

    attributeChangedCallback(name : string, oldValue : string, newValue : string) : void {
        switch (name) {
            case 'weapon':
                WeaponImage(changeWeapon(oldValue,newValue).NewWp)
                this.weapon = changeWeapon(oldValue, newValue).NewWp as Weapon
                EventDispatcher('Weapon', changeWeapon(oldValue, newValue))
                break;
            case 'level':
                this.level = Number(changeLevel(oldValue, newValue).New)
                EventDispatcher('WeaponLevel', changeLevel(oldValue, newValue))
                break;
            case 'rank':
                this.rank = Number(changeRank(oldValue, newValue).New)
                EventDispatcher('WeaponRank', changeLevel(oldValue, newValue))
                break;
        }
    }

    get Weapon() : Weapon {
        const weapon = JSON.parse(JSON.stringify(this.weapon)) as Weapon

        weapon.Rank = this.rank

        const base = weapon.Stats.Base;
        const bonus = weapon.Stats.Bonus;

        for (let key in base) {
            base[key] = base[key][this.level]
        }
        for (let key in bonus) {
            bonus[key] = bonus[key][this.level]
        }

        return weapon
    }
}

//Renderer
function WeaponImage(value? : Weapon) : string | void {
    if (value) {
        (document.querySelector('iwn-weapon-form img') as HTMLImageElement).src = value.Image
    }
    
    return `
        <img src="${WEAPONS[0].Image}">
    `
}
function WeaponSelector(value? : Character) : string | void {
    if (value) {
        (document.querySelector('iwn-weapon-form #Weapon') as HTMLSelectElement).innerHTML = `
            ${
                WEAPONS.filter(a => a.Type === value.Type).map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')
            }
        `
    }

    return `
        <select id="Weapon">
            ${
                WEAPONS.filter(a => a.Type === 'Sword').map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')
            }
        </select>
    `
}
function WeaponLevel() : string | void {
    return `
        <select id="Level">
            ${
                ['1/20','20/20','20/40','40/40','40/50','50/50','50/60','60/60','60/70','70/70','70/80','80/80','80/90','90/90']
                    .map((a,b) => `<option value="${b}">${a}</option>`).join('')
            }
        </select>
    `
}
function WeaponRank() : string | void {
    return `
        <select id="Rank">
            ${
                ['R1','R2','R3','R4','R5']
                    .map((a,b) => `<option value="${b}">${a}</option>`).join('')
            }
        </select>
    `
}

//Attrinute Handlers
function changeWeapon(Old : string, New : string) {
    const [OldWp, NewWp] = [Old,New].map(a => WEAPONS.find(b => b.Name === a))

    return {
        NewWp
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