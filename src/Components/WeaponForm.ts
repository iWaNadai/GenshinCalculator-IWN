import { AppState } from "../App.js";
import { iwnComponent, iwnQ, stateChange, states } from "../Helper.js";
import WeaponMap from "../Variables/Weapons.js"
import CharacterMap from "../Variables/Characters.js"
import { Weapon } from "../types";

export default class WeaponForm extends HTMLElement implements iwnComponent {
    static readonly tag = 'iwn-weapon-form';
    Dependencies: states[] = ['characterSelected','weaponSelected'];

    constructor() {
        super()

        this.renderElement()
    }

    renderElement(state?: states, prevVal?: string, newVal?: string): void {
        if (state) {
            const WeaponSelector = iwnQ(`${WeaponForm.tag} #WeaponSelector`).index(0) as HTMLSelectElement
            const WeaponImage = iwnQ(`${WeaponForm.tag} #WeaponImage`).index(0) as HTMLImageElement

            switch (state) {
                case 'characterSelected':
                    const [prev, newv] = [prevVal,newVal].map(a => CharacterMap.get(a as string)?.Type)
                    if (prev === newv) return;

                    WeaponSelector.innerHTML = `
                        ${Array.from(WeaponMap.values())
                            .filter(a => a.Type === newv)
                            .map(a => a.Name)
                            .map(a => `<option value="${a}">${a}</option>`)
                            .join('')}
                        `
                    this.Weapon = WeaponSelector.value

                    break;
                case 'weaponSelected':
                    WeaponImage.src = WeaponMap.get(AppState.weaponForm.name)?.Image as string
                    break
            }
        } else {

            const {name,level,rank} = AppState.weaponForm;

            this.innerHTML = `
                <div>
                    <img id="WeaponImage" src="${WeaponMap.get(name)?.Image as string}">
                    <select id="WeaponSelector">
                        ${(() => {
                            return Array.from(WeaponMap.values())
                                    .filter(a => a.Type === 'Sword')
                                    .map(a => a.Name)
                                    .map(a => `<option ${(name === a)?'selected':''} value="${a}">${a}</option>`)
                                    .join('')
                        })()}
                    </select>
                    <select id="LevelSelector">
                        ${(() => {
                            return ['1/20','20/20','20/40','40/40','40/50','50/50','50/60','60/60','60/70','70/70','70/80','80/80','80/90','90/90',]
                                    .map((a,b) => `<option ${(level === b)?'selected':''} value="${b}">${a}</option>`)
                                    .join('')
                        })()}
                    </select>
                    <select id="RankSelector">
                        ${(() => {
                            return ['R1','R2','R3','R4','R5']
                                    .map((a,b) => `<option ${(rank === b)?'selected':''} value="${b}">${a}</option>`)
                                    .join('')
                        })()}
                    </select>
                </div>
            `

            const WeaponSelector = iwnQ(`${WeaponForm.tag} #WeaponSelector`)
            const LevelSelector = iwnQ(`${WeaponForm.tag} #LevelSelector`)
            const RankSelector = iwnQ(`${WeaponForm.tag} #RankSelector`)

            WeaponSelector
                .on('change', e => {
                    this.Weapon = (WeaponSelector.index(0) as HTMLSelectElement).value
                })
            LevelSelector
                .on('change', e => {
                    this.Level = (LevelSelector.index(0) as HTMLSelectElement).value
                })
            RankSelector
                .on('change', e => {                    
                    this.Rank = (RankSelector.index(0) as HTMLSelectElement).value
                })
        }
    }

    Update(state: states, prevVal: string, newVal: string) {
        switch(state) {
            case 'characterSelected':
                this.renderElement('characterSelected', prevVal, newVal)
                break;
            case 'weaponSelected':
                this.renderElement('weaponSelected', prevVal, newVal)
                break;
        }
    }

    private set Weapon(value:string) {
        const valueCheck = WeaponMap.get(value)
        if (!valueCheck) return

        const [preVal, newVal] = [AppState.weaponForm.name, valueCheck.Name]
        AppState.weaponForm.name = newVal;

        stateChange('weaponSelected', preVal, newVal)
    }

    private set Level(value:string) {
        const valueCheck = parseFloat(value)
        if (isNaN(valueCheck)) return

        const [preVal, newVal] = [AppState.weaponForm.level, valueCheck]
        AppState.weaponForm.level = newVal

        stateChange('weaponLevel', preVal, newVal)
    }

    private set Rank(value:string) {
        const valueCheck = parseFloat(value)
        if (isNaN(valueCheck)) return

        const [preVal, newVal] = [AppState.weaponForm.rank, valueCheck]
        AppState.weaponForm.rank = newVal


        stateChange('weaponRank',preVal,newVal)
    }
}