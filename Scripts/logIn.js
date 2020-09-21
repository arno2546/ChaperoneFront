$(document).ready(function () {
    var Email;
    var Password;
    $("#logIn-btn").click(function(){
        Email=$("#loginEmail").val();
        Password=$("#loginPass").val();
        if(Email.trim()==""){
            //do some validation 
        }
        $("#loginMsg").html("");
        logIn();
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