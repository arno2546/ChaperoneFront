$(document).ready(function () {
    $('#header').load("../Views/header.html");
    $('#footer').load("../Views/footer.html");
    
    var email = $("#email1").val();
    var name = $("#name1").val();
    var password = $("#password1").val();
    var location = $("#location1").val();
    var contact = $("#contact1").val();
    var language= $("#langSelect1").val();
   

    $("#submitButton1").click(function(){
        var validation=false;
        email = $("#email1").val();
        name = $("#name1").val();
        password = $("#password1").val();
        location = $("#location1").val();
        contact = $("#contact1").val();
        language= $("#langSelect1").val();
        if(email.trim()==""){
            alert("Email cannot be empty");
        }
        if(name.trim()==""){
            alert("Name cannot be empty");
            validation=false;
        }
        if(password.trim()==""){
            alert("Password cannot be empty");
            validation=false;
        }
        if(location.trim()==""){
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
            createTourist();
        }
    });
    
    function createTourist(){
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
                UserType: "Gen",
                Status: "Active",
                Language: language,
                Location: location,
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    alert("Successfully Created Gen..Please Log In");
                    $("#email1").val("");
                    $("#name1").val("");
                    $("#password1").val("");
                    $("#location1").val("");
                    $("#contact1").val("");
                    $("#langSelect1").val("");
                    
               
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});