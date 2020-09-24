$(document).ready(function () {
    if(sessionStorage.getItem('adminloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(sessionStorage.getItem('adminUname'));
    console.log(sessionStorage.getItem('adminId'));
    console.log(sessionStorage.getItem('adminCon'));
    //console.log(sessionStorage.getItem('adminPass'));
    console.log(sessionStorage.getItem('adminMail'));
    var suname = sessionStorage.getItem('adminUname');
    var spassword = sessionStorage.getItem('adminPass');
    var smail = sessionStorage.getItem('adminMail');
    var sid = sessionStorage.getItem('adminId');
    var scontact = sessionStorage.getItem('adminCon');
    setVal();
    getRequests();
    getUsers();

    $("#logOut").click(function(){ 
        sessionStorage.clear();
        window.location.replace("http://localhost/ChaperoneFront/Views/logIn.html");
    });
    
    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        //$("#email").val(smail);
        //$("#name").val(suname);
        //$("#password").val(spassword);
        //$("#contact").val(scontact);
        $("#WelcomeLable").html("Welcome, "+suname+" (Admin)");
    }
    function getRequests(){
        $.ajax({
            url: "https://localhost:44337/api/requests",           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    var tableHead = "<th scope=\"col\">Location</th><th scope=\"col\">Tourist Id</th><th scope=\"col\">Request Status</th>";
                    
                    $(reqTableHead).html(tableHead);
                    for(var i = 0; i<data.length;i++){
                        str+="<tr><td>"+data[i].Location +"</td><td>"+data[i].TouristId +"</td><td>"+data[i].RequestState+"</td>";                          
                        }
                        $("#reqTableBody").html(str);                      
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function getUsers(){
        $.ajax({
            url: "https://localhost:44337/api/users",           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    var tableHead = "<th scope=\"col\">Name</th><th scope=\"col\">Email</th><th scope=\"col\">User Type</th><th scope=\"col\">Location</th><th scope=\"col\">Status</th><th scope=\"col\">Actions</th>";
                    
                    $(userTableHead).html(tableHead);
                    for(var i = 0; i<data.length;i++){
                        if(data[i].UserType!="Admin"){
                            str+="<tr><td>"+data[i].Name +"</td><td>"+data[i].Email +"</td><td>"+data[i].UserType+"</td><td>"+data[i].Location+"</td><td>"+data[i].Status+"</td>";                          
                            if(data[i].Status=="Active"){
                                str+="<td><a href=\"http://localhost/ChaperoneFront/Views/AdminViews/AdminStatusHandler.html?action=Banned&userId="+data[i].UserId+"\">Ban</a></td><tr>";
                            }else{
                                str+="<td><a href=\"http://localhost/ChaperoneFront/Views/AdminViews/AdminStatusHandler.html?action=Active&userId="+data[i].UserId+"\">Unbann</a></td><tr>";
                            }                        
                        }
                    }
                    $("#userTableBody").html(str);                      
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

});