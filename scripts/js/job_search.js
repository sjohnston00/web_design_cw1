/*
file: job_search.js
author: Ross McLean
desc: Handles events related to elements on job_search.html
 */

import getJobJson from "./generate_job_list.js";

const resultCountContainer = document.getElementById("result-count-container");
$(resultCountContainer).children().remove();

// document on ready
$(function () {
    getJobJson();
})

$("#job-search-btn").on("click", function () {
    getJobJson();
});