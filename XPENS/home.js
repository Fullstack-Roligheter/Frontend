export const render = (app) => {
    const h1 = document.createElement('h1');
    let text = document.createTextNode('Welcome');
    
    h1.appendChild(text);
    app.appendChild(h1);

}