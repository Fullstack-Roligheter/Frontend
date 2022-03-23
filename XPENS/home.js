export const render = (app) => {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Welcome');
    h1.appendChild(text);
    app.appendChild(h1);

}