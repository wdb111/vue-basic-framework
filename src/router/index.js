import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/homePage';
import First from '@/components/first-page';


Vue.use(Router)

const router= new Router({
  routes: [
    // { path: '/', 
    //   // 方法接收 目标路由 作为参数
    //   // return 重定向的 字符串路径/路径对象
    //   redirect: to =>{
    //             if(store.state.user.roles && store.state.user.roles.includes('admin'))return '/a';
    //             if(store.state.user.roles && store.state.user.roles.includes('manager'))return '/b';
    //             if(store.state.user.roles && store.state.user.roles.includes('check'))return '/c';
    //             return '/draft'
    //         },
    // }}
    {
      path: '/',
      redirect: '/login'//重定向
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      children:[
        {
          path:'home',
          name:'first',
          component:First
        }
      ]
    },
    {
      path:"*",
      component:()=>import("@/components/not-found-page/not-found")
    }
  ]
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
 
export default router;
