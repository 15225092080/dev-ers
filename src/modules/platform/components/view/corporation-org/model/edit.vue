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
              :findById="findById"
              submitFun
              labelWidth="110px">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import { getParam } from '@/modules/platform/script/org-manage/org-manage';
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
        url: this.$urlList.corporationOrg.findById, // 接口
        param: { params: { orgCode: this.$parent.detailUrl.resCode } }, // 参数
      },
      financialOrgCodeUrl: this.$urlList.corporationOrg.haveFinancialOrgCode, // 金融机构代码唯一性校验接口
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    init() {
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.corporationOrg.create;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'orgCode',
              value: '',
              label: '机构内部代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
                { validator: this.validator.ajaxHaveOrg, trigger: 'blur' },
                { max: 16, message: '长度不超过16位', trigger: 'blur' },
                {
                  type: '1010',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'orgName',
              value: '',
              label: '机构名称',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
                {
                  type: this,
                  validator: this.validator.ajaxlegalOrgName,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'financialOrgCode',
              value: '',
              label: '金融机构代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  validator: this.validator.ajaxFinancialOrgCode,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'areaCode',
              value: '',
              label: '行政区划',
              span: 24,
              rule: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
            },
          ],
        ];
      } else if (this.$store.getters.operatState == 'edit') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.corporationOrg.update;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'orgCode',
              value: '',
              label: '机构内部代码',
              span: 12,
              disabled: true,
              noReset: true,
            },
            {
              type: 'input',
              name: 'orgName',
              value: '',
              label: '机构名称',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
                {
                  type: this,
                  validator: this.validator.ajaxlegalOrgName,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'financialOrgCode',
              value: '',
              label: '金融机构代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'areaCode',
              value: '',
              label: '行政区划',
              span: 24,
              rule: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
            },
          ],
        ];
      }
      // this.getParam()//根据参数控制是否必填
      getParam(this);
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
/* .el-form-item__label{
        padding: 0 5px 0 0;
    } */
</style>
