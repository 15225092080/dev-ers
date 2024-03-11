<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-m">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{$route.meta.title+param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <v-form ref="formItem"
            v-bind:arrList="arrList"
            :url="url"
            submitFun
            labelWidth="100px"
            :findById="findById"
            @eventChange="eventChange"></v-form>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  name: 'child',
  data() {
    return {
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.menu.findById, // 接口
        param: { params: { resourceId: this.$parent.detailUrl.resId } }, // 参数
      },
      centerDialogVisible: true,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  props: {
    param: {
      type: Object,
    },
  },
  watch: {},
  methods: {
    eventChange(obj) {
      let that = this; // 绑定指向
      that.common.onselect('resourceType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        // 资源类型选择为“系统”时，上级资源非必填，且不允许编辑
        if (obj.e == 'A') {
          that.common.Control(that.arrList, {
            parentResourceId: {
              disabled: true,
              rule: [{ required: false }],
              value: '0', // 选择系统时给上级资源一个默认值'0'
            },
            // #12392 当资源类型为系统时，资源id长度为8；其他类型，资源id长度为32
            resourceId: {
              rule: [
                { required: true, validator: that.validator.empty, trigger: 'blur' },
                { max: 8, message: '长度不超过8位', trigger: 'blur' },
                { type: '1110|-#/_', validator: that.validator.comValidate, trigger: 'blur' },
              ],
            },
          });
          // 上级资源输入框清空，资源树赋值0
          that.$refs.formItem.search_IN_orgId_fake = '';
          that.$refs.formItem.formItem.parentResourceId = '0';
        } else {
          // 选择其他选项时，上级资源为必填
          that.common.Control(that.arrList, {
            parentResourceId: {
              disabled: false,
              rule: [{ required: true, validator: that.validator.empty, trigger: 'blur' }],
              value: '', // 选择系统时给上级资源一个默认值'0'
            },
            // #12392 当资源类型为系统时，资源id            资源id长度为32
            resourceId: {
              rule: [
                { required: true, validator: that.validator.empty, trigger: 'blur' },
                { max: 32, message: '长度不超过32位', trigger: 'blur' },
                { type: '1110|-#/_', validator: that.validator.comValidate, trigger: 'blur' },
              ],
            },
          });
          // 上级资源输入框清空，资源树赋值0
          that.$refs.formItem.search_IN_orgId_fake = '';
          that.$refs.formItem.formItem.parentResourceId = '';
        }
      });
    },
    init() {
      if (this.$store.getters.operatState == 'add') {
        this.url = this.$urlList.menu.create;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'resourceName',
              value: '',
              label: '资源名称',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { type: '1111|-', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'resourceId',
              value: '',
              label: '资源代码',
              eventChange: true,
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { type: '1110|-#/_', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 32, message: '长度不超过32位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'resourceType',
              value: '',
              param: 'T_ZYGL_0001',
              label: '资源类型',
              span: 12,
              eventChange: true,
              rule: [{ required: true, validator: this.validator.empty, trigger: 'change' }],
            },
            {
              type: 'input',
              name: 'url',
              value: '',
              label: '资源地址',
              span: 12,
              rule: [
                { type: '1110|-#/_:.?%&=', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'orderNum',
              value: '',
              label: '资源排序',
              span: 12,
              rule: [
                { type: '0010', validator: this.validator.comValidate, trigger: 'blur' },
                { validator: this.validator.checkNonNegativeInteger, trigger: 'blur' },
                { max: 3, message: '长度不超过3位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'icon',
              value: '',
              label: '资源图标',
              span: 12,
              rule: [
                { type: '1110|-#/_', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'permission',
              value: '',
              label: '权限字符串',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { type: '1100|_:', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
              ],
            },
            {
              type: 'tree',
              treeurl: this.$urlList.menu.getTreeData,
              treetitle: '上级资源',
              defaultProps: {
                children: 'children',
                label: function (a) {
                  return a.params.resourceName;
                },
              },
              name: 'parentResourceId',
              value: '',
              label: '上级资源',
              span: 12,
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
          ],
        ];
      } else if (this.$store.getters.operatState == 'edit') {
        this.url = this.$urlList.menu.update;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'resourceName',
              value: '',
              label: '资源名称',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { type: '1111|-', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
            { type: 'input', name: 'resourceId', value: '', label: '资源代码', span: 12, disabled: true },
          ],
          [
            {
              type: 'select',
              name: 'resourceType',
              value: '',
              param: 'T_ZYGL_0001',
              label: '资源类型',
              eventChange: true,
              span: 12,
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
            {
              type: 'input',
              name: 'url',
              value: '',
              label: '资源地址',
              span: 12,
              rule: [
                { type: '1110|-#/_:.?%&=', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'orderNum',
              value: '',
              label: '资源排序',
              span: 12,
              rule: [
                { type: '0010', validator: this.validator.comValidate, trigger: 'blur' },
                { validator: this.validator.checkNonNegativeInteger, trigger: 'blur' },
                { max: 3, message: '长度不超过3位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'icon',
              value: '',
              label: '资源图标',
              span: 12,
              rule: [
                { type: '1110|-#/_', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'permission',
              value: '',
              label: '权限字符串',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { type: '1100|_:', validator: this.validator.comValidate, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
              ],
            },
            {
              type: 'tree',
              treeurl: this.$urlList.menu.getTreeData,
              treetitle: '上级资源',
              defaultProps: {
                children: 'children',
                label: function (a) {
                  return a.params.resourceName;
                },
              },
              name: 'parentResourceId',
              value: '',
              label: '上级资源',
              span: 12,
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
          ],
        ];
      }
    },
  },
  created() {
    this.init();
  },

  //  mixins: [http]
};
</script>
<style>
/* .el-dialog__body{
        padding: 0px;
    }
    .treecard{
        height: '700px';
    } */
</style>
