/**适用于http://www.shhuo.com/thread-109167-1-1.html**/

var content = '.\n\n感谢楼主\n\n1111.\n\n2222n\nfff.\n\nffff\n\nf2222f';
var yhplTextId = 'fastpostmessage';
var yhplSubmitId = 'fastpostsubmit';
var yhplCount = 200;//最大回复数量
var seconds = 1 * 1000;
var yhplUrlPattern = 'http://www.shhuo.com/thread-$1-1-1.html';
var yhplUrlPatternBegin = 132100;
var yhplUrlPatternEnd = 132110;
var yhplUrlPatternStep = yhplUrlPatternBegin;
var yhplUrlPatternUrlInteruptTime = 3 * 1000;//http请求中断时间
var yhplUrlPatternReplyCount = 1;//每个贴的回复数量
var yhplUrlPatternReplyStep = 0;


function yhplReply(){
	var offsetTime = 0;
	$(yhplTextId).value = content+'\n'+yhplCount;
	$(yhplSubmitId).click();
	console.log('step is '+yhplCount);
	if(yhplUrlPatternReplyStep >= yhplUrlPatternReplyCount){
		offsetTime = 
		yhplSwitchUrl();
	}

	if(yhplCount>0 && yhplUrlPatternStep <= yhplUrlPatternEnd){
		setTimeout(yhplReply, seconds + offsetTime);
	}
	yhplUrlPatternStep++;
	yhplCount--;
	yhplUrlPatternReplyStep++;
	
}
function yhplSwitchUrl(){
	yhplUrlPatternReplyStep = 0;
	window.location.href = yhplUrlPattern.replace('$1',yhplUrlPatternStep);
}

