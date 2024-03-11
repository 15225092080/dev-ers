<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-m">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :url="url"
              :reqFun="reqFun"
              :findById="findById"
              @eventChange="eventChange"
              submitFun
              labelWidth="90px">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.corporationUser.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.userId } }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    reqFun(formData) {
      if (this.$store.getters.operatState !== 'add') {
        formData.lockType = '0';
        if (formData.pwdLockFlag == 1) {
          formData.lockType = '1';
        } else if (formData.systemLockFlag == 1) {
          formData.lockType = '2';
        } else if (formData.businessLockFlag == 1) {
          formData.lockType = '3';
        }
      }
    },
    // 监听下拉框事件
    eventChange(obj) {
      var that = this;
      that.common.onselect('userType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 'A') {
          that.common.Control(that.arrList, {
            orgCode: {
              hide: false,
              rule: [{ required: true, validator: that.validator.empty, trigger: 'blur' }],
            },
          });
        } else {
          that.common.Control(that.arrList, {
            orgCode: {
              hide: true,
              rule: [{ required: false }],
            },
          });
        }
      });
    },
    setOrgVal() {
      // 所属机构下拉框赋值
      let systemId = sessionStorage.getItem('systemId');
      // 缓存中取法人机构数据
      let obj = JSON.parse(sessionStorage.getItem(systemId + '_getLegalPerOrg'));
      if (obj) {
        this.common.Control(this.arrList, {
          orgCode: {
            customOption: obj,
          },
        });
      }
    },
    init() {
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.corporationUser.create;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'userId',
              value: '',
              label: '用户名',
              span: 12,
              // header:"基本信息",
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                { type: '1110|_', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'userName',
              value: '',
              label: '用户姓名',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                { type: '1111|·，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'userType',
              value: '',
              param: 'T_FRJXTYHGL_0001',
              label: '用户类型',
              eventChange: true,
              span: 12,
              filter: ['C', 'D'],
              rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
            },
            {
              type: 'input',
              name: 'email',
              value: '',
              label: 'E-mail',
              span: 12,
              rule: [
                { type: 'email', message: '无效的邮箱地址', trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                { type: '1110|.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'orgCode',
              value: '',
              customOption: {},
              label: '所属机构',
              span: 12,
              hide: true,
            },
          ],
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.corporationUser.update;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'userId',
              value: '',
              label: '用户名',
              span: 12,
              // header:"基本信息",
              disabled: true,
              noReset: true,
            },
            {
              type: 'input',
              name: 'userName',
              value: '',
              label: '用户姓名',
              span: 12,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'blur' },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                { type: '1111|·，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'lockType',
              value: '',
              param: 'T_FRJXTYHGL_0002',
              label: '锁定状态',
              span: 12,
              disabled: true,
              noReset: true,
            },
            {
              type: 'select',
              name: 'stopFlag',
              value: '',
              param: 'T_FRJXTYHGL_0003',
              label: '启停状态',
              span: 12,
              disabled: true,
              noReset: true,
            },
          ],
          [
            {
              type: 'select',
              name: 'userType',
              value: '',
              param: 'T_FRJXTYHGL_0001',
              label: '用户类型',
              span: 12,
              eventChange: true,
              disabled: true,
              noReset: true,
            },
            {
              type: 'input',
              name: 'email',
              value: '',
              label: 'E-mail',
              span: 12,
              rule: [
                { type: 'email', message: '无效的邮箱地址', trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                { type: '1110|.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'orgCode',
              value: '',
              customOption: {},
              label: '所属机构',
              span: 12,
              hide: true,
            },
          ],
        ];
      }
      this.setOrgVal();
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
/* .el-dialog__wrapper >>> .form-body {
    padding-bottom: 20px;
  } */
</style>
