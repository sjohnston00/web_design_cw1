/*
file: universities.js
author: Ross McLean
desc: Handles events related to elements on universities.html
 */

import getUniJson from "./generate_uni_list.js";

$("#uni-search-btn").on("click", function () {
    getUniJson();
});