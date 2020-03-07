const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow, mainWindow1;

function createWindow(){
    mainWindow = new BrowserWindow({width:1000, height:750, movable: true, resizable: false, icon: './ico/add1.png'});
    mainWindow.loadURL(`file://${__dirname}./views/savePatientPage.html`);
    mainWindow.on(`closed`, () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.plateform !== 'darwin'){
        app.quit();
    }
} );

app.on('activate', () => {
    if (mainWindow === null){
        createWindow();
    }
});


