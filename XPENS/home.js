export const render = (root) => {

    const head = document.getElementsByTagName('head')[0];
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css'
    style.href = 'Style/homeStyle.css';
    style.media = 'all';

    head.appendChild(style);

    const CreateDiv = (divId) => {
        let app = document.getElementById('app');
        
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', divId)
        newDiv.className = 'gridDiv';

        // const text = document.createTextNode(divClass);
        
        // newDiv.appendChild(text);
        app.appendChild(newDiv);
    }

    CreateDiv('ItemA');
    CreateDiv('ItemB');
    CreateDiv('ItemC');
    CreateDiv('ItemD');

}