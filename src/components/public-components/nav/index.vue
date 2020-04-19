<template>
  <div class="nav">
    <div class="icon-box" @click="changeCss">
      <i v-if="isCollapse" class="el-icon-s-unfold icon"></i>
      <i v-else class="el-icon-s-fold icon"></i>
    </div>
    <el-menu
      router
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :background-color="navBackground"
      text-color="#fff"
    >
     <!-- 菜单组件 -->
          <side-Meuns :routes="getRoutes"></side-Meuns>
    </el-menu>
  </div>
</template>
<script>
// 左侧菜单组件
import sideMeuns from './sideMeuns'
export default {
  components: {
    sideMeuns
  },
  data() {
    return {
      isCollapse: true,
      getRoutes: this.$store.state.antRouter
    };
  },
  computed: {
    navBackground() {
      let str = "";
      let className = this.$store.state.baseColor;
      let obj = [
        {
          name: "themea",
          color: "#EEA2AD"
        },
        {
          name: "themeb",
          color: "#409EFF"
        },
        {
          name: "themec",
          color: "#333"
        }
      ];
      obj.forEach(item => {
        if (item.name === className) {
          str = item.color;
        }
      });
      return str;
    }
  },
  methods: {
    changeCss() {
      this.isCollapse = !this.isCollapse;
      this.$emit("changeMsg", { extend: !this.isCollapse });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-menu--collapse {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<style lang="less" scoped>
@import "nav";
</style>