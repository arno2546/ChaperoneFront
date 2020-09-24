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
    getUsers();

    $("#submitButton1").click(function(){
        var validation=false;
        email = $("#email1").val();
        name = $("#name1").val();
        password = $("#password1").val();       
        contact = $("#contact1").val();
        if(email.trim()==""){
            alert("Email cannot be empty");
        }
        else if(!email.includes("@") || !email.includes(".com")){
            alert("Enter proper Email address");
            validation=false;
        }
        if(name.trim()==""){
            alert("Name cannot be empty");
            validation=false;
        }
        if(password.trim()==""){
            alert("Password cannot be empty");
            validation=false;
        }
        if(contact.trim()==""){
            alert("Contact cannot be empty");
            validation=false;
        }else{
            validation=true;
        }
        if(validation){
            createAdmin();
        }
    });

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
        //$("#WelcomeLable").html("Welcome, "+suname+" (Admin)");
    }

    function getUsers(){
        $.ajax({
            url: "https://localhost:44337/api/users",           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    var tableHead = "<th scope=\"col\">Name</th><th scope=\"col\">Email</th><th scope=\"col\">User Type</th><th scope=\"col\">Status</th>";
                    
                    $(userTableHead).html(tableHead);
                    for(var i = 0; i<data.length;i++){
                        if(data[i].UserType=="Admin"){
                            str+="<tr><td>"+data[i].Name +"</td><td>"+data[i].Email +"</td><td>"+data[i].UserType+"</td><td>"+data[i].Status+"</td>";                                                
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

    function createAdmin(){
        $.ajax({
            url: "https://localhost:44337/api/users",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                Email: email,
                Name: name,
                Password: password,
                Contact: contact,
                UserType: "Admin",
                Status: "Active"
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    alert("Successfully Created Admin:"+name);
                    $("#email1").val("");
                    $("#name1").val("");
                    $("#password1").val("");                  
                    $("#contact1").val("");
                    getUsers();
                
                }               
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});