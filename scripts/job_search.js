/*
file: job_search.js
author: Ross McLean
desc: Handles events related to elements on job_search.html
 */

import getJobJson from "./generate_job_list.js";

// document on ready
$(function () {
    getJobJson();
})

$("#job-search-btn").on("click", function () {
    getJobJson();
});