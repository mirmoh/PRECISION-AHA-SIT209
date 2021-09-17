$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'http://localhost:5006/api';

$.get(`${API_URL}/devices`)
  .then(response => {
    response.forEach(device => {
      $('#devices tbody').append(`
        <tr>
          <td>${device.user}</td>
          <td>${device.name}</td>
        </tr>`
      );
    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

// add the device to the list of devices  
$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const sensorData = [];

  const body = {
    name,
    user,
    sensorData
  };

  $.post(`${API_URL}/devices`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$('#add-user').on('click', () => {
  const email    = $('#email').val();
  const password = $('#pass').val();
  const phone    = $('#phone').val();
  
  const body = {
    email,
    phone,
    password
  };

  $.post(`${API_URL}/users`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});

$('#login').on('click', () => {
  const username  = $('#username').val();
  const password  = $('#pass').val();
  
  const body = {
    username,
    password
  };

  $.post(`${API_URL}/users`, body)
  .then(response => {
    location.href = '/register';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});