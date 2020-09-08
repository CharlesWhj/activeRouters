// 动态路由
// 角色：sale technician manager
import Home from '@/views/Home/index.vue'
import InfoList from "../views/InfoList/InfoList.vue"
export const dynamicRouter = function () {
  const dynamicRouter = [
    // 信息管理
    {
      path: "/infoAdmin",
      name: "infoAdmin",
      component: Home,
      redirect: "/",
      meta: {
        role: ["sale"],
        system: "infoSystem",
        name: "信息管理",
        icon: "el-icon-info",
      },
      children: [
        {
          path: "/InfoList",
          name: "InfoList",
          component: InfoList,
          meta: {
            role: ["sale"],
            name: "信息列表",
          },
        },
        {
          path: "/classification",
          name: "classification",
          component: () => import("../views/Classification/classification.vue"),
          meta: {
            role: ["unshowed"],
            name: "信息分类",
          },
        },
        {
          path: "/details",
          name: "details",
          component: () => import("../views/Details/details.vue"),
          meta: {
            role: ["sale"],
            name: "信息详情",
          },
        },
      ],
    },
    // 用户管理
    {
      path: "/userAdmin",
      name: "userAdmin",
      component: Home,
      redirect: "/",
      meta: {
        role: ["sale"],
        system: "userSystem",
        name: "用户管理",
        icon: "el-icon-user-solid",
      },
      children: [
        {
          path: "/UserList",
          name: "UserList",
          component: () => import("../views/UserList/userList.vue"),
          meta: {
            role: ["sale"],
            name: "用户列表",
          },
        },
        {
          path: "/UserInfo",
          name: "UserInfo",
          component: () => import("@/views/UserInfo/UserInfo.vue"),
          meta: {
            role: ["unshowed"],
            name: "用户信息",
          },
        },
      ],
    },
  ];
  return dynamicRouter
}