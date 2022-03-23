export const render = (app) => {
    const btn = document.createElement('button');
    btn.textContent = "Get List";

    let thData = ['Title', 'Amount', 'Start Date', 'End Date', 'CountDown Days'];
    const table = document.createElement("table");
    const tHead = document.createElement('thead');
    const htr = document.createElement('tr');

    for (let i = 0; i < thData.length; i++) {
        const th = document.createElement('th');
        th.innerHTML += thData[i];
        htr.appendChild(th);
    }
    tHead.appendChild(htr);
    table.appendChild(tHead);
    app.appendChild(btn);
    app.appendChild(table);

    const tb = document.createElement("tbody");
    tb.setAttribute('id', 'info');
    table.appendChild(tb);

    btn.addEventListener('click', () => {
        const info = document.querySelector('#info');

        fetch(`https://localhost:7073/api/saving/getplans?UserId=${2}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('fetch error')
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    const tr = document.createElement('tr');
                    for (let item in data[i]) {
                        const td = document.createElement('td');
                        td.appendChild(document.createTextNode(data[i][item]));
                        tr.appendChild(td);
                    }
                    info.appendChild(tr);
                }
                btn.disabled = true;
            })
    })
}