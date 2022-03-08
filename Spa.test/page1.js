export const render = (root) => {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Welcome');
    h1.appendChild(text);
    root.appendChild(h1);

}