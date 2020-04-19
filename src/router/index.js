import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/homePage';
import First from '@/components/first-page';
import store from "../store"


Vue.use(Router)

// 固定的路由表
 const fixedRouter = [{
    path: '/',
    redirect: '/login', //重定向
    hidden:true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden:true
  },
  {
    path: '',
    component: home, //整体页面的布局(包含左侧菜单跟主内容区域)
    // meta: {
    //   title: "首页111",
    //   icon: "el-icon-info",
    //   roles: ['admin', 'user']
    // },
    children: [{
      path: 'home',
      name: 'first',
      component: First,
      meta: {
        title: '首页', //菜单名称
        roles: ['user', 'admin'], //当前菜单哪些角色可以看到
        icon: 'el-icon-info' //菜单左侧的icon图标
      }
    }]
  },
]
// 需要权限判断展示的路由
 const permissionRouter = [{
  path: "/example",
  component: home,
  name: "Example",
  meta: {
    title: "案例",
    icon: "el-icon-success",
    roles: ['admin', 'user']
  },
  children: [
    {
      path: "/example/table",
      name: "Table",
      component: ()=>import("@/views/example/table"),
      meta: {
        title: "table案例",
        icon: "el-icon-goods",
        roles: ['admin','user']
      },
      // 三级菜单写法，对应demotable案例下边的两个菜单
      children: [{
          path: "table1",
          name: "Table1",
          component: ()=>import("@/views/example/table/tableFirst"),
          meta: {
            title: "table1",
            icon: "el-icon-mobile-phone",
            roles: ['admin','user']

          }
        },
        {
          path: "table2",
          name: "Table2",
          component: ()=>import("@/views/example/table/tableSecond"),
          meta: {
            title: "table2",
            icon: "el-icon-service",
            roles: ['admin']
          }
        }
      ]
    },
    {
      path: "tree",
      name: "Tree",
      component: ()=>import("@/views/example/tree"),
      meta: {
        title: "树形菜单",
        icon: "el-icon-upload",
        roles: ['admin','user']
      }
    }
    
  ]
},
{
  path: "*",
  component: () => import("@/components/not-found-page/not-found"),
  hidden:true,
  roles: ['admin','user']
}]

const router = new Router({
  routes: fixedRouter
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
var addRouFlag = false
router.beforeEach((to, from, next) => {
  
  if (to.path === '/login') {
    next();
  } else {
    //是否登录
    let token = localStorage.getItem('Authorization');
    // 取到用户的角色
  let GetRole = localStorage.getItem("userRole")
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
      // 1.如果路由表 没根据角色进行筛选,就筛选一次
    if (!addRouFlag) {
      addRouFlag = true
      // 2.根据用户的角色、和需要动态展示的路由，生成符合用户角色的路由
      var getRoutes = baseRoleGetRouters(permissionRouter, GetRole.split(","))
      // 3.利用global属性，让渲染菜单的组件sideMeuns.vue重新生成左侧菜单
      // global.antRouter = fixedRouter.concat(getRoutes)
      store.commit("setAntRouter",fixedRouter.concat(getRoutes))
      // 4.将生成好的路由addRoutes
      router.addRoutes(fixedRouter.concat(getRoutes))
      // 5.push之后，会重新进入到beforeEach的钩子里,直接进入第一个if判断
      router.push({ path: to.path })
    }
    }
  }
});
function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
// 根据用户的角色取到该用户对应的路由
function baseRoleGetRouters(allRoutes, roles) {
  // allRoutes是动态路由表
  // roles是取到的用户角色，数组
  let rightRoutes = allRoutes.filter((route, index) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = baseRoleGetRouters(route.children, roles)
      }
      return true
    }
    return false
  })
  return rightRoutes
}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;
