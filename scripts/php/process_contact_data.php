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

echo 'Hi ' . $_POST['forename'] . ' ' . $_POST['surname'] . ' thanks for the following message:<br />';
echo '<br />' . $_POST['message'] . '<br />';
echo 'We will contact you at ' . $_POST['email'] . ' soon.<br />';
