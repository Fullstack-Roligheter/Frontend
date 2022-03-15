export const render = (root) => {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Welcome');
    h1.appendChild(text);
    root.appendChild(h1);

    const head = document.getElementsByTagName('head')[0];
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css'
    style.href = 'Style/homeStyle.css';
    style.media = 'all';

    head.appendChild(style);

}