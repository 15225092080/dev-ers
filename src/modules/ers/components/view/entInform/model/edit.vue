<template>
  <div>
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="100px">
        <el-button slot="slotBtn"  class="submit_btn" @click="callback('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
import Bus from '@/common/script/bus.js';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      checkTelUrl: '',
      checkEmailUrl: '',
      checkWechatUrl: '',
      checkDingtalkUrl: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      buttonGroup: ['cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.entInform.getValUrl, // 接口
        param: { id: this.$parent.$parent.detailUrl.resId, informConfigId: this.$parent.$parent.paramDetail.id } // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {

  },
  watch: {
  },
  methods: {
    callback(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {'id': this.$parent.$parent.detailUrl.resId});
      this.$refs[formItem].$refs[formItem].validate(valid => {
        if (valid) {
          this.http.apiPost(this.url, param).then(res => {
            this.$store.dispatch('user/setModaltState', '');
            that.common.submitMsg(res).then(() => {
              Bus.$emit('econfig');
              that.$parent.$parent.$refs.dataTable.getTableData();
              this.$refs.formItem.close();
            });
          });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    // 将值为null的字段进行清空
    clearChar() {
      let arr = this.$refs.formItem.formItem;
      for (var i in arr) {
        // eslint-disable-next-line no-eq-null
        if (arr[i] == null) {
          this.$refs.formItem.formItem[i] = '';
        }
      }
    },
    // 校验手机号的唯一性
    telephoneVerify(rule, value, callback) {
      let param = this.$refs.formItem.formItem;
      this.http.apiPost(this.checkTelUrl, param).then(res => {
        if (res == '0') {
          callback(new Error('手机号已存在'));
        } else {
          this.clearChar();
          callback();
        }
      });
    },
    // 校验邮箱的唯一性
    emailVerify(rule, value, callback) {
      let param = this.$refs.formItem.formItem;
      this.http.apiPost(this.checkEmailUrl, param).then(res => {
        if (res == '0') {
          callback(new Error('邮箱已存在'));
        } else {
          this.clearChar();
          callback();
        }
      });
    },
     // 校验微信号的唯一性
    wechatVerify(rule, value, callback) {
      let param = this.$refs.formItem.formItem;
      this.http.apiPost(this.checkWechatUrl, param).then(res => {
        if (res == '0') {
          callback(new Error('微信号已存在'));
        } else {
          this.clearChar();
          callback();
        }
      });
    },
     // 校验钉钉的唯一性
    dingtalkVerify(rule, value, callback) {
      let param = this.$refs.formItem.formItem;
      this.http.apiPost(this.checkDingtalkUrl, param).then(res => {
        if (res == '0') {
          callback(new Error('钉钉已存在'));
        } else {
          this.clearChar();
          callback();
        }
      });
    },
    // 监听下拉框事件
    init() {
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.entInform.addInformUser;
        this.checkTelUrl = this.$urlList.entInform.addCheckPhone;
        this.checkEmailUrl = this.$urlList.entInform.addCheckEmail;
        this.checkWechatUrl = this.$urlList.entInform.addCheckWechat;
        this.checkDingtalkUrl = this.$urlList.entInform.addCheckDingtalk;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'userName',
              value: '',
              label: '姓名',
              span: 12,
              rule: [
                {max: 30, message: '最多30位', trigger: 'blur'}
              ]
            },
            {type: 'select',
              name: 'userSex',
              value: '',
              label: '性别',
              customOption: { '男': '男', '女': '女' },
              span: 12
            }
          ],
          [
            {type: 'input',
              name: 'deptName',
              value: '',
              label: '所属部门',
              span: 12,
              rule: [
                {max: 30, message: '最多30位', trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'telephone',
              value: '',
              label: '手机号',
              span: 12,
              rule: [
                {validator: this.validator.mobileverific, trigger: 'blur'},
                {validator: this.telephoneVerify, trigger: 'blur'},
                {max: 11, message: '最多11位', trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'email',
              value: '',
              label: '邮箱',
              span: 12,
              rule: [
                {validator: this.validator.email, trigger: 'blur'},
                {validator: this.emailVerify, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'wechat',
              value: '',
              label: '微信号',
              span: 12,
              rule: [
                {max: 255, message: '最多255位', trigger: 'blur'},
                {validator: this.wechatVerify, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'dingtalk',
              value: '',
              label: '钉钉',
              span: 12,
              rule: [
                {max: 255, message: '最多255位', trigger: 'blur'},
                {validator: this.dingtalkVerify, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'informConfigId',
              value: this.$parent.$parent.paramDetail.id,
              label: '',
              span: 12,
              hide: true,
              noReset: true
            }
          ]
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.entInform.updateInformUser;
        this.checkTelUrl = this.$urlList.entInform.updateCheckPhone;
        this.checkEmailUrl = this.$urlList.entInform.updateCheckEmail;
        this.checkWechatUrl = this.$urlList.entInform.updateCheckWechat;
        this.checkDingtalkUrl = this.$urlList.entInform.updateCheckDingtalk;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'userName',
              value: '',
              label: '姓名',
              span: 12,
              rule: [
                {max: 30, message: '最多30位', trigger: 'blur'}
              ]
            },
            {type: 'select',
              name: 'userSex',
              value: '',
              label: '性别',
              customOption:{'男': '男', '女': '女'},
              span: 12
            }
          ],
          [
            {type: 'input',
              name: 'deptName',
              value: '',
              label: '所属部门',
              span: 12,
              rule: [
                {max: 30, message: '最多30位', trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'telephone',
              value: '',
              label: '手机号',
              span: 12,
              rule: [
                {validator: this.validator.mobileverific, trigger: 'blur'},
                {validator: this.telephoneVerify, trigger: 'blur'},
                {max: 11, message: '最多11位', trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'email',
              value: '',
              label: '邮箱',
              span: 12,
              rule: [
                {validator: this.validator.email, trigger: 'blur'},
                {validator: this.emailVerify, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'wechat',
              value: '',
              label: '微信号',
              span: 12,
              rule: [
                {max: 255, message: '最多255位', trigger: 'blur'},
                {validator: this.wechatVerify, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'dingtalk',
              value: '',
              label: '钉钉',
              span: 12,
              rule: [
                {max: 255, message: '最多255位', trigger: 'blur'},
                {validator: this.dingtalkVerify, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'informConfigId',
              value: this.$parent.$parent.paramDetail.id,
              label: '',
              span: 12,
              hide: true,
              noReset: true
            },
            {type: 'input',
              name: 'orgEntity',
              value: this.$parent.$parent.paramDetail.orgEntity,
              label: '',
              span: 12,
              hide: true,
              noReset: true
            },
            {type: 'input',
              name: 'switchStatus',
              value: this.$parent.$parent.paramDetail.switchStatus,
              label: '',
              span: 12,
              hide: true,
              noReset: true
            }
          ]
        ];
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>

</style>
