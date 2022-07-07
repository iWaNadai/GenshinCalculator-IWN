import { Character } from "../types"
import { CHARACTERS } from "../Variables/DataFile.js"

export default class CharacterFormComponent extends HTMLElement {
    constructor() {
        super()

        this.render()
    }

    private render(): void {
        this.innerHTML = `
            <div>
                <img src="${
                    (CHARACTERS.find(a => a.Name === this.getAttribute('character')) as Character ).Image || CHARACTERS[0].Image 
                }"
            </div>
        `
    }
}