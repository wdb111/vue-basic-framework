<template>
  <div id="first-page">
    <div class="header">
      <Button type="primary" @click="addData()">增加</Button>
      <Button type="error">删除</Button>
    </div>
    <div class="table-box">
      <!-- <el-table
        :data="data1"
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="telephone" label="电话"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table> -->
      <Table border ref="selection" :columns="columns4" :data="data1">
        <template slot-scope="{ row}" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="updateData(row)">修改</Button>
          <Button type="error" size="small" @click="removeData(row)">删除</Button>
        </template>
      </Table>
      <Spin class="spin" size="large" fix v-if="spinShow"></Spin>
    </div>

    <Modal v-model="modal1" :title="modelTitle" @on-ok="addOk" @on-cancel="addCancel">
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="80"
        style="max-height:350px;overflow-y:auto;"
      >
        <FormItem label="姓名">
          <Input v-model="formItem.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="formItem.age" type="number" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="性别">
          <RadioGroup v-model="formItem.sex.code" @on-change="sexChange(formItem.sex.code)">
            <Radio label="001">
              <span>男</span>
            </Radio>
            <Radio label="002">
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="电话">
          <Input v-model="formItem.telephone" type="number" placeholder="请输入"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Mixin from "@/mixin/mixin"
import { addValue, selectValue, deleteValue, updateValue } from "@/api/public";
export default {
  mixins:[Mixin],
  name: "First",
  data() {
    return {
      modelTitle: "",
      spinShow: false,
      modal1: false,
      oldData: {},
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "电话",
          key: "telephone"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: [],
      formType: "",
      formItem: {
        name: "",
        age: "",
        sex: {
          name: "",
          code: ""
        },
        telephone: ""
      }
    };
  },
  methods: {
    sexChange(val) {
      if (val == "001") {
        this.formItem.sex.name = "男";
      } else {
        this.formItem.sex.name = "女";
      }
    },
    addData() {
      this.formType = "add";
      this.modelTitle = "添加数据";
      this.modal1 = true;
      this.formItem = {
        name: "",
        age: "",
        sex: {
          name: "",
          code: ""
        },
        telephone: ""
      };
    },
    updateData(row) {
      this.formType = "update";
      this.modelTitle = "修改数据";
      this.modal1 = true;
      this.oldData = JSON.parse(JSON.stringify(row));
      this.formItem = JSON.parse(JSON.stringify(row));
    },
    addOk() {
      if (this.formType == "add") {
        addValue("PEPLE", [this.formItem]).then(res => {
          if (res.status == 200) {
            this.$Message.success("添加成功");
            this.selectTableData();
          } else {
            this.$Message.console.error(res.message);
          }
        });
      } else {
        let sch = [{ column: "_id", value: this.formItem._id }];
        let _this = this;

        function fn(oldObj, newObj, newData) {
          Object.keys(oldObj).forEach(key => {
            if (typeof oldObj[key] !== "object") {
              if (oldObj[key] !== newObj[key]) {
                newData[key] = newObj[key];
              }
            } else {
              fn(oldObj[key], newObj[key], (newData[key] = {}));
            }
          });
          return newData;
        }
        let newData = {};
        let Data = fn(this.oldData, this.formItem, newData);
        updateValue("PEPLE", sch, Data).then(res => {
          if (res.status == 200) {
            this.$Message.success("修改成功");
            this.selectTableData();
          } else {
            this.$Message.console.error(res.message);
          }
        });
      }
    },
    addCancel() {
      this.$Message.info("已取消添加");
    },
    removeData(row) {
      let sch = [{ column: "_id", value: row._id }];
      this.$Modal.confirm({
        title: "删除",
        content:
          "<p >此操作不可逆，确定删除？</Copyright&nbsp;2020&nbsp;王代彬.>",
        onOk: () => {
          deleteValue({ tableName: "PEPLE", params: sch }).then(res => {
            if (res.status == 200) {
              this.$Message.success("删除成功");
              this.selectTableData();
            }
          });
        },
        onCancel: () => {
          this.$Message.info("再考虑一下吧");
        }
      });
    },
    selectTableData() {
      this.spinShow = true;
      selectValue({ tableName: "PEPLE" }).then(res => {
        if (res.status == 200) {
          this.data1 = res.data;
        }
        this.spinShow = false;
      });
    }
  },
  created() {
    this.selectTableData();
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
