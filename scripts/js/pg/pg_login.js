//Pre. 
	var yhplDate = new Date();
	var yhplUserRandom = yhplDate.getDate()+''+yhplDate.getHours()+''+yhplDate.getMinutes()+''+yhplDate.getSeconds();
	var yhplUserName = "yhpl1601"+yhplUserRandom;
	var yhplUserPwd = "pg"+yhplUserRandom;
	var yhplUserMail = yhplUserName  + "@sina.com";
function yhinFunLogin(){
	// Pre. 1. CODE ID
	var yhplIDInputcodeRaw = document.getElementsByName("secanswer")[0].id;
	var yhplIDInputcodeRawReg = new RegExp("(_)([^_]+$)");   
	var yhplIDInputcodeAfterFix = yhplIDInputcodeRaw.match(yhplIDInputcodeRawReg)[2];

	// DEL 1.ID
	var yhplIDInputName = "pgname221a";
	var yhplIDInputPwd = "pgpass1121a";
	var yhplIDInputPwd2 = "pgpass1221a";
	var yhplIDInputEmail = "pgemail4521a";
	var yhplCLZCb = 'pc';
	var yhplIDInputCode = "secqaaverify_"+yhplIDInputcodeAfterFix;
	var yhplIDSpanCode = "secqaa_"+yhplIDInputcodeAfterFix;
	var yhplIDSubmit = 'registerformsubmit';

	// A. NORMAL 
	$(yhplIDInputName).value = yhplUserName ;
	$(yhplIDInputPwd).value = yhplUserPwd;
	$(yhplIDInputPwd2).value = yhplUserPwd;
	$(yhplIDInputEmail).value = yhplUserMail;
	document.getElementsByClassName(yhplCLZCb)[0].checked =true

	// B. CODE

	var yhplCodeStr = $(yhplIDSpanCode).innerHTML;
	var yhplCodeReg = new RegExp("([^>]+)(<[^<]+$)");   
	var yhplCodeRight = yhplCodeStr.match(yhplCodeReg)[1];
	$(yhplIDInputCode).value = yhplCodeRight;

	// C. SUBMIT
	$(yhplIDSubmit).click();
}

function yhplFunUploadUser(){
	var yhplPOSTContent = "name="+yhplUserName+"&pwd="+yhplUserPwd;
	var yhplPOSTUrl = 'http://182.254.233.156:9000/userpg.insert';
	$.ajax({
	  type: "POST",
	  url: yhplPOSTUrl,
	  data: yhplPOSTContent,
	  success: yhplFunSuccess,
	  dataType: 'jsonp'
	}); 

}








