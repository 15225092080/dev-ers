<template>
  <div class="login-wrap">
    <!-- <div class="login-header">
            <div class="login-logo"></div>
        </div> -->
    <v-bg></v-bg>
    <div class="login-main">
      <el-row>
        <el-col :span="4"
                :offset="10">
          <el-form :model="formItem"
                   @submit.native.prevent
                   :rules="rules"
                   ref="formItem"
                   label-width="0px"
                   class="ms-content LoginStyle">
            <el-form-item prop="newPwd">
              <el-input type="password"
                        v-model="formItem.newPwd"
                        placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input type="password"
                        @keyup.enter.native="submitLeft('formItem')"
                        v-model="formItem.pwd"
                        placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
              <p class="submitLeft"><i @click="submitLeft('formItem')"
                   class="icon DHCiconfont DHC-tiaozhuan-denglu"></i></p>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="login-footer">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</div> -->
  </div>
</template>

<script>
import { sha256 } from 'js-sha256';
import vBg from './vBackground';
export default {
  components: {
    vBg,
  },
  data() {
    return {
      formItem: {
        newPwd: '',
        pwd: '',
      },
      passwordRuleUrl: this.$urlList.user.getConfigValue,
      rules: {
        newPwd: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 8, message: '密码长度应大于8位，请重新输入', trigger: 'blur' },
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
        pwd: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { min: 8, message: '密码长度应大于8位，请重新输入', trigger: 'blur' },
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
    };
  },
  methods: {
    submitLeft(formItem) {
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          let param = {
            userId: localStorage.getItem('ms_userId'),
            newPwd: sha256(this.formItem.pwd),
          };
          this.http
            .apiPost(this.$urlList.user.changePwd, param, {
              showLoading: true,
            })
            .then((res) => {
              if (res.code == 0) {
                let jsonData = JSON.parse(this.$store.getters.getLoginStatus);
                if (jsonData.todayFirst) {
                  // 当天首次登录 true跳转通知页 false不跳转通知页
                  this.$router.push('notice');
                } else if (jsonData.jumpFrame == 'homePage' || jsonData.jumpFrame == '/homePage') {
                  //  判断跳转如果跳转首页 用路由跳转
                  this.$router.push('homePage');
                } else if (jsonData.jumpFrame) {
                  // 跳转项目首页 因为是分模块打包 所以用window.location.href 跳转；
                  window.location.href = '#/' + jsonData.jumpFrame;
                }
              } else {
                this.formItem.newPwd = '';
                this.formItem.pwd = '';
                this.$message.error(res.message);
              }
            });
        } else {
          this.formItem.newPwd = '';
          this.formItem.pwd = '';
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
  },
  created() {
    // 获取密码校验规则
    this.common.getPasswordRule(this.passwordRuleUrl);
  },
};
</script>

<style scoped>
.login-main {
  height: 100%;
}
.login-wrap {
  background: none;
  height: 100%;
}
.LoginStyle {
  margin-top: 300px;
}
.userItem {
  position: relative;
}
.userItemImg {
  position: absolute;
  top: 5px;
  right: 3px;
}
.userItemButton {
  position: absolute;
  top: 5px;
  right: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
}
.submitLeft {
  width: 25px;
  margin: 0 auto;
}
.submitLeft i {
  font-size: 25px;
}
.el-form-item--small.el-form-item {
  margin-top: 30px;
}
</style>
