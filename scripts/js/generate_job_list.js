/*
file: generate_job_list.js
author: Ross McLean
desc: Gets jobs from an API and builds a list from the results
 */

import clearList from "./utilities.js";

const getJobJson = () => {
    const container = document.getElementById("job-link-list");
    const textBox = document.getElementById("job");
    const resultCount = document.getElementById("job-result-count");

    let count = 0;
    let requestUrl = `http://api.lmiforall.org.uk/api/v1/soc/search?q=${textBox.value.trim()}`;

    container.setAttribute("class", "container");
    clearList(container);

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(uni => {
                count++;
                const div = document.createElement("div");
                const h3 = document.createElement("h3");
                const a = document.createElement("a");

                div.className = "list-entry";
                h3.textContent = uni["name"];
                a.textContent = uni["web_pages"][0];
                a.href = uni["web_pages"][0];

                div.appendChild(h3);
                div.appendChild(a);
                container.appendChild(div);
            });
            resultCount.textContent = `${count}`;
        })
        .catch(error => console.log(`response error: ${error}`));
}

export default getJobJson;

function clearJobList(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}