$(document).ready(function () {
    if(sessionStorage.getItem('genloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(sessionStorage.getItem('genUname'));
    console.log(sessionStorage.getItem('genId'));
    console.log(sessionStorage.getItem('genCon'));
    //console.log(sessionStorage.getItem('genPass'));
    console.log(sessionStorage.getItem('genMail'));
    var suname = sessionStorage.getItem('genUname');
    var spassword = sessionStorage.getItem('genPass');
    var smail = sessionStorage.getItem('genMail');
    var sid = sessionStorage.getItem('genId');
    var scontact = sessionStorage.getItem('genCon');
    setVal();
    var checkCulture=false;
    var checkSports=false;
    var checkNightLife=false;
    var checkFestivals=false;
    var checkFood=false;
    var maleCheck=false;
    var femaleCheck=false;
    $("#logOut").click(function(){ 
        sessionStorage.clear();
        window.location.replace("http://localhost/ChaperoneFront/Views/logIn.html");
    });

    $("#submitButton1").click(function(){
        var validation=false;
        email = $("#email1").val();
        name = $("#name1").val();
        password = $("#password1").val();
        touristlocation = $("#location1").val();
        contact = $("#contact1").val();
        language= $("#langSelect1").val();
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
        if(touristlocation.trim()==""){
            alert("Location cannot be empty");
            validation=false;
        }
        if(contact.trim()==""){
            alert("Contact cannot be empty");
            validation=false;
        }else{
            validation=true;
        }
        if(validation){
            updateTourist();
        }
    });

    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        $("#email1").val(smail);
        $("#name1").val(suname);
        $("#password1").val(spassword);
        $("#contact1").val(scontact);
        //$("#WelcomeLable").html("Welcome, "+suname+" (Tourist)");
    }

    function updateTourist(){
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
                UserType: "Gen",
                Status: "Active",
                Language: language,
                Location: touristlocation            
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                   alert("Successfully Updated Profile");
                   smail=email;
                   suname=name;
                   scontact=contact;
                   spassword=password;
                   setVal();
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});