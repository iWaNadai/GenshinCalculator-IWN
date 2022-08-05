import { $ } from "../Helper.js";
import Effects from "../Variables/Effects.js";
const defaultEffects = [Effects.find(a => a.name === 'Character State')];
export default class EffectBoard extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = ["characterSelected", "characterLevel", "characterRank",
            "weaponSelected", "weaponLevel", "weaponRank",
            "setSelectedFlower", "mainTypeFlower", "mainValueFlower", "subStatFlower",
            "setSelectedFeather", "mainTypeFeather", "mainValueFeather", "subStatFeather",
            "setSelectedSands", "mainTypeSands", "mainValueSands", "subStatSands",
            "setSelectedGoblet", "mainTypeGoblet", "mainValueGoblet", "subStatGoblet",
            "setSelectedCirclet", "mainTypeCirclet", "mainValueCirclet", "subStatCirclet"];
        this.effects = defaultEffects.concat([]);
        this.renderElement();
    }
    renderElement() {
        this.innerHTML = `
            <div>
            </div>
        `;
        const div = $(`${EffectBoard.tag} div`);
        this.effects.forEach(a => {
            div.appendChild(a.formRender());
            a.connect();
        });
    }
    async Update(bundle) {
        const effects = await Promise.all(bundle);
        console.log(...effects);
    }
}
EffectBoard.tag = 'iwn-effect-form';
