import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/index.vue";
import Login from '../views/Login/index.vue'
import util from "@/common/auth";
import store from '../store/index'
Vue.use(VueRouter);
// 防止路由被重复点击跳转报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export const defaultRouter = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];
const router = new VueRouter({
  routes: defaultRouter,
});

router.beforeEach((to, from, next) => {
  if (util.getCookies("BackARuserToken")) {
    // 当token存在
    if (to.path === "/login") {
      util.removeCookies();
      store.commit("UserRole/ELIMINATE_ROLE");
      next();
    } else {
        // 动态路由
        // 当roles数组为空时就需要发请求拿字段进行判断，来分配权限
        if (!store.state.UserRole.roles.length) {
          store.dispatch("UserRole/getUserRoles").then((res) => {
            let roles = res;
            store.dispatch("UserRole/dynamicRouters", roles).then((res) => {
              // 已经筛选过后的路由
              let allRouter = store.state.UserRole.allRouter;
              console.log(allRouter);
              // 添加动态路由
              router.addRoutes(res);
              // 更新路由
              router.options.routes = allRouter;
              console.log(router);
              next({ ...to, replace: true });
            });
          });
        } else {
          // roles数组里面已经有数据的情况下，说明请求过，分配好了就直接进入
          next();
        }
      next();
    }
  } else {
    // 当token不存在
    if (to.path.indexOf("/login") !== -1) {
      //当跳转login存在
      next();
    } else {
      next({ path: "login" });
    }
  }
});
router.afterEach((to) => {
  window.scrollTo(0, 0);
});
export default router;
