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
    echo "Connected successfully <br />";
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

// TODO: Sanitise the variables in the URL so they are not visible once sent
// https://www.plus2net.com/php_tutorial/variables2.php
redirect("../../form_confirmation.html?fname=$forename&sname=$surname&msg=$message");

// Use to redirect to a specified URL. Since this is a helper function, it might be better off somewhere else.
function redirect($url, $statusCode = 303)
{
    header("Location: " . $url, true, $statusCode);
    die();
}