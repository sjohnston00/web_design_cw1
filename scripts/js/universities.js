/*
file: universities.js
author: Ross McLean
desc: Handles events related to elements on universities.html
 */

import getUniJson from './get_uni_data.js'

// document on ready
$(function () {
  getUniJson()
})

$('#uni-search-btn').on('click', function () {
  getUniJson()
})