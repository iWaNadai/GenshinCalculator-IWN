import CharacterFormComponent from "./Components/CharacterComponent.js";
import WeaponFormComponent from "./Components/WeaponComponent.js";
import ArtifactFormComponent from "./Components/ArtifactComponent.js";
import StatsComponent from './Components/StatsComponent.js';
import EffectsComponent from './Components/EffectsComponent.js';
import TalentComponent from "./Components/TalentComponent.js";
window.customElements.define(`iwn-character-form`, CharacterFormComponent);
window.customElements.define(`iwn-weapon-form`, WeaponFormComponent);
window.customElements.define(`iwn-artifact-form`, ArtifactFormComponent);
window.customElements.define(`iwn-effect-form`, EffectsComponent);
window.customElements.define(`iwn-talentboard`, TalentComponent);
window.customElements.define(`iwn-statboard`, StatsComponent);
window.addEventListener('gic:Update', e => {
    console.table([document.querySelector('iwn-character-form').Character,
        document.querySelector('iwn-weapon-form').Weapon, ...Array.from(document.querySelectorAll('iwn-artifact-form')).map(a => a.Artifact)]);
});
document.querySelectorAll('button.collapse-toggle').forEach(a => {
    a.onclick = e => {
        a.parentElement.classList.toggle('closed');
    };
});
window.dispatchEvent(new CustomEvent('gic:Update', { detail: {} }));
