//Elemental Resonance Handlers
export function ElementalResonanceInputRenderer() {
    const Combinations = ['Protective Canopy',
        'Fervent Flames', 'Fervent Flames & Soothing Water', 'Fervent Flames & High Voltage', 'Fervent Flames & Shattering Ice', 'Fervent Flames & Impetuous Winds', 'Fervent Flames & Enduring Rock',
        'Soothing Water', 'Soothing Water & High Voltage', 'Soothing Water & Shattering Ice', 'Soothing Water & Impetuous Winds', 'Soothing Water & Enduring Rock',
        'High Voltage', 'High Voltage & Shattering Ice', 'High Voltage & Impetuous Winds', 'High Voltage & Enduring Rock',
        'Shattering Ice', 'Shattering Ice & Impetuous Winds', 'Shattering Ice & Enduring Rock',
        'Impetuous Winds', 'Impetuous Winds & Enduring Rock',
        'Enduring Rock',
    ];
    const Element = document.querySelector(`iwn-character-form`).Character.Element;
    return `
        ${Combinations.map(a => {
        const checker = (() => {
            let chckr;
            switch (Element) {
                case 'Anemo':
                    chckr = 'Impetuous Winds';
                    break;
                case 'Geo':
                    chckr = 'Enduring Rock';
                    break;
                case 'Electro':
                    chckr = 'High Voltage';
                    break;
                case 'Dendro':
                    break;
                case 'Hydro':
                    chckr = 'Soothing Water';
                    break;
                case 'Pyro':
                    chckr = 'Fervent Flames';
                    break;
                case 'Cryo':
                    chckr = 'Shattering Ice';
                    break;
            }
            return chckr;
        })();
        if (a == 'Protective Canopy') {
            return `<option value="${a}">${a}</option>`;
        }
        else if (a.includes(checker)) {
            return `<option value="${a}">${a}</option>`;
        }
    }).join('')}
    `;
}
