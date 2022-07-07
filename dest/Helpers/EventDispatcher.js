export function EventDispatcher(changed, value) {
    let event = new CustomEvent('gic:Update', { detail: { changed: changed, value: value } });
    window.dispatchEvent(event);
}
