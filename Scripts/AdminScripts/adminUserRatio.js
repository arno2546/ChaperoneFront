$(document).ready(function () {
    getGenderRatio();
    var admin;
    var guide;
    var tourist;
    var adminRatio;
    var guideRatio;
    var touristRatio;
    console.log(admin);
    

    function getGenderRatio(){
        $.ajax({
            url: "https://localhost:44337/api/userRatio",           
            method:"get",
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    admin = data.Admin;
                    guide = data.Guide;
                    tourist = data.Tourist;
                    var total = admin+guide+tourist;
                    adminRatio = (admin/total)*100;
                    guideRatio = (guide/total)*100;
                    touristRatio = (tourist/total)*100;
                    displayGenderRatio();
                    console.log(adminRatio);
                    console.log(touristRatio);                                        
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function displayGenderRatio(){
        let ctx = document.getElementById('userChart').getContext('2d');
        let labels = ['Admin', 'Guide','Tourist'];
        let colorHex = ['#6A2CDD ', '#11AFA6 ','#69DB0F'];

        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                data: [adminRatio.toPrecision(3), guideRatio.toPrecision(3), touristRatio.toPrecision(3)],
                backgroundColor: colorHex
                }],
                labels: labels
            },
            options: {
                responsive: true,
                legend: {
                position: 'bottom'
                },
                plugins: {
                datalabels: {
                    color: '#fff',
                    anchor: 'end',
                    align: 'start',
                    offset: -10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 25,
                    backgroundColor: (context) => {
                    return context.dataset.backgroundColor;
                    },
                    font: {
                    weight: 'bold',
                    size: '10'
                    },
                    formatter: (value) => {
                    return value + ' %';
                    }
                }
                }
            }
        })
    }
});