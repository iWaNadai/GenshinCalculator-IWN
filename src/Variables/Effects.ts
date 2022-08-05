// import { Character, Weapon, ArtifactSet, Effect} from '../types';
// // import { EventDispatcher } from '../Helpers/EventDispatcher.js';
// // import CharacterFormComponent from '../Components/CharacterComponent.js';
// // import WeaponFormComponent from '../Components/WeaponComponent.js';
// // import StatBoardComponent from '../Components/StatsComponent.js';
// // import ArtifactFormComponent from '../Components/ArtifactComponent.js';
// import { types } from './Characters.js';

import { AppState } from "../App.js";
import { getCharacter, getStats, getWeapon, iwnQ, stateChange, states } from "../Helper.js";
import { Effect } from "../types";
import CharacterMap from "./Characters";

const EffectsMap: Map<string, Effect> = new Map()
EffectsMap
    .set('Character State',{
            type : 'Effect',
            name : 'Character State',
            id : 'CharacterState',
            outputType : 'pre',
            dependencies : ["characterSelected","characterLevel","characterRank",
                            "weaponSelected","weaponLevel","weaponRank",
                            "setSelectedFlower","mainTypeFlower", "mainValueFlower", "subStatsFlower",
                            "setSelectedFeather","mainTypeFeather", "mainValueFeather", "subStatsFeather",
                            "setSelectedSands","mainTypeSands", "mainValueSands", "subStatsSands",
                            "setSelectedGoblet","mainTypeGoblet", "mainValueGoblet", "subStatsGoblet",
                            "setSelectedCirclet","mainTypeCirclet", "mainValueCirclet", "subStatsCirclet",
                            "effectInput"],
            formRender() {
                const characterState = document.createElement('div')
                    characterState.id = this.id;
                    characterState.dataset.name = this.name
                    characterState.innerHTML = `
                        <span id="currentHP">
                            <label for="currentHP">Current HP%: </label>
                            <input type="number" name="currentHP" min="0" max="100" value="100">
                        </span>
                        <span id="isShielded">
                            <label for="isShielded">Shielded: </label>
                            <input type="checkbox" name="isShielded">
                        </span>
                        <span id="shieldType">
                            <label for="shieldType">Shield Type </label>
                            <select disabled name="shieldType">
                                ${(
                                    () => {
                                        const shieldTypes = ['Electro - Crystallize', 'Hydro - Crystallize', 'Pyro - Crystallize', 'Cryo - Crystallize']

                                        return shieldTypes
                                                .map(a => `<option value="${a}">${a}</option>`)
                                    }
                                )()}
                            </select>
                        </span>
                    `

                return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? characterState
            },
            connect() {
                const isShielded = iwnQ(`#${this.id} #isShielded input`)
                const shieldType = iwnQ(`#${this.id} #shieldType select`)
                const currentHP = iwnQ(`#${this.id} #currentHP input`)
                isShielded
                    .on('change', e => {
                        stateChange('effectInput', 'characterState', 'isShielded')
                    })
                shieldType
                    .on('change', e => {
                        stateChange('effectInput', 'characterState', 'shieldType')
                    })
                currentHP
                    .on('change', e => {
                        stateChange('effectInput', 'characterState', 'currentHP')
                    })
            },
            update(state: states, preVal: any, newVal: any) {
                if (state === 'effectInput' && preVal === 'characterState' && newVal === 'isShielded') {
                    const shieldType = iwnQ(`#${this.id} #shieldType select`).index(0) as HTMLSelectElement
                    const {checked} = iwnQ(`#${this.id} #isShielded input`).index(0) as HTMLInputElement
                    if (checked) {
                        shieldType.disabled = false
                    } else {
                        shieldType.disabled = true
                    }
                }
            },
            disconnect() {},
    })
    .set('Enemy State', {
        type : 'Effect',
        name : 'Enemy State',
        id : 'EnemyState',
        outputType : 'pre',
        dependencies : [],
        formRender() {
            const enemyState = document.createElement('div')
                enemyState.id = this.id;
                enemyState.dataset.name = this.name
                enemyState.innerHTML = `
                    <span id="currentHP">
                        <label for="currentHP">current HP%: </label>
                        <input type="number" name="currentHP" min="0" max="100" value="100">
                    </span>
                    <span id="affectedBy">
                        <label for="affectedBy">affected by: </label>
                        <select>
                            ${(()=>{
                                return ['None','Anemo','Geo','Electro','Dendro','Hydro','Pyro','Cryo']
                                            .map(a => `<option value="${a}">${a}</option>`)
                                            .join('')
                            })()}
                        </select>
                    </span>
                `

                return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? enemyState
        },
        connect() {

            const currentHP = iwnQ(`#${this.id} #currentHP input`)
            currentHP
                .on('change', e => {
                    stateChange('effectInput', 'enemyState', 'currentHP')
                })
            const affectedBy = iwnQ(`#${this.id} #affectedBy select`)
            affectedBy
                .on('change', e => {
                    stateChange('effectInput', 'enemyStat', 'affectedBy')
                })
        },
        disconnect() {},
    },)
    .set('Elemental Resonance', {
        type : 'Effect',
        name : 'Elemental Resonance',
        id : 'ElementalResonance',
        outputType : 'pre/post',
        dependencies : ['characterSelected', 'effectInput'],
        formRender() {
            const ElementalResonance = document.createElement('div')
                ElementalResonance.id = this.id;
                ElementalResonance.dataset.name = this.name
                ElementalResonance.innerHTML = `
                    <ul id="EffectsList">
                        <li>Elemental RES <var>+15%</var> (PC)</li>
                        <li>Physical RES <var>+15%</var> (PC)</li>
                    </ul>
                    <hr>
                    <select id="ElementalResonance">
                        ${(() => {
                            const ElemReso : {[key:string]:any} = {
                                Anemo : 'Impetuous Winds',
                                Geo : 'Enduring Rock', 	
                                Electro : 'High Voltage',	
                                Dendro : 'INSERT DENDRO RES HERE',
                                Hydro : 'Soothing Water' ,	
                                Pyro : 'Fervent Flames',
                                Cryo: 'Shattering Ice',	
                            }
                            const {Element} = getCharacter()

                            const Resonances = ['Protective Canopy', ElemReso[Element]]

                            Object.entries(ElemReso)
                                .forEach(([elem,reso]) => {
                                    if (Element === elem) return
                                    else Resonances.push(`${ElemReso[Element]} & ${reso}`)
                                })
                            return Resonances.map(a => `<option value="${a}">${a}</option>`).join('')
                        })()}
                    </select>
                `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? ElementalResonance
        },
        connect() {
            const ElemReso = iwnQ(`#${this.id} select#ElementalResonance`)
            ElemReso
                .on('change', e => {
                    stateChange('effectInput','ElementalResonance',(ElemReso.index(0) as HTMLSelectElement).value)
                })
        },
        update(state: states, preVal: any, newVal: any) {
            if (state === 'characterSelected') {
                (iwnQ(`#${this.id} #ElementalResonance`).index(0) as HTMLDivElement)
                    .innerHTML = `
                        ${(() => {
                            const ElemReso : {[key:string]:any} = {
                                Anemo : 'Impetuous Winds',
                                Geo : 'Enduring Rock', 	
                                Electro : 'High Voltage',	
                                Dendro : 'INSERT DENDRO RES HERE',
                                Hydro : 'Soothing Water' ,	
                                Pyro : 'Fervent Flames',
                                Cryo: 'Shattering Ice',	
                            }
                            const {Element} = getCharacter()

                            const Resonances = ['Protective Canopy', ElemReso[Element]]

                            Object.entries(ElemReso)
                                .forEach(([elem,reso]) => {
                                    if (Element === elem) return
                                    else Resonances.push(`${ElemReso[Element]} & ${reso}`)
                                })
                            return Resonances.map(a => `<option value="${a}">${a}</option>`).join('')
                        })()}
                    ` 
            }

            const totalEffects : string[] = []
            const {value} = iwnQ(`#${this.id} #ElementalResonance`).index(0) as HTMLSelectElement
            
            if (value === 'Protective Canopy') {
                totalEffects.push('Elemental RES <var>+15%</var> (PC)')
                totalEffects.push('Physical RES <var>+15%</var> (PC)')
            }
            if (value.includes('Impetuous Winds')) {
                totalEffects.push('Cooldown Reduction <var>+5%</var> (IW)')
                totalEffects.push('Move Speed <var>+10%</var> (IW)')
                totalEffects.push('Stamina Consumption <var>-15%</var> (IW)')
            }
            if (value.includes('Enduring Rock')) {
                const {checked} = iwnQ('#CharacterState #isShielded input').index(0) as HTMLInputElement

                totalEffects.push('Shield Strength <var>+15%</var>')
                if (checked) {
                    totalEffects.push('Total DMG <var>+10%</var><br>(When shielded')
                } else {
                    totalEffects.push('Total DMG <var>+0%</var><br>(When shielded')
                }
            }
            if (value.includes('High Voltage')) {
                totalEffects.push('Generates <var>1</var> Electro particle<br>for every Electro Reaction')
            }
            if (value.includes('Soothing Water')) {
                totalEffects.push('Incoming Healing Bonus <var>+30%</var>')
            }
            if (value.includes('Fervent Flames')) {
                totalEffects.push('ATK <var>+25%</var>')
            }
            if (value.includes('Shattering Ice')) {
                const condition = (iwnQ(`#EnemyState #affectedBy select`).index(0) as HTMLSelectElement).value 

                if (condition === 'Cryo') {
                    totalEffects.push('Critical Rate <var>+15%</var> (When enemy affected by Cryo')
                } else {
                    totalEffects.push('Critical Rate <var>+0%</var> (When enemy affected by Cryo')
                }
            }

            iwnQ(`#${this.id} ul#EffectsList`)
                .index(0)
                .innerHTML = totalEffects.map(a => `<li>${a}</li>`).join('')

        },
        disconnect() {},
        output(getCode : 'pre' | 'post') {
            const ElemResoOutput : {[key:string]:any} = {}
            const {value} = iwnQ(`#${this.id} #ElementalResonance`).index(0) as HTMLSelectElement

            if (getCode === 'pre') {
                if (value.includes('Impetuous Winds')) {
                    ElemResoOutput.StaminaEfficiency = 15
                    ElemResoOutput.MoveSpeed         = 10
                    ElemResoOutput.CooldownReduction = 5
                }
                if (value.includes('Enduring Rock')) {
                    ElemResoOutput.ShieldStrength = 15
                }
                if (value.includes('Soothing Water')) {
                    ElemResoOutput.IncomingHealingBonus = 30
                }
                if (value.includes('Fervent Flames')) {
                    ElemResoOutput['ATK%'] = 25
                }
                if (value.includes('Shattering Ice')) {
                    const condtion = (iwnQ('#EnemyState #affectedBy select').index(0) as HTMLSelectElement).value
                    if (condtion === 'Cryo') {
                        ElemResoOutput.CriticalRate = 15                        
                    }
                }
                if (value === 'Protective Canopy') {
                    ElemResoOutput.AnemoResistance = 15
                    ElemResoOutput.GeoResistance = 15
                    ElemResoOutput.ElectroResistance = 15
                    ElemResoOutput.DendroResistance = 15
                    ElemResoOutput.HydroResistance = 15
                    ElemResoOutput.PyroResistance = 15
                    ElemResoOutput.CryoResistance = 15
                    ElemResoOutput.PhysicalResistance = 15
                }
            } else if (getCode === 'post') {
                if (value.includes('Enduring Rock')) {
                    const condtion = (iwnQ('#CharacterState #isShielded input').index(0) as HTMLInputElement).checked
                    if (condtion) {
                        ElemResoOutput.TotalDamageBonus = 10
                    }
                }
            }

            return ElemResoOutput
        }
    },)
    //ALBEDO
    .set('Calcite Might', {
        type : 'Effect',
        name : 'Calcite Might',
        id : 'CalciteMight',
        outputType : 'post',
        dependencies : ['effectInput'],
        formRender() {
            const calciteMight = document.createElement('div')
                calciteMight.id = this.id;
                calciteMight.dataset.name = this.name
                calciteMight.innerHTML = `
                    <ul id="EffectsList">
                        <li class="TransientBlossomDMG">
                            Transient Blossome DMG <var>+${(()=>{
                                const currentHP = parseFloat((iwnQ(`#EnemyState #currentHP input`).index(0) as HTMLInputElement).value)
                                if (currentHP < 50) {
                                    return 25
                                }
                                return 0
                            })()}%</var><br>(on enemies with less than 50% HP)
                        </li>
                    </ul>
                `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? calciteMight
        },
        connect() {},
        update(state: states, preVal: any, newVal: any) {
            if (state === 'effectInput' && preVal === 'enemyState' && newVal === 'currentHP') {
                const currentHP = parseFloat((iwnQ(`#EnemyState #currentHP input`).index(0) as HTMLInputElement).value)
                let bonus = 0
                if (currentHP < 50) {
                    bonus = 25
                }

                (iwnQ(`#${this.id} #EffectsList .TransientBlossomDMG var`).index(0) as HTMLElement)
                    .innerHTML = `+${bonus}%`
                    
            }
        },
        disconnect() {
            console.log(iwnQ(`#${this.id}`).index(0))
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
        output(getCode : 'pre'|'post') {
            const statOutput : {[key:string]:any} = {}
            
            if (getCode === 'post') {
                const currentHP = parseFloat((iwnQ(`#EnemyState #currentHP input`).index(0) as HTMLInputElement).value)
                if (currentHP < 50) {
                    statOutput.TransientBlossomDamageBonus = 25
                }
            }

            return statOutput
        }
    })
    .set('Homuncular Nature', {
        type : 'Effect',
        name : 'Homuncular Nature',
        id : 'HomuncularNature',
        outputType : 'pre',
        dependencies : ['effectInput'],
        formRender() {
            const homuncularNature = document.createElement('div')
                homuncularNature.id = this.id;
                homuncularNature.dataset.name = this.name
                homuncularNature.innerHTML = `
                    <ul id="EffectsList">
                        <li class="ElementalMasteryBonus">
                            Elemental Mastery <var>+0</var><br>(after using burst)
                        </li>
                    </ul>
                    <hr>
                    <span id="usedBurst">
                        <label>used burst:</label>
                        <input type="checkbox">
                    </span>
                `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? homuncularNature
        },
        connect() {
            const usedBurst = iwnQ(`#${this.id} #usedBurst input`)

            usedBurst
                .on('change', e => {
                    stateChange('effectInput', 'homuncularNature', 'usedBurst')
                })
        },
        update(state: states, preVal: any, newVal: any) {
            if (state === 'effectInput' && preVal === 'homuncularNature' && newVal === 'usedBurst') {
                const usedBurst = iwnQ(`#${this.id} #usedBurst input`).index(0) as HTMLInputElement
                const ElementalMasteryVar = iwnQ(`#${this.id} #EffectsList .ElementalMasteryBonus var`).index(0)
                let elementalMasteryBonus = 0
                if (usedBurst.checked) {
                    elementalMasteryBonus = 125
                }
                ElementalMasteryVar.innerHTML = `+${elementalMasteryBonus}`
            }
        },
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0) as HTMLDivElement) {
                (iwnQ(`#${this.id}`).index(0) as HTMLDivElement).remove()
            }
        },
        output(getCode : 'pre'|'post') {
            const statOutput : {[key:string]:any} = {}
            
            if (getCode === 'pre') {
                const usedBurst = iwnQ(`#${this.id} #usedBurst input`).index(0) as HTMLInputElement
                if (usedBurst.checked) {
                    statOutput.ElementalMastery = 125
                }
            }

            return statOutput 
        }
    },)
    .set('Flower of Eden',{
        type : 'Effect',
        name : 'Flower of Eden',
        id : 'FlowerOfEden',
        outputType : 'pre',
        dependencies : [],
        formRender() {
            const flowerOfEden = document.createElement('div')
                flowerOfEden.id = this.id;
                flowerOfEden.dataset.name = this.name
                flowerOfEden.innerHTML = `
                    <ul id="EffectsList">
                        <li class="EnergyBonus">
                            Transient Blossoms grant <var>1.2</var> energy particles
                        </li>
                    </ul>
                `

            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? flowerOfEden
        },
        connect() {},
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
    })
    .set('Opening of Phanerozoic', {
        type : 'Effect',
        name : 'Opening of Phanerozoic',
        id : 'OpeningOfPhanerozoic',
        outputType : 'post',
        dependencies : [],
        formRender() {
            const openingOfPhanerozoic = document.createElement('div')
                openingOfPhanerozoic.id = this.id;
                openingOfPhanerozoic.dataset.name = this.name
                openingOfPhanerozoic
                    .innerHTML = `
                            <ul id="EffectsList">
                                <li>Rite of Progeniture DMG Bonus <var>+0%</var> (30% DEF Bonus per FR stack)</li>
                                <li>Fatal Blossom DMG Bonus <var>+0%</var> (30% DEF Bonus per FR stack)</li>
                            </ul>
                            <hr>
                            <span id="FatalReckoningStacks">
                                <label for="stacks">FR Stacks: </label>
                                <input type="number" name="stacks" min="0" max="4" value="0">
                            </span>
                        `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? openingOfPhanerozoic
        },
        connect() {
            const fatalReckoningStacks = iwnQ(`#${this.id} #FatalReckoningStacks input`)

            fatalReckoningStacks
                .on('change', e => {
                    const effects = iwnQ(`#${this.id} #EffectsList li var`).array()
                    const stacks = parseFloat((fatalReckoningStacks.index(0) as HTMLInputElement).value)

                    effects[0].innerHTML = `+${(30 * stacks)}%`
                    effects[1].innerHTML = `+${(30 * stacks)}%`
                })    
        },
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
        output(getCode : 'pre'|'post') {
            const OpeningcfPhanerozoicOutput: {[key:string]:any} = {}
            const FatalReckoning = parseFloat((iwnQ(`#${this.id} #FatalReckoningStacks input`).index(0) as HTMLInputElement).value)
            const {DEF} = getStats()

            if (getCode === 'post') {
                OpeningcfPhanerozoicOutput.RiteOfProgenitureDamageBoost = (FatalReckoning * .3) * DEF;
                OpeningcfPhanerozoicOutput.FatalBlossomDamageBoost = (FatalReckoning * .3) * DEF;
            }

            return OpeningcfPhanerozoicOutput
        }
    },)
    .set('Descent of Divinity', {
        type : 'Effect',
        name : 'Descent of Divinity',
        id : 'DescentofDivinity',
        outputType : 'post',
        dependencies : [],
        formRender() {
            const descentOfDivinity = document.createElement('div')
                descentOfDivinity.id = this.id
                descentOfDivinity.dataset.name = this.name;
                descentOfDivinity
                    .innerHTML = `
                            <ul id="EffectsList">
                                <li>Plunging Attack DMG Bonus <var>+0%</var> (When inside Solar Isotoma's Field)</li>
                            </ul>
                            <hr>
                            <span id="inSolarIsotomaField">
                                <label for="inSolarIsotomaField">In S.I. field:</label>
                                <input type="checkbox" name="inSolarIsotomaField">
                            </span>
                        `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? descentOfDivinity;
        },
        connect() {
            const inField = iwnQ(`#${this.id} #inSolarIsotomaField input`) 
                inField
                    .on('change', e => {
                        const {checked} = (inField.index(0) as HTMLInputElement);
                        const descentOfDivinityVar = iwnQ(`#${this.id} #EffectsList li var`).index(0);
                        
                        let plungeDMG
                        if (checked) plungeDMG = 30
                        else plungeDMG = 0

                        descentOfDivinityVar.innerHTML = `+${plungeDMG}%`
                    })
        },
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
        output(getCode: 'pre' | 'post') {
            const state: {[key:string]:any} = {}
            
            if (getCode === 'post') {
                const {checked} = ( iwnQ(`#${this.id} #inSolarIsotomaField input`).index(0) as HTMLInputElement);

                if (checked) {
                    state.plungeDamageBonus = 30;
                }
            }

            return state
        }
    },)
    .set('Dust of Purification', {
        type : 'Effect',
        name : 'Dust of Purification',
        id : 'DustofPurification',
        outputType : 'post',
        dependencies : ['effectInput'],
        formRender() {
            const dustOfPurification = document.createElement('div')
                dustOfPurification.id = this.id
                dustOfPurification.dataset.name = this.name;
                dustOfPurification
                    .innerHTML = `
                        <ul id="EffectsList">
                            <li>Total DMG <var>+0%</var> (When shielded by crystallize shield)</li>
                        </ul>
                    `
            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? dustOfPurification;
        },
        connect() {
        },
        update(state: states, preVal: any, newVal: any) {
            if (state === 'effectInput' && preVal === 'characterState' && newVal === 'isShielded' || state === 'effectInput' && preVal === 'characterState' && newVal === 'shieldType') {
                const {checked} = iwnQ(`#CharacterState #isShielded input`).index(0) as HTMLInputElement
                const {value} = iwnQ(`#CharacterState #shieldType select`).index(0) as HTMLSelectElement
                const listElement = iwnQ(`#${this.id} li var`).index(0)

                let Output = 0;
                if (checked) {
                    if (value.includes('Crystallize')) {
                        Output = 17
                    }
                }

                listElement.innerHTML = `+${Output}%`
            }
        },
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
        output(getCode: 'pre' | 'post') {
            const state: {[key:string]:any} = {}
        
            if (getCode === 'post') {
                const {checked} = iwnQ(`#CharacterState #isShielded input`).index(0) as HTMLInputElement
                const {value} = iwnQ(`#CharacterState #shieldType select`).index(0) as HTMLSelectElement

                if (checked) {
                    if (value.includes('Crystallize')) {
                        state.TotalDamageBonus = 17
                    }
                }

            }

            return state
        }
    })
    //JEAN
    //CINNABAR SPINDLE
    .set('Spotless Heart', {
        type : 'Effect',
        name : 'Spotless Heart',
        id : 'SpotlessHeart',
        outputType : 'post',
        dependencies : ["weaponRank"],
        formRender() {
            const spotlessHeart = document.createElement('div')
                spotlessHeart.id = this.id;
                spotlessHeart.dataset.name = this.name
                spotlessHeart.innerHTML = `
                    <ul id="EffectsList">
                        <li class="ElementalSkillBoost">
                            Elemental Skill DMG <var>+${(()=>{
                                const rank = AppState.weaponForm.rank
                                const scaling = [40,50,60,70,80][rank];

                                return scaling
                            })()}%</var>
                        </li>
                    </ul>
                `

            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? spotlessHeart

        },
        connect() {},
        update(state: states, preVal: any, newVal: any) {
            if (state === 'weaponRank') {
                const rank = AppState.weaponForm.rank
                const ElementalSkillBoostVar = iwnQ(`#${this.id} #EffectsList .ElementalSkillBoost var`).index(0)
                ElementalSkillBoostVar.innerHTML = `+${[40,50,60,70,80][rank]}%`;
            }
        },
        disconnect() {
            if (iwnQ(`#${this.id}`).index(0) as HTMLDivElement) {
                (iwnQ(`#${this.id}`).index(0) as HTMLDivElement).remove()
            }

        },
        output(getCode : 'pre'|'post') {
            const SpotlessHeartOutput: {[key:string]:any} = {}

            if (getCode === 'post') {
                const Scaling = [.4,.5,.6,.7,.8][getWeapon()?.Rank as number]
                const {DEF} = getStats()

                SpotlessHeartOutput.ElementalSkillDamageBoost = Scaling * DEF
            }

            return SpotlessHeartOutput
        }
    },)
    //FESTERING DESIRE
    .set('Undying Admiration', {
        type : 'Effect',
        name : 'Undying Admiration',
        id : 'UndyingAdmiration',
        outputType : 'post',
        dependencies : [],
        formRender() {
            const undyingAdmiration = document.createElement('div')
                undyingAdmiration.id = this.id;
                undyingAdmiration.dataset.name = this.name
                undyingAdmiration.innerHTML = `
                    flower of eden
                `

            return iwnQ(`#${this.id}`).index(0) as HTMLDivElement ?? undyingAdmiration
        },
        connect() {},
        disconnect() {
            console.log(iwnQ(`#${this.id}`).index(0))
            if (iwnQ(`#${this.id}`).index(0)) {
                iwnQ(`#${this.id}`).index(0).remove()
            }
        },
    },)

export default EffectsMap