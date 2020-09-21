$(document).ready(function () {
    if(sessionStorage.getItem('loggedIn')==null){
        window.location.href = 'http://localhost/ChaperoneFront/Views/logIn.html';
    }
    console.log(sessionStorage.getItem('guideUname'));
    console.log(sessionStorage.getItem('guideId'));
    console.log(sessionStorage.getItem('guideCon'));
    //console.log(sessionStorage.getItem('guidePass'));
    console.log(sessionStorage.getItem('guideMail'));
});