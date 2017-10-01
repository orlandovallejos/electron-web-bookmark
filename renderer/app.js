// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

//Modules:
const { ipcRenderer, shell } = require('electron')
const items = require('./items')

//Show modal:
$('.open-add-modal').click(() => {
  $('#add-modal').addClass('is-active');
  $('#item-input').val('http://');
  $('#item-input').focus();

  // shell.beep();
  // shell.openExternal('calc.exe');
  // shell.openExternal('C:\Windows\System32\calc.exe');
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

//Listen for a new event from main process:
ipcRenderer.on('new-item-success', (e, item) => {

  //Persist item:
  items.pages.push(item);
  items.saveItems();

  //Add item to the item list:
  items.addItem(item);

  $('#add-modal').removeClass('is-active');
  $('#item-input').prop('disabled', false).val('');
  $('#add-button').removeClass('is-loading');
  $('.close-add-modal').removeClass('is-disabled');
});

//Simulate add click on pressing enter key:
$('#item-input').keyup((e) => {
  if (e.key === 'Enter') {
    $('#add-button').click();
  }
});

//Add items when app loads:
items.pages.forEach(function (page) {
  items.addItem(page);
});

//Filter items:
$('#search').keyup((e) => {
  var filter = $(e.currentTarget).val();

  $('.read-item')
    .each((i, el) => {
      $(el).text().toLowerCase().includes(filter) ? $(el).show() : $(el).hide();
    });
});

//Add event to select items by arrow keys:
$(document).keyup((e) => {
  switch (e.key) {
    case 'ArrowUp':
      var prevElem = $('.read-item.is-active').prev();
      if (prevElem.hasClass('read-item')) {
        $('.read-item.is-active').removeClass('is-active');
        prevElem.addClass('is-active');
      }
      break;
    case 'ArrowDown':
      var nextElem = $('.read-item.is-active').next();
      if (nextElem.hasClass('read-item')) {
        $('.read-item.is-active').removeClass('is-active');
        nextElem.addClass('is-active');
      }
      break;

    default:
      break;
  }
});