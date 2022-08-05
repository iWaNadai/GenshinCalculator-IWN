export const types = {
    HP: 0,
    ATK: 1,
    DEF: 2,
    ElementalMastery: 3,
    MoveSpeed: 4,
    StaminaEfficiency: 5,
    AttackSpeed: 6,
    CooldownReduction: 7,
    EnergyRecharge: 8,
    CriticalRate: 9,
    CriticalDamage: 10,
    HealingBonus: 11,
    ShieldStrength: 12,
    AnemoDamageBonus: 13,
    AnemoResistance: 14,
    GeoDamageBonus: 15,
    GeoResistance: 16,
    ElectroDamageBonus: 17,
    ElectroResistance: 18,
    DendroDamageBonus: 19,
    DendroResistance: 10,
    HydroDamageBonus: 21,
    HydroResistance: 22,
    PyroDamageBonus: 23,
    PyroResistance: 24,
    CryoDamageBonus: 25,
    CryoResistance: 26,
    PhysicalDamageBonus: 27,
    PhysicalResistance: 28,
};
const CharacterMap = new Map;
CharacterMap
    .set('Albedo', {
    Interface: 'Character',
    Name: 'Albedo',
    Type: 'Sword',
    Element: 'Geo',
    Image: '/UserInterface/Images/Characters/Albedo.png',
    Stats: {
        Base: {
            HP: [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
            ATK: [20, 51, 68, 101, 113, 130, 146, 163, 175, 192, 204, 222, 233, 251],
            DEF: [68, 177, 235, 352, 394, 453, 508, 568, 610, 670, 712, 773, 815, 876],
            EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            CriticalRate: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            CriticalDamage: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            MoveSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            AttackSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            Cooldown: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        },
        Bonus: {
            GeoDamageBonus: [0, 0, 0, 0, 7.2, 7.2, 14.4, 14.4, 14.4, 14.4, 21.6, 21.6, 28.8, 28.8],
        }
    },
    Talents: {
        NormalAttack: 'Favonious Bladework - Weiss',
        ElementalSkill: 'Abiogenesis: Solar Isotoma',
        ElementalBurst: 'Rite of Progeniture: Tectonic Tide',
        A1Passive: 'Calcite Might',
        A4Passive: 'Homuncular Nature',
        UPassive: ''
    },
    Constellations: ['', 'Flower of Eden', 'Opening of Phanerozoic', '', 'Descent of Divinity', '', 'Dust of Purification']
})
    .set('Jean', {
    Interface: 'Character',
    Name: 'Jean',
    Type: 'Sword',
    Element: 'Anemo',
    Image: '/UserInterface/Images/Characters/Jean.png',
    Stats: {
        Base: {
            HP: [1144, 2967, 3948, 5908, 6605, 7599, 8528, 9533, 10230, 11243, 11940, 12965, 13662, 14695],
            ATK: [19, 48, 64, 96, 108, 124, 139, 155, 166, 183, 194, 211, 222, 239],
            DEF: [60, 155, 206, 309, 345, 397, 446, 49, 535, 588, 624, 678, 715, 769],
            EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            CriticalRate: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            CriticalDamage: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            MoveSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            AttackSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            Cooldown: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        },
        Bonus: {
            HealingBonus: [0, 0, 0, 0, 5.5, 5.5, 11.1, 11.1, 11.1, 11.1, 16.6, 16.6, 22.2, 22.2]
        }
    },
    Talents: {
        NormalAttack: 'Favonious Bladework',
        ElementalSkill: '',
        ElementalBurst: '',
        A1Passive: 'Wind Companion',
        A4Passive: 'Let the Wind Lead'
    },
    Constellations: ['', '', '', '', '', '', '']
})
    .set('Bennett', {
    Interface: 'Character',
    Name: 'Bennett',
    Type: 'Sword',
    Element: 'Pyro',
    Image: '/UserInterface/Images/Characters/Bennett.png',
    Stats: {
        Base: {
            HP: [1039, 2670, 3447, 5163, 5715, 6573, 7309, 8168, 8719, 9577, 10129, 10987, 11539, 12397],
            ATK: [16, 41, 53, 80, 88, 101, 113, 126, 134, 148, 156, 169, 178, 191],
            DEF: [65, 166, 214, 321, 356, 409, 455, 508, 542, 596, 630, 684, 718, 771],
            EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            CriticalRate: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            CriticalDamage: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            MoveSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            AttackSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            Cooldown: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        },
        Bonus: {
            EnergyRecharge: [0, 0, 0, 0, 6.7, 6.7, 13.3, 13.3, 13.3, 13.3, 20, 20, 26.7, 26.7]
        }
    },
    Talents: {
        NormalAttack: '',
        ElementalSkill: '',
        ElementalBurst: '',
        A1Passive: '',
        A4Passive: ''
    },
    Constellations: ['', '', '', '', '', '', '']
})
    .set('Eula', {
    Interface: 'Character',
    Name: 'Eula',
    Type: 'Claymore',
    Element: 'Cryo',
    Image: '/UserInterface/Images/Characters/Eula.png',
    Stats: {
        Base: {
            HP: [1030, 2671, 3554, 5317, 5944, 6839, 7675, 8579, 9207, 10119, 10746, 11669, 12296, 13226],
            ATK: [27, 69, 92, 138, 154, 177, 199, 222, 238, 263, 278, 302, 318, 342],
            DEF: [58, 152, 202, 302, 337, 388, 436, 487, 523, 574, 610, 662, 698, 751],
            EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            CriticalRate: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            CriticalDamage: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            MoveSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            AttackSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            Cooldown: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        },
        Bonus: {
            CriticalDamage: [0, 0, 0, 0, 9.6, 9.6, 19.2, 19.2, 19.2, 19.2, 28.8, 28.8, 38.4, 38.4]
        }
    },
    Talents: {
        NormalAttack: '',
        ElementalSkill: '',
        ElementalBurst: '',
        A1Passive: '',
        A4Passive: ''
    },
    Constellations: ['', '', '', '', '', '', '']
})
    .set('Xiao', {
    Interface: 'Character',
    Name: 'Xiao',
    Type: 'Polearm',
    Element: 'Anemo',
    Image: '/UserInterface/Images/Characters/Xiao.png',
    Stats: {
        Base: {
            HP: [991, 2572, 3422, 5120, 5724, 6586, 7391, 8262, 8866, 9744, 10348, 11236, 11840, 12736],
            ATK: [27, 71, 94, 141, 157, 181, 203, 227, 243, 267, 284, 308, 325, 349],
            DEF: [62, 161, 215, 321, 359, 413, 464, 519, 556, 612, 649, 705, 743, 799],
            EnergyRecharge: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            CriticalRate: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            CriticalDamage: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            MoveSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            AttackSpeed: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            Cooldown: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        },
        Bonus: {
            CriticalRate: [0, 0, 0, 0, 4.8, 4.8, 9.6, 9.6, 9.6, 9.6, 14.4, 14.4, 19.2, 19.2]
        }
    },
    Talents: {
        NormalAttack: '',
        ElementalSkill: '',
        ElementalBurst: '',
        A1Passive: '',
        A4Passive: ''
    },
    Constellations: ['', '', '', '', '', '', '']
});
export default CharacterMap;
