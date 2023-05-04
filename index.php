<?php 
session_start();
if(isset($_SESSION["akapchat_user"]))
{
  header("Location:dashboard.html");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
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
          <div class="card-header"><h2>Login</h2></div>
          <div class="card-body">
              <img src="boy.png" width="50px" height="50px" alt="Profile"/><br></br>
              <p class="text-danger"><?php if(isset($_GET['err'])){if($_GET['err'] == "404"){echo "Incorrect Email/Password...";} } ?></p>
             
              <form action="action_page.php?type=login" width="393px" method="post">
               
              <div class="form-group">
                  <label for="email">Email Address:</label>
                  <input name="email" type="email" class="form-control" placeholder="Enter Email" id="mail" required>
                </div>

                <div class="form-group">
                  <label for="pass">Password:</label>
                  <input name="pass" type="password" class="form-control" placeholder="Enter password" id="pwd" required>
                </div>
                
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
              
          </div> 
          <div class="card-footer">Do not have an account? NP <a href="signup.php">Sign up</a></div>
        </div>
    </center>
      </div>
      
</body>
</html>