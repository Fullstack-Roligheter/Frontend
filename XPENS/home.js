export const render = (root) => {

    const head = document.getElementsByTagName('head')[0];
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css'
    style.href = 'Style/homeStyle.css';
    style.media = 'all';

    let contentDiv = document.createElement('div');
    contentDiv.setAttribute('id', 'contentDiv');
    let app = document.getElementById('app');
    app.appendChild(contentDiv);

    head.appendChild(style);

    const CreateDiv = (divId, inputText, inputType) => {
        
        let newDiv = document.createElement('div');
        
        if(inputText && !inputType) {
            const text = document.createTextNode(inputText);
            newDiv.appendChild(text);
        }
        
        if(inputText && inputType) {
            let element = document.createElement(inputType);
            const text = document.createTextNode(inputText);
            element.appendChild(text);
            newDiv.appendChild(element);
        }
        
        newDiv.setAttribute('id', divId);
        newDiv.className = 'gridDiv';

        contentDiv.appendChild(newDiv);
    }
    let inputText;
    CreateDiv('ItemA', inputText);
    CreateDiv('ItemB', inputText);
    CreateDiv('ItemC', inputText);
    CreateDiv('ItemD', inputText);
    CreateDiv('ItemE', 'Hello world!', 'h1');
}
