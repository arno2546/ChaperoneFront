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

    $("#MaleCheck").change(function(){
        if(this.checked){
            maleCheck=true;
        }
        else{
            maleCheck=false;
        }
    });

    $("#FemaleCheck").change(function(){
        if(this.checked){
            femaleCheck=true;
        }
        else{
            femaleCheck=false;
        }
    });

    $("#searchButton").click(function(){
        // var str = $("#SearchString").val()+" "+ checkCulture+" "+checkFestivals+" "+checkFood+" "
        //             +checkNightLife+" "+checkSports+" "+femaleCheck+" "+maleCheck;
       $("#msg").html("");
        //window.location.replace("../views/searchResults.html");

        getSearchResults();
    });

    function getSearchResults(){
        $.ajax({
            url:"https://localhost:44337/api/search",
            method:"post",
            headers:{
                contentType:"application.json"
            },
            data:{
                SearchString:$("#SearchString").val(),
                Culture:checkCulture,
                NightLife:checkNightLife,
                Sports:checkSports,
                Food:checkFood,
                Festival:checkFestivals,
                Male:maleCheck,
                Female:femaleCheck
            },
            complete:function(xmlHttp,status){
                if(xmlHttp.status=200){
                    var guides = xmlHttp.responseJSON;
                    var str='';
                    $("#resultLable").html("Result(s):");
                    $("#line").html("<hr>");
                    //window.location.replace("../views/searchResults.html");
                    if(guides.length<1){
                        $("#errMsg").html("Sorry No results found :(");
                        alert("No result");
                    }
                    for(var i=0;i<guides.length;i++){
                        str+="<div><span id=\"guide-name\">"+guides[i].Name+"</span><br><span id=\"guide-loc\">"+guides[i].Location+"</span><br><a id=\"detailsLink\" href=\"http://localhost/ChaperoneFront/Views/TouristViews/GuideDetailsView.html?guideId="+guides[i].UserId+"\">View Details</a></div>"
                        $("#msg").html(str);
                    }                    
                }
                else{
                    $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
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
        $("#WelcomeLable").html("Welcome, "+suname+" (Tourist)");
    }
});