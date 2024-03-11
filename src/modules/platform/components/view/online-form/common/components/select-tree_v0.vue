<template>
  <div>
    <el-select ref="selectTree"
               v-model="form.value"
               filterable
               placeholder="请选择...">
      <el-option :key="form.value"
                 :value="form.value"
                 :label="form.label"
                 hidden />
      <el-tree ref="tree"
               class="ui-online-select-tree-wrap"
               :data="treeList"
               :props="defaultProps"
               :node-key="defaultProps.value"
               :check-strictly="true"
               @node-click="handleNodeClick"
               default-expand-all />
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        value: '',
        label: '',
      },
      data: [
        {
          Id: 1,
          label: '一级 1',
        },
        {
          Id: 2,
          label: '一级 2',
        },
        {
          Id: 3,
          label: '一级 3',
          children: [
            {
              Id: 31,
              label: '二级 3-1',
              children: [
                {
                  Id: 311,
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              Id: 32,
              label: '二级 3-2',
              children: [
                {
                  Id: 321,
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        value: 'value',
        label: 'label',
        children: 'children',
      },
    };
  },
  props: {
    treeList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleNodeClick(data) {
      this.form.value = data.value;
      this.form.label = data.label;
      // 选择器执行完成后，使其失去焦点隐藏下拉框的效果
      this.$refs.selectTree.blur();
    },
  },
};
</script>
<style lang="less">
.ui-online-select-tree-wrap.el-tree {
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
