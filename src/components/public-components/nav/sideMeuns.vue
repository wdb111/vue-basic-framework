<template>
  <div>
    <!-- 遍历路由表，生成左侧菜单 -->
    <template v-for="(item,index) in meuns">
      <!-- 一级菜单的情况 -->
      <template v-if="item.children&&item.children.length===1">
        <!--           index跟浏览器地址对应，这样菜单才能显示选中状态  -->
        <el-menu-item :key="index" :index="item.path+'/'+item.children[0].path">
          <template slot="title">
            <!-- 设置icon -->
            <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon" class="public-skin" style="background:rgba(0,0,0,0)"></i>
            <!-- 菜单名称 -->
            {{item.children[0].meta.title}}
          </template>
        </el-menu-item>
      </template>
      <!-- 一级菜单的情况 end-->
      <!-- 多级菜单 -->
      <template v-else>
        <el-submenu :key="index" :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon" class="public-skin" style="background:rgba(0,0,0,0)"></i>
            {{item.meta.title}}
          </template>
          <!-- 遍历子菜单 -->
          <template v-for="(itemChild,indexChild) in meunsChild(item.children)">
            <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
            <template v-if="itemChild.children&&itemChild.children.length>0">
              <side-meuns :key="indexChild" :routes="[itemChild]" class="nest-menu"></side-meuns>
            </template>
            <!-- 2级菜单时-->
            <template v-else>
              <el-menu-item :key="indexChild" :index="item.path+'/'+itemChild.path">
                <i v-if="itemChild.meta.icon" :class="itemChild.meta.icon" class="public-skin" style="background:rgba(0,0,0,0)"></i>
                {{itemChild.meta.title}}
              </el-menu-item>
            </template>
          </template>
          <!-- 遍历子菜单 end-->
        </el-submenu>
      </template>
      <!-- 多级菜单 end-->
    </template>
  </div>
</template>
<script>
export default {
  name: "sideMeuns",
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    meuns() {
      let arr = this.routes.filter(item => {
        if (!item.hidden) {
          return true;
        }
        return false;
      });
      console.log(arr);
      return arr;
    },
    meunsChild() {
      return function(child) {
        let arr = child.filter(item => {
          if (!item.hidden) {
            return true;
          }
          return false;
        });
        return arr;
      };
    }
  }
};
</script>
