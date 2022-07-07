export function EventDispatcher(changed : string, value : any) {
    let event = new CustomEvent('gic:Update', { detail : { changed : changed, value : value } })
    window.dispatchEvent(event);
}