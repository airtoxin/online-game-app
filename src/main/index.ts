import {app, BrowserWindow, ipcMain, Event} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} from 'electron-devtools-installer';
import {Messages} from '../shared/message';
import Server from './Server';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevelopment = process.env.NODE_ENV !== 'production';

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  });

  // and load the index.html of the app.
  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;
  mainWindow.maximize();
  mainWindow.loadURL(url);

  // Open the DevTools.
  if (isDevelopment) {
    await Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
      installExtension(REDUX_DEVTOOLS),
    ]);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(Messages.BOOT_UP_SERVER, async (event: Event, host: string, port: number) => {
  const server = new Server();
  await server.bootUp(host, port);

  event.sender.send(Messages.BOOT_UP_SERVER_SUCCESS);
});
