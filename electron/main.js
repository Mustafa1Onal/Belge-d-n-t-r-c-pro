import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "Belge Dönüştürücü Pro",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simple compatibility with this setup
    },
    autoHideMenuBar: true, // Hide the default menu bar for a cleaner app look
  });

  // Check if we are in development mode
  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools(); // Uncomment to debug
  } else {
    // In production, load the index.html from the dist folder
    // Go up one level from 'electron' folder to root, then into 'dist'
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});