<?php
$idacc = $_GET["id"];
require("conn.php");
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}
$sql = "UPDATE `connections` SET `req_status`='1' WHERE `id` = '".$idacc."'";
$query = mysqli_query($conn, $sql);
if($query === true)
{
    echo "1";
}
else
{
    echo "0";
}
?>