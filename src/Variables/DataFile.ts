import { Character, Weapon, ArtifactSet} from '../types';

export const CHARACTERS : Character[] = [
    {
        Name : 'Albedo',
        Type : 'Sword',
        Element : 'Geo',
        Image : '/UserInterface/Images/Characters/Albedo.png',
        Stats : {
            Base : {
                HP: [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
                ATK: [20, 51, 68, 101, 113, 130, 146, 163, 175, 192, 204, 222, 233, 251],
                DEF : [68, 177, 235, 352, 394, 453, 508, 568, 610, 670, 712, 773, 815, 876],
                EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                CriticalRate : [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                CriticalDamage : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            Bonus : {
                GeoDamage: [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
            }
        }
    },
    {
        Name : 'Jean',
        Type : 'Sword',
        Element : 'Anemo',
        Image : '/UserInterface/Images/Characters/Jean.png',
        Stats : {
            Base : {
                HP: [1144, 2967, 3948, 5908, 6605, 7599, 8528, 9533, 10230, 11243, 11940, 12965, 13662, 14695],
                ATK: [19, 48, 64, 96, 108, 124, 139, 155, 166, 183, 194, 211, 222, 239],
                DEF: [60, 155, 206, 309, 345, 397, 446, 49, 535, 588, 624, 678, 715, 769],
                EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                CriticalRate : [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                CriticalDamage : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],            
            },
            Bonus : {
                HealingBonus : [0, 0, 0, 0, 5.5, 5.5, 11.1, 11.1, 11.1, 11.1, 16.6, 16.6, 22.2, 22.2]
            }
        }
    },
    {
        Name : 'Bennett',
        Type : 'Sword',
        Element : 'Pyro',
        Image : '/UserInterface/Images/Characters/Bennett.png',
        Stats : {
            Base : {
                HP: [1039, 2670, 3447, 5163, 5715, 6573, 7309, 8168, 8719, 9577, 10129, 10987, 11539, 12397],
                ATK: [16, 41, 53, 80, 88, 101, 113, 126, 134, 148, 156, 169, 178, 191],
                DEF: [65, 166, 214, 321, 356, 409, 455, 508, 542, 596, 630, 684, 718, 771],
                EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                CriticalRate : [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                CriticalDamage : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            Bonus : {
                EnergyRecharge: [0, 0, 0, 0, 6.7, 6.7, 13.3, 13.3, 13.3, 13.3, 20, 20, 26.7, 26.7]
            }
        }
    },
    {
        Name : 'Eula',
        Type : 'Claymore',
        Element : 'Cryo',
        Image : '/UserInterface/Images/Characters/Eula.png',
        Stats : {
            Base : {
                HP: [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
                ATK: [27, 69, 92, 138, 154, 177, 199, 222, 238, 263, 278, 302, 318, 342],
                DEF: [58, 152, 202, 302, 337, 388, 436, 487, 523, 574, 610, 662, 698, 751],
                EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                CriticalRate : [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                CriticalDamage : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            Bonus : {
                CriticalDamage: [0, 0, 0, 0, 9.6, 9.6, 19.2, 19.2, 19.2, 19.2, 28.8, 28.8, 38.4, 38.4]
            }
        }
    },
    {
        Name : 'Xiao',
        Type : 'Polearm',
        Element : 'Anemo',
        Image : '/UserInterface/Images/Characters/Xiao.png',
        Stats : {
            Base : {
                HP: [991, 2572, 3422, 5120, 5724, 6586, 7391, 8262, 8866, 9744, 10348, 11236, 11840, 12736],
                ATK: [27, 71, 94, 141, 157, 181, 203, 227, 243, 267, 284, 308, 325, 349],
                DEF: [62, 161, 215, 321, 359, 413, 464, 519, 556, 612, 649, 705, 743, 799],
                EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                CriticalRate : [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                CriticalDamage : [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            },
            Bonus : {
                CriticalRate: [0, 0, 0, 0, 4.8, 4.8, 9.6, 9.6, 9.6, 9.6, 14.4, 14.4, 19.2, 19.2]
            }
        }
    },
]

export const WEAPONS : Weapon[] = [
    {
        Name: 'Cinnabar Spindle',
        Type : 'Sword',
        Image : "/UserInterface/Images/Weapons/CinnabarSpindle.png",
        Stats : {
            Base : {
                ATK : [41, 99, 125, 184, 210, 238, 264, 293, 319, 347, 373, 401, 427, 454],
            },
            Bonus : {
                "DEF%" : [15, 26.5, 26.5, 38.7, 38.7, 44.7, 44.7, 50.8, 50.8, 56.8, 56.8, 62.9, 62.9, 69]
            }
        }
    },
    {
        Name: 'Festering Desire',
        Type : 'Sword',
        Image : "/UserInterface/Images/Weapons/FesteringDesire.png",
        Stats : {
            Base : {
                ATK : [42, 109, 135, 205, 231, 266, 292, 327, 353, 388, 414, 449, 475, 510],
            },
            Bonus : {
                EnergyRecharge : [10, 17.7, 17.7, 25.8, 25.8, 29.8, 29.8, 33.8, 33.8, 37.9, 37.9, 41.9, 41.9, 45.9]
            }
        }
    },
    {
        Name: 'Song of Broken Pines',
        Type : 'Claymore',
        Image : "/UserInterface/Images/Weapons/SongOfBrokenPines.png",
        Stats : {
            Base : {
                ATK : [49, 145, 176, 286, 317, 374, 406, 464, 495, 555, 586, 648, 679, 741],
            },
            Bonus : {
                PhysicalDamage : [4.5, 8, 8, 11.6, 11.6, 13.4, 13.4, 15.2, 15.2, 17, 17, 18.9, 18.9, 20.7]
            }
        }
    },
    {
        Name: 'Snow-Tombed Starsilver',
        Type : 'Claymore',
        Image : "/UserInterface/Images/Weapons/Snow-TombedStarsilver.png",
        Stats : {
            Base : {
                ATK : [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
            },
            Bonus : {
                PhysicalDamage : [7.5, 13.3, 13.3, 19.3, 19.3, 22.4, 22.4, 25.4, 25.4, 28.4, 28.4, 31.5, 31.5, 34.5]
            }
        }
    },
    {
        Name: 'Primordial Jade Winged-Spear',
        Type : 'Polearm',
        Image : "/UserInterface/Images/Weapons/PrimordialJadeWinged-Spear.png",
        Stats : {
            Base : {
                ATK : [48, 133, 164, 261, 292, 341, 373, 423, 355, 506, 537, 590, 621, 674],
            },
            Bonus : {
                CriticalRate : [4.8, 8.5, 8.5, 12.4, 12.4, 14.3, 14.3, 16.2, 16.2, 18.2, 18.2, 20.1, 20.1, 22.1]
            }
        }
    },
    {
        Name : 'Lithic Spear',
        Type : 'Polearm',
        Image : '/UserInterface/Images/Weapons/LithicSpear.png',
        Stats : {
            Base : {
                ATK : [44, 119, 144, 226, 252, 293, 319, 361, 387, 429, 455, 497, 523, 565],
            },
            Bonus : {
                "ATK%" : [6, 10.6, 10.6, 15.5, 15.5, 17.9, 17.9, 20.3, 20.3, 22.7, 22.7, 25.1, 25.1, 27.6]
            }
        }
    }
]

export const ARTIFACT_SETS : ArtifactSet[] = [
    {
        Name: 'Husk of Oppulent Dreams',
        Image : {
            Flower : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Flower.png',
            Feather : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Feather.png',
            Sands : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Sands.png',
            Goblet : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Goblet.png',
            Circlet : '/UserInterface/Images/Artifacts/HuskOfOppulentDreams_Circlet.png',
        },
        Bonuses : {
            TwoPiece : {
                "DEF%" : 30 
            }
        }
    },
    {
        Name: 'Pale Flame',
        Image : {
            Flower : '/UserInterface/Images/Artifacts/PaleFlame_Flower.png',
            Feather : '/UserInterface/Images/Artifacts/PaleFlame_Feather.png',
            Sands : '/UserInterface/Images/Artifacts/PaleFlame_Sands.png',
            Goblet : '/UserInterface/Images/Artifacts/PaleFlame_Goblet.png',
            Circlet : '/UserInterface/Images/Artifacts/PaleFlame_Circlet.png',
        },
        Bonuses : {
            TwoPiece : {
                PhysicalDamage: 25
            }
        }
    }
]

export const ARTIFACT_MAIN_STATS_VALUES : {[key: string] : number[]} = 
{
    HP : [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
    ATK : [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],        
    'HP%' : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    'ATK%' : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    'DEF%' : [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    PhysicalDamage : [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    AnemoDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    GeoDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    ElectroDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    DendroDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    HydroDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    PyroDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    CryoDamage : [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
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
    Goblet : ['HP%','ATK%','DEF%','ElementalMastery','AnemoDamage','GeoDamage','ElectroDamage','DendroDamage','HydroDamage','PyroDamage','CryoDamage','PhysicalDamage'],
    Circlet : ['HP%','ATK%','DEF%','ElementalMastery','CriticalRate','CriticalDamage','HealingBonus'],
}