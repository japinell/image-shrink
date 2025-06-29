const { app, BrowserWindow, Menu } = require('electron');

// Set environment variable for development
process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV === 'development';
const isWin = process.platform === 'win32';

const createMainWindow = () => {
    const mainWindow = new BrowserWindow(
        {
            title: 'Image Shrink',
            width: 500,
            height: 600,
            icon: './assets/icons/Icon_256x256.png',
            resizable: isDev ? true: false,
        }
    )

    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile('./app/index.html');

}

app.on('ready', () => {
    createMainWindow();
})

app.on('window-all-closed', () => {
    if (isWin) {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
})