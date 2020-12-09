/*
file: job.js
author: Ross McLean
desc: Load unique context per job to the job.html page
 */

import { getJobData, getLocation } from './get_job_data.js'

// document on ready
$(function () {
  getJobData()
})

$('#location-search-btn').on('click', function () {
  getLocation()
})