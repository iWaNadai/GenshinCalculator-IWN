import { getArtifacts, getCharacter, getWeapon, iwnQ } from "../Helper.js";
import Effects from "../Variables/Effects.js";
const DEFAULT_EFFECTS = [Effects.get('Character State'), Effects.get('Enemy State'), Effects.get('Elemental Resonance')];
export default class EffectForm extends HTMLElement {
    constructor() {
        super();
        this.Dependencies = ['characterSelected', 'characterLevel', 'characterRank',
            'weaponSelected', 'weaponLevel', 'weaponRank',
            'setSelectedFlower', 'mainTypeFlower', 'mainValueFlower', 'subStatsFlower',
            'setSelectedFeather', 'mainTypeFeather', 'mainValueFeather', 'subStatsFeather',
            'setSelectedSands', 'mainTypeSands', 'mainValueSands', 'subStatsSands',
            'setSelectedGoblet', 'mainTypeGoblet', 'mainValueGoblet', 'subStatsGoblet',
            'setSelectedCirclet', 'mainTypeCirclet', 'mainValueCirclet', 'subStatsCirclet',
            'effectInput'];
        this.effectsList = [];
        this.renderElement();
    }
    renderElement(state, prevVal, newVal) {
        if (state) {
        }
        else {
            this.innerHTML = `
                <div>
                </div>
            `;
            //get all effects in play
            this.Effects = getAllEffects();
            //tell stats to render
            //get post , pre/post outputs
            //tell talents to render            
        }
    }
    Update(state, prevVal, newVal) {
        this.Effects = getAllEffects();
        const statBoard = iwnQ('iwn-statboard').index(0);
        statBoard.Update('effectInput', '', '');
        const talents = iwnQ('iwn-talentboard').index(0);
        talents.Update('effectInput', '', '');
        this.effectsList
            .forEach(a => {
            if (a.dependencies.includes(state)) {
                if (a.update)
                    a.update(state, prevVal, newVal);
            }
        });
    }
    set Effects(value) {
        //get inactive effects and remove them
        const inactiveEffects = getInactiveEffects(value, this.effectsList);
        inactiveEffects
            .forEach(a => {
            a.disconnect();
        });
        //get new effects and append them
        const newEffects = getNewEffects(value, this.effectsList);
        newEffects
            .forEach(a => {
            const div = iwnQ(`${EffectForm.tag} div`).index(0);
            div.appendChild(a.formRender());
            a.connect();
        });
        //set current list to new list
        this.effectsList = value;
    }
    get PreEffects() {
        const preEffectsArray = this.effectsList
            .filter(a => {
            if (a.output && a.outputType.includes('pre'))
                return true;
            else
                return false;
        })
            .map(a => a.output('pre'));
        console.log('Pre Effects', preEffectsArray);
        const preEffects = {};
        preEffectsArray
            .reduce((total, output) => {
            Object.entries(output)
                .forEach(([key, val]) => {
                if (total[key]) {
                    total[key] += val;
                }
                else {
                    total[key] = val;
                }
            });
            return total;
        }, preEffects);
        return preEffects;
    }
    get PostEffects() {
        const postEffectsArray = this.effectsList
            .filter(a => {
            if (a.output && a.outputType.includes('post'))
                return true;
            else
                return false;
        })
            .map(a => a.output('post'));
        const postEffects = {};
        postEffectsArray
            .reduce((total, output) => {
            Object.entries(output)
                .forEach(([key, val]) => {
                if (total[key]) {
                    total[key] += val;
                }
                else {
                    total[key] = val;
                }
            });
            return total;
        }, postEffects);
        return postEffects;
    }
}
EffectForm.tag = 'iwn-effect-form';
function getAllEffects() {
    let effectsInPlay = DEFAULT_EFFECTS.concat([]);
    const Character = getCharacter();
    const Weapon = getWeapon();
    const Artifacts = getArtifacts();
    //check if char level is eligible for passive and? get passive
    if (Character.Level >= 2) {
        const passive = Effects.get(Character.Talents.A1Passive);
        if (passive)
            effectsInPlay.push(passive);
    }
    if (Character.Level >= 8) {
        const passive = Effects.get(Character.Talents.A4Passive);
        if (passive)
            effectsInPlay.push(passive);
    }
    //check if char rank is eligible for passive and? get passive
    for (let i = 1; i <= Character.Rank; i++) {
        const passiveName = Character.Constellations[i] || '';
        const passive = Effects.get(passiveName);
        if (passive)
            effectsInPlay.push(passive);
    }
    //get weapon passive
    Weapon.Passive
        .forEach(a => {
        const passive = Effects.get(a);
        if (passive)
            effectsInPlay.push(passive);
    });
    //check if artifact count is eligible for passive and? get passive
    //sort array to [pre, pre/post, post]
    //return new effects in play
    return effectsInPlay;
}
function getInactiveEffects(effectsInPlay, effectsRegistered) {
    const inactiveEffects = effectsRegistered.filter(a => {
        if (effectsInPlay.find(b => b.name === a.name))
            return false;
        else
            return true;
    });
    return inactiveEffects;
}
function getNewEffects(effectsInPlay, effectsRegistered) {
    const newEffects = effectsInPlay.filter(a => {
        if (effectsRegistered.find(b => b.name === a.name))
            return false;
        return true;
    });
    return newEffects;
}
