import CHARACTERS from './Variables/Characters.js';
import WEAPONS from './Variables/Weapons.js';
import ARTIFACT_SETS from './Variables/Artifacts.js';
export function isCharacter(obj) {
    let object = CHARACTERS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
export function isWeapon(obj) {
    let object = WEAPONS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
export function isArtifactSet(obj) {
    let object = ARTIFACT_SETS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
