import { EventDispatcher } from "../Helpers/EventDispatcher.js";
import { Artifact, ArtifactSet, ArtifactType } from "../types";
import ARTIFACT_SETS, {ARTIFACT_MAIN_STATS, ARTIFACT_MAIN_STATS_VALUES} from "./../Variables/Artifacts.js"

export default class ArtifactFormComponent extends HTMLElement{
    private type : ArtifactType = 'Flower';
    private set : ArtifactSet = ARTIFACT_SETS[0]
    private mainStat : [string, number]
    private subStat : [string, number][] = [['HP',0],
                                    ['HP',0],
                                    ['HP',0],
                                    ['HP',0]]
    constructor() {
        super();
        
        this.type = this.getAttribute('type') as ArtifactType
        this.mainStat = (() => {
            switch (this.type) {
                case 'Flower':
                    return ['HP',717]
                case 'Feather':
                    return ['ATK',47]
                default:
                    return ['HP%',7]
            }
        })()
        
        this.render()
    }

    private render() {
        this.innerHTML = `
            <div>
                ${ArtifactImage(this.type)}
                ${ArtifactSet()}
                ${ArtifactMainStat(this.type)}
                ${ArtifactSubStat()}
            </div>
        `

        this.setAttribute('set', (this.querySelector('#Set') as HTMLSelectElement).value)
        this.setAttribute('main-stat', (JSON.stringify([(this.querySelector('#MainStat #Type') as HTMLSelectElement).value, 
                                                 Number((this.querySelector('#MainStat #Value') as HTMLSelectElement).value)])))
        this.setAttribute('sub-stats', JSON.stringify(this.subStat))
    }

    connectedCallback() : void {
        (this.querySelector('#Set') as HTMLSelectElement).onchange = e => {
            this.setAttribute('set', (e.target as HTMLSelectElement).value)
        }
        (this.querySelector('#MainStat #Type') as HTMLSelectElement).onchange = e => {
            const temp = JSON.parse(this.getAttribute('main-stat') as string)

            temp[0] = (e.target as HTMLSelectElement).value

            this.setAttribute('main-stat', JSON.stringify(temp))
        }
        (this.querySelector('#MainStat #Value') as HTMLSelectElement).onchange = e => {
            const temp = JSON.parse(this.getAttribute('main-stat') as string)

            temp[1] = Number((e.target as HTMLSelectElement).value)

            
            this.setAttribute('main-stat', JSON.stringify(temp))
        }
        [0,1,2,3].forEach(a => {
            (this.querySelector(`#ss${a} select`) as HTMLSelectElement).onchange = e => {
                const order = a
                
                const tempArray = (() => {
                    let b = JSON.parse(JSON.stringify(this.subStat))

                    b[order][0] = (e.target as HTMLInputElement).value

                    return JSON.stringify(b)
                })()
               
                this.setAttribute('sub-stats', tempArray)
            }
            (this.querySelector(`#ss${a} input`) as HTMLInputElement).onchange = e => {
                const order = a
                

                const tempArray = (() => {
                    let b = JSON.parse(JSON.stringify(this.subStat))

                    b[order][1] = Number((e.target as HTMLInputElement).value)

                    return JSON.stringify(b)
                })()

                this.setAttribute('sub-stats', tempArray)
            }
        })
    }

    diconnectedCallback() : void {
        (this.querySelector('#Set') as HTMLSelectElement).onchange = null;
        (this.querySelector('#MainStat #Type') as HTMLSelectElement).onchange = null;
        (this.querySelector('#MainStat #Value') as HTMLSelectElement).onchange = null;
    }

    static get observedAttributes() : string[] {
        return ['set','main-stat','sub-stats']
    }

