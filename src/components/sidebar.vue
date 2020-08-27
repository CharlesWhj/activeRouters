<template>
  <div class="sidebar">
    <el-menu
      :router="true"
      :unique-opened="true"
      :default-active="activeTab"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu v-for="(item,index) in ActiveRouters" :key="index" :index="item.children[0].path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.name}}</span>
        </template>
        <el-menu-item-group v-for="(ii,ind) in item.children" :key="ind">
          <el-menu-item :index="ii.path">{{ii.meta.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sideBar",
  props: {
    ActiveRouters: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeTab: "",
    };
  },
  methods: {
    // ...mapMutations(["UserRole/ELIMINATE_ROLE"]),
    handleOpen(item) {
      this.$router.push(item);
      this.activeTab = item;
    },
    handleClose(item) {
      this.activeTab = "";
    },
  },
};
</script>
<style lang="less" scoped>
.sidebar {
  transform: all 0.3s ease 0s;
  position: fixed;
  top: 0;
  left: 0;
  width: 251px;
  // width: 150px;
  height: 100%;
  background-color: #545c64;
}
</style>