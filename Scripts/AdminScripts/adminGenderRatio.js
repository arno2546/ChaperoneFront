$(document).ready(function () {    
    var male;
    var female;
    var maleRatio;
    var femaleRatio;
    console.log(male);
    var spassword = sessionStorage.getItem('adminPass');
    var smail = sessionStorage.getItem('adminMail');
    getGenderRatio();
    

    function getGenderRatio(){
        $.ajax({
            url: "https://localhost:44337/api/genderRatio",           
            method:"get",
            headers:{
                Authorization: "Basic "+btoa(smail+":"+spassword)
            },
            complete: function(xmlHttp,status){
                if(xmlHttp.status==200){
                    var data = xmlHttp.responseJSON;
                    male = data.MaleRatio;
                    female = data.FemaleRatio;
                    var total = male+female;
                    maleRatio = (male/total)*100;
                    femaleRatio = (female/total)*100;
                    displayGenderRatio();
                    console.log(maleRatio);
                    console.log(femaleRatio);                                        
                }
                else{
                    console.log(xmlHttp.status+":"+xmlHttp.statusText); 
                }
            }
        });
    }

    function displayGenderRatio(){
        let ctx = document.getElementById('myChart').getContext('2d');
        let labels = ['Male', 'Female'];
        let colorHex = ['#FB3640', '#EFCA08'];

        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                data: [maleRatio, femaleRatio],
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