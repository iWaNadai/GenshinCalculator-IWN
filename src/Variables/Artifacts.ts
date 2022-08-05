import { Character, Weapon, ArtifactSet, Effect} from '../types';

const ArtifactMap: Map<string, ArtifactSet> = new Map
ArtifactMap
    .set('Husk of Oppulent Dreams', {
        Name: 'Husk of Oppulent Dreams',
        Image : {
            Flower : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Flower.png',
            Feather : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Feather.png',
            Sands : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Sands.png',
            Goblet : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Goblet.png',
            Circlet : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Circlet.png',
        },
    })
    .set('Pale Flame',{
        Name: 'Pale Flame',
        Image : {
            Flower : '/UserInterface/Images/Artifacts/PaleFlame_Flower.png',
            Feather : '/UserInterface/Images/Artifacts/PaleFlame_Feather.png',
            Sands : '/UserInterface/Images/Artifacts/PaleFlame_Sands.png',
            Goblet : '/UserInterface/Images/Artifacts/PaleFlame_Goblet.png',
            Circlet : '/UserInterface/Images/Artifacts/PaleFlame_Circlet.png',
        }
    })

export default ArtifactMap

export const ARTIFACT_MAIN_STATS_VALUES : {[key: string] : number[]} = 
{
    HP : [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
    ATK : [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],        
    'HP%' : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    'ATK%' : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    'DEF%' : [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    PhysicalDamageBonus : [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    AnemoDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    GeoDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    ElectroDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    DendroDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    HydroDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    PyroDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    CryoDamageBonus : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    ElementalMastery : [28, 35, 43, 51, 59, 67, 75, 83, 91, 99, 107, 115, 123, 131, 138, 146, 154, 162, 170, 178, 186],
    EnergyRecharge : [7.8, 10, 12.2, 14.4, 16.6, 18.8, 21, 23.2, 25.4, 27.6, 29.8, 32, 34.2, 36.4, 38.6, 40.8, 43, 45.2, 47.4, 49.6, 51.8],
    CriticalRate : [4.7, 6, 7.4, 8.7, 10, 11.4, 12.7, 14, 15.4, 16.7, 18, 19.3, 20.7, 22, 23.3, 24.7, 26, 27.3, 28.7, 30, 31.1],
    CriticalDamage : [9.3, 11.9, 14.6, 17.2, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.8, 41.1, 43.7, 46.3, 49, 51.6, 54.3, 56.9, 59.6, 62.2],
    HealingBonus : [5.4, 6.9, 8.4, 10, 11.5, 13, 14.5, 16.1, 17.6, 19.1, 20.6, 22.2, 23.7, 25.2, 26.7, 28.3, 29.8, 31.3, 32.8, 34.4, 35.9]
}

export const ARTIFACT_MAIN_STATS : {[key: string] : string[]} = {
    Flower : ['HP'],
    Feather : ['ATK'],
    Sands : ['HP%','ATK%','DEF%','ElementalMastery','EnergyRecharge'],
    Goblet : ['HP%','ATK%','DEF%','ElementalMastery','AnemoDamageBonus','GeoDamageBonus','ElectroDamageBonus','DendroDamageBonus','HydroDamageBonus','PyroDamageBonus','CryoDamageBonus','PhysicalDamageBonus'],
    Circlet : ['HP%','ATK%','DEF%','ElementalMastery','CriticalRate','CriticalDamage','HealingBonus'],
}

export const ARTIFACT_SUB_STATS : string[] = ['HP','ATK','DEF','HP%','ATK%','DEF%','EnergyRecharge','ElementalMastery','CriticalRate','CriticalDamage']