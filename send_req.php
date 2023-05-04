<?php
session_start();
$email = $_SESSION["akapchat_user"];
$to_mail = $_GET["to_mail"];
require("conn.php");

if ($conn->connect_error) 
{
            die("Connection failed: " . $conn->connect_error);
}
if($email == $to_mail)
{
    return;
}
$sql_check_duplicate = "SELECT * FROM `connections` WHERE (`my_mail` = '".$email."' AND to_mail = '".$to_mail."') OR (`to_mail` = '".$email."' AND `my_mail` = '".$to_mail."')";
if ($result = $conn -> query($sql_check_duplicate)) {
    $num = mysqli_num_rows($result);
    
    if($num > 0)
    {
        echo "Already Existing request is there... <a href='index.php'>Go Back</a>";
    }
    else
    {
       $sql_add = "INSERT INTO `connections`(`my_mail`, `to_mail`, `req_status`) VALUES ('".$email."','".$to_mail."','0')" ;
       if(mysqli_query($conn, $sql_add) === true)
       {
       echo "success";
       };

    }
}
?>