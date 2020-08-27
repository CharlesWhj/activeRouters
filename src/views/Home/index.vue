<template>
  <div class="home">
    <side-Bar :ActiveRouters='ActiveRouters'/>
    <!-- 顶部 -->
    <div class="home_top">
      <i class="el-icon-menu" @click="btnside"></i>
      <div class="home_right">
        <div class="home_img">
          <img src="@/assets/login-banner.png" alt />
          <span>{{userName}}</span>
        </div>
        <div class="iconexit">
          <i @click="exit" class="el-icon-switch-button"></i>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="home_content">
      <el-card class="box-card">
        <router-view />
      </el-card>
    </div>
  </div>
</template>

<script>
import util from "@/common/auth";
import sideBar from '../../components/sidebar'
import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    sideBar
  },
  data() {
    return {
      userName: util.getCookies("BackARuserName"),
    };
  },
  computed: {
    ...mapState({
      ActiveRouters: state => state.UserRole.dynamicRouterStorage,
    }),
  },
  methods: {
    btnside() {
    },
    exit() {
      this.$confirm("此操作将退出控制台, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          util.removeCookies();
          this.$router.push("login");
          this.$message({
            type: "success",
            message: "退出成功！！！",
          });
          this.ELIMINATE_ROLE(); //清除roles
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出！！！",
          });
        });
    },
  }
};
</script>

<style lang="less" scoped>
.close {
  .sidebar {
    width: 90px !important;
  }
  .home_top {
    left: 90px !important;
  }
  .home_content {
    left: 90px !important;
  }
}
.home {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
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
  .home_top {
    transform: all 0.3s ease 0s;
    position: fixed;
    top: 0;
    left: 250px;
    background-color: #ffffff;
    right: 0;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
    height: 75px;
    line-height: 75px;
    display: float;
    .el-icon-menu {
      float: left;
      padding: 25px 32px;
      font-size: 25px;
      cursor: pointer;
    }
    .home_right {
      float: right;
      display: float;
      /deep/.el-icon-switch-button {
        padding: 0px 32px;
        font-size: 25px;
        cursor: pointer;
      }
      .home_img {
        float: left;
        padding: 0 32px;
        line-height: 75px;
        img {
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
          border-radius: 50px;
          width: 40px;
          height: 40px;
        }
      }
      .iconexit {
        float: right;
        border-left: 1px solid #ededed;
      }
    }
  }
  .home_content {
    transform: all 0.3s ease 0s;
    position: fixed;
    top: 75px;
    left: 250px;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    .box-card {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
