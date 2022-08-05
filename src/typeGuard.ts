import { ArtifactSet, Character, Effect, Weapon } from "./types"
import CHARACTERS from './Variables/Characters.js'
import WEAPONS from './Variables/Weapons.js'
import ARTIFACT_SETS from './Variables/Artifacts.js'

export function isCharacter(obj : { [key:string] : any }) : obj is Character {
    if (obj.Interface !== 'Character') return false
    return true
}

export function isWeapon(obj : { [key:string] : any }) : obj is Weapon {

    // for (let key in object) {
    //     if (!(key in object)) return false
    // }

    return true
}

export function isArtifactSet(obj : { [key:string] : any }) : obj is ArtifactSet {
    // let object = ARTIFACT_SETS[0]

    // for (let key in object) {
    //     if (!(key in object)) return false
    // }

    return true
}

export function isEffect(obj : { [key:string] : any }) : obj is Effect {
    if (obj.type === 'Effect') {
        return true
    }
    
    return false
}
