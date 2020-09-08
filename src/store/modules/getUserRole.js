import { defaultRouter } from "@/router/index";
import {dynamicRouter} from '@/router/activeRouters'
import {getRouters} from '@/common/util'
import util from '@/common/auth'
const state = {
  roles: [],
  // 动态路由的存储
  dynamicRouterStorage: [],
  // 默认所有路由 后期和动态路由进行拼接
  allRouter: defaultRouter,
};
const getters = {
  // roles: (state) => state.roles,
  // dynamicRouterStorage: (state) => state.dynamicRouterStorage,
  // allRouter: (state) => state.allRouter,
};
const mutations = {
  SET_ROLE(state, data) {
    state.roles = data;
  },
  // 修改路由，拼接路由
  SET_ROUTER(state, router) {
    state.dynamicRouterStorage = router;
    state.allRouter = defaultRouter.concat(router);
  },
  // 退出的时候清空roles
  ELIMINATE_ROLE(state) {
    state.roles = [];
  },
};
const actions = {
  // 获取用户的角色
  getUserRoles({ commit }) {
    return new Promise((resolve, reject) => {
     let role = util.getCookies("BackARuserName")=='13570988783'? ["admin"] : ["sale"]
      // let index = parseInt(2*Math.random())
      // let roleArray = [ "admin","sale"]//["sale", "manager", "technician", "admin"];
      // let role = roleArray.slice(index)
      commit("SET_ROLE", role);
      resolve(role);
    });
  },
  // 创建动态路由
  dynamicRouters({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (data) {
        let roles = data; // ["infoSystem","userSystem"]
        // console.log(roles);
        let dynamicRouterStorage = [];
        // 超级用户
        if (roles.includes("admin")) {
          dynamicRouterStorage = dynamicRouter();
        } else {
          //普通用户
          dynamicRouterStorage = getRouters(roles, dynamicRouter())
        }
        console.log(dynamicRouterStorage);
        commit("SET_ROUTER", dynamicRouterStorage);
        resolve(dynamicRouterStorage);
      }
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
