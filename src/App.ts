import CharacterComponent     from "./Components/CharacterComponent.js";
// import WeaponComponent        from "./Components/WeaponComponent.js";
// import ArtifactComponent from "./Components/ArtifactComponent.js";

window.customElements.define(`iwn-character-form`, CharacterComponent)
// window.customElements.define(`iwn-weapon-form`, WeaponComponent)
// window.customElements.define(`iwn-artifact-form`, ArtifactComponent)

window.addEventListener('gic:Update', e => {
    console.log((e as CustomEvent).detail)
})