$(document).ready(function () {
    if(sessionStorage.getItem('genloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    var suname = sessionStorage.getItem('genUname');
    console.log(suname);
   
    setVal();
    console.log(getParameter('guideId'));
    var gId = getParameter('guideId');
    var sid = sessionStorage.getItem('genId');
    console.log(sid);
    console.log(gId);
    console.log(sessionStorage.getItem('startDate'));
    console.log(sessionStorage.getItem('endDate'));
    getGuide();

    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }

    function getGuide(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+gId,           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    //console.log(data);
                    $("#name").html("Name : "+data.Name);
                    $("#email").html("Email : "+data.Email);
                    $("#contact").html("Phone : "+data.Contact);
                    $("#location").html(data.Location);
                    $("#gender").html("Gender : "+data.Gender);
                    $("#rate").html("Rate : "+data.Rate+"$");
                    var str = "Culture : "+data.Culture+" | Night Life : "+data.NightLife+" | Sports : "+data.Sports+" | Food : "+data.Food+" | Festival : "+data.Festival;
                    $("#interests").html(str);

                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }
    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        //$("#email").val(smail);
        //$("#name").val(suname);
        //$("#password").val(spassword);
        //$("#contact").val(scontact);
        //$("#WelcomeLable").html("Welcome, "+suname+" (Tourist)");
    }

    $("#logOut").click(function(){ 
        sessionStorage.clear();
        window.location.replace("http://localhost/ChaperoneFront/Views/logIn.html");
    });
    
    $("#request").click(function(){
        sendRequest();
        //alert( "Location: "+$("#location").html());
        
    });

    function sendRequest(){
        $.ajax({
            url: "https://localhost:44337/api/requests",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                Location:$("#location").html(),
                TouristId: sid,
                GuideId: gId,
                StartDate: sessionStorage.getItem('startDate'),
                EndDate: sessionStorage.getItem('endDate'),
                RequestState: "Pending"
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    alert("Successfully Sent Request");
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});