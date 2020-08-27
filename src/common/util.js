export const getRouters =
  /**
   * @description 根据权限roles筛选路由
   * @param {Array} roles 权限：["sale", "manager", "technician"]
   * @param {Array} routers 路由数组
   */
  function(roles, routers) {
    // if (routers) {
    //  return  routers.reduce(function (pre, item) {
    //     if (item.meta && item.meta.role) {
    //       if (roles.some((i) => item.meta.role.includes(i))) {
    //         pre.push(item);
    //         if (item.children && item.children.length > 0) {
    //         item.children = getRouters(roles, item.children);//递归筛选子路由
    //         }
    //       }
    //     }
    //     return pre;
    //   }, []);
    // }//第一种方法
    if (routers) {
      return routers.filter(function(item) {
        if (item.meta && item.meta.role) {
          if (item.children && item.children.length > 0) {
            item.children = getRouters(roles, item.children); //递归筛选子路由
          }
          return roles.some((i) => item.meta.role.includes(i));
        }
      });
    } //第二种方法
  };
