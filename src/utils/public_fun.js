import {postAxios} from '@/requestAPI/common/index'
import {goto1110BaseUrl} from './public_const'
import {setToken} from './auth'

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

export const goTo1110 = (_this)=> {
    // console.log(goto1110BaseUrl);
    postAxios( goto1110BaseUrl +"/login",
        {
            account:"111",
            password:"123456"
        },_this)
        .then((data)=>{
            setToken(data.data.token)
            return postAxios(goto1110BaseUrl +"/app/list",{},_this)
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


export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}