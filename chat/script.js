let  p = null;
let f = true;
let interval = null;
let n = null;
window.onblur = function()
{
  f = false;
}
//Append function 
function appendMessage(name, img, side, text,time) {
    //   Simple solution for small apps
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>
  
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${time}</div>
          </div>
  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;
  
    document.getElementById("msg").innerHTML += msgHTML;
    document.getElementById("msg").scrollTop += 500;
  }

//Get params...
var params = {}
location.search.substring(1).split("&").forEach(function(item) {params[item.split("=")[0]] = item.split("=")[1]});

//get messsages from server...
async function get_msgs_from_server() 
{
  document.getElementById("msg").innerHTML = "";
  await fetch("fetch_msg.php?to_mail="+params["to"])
  .then(res=>res.json())
  .then((data) => {
    data.forEach(e => {
     
      if(e.fmail ==  document.getElementById("name").innerHTML)
      {
        
          appendMessage("Me", "boy.png","right",e.msg,e.time);
        
      }
      else 
      {
       
        appendMessage(e.fmail.split("@")[0], "boy1.png","left",e.msg,e.time);
      }
    });
  });
}

//Getting your own name
async function fetchname()
{
 
  let url = '../fetch_friends.php?type=name';
  await fetch(url).then(res=>res.text())
  .then(function(data){
    document.getElementById("name").innerHTML = data;
  });
  let url2 = 'get_name.php?email='+params["to"];
  await fetch(url2).then(res=>res.text())
  .then(function(data){
    n = data;
    document.getElementById("text").innerText = n;
    document.getElementById("msgtext").placeholder = "Message to "+ n;
    get_msgs_from_server();
  });
 

}


async function uploadtoken(token)
{
 await fetch("uploadtoken.php?to_mail="+params["to"]+"&token="+btoa(token)).then(res=>res.text())
 .then(function(data){
     if(data == "1")
     {
         console.log("Token Uploaded...");
     }
 })
}

async function uploadtoken_normal(token)
{
 await fetch("uploadtoken_ans.php?to_mail="+params["to"]+"&token="+btoa(token)).then(res=>res.text())
 .then(function(data){
     if(data == "1")
     {
         console.log("Token Uploaded...");
     }
 })
}

let conn = false;
async function checkanstoken()
{
    await fetch("checkanstoken.php?to_mail="+params["to"]).then(res=>res.text())
    .then(function(data){
        console.log("Token Checked:",atob(data));
        if(data != "")
        {
            try
            {
                p.signal(JSON.parse(atob(data)));
               
            }
            catch(err)
            {
                console.log("Error in sending signal:",err);
                 fetch("del_query.php?to="+params["to"]).then(res => res.text())
  .then((text)=>{
    if(text == "success")
    {
        console.log("Query Cleaned!!");
    }
  });
            }
        }
    });
}

async function checkanstoken_normal()
{
    await fetch("check_req_token.php?to_mail="+params["to"]).then(res=>res.text())
    .then(function(data){
        console.log("Token Checked:",atob(data));
        if(data != "")
        {
            try
            {
                p.signal(JSON.parse(atob(data)));
             
            }
            catch(err)
            {
                console.log("Error in sending signal:",err);
                 fetch("del_query.php?to="+params["to"]).then(res => res.text())
  .then((text)=>{
    if(text == "success")
    {
        console.log("Query Cleaned!!");
    }
  });
            }
        }
    });
}


function load_init()
{
   p = new SimplePeer({
        initiator:true,
        trickle: false,
      });
   p.on("signal",(token)=>{
    console.log("token Generated:",JSON.stringify(token));
    uploadtoken(JSON.stringify(token));
    interval = setInterval(()=>{
        if(conn == false)
        {
            checkanstoken();
        }
    },5000);
   });
   p.on("error",(err)=>{
       console.log(err.message);
    
     
          console.log("Peer disconnected!!",err);
      p.destroy();
      p = null;
      conn = false;
      load_init();
    
    });
   p.on("connect",()=>{
    get_msgs_from_server();
    console.log("CONNECTED");  
    conn =true;

    //Deleteing reminants

    fetch("del_query.php?to="+params["to"]).then(res => res.text())
  .then((text)=>{
    if(text == "success")
    {
        console.log("Query Cleaned!!");
    }
  });

   });
   p.on("data", (data) => {
    console.log(new TextDecoder().decode(data));
    appendMessage(n, "boy1.png","left",new TextDecoder().decode(data),formatDate(new Date()));
    if(Notification.permission === "granted" && f == false)
    {
      showNotification(n,new TextDecoder().decode(data));
    }
  });
}

function load_normal()
{
    p = new SimplePeer({});
    console.log("Getting tokens to connect...");
    setInterval(()=>{
        if(conn == false)
        {
            checkanstoken_normal();
        }
    },5000);
    p.on("signal",(token)=>{
        if(token.type == 'answer')
        {
        console.log("token Generated:",JSON.stringify(token));
        uploadtoken_normal(JSON.stringify(token));
        }
    });
    p.on("error",(err)=>{
      console.log(err.message);
    
      
          console.log("Peer disconnected!!",err);
      p.destroy();
      p = null;
      conn = false;
      load_normal();
     
    });

    p.on("connect",()=>{
      get_msgs_from_server();
      console.log("CONNECTED");  
      conn =true;
    });

    p.on("data", (data) => {
        console.log(new TextDecoder().decode(data));
        appendMessage(n, "boy1.png","left",new TextDecoder().decode(data),formatDate(new Date()));
        if(Notification.permission === "granted" && f == false)
        {
          showNotification(n,new TextDecoder().decode(data));
        }
      });
}

function formatDate(date) 
{
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
  
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

async function send_msgs(msg) 
{

  if(conn == true)
  {
    try{
    p.send(msg.value);
    appendMessage("Me", "boy.png","right",msg.value,formatDate(new Date()));

  
    await fetch("send_msg.php?to_mail="+params["to"]+"&msg="+msg.value)
  .then(res=>res.text())
  .then((data) => {
    msg.value = "";
    if(data == "1")
    {
        console.log("Message sent successfully to server...");
    }
  });

    }
    catch(err)
    {
         console.log("Peer disconnected!!",err);
      p.destroy();
      p = null;
      conn = false;
      if(params["init"] == undefined)
      {
          load_normal();
      }
      else
      {
          load_init();
      }
     
    }
  }
  else
  {
    //Only upload to server...
    appendMessage("Me", "boy.png","right",msg.value,formatDate(new Date()));
    await fetch("send_msg.php?to_mail="+params["to"]+"&msg="+msg.value)
    .then(res=>res.text())
    .then((data) => {
      msg.value = "";
      if(data == "1")
      {
          console.log("Message sent successfully only to server...");
      }
    });

  }
}



if(params["init"] != undefined)
{
    console.log("User type:Init");
    load_init();
}
else
{
    console.log("User type:Normal");
    load_normal();
}


fetchname();


////////////////////////
let permission = Notification.permission;
if(permission === "granted") {
   showNotification();
} else if(permission === "default"){
   requestAndShowPermission();
} else {
  alert("Use normal alert");
}
function showNotification(title,msg) {
   if(document.visibilityState === "visible") {
       return;
   }
   icon = "boy.png"
   var notification = new Notification(title, { msg, icon });
   notification.onclick = () => { 
          notification.close();
          window.parent.focus();
   }
}
function requestAndShowPermission() {
   Notification.requestPermission(function (permission) {
      if (permission === "granted") {
            showNotification();
      }
   });
  }