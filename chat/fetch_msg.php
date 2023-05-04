<?php 
session_start();
#connecting 
require("../conn.php");
$mail = $_SESSION['akapchat_user'];
$to_mail = $_GET['to_mail'];
#getting msg:
$sql = "SELECT * FROM `msg` WHERE (`fmail`='".$mail."' AND `to_mail` = '".$to_mail."') OR (`fmail`='".$to_mail."' AND `to_mail` = '".$mail."') ";
$result = $conn->query($sql);
$myArray = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) 
    { 
        $myArray[] = $row;
    }
}
echo json_encode($myArray);
?>