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
    getRequests();
    function setVal(){
        $("title").html("Chaparone: "+suname);
        $("#logOut").html("Logout("+suname+")");
        //$("#email").val(smail);
        //$("#name").val(suname);
        //$("#password").val(spassword);
        //$("#contact").val(scontact);
        $("#WelcomeLable").html(suname+"'s Requests");
    }

    function getRequests(){
        $.ajax({
            url: "https://localhost:44337/api/users/"+sid+"/requests",           
            method:"get",
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
                            str+="<td><a href=\"http://localhost/ChaperoneFront/Views/TouristViews/TouristRequestHandler.html?action=Cancelled&reqId="+data[i].RequestId+"\">Cancel</a><td><tr>";
                        }
                        if(data[i].RequestState=="accepted"){
                            str+="<td><a href=\"http://localhost/ChaperoneFront/Views/TouristViews/TouristRequestHandler.html?action=Completed&reqId="+data[i].RequestId+"\">Close</a><td><tr>";
                        }
                        if(data[i].RequestState=="Completed"){
                            str+="<td><a href=\"http://localhost/ChaperoneFront/Views/TouristViews/TouristReviewView.html?reqId="+data[i].RequestId+"\">Review</a><td><tr>";
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