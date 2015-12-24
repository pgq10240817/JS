/**适用于http://www.shhuo.com/thread-109167-1-1.html**/

var content = '.\n\n感谢楼主\n\n1111.\n\n2222n\nfff.\n\nffff\n\nf2222f';
var yhplTextId = 'fastpostmessage';
var yhplSubmitId = 'fastpostsubmit';
var yhplCount = 200;
var seconds = 20 * 1000;




function yhplReply(){
	$(yhplTextId).value = content+'\n'+yhplCount;
	$(yhplSubmitId).click();
	console.log('step is '+yhplCount);
	yhplCount--;
	if(yhplCount>0){
		setTimeout(yhplReply, seconds);
	}
	
}