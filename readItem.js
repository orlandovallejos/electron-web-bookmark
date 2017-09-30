//Modules:
const { BrowserWindow } = require('electron')

//BrowserWindow:
let bgItemWin;

//Export a function:
module.exports = (itemURL, callback) => {
  //Create the window offscreen:
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 100,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  //Load URL from parameter:
  bgItemWin.loadURL(itemURL);

  //Wait for the complete load:
  bgItemWin.webContents.on('did-finish-load', () => {

    bgItemWin.webContents.capturePage((image) => {
      //Get the image as data URI:
      let screenshot = image.toDataURL();

      //Get the page title:
      let title = bgItemWin.getTitle();

      callback({
        title: title,
        screenshot: screenshot,
        url: itemURL
      });

      bgItemWin.close();
      //For the garbage collector:
      bgItemWin = null;
    })
  })
}