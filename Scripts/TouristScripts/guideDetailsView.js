$(document).ready(function () {
    console.log(getParameter('guideId'));
    function getParameter( paramName ){
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get( paramName );
    }

    function getGuide(){
        
    }
});