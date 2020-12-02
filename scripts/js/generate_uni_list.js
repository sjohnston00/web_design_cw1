/*
file: generate_uni_list.js
author: Ross McLean
desc: Gets universities from an API and builds a list from the results
 */

const container = document.getElementById("uni-link-list");
const textbox = document.getElementById("uni");
let baseUrl = "http://universities.hipolabs.com/search?country=United Kingdom";

let requestUrl = textbox.value ? `${baseUrl}${textbox.value}` : baseUrl;

container.setAttribute("class", "container");
let request = new XMLHttpRequest();

request.open("GET", requestUrl, true);
console.log('OPENED', request.readyState);
request.onreadystatechange = function () {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
    if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(request.response);

        data.forEach(uni => {
            const div = document.createElement("div");
            const h3 = document.createElement("h3");
            const p = document.createElement("p");

            h3.textContent = uni["name"];
            p.textContent = uni["web_pages"][0];

            div.appendChild(h3);
            div.appendChild(p);
            container.appendChild(div);
        });
    }
}
request.send();