import { AppState } from "../App.js";
import { getArtifacts, getCharacter, getWeapon, iwnComponent, iwnQ, stateChange, states } from "../Helper.js";
import { Artifact, ArtifactType, Character, Effect, Weapon } from "../types";
import Effects from "../Variables/Effects.js";
import CharacterMap from '../Variables/Characters.js';
import WeaponMap from '../Variables/Weapons.js';
import CharacterForm from "./CharacterForm.js";
import WeaponForm from "./WeaponForm.js";
import StatBoard from "./StatBoard";
import TalentBoard from "./TalentBoard";

const DEFAULT_EFFECTS: Effect[] = [Effects.get('Character State') as Effect,Effects.get('Enemy State') as Effect, Effects.get('Elemental Resonance') as Effect]

export default class EffectForm extends HTMLElement implements iwnComponent {
    static readonly tag = 'iwn-effect-form';
    Dependencies: states[] = ['characterSelected','characterLevel','characterRank',
                              'weaponSelected','weaponLevel','weaponRank',
                              'setSelectedFlower','mainTypeFlower','mainValueFlower','subStatsFlower',
                              'setSelectedFeather','mainTypeFeather','mainValueFeather','subStatsFeather',
                              'setSelectedSands','mainTypeSands','mainValueSands','subStatsSands',
                              'setSelectedGoblet','mainTypeGoblet','mainValueGoblet','subStatsGoblet',
                              'setSelectedCirclet','mainTypeCirclet','mainValueCirclet','subStatsCirclet',
                              'effectInput']
    private effectsList : Effect[] = []

    constructor() {
        super();

        this.renderElement()
    }

    renderElement(state?: states, prevVal?: string, newVal?: string): void {
        if (state) {

        } else {
            this.innerHTML = `
                <div>
                </div>
            `
            //get all effects in play
            this.Effects = getAllEffects();
            //tell stats to render
            //get post , pre/post outputs
            //tell talents to render            
        }
    }

    Update(state: states, prevVal: string, newVal: string): void {        
        this.Effects = getAllEffects()

        const statBoard = (iwnQ('iwn-statboard').index(0) as StatBoard)
            statBoard.Update('effectInput','','')

        const talents = (iwnQ('iwn-talentboard').index(0) as TalentBoard)
            talents.Update('effectInput','','')

        this.effectsList
            .forEach(a => {
                if (a.dependencies.includes(state)) {
                    if (a.update) a.update(state, prevVal, newVal)
                }
            })
    }

    private set Effects(value:Effect[]) {
        //get inactive effects and remove them
        const inactiveEffects = getInactiveEffects(value, this.effectsList)
            inactiveEffects
                .forEach(a => {
                    a.disconnect()
                })
        //get new effects and append them
        const newEffects = getNewEffects(value, this.effectsList)
            newEffects
                .forEach(a => {
                    const div = iwnQ(`${EffectForm.tag} div`).index(0) as HTMLDivElement
                    div.appendChild(a.formRender())
                    a.connect()    
                })
        //set current list to new list
        this.effectsList = value
    }

    public get PreEffects() {
        const preEffectsArray = this.effectsList
                                    .filter(a => {
                                        if (a.output && a.outputType.includes('pre')) return true
                                        else return false
                                    })
                                    .map(a => (a as {output(getCode:'pre') : {[key:string]:any}}).output('pre'))

        console.log('Pre Effects', preEffectsArray)

        const preEffects: {[key:string]:any} = {}

        preEffectsArray
            .reduce((total,output) => {
                Object.entries(output)
                    .forEach(([key,val]) => {
                        if (total[key]) {
                            total[key] += val
                        } else {
                            total[key] = val
                        }
                    })
                return total
            }, preEffects)
        return preEffects
    }

    public get PostEffects() {
        const postEffectsArray = this.effectsList
                                    .filter(a => {
                                        if (a.output && a.outputType.includes('post')) return true
                                        else return false
                                    })
                                    .map(a => (a as {output(getCode:'post') : {[key:string]:any}}).output('post'))

        const postEffects: {[key:string]:any} = {}
        
        postEffectsArray
            .reduce((total, output) => {
                Object.entries(output)
                    .forEach(([key,val]) => {
                        if (total[key]) {
                            total[key] += val
                        } else {
                            total[key] = val
                        }
                    })
                return total
            }, postEffects)


        return postEffects
    }
}

function getAllEffects() {
    let effectsInPlay : Effect[] = DEFAULT_EFFECTS.concat([])
    const Character = getCharacter()
    const Weapon = getWeapon()
    const Artifacts = getArtifacts()

    //check if char level is eligible for passive and? get passive
    if ((Character.Level as number) >= 2) {
        const passive = Effects.get(Character.Talents.A1Passive)

        if (passive) effectsInPlay.push(passive)
    }
    if ((Character.Level as number) >= 8) {
        const passive = Effects.get(Character.Talents.A4Passive);

        if (passive) effectsInPlay.push(passive)
    }

    //check if char rank is eligible for passive and? get passive
    for (let i = 1; i <= (Character.Rank as number); i++) {
        const passiveName = (Character.Constellations as string[])[i] || ''
        const passive = Effects.get(passiveName)

        if (passive) effectsInPlay.push(passive)
    }
    //get weapon passive
    Weapon.Passive
        .forEach(a => {
            const passive = Effects.get(a)

            if (passive) effectsInPlay.push(passive)
        })
    //check if artifact count is eligible for passive and? get passive
    //sort array to [pre, pre/post, post]

    //return new effects in play

    return effectsInPlay

}

function getInactiveEffects(effectsInPlay: Effect[], effectsRegistered: Effect[]) {
    const inactiveEffects = effectsRegistered.filter(a => {
        if (effectsInPlay.find(b => b.name === a.name)) return false
        else return true
    })

    return inactiveEffects;
}

function getNewEffects(effectsInPlay: Effect[], effectsRegistered: Effect[]) {
    const newEffects = effectsInPlay.filter(a => {
        if (effectsRegistered.find(b => b.name === a.name)) return false
        return true
    })
    return newEffects
}
