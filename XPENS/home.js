export const render = (app) => {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Welcome');
    h1.appendChild(text);
    app.appendChild(h1);
    
}


// h1.style.display = 'flex';
// h1.style.width = '80%';
// h1.style.height = '80%';

// h1.style.margin = '40px';
// h1.style.padding = '16px';
// h1.style.textAlign = 'center';