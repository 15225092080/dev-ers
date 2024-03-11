<template>
  <!-- https://github.com/ayiaq1/el-tree-select -->
  <el-tree-select :styles="styles"
                  v-model="values"
                  :selectParams="selectParams"
                  :treeParams="treeParams"
                  :treeRenderFun="renderFun"
                  @searchFun="searchFun"
                  @node-click="nodeClickFun"
                  ref="treeSelect"></el-tree-select>

</template>
<script>
export default {
  name: 'TreeSelect',
  data() {
    return {
      styles: {},
      values: '',
    };
  },
  props: {
    selectParams: {
      type: Object,
      default: null,
    },
    treeParams: {
      type: Object,
      default: null,
    },
    value: {
      type: [String, Number, Array],
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        this.values = val;
      },
    },
  },
  mounted() {},
  methods: {
    nodeClickFun(data, node, vm) {
      this.$emit('handleSelectd', data);
    },
    searchFun(value) {
      // this.$refs.treeSelect.$refs.tree.filter(value);
      this.$refs.treeSelect.filterFun(value);
    },
    renderFun(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
        </span>
      );
    },
  },
  components: {},
};
</script>
<style lang="less">
.ui-online-select-tree.el-tree {
  height: auto;
  .el-tree-node .el-tree-node__content .expanded.el-tree-node__expand-icon {
    background-image: none;
  }
  .el-tree-node__content {
    .el-tree-node__expand-icon,
    .is-leaf.el-tree-node__expand-icon {
      background-image: none;
    }
    .el-tree-node__label::before {
      content: '';
    }
    .el-icon-caret-right:before {
      content: '\e791';
    }
  }
}
</style>
