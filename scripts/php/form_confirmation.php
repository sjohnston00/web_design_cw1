<?php
echo <<<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>UK Job Search - Submission Confirmation</title>
    <link href="stylesheet.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="module-container" id="header"></div>
<div class="module-container" id="nav"></div>

<!--  Unique page content here  -->
<main>
    <h2>Thank you</h2>
    <p>The following message has been received:</p>

    <p>Please allow for 12-48 hours for a response.</p>
</main>

<!--Overview is used for pages that have a paragraph and image at the top of the page-->
<div class="overview"></div>
<div class="link-list"></div>
<div class="module-container" id="footer"></div>
<script src="scripts/js/jquery-3.5.1.min.js"></script>
<script src="scripts/js/load_modules.js"></script>
</body>
</html>
EOL;