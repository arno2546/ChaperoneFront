$(document).ready(function () {
    $('#header').load("../Views/header.html");
    $('#footer').load("../Views/footer.html");
    var checkCulture=false;
    var checkSports=false;
    var checkNightLife=false;
    var checkFestivals=false;
    var checkFood=false;
    var email = $("#email").val();
    var name = $("#name").val();
    var password = $("#password").val();
    var location = $("#location").val();
    var contact = $("#contact").val();
    var gender = $("#genderSelect").val();
    var language= $("#langSelect").val();
    var bio= $("#bio").val();

    $("#submitButton").click(function(){
        var validation=false;
        email = $("#email").val();
        name = $("#name").val();
        password = $("#password").val();
        location = $("#location").val();
        contact = $("#contact").val();
        gender = $("#genderSelect").val();
        language= $("#langSelect").val();
        bio= $("#bio").val();
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
            createGuide();
        }
    });
    $("#CultureCheck").change(function(){
        if(this.checked){
            checkCulture=true;
        }
        else{
            checkCulture=false;
        }
    });

    $("#SportsCheck").change(function(){
        if(this.checked){
            checkSports=true;
        }
        else{
            checkSports=false;
        }
    });

    $("#FoodCheck").change(function(){
        if(this.checked){
            checkFood=true;
        }
        else{
            checkFood=false;
        }
    });

    $("#NightLifeCheck").change(function(){
        if(this.checked){
            checkNightLife=true;
        }
        else{
            checkNightLife=false;
        }
    });

    $("#FestivalCheck").change(function(){
        if(this.checked){
            checkFestivals=true;
        }
        else{
            checkFestivals=false;
        }
    });
    
    function createGuide(){
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
                UserType: "Guide",
                Status: "Active",
                Gender: gender,
                Language: language,
                Location: location,
                Bio: bio,
                Culture: checkCulture,
                NightLife: checkNightLife,
                Sports: checkSports,
                Food: checkFood,
                Festival: checkFestivals,
                Rate:120
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    alert("Successfully Created Guide..Please Log In");
                    $("#email").val("");
                    $("#name").val("");
                    $("#password").val("");
                    $("#location").val("");
                    $("#contact").val("");
                    $("#genderSelect").val("");
                    $("#langSelect").val("");
                    $("#bio").val("");
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});