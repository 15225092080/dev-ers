<template>
  <div class="user_edit">
    <v-form v-if="isShowForm"
            ref="formItem"
            v-bind:arrList="arrList"
            :url="url"
            labelWidth="100px"
            :findById="findById"
            @eventChange="eventChange"
            :formTemplate="formTemplate">
      <template slot="slotBtn">
        <el-button class="submit_btn"
                   @click="submitForm"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </template>
    </v-form>
  </div>
</template>
<script>
import { getOrgRole, getParam, formTemplate } from '@/modules/platform/script/user-manage/user-manage';
import perUserAttr from '../credit/perUserAttr';
import enUserAttr from '../credit/enUserAttr';
let orgCode;
export default {
  name: 'child',
  components: {
    perUserAttr,
    enUserAttr,
  },
  inject: ['reload'],
  data() {
    return {
      arrList: [],
      url: '',
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.user.findById, // 接口
        param: {
          params: {
            id: this.$route.query.id,
          },
        }, // 参数
      },
      formTemplate: formTemplate(this),
      isShowForm: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm() {
      // 提交的公共方法可新增可编辑
      let param = this.$refs.formItem.formItem;
      this.$refs.formItem.$refs.formItem.validate((valid) => {
        if (valid) {
          this.http
            .apiPost(this.url, param, {
              showLoading: true,
            })
            .then((res) => {
              this.common.submitMsg(res).then(() => {
                if (res.code != 0) return;
                this.$store.dispatch('user/setOperatState', 'edit');
                this.init();
                this.$router.push({
                  path: 'system-user-edit',
                  query: {
                    id: param.userId,
                  },
                });
                this.reload();
              });
            });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '1800', function () {
            return false;
          });
        }
      });
    },
    async getdept(newQuestion) {
      // 二次优化
      let response = await this.http.apiGet(this.$urlList.org.getDept, {
        params: { orgCode: newQuestion },
      }); // 角色提供
      this.common.Control(this.arrList, {
        deptName: {
          customOption: Object.assign({}, response),
        },
      });
    },
    eventChange(obj) {
      let that = this; // 绑定指向
      that.common.onselect('orgCode', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        that.$refs.formItem.formItem.deptName = ''; // 下个版本封装下
        that.$refs.formItem.formItem.userType = '';
        that.getdept(obj.e);
        orgCode = obj.e;
        if (JSON.parse(that.$store.getters.getLoginStatus).legalEntityFlag == '1') {
          // 判断当前用户所属机构是否是法人机构
          if (obj.e !== localStorage.getItem('ms_orgCode')) {
            that.common.Control(that.arrList, {
              userType: {
                filter: ['B', 'A'],
              },
            });
          } else {
            that.common.Control(that.arrList, {
              userType: {
                filter: ['B'],
              },
            });
          }
        }
      });
      that.common.onselect('userType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (orgCode) {
          getOrgRole(that, obj.e, orgCode);
        }
      });
    },
    async init() {
      if (this.$store.getters.operatState == 'add') {
        this.url = this.$urlList.user.create;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'userId',
              value: '',
              label: '用户名',
              span: 6,
              header: '基本信息',
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1110|_',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
                { validator: this.validator.ajaxUserName, trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'userName',
              value: '',
              label: '用户姓名',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111|·，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'idCard',
              value: '',
              label: '身份证号',
              span: 6,
              rule: [{ validator: this.validator.checkIdcard, trigger: 'blur' }],
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
              name: 'orgCode',
              value: '',
              label: '所属机构',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'deptName',
              value: '',
              customOption: {},
              label: '部门',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'userType',
              value: '',
              param: 'T_YHGL_0003',
              label: '用户类型',
              span: 6,
              eventChange: true,
              filter: ['B'],
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'mobile',
              value: '',
              label: '手机号码',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '0010|-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'telephone',
              value: '',
              label: '其他联系方式',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '0010|-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'email',
              value: '',
              label: 'E-mail',
              span: 6,
              rule: [
                { type: 'email', message: '无效的邮箱地址', trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                {
                  type: '1110|.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
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
              type: 'checkbox',
              name: 'roleIds',
              checkboxs: [],
              value: [],
              header: false,
              span: 24,
            },
          ],
        ];
      } else if (this.$store.getters.operatState == 'edit') {
        this.url = this.$urlList.user.update;
        this.arrList = [
          [
            {
              type: 'input',
              name: 'userId',
              value: '',
              label: '用户名',
              span: 6,
              header: '用户管理基本信息',
              disabled: true,
            },
            {
              type: 'input',
              name: 'userName',
              value: '',
              label: '用户姓名',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 50, message: '长度不超过50位', trigger: 'blur' },
                {
                  type: '1111|·，,。.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'idCard',
              value: '',
              label: '身份证号',
              span: 6,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { validator: this.validator.checkIdcard, trigger: 'blur' },
              ],
            },
            {
              type: 'tree',
              treeurl: this.$urlList.common.orgtree,
              treetitle: '机构树',
              eventChange: true,
              defaultProps: {
                children: 'children',
                label: function (a) {
                  return a.params.orgName;
                },
              },
              name: 'orgCode',
              value: '',
              label: '所属机构',
              span: 6,
              disabled: this.$route.query.id == localStorage.getItem('ms_userId'),
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'deptName',
              customOption: {},
              value: '',
              label: '部门',
              span: 6,
              disabled: this.$route.query.id == localStorage.getItem('ms_userId'),
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'userType',
              value: '',
              param: 'T_YHGL_0003',
              label: '用户类型',
              span: 6,
              eventChange: true,
              disabled: this.$route.query.id == localStorage.getItem('ms_userId'),
              filter: ['B'],
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'mobile',
              value: '',
              label: '手机号码',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '0010|-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'telephone',
              value: '',
              label: '其他联系方式',
              span: 6,
              rule: [
                { max: 20, message: '长度不超过20位', trigger: 'blur' },
                {
                  type: '0010|-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'email',
              value: '',
              label: 'E-mail',
              span: 6,
              rule: [
                { type: 'email', message: '无效的邮箱地址', trigger: 'blur' },
                { max: 100, message: '长度不超过100位', trigger: 'blur' },
                {
                  type: '1110|.@#_-',
                  validator: this.validator.comValidate,
                  trigger: 'blur',
                },
              ],
            },
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
              type: 'checkbox',
              name: 'roleIds',
              checkboxs: [],
              value: [],
              header: '角色配置',
              span: 24,
              disabled: this.$route.query.id == localStorage.getItem('ms_userId'),
            },
          ],
        ];
      }
      await getParam(this);
      this.isShowForm = true;
    },
  },
  destroyed: function () {
    orgCode = '';
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
</style>
