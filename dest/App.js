import CharacterForm from "./Components/CharacterForm.js";
import ArtifactForm from "./Components/ArtifactForm.js";
import EffectForm from "./Components/EffectForm.js";
import WeaponForm from "./Components/WeaponForm.js";
import { getPostEffects, iwnQ } from "./Helper.js";
import StatBoard from "./Components/StatBoard.js";
import TalentBoard from "./Components/TalentBoard.js";
export const AppState = {
    characterForm: {
        name: 'Albedo',
        level: 13,
        rank: 6,
    },
    weaponForm: {
        name: 'Cinnabar Spindle',
        level: 0,
        rank: 4
    },
    flowerForm: {
        set: 'Husk of Oppulent Dreams',
        mainStat: ['HP', 717],
        subStats: [['DEF%', 69], ['DEF%', 69], ['DEF%', 69], ['DEF%', 69]]
    },
    featherForm: {
        set: 'Husk of Oppulent Dreams',
        mainStat: ['ATK', 47],
        subStats: [['DEF%', 69], ['DEF%', 69], ['DEF%', 69], ['DEF%', 69]]
    },
    sandsForm: {
        set: 'Husk of Oppulent Dreams',
        mainStat: ['DEF%', 8.7],
        subStats: [['DEF%', 69], ['DEF%', 69], ['DEF%', 69], ['DEF%', 69]]
    },
    gobletForm: {
        set: 'Pale Flame',
        mainStat: ['GeoDamageBonus', 7],
        subStats: [['DEF%', 69], ['DEF%', 69], ['DEF%', 69], ['DEF%', 69]]
    },
    circletForm: {
        set: 'Husk of Oppulent Dreams',
        mainStat: ['CriticalRate', 4.7],
        subStats: [['DEF%', 69], ['DEF%', 69], ['DEF%', 69], ['DEF%', 69]]
    }
};
window.customElements.define(CharacterForm.tag, CharacterForm);
window.customElements.define(WeaponForm.tag, WeaponForm);
window.customElements.define(ArtifactForm.tag, ArtifactForm);
window.customElements.define(EffectForm.tag, EffectForm);
window.customElements.define(StatBoard.tag, StatBoard);
window.customElements.define(TalentBoard.tag, TalentBoard);
console.log('<state changed> : <previous value> => <new value>');
const characterForm = iwnQ('iwn-character-form').index(0);
const weaponForm = iwnQ('iwn-weapon-form').index(0);
const [flowerForm, featherForm, sandsForm, gobletForm, circletForm] = iwnQ('iwn-artifact-form').array();
const effectForm = iwnQ('iwn-effect-form').index(0);
iwnQ('#MainBody').listen('stateChanged', e => {
    const { state, prevVal, newVal } = e.detail;
    const sourceElements = [characterForm, weaponForm, flowerForm, featherForm, sandsForm, gobletForm, circletForm];
    console.log(`${state} : ${prevVal} => ${newVal}`);
    sourceElements.forEach(a => {
        if (a.Dependencies.includes(state)) {
            a.Update(state, prevVal, newVal);
        }
    });
    if (effectForm.Dependencies.includes(state)) {
        effectForm.Update(state, prevVal, newVal);
    }
    getPostEffects();
});
