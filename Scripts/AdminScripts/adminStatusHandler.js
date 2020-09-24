$(document).ready(function () {
    if(sessionStorage.getItem('adminloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(getParameter('userId'));
    console.log(getParameter('action'));
    var userId = getParameter('userId');
    var userStatus = getParameter('action');
    var spassword = sessionStorage.getItem('adminPass');
    var smail = sessionStorage.getItem('adminMail');
    getUser();
    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }

    function getUser(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+userId,           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    email = data.Email;
                    name = data.Name;
                    password = data.Password;
                    contact = data.Contact;
                    userType = data.UserType;
                    gender = data.Gender;
                    language = data.Language;
                    userLocation = data.Location;
                    bio = data.Bio;
                    culture = data.Culture;
                    nightlife = data.NightLife;
                    sports = data.Sports;
                    food = data.Food;
                    festival = data.Festival;
                    rate = data.Rate;             
                    putUser();
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function putUser(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+userId,           
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
                UserType: userType,
                Status: userStatus,
                Gender: gender,
                Language: language,
                Location: userLocation,
                Bio: bio,
                Culture: culture,
                NightLife: nightlife,
                Sports: sports,
                Food: food,
                Festival: festival,
                Rate: rate
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                   alert("Success : Name: "+name+" status: "+userStatus);
                   window.location.replace("http://localhost/ChaperoneFront/Views/AdminViews/AdminIndex.html");
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});