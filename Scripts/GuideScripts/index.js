$(document).ready(function () {
    if(sessionStorage.getItem('GuideloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
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
    console.log(sessionStorage.getItem('guideUname'));
    console.log(sessionStorage.getItem('guideId'));
    console.log(sessionStorage.getItem('guideCon'));
    //console.log(sessionStorage.getItem('guidePass'));
    console.log(sessionStorage.getItem('guideMail'));
    var suname = sessionStorage.getItem('guideUname');
    var spassword = sessionStorage.getItem('guidePass');
    var smail = sessionStorage.getItem('guideMail');
    var sid = sessionStorage.getItem('guideId');
    var scontact = sessionStorage.getItem('guideCon');
    setVal();
    getRequests();
    $("#logOut").click(function(){ 
        sessionStorage.clear();
        window.location.replace("http://localhost/ChaperoneFront/Views/logIn.html");
        
    });

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
        
        if(validate()){
            updateGuide();
        }
    });

    function validate(){
        if(email.trim()==""){
            alert("Email cannot be empty");
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

    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        $("#email").val(smail);
        $("#name").val(suname);
        $("#password").val(spassword);
        $("#contact").val(scontact);
        $("#WelcomeLable").html("Welcome, "+suname+" (Guide)");
    }

    function updateGuide(){
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
                if(xmlHttp.status==200){
                   alert("Successfully Updated Profile");
                   smail=email;
                   suname=name;
                   scontact=contact;
                   spassword=password;
                   sessionStorage.setItem('guideUname',name);
                   sessionStorage.setItem('guideMail',email);
                   sessionStorage.setItem('guidePass',password);
                   setVal();
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
    function getRequests(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+sid+"/requests",           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    var str = '';
                    var tableHead = "<th scope=\"col\">Location</th><th scope=\"col\">Tourist Id</th><th scope=\"col\">Request Status</th><th scope=\"col\">Actions</th>";
                    if(data.length<1){
                        //alert("No requests");
                        tableHead="<th scope=\"col\">Sorry You Have no requests :(</th>";
                    }
                    $(reqTableHead).html(tableHead);
                    for(var i = 0; i<data.length;i++){
                        str+="<tr><td>"+data[i].Location +"</td><td>"+data[i].TouristId +"</td><td>"+data[i].RequestState+"</td>";
                        if(data[i].RequestState=="Pending"){
                            str+="<td><a href=\"http://localhost/ChaperoneFront/Views/GuideViews/requestHandler.html?action=accepted&reqId="+data[i].RequestId+"\">Accept</a> <a href=\"http://localhost/ChaperoneFront/Views/GuideViews/requestHandler.html?action=rejected&reqId="+data[i].RequestId+"\">Reject</a><td><tr>";
                        }
                        else{
                            str+="<td></td><tr>";
                        }
                        $("#reqTableBody").html(str);
                    };  
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }
});