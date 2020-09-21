const { app, BrowserWindow } = require("electron");
let win;

function createWindow() {
    // Stwórz okno przeglądarki.
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        useContentSize: true,
        webPreferences: {
            // TODO: Remove developer tools in final version
            // devTools: false,
            nodeIntegration: true,
        },
        icon: "resources/app/favicon.png",
    });

    // Load index.html
    win.loadFile("index.html");

    win.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    win.setAutoHideMenuBar(true);
    // TODO: Remove menu bar in final version
    // win.removeMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Close app when all windows are closed
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
