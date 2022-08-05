import { getArtifacts, getCharacter, getWeapon, iwnComponent, iwnQ, states } from "../Helper.js";
import { Talent } from "../types";
import Talents from "../Variables/Talents.js";

export default class TalentBoard extends HTMLElement implements iwnComponent {
    static readonly tag = 'iwn-talentboard'
    public Dependencies: states[] = [];
    private talentsList: Talent[] = []

    constructor() {
        super()

        this.renderElement()
    }

    renderElement(): void {
        this.innerHTML = `
                    <div>
                    </div>
                `
        this.Talents = getAllTalents()
    }

    Update(state: states, prevVal: string, newVal: string): void {
        this.Talents = getAllTalents()

        this.talentsList
            .forEach(a => a.update())
    }

    private set Talents(talentsInPlay : Talent[]) {
        const inactiveTalents = getInactiveTalents(talentsInPlay, this.talentsList)
            inactiveTalents
                .forEach(a => {
                    a.disconnect()
                })
        const newTalents = getNewTalents(talentsInPlay, this.talentsList)
            newTalents
                .forEach(a => {
                    const div = iwnQ(`${TalentBoard.tag} div`).index(0) as HTMLDivElement
                    div.appendChild(a.formRender())
                    a.connect()
                })
        
                this.talentsList = talentsInPlay
    }
}

function getAllTalents() {
    const talentsInPlay : Talent[] = []
    const Character = getCharacter()
    const Weapon = getWeapon()
    const Artifacts = getArtifacts()

    
    if (Talents.get(Character.Talents.NormalAttack)) {
        const passive = Talents.get(Character.Talents.NormalAttack) as Talent
        
        talentsInPlay.push(passive)
    }
    
    if (Talents.get(Character.Talents.ElementalSkill)) {
        const passive = Talents.get(Character.Talents.ElementalSkill) as Talent
        
        talentsInPlay.push(passive)
    }
    
    if (Talents.get(Character.Talents.ElementalBurst)) {
        const passive = Talents.get(Character.Talents.ElementalBurst) as Talent
        
        talentsInPlay.push(passive)
    }
    
    if ((Character.Level as number) >= 2) {
        const passive = Talents.get(Character.Talents['A1Passive'])
        
        if (passive) talentsInPlay.push(passive)
    }
    if ((Character.Level as number) >= 8) {
        const passive = Talents.get(Character.Talents['A4Passive']);
        
        if (passive) talentsInPlay.push(passive)
    }
    
    console.log('talentsInPlay', talentsInPlay)

    return talentsInPlay
}

function getInactiveTalents(talentsInPlay : Talent[], talentsRegistered: Talent[]) {
    const inactiveTalents = talentsRegistered
                                .filter(a => {
                                    if (talentsInPlay.find(b => b.name === a.name)) return false
                                    else return true
                                })
    return inactiveTalents
}

function getNewTalents(talentsInPlay : Talent[], talentsRegistered: Talent[]) {
    const newTalents = talentsInPlay
                        .filter(a => {
                            if (talentsRegistered.find(b => b.name === a.name)) return false
                            else return true
                        })
    return newTalents
}