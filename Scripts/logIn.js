$(document).ready(function () {
    var Email;
    var Password;
    $("#logIn-btn").click(function(){
        var valid;
        var validpass;
        $("#loginMsg").html("");
        Email=$("#loginEmail").val();
        Password=$("#loginPass").val();
        if(Email.trim()==""){
            alert("Email is Required");
            valid=false;
        }
        else if(!Email.includes("@") || !Email.includes(".com")){
            alert("Enter proper Email address");
            valid=false;
        }
        else{
            valid=true;
        }
        if(Password.trim()==""){
            alert("Password is Required");
            validpass=false;
        }
        else{
            validpass=true;
        }
        if(valid && validpass){
            logIn();
        }
    });

    function logIn(){
        $.ajax({
            url: "https://localhost:44337/api/login",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                Email: $("#loginEmail").val(),
                Password: $("#loginPass").val()      
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var LogInfo = xmlHttp.responseJSON;
                    if(LogInfo.UserType=="Guide"){
                        $("#loginMsg").html("Guide");
                        sessionStorage.setItem('loggedIn','true');
                        sessionStorage.setItem('guideUname',LogInfo.UserName);
                        sessionStorage.setItem('guideId',LogInfo.Id);
                        sessionStorage.setItem('guideCon',LogInfo.Contact);
                        sessionStorage.setItem('guidePass',Password);
                        sessionStorage.setItem('guideMail',Email);
                        window.location.href = 'http://localhost/ChaperoneFront/Views/GuideViews/';
                    }
                    console.log(LogInfo);
                }
                else{
                    alert("User dont exist");
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});