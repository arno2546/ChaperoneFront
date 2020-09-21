$(document).ready(function () {
    if(sessionStorage.getItem('loggedIn')==null){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(sessionStorage.getItem('guideUname'));
    console.log(sessionStorage.getItem('guideId'));
    console.log(sessionStorage.getItem('guideCon'));
    //console.log(sessionStorage.getItem('guidePass'));
    console.log(sessionStorage.getItem('guideMail'));
    var uname = sessionStorage.getItem('guideUname');
    var password = sessionStorage.getItem('guidePass');
    var mail = sessionStorage.getItem('guideMail');
    var id = sessionStorage.getItem('guideId');
    var contact = sessionStorage.getItem('guideCon');
    $("title").html("Chaparone: "+uname);
    $("#logOut").html("Logout("+uname+")");
    $("#WelcomeLable").html("Welcome, "+uname+" (Guide)");
});