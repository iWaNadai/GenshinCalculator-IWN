import { types } from "./Characters.js";
export default [
    {
        type: "Talent",
        name: 'Favonious Bladework - Weiss',
        id: 'Favonious-Bladework-Weiss',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}" data-infusion="Physical">
                    <span id="Level">
                        <label for="level">Level:</label><input type="number" name="level" value="1" min="1" max="10">
                    </span>
                    <span id="NormalAttack1" data-info='["NormalAttack"]'>
                        <p class="name">1-Hit DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="NormalAttack2" data-info='["NormalAttack"]'>
                        <p class="name">2-Hit DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="NormalAttack3" data-info='["NormalAttack"]'>
                        <p class="name">3-Hit DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="NormalAttack4" data-info='["NormalAttack"]'>
                        <p class="name">4-Hit DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="NormalAttack5" data-info='["NormalAttack"]'>
                        <p class="name">5-Hit DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="ChargedAttack" data-info='["ChargedAttack"]'>
                        <p class="name">Charged Attack DMG(ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="Plunge" data-info='["Plunge"]'>
                        <p class="name">Plunge DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="LowPlunge" data-info='["Plunge"]'>
                        <p class="name">Low Plunge DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="HighPlunge" data-info='["Plunge"]'>
                        <p class="name">High Plunge DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                </div>
            `;
        },
        connect() {
            document.querySelector(`#${this.id} #Level input`).onchange = handler;
            const { id } = this;
            window.addEventListener('gic:Update', e => {
                const CHANGED = e.detail.changed;
                if (CHANGED === 'Stats') {
                    handler();
                }
            });
            function handler() {
                const SCALE_ATLAS = {
                    NormalAttack1: [
                        36.74, 39.73, 42.72, 46.99, 49.98, 53.4, 58.1, 62.8, 67.5, 72.62, 78.5
                    ],
                    NormalAttack2: [
                        36.74, 39.73, 42.72, 46.99, 49.98, 53.4, 58.1, 62.8, 67.5, 72.62, 78.5
                    ],
                    NormalAttack3: [
                        47.45, 51.32, 55.18, 60.7, 64.56, 68.97, 75.04, 81.11, 87.18, 93.81, 101.39
                    ],
                    NormalAttack4: [
                        49.75, 53.8, 57.85, 63.63, 67.68, 72.32, 78.68, 85.04, 91.4, 98.34, 106.3
                    ],
                    NormalAttack5: [
                        62.07, 67.13, 72.18, 79.4, 84.45, 90.22, 98.16, 106.1, 114.04, 122.7, 132.63
                    ],
                    ChargedAttack: [
                        [47.3, 60.2], [51.15, 65.1], [55, 70], [60.5, 77], [64.35, 81.9], [68.75, 87.5], [74.8, 95.2], [80.85, 102.9], [86.9, 110.6], [93.5, 119], [101.06, 128.63]
                    ],
                    Plunge: [
                        63.93, 69.14, 74.34, 81.77, 86.98, 92.92, 101.1, 109.28, 117.46, 126.38, 135.3
                    ],
                    LowPlunge: [
                        127.84, 138.24, 148.65, 163.51, 173.92, 185.81, 202.16, 218.51, 234.86, 252.7, 270.54
                    ],
                    HighPlunge: [
                        159.68, 172.67, 185.67, 204.24, 217.23, 232.09, 252.51, 272.93, 293.36, 315.64, 337.92
                    ],
                };
                const DIV = document.querySelector(`#${id}`);
                const TLVL = (parseFloat(DIV.querySelector(`#Level input`).value) - 1);
                const SHOWN_STATS = document.querySelector('iwn-statboard').Final;
                const SECRET_STATS = document.querySelector('iwn-statboard').SecretBonus;
                Array.from(DIV.querySelectorAll('span:not(#Level)'))
                    .forEach(a => {
                    const SPAN = a;
                    const [NORMAL, CRIT] = SPAN.querySelectorAll('p:not(.name)');
                    const TALENT_TAGS = JSON.parse(SPAN.dataset.info);
                    TALENT_TAGS.push(DIV.dataset.infusion);
                    const SCALING = SCALE_ATLAS[a.id][TLVL];
                    const CRITICAL_MULTIPLIER = (SHOWN_STATS[types.CriticalDamage] / 100) + 1;
                    const BONUS = (TALENT_TAGS
                        .map(a => a + 'Damage')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a;
                    }, 0));
                    const BOOST = (TALENT_TAGS
                        .map(a => a + 'Boost')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a + 0;
                    }, 0));
                    if (SPAN.id === 'ChargedAttack') {
                        let output = SCALING.map((Scaling) => TALENT_CALCULATOR('ATK', Scaling));
                        output = output.map((output) => BOOST_BONUS(output, BOOST, BONUS));
                        NORMAL.innerHTML = `${output.map((a) => a.toFixed(2)).join(' + ')}`;
                        CRIT.innerHTML = `${output.map((a) => (a * CRITICAL_MULTIPLIER).toFixed(2)).join(' + ')}`;
                        return;
                    }
                    let output = TALENT_CALCULATOR('ATK', SCALING);
                    output = BOOST_BONUS(output, BOOST, BONUS);
                    NORMAL.innerHTML = `${output.toFixed(2)}`;
                    CRIT.innerHTML = `${output.toFixed(2)}`;
                });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} #Level input`).onchange = null;
        }
    },
    {
        type: 'Talent',
        name: 'Abiogenesis: Solar Istoma',
        id: 'Abiogenesis-Solar-Istoma',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}" data-infusion="Geo">
                    <span id="Level">
                        <label for="level">Level:</label>
                        <input type="number" name="level" value="1" min="1" max="10">
                    </span>
                    <span id="Skill" data-info='["ElementalSkill"]'>
                        <p class="name">Skill DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="TransientBlossom" data-info='["TransientBlossom"]'>
                        <p class="name">Transient Blossome DMG (DEF%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                </div>
            `;
        },
        connect() {
            document.querySelector(`#${this.id} #Level input`).onchange = handler;
            const { id } = this;
            window.addEventListener('gic:Update', e => {
                const CHANGED = e.detail.changed;
                if (CHANGED === 'Stats') {
                    handler();
                }
            });
            function handler() {
                const SCALE_ATLAS = {
                    Skill: [
                        130.4, 140.18, 149.96, 163, 172.78, 182.56, 195.6, 208.64, 221.68, 234.72, 247.76, 260.8, 277.1, 293.4
                    ],
                    TransientBlossom: [
                        133.6, 143.62, 153.64, 167, 177.02, 187.04, 200.4, 213.76, 227.12, 240.48, 253.84, 267.2, 283.9, 300.6
                    ]
                };
                const DIV = document.querySelector(`#${id}`);
                const TLVL = (parseFloat(DIV.querySelector(`#Level input`).value) - 1);
                const SHOWN_STATS = document.querySelector('iwn-statboard').Final;
                const SECRET_STATS = document.querySelector('iwn-statboard').SecretBonus;
                Array.from(DIV.querySelectorAll('span:not(#Level)'))
                    .forEach(a => {
                    const SPAN = a;
                    const [NORMAL, CRIT] = SPAN.querySelectorAll('p:not(.name)');
                    const TALENT_TAGS = JSON.parse(SPAN.dataset.info);
                    TALENT_TAGS.push(DIV.dataset.infusion);
                    const SCALING = SCALE_ATLAS[a.id][TLVL];
                    const CRITICAL_MULTIPLIER = (SHOWN_STATS[types.CriticalDamage] / 100) + 1;
                    const BONUS = (TALENT_TAGS
                        .map(a => a + 'Damage')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        else if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a + 0;
                    }, 0));
                    const BOOST = (TALENT_TAGS
                        .map(a => a + 'Boost')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        else if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a + 0;
                    }, 0));
                    let output;
                    switch (SPAN.id) {
                        case 'Skill':
                            output = TALENT_CALCULATOR('ATK', SCALING);
                            output = BOOST_BONUS(output, BOOST, BONUS);
                            NORMAL.innerHTML = `${output.toFixed(2)}`;
                            CRIT.innerHTML = `${(output * CRITICAL_MULTIPLIER).toFixed(2)}`;
                            break;
                        case 'TransientBlossom':
                            output = TALENT_CALCULATOR('DEF', SCALING);
                            output = BOOST_BONUS(output, BOOST, BONUS);
                            NORMAL.innerHTML = `${output.toFixed(2)}`;
                            CRIT.innerHTML = `${(output * CRITICAL_MULTIPLIER).toFixed(2)}`;
                            break;
                    }
                });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} #Level input`).onchange = null;
        }
    },
    {
        type: 'Talent',
        name: 'Rite of Progeniture: Tectonic Tide',
        id: 'Rite-of-Progeniture-Tectonic-Tide',
        formRender() {
            return `
                <div id="${this.id}" data-name="${this.name}" data-infusion="Geo">
                    <span id="Level">
                        <label for="level">Level:</label>
                        <input type="number" name="level" value="1" min="1" max="10">
                    </span>
                    <span id="Burst" data-info='["ElementalBurst"]'>
                        <p class="name">Burst DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                    <span id="FatalBlossom" data-info='["FatalBlossom"]'>
                        <p class="name">Fatal Blossom DMG (ATK%)</p>
                        <p class="normal">TestN</p>
                        <p class="crit-or-bonus">TestC</p>
                    </span>
                </div>
            `;
        },
        connect() {
            document.querySelector(`#${this.id} #Level input`).onchange = handler;
            const { id } = this;
            window.addEventListener('gic:Update', e => {
                const CHANGED = e.detail.changed;
                if (CHANGED === 'Stats') {
                    handler();
                }
            });
            function handler() {
                const SCALE_ATLAS = {
                    Burst: [
                        367.2, 394.74, 422.28, 459, 486.54, 514.08, 550.8, 587.52, 624.24, 660.96, 697.68, 734.4, 780.3, 826
                    ],
                    FatalBlossom: [
                        72, 77.4, 82.8, 90, 95.4, 100.8, 108, 115.2, 122.4, 129.6, 136.8, 144, 153, 162
                    ]
                };
                const DIV = document.querySelector(`#${id}`);
                const TLVL = (parseFloat(DIV.querySelector(`#Level input`).value) - 1);
                const SHOWN_STATS = document.querySelector('iwn-statboard').Final;
                const SECRET_STATS = document.querySelector('iwn-statboard').SecretBonus;
                Array.from(DIV.querySelectorAll('span:not(#Level)'))
                    .forEach(a => {
                    const SPAN = a;
                    const [NORMAL, CRIT] = SPAN.querySelectorAll('p:not(.name)');
                    const TALENT_TAGS = JSON.parse(SPAN.dataset.info);
                    TALENT_TAGS.push(DIV.dataset.infusion);
                    const SCALING = SCALE_ATLAS[a.id][TLVL];
                    const CRITICAL_MULTIPLIER = (SHOWN_STATS[types.CriticalDamage] / 100) + 1;
                    const BONUS = (TALENT_TAGS
                        .map(a => a + 'Damage')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        else if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a + 0;
                    }, 0));
                    const BOOST = (TALENT_TAGS
                        .map(a => a + 'Boost')
                        .reduce((a, b) => {
                        if (SHOWN_STATS[types[b]]) {
                            return a + SHOWN_STATS[types[b]];
                        }
                        else if (SECRET_STATS[b]) {
                            return a + SECRET_STATS[b];
                        }
                        else
                            return a + 0;
                    }, 0));
                    let output;
                    switch (SPAN.id) {
                        case 'Burst':
                            output = TALENT_CALCULATOR('ATK', SCALING);
                            output = BOOST_BONUS(output, BOOST, BONUS);
                            NORMAL.innerHTML = `${output.toFixed(2)}`;
                            CRIT.innerHTML = `${(output * CRITICAL_MULTIPLIER).toFixed(2)}`;
                            break;
                        case 'FatalBlossom':
                            output = TALENT_CALCULATOR('ATK', SCALING);
                            output = BOOST_BONUS(output, BOOST, BONUS);
                            NORMAL.innerHTML = `${output.toFixed(2)} each`;
                            CRIT.innerHTML = `${(output * CRITICAL_MULTIPLIER).toFixed(2)} each`;
                            break;
                    }
                });
            }
        },
        disconnect() {
            document.querySelector(`#${this.id} #Level input`).onchange = null;
        }
    },
];
function TALENT_CALCULATOR(StatName, Scaling) {
    const SCALE_STAT = document.querySelector('iwn-statboard').Final[types[StatName]];
    const SCALE_PERCENT = Scaling / 100;
    let output = SCALE_STAT * SCALE_PERCENT;
    return output;
}
function BOOST_BONUS(InitOutput, Boost, Bonus) {
    return ((InitOutput * ((1 + Bonus / 100))) + Boost);
}
