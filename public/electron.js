import  {app, BrowserWindow} from 'electron'
import path from "path"
import isDev from "electron-is-dev"
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow(){
    const win = new BrowserWindow({
        width:1200,
        height:800,
        icon: path.join(__dirname, "./src/assets/images/icone.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "./preloader.js"),
            contextIsolation:false
        }
    })

    win.loadURL( isDev ?'http://localhost:3000'
                       : `file://${path.join(__dirname,"../build/index.html")}`)

                       if(isDev){
                        win.webContents.openDevTools();
                       }

}

app.on('ready',createWindow);

app.on("window-all-closed",()=>{
    if(process.platform !== "darwin"){
        app.quit()
    }
})

app.on("activate",()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
})