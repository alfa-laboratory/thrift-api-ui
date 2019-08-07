import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import path from 'path';
import url from 'url';

let win: BrowserWindow | null;

const createWindow = async () => {
    win = new BrowserWindow({ width: 1000, height: 850 });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });

    const menuTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'ThriftAPI UI',
            submenu: [
                {
                    label: 'Preferences',
                    accelerator: 'CmdOrCtrl+,',
                    click() {
                        if (win) {
                            win.webContents.send('showSettings');
                        }
                    }
                },
                {
                    label: 'New tab',
                    accelerator: 'CmdOrCtrl+T',
                    click() {
                        if (win) {
                            win.webContents.send('newTab');
                        }
                    }
                },
                {
                    label: 'Close Tab',
                    accelerator: 'CmdOrCtrl+W',
                    click() {
                        if (win) {
                            win.webContents.send('closeTab');
                        }
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide Thrift API UI',
                    accelerator: 'CmdOrCtrl+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'CmdOrCtrl+Shift+H',
                    role: 'hideOtherApplications'
                },
                {
                    label: 'Show All',
                    role: 'unhideAllApplications'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click() {
                        app.quit();
                    }
                },
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click() {
                        if (win) {
                            win.webContents.reloadIgnoringCache();
                        }
                    }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+Command+I',
                    click() {
                        if (win) {
                            win.webContents.openDevTools();
                        }
                    }
                },
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    type: 'separator'
                }
            ]
        },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
