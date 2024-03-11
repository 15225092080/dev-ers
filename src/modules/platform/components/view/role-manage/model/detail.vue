<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-s">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{$route.meta.title+param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <v-form ref="formItem"
            v-bind:arrList="arrList"
            labelWidth="110px"
            :treeData="treeData"
            :findById="findById">
      <p :style="{'padding-left':paddingLeft+'px'}"
         slot="slotRecord">{{header}}</p>
      <el-tree ref="tree"
               :data="data"
               :props="defaultProps"
               :style="{height:height}"
               show-checkbox
               default-expand-all
               slot="slotTree"
               :node-key="nodeKey"
               :default-checked-keys='checkedKeys'>
        <span slot-scope="{ node, data }">
          <i :class="data.icon"></i>
          <span style="padding-left: 4px;">{{node.label}}</span>
        </span>
      </el-tree>
    </v-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'child',
  components: {},
  props: {
    param: {
      type: Object,
    },
  },
  data() {
    return {
      arrList: [],
      url: '',
      height: '30vh',
      centerDialogVisible: true,
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.role.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.resId } }, // 参数
      },

      data: [],
      header: '权限分配',
      nodeKey: 'id',
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: function (a) {
          return a.params.resourceName;
        },
      },
      name: 'resourceId',
      paddingLeft: 45,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getrole() {
      this.http.apiGet(this.$urlList.role.configurableResource, { params: { roleId: this.$parent.detailUrl.resId } }).then((res) => {
        this.data = res.data;
        this.getMenuName(res.data);
      });
    },
    getMenuName(arr) {
      arr.forEach((value) => {
        if (value.children !== null) {
          if (value.children.length > 0) {
            this.getMenuName(value.children);
          }
        }
        value.disabled = true;
        if (value.params.checked && value.children === null) {
          this.checkedKeys.push(value.params.resourceId);
        }
      });
    }, // 下次提交会把这块提出来
    init() {
      this.getrole();
      this.arrList = [
        [
          { type: 'input', name: 'roleName', value: '', label: '角色名称', span: 12, disabled: true },
          { type: 'select', name: 'roleType', value: '', param: 'T_JSGL_0001', label: '角色类型', span: 12, disabled: true },
        ],
        [{ type: 'textarea', name: 'roleDesc', value: '', label: '角色描述', span: 24, disabled: true }],
        [{ type: 'select', name: 'status', value: '', param: 'T_JSGL_0002', label: '启停用状态', span: 12, disabled: true }],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
