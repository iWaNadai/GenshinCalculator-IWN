import CharacterFormComponent     from "./Components/CharacterComponent.js";
import WeaponFormComponent        from "./Components/WeaponComponent.js";
import ArtifactComponent from "./Components/ArtifactComponent.js";
import StatsComponent from './Components/StatsComponent.js';

window.customElements.define(`iwn-character-form`, CharacterFormComponent)
window.customElements.define(`iwn-weapon-form`, WeaponFormComponent)
window.customElements.define(`iwn-artifact-form`, ArtifactComponent)
window.customElements.define(`iwn-statboard`, StatsComponent)

window.dispatchEvent(new CustomEvent('gic:Update', {detail : {}}))

window.addEventListener('gic:Update', e => {
    console.log((e as CustomEvent)?.detail)
});

console.table([(document.querySelector('iwn-character-form') as CharacterFormComponent).Character,
(document.querySelector('iwn-weapon-form') as WeaponFormComponent).Weapon, ...Array.from(document.querySelectorAll('iwn-artifact-form')).map(a => (a as ArtifactComponent).Artifact)])