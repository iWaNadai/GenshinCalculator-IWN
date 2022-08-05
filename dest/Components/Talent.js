import { getArtifacts, getCharacter, getWeapon } from "../Helper";
export default class TalentBoard extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = [];
    }
    renderElement() {
        this.innerHTML = `
                    <div>
                    </div>
                `;
    }
    Update(state, prevVal, newVal) {
    }
}
function getAllTalents() {
    const talentsInPlay = [];
    const Character = getCharacter();
    const Weapon = getWeapon();
    const Artifacts = getArtifacts();
    if (Character.Level >= 2) {
        const passive = Talents.get(Character.Talents['A1Passive']);
        if (passive)
            talentsInPlay.push(passive);
    }
    if (Character.Level >= 8) {
        const passive = Talents.get(Character.Talents['A4Passive']);
        if (passive)
            talentsInPlay.push(passive);
    }
}
