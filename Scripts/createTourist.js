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
        
        if(validate()){
            createTourist();
        }
    });
    
    function validate(){
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
        if(location.trim()==""){
            alert("Location cannot be empty");
            return false;
        }
        if(contact.trim()==""){
            alert("Contact cannot be empty");
            return false;
        }else{
            return true;
        }
    }

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
                    alert("Successfully Created Account..Please Log In");
                    $("#email1").val("");
                    $("#name1").val("");
                    $("#password1").val("");
                    $("#location1").val("");
                    $("#contact1").val("");
                    $("#langSelect1").val("");
                    window.location.href = "http://localhost/ChaperoneFront/Views/logIn.html";
                }
               
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});