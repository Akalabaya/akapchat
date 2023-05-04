<?php
session_start();
require("../conn.php");
$mail = $_SESSION["akapchat_user"];
$to_mail = $_GET["to_mail"];


$sql = "SELECT `req_token` FROM `tokens` WHERE `my_mail` = '".$to_mail."' AND `to_mail` = '".$mail."'";
$myArray = array();

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) 
    { 
        $myArray[] = $row;
    }
    echo end($myArray)["req_token"];
}


?>