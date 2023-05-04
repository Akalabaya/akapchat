<?php 
session_start();
require("../conn.php");
$mail = $_SESSION['akapchat_user'];
$to_mail = $_GET['to_mail'];
$token=$_GET["token"];
$sql = "INSERT INTO `tokens`(`my_mail`, `to_mail`, `req_token`, `ans_token`) VALUES ('".$mail."','".$to_mail."','".$token."','')";
if(mysqli_query($conn, $sql) == true)
{
    echo "1";
}
?>