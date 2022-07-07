import * as Data from './Variables/DataFile.js';
export function isCharacter(obj) {
    let object = Data.CHARACTERS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
export function isWeapon(obj) {
    let object = Data.WEAPONS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
export function isArtifactSet(obj) {
    let object = Data.ARTIFACT_SETS[0];
    for (let key in object) {
        if (!(key in object))
            return false;
    }
    return true;
}
