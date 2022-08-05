import { AppState } from "./App.js"
import EffectForm from "./Components/EffectForm.js"
import StatBoard from "./Components/StatBoard.js"
import { Artifact, ArtifactType, Character, Weapon } from "./types"
import CharacterMap from "./Variables/Characters.js"
import WeaponMap from "./Variables/Weapons.js"

export interface iSeed {
    [key:string]:any
    characterForm : {
        [key:string]:any
        name : string
        level : number
        rank : number
    }
    weaponForm : {
        [key:string]:any
        name : string
        level : number
        rank : number
    }
    flowerForm : {
        [key:string]:any
        set : string
        mainStat : [string, number]
        subStats : [string, number][]
    }
    featherForm : {
        [key:string]:any
        set : string
        mainStat : [string, number]
        subStats : [string, number][]
    }
    sandsForm : {
        [key:string]:any
        set : string
        mainStat : [string, number]
        subStats : [string, number][]
    }
    gobletForm : {
        [key:string]:any
        set : string
        mainStat : [string, number]
        subStats : [string, number][]
    }
    circletForm : {
        [key:string]:any
        set : string
        mainStat : [string, number]
        subStats : [string, number][]
    }
}

export function stateChange(state : states, prevVal : any, newVal : any) {
    (document.querySelector('main') as HTMLElement).dispatchEvent(new CustomEvent('stateChanged', {detail : {state, prevVal, newVal}}))
}

export interface iwnComponent  {
    Dependencies : states[]
    renderElement() : void,
    Update(state : states, prevVal : string, newVal : string) : void
    // | {(bundle : Promise<(Character|Artifact|Weapon)>[]) : void}
    // connectedCallback?() : any,
    // disconnectedCallback?() : any,
    // attributechangedCallback?(name : string, oldV : string, newV :  string) : any,
}

export type states = 'characterSelected' | 'characterLevel' | 'characterRank' | 
                     'weaponSelected' | 'weaponLevel' | 'weaponRank' |
                     `setSelected${ArtifactType}` | `mainType${ArtifactType}` | `mainValue${ArtifactType}` | `subStats${ArtifactType}` |
                     'effectInput'

export function iwnQ(selector : string | Element) : iwnQCollection{
    let collection: iwnQCollection;
    if (typeof selector === 'string') {
        collection = new iwnQCollection([...document.querySelectorAll(selector)])
    } else {
        collection = new iwnQCollection([selector])
    }

    return collection
}

class iwnQCollection{
    private Elements : Element[];
    constructor(elements : Element[]) {
        this.Elements = [...elements];
    }

    public index(index:number) {
        return this.Elements[index]
    }

    public array() {
        return [...this.Elements] as HTMLElement[]
    }

    public on(event : 'change', callback : {(e:Event) : any}) {
        switch (event) {
            case 'change':
                this.Elements.forEach(a => (a as HTMLElement).onchange = callback)
                break;
        } 

        return this
    }

    public listen(event : string, callback : {(e:Event) : any}) {
        this.Elements
            .forEach(a => {
                a.addEventListener(event, callback)
            })

        return this
    }

    public forEach(callBack :  {(item:Element, index?:number) : any}) {
        this.Elements
            .forEach((item, index) => {
                callBack(item,index)
            })
    }
    
    public query(...args : any[]) {
        if (typeof args[0] === 'number' && typeof args[1] === 'string') {
            return new iwnQCollection([...(this.Elements[args[0]] as HTMLElement).querySelectorAll(args[1])])
        }
        
        const elements: Element[] = [];
        this.Elements
            .forEach(a => {
                elements.concat([...a.querySelectorAll(args[0])])
            })
        this.Elements = elements
        return this
    }
}

export function getCharacter() {
    const currentCharacter = JSON.parse(JSON.stringify(CharacterMap.get(AppState.characterForm.name))) as Character
    const currentLevel = AppState.characterForm.level
    const currentRank = AppState.characterForm.rank

    currentCharacter.Rank = currentRank;
    currentCharacter.Level = currentLevel

    Object.keys(currentCharacter.Stats.Base).forEach(a => {
        currentCharacter.Stats.Base[a] = currentCharacter.Stats.Base[a][currentLevel]
    })
    Object.keys(currentCharacter.Stats.Bonus).forEach(a => {
        currentCharacter.Stats.Bonus[a] = currentCharacter.Stats.Bonus[a][currentLevel]
    })

    return currentCharacter
}

export function getWeapon() {
    const currentWeapon = JSON.parse(JSON.stringify(WeaponMap.get(AppState.weaponForm.name))) as Weapon
    const currentLevel = AppState.weaponForm.level;
    const currentRank = AppState.weaponForm.rank;

    currentWeapon.Level = currentLevel
    currentWeapon.Rank = currentRank

    Object.keys(currentWeapon.Stats.Base).forEach(a => {
        currentWeapon.Stats.Base[a] = currentWeapon.Stats.Base[a][currentLevel]
    })
    Object.keys(currentWeapon.Stats.Bonus).forEach(a => {
        currentWeapon.Stats.Bonus[a] = currentWeapon.Stats.Bonus[a][currentLevel]
    })

    return currentWeapon
}

export function getArtifacts() {
    const currentArtifacts: Artifact[] = [];
    (['Flower','Feather','Sands','Goblet','Circlet'] as ArtifactType[])
        .forEach(type => {
            const statKVPairs : [string, number][] = (AppState[`${type.toLowerCase()}Form`].subStats as [string,number][]).concat([AppState[`${type.toLocaleLowerCase()}Form`].mainStat]);
            const Stats : {[key:string]:number} = {}
            statKVPairs
                .forEach(([key,value]) => {
                    if (Stats[key]) {
                        Stats[key] += value
                    } else {
                        Stats[key] = value
                    }
                })

            const currentArtifact : Artifact = {
            Set : AppState[`${type.toLowerCase()}Form`].set,
            Type : type,
            Stats
            }

            currentArtifacts.push(currentArtifact);
        })
    return currentArtifacts
}

export function getPreEffects() {
    return (iwnQ('iwn-effect-form').index(0) as EffectForm).PreEffects
}

export function getPostEffects() {
    return (iwnQ('iwn-effect-form').index(0) as EffectForm).PostEffects
}

export function getStats() {
    const Stats = iwnQ(`div[data-header="FINAL"] ul li`).array() as HTMLElement[]

    const returnStats: {[key:string]:number} = {}
    Stats.forEach(a => {
        const key = (a.dataset.stat) as string;
        const value = parseFloat(a.innerHTML);
        returnStats[key] = value
    })
        
    return returnStats
}
