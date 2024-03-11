<template>
  <v-form v-if="isShowForm"
          ref="formItem"
          v-bind:arrList="arrList"
          :url='url'
          labelWidth="110px"
          submitFun
          :setRouteQuery="setRouteQuery"
          :findById="findById"
          :customSubmit="customFun"
          :formTemplate="formTemplate">
    <!-- <el-button slot="slotBtn" @click="submitForm('formItem')" class="submit_btn"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button> -->
  </v-form>
</template>
<script>
import { getOrgRole, getParam, formTemplate } from '@/modules/platform/script/org-manage/org-manage';
export default {
  name: 'child',
  data() {
    return {
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.org.findById, // 接口
        param: {
          params: {
            orgCode: this.$route.query.orgCode,
          },
        },
      },
      setRouteQuery: {
        name: 'orgCode',
        valueField: 'orgCode',
      },
      arrList: [],
      url: '',
      financialOrgCodeUrl: this.$urlList.org.haveFinancialOrgCode, // 金融机构代码唯一性校验接口
      formTemplate: formTemplate(this),
      // 15626 【偶发】机构编辑提交后，偶发机构角色未反显
      isShowForm: false,
    };
  },
  watch: {},
  methods: {
    customFun(param) {
      if (param.orgCode === param.parentOrgCode) {
        this.common.message(true, '上级机构不允许选择本机构，提交失败', 'warning', '1800', function () {
          return false;
        });
        return false;
      } else {
        return true;
      }
    },
    async init() {
      if (this.$store.getters.operatState == 'add') {
        this.url = this.$urlList.org.create;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'orgCode',
              value: '',
              label: '机构内部代码',
              span: 6,
              header: '机构管理基本信息',
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
                { max: 16, message: '长度不超过16位', trigger: 'blur' },
                { validator: this.validator.ajaxOrgIdCheck, trigger: 'blur' },
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
              span: 6,
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
                  validator: this.validator.ajaxOrgName,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'tree',
              treeurl: this.$urlList.common.orgtree,
              treetitle: '机构树',
              defaultProps: {
                children: 'children',
                label: function (a) {
                  return a.params.orgName;
                },
              },
              name: 'parentOrgCode',
              value: '',
              label: '上级机构',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'input',
              name: 'financialOrgCode',
              value: '',
              label: '金融机构代码',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '1010',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'linkMan',
              value: '',
              label: '联系人',
              span: 6,
              rule: [
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'linkMode',
              value: '',
              label: '联系方式',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '1110',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'postCode',
              value: '',
              label: '邮政编码',
              span: 6,
              rule: [{ validator: this.validator.postCode, trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'areaCode',
              value: '',
              label: '行政区划',
              span: 18,
              rule: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'address',
              value: '',
              label: '详细地址',
              span: 18,
              rule: [
                { max: 200, message: '长度不超过200位', trigger: 'blur' },
                {
                  type: '1111|，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'textarea',
              name: 'remark',
              value: '',
              label: '备注',
              span: 24,
              rule: [
                { max: 400, message: '长度不超过400位', trigger: 'blur' },
                {
                  type: '1111|，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'deptName',
              value: '',
              label: '部门',
              span: 8,
              header: '部门配置',
              addItem: true,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'checkbox',
              name: 'roleId',
              value: [],
              header: '机构角色',
              span: 24,
            },
          ],
        ];
      } else if (this.$store.getters.operatState == 'edit') {
        this.url = this.$urlList.org.update;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'orgCode',
              value: '',
              label: '机构内部代码',
              span: 6,
              header: '机构管理基本信息',
              disabled: true,
            },
            {
              type: 'input',
              name: 'orgName',
              value: '',
              label: '机构名称',
              span: 6,
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
                // ,
                // {type: this, validator: this.validator.ajaxOrgName, trigger: 'blur'}
              ],
            },
            {
              type: 'tree',
              treeurl: this.$urlList.common.orgtree,
              treetitle: '机构树',
              defaultProps: {
                children: 'children',
                label: function (a) {
                  return a.params.orgName;
                },
              },
              name: 'parentOrgCode',
              value: '',
              label: '上级机构',
              span: 6,
              rule:
                this.$route.query.orgCode == localStorage.getItem('ms_orgCode')
                  ? []
                  : [
                      {
                        required: true,
                        validator: this.validator.empty,
                        trigger: 'blur',
                      },
                    ],
              disabled: this.$route.query.orgCode == localStorage.getItem('ms_orgCode'),
            },
            {
              type: 'input',
              name: 'financialOrgCode',
              value: '',
              label: '金融机构代码',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '1010',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'linkMan',
              value: '',
              label: '联系人',
              span: 6,
              rule: [
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'linkMode',
              value: '',
              label: '联系方式',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '1110',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'postCode',
              value: '',
              label: '邮政编码',
              span: 6,
              rule: [{ validator: this.validator.postCode, trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'areaCode',
              value: '',
              label: '行政区划',
              span: 18,
              rule: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'address',
              value: '',
              label: '详细地址',
              span: 24,
              rule: [
                { max: 200, message: '长度不超过200位', trigger: 'blur' },
                {
                  type: '1111|，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'textarea',
              name: 'remark',
              value: '',
              label: '备注',
              span: 24,
              rule: [
                { max: 400, message: '长度不超过400位', trigger: 'blur' },
                {
                  type: '1111|，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'deptName',
              value: '',
              label: '部门',
              span: 8,
              header: '部门配置',
              addItem: true,
              // btnDisabled: true,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'checkbox',
              name: 'roleId',
              value: [],
              header: '机构角色',
              span: 24,
            },
          ],
        ];
      }
      // 10051 判断当前用户所属机构与所编辑机构一致时，隐藏机构角色
      let userData = JSON.parse(sessionStorage.userData);
      if (this.$route.query.orgCode == userData.orgCode) {
        this.arrList[this.arrList.length - 1] = [];
      }
      // 10051 END
      // 15626 【偶发】机构编辑提交后，偶发机构角色未反显
      await getOrgRole(this);
      await getParam(this);
      this.isShowForm = true;
    },
    // submitForm(formItem) {
    //   let that = this;
    //   let param;
    //   if (this.$parent.$parent.$refs.tree) {
    //     if (this.$parent.$parent.$refs.tree.getHalfCheckedKeys().length <= 0) {
    //       that.formItem[this.$parent.$parent.name] = this.$parent.$parent.$refs.tree.getCheckedKeys();
    //     } else {
    //       that.formItem[this.$parent.$parent.name] = this.$parent.$parent.$refs.tree.getHalfCheckedKeys() + ',' + this.$parent.$parent.$refs.tree.getCheckedKeys();
    //     }
    //   }
    //   param = this.$refs[formItem].formItem;
    //   // 上级机构不允许选择本机构
    //   if (param.parentOrgCode == param.orgCode) {
    //     that.common.message(true, '上级机构不允许选择本机构，提交失败', 'warning', '2000', function () {
    //       return false;
    //     });
    //     return false;
    //   }
    //   this.$refs[formItem].$refs[formItem].validate(valid => {
    //     if (valid) {
    //       // this.$urlList.org.update
    //       this.http.apiPost(this.url, param, {
    //         showLoading: true
    //       }).then(res => {
    //         that.common.submitMsg(res).then(() => {
    //           setTimeout(() => {
    //             window.reload();
    //             that.$store.dispatch('user/setOperatState', 'edit');
    //             this.$refs[formItem].$refs[formItem].id = this.formTemplate.paramsValue;
    //           }, 350);
    //         });
    //         // that.common.submitMsg(res).then(() => {
    //         //   if (this.$children[0].$el.className.includes('el-dialog__wrapper')) { // 有弹窗的情况下
    //         //     that.close();
    //         //   } else { // 跳转路由的情况
    //         //     this.reload();
    //         //   }
    //         // });
    //       });
    //     } else {
    //       that.common.message(true, '验证不通过，提交失败', 'warning', '2000', function () {
    //         return false;
    //       });
    //     }
    //   });
    // }
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
