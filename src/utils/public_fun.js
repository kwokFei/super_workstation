export var seeShare = function (theThis) {
    window.localStorage.setItem('allCheckedModuleList',JSON.stringify(theThis.$store.state.allCheckedModuleList));
    window.localStorage.setItem('indexSrc',JSON.stringify(theThis.$store.state.indexSrc));
    let routeUrl = theThis.$router.resolve({
        path: "/view_center",
    });
    window.open(routeUrl.href, '_blank');
}

export var onlyOneArr = function (arr1,arr2) {
    let arr = [];
    for(let i = 0; i < arr1.length; i++){
        let flag = false
        for(let j = 0 ; j < arr2.length;j++ ){
            if(arr1[i].code === arr2[j].code){
                flag = true;
            }
        }
        if(!flag) arr.push(arr1[i]);
    }
    arr = arr2.concat(arr)
    return arr;
}