<template>
  <div class="hello">
    <div v-html="img" @click="cutCode"></div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" style="width:100%">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username" />
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password" />
      </FormItem>
      <FormItem>
        <Input type="text" v-model="formInline.code" placeholder="Code" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { findSvg, login } from "@/api/public";
import { encrypt, decrypt } from "@/encryption/aes";
import { Encrypt, Decrypt } from "@/encryption/aes1";
export default {
  name: "HelloWorld",
  data() {
    return {
      img: "",
      formInline: {
        user: "",
        password: "",
        code: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let nameAndPassword =
            this.formInline.user + "&&" + this.formInline.password;
          let easObj = encrypt(nameAndPassword);
          let data = {
            userInfo: easObj,
            authCode: this.formInline.code
          };
          login(data).then(res => {
            console.log(res);
            if (res.data.status == "200") {
              this.$Message.success("登陆成功");
            } else {
              this.$Message.warning(res.data.message);
              this.cutCode();
            }
          });
        } else {
          return false;
        }
      });
    },
    cutCode() {
      findSvg().then(res => {
        this.img = res.data.img;
      });
    }
  },
  created() {
    this.cutCode();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 300px;
  margin: auto;
  text-align: center;
}
</style>
