$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL  = 'http://localhost:5007/api';
const MQTT_URL = 'http://localhost:5077/choose-device';


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
    listDevice();
    const xtimes = [];
    const ysoils = [];
    const name = await getDevice();

    await $.get(`${API_URL}/devices/data`)
    .then(response => {
      response.forEach(device => {
        if(device.name == name) {
          for(let i = 0, l = device.__v; i < l; i++) {
            const d    = new Date();
            const ts   = device.sensorData[i].ts;
            d.setTime(ts);
            xtimes.push(d.toLocaleString());
            const soil = device.sensorData[i].temp;
            ysoils.push(soil);    
          }
        }
      });
    })
    return { xtimes, ysoils };
}

async function getDevice() {
  await chooseDevice()
  const dname = [];

  await $.get(`${API_URL}/chosen-device`)
  .then(response => {
    response.forEach(device => {
      for(let i = 0, l = device.__v; i < l; i++) {
        const soil = device.chosenDevice[i].name;
        dname.push(soil);    
      }
    });
  })
  return dname[dname.length - 1];
}

//display device
async function listDevice() {
  await $.get(`${API_URL}/devices`)
  .then(response => {
    response.forEach(device => {
      $('#devices tbody').append(`
        <tr>
          <td>${device.user}</td>
          <td>${device.name}</td>
          <td><button class="editbtn">enter</button></td>
        </tr>`
      );
    });
    $('.editbtn').click(function(){
        $(this).html($(this).html() == 'enter' ? 'chosen' : 'enter');
        location.href = 'http://localhost:3000/'
    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function chooseDevice() {
  
  $('#choose-device').on('click', function() {
    const name = $('#name').val();

    $.post(MQTT_URL, { name })
    location.reload();
  });
}