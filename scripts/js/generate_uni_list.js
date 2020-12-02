/*
file: generate_uni_list.js
author: Ross McLean
desc: Gets universities from an API and builds a list from the results
 */

const getUniJson = () => {
    const container = document.getElementById("uni-link-list");
    const textBox = document.getElementById("uni");
    const resultCount = document.getElementById("uni-result-count");

    let count = 0;
    let baseUrl = "http://universities.hipolabs.com/search?country=United Kingdom";
    let requestUrl = textBox.value ? `${baseUrl}&name=${textBox.value}` : baseUrl;

    container.setAttribute("class", "container");
    clearUniList(container);

    let request = new XMLHttpRequest();

    request.open("GET", requestUrl, true);
    console.log('OPENED', request.readyState);
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const data = JSON.parse(request.response);

            data.forEach(uni => {
                count++;
                const div = document.createElement("div");
                const h3 = document.createElement("h3");
                const a = document.createElement("a");

                div.className = "uni-list-entry";
                h3.textContent = uni["name"];
                a.textContent = uni["web_pages"][0];
                a.href = uni["web_pages"][0];

                div.appendChild(h3);
                div.appendChild(a);
                container.appendChild(div);
            });
        } else {
            console.log(`Failed. readyState: ${this.readyState}, status: ${this.status}`);
        }

        resultCount.textContent = `${count}`;
        console.log(count);
    }
    request.send();
}

export default getUniJson;

function clearUniList(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}