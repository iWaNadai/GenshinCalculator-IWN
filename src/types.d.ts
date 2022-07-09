import { CHARACTERS } from "./Variables/DataFile";

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
        Bonus : {
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
    },
    Rank? : number
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
    }
    Rank? : number
}

export interface Artifact {
    [key: string] : any
    Set : string;
    Type : ArtifactType;
    MainStat : [string, number]
    SubStat : [string, number][]
}

export interface ArtifactSet {
    [key: string] : any
    Name : string
    Image : {
        [key: string] : any
        Flower : string;
        Feather : string;
        Sands : string;
        Goblet : string;
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

export type InputType = 'Auto' | 'Select' | 'Switch'