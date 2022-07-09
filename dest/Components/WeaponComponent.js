import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { WEAPONS } from "../Variables/DataFile.js";
export default class WeaponFormComponent extends HTMLElement {
    constructor() {
        super();
        this.weapon = WEAPONS[0];
        this.level = 0;
        this.rank = 0;
        this.render();
    }
    render() {
        this.innerHTML = `
            <div>
                ${WeaponImage()}
                ${WeaponSelector()}
                ${WeaponLevel()}
                ${WeaponRank()}
            </div>
        `;
        this.setAttribute('weapon', this.querySelector('#Weapon').value);
        this.setAttribute('level', this.querySelector('#Level').value);
        this.setAttribute('rank', this.querySelector('#Rank').value);
    }
    connectedCallback() {
        this.querySelector('#Weapon').onchange = e => {
            this.setAttribute('weapon', e.target.value);
        };
        this.querySelector('#Level').onchange = e => {
            this.setAttribute('level', e.target.value);
        };
        this.querySelector('#Rank').onchange = e => {
            this.setAttribute('rank', e.target.value);
        };
        window.addEventListener('gic:Update', e => {
            const event = e;
            switch (event.detail.changed) {
                case 'Character':
                    if (!event.detail.value.WeapTypeChange)
                        return;
                    WeaponSelector(event.detail.value.NewCh);
                    this.setAttribute('weapon', this.querySelector('#Weapon').value);
                    break;
            }
        });
    }
    disconnectedCallback() {
        this.querySelector('#Weapon').onchange = null;
        this.querySelector('#Level').onchange = null;
        this.querySelector('#Rank').onchange = null;
    }
    static get observedAttributes() {
        return ['weapon', 'level', 'rank'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'weapon':
                EventDispatcher('Weapon', changeWeapon(oldValue, newValue));
                WeaponImage(changeWeapon(oldValue, newValue).NewWp);
                this.weapon = changeWeapon(oldValue, newValue).NewWp;
                break;
            case 'level':
                EventDispatcher('WeaponLevel', changeLevel(oldValue, newValue));
                this.level = Number(changeLevel(oldValue, newValue).New);
                break;
            case 'rank':
                EventDispatcher('WeaponRank', changeLevel(oldValue, newValue));
                this.rank = Number(changeRank(oldValue, newValue).New);
                break;
        }
    }
    get Weapon() {
        const weapon = JSON.parse(JSON.stringify(this.weapon));
        weapon.Rank = this.rank;
        const base = weapon.Stats.Base;
        const bonus = weapon.Stats.Bonus;
        for (let key in base) {
            base[key] = base[key][this.level];
        }
        for (let key in bonus) {
            bonus[key] = bonus[key][this.level];
        }
        return weapon;
    }
}
//Renderer
function WeaponImage(value) {
    if (value) {
        document.querySelector('iwn-weapon-form img').src = value.Image;
    }
    return `
        <img src="${WEAPONS[0].Image}">
    `;
}
function WeaponSelector(value) {
    if (value) {
        document.querySelector('iwn-weapon-form #Weapon').innerHTML = `
            ${WEAPONS.filter(a => a.Type === value.Type).map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        `;
    }
    return `
        <select id="Weapon">
            ${WEAPONS.filter(a => a.Type === 'Sword').map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        </select>
    `;
}
function WeaponLevel() {
    return `
        <select id="Level">
            ${['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
function WeaponRank() {
    return `
        <select id="Rank">
            ${['R1', 'R2', 'R3', 'R4', 'R5']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
//Attrinute Handlers
function changeWeapon(Old, New) {
    const [OldWp, NewWp] = [Old, New].map(a => WEAPONS.find(b => b.Name === a));
    return {
        NewWp
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
