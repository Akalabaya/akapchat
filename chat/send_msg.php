<?php 
session_start();
require("../conn.php");
$mail = $_SESSION['akapchat_user'];
$to_mail = $_GET['to_mail'];
$msg=$_GET["msg"];
$sql = "INSERT INTO `msg`(`fmail`, `to_mail`, `msg`, `time`) VALUES ('".$mail."','".$to_mail."','".$msg."','".date("h:i")."')";
if(mysqli_query($conn, $sql) == true)
{
    echo "1";
}
?>