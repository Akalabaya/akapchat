<!DOCTYPE html>
<html lang="en">
<head>

<?php
 
session_start();
if(isset($_SESSION["akapchat_user"]))
{
  header("Location:dashboard.php");
}


function simplify($code) {

  if ($code == "500")
  {
    return "The Passwords did not match...";
  }
  else if($code == "300")
  {
    return "Email is already registered.Please login.";

  }

}

?>
    <link rel="stylesheet" type="text/css" href="style.css"></style>
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js"></script>

<!-- Popper JS -->
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
   

<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    <title>Akap Chat:Where Privacy Matters</title>
</head>

<body background="squares_tiled2.svg">
   
        <center>
        <h2 class="text-white">Akap Chat: Where Privacy Matters</h2>
        <div class="card" id="cont">
          <div class="card-header"><h2>SignUP</h2></div>
          <div class="card-body">
              <img src="boy.png" width="50px" height="50px" alt="Profile"/><br></br>
            <p class="text-danger"><?php if(isset($_GET['err'])){echo simplify($_GET['err']);} ?></p>
              <form action="action_page.php?type=signup" method="post">
                <div class="form-group">
                  <label for="text">Username:</label>
                  <input name="name" type="text" class="form-control" placeholder="Enter username" id="email" required/>
                </div>
                <div class="form-group">
                  <label for="email">Email address:</label>
                  <input name="email" type="email" class="form-control" placeholder="Enter email" id="email" required>
                </div>
                <div class="form-group">
                  <label for="pwd">Password:</label>
                  <input name="pass" type="password" class="form-control" placeholder="Enter password" id="pwd" required>
                </div>
                <div class="form-group">
                  <label for="pwd">Re-Enter Password:</label>
                  <input name="rpass" type="password" class="form-control" placeholder="ReEnter password" id="pwd" required>
                </div>
                <div class="form-group form-check">
                 
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
              
          </div> 
          <div class="card-footer">Already have an account? Yayy <a href="index.php">Login Now</a></div>
        </div>
    </center>
      </div>
      
</body>
</html>