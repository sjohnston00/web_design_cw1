/*
file: load_modules.js
author: Ross McLean
desc: Loads the header, navigation bar and footer for every page, creating a React-like experience.
 */

$(function () {
  $('#header').load('modules/header.html')
  $('#nav').load('modules/nav.html')
  $('#footer').load('modules/footer.html')
})