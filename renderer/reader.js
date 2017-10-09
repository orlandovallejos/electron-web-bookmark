//Modules
const queryString = require('query-string');

const params = queryString.parse(location.search);
let url = decodeURIComponent(params.url);
let itemIndex = params.itemIndex;

//Executes only once:
$('webview').one('dom-ready', (e) => {
  e.currentTarget.loadURL(url);
});

$('webview').one('did-finish-load', () => {
  $('#loader').fadeOut(100);
  $('#mark-read').removeClass('is-hidden');
});

$('webview').on('did-fail-load', () => {
  $('#mark-read').addClass('is-hidden');

  $('#loader .busy').addClass('is-hidden');
  $('#loader').fadeIn(100);
  $('#loader .failed').removeClass('is-hidden');
});

//Handle delete click button:
$('#mark-read').click(() => {
  //Parent window:
  window.opener.eval(`deleteItem(${itemIndex})`);
  window.close();
});