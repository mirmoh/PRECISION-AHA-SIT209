$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'http://localhost:5007/api';

//display device
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

//add device  
$('#add-device').on('click', () => {
  const name = $('#name').val();
  const user = $('#user').val();
  const body = {
    name,
    user,
  };

  $.post(`${API_URL}/devices`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});
