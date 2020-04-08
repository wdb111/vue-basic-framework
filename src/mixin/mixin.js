export default {
  data() {
    return {
      tableWidth: "calc(100% - 58px)"
    }
  },
  methods: {
    change(str) {
      this.tableWidth = str;
    }
  },

}