    attributeChangedCallback(name : string, oldValue : string, newValue : string) : void {
        if (oldValue === null &&this.hasAttribute(name)) return;
        switch (name) {
            case 'set':
                ArtifactImage(this.type, changeSet(oldValue,newValue).NewSt as ArtifactSet)
                this.set = changeSet(oldValue,newValue).NewSt as ArtifactSet
                EventDispatcher(`${this.type}Set`, changeSet(oldValue,newValue))
                break;
            case 'main-stat':
                if (changeMainStat(oldValue,newValue).TypeChange) {
                    ArtifactMainStat(this.type, changeMainStat(oldValue,newValue).NewMS[0])
                    this.mainStat[0] = changeMainStat(oldValue,newValue).NewMS
                    this.mainStat[1] = parseFloat((this.querySelector('#MainStat #Value') as HTMLSelectElement).value)
                }
                else {
                    this.mainStat[1] = changeMainStat(oldValue,newValue).NewMS[1]
                }
                EventDispatcher(`${this.type}MainStat`, changeMainStat(oldValue,newValue))
                break;
            case 'sub-stats':
                console.log(newValue);
                this.subStat = changeSubStat(oldValue, newValue).NewSS
                EventDispatcher(`${this.type}SubStat`, changeSubStat(oldValue, newValue))
                break;
        }
    }

    get Artifact() : Artifact {
        const stat = (() => { 
            let temp =  (JSON.parse(JSON.stringify(this.subStat)) as [string,number][])
            temp.push((JSON.parse(JSON.stringify(this.mainStat)) as [string,number]));
            return temp 
        })();

        const Stats : {[key:string] : any} = {}
        
        stat.forEach(a => {
            let A = a as [string, number]

            if (A[0] in Stats) {
                Stats[A[0]] += A[1]
            }
            else {
                Stats[A[0]] = A[1]
            }

        })

 
        const artifact : Artifact = 
        {
            Set : this.set.Name,
            Type : this.type,
            Stats,
        }

        return artifact;
    }
}

//Renderer
function ArtifactImage(type : ArtifactType, value? : ArtifactSet) {
    if (value) {
        (document.querySelector(`[type="${type}"] img`) as HTMLImageElement).src = value.Image[type]
        return
    }

    return `
        <img src="${ARTIFACT_SETS[0].Image[type]}">
    `
}
function ArtifactSet() {
    return `
        <select id="Set">
            ${
                ARTIFACT_SETS.map(a => `<option value="${a.Name}">${a.Name}</option>`).join('')
            }
        </select>
    `
}
function ArtifactMainStat(type : ArtifactType, value? : string) {
    if (value) {
        (document.querySelector(`[type="${type}"] #MainStat #Value`) as HTMLSelectElement).innerHTML = `
        ${
            ARTIFACT_MAIN_STATS_VALUES[value].map(a => `<option value="${a}">${a}</option>`).join('')
        }
        `
        return
    }

    return `
        <span id="MainStat">
            <select id="Type">
                ${
                    ARTIFACT_MAIN_STATS[type].map(a => `<option value="${a}">${a}</option>`).join('')
                }
            </select>
            <select id="Value">
                ${
                    ARTIFACT_MAIN_STATS_VALUES[ARTIFACT_MAIN_STATS[type][0]].map(a => `<option value="${a}">${a}</option>`).join('')
                }
            </select>
        </span>
    `
}
function ArtifactSubStat() {
    return `
        ${
            [0,1,2,3].map(a => `
                <span id="ss${a}">
                    <select>
                        ${
                            ['HP','ATK','DEF','HP%','ATK%','DEF%','EnergyRecharge','ElementalMastery','CriticalRate','CriticalDamage']
                            .map(b => `<option value="${b}">${b}</option>`).join('')
                        }
                    </select>
                    <input type="number" step="0.1" min="0" value="0">
                </span>
            `).join('')
        }
    `
}

//Attribute Handlers
function changeSet(Old : string, New : string) {
    const NewSt = ARTIFACT_SETS.find(b => b.Name === New)

    return {
        NewSt
    }
}

function changeMainStat(Old : string, New : string) {
    const [OldMS, NewMS] = [Old,New].map(a => JSON.parse(a))

    return {
        NewMS,
        TypeChange : OldMS[0] !== NewMS[0]
    }
}

function changeSubStat(Old : string, New : string) {
    const [OldSS, NewSS] = [Old,New].map(a => JSON.parse(a))

    return {
        NewSS
    }

}