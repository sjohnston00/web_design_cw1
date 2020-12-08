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
$currentYear = date("Y");

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
<div class="module-container" id="header">
    <header>
        <a href="../../index.html"><h1>UK Job Search</h1></a>
    </header>
</div>
<div class="module-container" id="nav">
    <nav>
        <div>
            <a href="../../job_search.html">Job Search</a>
        </div>
        <div>
            <a href="../../funding.html">Funding</a>
        </div>
        <div>
            <a href="../../about_us.html">About Us</a>
        </div>
        <div>
            <a href="../../contact_us.html">Contact Us</a>
        </div>
        <div>
            <a href="../../universities.html">Universities</a>
        </div>
    </nav>
</div>

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

<div class="module-container" id="footer">
    <footer>
    <div id="footer-lists">
        <div id="footer-left-1">
            <h4>Social</h4>
            <ul>
                <li><a href="https://www.facebook.com">Facebook</a></li>
                <li><a href="https://www.twitter.com">Twitter</a></li>
            </ul>
        </div>
        <div id="footer-left-2">
            <h4>Fork</h4>
            <ul>
                <li><a href="https://github.com/yerbestpal/web_design_cw1">github</a></li>
            </ul>
        </div>
        <div id="footer-centre">
            <h4>Legal</h4>
            <ul>
                <li><a href="../../t_and_c.html">Terms & Conditions</a></li>
            </ul>
        </div>
        <div id="footer-right">
            <h4>Contact</h4>
            <ul>
                <li>0123456789</li>
                <li><a href="#">ukjobs@gmail.com</a></li>
            </ul>
        </div>
    </div>
    <div id="copyright-container">
        <p id="footer-copyright">Copyright© UK Job Search $currentYear</p>
        <p id="footer-date"></p>
    </div>
</footer>
</div>
<script src="../js/lib/jquery-3.5.1.min.js"></script>
</body>
</html>
EOL;