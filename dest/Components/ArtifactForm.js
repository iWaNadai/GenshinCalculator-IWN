import { AppState } from "../App.js";
import { stateChange, iwnQ } from "../Helper.js";
import ArtifactsArray, { ARTIFACT_MAIN_STATS, ARTIFACT_MAIN_STATS_VALUES, ARTIFACT_SUB_STATS } from "../Variables/Artifacts.js";
export default class ArtifactForm extends HTMLElement {
    constructor() {
        super();
        this.Type = this.getAttribute('type');
        this.Dependencies = [`setSelected${this.Type}`, `mainType${this.Type}`];
        this.renderElement();
    }
    renderElement(state, prevVal, newVal) {
        var _a, _b;
        if (state) {
            const ArtifactImage = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #ArtifactImage`).index(0);
            const MainValueSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #MainStat .value`).index(0);
            switch (state) {
                case `setSelected${this.Type}`:
                    ArtifactImage.src = (_a = ArtifactsArray.get(AppState[`${this.Type.toLocaleLowerCase()}Form`].set)) === null || _a === void 0 ? void 0 : _a.Image[this.Type];
                    break;
                case `mainType${this.Type}`:
                    MainValueSelector.innerHTML = `
                        ${(() => {
                        var _a;
                        return ARTIFACT_MAIN_STATS_VALUES[(_a = AppState[`${this.Type.toLocaleLowerCase()}Form`]) === null || _a === void 0 ? void 0 : _a.mainStat[0]]
                            .map(a => `<option value="${a}">${a}</option>`)
                            .join('');
                    })()}
                    `;
                    break;
            }
        }
        else {
            const { set, mainStat, subStats } = AppState[`${this.Type.toLocaleLowerCase()}Form`];
            this.innerHTML = `
                <div>
                    <img id="ArtifactImage" src="${(_b = ArtifactsArray.get(set)) === null || _b === void 0 ? void 0 : _b.Image[this.Type]}">
                    <select id="SetSelector">
                        ${(() => {
                return Array.from(ArtifactsArray.values())
                    .map(a => a.Name)
                    .map(a => `<option ${(a === set) ? 'selected' : ''} value="${a}">${a}</option>`)
                    .join('');
            })()}
                    </select>
                    <span id="MainStat">
                        <select class="type">
                            ${(() => {
                return ARTIFACT_MAIN_STATS[this.Type]
                    .map(a => `<option ${(mainStat[0] === a) ? 'selected' : ''} value="${a}">${a}</option>`)
                    .join('');
            })()}
                        </select>
                        <select class="value">
                            ${(() => {
                return ARTIFACT_MAIN_STATS_VALUES[mainStat[0]]
                    .map(a => `<option ${(mainStat[1] === a) ? 'selected' : ''} value="${a}">${a}</option>`)
                    .join('');
            })()}
                        </select>
                    </span>
                    ${[0, 1, 2, 3].map(a => {
                return `
                            <span id="SubStat${a}">
                                <select class="type">
                                    ${(() => {
                    return ARTIFACT_SUB_STATS
                        .map(b => `<option ${(subStats[a][0] === b) ? 'selected' : ''} value="${b}">${b}</option>`)
                        .join('');
                })()}
                                </select>
                                <input type="number" class="value" value="${subStats[a][1]}" step=".1" min="0">
                            </span>
                        `;
            }).join('')}
                </div>
            `;
            const SetSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #SetSelector`);
            const MainTypeSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #MainStat .type`);
            const MainValueSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #MainStat .value`);
            SetSelector.on('change', e => {
                this.Set = SetSelector.index(0).value;
            });
            MainTypeSelector
                .on('change', e => {
                this.MainStatType = MainTypeSelector.index(0).value;
                this.MainStatValue = MainValueSelector.index(0).value;
            });
            MainValueSelector
                .on('change', e => {
                this.MainStatValue = MainValueSelector.index(0).value;
            });
            [0, 1, 2, 3].forEach(index => {
                const SubStatTypeSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #SubStat${index} .type`);
                const SubStatValueSelector = iwnQ(`${ArtifactForm.tag}[type="${this.Type}"] #SubStat${index} .value`);
                SubStatTypeSelector
                    .on('change', e => {
                    this.SubStats = `${index}**["${SubStatTypeSelector.index(0).value}",${AppState[`${this.Type.toLocaleLowerCase()}Form`].subStats[index][1]}]`;
                });
                SubStatValueSelector
                    .on('change', e => {
                    this.SubStats = `${index}**["${AppState[`${this.Type.toLocaleLowerCase()}Form`].subStats[index][0]}",${SubStatValueSelector.index(0).value}]`;
                });
            });
        }
    }
    Update(state, prevVal, newVal) {
        switch (state) {
            case `setSelected${this.Type}`:
                this.renderElement(...arguments);
                break;
            case `mainType${this.Type}`:
                this.renderElement(...arguments);
                break;
        }
    }
    set Set(value) {
        var _a;
        const valueCheck = ArtifactsArray.get(value);
        if (!valueCheck)
            return;
        const [prevVal, newVal] = [(_a = AppState[`${this.Type.toLocaleLowerCase()}Form`]) === null || _a === void 0 ? void 0 : _a.set, valueCheck.Name];
        AppState[`${this.Type.toLocaleLowerCase()}Form`].set = newVal;
        stateChange(`setSelected${this.Type}`, prevVal, newVal);
    }
    set MainStatType(value) {
        var _a;
        const valueCheck = ARTIFACT_MAIN_STATS[this.Type];
        if (!valueCheck.includes(value))
            return;
        const [prevVal, newVal] = [(_a = AppState[`${this.Type.toLocaleLowerCase()}Form`]) === null || _a === void 0 ? void 0 : _a.mainStat[0], value];
        AppState[`${this.Type.toLocaleLowerCase()}Form`].mainStat[0] = value;
        stateChange(`mainType${this.Type}`, prevVal, newVal);
    }
    set MainStatValue(value) {
        const valueCheck = ARTIFACT_MAIN_STATS_VALUES[AppState[`${this.Type.toLocaleLowerCase()}Form`].mainStat[0]];
        if (!valueCheck.includes(parseFloat(value)))
            return;
        const [prevVal, newVal] = [AppState[`${this.Type.toLocaleLowerCase()}Form`].mainStat[1], parseFloat(value)];
        AppState[`${this.Type.toLocaleLowerCase()}Form`].mainStat[1] = parseFloat(value);
        stateChange(`mainValue${this.Type}`, prevVal, newVal);
    }
    set SubStats(value) {
        const [index, subStat] = value.split('**');
        if (parseFloat(index) >= 4)
            return;
        const [prevVal, newVal] = [AppState[`${this.Type.toLocaleLowerCase()}Form`].subStats[parseFloat(index)], JSON.parse(subStat)];
        AppState[`${this.Type.toLocaleLowerCase()}Form`].subStats[parseFloat(index)] = newVal;
        stateChange(`subStats${this.Type}`, JSON.stringify(prevVal), JSON.stringify(newVal));
    }
}
ArtifactForm.tag = 'iwn-artifact-form';
