// ==UserScript==
// @name         bbs.pinggu.org
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://tampermonkey.net/index.php?version=3.12.58&ext=dhdg&updated=true
// @grant unsafeWindow
// @run-at document-end
// ==/UserScript==
/* jshint -W097 */
'use strict';


var content = '.\n\n感谢楼主提供了贵宝地灌水。哈哈哈哈\n\n\n\n2n\nfff.\n\n\n\n';
var yhplTextId = 'fastpostmessage';
var yhplSubmitId = 'fastpostsubmit';
var yhplCount = 200;
var seconds = 30 * 1000;
var secondsCount = 30;
var intervalArg ;



function yhplReply(){
    if(secondsCount==0){
	$(yhplTextId).value = content+'\n'+yhplCount;
	$(yhplSubmitId).click();
     clearInterval(intervalArg);
    }
    if(secondsCount<0){
        clearInterval(intervalArg);
    }
    secondsCount--;
    console.log('secondsCount  '+secondsCount);
}
console.log("begin ---- ");
clearInterval(intervalArg);
intervalArg = setInterval (yhplReply, 1000);



