const puppeteer = require("puppeteer");
let { email, password } = require('./login');


let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
    //  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
});

browserOpenPromise.then(function (browser){
    console.log("Browser Opened");
    let allTabs=browser.pages();
    return allTabs;
})
.then(function(allTabsArr){
    cTab=allTabsArr[0];
    console.log("new Tab");

    let visitToSite= cTab.goto("https://www.hackerrank.com/auth/login");
    return visitToSite;
})
.then(function(data){
    console.log("Login Page opened");

    let emailFilled=cTab.type("#input-1",email);
    return emailFilled;
})
.then(function(){
    console.log("Email Typed");

    let passwordFilled=cTab.type("#input-2",password);
    return passwordFilled;
})
.then(function(){
    console.log("Password Typed");
})
.catch(function(err){
    console.log(err);
})