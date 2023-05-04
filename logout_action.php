<?php
session_start();
// remove all session variables

require("conn.php");
// Check connection
if ($mysqli -> connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    exit();
  }
$sql = "UPDATE `accounts` SET `status`= '0' WHERE `email` = '".$_SESSION['akapchat_user']."'";
  if ($conn->query($sql) === TRUE)
  {
  
  } 
  else 
  {
      echo "Error: " . $sql . "<br>" . $mysqli->error;
  }
  
      
  

session_unset();

// destroy the session
session_destroy();
header("Location:index.php");
?>