import { getArtifacts, getCharacter, getWeapon, iwnQ } from "../Helper.js";
import Talents from "../Variables/Talents.js";
export default class TalentBoard extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = [];
        this.talentsList = [];
        this.renderElement();
    }
    renderElement() {
        this.innerHTML = `
                    <div>
                    </div>
                `;
        this.Talents = getAllTalents();
    }
    Update(state, prevVal, newVal) {
        this.Talents = getAllTalents();
        this.talentsList
            .forEach(a => a.update());
    }
    set Talents(talentsInPlay) {
        const inactiveTalents = getInactiveTalents(talentsInPlay, this.talentsList);
        inactiveTalents
            .forEach(a => {
            a.disconnect();
        });
        const newTalents = getNewTalents(talentsInPlay, this.talentsList);
        newTalents
            .forEach(a => {
            const div = iwnQ(`${TalentBoard.tag} div`).index(0);
            div.appendChild(a.formRender());
            a.connect();
        });
        this.talentsList = talentsInPlay;
    }
}
TalentBoard.tag = 'iwn-talentboard';
function getAllTalents() {
    const talentsInPlay = [];
    const Character = getCharacter();
    const Weapon = getWeapon();
    const Artifacts = getArtifacts();
    if (Talents.get(Character.Talents.NormalAttack)) {
        const passive = Talents.get(Character.Talents.NormalAttack);
        talentsInPlay.push(passive);
    }
    if (Talents.get(Character.Talents.ElementalSkill)) {
        const passive = Talents.get(Character.Talents.ElementalSkill);
        talentsInPlay.push(passive);
    }
    if (Talents.get(Character.Talents.ElementalBurst)) {
        const passive = Talents.get(Character.Talents.ElementalBurst);
        talentsInPlay.push(passive);
    }
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
    console.log('talentsInPlay', talentsInPlay);
    return talentsInPlay;
}
function getInactiveTalents(talentsInPlay, talentsRegistered) {
    const inactiveTalents = talentsRegistered
        .filter(a => {
        if (talentsInPlay.find(b => b.name === a.name))
            return false;
        else
            return true;
    });
    return inactiveTalents;
}
function getNewTalents(talentsInPlay, talentsRegistered) {
    const newTalents = talentsInPlay
        .filter(a => {
        if (talentsRegistered.find(b => b.name === a.name))
            return false;
        else
            return true;
    });
    return newTalents;
}
