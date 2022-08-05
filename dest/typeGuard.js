export function isCharacter(obj) {
    if (obj.Interface !== 'Character')
        return false;
    return true;
}
export function isWeapon(obj) {
    // for (let key in object) {
    //     if (!(key in object)) return false
    // }
    return true;
}
export function isArtifactSet(obj) {
    // let object = ARTIFACT_SETS[0]
    // for (let key in object) {
    //     if (!(key in object)) return false
    // }
    return true;
}
export function isEffect(obj) {
    if (obj.type === 'Effect') {
        return true;
    }
    return false;
}
