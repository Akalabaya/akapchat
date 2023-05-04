<?php 
session_start();
require("conn.php");
$id = $_SESSION["user_id"];
$sql = "UPDATE `accounts` SET `name`='".$_GET["uname"]."' WHERE `id` = '".$id."'";
if(mysqli_query($conn, $sql))
{
    echo "success";
}
?>