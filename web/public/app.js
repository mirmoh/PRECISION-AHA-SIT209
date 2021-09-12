$('#navbar').load('navbar.html');

  const devices = JSON.parse(localStorage.getItem('devices')) || []; //convert the string into an array of JSON objects

  devices.forEach(function(device) {
    $('#devices tbody').append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`
    );
  });

    //add the device to the list of devices
    $('#add-device').on('click', function() {
        const user = $('#user').val();
        const name = $('#name').val();
        devices.push({ user, name});
        localStorage.setItem('devices', JSON.stringify(devices)); //add or update the localStorage value for devices with a string-version of the devices array
        location.href = '/';
      });