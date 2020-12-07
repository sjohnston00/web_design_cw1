/*
file: generate_job_list.js
author: Ross McLean
desc: Gets jobs from an API and builds a list from the results
 */

import clearList from "./utilities.js";

const getJobJson = () => {
    const textBox = document.getElementById("job");

    let requestUrl = `http://api.lmiforall.org.uk/api/v1/soc/search?q=${textBox.value.trim()}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            const jobListContainer = document.getElementById("job-link-list");
            const resultCountContainer = document.getElementById("result-count-container");
            const p1 = document.createElement("p");
            const p2 = document.createElement("p");

            $(resultCountContainer).children().remove();

            jobListContainer.setAttribute("class", "container");
            clearList(jobListContainer);

            p1.id = "uni-result-count";
            p1.innerHTML = `${data.length}`;
            p2.innerHTML = "&nbsp;Results found:";

            const p1p2 = [p1, p2];

            p1p2.forEach(element => {
                $(element).css({
                    "font-weight": "bold",
                    "font-size": "120%"
                });
                resultCountContainer.appendChild(element);
            });

            data.forEach(job => {
                const div = document.createElement("div");
                const h3 = document.createElement("h3");
                const a = document.createElement("a");
                const p = document.createElement("p");

                div.className = "list-entry";
                a.textContent = job["title"];
                p.textContent = job["description"];

                h3.appendChild(a);
                div.appendChild(h3);
                div.appendChild(p);
                jobListContainer.appendChild(div);
            });
        })
        .catch(error => console.log(`response error: ${error}`));
}

export default getJobJson;