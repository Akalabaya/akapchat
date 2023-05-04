<?php 
session_start();
require("../conn.php");
$mail = $_SESSION['akapchat_user'];
$to_mail = $_GET['to_mail'];
$token=$_GET["token"];
$sql = "UPDATE `tokens` SET `ans_token`='".$token."' WHERE `my_mail` = '".$to_mail."' AND `to_mail` = '".$mail."'";
if(mysqli_query($conn, $sql) == true)
{
    echo "1";
}
?>