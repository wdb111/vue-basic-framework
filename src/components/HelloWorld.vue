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
      <FormItem >
        <Input type="text" v-model="formInline.code" placeholder="Code" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { findSvg,login } from "@/api/public";
export default {
  name: "HelloWorld",
  data() {
    return {
      img: "",
      formInline: {
        user: "",
        password: "",
        code:""
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
          login(this.formInline).then(res=>{
            console.log(res.data)
            // let userToken = 'Bearer ' + res.data.data.body.token;
          // 将用户token保存到vuex中
          // this.changeLogin({ Authorization: userToken });
          })
          this.$Message.success("Success!");
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
