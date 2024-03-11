<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :close-on-click-modal="false"
             width="600px"
             @close="closeDialog('form')"
             custom-class="model-dialog el-dialog-xs">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <v-form ref="formItem"
            :arrList="arrList"
            :isBtnShow="isBtnShow"
            labelWidth="90px"
            class="ms-content">
      <el-button class="submit_btn"
                 slot="slotBtn"
                 @click="submitForm('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
    </v-form>

    <!-- <v-form ref="formItem" v-bind:arrList="arrList" labelWidth="110px">
        <el-button slot="slotBtn" @click="submitForm('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
    </v-form> -->
  </el-dialog>
</template>
<script>
import { sha256 } from 'js-sha256';
export default {
  name: 'child',
  components: {},
  data() {
    return {
      centerDialogVisible: true,
      arrList: [],
      title: '修改密码',
      formItem: {},
      passwordRuleUrl: this.$commonUrl.user.getConfigValue,
      isBtnShow: {
        closeBtn: true,
      },
    };
  },
  props: {
    param: {
      type: Object,
    },
  },
  methods: {
    submitForm(formItem) {
      let that = this;
      let param = { userId: localStorage.getItem('ms_userId') };
      this.$refs[formItem].$refs[formItem].validate((valid) => {
        if (valid) {
          param.oldPwd = sha256(this.$refs[formItem].formItem.oldPwd);
          param.newPwd = sha256(this.$refs[formItem].formItem.newPwd);
          param.pwd = sha256(this.$refs[formItem].formItem.pwd);
          this.http.apiPost(this.$commonUrl.user.updatePwd, param).then((res) => {
            if (res.code == 0) {
              this.$parent.visibleEdit = false;
              that.common.submitMsg(res);
            } else {
              this.$refs[formItem].formItem.newPwd = '';
              this.$refs[formItem].formItem.pwd = '';
              that.common.message(true, res.message, 'error', '800', function () {
                return false;
              });
            }
          });
        } else {
          this.$refs[formItem].formItem.newPwd = '';
          this.$refs[formItem].formItem.pwd = '';
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    init() {
      this.arrList = [
        [
          {
            type: 'password',
            name: 'oldPwd',
            value: '',
            label: '旧密码',
            span: 23,
            rule: [
              { required: true, message: '输入不能为空', trigger: 'blur' },
              {
                type: { url: this.$commonUrl.user.checkPwd },
                validator: this.validator.checkPwdOld,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'password',
            name: 'newPwd',
            value: '',
            label: '新密码',
            span: 23,
            rule: [
              { required: true, message: '输入不能为空', trigger: 'blur' },
              {
                min: 8,
                message: '密码长度应大于8位，请重新输入',
                trigger: 'blur',
              },
              {
                max: 16,
                message: '密码长度应小于16位，请重新输入',
                trigger: 'blur',
              },
              {
                type: this,
                validator: this.validator.checkPasswordByRule,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'password',
            name: 'pwd',
            value: '',
            label: '确认密码',
            span: 23,
            rule: [
              { required: true, message: '输入不能为空', trigger: 'blur' },
              {
                min: 8,
                message: '密码长度应大于8位，请重新输入',
                trigger: 'blur',
              },
              {
                max: 16,
                message: '密码长度应小于16位，请重新输入',
                trigger: 'blur',
              },
              {
                type: this,
                validator: this.validator.checkPasswordByRule,
                trigger: 'blur',
              },
            ],
          },
        ],
      ];
    },
  },
  created() {
    // 获取密码校验规则
    this.common.getPasswordRule(this.passwordRuleUrl);
    this.init();
  },
  mounted() {},
};
</script>
<style scoped>
.LoginStyle {
  margin-top: 15px;
}
.ms-content >>> .el-row .el-form-item--small.el-form-item {
  margin-bottom: 20px;
}
.ms-content >>> .form-footer .el-form-item--small.el-form-item {
  margin-bottom: 17px;
}
.ms-content >>> .form-body {
  padding-bottom: 20px;
}
</style>
