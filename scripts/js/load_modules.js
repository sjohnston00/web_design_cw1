/*
file: load_modules.js
author: Ross McLean
desc: Loads the header, navigation bar and footer for every page, creating a React-like experience.
 */

$(function () {
    $('#header').load('header.html');
    $('#nav').load('nav.html');
    $('#footer').load('footer.html');
});