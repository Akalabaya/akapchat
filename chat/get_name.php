<?php
$email = $_GET["email"];
require("../conn.php");
$sql = "SELECT `name` FROM `accounts` WHERE `email` = '".$email."'";
$result = $conn->query($sql);
if($result)
{
    $rows = $result->fetch_assoc();
    echo $rows["name"];
}
?>