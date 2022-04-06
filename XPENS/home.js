export const render = (app) => {

    const div = document.createElement('div');
    div.className = "greeting-container";
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Welcome');
    h1.className = "greeting"; // För att kunna påverka css på enbart denna
    h1.appendChild(text);
    div.appendChild(h1);
    app.appendChild(div);    
}