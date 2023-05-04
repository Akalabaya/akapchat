<?php
session_start();
require("../conn.php");
$mail = $_SESSION["akapchat_user"];
$to_mail = $_GET["to_mail"];


$sql = "SELECT `ans_token` FROM `tokens` WHERE `my_mail` = '".$mail."' AND `to_mail` = '".$to_mail."'";
$myArray = array();

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) 
    { 
        $myArray[] = $row;
    }
    echo end($myArray)["ans_token"];
}


?>