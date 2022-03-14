export const render = () => {
    fetch('https://localhost:44324/api/basic')
        .then(response => {
            if (!response.ok) {
                throw new Error('fetch error')
            } else {
                return response.json()
            }
        })
        .then(data => {
            const div = document.getElementById('app');
            const ul = document.createElement('ul');
            data.forEach(data => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode('Name: ' + data.name + ' ' + 'Email: ' + data.email + ' ' + 'Age: ' + data.age));
                ul.appendChild(li);
            })
            div.appendChild(ul);
        })
}