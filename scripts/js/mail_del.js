/**适用于coremail**/
/*
*用法：
* 1 > delPage();
*
*
*
*/

var target = document.getElementsByTagName("iframe")[2].contentWindow.document;
target.getElementsByName("selection_checkbox")[0].click();
target.getElementsByName("delete")[1].click();

function del() {
    var target = document.getElementsByTagName("iframe")[2].contentWindow.document;
    target.getElementsByName("selection_checkbox")[0].click();
    target.getElementsByName("delete")[1].click();
}

var step = 0;

function delPage() {
    if (step < 10) {
        setTimeout(delPage, 1000);
        del();
        step++;
        console.log('1111:' + step);
    } else {
        step = 0;
    }

}