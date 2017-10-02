//Modules
const queryString = require('query-string');

const params = queryString.parse(location.search);
let url = decodeURIComponent(params.url);

//Executes only once:
$('webview').one('dom-ready', (e) => {
  console.log(params);
  e.currentTarget.loadURL(url);
});