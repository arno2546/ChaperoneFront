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
                        sessionStorage.setItem('GuideloggedIn','true');
                        sessionStorage.setItem('guideUname',LogInfo.UserName);
                        sessionStorage.setItem('guideId',LogInfo.Id);
                        sessionStorage.setItem('guideCon',LogInfo.Contact);
                        sessionStorage.setItem('guidePass',Password);
                        sessionStorage.setItem('guideMail',Email);
                        window.location.href = 'http://localhost/ChaperoneFront/Views/GuideViews/';
                    } 
                    if(LogInfo.UserType=="Gen"){
                        $("#loginMsg").html("Gen");
                        sessionStorage.setItem('genloggedIn','true');
                        sessionStorage.setItem('genUname',LogInfo.UserName);
                        sessionStorage.setItem('genId',LogInfo.Id);
                        sessionStorage.setItem('genCon',LogInfo.Contact);
                        sessionStorage.setItem('genPass',Password);
                        sessionStorage.setItem('genMail',Email);
                        window.location.href = 'http://localhost/ChaperoneFront/Views/TouristViews/TouristIndex.html';
                    }
                    if(LogInfo.UserType=="Admin"){
                        $("#loginMsg").html("Admin");
                        sessionStorage.setItem('adminloggedIn','true');
                        sessionStorage.setItem('adminUname',LogInfo.UserName);
                        sessionStorage.setItem('adminId',LogInfo.Id);
                        sessionStorage.setItem('adminCon',LogInfo.Contact);
                        sessionStorage.setItem('adminPass',Password);
                        sessionStorage.setItem('adminMail',Email);
                        window.location.href = 'http://localhost/ChaperoneFront/Views/AdminViews/AdminIndex.html';
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