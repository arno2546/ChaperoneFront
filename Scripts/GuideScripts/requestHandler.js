$(document).ready(function () {
    if(sessionStorage.getItem('GuideloggedIn')!='true'){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(getParameter('reqId'));
    console.log(getParameter('action'));
    var reqId = getParameter('reqId');
    var reqState = getParameter('action');
    var spassword = sessionStorage.getItem('guidePass');
    var smail = sessionStorage.getItem('guideMail');
    getRequest();
    
    
    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }

    function getRequest(){
        $.ajax({
            url: "https://localhost:44337/api/requests/"+reqId,           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    tuoristId = data.TouristId;
                    guideId = data.GuideId;
                    starDate = data.StartDate;
                    endDate = data.EndDate;
                    reqLocation = data.Location;                   
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
                contentType:"application.json",
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            data:{
                Location: reqLocation,
                TouristId: tuoristId,
                GuideId: guideId,
                StartDate: starDate,
                EndDate: endDate,
                RequestState: reqState
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status==200){
                    alert("Successfully Completed Request");
                    window.location.href = "http://localhost/ChaperoneFront/Views/GuideViews/";
                }
                else{
                    $("#postCreateMsg").html("Error: "+xmlHttp.status+":"+xmlHttp.statusText);
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
       })
    }



});