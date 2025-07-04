const path = require('path');
const os = require('os');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const slash = require('slash');

const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron');

// Set environment variable for development
process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV === 'development';
const isWin = process.platform === 'win32';

let mainWindow;
let aboutWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow(
        {
            title: 'Image Shrink',
            width: isDev ? 800 : 500,
            height: 600,
            icon: './assets/icons/Icon_256x256.png',
            resizable: isDev ? true: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        }
    )

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile('./app/index.html');
}

const createAboutWindow = () => {
    aboutWindow = new BrowserWindow(
        {
            title: 'About Image Shrink',
            width: 300,
            height: 300,
            icon: './assets/icons/Icon_256x256.png',
            resizable: false,
        }
    )

    //mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    aboutWindow.loadFile('./app/about.html');
}


app.on('ready', () => {
    createMainWindow();

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu);

    globalShortcut.register("CmdOrCtrl+R", () => {
        mainWindow.reload();
    });

    globalShortcut.register("CmdOrCtrl+Shift+I", () => {
        mainWindow.toggleDevTools();
    });
    
})

const menu = [
    {
        role: "fileMenu",
    },
    ...(isWin ? [{
        label: "Help",
        submenu: [
            {
               label: "About",
               click: createAboutWindow 
            }
        ]
    }]: []),
    ...(isDev ? [
        {
            label: "Developer",
            submenu: [
                {
                    role: "reload",
                },
                {
                    role: "forereload",
                },
                {
                    type: "separator",
                },
                {
                    role: "toggledevtools",
                }
            ]
        }
    ] : [])
]

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

ipcMain.on("image:shrink", (e, options) => {
    console.log("Shrink image with options:", options);
})