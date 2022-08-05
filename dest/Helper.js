import { AppState } from "./App.js";
import CharacterMap from "./Variables/Characters.js";
import WeaponMap from "./Variables/Weapons.js";
export function stateChange(state, prevVal, newVal) {
    document.querySelector('main').dispatchEvent(new CustomEvent('stateChanged', { detail: { state, prevVal, newVal } }));
}
export function iwnQ(selector) {
    let collection;
    if (typeof selector === 'string') {
        collection = new iwnQCollection([...document.querySelectorAll(selector)]);
    }
    else {
        collection = new iwnQCollection([selector]);
    }
    return collection;
}
class iwnQCollection {
    constructor(elements) {
        this.Elements = [...elements];
    }
    index(index) {
        return this.Elements[index];
    }
    array() {
        return [...this.Elements];
    }
    on(event, callback) {
        switch (event) {
            case 'change':
                this.Elements.forEach(a => a.onchange = callback);
                break;
        }
        return this;
    }
    listen(event, callback) {
        this.Elements
            .forEach(a => {
            a.addEventListener(event, callback);
        });
        return this;
    }
    forEach(callBack) {
        this.Elements
            .forEach((item, index) => {
            callBack(item, index);
        });
    }
    query(...args) {
        if (typeof args[0] === 'number' && typeof args[1] === 'string') {
            return new iwnQCollection([...this.Elements[args[0]].querySelectorAll(args[1])]);
        }
        const elements = [];
        this.Elements
            .forEach(a => {
            elements.concat([...a.querySelectorAll(args[0])]);
        });
        this.Elements = elements;
        return this;
    }
}
export function getCharacter() {
    const currentCharacter = JSON.parse(JSON.stringify(CharacterMap.get(AppState.characterForm.name)));
    const currentLevel = AppState.characterForm.level;
    const currentRank = AppState.characterForm.rank;
    currentCharacter.Rank = currentRank;
    currentCharacter.Level = currentLevel;
    Object.keys(currentCharacter.Stats.Base).forEach(a => {
        currentCharacter.Stats.Base[a] = currentCharacter.Stats.Base[a][currentLevel];
    });
    Object.keys(currentCharacter.Stats.Bonus).forEach(a => {
        currentCharacter.Stats.Bonus[a] = currentCharacter.Stats.Bonus[a][currentLevel];
    });
    return currentCharacter;
}
export function getWeapon() {
    const currentWeapon = JSON.parse(JSON.stringify(WeaponMap.get(AppState.weaponForm.name)));
    const currentLevel = AppState.weaponForm.level;
    const currentRank = AppState.weaponForm.rank;
    currentWeapon.Level = currentLevel;
    currentWeapon.Rank = currentRank;
    Object.keys(currentWeapon.Stats.Base).forEach(a => {
        currentWeapon.Stats.Base[a] = currentWeapon.Stats.Base[a][currentLevel];
    });
    Object.keys(currentWeapon.Stats.Bonus).forEach(a => {
        currentWeapon.Stats.Bonus[a] = currentWeapon.Stats.Bonus[a][currentLevel];
    });
    return currentWeapon;
}
export function getArtifacts() {
    const currentArtifacts = [];
    ['Flower', 'Feather', 'Sands', 'Goblet', 'Circlet']
        .forEach(type => {
        const statKVPairs = AppState[`${type.toLowerCase()}Form`].subStats.concat([AppState[`${type.toLocaleLowerCase()}Form`].mainStat]);
        const Stats = {};
        statKVPairs
            .forEach(([key, value]) => {
            if (Stats[key]) {
                Stats[key] += value;
            }
            else {
                Stats[key] = value;
            }
        });
        const currentArtifact = {
            Set: AppState[`${type.toLowerCase()}Form`].set,
            Type: type,
            Stats
        };
        currentArtifacts.push(currentArtifact);
    });
    return currentArtifacts;
}
export function getPreEffects() {
    return iwnQ('iwn-effect-form').index(0).PreEffects;
}
export function getPostEffects() {
    return iwnQ('iwn-effect-form').index(0).PostEffects;
}
export function getStats() {
    const Stats = iwnQ(`div[data-header="FINAL"] ul li`).array();
    const returnStats = {};
    Stats.forEach(a => {
        const key = (a.dataset.stat);
        const value = parseFloat(a.innerHTML);
        returnStats[key] = value;
    });
    return returnStats;
}
