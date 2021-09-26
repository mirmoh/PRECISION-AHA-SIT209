$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'http://localhost:5007/api';

chartIt();

async function chartIt() {
    const data = await getData();

    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xtimes,
        datasets: [{
            label: 'Soil Moisture level',
            data: data.ysoils,
            backgroundColor: [
                'rgba(4, 219, 90, 0.2)'
            ],
            borderColor: [
                'rgba(5, 166, 69, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

//get data
async function getData() {
    const xtimes = [];
    const ysoils = [];

    await $.get(`${API_URL}/devices/data`)
    .then(response => {
      response.forEach(device => {
          for(let i = 0, l = device.__v; i < l; i++) {
                const d    = new Date();
                const ts   = device.sensorData[i].ts;
                d.setTime(ts);
                xtimes.push(d.toLocaleString());
                const soil = device.sensorData[i].temp;
                ysoils.push(soil);    
            }
      });
    })

    return { xtimes, ysoils };
}