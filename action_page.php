<?php
// Start the session
session_start();
require("conn.php");

//Checking if the request is for signup...
if($_GET["type"] == "signup")
{

//Getting details

$email =  strtolower($_POST['email']);
$name = $_POST['name'];
$pass = md5($_POST['pass']);
$rpass =  md5($_POST['rpass']);

//Checking if the password and rpass is same
if($rpass != $pass)
{
   header("Location:signup.php?err=500");
    
}
else{
//Now checking if the email is already signed up....


// Check connection
if ($conn -> connect_errno) {
    echo "Failed to connect to MySQL: " . $conn -> connect_error;
    exit();
  }


if ($result = $conn -> query("SELECT * FROM `accounts` WHERE `email` = '" .$email. "'")) {
    $num = mysqli_num_rows($result);
    echo $num;
    if($num > 0)
    {
        header("Location:signup.php?err=300");
    }
    else
    {
        //Now registering user...
$sql = "INSERT INTO `accounts`(`name`, `password`, `email`, `status`) VALUES ('".$name."','".$pass."','".$email."','1')";
$result = $conn->query($sql);
if ( $result === true)
{
  $id = mysqli_fetch_assoc($result);
  $_SESSION["user_id"] = $id["id"];
  $_SESSION['akapchat_user'] = $email;
  $_SESSION["name"] = $id["name"];
?> <script>location.href = "dashboard.html";</script><?php
} 
else 
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}

    }
}

}
//Signup Check ends here ....
}
elseif($_GET["type"] == "login")
{
    $email =  strtolower($_POST['email']);
    $pass = md5($_POST['pass']);
    echo $pass;
   
// Check connection
if ($conn -> connect_errno) {
    echo "Failed to connect to MySQL: " . $conn -> connect_error;
    exit();
  }

  if ($result = $conn -> query("SELECT * FROM `accounts` WHERE `email` = '".$email."' AND `password` = '".$pass."'")) 
  {
    $num = mysqli_num_rows($result);
    if($num > 0)
    {
  $sql2 = "UPDATE `accounts` SET `status`= '1' WHERE `email` = '".$email."'";
  if ($conn->query($sql2) === TRUE)
  {
    $id = mysqli_fetch_assoc($result);
  $_SESSION["user_id"] = $id["id"];
  $_SESSION['akapchat_user'] = $email;
  $_SESSION["name"] = $id["name"];
 header("Location:dashboard.html");
  } 
  else 
  {
      echo "Error: " . $sql2 . "<br>" . $conn->error;
  }
        
    }
    else
    {
        header("Location:index.php?err=404");
    }
  }

}
?>