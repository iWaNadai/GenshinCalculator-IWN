import { getPostEffects, getStats, iwnQ } from "../Helper.js";
const TalentMap = new Map();
TalentMap
    //ALBEDO
    .set('Favonious Bladework - Weiss', {
    type: 'Talent',
    name: 'Favonious Bladework - Weiss',
    id: 'FavoniousBladeworkWeiss',
    formRender() {
        var _a;
        const favoniousBladeworkWeiss = document.createElement('div');
        favoniousBladeworkWeiss.id = this.id;
        favoniousBladeworkWeiss.dataset.name = this.name;
        favoniousBladeworkWeiss.dataset.defaultInfusion = 'Physical';
        favoniousBladeworkWeiss
            .innerHTML = `
                            <span id="Level">
                                <label for="level">Level: </label>
                                <input name="level" type="number" max="11" min="1" value="1">
                            </span>
                            <span id="NormalAttack1" data-damage_tags='["NormalAttack"]'>
                                <p class="name">1-Hit DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="NormalAttack2" data-damage_tags='["NormalAttack"]'>
                                <p class="name">2-Hit DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="NormalAttack3" data-damage_tags='["NormalAttack"]'>
                                <p class="name">3-Hit DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="NormalAttack4" data-damage_tags='["NormalAttack"]'>
                                <p class="name">4-Hit DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="NormalAttack5" data-damage_tags='["NormalAttack"]'>
                                <p class="name">5-Hit DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="ChargedAttack" data-damage_tags='["ChargedAttack"]'>
                                <p class="name">Charged Attack DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="ChargedAttackStaminaConsumption">
                                <p class="name">Charged Attack Stamina Consumption</p>
                                <p class="normal"></p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="PlungeAttack" data-damage_tags='["PlungeAttack"]'>
                                <p class="name">Plunge Attack DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="LowPlunge" data-damage_tags='["PlungeAttack"]'>
                                <p class="name">Low Plunge DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="HighPlunge" data-damage_tags='["PlungeAttack"]'>
                                <p class="name">High Plunge DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                        `;
        return (_a = iwnQ(`#${this.id}`).index(0)) !== null && _a !== void 0 ? _a : favoniousBladeworkWeiss;
    },
    connect() {
        const level = iwnQ(`#${this.id} #Level input`);
        level.on('change', e => {
            this.update();
        });
        this.update();
    },
    update() {
        const scalingAtlas = {
            NormalAttack1: [36.74, 39.73, 42.72, 46.99, 49.98, 53.4, 58.1, 62.8, 67.5, 72.62, 78.5],
            NormalAttack2: [36.74, 39.73, 42.72, 46.99, 49.98, 53.4, 58.1, 62.8, 67.5, 72.62, 78.5],
            NormalAttack3: [47.45, 51.32, 55.18, 60.7, 64.56, 68.97, 75.04, 81.11, 87.18, 93.81, 101.39],
            NormalAttack4: [49.75, 53.8, 57.85, 63.63, 67.68, 72.31, 78.68, 85.04, 91.4, 98.34, 106.3],
            NormalAttack5: [62.07, 67.13, 72.18, 79.4, 84.45, 90.22, 98.16, 106.1, 114.04, 122.7, 132.63],
            ChargedAttack: [
                [47.3, 60.2], [51.15, 65.1], [55, 70], [60.5, 77], [64.35, 81.9], [68.75, 87.5], [74.8, 95.2], [80.85, 102.9], [86.9, 110.6], [93.5, 119], [101.06, 128.63]
            ],
            ChargedAttackStaminaConsumption: 20,
            PlungeAttack: [63.93, 69.14, 74.34, 81.77, 86.98, 92.92, 101.1, 109.28, 117.46, 126.38, 135.3],
            LowPlunge: [127.84, 138.24, 148.65, 163.51, 173.92, 185.81, 202.16, 218.51, 234.86, 252.7, 270.54],
            HighPlunge: [159.68, 172.67, 185.67, 204.24, 217.23, 232.09, 252.51, 272.93, 293.36, 315.64, 337.92],
        };
        const talentLevel = parseFloat(iwnQ(`#${this.id} span#Level input`).index(0).value) - 1;
        const spans = iwnQ(`#${this.id} span:not(#Level)`);
        spans
            .forEach((talent) => {
            let talentTags = ['Total'];
            let Bonus;
            let Boost;
            let Special;
            if (talent.id === 'ChargedAttack') {
                talentTags.push('Total', ...JSON.parse(talent.dataset.damage_tags));
                Bonus = getBonus(talentTags);
                Boost = getBoosts(talentTags);
                Special = getSpecial(talentTags);
                const [normal, crit] = iwnQ(talent).query(0, `p:not(.name)`).array();
                const { ATK, CriticalDamage } = getStats();
                const damageScaling = scalingAtlas[talent.id][talentLevel];
                const damage = damageScaling.map(dmgScaling => (((ATK * (dmgScaling / 100)) * Special) + Boost) * Bonus);
                normal.innerHTML = damage.map(dmg => dmg.toFixed(2)).join(' + ');
                crit.innerHTML = damage.map(dmg => (dmg * (1 + (CriticalDamage / 100))).toFixed(2)).join(' + ');
            }
            else if (talent.id === 'ChargedAttackStaminaConsumption') {
                const { StaminaEfficiency } = getStats();
                const talentScaling = scalingAtlas[talent.id];
                const label = iwnQ(talent).query(0, `p.crit-or-boost`).index(0);
                label.innerHTML = (talentScaling * ((100 - StaminaEfficiency) / 100)).toFixed(1);
            }
            else {
                talentTags.push('Total', ...JSON.parse(talent.dataset.damage_tags));
                Bonus = getBonus(talentTags);
                Boost = getBoosts(talentTags);
                Special = getSpecial(talentTags);
                const [normal, crit] = iwnQ(talent).query(0, `p:not(.name)`).array();
                const { ATK, CriticalDamage } = getStats();
                const damageScaling = scalingAtlas[talent.id][talentLevel];
                const damage = (((ATK * (damageScaling / 100)) * Special) + Boost) * Bonus;
                normal.innerHTML = damage.toFixed(2);
                crit.innerHTML = (damage * (1 + (CriticalDamage / 100))).toFixed(2);
            }
        });
    },
    disconnect() {
        const div = iwnQ(`#${this.id}`).index(0);
        if (div) {
            div.remove();
        }
    },
})
    .set('Abiogenesis: Solar Isotoma', {
    type: 'Talent',
    name: 'Abiogenesis: Solar Isotoma',
    id: 'AbiogenesisSolarIsotoma',
    formRender() {
        var _a;
        const abiogenesisSolarIsotoma = document.createElement('div');
        abiogenesisSolarIsotoma.id = this.id;
        abiogenesisSolarIsotoma.dataset.name = this.name;
        abiogenesisSolarIsotoma.dataset.defaultInfusion = 'Geo';
        abiogenesisSolarIsotoma
            .innerHTML = `
                            <span id="Level">
                                <label for="level">Level: </label>
                                <input name="level" type="number" max="11" min="1" value="1">
                            </span>
                            <span id="Skill" data-damage_tags='["Skill","ElementalSkill"]'>
                                <p class="name">Skill DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="TransientBlossom" data-damage_tags='["TransientBlossom"]'>
                                <p class="name">Transient Blossom DMG (DEF%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="Duration">
                                <p class="name">Duration</p>
                                <p class="normal"></p>
                                <p class="crit-or-boost">30s</p>
                            </span>
                            <span id="SkillCD">
                                <p class="name">Skill CD</p>
                                <p class="normal"></p>
                                <p class="crit-or-boost">4s</p>
                            </span>
                        `;
        return (_a = iwnQ(`#${this.id}`).index(0)) !== null && _a !== void 0 ? _a : abiogenesisSolarIsotoma;
    },
    connect() {
        const level = iwnQ(`#${this.id} #Level input`);
        level.on('change', e => {
            this.update();
        });
        this.update();
    },
    update() {
        const scalingAtlas = {
            Skill: [130.4, 140.18, 149.96, 163, 172.78, 182.56, 195.6, 208.64, 221.68, 234.72, 247.76, 260.8, 277.1, 293.4],
            TransientBlossom: [133.6, 143.62, 153.64, 167, 177.02, 187.04, 200.4, 213.76, 227.12, 240.48, 253.84, 267.2, 283.9, 300.6],
            Duration: 30,
            SkillCD: 4,
        };
        const talentLevel = parseFloat(iwnQ(`#${this.id} span#Level input`).index(0).value) - 1;
        const spans = iwnQ(`#${this.id} span:not(#Level)`);
        spans
            .forEach(talent => {
            const talentTags = ['Total'];
            let Bonus;
            let Boost;
            let Special;
            if (talent.id === 'Skill') {
                talentTags.push('Total', ...JSON.parse(talent.dataset.damage_tags));
                Bonus = getBonus(talentTags);
                Boost = getBoosts(talentTags);
                Special = getSpecial(talentTags);
                const [normal, crit] = iwnQ(talent).query(0, `p:not(.name)`).array();
                const { ATK, CriticalDamage } = getStats();
                const damageScaling = scalingAtlas[talent.id][talentLevel];
                const damage = (((ATK * (damageScaling / 100)) * Special) + Boost) * Bonus;
                normal.innerHTML = damage.toFixed(2);
                crit.innerHTML = (damage * (1 + (CriticalDamage / 100))).toFixed(2);
            }
            else if (talent.id === 'TransientBlossom') {
                talentTags.push('Total', ...JSON.parse(talent.dataset.damage_tags));
                Bonus = getBonus(talentTags);
                Boost = getBoosts(talentTags);
                Special = getSpecial(talentTags);
                const [normal, crit] = iwnQ(talent).query(0, `p:not(.name)`).array();
                const { DEF, CriticalDamage } = getStats();
                const damageScaling = scalingAtlas[talent.id][talentLevel];
                const damage = (((DEF * (damageScaling / 100)) * Special) + Boost) * Bonus;
                normal.innerHTML = damage.toFixed(2);
                crit.innerHTML = (damage * (1 + (CriticalDamage / 100))).toFixed(2);
            }
            else if (talent.id === 'SkillCD') {
                const { CooldownReduction } = getStats();
                const talentScaling = scalingAtlas[talent.id];
                const label = iwnQ(talent).query(0, `p.crit-or-boost`).index(0);
                console.log((talentScaling * ((100 - CooldownReduction) / 100)));
                label.innerHTML = `${(talentScaling * ((100 - CooldownReduction) / 100)).toFixed(1)}s`;
            }
            else {
                const talentScaling = scalingAtlas[talent.id];
                const label = iwnQ(talent).query(0, `p.crit-or-boost`).index(0);
                label.innerHTML = `${talentScaling.toFixed(1)}s`;
            }
        });
    },
    disconnect() {
        const div = iwnQ(`#${this.id}`).index(0);
        if (div) {
            div.remove();
        }
    },
})
    .set('Rite of Progeniture: Tectonic Tide', {
    type: 'Talent',
    name: 'Rite of Progeniture: Tectonic Tide',
    id: 'RiteOfProgenitureTectonicTide',
    formRender() {
        var _a;
        const riteOfProgenitureTectonicTide = document.createElement('div');
        riteOfProgenitureTectonicTide.id = this.id;
        riteOfProgenitureTectonicTide.dataset.name = this.name;
        riteOfProgenitureTectonicTide.dataset.defaultInfusion = 'Geo';
        riteOfProgenitureTectonicTide
            .innerHTML = `
                            <span id="Level">
                                <label for="level">Level: </label>
                                <input name="level" type="number" max="11" min="1" value="1">
                            </span>
                            <span id="ElementalBurst" data-damage_tags='["Burst","ElementalBurst"]'>
                                <p class="name">Elemental Burst DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="FatalBlossom" data-damage_tags='["TransientBlossom"]'>
                                <p class="name">Fatal Blossom DMG (ATK%)</p>
                                <p class="normal">100</p>
                                <p class="crit-or-boost">150</p>
                            </span>
                            <span id="SkillCD">
                                <p class="name">Skill CD</p>
                                <p class="normal"></p>
                                <p class="crit-or-boost">12s</p>
                            </span>
                            <span id="EnergyCost">
                                <p class="name">Energy Cost</p>
                                <p class="normal"></p>
                                <p class="crit-or-boost">40s</p>
                            </span>
                        `;
        return (_a = iwnQ(`#${this.id}`).index(0)) !== null && _a !== void 0 ? _a : riteOfProgenitureTectonicTide;
    },
    connect() {
        const level = iwnQ(`#${this.id} #Level input`);
        level.on('change', e => {
            this.update();
        });
        this.update();
    },
    update() {
        const scalingAtlas = {
            ElementalBurst: [367.2, 394.74, 422.28, 459, 486.54, 514.08, 550.8, 587.52, 624.24, 660.96, 697.68, 734.4, 780.3, 826],
            FatalBlossom: [72, 77.4, 82.8, 90, 95.4, 100.8, 108, 115.2, 122.4, 129.6, 136.8, 144, 153, 162],
            SkillCD: 12,
            EnergyCost: 40,
        };
        const talentLevel = parseFloat(iwnQ(`#${this.id} span#Level input`).index(0).value) - 1;
        const spans = iwnQ(`#${this.id} span:not(#Level)`);
        spans
            .forEach(talent => {
            const talentTags = ['Total'];
            let Bonus;
            let Boost;
            let Special;
            if (talent.id === 'SkillCD') {
                const label = iwnQ(talent).query(0, `p:not(.name)`).index(1);
                const output = scalingAtlas[talent.id];
                const { CooldownReduction } = getStats();
                label.innerHTML = `${(output * ((100 - (CooldownReduction)) / 100)).toFixed(1)}s`;
            }
            else if (talent.id === 'EnergyCost') {
                const label = iwnQ(talent).query(0, `p:not(.name)`).index(1);
                const output = scalingAtlas[talent.id];
                label.innerHTML = `${output} Energy`;
            }
            else {
                talentTags.push('Total', ...JSON.parse(talent.dataset.damage_tags));
                Bonus = getBonus(talentTags);
                Boost = getBoosts(talentTags);
                Special = getSpecial(talentTags);
                const [normal, crit] = iwnQ(talent).query(0, `p:not(.name)`).array();
                const { ATK, CriticalDamage } = getStats();
                const damageScaling = scalingAtlas[talent.id][talentLevel];
                const damage = (((ATK * (damageScaling / 100)) * Special) + Boost) * Bonus;
                if (talent.id === 'FatalBlossom') {
                    normal.innerHTML = `${damage.toFixed(2)} each`;
                    crit.innerHTML = `${(damage * (1 + (CriticalDamage / 100))).toFixed(2)} each`;
                }
                else {
                    normal.innerHTML = damage.toFixed(2);
                    crit.innerHTML = (damage * (1 + (CriticalDamage / 100))).toFixed(2);
                }
            }
        });
    },
    disconnect() {
        const div = iwnQ(`#${this.id}`).index(0);
        if (div) {
            div.remove();
        }
    },
})
    //JEAN
    .set('Favonious Bladework', {
    type: 'Talent',
    name: 'Favonious Bladework',
    id: 'FavoniousBladework',
    formRender() {
        var _a;
        const favoniousBladework = document.createElement('div');
        favoniousBladework.id = this.id;
        favoniousBladework.dataset.name = this.name;
        favoniousBladework
            .innerHTML = `
                        <div>
                            Jean 1
                        </div>
                    `;
        return (_a = iwnQ(`#${this.id}`).index(0)) !== null && _a !== void 0 ? _a : favoniousBladework;
    },
    connect() { },
    update() {
    },
    disconnect() { },
});
export default TalentMap;
function getBonus(damageTags) {
    const bonusNames = damageTags.map(a => `${a}DamageBonus`);
    const Stats = getStats();
    const PostEffects = getPostEffects();
    const Bonuses = [];
    Object.entries(Stats)
        .forEach(([key, value]) => {
        if (bonusNames.includes(key))
            Bonuses.push(value);
    });
    Object.entries(PostEffects)
        .filter(([key, value]) => {
        if (bonusNames.includes(key))
            Bonuses.push(value);
    });
    return Bonuses.reduce((a, b) => a + b, 100) / 100;
}
function getBoosts(damageTags) {
    const boostsNames = damageTags.map(a => `${a}DamageBoosts`);
    const Stats = getStats();
    const PostEffects = getPostEffects();
    const Boosts = [];
    Object.entries(Stats)
        .forEach(([key, value]) => {
        if (boostsNames.includes(key))
            Boosts.push(value);
    });
    Object.entries(PostEffects)
        .filter(([key, value]) => {
        if (boostsNames.includes(key))
            Boosts.push(value);
    });
    return Boosts.reduce((a, b) => a + b, 0);
}
function getSpecial(damageTags) {
    const specialsNames = damageTags.map(a => `${a}DamageSpecials`);
    const Stats = getStats();
    const PostEffects = getPostEffects();
    const Specials = [];
    Object.entries(Stats)
        .forEach(([key, value]) => {
        if (specialsNames.includes(key))
            Specials.push(value);
    });
    Object.entries(PostEffects)
        .filter(([key, value]) => {
        if (specialsNames.includes(key))
            Specials.push(value);
    });
    return Specials.reduce((a, b) => a + b, 100) / 100;
}
