import { CHARACTERS } from "../Variables/DataFile.js";
export default class CharacterFormComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML = `
            <div>
                <img src="${CHARACTERS.find(a => a.Name === this.getAttribute('character')).Image || CHARACTERS[0].Image}"
            </div>
        `;
    }
}
