$(document).ready(function(){
    var checkCulture=false;
    var checkSports=false;
    var checkNightLife=false;
    var checkFestivals=false;
    var checkFood=false;
    var maleCheck=false;
    var femaleCheck=false;

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

    $("#msg").click(function(){
        alert("Please Log in or Sign up to see more details");
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
                        str+="<div><span id=\"guide-name\">"+guides[i].Name+"</span><br><span id=\"guide-loc\">"+guides[i].Location+"</span></div>"
                        $("#msg").html(str);
                    }                    
                }
                else{
                    $("#msg").html(xmlHttp.status+":"+xmlHttp.statusText);
                }
            }
        });
    }
});