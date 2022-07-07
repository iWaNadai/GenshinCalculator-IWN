import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { WEAPONS } from "../Variables/DataFile.js";
export default class WeaponForm extends HTMLElement {
    constructor() {
        super();
        this.listenedEvents = ['Character'];
        this.setAttribute(`weapon`, `Cinnabar Spindle`);
        this.setAttribute(`level`, `0`);
        this.setAttribute(`rank`, `0`);
        this.Weapon = WEAPONS.find(a => a.Name === this.getAttribute('weapon'));
        this.Level = Number(this.getAttribute('level'));
        this.Rank = Number(this.getAttribute('rank'));
        this.renderComponent();
    }
    renderComponent() {
        this.innerHTML = `
            <div>
                ${renderImage()}
                ${renderSelector()}
                ${renderLevel()}
                ${renderRank()}
            </div>
        `;
    }
    connectedCallback() {
        this.querySelector('#Selector').onchange = e => {
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
                    if (!(event.detail.value.weaponTypeChanged))
                        return;
                    renderSelector(event.detail.value.character);
                    this.setAttribute('weapon', this.querySelector('#Selector').value);
                    break;
            }
        });
    }
    disconnectedCallback() {
        this.querySelector('#Selector').onchange = null;
        this.querySelector('#Level').onchange = null;
        this.querySelector('#Rank').onchange = null;
    }
    static get observedAttributes() {
        return ['weapon', 'level', 'rank'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a, _b, _c, _d;
        if (oldValue === null && (this.hasAttribute(name)))
            return;
        switch (name) {
            case 'weapon':
                EventDispatcher('Weapon', changedWeapon(oldValue, newValue));
                this.Weapon = (_a = changedWeapon(oldValue, newValue)) === null || _a === void 0 ? void 0 : _a.weapon;
                renderImage((_b = changedWeapon(oldValue, newValue)) === null || _b === void 0 ? void 0 : _b.weapon);
                break;
            case 'level':
                EventDispatcher('WeaponLevel', changedLevel(oldValue, newValue));
                this.Level = (_c = changedLevel(oldValue, newValue)) === null || _c === void 0 ? void 0 : _c.level;
                break;
            case 'rank':
                EventDispatcher('WeaponRank', changedRank(oldValue, newValue));
                this.Rank = (_d = changedRank(oldValue, newValue)) === null || _d === void 0 ? void 0 : _d.rank;
                break;
        }
    }
}
//Renderers
function renderImage(value) {
    if (value) {
        document.querySelector('iwn-weapon-form img').src = value.Image;
        return;
    }
    return `
        <img src="${WEAPONS[0].Image}">
    `;
}
function renderSelector(value) {
    if (value) {
        document.querySelector('iwn-weapon-form #Selector').innerHTML = `
            ${WEAPONS.filter(a => a.Type === value.Type).map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')}
        `;
        return;
    }
    return `
        <select id="Selector">
            ${WEAPONS.filter(a => a.Type === 'Sword')
        .map(a => `<option value="${a.Name}">${a.Name}</option>`)}
        </select>
    `;
}
function renderLevel() {
    return `
        <select id="Level">
            ${['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
function renderRank() {
    return `
        <select id="Rank">
            ${['R1', 'R2', 'R3', 'R4', 'R5']
        .map((a, b) => `<option value="${b}">${a}</option>`).join('')}
        </select>
    `;
}
//Attribute Handlers
function changedWeapon(oldValue, newValue) {
    const payload = {
        weapon: WEAPONS.find(a => a.Name === newValue)
    };
    return payload;
}
function changedLevel(oldValue, newValue) {
    const payload = {
        level: Number(newValue)
    };
    return payload;
}
function changedRank(oldValue, newValue) {
    const payload = {
        rank: Number(newValue)
    };
    return payload;
}
