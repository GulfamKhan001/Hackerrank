const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});

browserOpenPromise.then(function print(){
    console.log("Browser Opened");
});