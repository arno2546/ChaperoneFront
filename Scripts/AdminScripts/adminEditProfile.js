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
    //alert(btoa(smail+":"+spassword));
    var autho = btoa(smail+":"+spassword);
    console.log(autho);
    $("#logOut").click(function(){ 
        sessionStorage.clear();
        window.location.replace("http://localhost/ChaperoneFront/Views/logIn.html");
    });

    $("#submitButton1").click(function(){
        email = $("#email1").val();
        name = $("#name1").val();
        password = $("#password1").val();       
        contact = $("#contact1").val();
        
        if(validation()){
            updateAdmin();
        }
    });

    function validation(){
        if(email.trim()==""){
            alert("Email cannot be empty");
            return false;
        }
        else if(!email.includes("@") || !email.includes(".com")){
            alert("Enter proper Email address");
            return false;
        }
        if(name.trim()==""){
            alert("Name cannot be empty");
            return false;
        }
        if(password.trim()==""){
            alert("Password cannot be empty");
            return false;
        }
        if(contact.trim()==""){
            alert("Contact cannot be empty");
            return false;
        }else{
            return true;
        }
    }

    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        $("#email1").val(smail);
        $("#name1").val(suname);
        $("#password1").val(spassword);
        $("#contact1").val(scontact);
        //$("#WelcomeLable").html("Welcome, "+suname+" (Admin)");
    }

    function updateAdmin(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+sid,           
            method:"put",            
            headers:{
                contentType:"application.json",
                Authorization: "Basic "+btoa(smail+":"+spassword)
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
                if(xmlHttp.status==200){
                    alert("Successfully Updated Admin:"+name);
                    suname=name;
                    smail=email;
                    spassword=password;
                    scontact=contact;
                    setVal();                
                }               
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});