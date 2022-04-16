const puppeteer = require("puppeteer");
let { email, password } = require('./login');
let {answer} = require('./codes')

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

    let completePage=waitAndClick('div[data-automation="algorithms"]');   // Wait for Page to load fully and then click
    // { delay: 10000 }
    return completePage;
})
.then(function(){
    console.log("Algorithm Page Reached");

    let allQuestions=cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
    return allQuestions;
})
.then(function(){
    function getAllQuesLinks() {
        let allElemArr = document.querySelectorAll(
          'a[data-analytics="ChallengeListChallengeName"]'
        );
        let linksArr = [];
        for (let i = 0; i < allElemArr.length; i++) {
          linksArr.push(allElemArr[i].getAttribute("href"));
        }
        return linksArr;
      }
      let linksArrPromise = cTab.evaluate(getAllQuesLinks);
      return linksArrPromise;
})
.then(function (linksArr) {
    console.log("links to all ques received");
    //question solve krna h
    //link to the question to besolved, idx of the linksArr
    let questionWillBeSolvedPromise = questionSolver(linksArr[0], 0);
    for (let i = 1; i < linksArr.length; i++){
    questionWillBeSolvedPromise = questionWillBeSolvedPromise.then(function () {
    return questionSolver(linksArr[i], i);
    })
    // a = 10;
    // a = a + 1;
    }
    return questionWillBeSolvedPromise;
})
.then(function () {
    console.log("question is solved");
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
            reject(err);
        });
    });
    return myPromise;
}

function questionSolver(url, idx) {
    return new Promise(function (resolve, reject) {
      let fullLink = `https://www.hackerrank.com${url}`;
      let goToQuesPagePromise = cTab.goto(fullLink);
      goToQuesPagePromise
        .then(function () {
          console.log("question opened");
          //tick the custom input box mark
          let waitForCheckBoxAndClickPromise = waitAndClick(".checkbox-input");
          return waitForCheckBoxAndClickPromise;
        })
        .then(function () {
          //select the box where code will be typed
          let waitForTextBoxPromise = cTab.waitForSelector(".custominput");
          return waitForTextBoxPromise;
        })
        .then(function () {
          let codeWillBeTypedPromise = cTab.type(".custominput", answer[idx], {
            delay: 100,
          });
          return codeWillBeTypedPromise;
        })
        .then(function () {
          //control key is pressed promise
          let controlPressedPromise = cTab.keyboard.down("Control");
          return controlPressedPromise;
        })
        .then(function () {
          let aKeyPressedPromise = cTab.keyboard.press("a");
          return aKeyPressedPromise;
        })
        .then(function () {
          let xKeyPressedPromise = cTab.keyboard.press("x");
          return xKeyPressedPromise;
        })
        .then(function () {
          let ctrlIsReleasedPromise = cTab.keyboard.up("Control");
          return ctrlIsReleasedPromise;
        })
        .then(function () {
          //select the editor promise
          let cursorOnEditorPromise = cTab.click(
            ".monaco-editor.no-user-select.vs"
          );
          return cursorOnEditorPromise;
        })
        .then(function () {
          //control key is pressed promise
          let controlPressedPromise = cTab.keyboard.down("Control");
          return controlPressedPromise;
        })
        .then(function () {
          let aKeyPressedPromise = cTab.keyboard.press("A");
          return aKeyPressedPromise;
        })
        .then(function () {
          let vKeyPressedPromise = cTab.keyboard.press("V");
          return vKeyPressedPromise;
        })
        .then(function () {
          let controlDownPromise = cTab.keyboard.up("Control");
          return controlDownPromise;
        })
        .then(function () {
          let submitButtonClickedPromise = cTab.click(".hr-monaco-submit");
          return submitButtonClickedPromise;
        })
        .then(function () {
          console.log("code submitted successfully");
          resolve();
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }