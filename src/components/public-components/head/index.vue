<template>
  <div class="head">
    <header :style="{backgroundColor:baseColor}">
      <div class="logo">
        <img src="../../../assets/img/logo.jpg" alt />
      </div>
      <div class="header-right">
        <Dropdown style="margin-left: 20px" @on-click="changeTheme">
          <Button :style="{backgroundColor:baseColor,color:'#fff'}">
            {{theme}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="暗黑">
              <i class="color-block1"></i> 暗黑
            </DropdownItem>
            <DropdownItem name="淡绿">
              <i class="color-block2"></i> 淡绿
            </DropdownItem>
            <DropdownItem name="嫣红">
              <i class="color-block3"></i> 嫣红
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div>欢迎:{{loginUser}}</div>
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
import { addValue, selectValue, deleteValue, updateValue } from "@/api/public";
export default {
  name: "home",
  data() {
    return {
      theme: "主题风格",
      baseColor:this.$store.state.baseColor,
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
    changeTheme(val) {
      this.theme = val;
      
      switch (val) {
        case "暗黑":
          this.baseColor = "#343434";
          break;
        case "淡绿":
           this.baseColor = "#34E56A";
          break;
        case "嫣红":
           this.baseColor = "#FA486F";
          break;
        default:
          break;
      }
      sessionStorage.setItem("baseColor",  this.baseColor);
    },
    DropdownMenuClick(val) {
      this.modal1 = true;
      if (val == "001") {
        this.modalTitle = "查看个人信息";
        this.formItem = this.userInfo;
        this.isShow = true;
      } else if (val == "002") {
        this.modalTitle = "设置个人信息";
        this.formItem = this.userInfo;
        this.isShow = false;
      }
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    logout() {
      sessionStorage.removeItem("baseColor")
      this.$router.push("/login");
      this.$store.commit("delToken");
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
    // this.selectUser();
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
