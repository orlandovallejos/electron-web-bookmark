// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Modules:
const { ipcRenderer } = require('electron')

//Show modal:
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active')
})

//Hide modal:
$('.close-add-modal').click(() => {
  $('#add-modal').removeClass('is-active')
})

//Handle add button:
$('#add-button').click(() => {
  //Get text from input:
  let newItemURL = $('#item-input').val();

  if (newItemURL) {
    $('#item-input').prop('disabled', true)
    $('#add-button').addClass('is-loading')
    $('.close-add-modal').addClass('is-disabled')


    //Send URL to main process in order to open it via IPC:
    //For this to work we need to listen to the same event on the main process (server).
    ipcRenderer.send('new-item', newItemURL);
  }
})

//Listten for a new event from main process:
ipcRenderer.on('new-item-success', (e, item) => {
  console.log(item);

  $('#add-modal').removeClass('is-active')
  $('#item-input').prop('disabled', true).val('')
  $('#add-button').removeClass('is-loading')
  $('.close-add-modal').removeClass('is-disabled')
})

//Simulate add click on pressing enter key:
$('#item-input').keyup((e) => {
  if (e.key === 'Enter') {
    $('#add-button').click();
  }
})