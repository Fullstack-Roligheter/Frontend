export  const render = (root) => {
    
    const CreateDiv = (divId, parentId, className) => {    
        
        let newDiv = document.createElement('div');        
        let parentDiv = document.getElementById(parentId);
        newDiv.id = divId;
        
        if(className) {
            newDiv.className = `${className} homeClass`;
        } 
        else {
            newDiv.className = 'homeClass';
        }
        parentDiv.appendChild(newDiv);
    }
    
    const CreateDivWithContent = (divId, parentId, inputText, inputType, className) => {

        let newDiv = document.createElement('div');
        let parentDiv = document.getElementById(parentId);
        
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
        
        newDiv.id = divId;
        newDiv.className = `${className} homeClass`;

        parentDiv.appendChild(newDiv);
    }

    CreateDiv('HomeContainer', 'app')
    CreateDiv('ContentDiv', 'HomeContainer')
    CreateDiv('ItemA', 'ContentDiv', 'GridDiv');
    CreateDiv('ItemB', 'ContentDiv', 'GridDiv');
    CreateDiv('ItemC', 'ContentDiv', 'GridDiv');
    CreateDiv('ItemD', 'ContentDiv', 'GridDiv');
    CreateDivWithContent('ItemE','ContentDiv', 'Hello world!', 'h1', 'GridDiv');
}