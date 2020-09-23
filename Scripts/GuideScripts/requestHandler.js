$(document).ready(function () {
    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }
    console.log(getParameter('reqId'));
    console.log(getParameter('action'));
});