const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"]
});

browserOpenPromise.then(function print(){
    console.log("Browser Opened");
});