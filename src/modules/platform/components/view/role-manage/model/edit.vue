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
            :url="url"
            submitFun
            labelWidth="110px"
            :findById="findById"
            @getrole="getrole">
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
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.role.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.resId } }, // 参数
      },
      height: '30vh',
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
      centerDialogVisible: true,
      paddingLeft: 45,
    };
  },
  methods: {
    getallrole() {
      this.http.apiGet(this.$urlList.role.configurableResource, { showLoading: true }).then((res) => {
        this.data = res.data;
        // this.getMenuName(res.data)
      });
    },
    getrole() {
      this.http.apiGet(this.$urlList.role.configurableResource, { params: { roleId: this.$parent.detailUrl.resId }, showLoading: true }).then((res) => {
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
        if (value.params.checked && value.children === null) {
          this.checkedKeys.push(value.params.resourceId);
        }
      });
    },
    init() {
      if (this.$store.getters.operatState == 'add') {
        this.getallrole();
        this.url = this.$urlList.role.create;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'roleName',
              value: '',
              label: '角色名称',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                { type: '1111', validator: this.validator.comValidate, trigger: 'blur' },
                { type: this, validator: this.validator.ajaxRoleName, trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'roleType',
              value: '',
              param: 'T_JSGL_0001',
              label: '角色类型',
              span: 12,
              filter: ['B'],
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'textarea',
              name: 'roleDesc',
              value: '',
              label: '角色描述',
              span: 24,
              rule: [
                { max: 200, message: '长度不超过200位', trigger: 'blur' },
                { type: '1111|·，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
          ],
        ];
      } else if (this.$store.getters.operatState == 'edit') {
        this.getrole();
        this.url = this.$urlList.role.update;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'roleName',
              value: '',
              label: '角色名称',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                { type: '1111', validator: this.validator.comValidate, trigger: 'blur' },
                { type: this, validator: this.validator.ajaxRoleName, trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'roleType',
              value: '',
              param: 'T_JSGL_0001',
              label: '角色类型',
              span: 12,
              disabled: true,
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'textarea',
              name: 'roleDesc',
              value: '',
              label: '角色描述',
              span: 24,
              rule: [
                { max: 200, message: '长度不超过200位', trigger: 'blur' },
                { type: '1111|·，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
          ],
        ];
      }
      if (JSON.parse(this.$store.getters.getLoginStatus).userType !== 'A') {
        this.common.Control(this.arrList, {
          roleType: {
            filter: ['B', 'A'],
          },
        });
      } else {
        this.common.Control(this.arrList, {
          roleType: {
            filter: ['B'],
          },
        });
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style  scoped lang="less">
@top: 10px;
.margin-top {
  margin-top: @top;
}
.inactive {
  margin-top: @top;
  background-color: #f5f7fa;
}
.active {
  margin-top: @top;
}
</style>
