export function ElementFactory(tag, attributes) {
    let element = document.createElement(tag);
    Object.keys(attributes)
        .forEach(a => {
        if (a === 'textContent') {
            element.textContent = attributes[a];
            return;
        }
        else if (a.includes('data')) {
            let b = a.substring(0, 4) + '-' + a.substring(4, a.length);
            element.setAttribute(b, attributes[a]);
            return;
        }
        element.setAttribute(a, attributes[a]);
    });
    return element;
}
