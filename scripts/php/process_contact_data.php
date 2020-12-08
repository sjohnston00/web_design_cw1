<!--
file: process_contact_data.php
author: Ross McLean
desc: Sends the form input data to the database and redirects to the confirmation page
-->

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "uk_job_search";
$conn = "";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//    echo "Connected successfully <br />";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$query = $conn->prepare(
    "INSERT INTO contacts (forename, surname, email, message)
    VALUES (?, ?, ?, ?)"
);

$query->bindParam(1, $forename);
$query->bindParam(2, $surname);
$query->bindParam(3, $email);
$query->bindParam(4, $message);

$forename = $_POST['forename'];
$surname = $_POST['surname'];
$email = $_POST['email'];
$message = $_POST['message'];

$query->execute();
$conn = null;

echo <<<EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>UK Job Search - Submission Confirmation</title>
    <link href="../../stylesheet.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="module-container" id="header"></div>
<div class="module-container" id="nav"></div>

<!--  Unique page content here  -->
<main>
    <h2>Thank you, $forename $surname.</h2>
    <br>
    <p>The following message has been received:</p>
    <br>
    <p id="confirm-message">$message</p>
    <br>
    <p id="confirm-note">Please allow for 12-48 hours for a response.</p>
</main>

<div class="module-container" id="footer"></div>
<script src="../js/lib/jquery-3.5.1.min.js"></script>
<script>
$(function () {
    $('#header').load('../../modules/header.html');
    $('#nav').load('../../modules/nav.html');
    $('#footer').load('../../modules/footer.html');
});
</script>
</body>
</html>
EOL;