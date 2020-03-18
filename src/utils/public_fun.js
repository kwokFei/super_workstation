import {postAxios} from '@/requestAPI/common/index'
import {goto1110BaseUrl} from './public_const'
export const seeShare = function (theThis) {
    window.localStorage.setItem('allCheckedModuleList',JSON.stringify(theThis.$store.state.allCheckedModuleList));
    window.localStorage.setItem('indexSrc',JSON.stringify(theThis.$store.state.indexSrc));
    let routeUrl = theThis.$router.resolve({
        path: "/view_center",
    });
    window.open(routeUrl.href, '_blank');
}

export const onlyOneArr = function (arr1,arr2) {
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

export const goTo1110 = function () {
    console.log(goto1110BaseUrl);
    postAxios( goto1110BaseUrl +"/login",
        {
            account:"111",
            password:"123456"
        },this)
        .then(()=>{
            return postAxios(goto1110BaseUrl +"/app/list")
        })
        .then((data)=>{
            let appId = 0;
            if(data.data.list.length > 0 ){
                appId = data.data.list[0].id
            }
            window.open(
                "http://113.204.9.70:20080/#/design/design?id=" +  appId,
                "_blank"
            )

        })
}