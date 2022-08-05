import CharacterForm from "./CharacterForm.js";
import ArtifactForm from "./ArtifactForm.js";
import EffectBoard from "./EffectBoard.js";
import WeaponForm from "./WeaponForm.js";
export default function DeclareComponents() {
    window.customElements.define(CharacterForm.tag, CharacterForm);
    window.customElements.define(WeaponForm.tag, WeaponForm);
    window.customElements.define(ArtifactForm.tag, ArtifactForm);
    window.customElements.define(EffectBoard.tag, EffectBoard);
}
