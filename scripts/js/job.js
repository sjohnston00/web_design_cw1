/*
file: job.js
author: Ross McLean
desc: Load unique context per job to the job.html page
 */

const urlQueryString = window.location.search;
const urlParameters = new URLSearchParams(urlQueryString);
const soc = urlParameters.get("soc");
const requestUrl = `http://api.lmiforall.org.uk/api/v1/soc/code/${soc}`;

fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
        document.getElementById("job-title").innerText = data.title;
        document.getElementById("soc-text").innerText = data.description;

        document.getElementById("qualifications-title").innerText = "Qualifications";
        document.getElementById("qualifications-paragraph").innerText = data.qualifications;

        document.getElementById("tasks-title").innerText = "Tasks";
        const tasksList = document.getElementById("tasks-list");
        let subArray = [];
        const regex = /^[A-Za-z\s]+$/;  // only match letters and spaces
        [...data.tasks].forEach(character => {
            if (character.match(regex)) {
                subArray.push(character)
            } else {
                const listItem = document.createElement("li");
                listItem.innerHTML = subArray.join("");
                tasksList.appendChild(listItem);
                subArray = [];
            }
        });

        document.getElementById("tags-title").innerText = "Tags";
        document.getElementById("tags-paragraph").innerText = `[${data.add_titles.slice(0, 10)}]`;

    })
    .catch(error => console.log(`response error: ${error}`));