//Modules
const queryString = require('query-string');

const params = queryString.parse(location.search);
let url = decodeURIComponent(params.url);

//Executes only once:
$('webview').one('dom-ready', (e) => {
  e.currentTarget.loadURL(url);
});

$('webview').one('did-finish-load', () => {
  $('#loader').fadeOut(100);
});

$('webview').on('did-fail-load', () => {
  $('#loader .busy').addClass('is-hidden');
  $('#loader').fadeIn(100);
  $('#loader .failed').removeClass('is-hidden');
});