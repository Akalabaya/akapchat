<?php
 session_start();
 $email ="";
 if(isset($_SESSION['akapchat_user']))
 {
    $email = $_SESSION['akapchat_user'];
 }

require("conn.php");

if(!isset($_GET["type"]))
{
    

 // Check connection
if ($conn->connect_error) 
{
 die("Connection failed: " . $conn->connect_error);
}
    if(!isset($_SESSION["akapchat_user"])){header("Location:index.php");}
    header('Content-Type: application/json');
    $sql = "SELECT * FROM `connections` WHERE (`my_mail` = '".$email."' OR `to_mail` = '".$email."') AND `req_status` = '1'";
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
}
else if($_GET["type"] == "name")
{
    if(isset($_SESSION['akapchat_user'])){
        echo $_SESSION["akapchat_user"];
     
    }
    else{
        echo "error";
        
    }
}
else if($_GET["type"] == "id")
{
    if(isset($_SESSION['user_id'])){
        echo $_SESSION["user_id"];
     
    }
    else{
        echo "error";
        
    }
}
else if($_GET["type"] == "req")
{
    $sql = "SELECT * FROM `connections` WHERE `to_mail` = '".$email."' AND `req_status` = '0'";
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
}   
?>