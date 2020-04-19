<template>
  <div class="head">
    <header class="public-skin">
      <div class="logo">
        <img src="../../../assets/img/logo.jpg" alt />
      </div>
      <div class="header-right">
        <!-- <el-select v-model="languageValue" placeholder="请选择" @change="changeLanguage">
          <el-option
            label="English"
            value="en"
          ></el-option>
          <el-option
            
            label="中文"
            value="zh"
          ></el-option>
        </el-select> -->
        <Dropdown  @on-click="changeLanguage">
          <Button class="public-skin">
            {{$t("language")}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="zh">
               中文
            </DropdownItem>
            <DropdownItem name="en">
               English
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown style="margin:0 20px" @on-click="changeTheme">
          <Button class="public-skin">
            {{$t("theme")}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="themea">
              <i class="color-block1"></i> {{$t("dreamPowder")}}
            </DropdownItem>
            <DropdownItem name="themeb">
              <i class="color-block2"></i> {{$t("skyBlue")}}
            </DropdownItem>
            <DropdownItem name="themec">
              <i class="color-block3"></i> {{$t("hazeAsh")}}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>{{$t('Welcome')}}:{{loginUser}}</div>
        <Dropdown class="setting-box" @on-click="DropdownMenuClick">
          <a href="javascript:void(0)" style="color:#fff;margin-left:10px">
            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="001">查看</DropdownItem>
            <DropdownItem name="002">设置</DropdownItem>
            <DropdownItem name="003">更多</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Icon class="swith-icon" type="md-power" title="退出登录" @click="logout" />
      </div>
    </header>
    <Modal v-model="modal1" :title="modalTitle" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formItem" :label-width="80" style="max-height:350px;overflow-y:auto;">
        <FormItem label="姓名">
          <Input :disabled="isShow" v-model="formItem.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="邮件">
          <Input :disabled="isShow" v-model="formItem.email" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { setup } from "@/language";
import { mapMutations } from "vuex";
import { addValue, selectValue, deleteValue, updateValue } from "@/api/public";
export default {
  name: "home",
  data() {
    return {
      languageValue:"en",
      baseColor: this.$store.state.baseColor,
      isShow: false,
      modalTitle: "",
      modal1: false,
      formItem: {
        name: "",
        email: ""
      },
      userInfo: {},
      loginUser: localStorage.getItem("USER") || "",
      loginUserId: localStorage.getItem("USERID") || ""
    };
  },
  methods: {
    ...mapMutations(["setBaseColor", "delUser", "delUserId", "delToken"]),
    changeTheme(val) {
      document.body.className = val;
      this.setBaseColor(val);
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      setup(lang);
      // location.reload(); // 为了重新实例化vue-router对象，避免一些bug
    },
    DropdownMenuClick(val) {
      
      if (val == "001") {
        this.modalTitle = "查看个人信息";
        this.formItem = this.userInfo;
        this.isShow = true;
        this.modal1 = true;
      } else if (val == "002") {
        this.modalTitle = "设置个人信息";
        this.formItem = this.userInfo;
        this.isShow = false;
        this.modal1 = true;
      }
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    logout() {
      //退出系统
      // this.$store.commit("delToken");
      this.delUser();
      this.delUserId();
      this.delToken();
      sessionStorage.removeItem("baseColor");
      localStorage.removeItem("userRole");
      // 跳转到登录页的时候顺便刷新
      // this.$router.push("/login");
      window.location.href = window.location.origin + window.location.pathname;
    },
    selectUser() {
      let sch = [{ column: "_id", value: this.loginUserId }];
      selectValue({ tableName: "T_USER", sch }).then(res => {
        if (res.status == 200) {
          this.userInfo = res.data[0];
        }
      });
    }
  },
  created() {
    this.selectUser();
  }
};
</script>

<style>
.setting-box .ivu-dropdown-menu {
  min-width: 60px;
}
</style>
<style lang="less" scoped>
@import "head";
</style>
