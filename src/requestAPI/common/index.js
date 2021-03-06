import axios from 'axios'
import { getToken } from '@/utils/auth'

var instance = axios.create({
    timeout: 1000 * 5
});

// request interceptor
instance.interceptors.request.use(
    config => {
        // console.log(getToken())
        // do something before request is sent

        config.headers['token'] = getToken()

        return config
    }
)


export const getAxios  =  function (url, params,_this){
    return new Promise((resolve, reject) =>{
        instance.get(url, {
            params: params
        }).then(res => {
            if(res.data.status === 200){
                resolve(res.data);
            }else{
                _this.$message.error(res.data.msg);
                // alert(res.data.msg)
            }
        }).catch(err =>{
            _this.$message.error('错了哦，服务器错误');
            // alert('错了哦，服务器错误')
            // reject("err",err.data)

        })
    });
}

export const postAxios  = function (url,data = {},_this){
    return new Promise((resolve,reject) => {
        instance.post(url,data)
            .then(response => {
                if(response.data.status === 200){
                    resolve(response.data);
                    // resolve(response.data);
                }else{
                    _this.$message.error(response.data.msg);
                    // alert(response.data.msg)
                }

            },err => {
                _this.$message.error('错了哦，服务器错误');
                // reject("err",err.data)
            })
    })
}
