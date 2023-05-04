<?php 
session_start();
require("../conn.php");
$my_mail = $_SESSION["akapchat_user"];
$to_mail = $_GET["to"];

$sql = "DELETE FROM `tokens` WHERE `my_mail` = '".$my_mail."' AND `to_mail` = '".$to_mail."'";
if(mysqli_query($conn,$sql) == true) 
{
echo "success";
}

?>