import { AppState } from "../App.js";
import { iwnQ, stateChange } from "../Helper.js";
import WeaponMap from "../Variables/Weapons.js";
import CharacterMap from "../Variables/Characters.js";
export default class WeaponForm extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = ['characterSelected', 'weaponSelected'];
        this.renderElement();
    }
    renderElement(state, prevVal, newVal) {
        var _a, _b;
        if (state) {
            const WeaponSelector = iwnQ(`${WeaponForm.tag} #WeaponSelector`).index(0);
            const WeaponImage = iwnQ(`${WeaponForm.tag} #WeaponImage`).index(0);
            switch (state) {
                case 'characterSelected':
                    const [prev, newv] = [prevVal, newVal].map(a => { var _a; return (_a = CharacterMap.get(a)) === null || _a === void 0 ? void 0 : _a.Type; });
                    if (prev === newv)
                        return;
                    WeaponSelector.innerHTML = `
                        ${Array.from(WeaponMap.values())
                        .filter(a => a.Type === newv)
                        .map(a => a.Name)
                        .map(a => `<option value="${a}">${a}</option>`)
                        .join('')}
                        `;
                    this.Weapon = WeaponSelector.value;
                    break;
                case 'weaponSelected':
                    WeaponImage.src = (_a = WeaponMap.get(AppState.weaponForm.name)) === null || _a === void 0 ? void 0 : _a.Image;
                    break;
            }
        }
        else {
            const { name, level, rank } = AppState.weaponForm;
            this.innerHTML = `
                <div>
                    <img id="WeaponImage" src="${(_b = WeaponMap.get(name)) === null || _b === void 0 ? void 0 : _b.Image}">
                    <select id="WeaponSelector">
                        ${(() => {
                return Array.from(WeaponMap.values())
                    .filter(a => a.Type === 'Sword')
                    .map(a => a.Name)
                    .map(a => `<option ${(name === a) ? 'selected' : ''} value="${a}">${a}</option>`)
                    .join('');
            })()}
                    </select>
                    <select id="LevelSelector">
                        ${(() => {
                return ['1/20', '20/20', '20/40', '40/40', '40/50', '50/50', '50/60', '60/60', '60/70', '70/70', '70/80', '80/80', '80/90', '90/90',]
                    .map((a, b) => `<option ${(level === b) ? 'selected' : ''} value="${b}">${a}</option>`)
                    .join('');
            })()}
                    </select>
                    <select id="RankSelector">
                        ${(() => {
                return ['R1', 'R2', 'R3', 'R4', 'R5']
                    .map((a, b) => `<option ${(rank === b) ? 'selected' : ''} value="${b}">${a}</option>`)
                    .join('');
            })()}
                    </select>
                </div>
            `;
            const WeaponSelector = iwnQ(`${WeaponForm.tag} #WeaponSelector`);
            const LevelSelector = iwnQ(`${WeaponForm.tag} #LevelSelector`);
            const RankSelector = iwnQ(`${WeaponForm.tag} #RankSelector`);
            WeaponSelector
                .on('change', e => {
                this.Weapon = WeaponSelector.index(0).value;
            });
            LevelSelector
                .on('change', e => {
                this.Level = LevelSelector.index(0).value;
            });
            RankSelector
                .on('change', e => {
                this.Rank = RankSelector.index(0).value;
            });
        }
    }
    Update(state, prevVal, newVal) {
        switch (state) {
            case 'characterSelected':
                this.renderElement('characterSelected', prevVal, newVal);
                break;
            case 'weaponSelected':
                this.renderElement('weaponSelected', prevVal, newVal);
                break;
        }
    }
    set Weapon(value) {
        const valueCheck = WeaponMap.get(value);
        if (!valueCheck)
            return;
        const [preVal, newVal] = [AppState.weaponForm.name, valueCheck.Name];
        AppState.weaponForm.name = newVal;
        stateChange('weaponSelected', preVal, newVal);
    }
    set Level(value) {
        const valueCheck = parseFloat(value);
        if (isNaN(valueCheck))
            return;
        const [preVal, newVal] = [AppState.weaponForm.level, valueCheck];
        AppState.weaponForm.level = newVal;
        stateChange('weaponLevel', preVal, newVal);
    }
    set Rank(value) {
        const valueCheck = parseFloat(value);
        if (isNaN(valueCheck))
            return;
        const [preVal, newVal] = [AppState.weaponForm.rank, valueCheck];
        AppState.weaponForm.rank = newVal;
        stateChange('weaponRank', preVal, newVal);
    }
}
WeaponForm.tag = 'iwn-weapon-form';
