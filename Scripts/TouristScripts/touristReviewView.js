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
    var reqId = getParameter('reqId');
    console.log(reqId);

    $("#SubmitReview").click(function(){
        getRequest();
    });

    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }

    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        //$("#email").val(smail);
        //$("#name").val(suname);
        //$("#password").val(spassword);
        //$("#contact").val(scontact);
        //$("#WelcomeLable").html(suname+"'s Requests");
    }

    function getRequest(){
        $.ajax({
            url: "https://localhost:44337/api/requests/"+reqId,           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    tuoristId = data.TouristId;
                    guideId = data.GuideId;
                    starDate = data.StartDate;
                    endDate = data.EndDate;
                    reqLocation = data.Location;  
                    postReview();                 
                    putRequest();
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function putRequest(){
        $.ajax({
            url: "https://localhost:44337/api/requests/"+reqId,           
            method:"put",
            headers:{
                contentType:"application.json"
            },
            data:{
                Location: reqLocation,
                TouristId: tuoristId,
                GuideId: guideId,
                StartDate: starDate,
                EndDate: endDate,
                RequestState: "Reviewed"
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    alert("Successfully Reviewd Guide");
                    window.location.replace("http://localhost/ChaperoneFront/Views/TouristViews/TouristRequestView.html");
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }

    function postReview(){
        $.ajax({
            url: "https://localhost:44337/api/reviews",           
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                ReviewString:$("#reviewStr").val() ,
                ReviewerId: sid,
                ReviewedId: guideId,
                Rating: $("#rating").val()
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==201){
                    $("#reviewStr").val("");
                    $("#rating").val("");
                    alert("Thank you for your review :)");
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }
});