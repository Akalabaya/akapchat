
$(document).ready(function(){

  $('[data-toggle="tooltip"]').tooltip();  
  setInterval(function(){
    var tableHeaderRowCount = 1;
          var table = document.getElementById('friends-table');
          var rowCount = table.rows.length;
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
          }
    if(document.getElementById("type").innerText == "Friends"){fetchFriends()}
          else{fetchReq();}
  },30000); 
});

function acceptReq(i,ele)
{
  ele.innerHTML = '<div class="spinner-border text-success"></div>';
    ele.disabled = true;
    setTimeout(function(){ 
        let data = {id: i};

        fetch("accept_request.php?id="+i, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
          console.log("Request complete! response:", res);
          var tableHeaderRowCount = 1;
          var table = document.getElementById('friends-table');
          var rowCount = table.rows.length;
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
          }
          fetchReq();
         
        }); 
       
    }, 5000);  
    
}
function sendReq(i,ele,e)
{
    ele.innerHTML = '<div class="spinner-border text-white"></div>';
    ele.disabled = true;
    setTimeout(function(){ 
        let data = {to_mail: i.value};

        fetch("send_req.php?to_mail="+i.value, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
        
         
              alert("Request Sent to "+i.value+" successfully.You can chat once the request is accepted.");
              ele.innerText = "Add Friend";
              ele.disabled = false;
              i.value = ""
           
        }); 
       
    }, 5000);  
    
}
function denyReq(i,ele)
{
  if(confirm("Are you sure you want to deny/delete this friend?") == true){
  ele.innerHTML = '<div class="spinner-border text-danger"></div>';
    ele.disabled = true;
    setTimeout(function(){ 
        let data = {id: i};

        fetch("delete_friend.php?id="+i, {
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        }).then(res => {
          var tableHeaderRowCount = 1;
          var table = document.getElementById('friends-table');
          var rowCount = table.rows.length;
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
            table.deleteRow(tableHeaderRowCount);
          }
          if(document.getElementById("type").innerText == "friend"){fetchFriends()}
          else{fetchReq();}
        }); 
       
    }, 2000);  
    
  }
}

function addFriendTable(email,id)
{
  var t = document.getElementById("friends-table");
  var row = t.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell3 = row.insertCell(1);
  cell1.innerHTML = "<a href='javascript:void(0)'>"+email.split("&")[0]+'</a>';
  cell3.onclick = function(){denyReq(id,cell3);};
  cell3.innerHTML = '<button type="submit" class="btn btn-danger">Delete</button>';
  cell1.onclick = function(){location.href = "chat/?id="+id+"&to="+email;};
  

}

function addFriendTablemy(email,id)
{
  var t = document.getElementById("friends-table");
  var row = t.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell3 = row.insertCell(1);
  cell1.innerHTML = "<a href='javascript:void(0)'>"+email.split("&")[0]+'</a>';
  cell3.onclick = function(){denyReq(id,cell3);};
  cell3.innerHTML = '<button type="submit" class="btn btn-danger">Delete</button>';
  cell1.onclick = function(){location.href = "chat/?to="+email+"&init=true&id="+id;};
  

}

function addReqTable(email,id)
{
  var t = document.getElementById("friends-table");
  var row = t.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = email;
  cell2.innerHTML = '<button data-toggle="tooltip"  type="submit" class="btn btn-success">Accept</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  cell2.onclick = function(){acceptReq(id,cell2);};
  cell3.innerHTML = '<button type="submit" class="btn btn-danger">Deny</button>';
  cell3.onclick = function(){denyReq(id,cell3);};
  

}

async function fetchname()
{
 
  let url = 'fetch_friends.php?type=name';
  await fetch(url).then(res=>res.text())
  .then(function(data){
    console.log(data);
    document.getElementById("username").innerText = data.split("@")[0];
    document.getElementById("full_mail").innerHTML = data;

  });
  let url2 = 'fetch_friends.php?type=id';
  await fetch(url2).then(res=>res.text())
  .then(function(data){
    n = data; 
  });
}

async function fetchFriends()
{
 
    let url = 'fetch_friends.php';

    await fetch(url)
    .then(response => response.json())
   .then(function(text){

    for(var i in text)
    {
        var obj = text[i];
        var id = obj.id;
        var my_mail = obj.my_mail;
        var to_mail = obj.to_mail;
        let email = document.getElementById("full_mail").innerHTML;
        
        if(email != my_mail)
        {
         to_mail = my_mail;
         addFriendTable(to_mail, id.toString());
        }
        else
        {
          addFriendTablemy(to_mail, id.toString());
        }
        console.log(to_mail);
        
    }
   });

}

async function fetchReq()
{
 
    let url = 'fetch_friends.php?type=req';

    await fetch(url)
    .then(response => response.json())
   .then(function(text){

    for(var i in text)
    {
        var obj = text[i];
        var id = obj.id;
        var my_mail = obj.my_mail;

        addReqTable(my_mail, id.toString());
    }
   });

}

function changeTab(type)
{
  if(type == "requests")
  {
    document.getElementById("type").innerText = "Requests";
    document.getElementById("req").class = "col";
    document.getElementById("friend").class = "col bg-primary text-white";
    var tableHeaderRowCount = 1;
    var table = document.getElementById('friends-table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
    }
    fetchReq();
  }
  else
  {
    document.getElementById("type").innerText = "Requests";
    document.getElementById("friend").classList.remove("bg-primary","text-white");
    document.getElementById("friend").classList.add("text-dark");
    document.getElementById("req").classList.add("bg-primary","text-white");
    document.getElementById("type").innerText = "Friends";
    var tableHeaderRowCount = 1;
    var table = document.getElementById('friends-table');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
    }
    fetchFriends();
  }
}
async function logout() 
{
if(confirm("Are you sure to logout?"))
{
  await fetch("logout_action.php").then(res=>res.text())
  .then(function(text){
      location.reload();
  });
}
}

fetch("fetch_friends.php?type=name")
.then(res=>res.text())
.then(function(text){
  if(text=="error")
  {
    window.location.href = "index.php";
  }
});


async function upDateName(uname)
{
  fetch("update_name.php?uname="+uname)
  .then(res=>res.text()).then((text)=>{
    if(text == "success")
    {
      fetchname();
      alert("Name updated successfully");
    }
    else
    {
      alert("Ahh! Something went wrong while updating the name..");
    }
  });
}

fetchname();
setTimeout(function(){
  fetchFriends();
},2000);