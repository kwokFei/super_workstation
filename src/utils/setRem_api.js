
export var setFontRem = function(){
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDome = document.getElementsByTagName('html')[0];
    // if(htmlWidth < 1200){
    //     htmlWidth =1200;
    // }
    // console.log(htmlWidth);
    htmlDome.style.fontSize = htmlWidth / 19.20 + 'px';
    return htmlWidth / 19.20
}




window.onload = function () {
    setFontRem()
}

window.onresize = function () {
    setFontRem()
}