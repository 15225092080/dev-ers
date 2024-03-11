<template>
  <el-dialog
    :visible.sync="param.visible"
    width="60%"
    :modal="false"
    :close-on-click-modal="false"
    :before-close="closeorgtree"
    :opened="beforeOpen"
    custom-class="model-dialog el-dialog-l"
  >
     <span slot="title" class="clearfix">
        <span class="dialog-title">{{param.title}}</span>
        <span class="dialog-title-bg"></span>
      </span>
    <input v-model="header" class="native">
    <el-tree
      :data="param.treedata"
      :props="param.defaultProps"
      @node-click="handleNodeClick"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      header: '',
      msg: '',
      dataId: ''
    };
  },
  computed: {
    beforeOpen() {
      return this.param.visible;
    }
  },
  watch: {
    header(val) {
      this.$refs.tree.filter(val);
    }
  },
  props: ['param'],
  methods: {
    closeorgtree(done) {
      // 這是清除機構樹表單數據
      this.header = '';
      done();
    },
    handleNodeClick(data) {
      this.flag = true;
      this.msg = data.name || data.value;
      this.header = data.name || data.value;
      this.dataId = data.id || data.code;
      this.$emit('update:orgId', this.dataId);
      this.$parent.$refs.formItem.validateField(this.param.name);
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return Object.values(data.params)[0].indexOf(value) !== -1;
    },
    confirm() {
      if (this.flag) {
        this.$emit('update:orgIdfake', this.msg);
        this.$emit('update:orgId', this.dataId);
        this.$emit('eventChange', {'e': this.dataId, 'sname': this.param.name});
        this.flag = false;
      }
      this.header = '';
      this.param.visible = false;
    },
    mounted() {
      this.flag = false;
    }
  }
};
</script>

<style>
.el-tree-node:focus>.el-tree-node__content{
    color: #66b1ff;
}
.el-dialog__headerbtn .el-dialog__close{
    color: #66b1ff;
}
</style>
