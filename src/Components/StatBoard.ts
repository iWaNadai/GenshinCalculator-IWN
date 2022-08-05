import { getArtifacts, getCharacter, getPreEffects, getWeapon, iwnComponent, iwnQ, states } from "../Helper.js";
import { types } from "../Variables/Characters.js";

const Types = Object.keys(types);

export default class StatBoard extends HTMLElement implements iwnComponent {
    static readonly tag = 'iwn-statboard';
    Dependencies: states[] = [];

    constructor() {
        super()

        this.renderElement()
    }

    renderElement(): void {
        this.innerHTML = `
            ${renderTypes()}
        `
    }

    Update(state: states, prevVal: string, newVal: string): void {
        this.renderElement()
    }

}

function renderTypes() {
    let types : string[] = ['<div data-header="TYPES"><ul>',...(Types.map(a => `<li>${a}</li>`).join('')),'</ul></div>']
    let base : string[] = ['<div data-header="BASE"><ul>',...(calculateBase()[0]),'</ul></div>']
    let final : string[] = ['<div data-header="FINAL"><ul>',...(calculateFinal()),'</ul></div>']
    

    const stats = [types.join(''),base.join(''),final.join('')].join('')

    return stats
}

function calculateBase() {
    const currentCharacter = getCharacter()
    const currentWeapon = getWeapon();

    const BaseStats = Types
                        .map(a => {
                            let baseStat = currentCharacter.Stats.Base[a] || 0
                            if (a === 'ATK') {
                                baseStat += currentWeapon.Stats.Base.ATK
                            }

                            return [a, baseStat] as [string,number]
                        })

    const BaseStatElements = Types
                        .map(a => {
                            let baseStat = currentCharacter.Stats.Base[a] || 0
                            if (a === 'ATK') {
                                baseStat += currentWeapon.Stats.Base.ATK
                            }

                            return [a, baseStat] as [string,number]
                        })
                        .map(([type,value])=> `<li data-stat="${type}">${value}</li>`)

    return [BaseStatElements, BaseStats] as [string[], [string,number][]]
}


function calculateFinal() {
    const Base = calculateBase()[1];
    const Final : string[] = []

    const currentCharacter = getCharacter().Stats.Bonus
    const currentWeapon = getWeapon().Stats.Bonus;
    const currentArtifacts = getArtifacts().map(a => a.Stats)
    const preEffects = getPreEffects()

    // console.group('calculateFinal')
    Types.forEach((statName, index) => {
        // console.log('final-stat')
        const Bonus : {percent:number, flat:number} = {percent: 0, flat: 0}
        // console.log(a, Base[Types.indexOf(a)])
        
        if (currentCharacter[statName]) {
            Bonus.flat += currentCharacter[statName]
        }
        if (currentCharacter[`${statName}%`]) {
            Bonus.percent += currentCharacter[`${statName}%`]
        }

        if (currentWeapon[statName]) {
            Bonus.flat += currentWeapon[statName]
        }
        if (currentWeapon[`${statName}%`]) {
            Bonus.percent += currentWeapon[`${statName}%`]
        }

        if (preEffects[statName]) {
            Bonus.flat += preEffects[statName]
        }
        if (preEffects[`${statName}%`]) {
            Bonus.percent += preEffects[`${statName}%`]
        }
        
        currentArtifacts.forEach(artifact => {
            if (artifact[statName]) {
                Bonus.flat += artifact[statName]
            }
            if (artifact[`${statName}%`]) {
                Bonus.percent += artifact[`${statName}%`]
            }
        })

        // console.log(Base[index][1], (Bonus.percent / 100) + 1, Bonus.flat)

        let finalStat = (Base[index][1] * ((Bonus.percent / 100) + 1)) + Bonus.flat

        Final.push(`<li data-stat="${statName}" class="${((Base[index][1] < finalStat)?'increase':'')}">${finalStat.toFixed(2)}</li>`)
    })
    // console.groupEnd()
    return Final
}
