const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// Set environment variable for development
process.env.NODE_ENV = 'development';
const isDev = process.env.NODE_ENV === 'development';
const isWin = process.platform === 'win32';

let mainWindow;

const createMainWindow = () => {
    mainWindow = new BrowserWindow(
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

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu);

    globalShortcut.register("CmdOrCtrl+R", () => {
        mainWindow.reload();
    });
    
})

const menu = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                //accelerator: isWin ? 'Ctrl+Q' : 'Cmd+Q',
                accelerator: 'CmdOrCtrl+Q', // Works on both Windows and macOS
                click: () => app.quit(),
            }
        ]
    }
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