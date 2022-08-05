import { stateChange, iwnQ } from "../Helper.js";
import CharacterMap from "../Variables/Characters.js";
import { AppState } from "../App.js";
export default class CharacterForm extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = ['characterSelected'];
        this.renderElement();
    }
    renderElement(state) {
        var _a, _b;
        if (state) {
            const CharacterImage = iwnQ(`${CharacterForm.tag} #CharacterImage`).index(0);
            switch (state) {
                case 'characterSelected':
                    CharacterImage.src = (_a = CharacterMap.get(AppState.characterForm.name)) === null || _a === void 0 ? void 0 : _a.Image;
                    break;
            }
        }
        else {
            const { name, level, rank } = AppState.characterForm;
            this.innerHTML = `
                <div>
                    <img id="CharacterImage" src="${(_b = CharacterMap.get(name)) === null || _b === void 0 ? void 0 : _b.Image}">
                    <select id="CharacterSelector">
                        ${(() => {
                return Array.from(CharacterMap
                    .values())
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
                return ['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6']
                    .map((a, b) => `<option ${(rank === b) ? 'selected' : ''} value="${b}">${a}</option>`)
                    .join('');
            })()}
                    </select>
                </div>
            `;
            const CharacterSelector = iwnQ(`${CharacterForm.tag} #CharacterSelector`);
            const CharacterLevel = iwnQ(`${CharacterForm.tag} #LevelSelector`);
            const CharacterRank = iwnQ(`${CharacterForm.tag} #RankSelector`);
            CharacterSelector
                .on('change', e => {
                this.Character = CharacterSelector.index(0).value;
            });
            CharacterLevel
                .on('change', e => {
                this.Level = CharacterLevel.index(0).value;
            });
            CharacterRank
                .on('change', e => {
                this.Rank = CharacterRank.index(0).value;
            });
        }
    }
    Update(state, prevVal, newVal) {
        switch (state) {
            case 'characterSelected':
                this.renderElement(...arguments);
                break;
        }
    }
    set Character(value) {
        const valueCheck = CharacterMap.get(value);
        if (!valueCheck)
            return;
        const [preVal, newVal] = [AppState.characterForm.name, valueCheck.Name];
        AppState.characterForm.name = newVal;
        stateChange('characterSelected', preVal, newVal);
    }
    set Level(value) {
        const valueCheck = parseFloat(value);
        if (isNaN(valueCheck))
            return;
        const [preVal, newVal] = [AppState.characterForm.level, valueCheck];
        AppState.characterForm.level = newVal;
        stateChange('characterLevel', preVal, newVal);
    }
    set Rank(value) {
        const valueCheck = parseFloat(value);
        if (isNaN(valueCheck))
            return;
        const [preVal, newVal] = [AppState.characterForm.rank, valueCheck];
        AppState.characterForm.rank = newVal;
        stateChange('characterRank', preVal, newVal);
    }
}
CharacterForm.tag = 'iwn-character-form';
