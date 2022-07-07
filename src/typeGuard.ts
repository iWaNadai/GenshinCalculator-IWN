import { ArtifactSet, Character, Weapon } from "./types"
import * as Data from './Variables/DataFile.js'

export function isCharacter(obj : { [key:string] : any }) : obj is Character {
    let object = Data.CHARACTERS[0]
    for (let key in object) {
        if (!(key in object)) return false
    }
    return true
}

export function isWeapon(obj : { [key:string] : any }) : obj is Weapon {
    let object = Data.WEAPONS[0]

    for (let key in object) {
        if (!(key in object)) return false
    }

    return true
}

export function isArtifactSet(obj : { [key:string] : any }) : obj is ArtifactSet {
    let object = Data.ARTIFACT_SETS[0]

    for (let key in object) {
        if (!(key in object)) return false
    }

    return true
}