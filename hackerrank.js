const puppeteer = require("puppeteer");
let { email, password } = require('./login');


let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport : null,
    args: ["--start-maximized"],
    //  executablePath: chrome:/version
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
.then(function(){
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

    let loginPage=cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPage; 
})
.then(function(){
    console.log("Page Logined");

    let completePage=waitAndClick('div[data-automation="algorithms"]');// Wait for Page to load fully and then click
    // { delay: 10000 }
    return completePage
})
.then(function(){
    console.log("Algorithm Page Reached");
})
.catch(function(err){
    console.log(err);
});


function waitAndClick(selector){
    let myPromise = new Promise(function (resolve, reject) {
        let waitForbutton=cTab.waitForSelector(selector);
        waitForbutton.then(function (){
            let clickpromise= cTab.click(selector);
            return clickpromise;
        })
        .then(function(){
            console.log("Algo button Clicked");
            resolve();
        })
        .catch(function(err){
            console.log(err);
        });
    });
    return myPromise;
}