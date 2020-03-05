import router from './router'
import { getToken } from '@/utils/auth' // get token from cookie

router.beforeEach(async(to, from, next) => {

    const hasToken = getToken();

    if(hasToken){
        next();
    }else {
        //没有登录，去跳转登录页
        if(to.path === '/login'){
            next();
        }else {
            next({
                path:'/login'
            });
        }
    }

})

