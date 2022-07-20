export type ElementType = 'Anemo' | 'Geo' | 'Electro' | 'Dendro' | 'Hydro' | 'Pyro' | 'Cryo'

export type WeaponType = 'Sword' | 'Bow' | 'Catalyst' | 'Polearm' | 'Claymore'

export type ArtifactType = 'Flower' | 'Feather' | 'Sands' | 'Goblet' | 'Circlet'

export interface Character {
    [key: string] : any
    Name : string;
    Type : WeaponType;
    Element : ElementType;
    Image : string;
    Stats : {
        [key: string] : any
        Base : {
            [key: string] : any
            HP : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ATK : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DEF : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElementalMastery? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            MoveSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AttackSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalRate? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            EnergyRecharge? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CooldownReduction? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            IncomingHealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ShieldStrength? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            TotalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
        }
        Bonus : {
            [key: string] : any
            HP? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ATK? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DEF? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'HP%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'ATK%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'DEF%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElementalMastery? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            MoveSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AttackSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalRate? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            EnergyRecharge? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CooldownReduction? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            IncomingHealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ShieldStrength? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            TotalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
        }
    },
    Rank? : number
    Level? : number
    Talents : {[key: string] : string}
    Constellations?: (string)[]
}

export interface Weapon {
    [key: string] : any
    Name : string;
    Type : WeaponType;
    Image : string;
    Stats : {
        [key: string] : any
        Base : {
            [key: string] : any
            ATK : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
        }
        Bonus : {
            [key: string] : any
            HP? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ATK? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DEF? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'HP%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'ATK%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'DEF%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElementalMastery? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            MoveSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AttackSpeed? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalRate? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            EnergyRecharge? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CooldownReduction? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            IncomingHealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ShieldStrength? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            TotalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
        }
    }
    Rank? : number
    Passive : string[]
}

export interface Artifact {
    [key: string] : any
    Set : string;
    Type : ArtifactType;
    Stats : {
        [key: string] : any
        HP? : number
        ATK? : number
        DEF? : number
        'HP%'? : number
        'ATK%'? : number
        'DEF%'? : number
        ElementalMastery? : number
        CriticalRate? : number
        CriticalDamage? : number
        EnergyRecharge? : number
        HealingBonus? : number
        ShieldStrength? : number
        AnemoDamage? : number
        AnemoResistance? : number
        GeoDamage? : number
        GeoResistance? : number
        ElectroDamage? : number
        ElectroResistance? : number
        DendroDamage? : number
        DendroResistance? : number
        HydroDamage? : number
        HydroResistance? : number
        PyroDamage? : number
        PyroResistance? : number
        CryoDamage? : number
        CryoResistance? : number
        PhysicalDamage? : number
        PhysicalResistance? : number
    }
}

export interface ArtifactSet {
    [key: string] : any
    Name : string
    Image : {
        [key: string] : any
        Flower : string;
        Feather : string;
        Sands : string;
        Goblet : string;z
        Circlet : string;
    }
    Bonuses : {
        [key: string] : any
        TwoPiece? : {
            [key: string] : any
            HP? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ATK? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DEF? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'HP%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'ATK%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            'DEF%'? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElementalMastery? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalRate? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CriticalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            EnergyRecharge? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HealingBonus? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ShieldStrength? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            AnemoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            GeoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            ElectroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            DendroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            HydroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PyroResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            CryoResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalDamage? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]
            PhysicalResistance? : number | [number, number, number, number, number, number, number, number, number, number, number, number, number, number]

        }
        FourPiece? : {
            [key: string] : any
        }
    }
}

export interface Effect {
    [key: string] : any
    type : 'Effect'
    name : string;
    id : string
    formRender() : string,
    connect() : any
    disconnect() : any
    output?(...args?) : {[key : string]: any}
}
export interface Talent {
    [key: string] : any
    type : 'Talent'
    name : string;
    id : string;
    formRender() : string;
    connect() : any;
    disconnect() : any;

}