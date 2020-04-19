<template>
  <div id="home-page">
    <Header></Header>
    <div class="body">
        <Nav @changeMsg="changeCss"></Nav>
        <router-view :class="[extend?'display':'retrct']"></router-view>
    </div>
    <footer>Copyright&nbsp;&nbsp;2020&nbsp;王代彬. 拥有所有版权</footer>
  </div>
</template>

<script>
import { selectValue } from "@/api/public";
import Header from "@/components/public-components/head";
import Nav from "@/components/public-components/nav";
export default {
  name: "home",
  components: {
    Header,
    Nav
  },
  data() {
    return {
      extend:false
    };
  },
  methods: {
    changeCss(val){
      this.extend=val.extend;
      console.log(val)
    }
  },
};
</script>
<style lang="less" scoped>
@import "homePage";
</style>
