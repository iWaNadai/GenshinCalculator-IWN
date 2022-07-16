import { ArtifactSet, Character, Weapon } from "./types"
import CHARACTERS from './Variables/Characters.js'
import WEAPONS from './Variables/Weapons.js'
import ARTIFACT_SETS from './Variables/Artifacts.js'

export function isCharacter(obj : { [key:string] : any }) : obj is Character {
    let object = CHARACTERS[0]
    for (let key in object) {
        if (!(key in object)) return false
    }
    return true
}

export function isWeapon(obj : { [key:string] : any }) : obj is Weapon {
    let object = WEAPONS[0]

    for (let key in object) {
        if (!(key in object)) return false
    }

    return true
}

export function isArtifactSet(obj : { [key:string] : any }) : obj is ArtifactSet {
    let object = ARTIFACT_SETS[0]

    for (let key in object) {
        if (!(key in object)) return false
    }

    return true
}