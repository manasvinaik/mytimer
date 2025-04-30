const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false,
        movable: true,
        transparent:true,
        webPreferences: {
            nodeIntegration: false, 
            contextIsolation: true, 
            preload: __dirname + "/preload.js"
        }
    });

    mainWindow.loadFile("index.html");

    ipcMain.on("minimize", () => mainWindow.minimize());
    ipcMain.on("close", () => mainWindow.close());
});
