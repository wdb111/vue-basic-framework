/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
// 在http.js中引入axios
import axios from 'axios'; // 引入axios
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写
import store from '../store/index';
import router from '../router';
import {
  Message
} from 'view-design';



/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message.warning(msg);
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  // localStorage.removeItem('Authorization');
  // this.$router.push('/login');
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 验证码错误
    case 401:
      tip('验证码错误');
      break;
      // 403 token过期
      // 清除token并跳转登录页
    case 402:
      tip('用户名或密码错误');
      break;
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
      // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。  
    const token = localStorage.getItem('token');

    token && (config.headers.token = token); //有token就设置token

    return config;
  },
  error => Promise.error(error))



// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log(response)
  // 请求成功,对响应数据做点什么
  // 将用户token保存到vuex中

  if (response.config.url == "/api/login") {
    
    let userToken = response.data.token || "";
    let userName = response.data.data ? response.data.data[0].name : "";
    let userId = response.data.data ? response.data.data[0]._id : "";
    let getUserRole = response.data.data&&response.data.data[0].system ? 'admin' : 'user'
      localStorage.setItem('userRole', getUserRole)
    store.commit('setToken', userToken);
    store.commit('setUser', userName)
    store.commit('setUserId', userId)
  }
  // 对响应错误做点什么

  if (response.data.status !== 200) {
    errorHandle(response.data.status);
  }
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default instance;
