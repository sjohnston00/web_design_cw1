/*
file: job_search.js
author: Ross McLean
desc: Handles events related to elements on job_search.html
 */

import { getJobList } from './get_job_data.js'

const resultCountContainer = document.getElementById('result-count-container')
$(resultCountContainer).children().remove()

// document on ready
$(function () {
  getJobList()
})

$('#job-search-btn').on('click', function () {
  getJobList()
})