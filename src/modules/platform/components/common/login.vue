<template>
  <div class="ui-login-wrap">
    <div class="login-top"> </div>
    <section class="login-center">
      <el-form :model="formItem"
               @submit.native.prevent
               :rules="rules"
               ref="formItem"
               label-width="0px"
               class="login-form-wrap">
        <div class="login-main">
          <p class="login-title">征信平台管理系统</p>
          <section class="main-wrap">
            <el-form-item prop="userId"
                          class="form-item">
              <div class="item-wrap">
                <i class="icon DHCiconfont DHC-yonghu"></i>
                <el-input ref="userName"
                          @keydown.tab.native.prevent="onKeydown"
                          @keyup.enter.native="verificationShow('formItem',$event)"
                          v-model="formItem.userId"
                          placeholder="请输入用户名"></el-input>
                <!--  @blur="verificationShow('formItem')" -->
                <!--<transition name="el-fade-in-linear">
                <i v-if="!verificationMode"
                   class="user-item-icon DHCiconfont DHC-tiaozhuan-denglu"></i>
                @click="verificationShow('formItem')"
              </transition>-->
              </div>
            </el-form-item>
            <el-collapse-transition>
              <div class="form-bottom-wrap">
                <template v-for="(val,index) of loginModel">
                  <el-form-item class="form-item"
                                v-if="isShowLoginModel[val.checkType] == 'true'"
                                :key="index"
                                :prop="val.prop">
                    <div class="item-wrap">
                      <i class="icon DHCiconfont"
                         :class="'DHC-'+val.icon"></i>
                      <el-input :type="val.inputType"
                                @blur="val.eventBlur"
                                :ref="'index'+index"
                                :autocomplete="val.autocomplete"
                                @keyup.enter.native="val.bindEnter ? submitLogin('formItem') :false"
                                v-if="val.element.input"
                                v-model="formItem[val.prop]"
                                :placeholder="val.place"
                                :show-password="val.showPassword"
                                :class="{'input-code':val.element.button && isShowLoginModel[val.checkType] == 'true'}"></el-input>
                      <el-button tabindex="-1"
                                 v-if="val.element.button && isShowLoginModel[val.checkType] == 'true'"
                                 :disabled="val.btnDisabled"
                                 @click="getVerificationCode(val)"
                                 :size="val.btnSize"
                                 class="item-button"
                                 round>{{val.btnText}}</el-button>
                    </div>
                    <p v-if="checkShow"
                       style="font-size:13px;"
                       class="el-form-item__error">{{checkText}}</p>
                  </el-form-item>
                </template>
                <el-form-item>
                  <div @click="submitLogin('formItem')"
                       class="submit-btn">登 录</div>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </section>
        </div>
      </el-form>
    </section>
    <footer class="login-bottom">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</footer>
  </div>
</template>

<script>
import { sha256 } from 'js-sha256';
import vBg from './vBackground';
import Bus from '@/common/script/bus';
export default {
  components: {
    vBg,
  },
  data: function () {
    var checkuserId = (rule, value, callback) => {
      this.http
        .apiGet(this.$commonUrl.login.getLoginType, {
          params: { userId: value },
        })
        .then((res) => {
          if (res.code == 0) {
            callback();
            this.isLogin = false;
            // res.data = {
            //   PASSWORD: 'true', // 密码 true有对应的登录方式，false没有对应的登录方式
            //   FINGER: 'true', // 指纹
            //   PHONE: 'true', // 短信
            //   EMAIL: 'false', // 邮件
            // };
            this.loginTypeFinger = res.data.FINGER;
            let jumpFinger = false;
            for (var k in res.data) {
              if (res.data.FINGER == 'true') {
                if (k != 'FINGER' && res.data[k] == 'true') {
                  jumpFinger = false;
                  break;
                } else {
                  jumpFinger = true;
                }
              }
            }
            //   判断是否有密码短信邮件，没有对应的登录方式直接跳转指纹页
            if (jumpFinger) {
              this.$router.push('checkFingerprint');
            }
            this.isShowLoginModel = res.data;
            this.verificationMode = true;
            this.$nextTick(() => {
              this.$refs.index0[0].$refs.input.focus();
            });
            this.loginType = Object.keys(res.data).filter((item) => res.data[item] === 'true');
          } else {
            callback(new Error(res.message));
            this.isLogin = res.message;
          }
        });
    };
    return {
      formItem: {
        userId: '',
        userPwd: '',
      },
      checkShow: false, // 密码框的是否显示
      checkText: '', // 校验密码框的文字
      verificationMode: false, // 验证方式默认隐藏
      isShowLoginModel: { PASSWORD: 'true', FINGER: 'false', PHONE: 'false', EMAIL: 'false' },
      // { PASSWORD: 'true', FINGER: 'false', PHONE: 'false', EMAIL: 'true' }
      isLogin: true, // 用户名请求出错 值为true，成功为false。 为false的时候调用登录接口
      loginModel: [
        {
          place: '请输入密码',
          prop: 'userPwd',
          inputType: 'password',
          autocomplete: 'new-password', // 禁止浏览器记住密码行为
          element: {
            input: 'input',
          },
          showPassword: true,
          eventBlur: this.blurPwd,
          bindEnter: true,
          checkType: 'PASSWORD',
          icon: 'mima',
        },
        {
          place: '请输入邮箱验证码',
          prop: 'email',
          inputType: 'input',
          element: {
            input: 'input',
            button: 'button',
          },
          btnDisabled: false,
          btnText: '获取验证码',
          btnSize: 'size',
          checkType: 'EMAIL',
          icon: 'youxiangpeizhi',
        },
        {
          place: '请输入短信验证码',
          prop: 'captcha',
          inputType: 'input',
          element: {
            input: 'input',
            button: 'button',
          },
          btnDisabled: false,
          btnText: '获取验证码',
          btnSize: 'size',
          checkType: 'PHONE',
          icon: 'shouji',
        },
      ],
      rules: {
        userId: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
          },
          {
            validator: checkuserId,
            trigger: 'blur',
          },
        ],
        userPwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        captcha: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
          {
            type: '0010',
            validator: this.validator.comValidate,
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
      loginType: '',
    };
  },
  methods: {
    blurPwd() {
      this.checkShow = false;
      this.checkText = '';
    },
    onKeydown(e) {
      this.verificationShow('formItem', e);
      return false;
    },
    /*
     * username离开焦点事件
     */
    verificationShow(formItem, e) {
      if (e && (e.keyCode == '13' || e.keyCode == '9')) {
        this.$refs.userName.blur();
      }
      // let _this = this;
      // if(this.formItem.userId == ''){
      //     return;
      // }
      // this.http.apiGet(this.$urlList.login.getLoginType,{
      //     params: {
      //         userId:this.formItem.userId
      //     }
      // }).then(res => {
      //     if(res.code == 0){
      //         this.isLogin = false;
      //         /**
      //          *  "PASSWORD": "true",  密码 true有对应的登录方式，false没有对应的登录方式
      //             "FINGER": "false",  指纹
      //             "PHONE": "false",   短信
      //             "EMAIL": "false"    邮件
      //         */
      //         let jumpFinger = false;
      //         for(var k in res.data){
      //             if(res.data['FINGER'] == 'true'){
      //                 if(k != 'FINGER' && res.data[k] == 'true'){
      //                     jumpFinger = false;
      //                     break;
      //                 }else{
      //                     jumpFinger = true;
      //                 }
      //            }
      //         }
      //         //   判断是否有密码短信邮件，没有对应的登录方式直接跳转指纹页
      //        if(jumpFinger){
      //            this.$router.push('checkFingerprint')
      //        }
      //         this.isShowLoginModel = res.data;
      //         this.verificationMode = true;
      //         this.$nextTick(()=>{
      //             this.$refs['index0'][0].$refs['input'].focus();
      //         })
      //     }else{
      //         this.isLogin = res.message;
      //         this.common.MessageBoxalert(res.message,'消息',"确认",'error','center', function () {
      //             _this.$refs.userName.$refs['input'].focus();
      //         });
      //     }
      // })
    },
    // 判断当前部署方式：分布式为0，微服务为1
    getServerType() {
      this.http.apiGet(this.$urlList.common.config).then((res) => {
        sessionStorage.setItem('serverType', JSON.stringify(res.data));
      });
    },
    getVerificationCode(val) {
      // 发送验证码
      var num = 60;
      val.btnDisabled = true;
      val.btnText = '60s后重新发送';
      var timer = setInterval(function () {
        if (num == 0) {
          val.btnDisabled = false;
          val.btnText = '重新发送';
          clearInterval(timer);
        } else {
          num--;
          val.btnText = num + 's后重新发送';
        }
      }, 1000);
    },
    submitLogin(formItem) {
      // isLogin 有值的时候用户名校验失败，存了一下失败原因
      // if(this.isLogin){
      //     this.$message.error(this.isLogin)
      //     return;
      // }
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          let paramData = this.formItem;
          paramData.userPwd = sha256(paramData.userPwd);
          paramData.loginType = this.loginType[0];
          this.http
            .apiPost(this.$commonUrl.login.login, paramData, {
              showLoading: true,
            })
            .then((res) => {
              // 校验指纹 res.code  000001:跳转指纹页指纹页 否则不跳指纹验证页；
              this.checkShow = false;
              this.checkText = '';
              if (res.code == 0) {
                localStorage.setItem('ms_userId', res.data.userId);
                localStorage.setItem('ms_username', res.data.userName);
                sessionStorage.setItem('systemId', res.data.jumpSystemId);
                Bus.$emit('sysNo', sessionStorage.getItem('systemId'));
                this.$store.dispatch('user/setLoginStatus', res.data);
                this.$store.dispatch('user/setToken', res.data.token);
                sessionStorage.setItem('userData', JSON.stringify(res.data));
                if (this.loginTypeFinger == 'true') {
                  this.$router.push('checkFingerprint');
                } else if (res.data.isResetPwd) {
                  this.$router.push('changePwd');
                } else if (res.data.todayFirst) {
                  // 当天首次登录 true跳转通知页 false不跳转通知页
                  this.$router.push('notice');
                } else if (res.data.jumpFrame == 'homePage' || res.data.jumpFrame == '/homePage') {
                  //  判断跳转如果跳转首页 用路由跳转
                  this.$router.push('homePage');
                } else if (res.data.jumpFrame) {
                  // 跳转项目首页 因为是分模块打包 所以用window.location.href 跳转；
                  window.location.href = '#/' + res.data.jumpFrame;
                }
              } else {
                this.formItem.userPwd = '';
                this.checkShow = true;
                this.checkText = res.message;
                // this.$message.error(res.message);
              }
            });
        } else {
          // this.common.message(true, "验证不通过，提交失败", "warning", "800", function () {
          //     return false;
          // });
        }
      });
    },
  },
  created() {
    // 判断当前部署方式：分布式为0，微服务为1
    this.getServerType();
  },
};
</script>

<style scoped lang="less">
.ui-login-wrap {
  min-width: 1000px;
  min-height: 550px;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .login-top {
    width: 100%;
    height: 15%;
    background: url(../../../../assets/images/platform/login/logo.png) no-repeat 25vh center;
  }
  .login-center {
    position: relative;
    width: 100%;
    height: 75%;
    background: url(../../../../assets/images/platform/login/login_bg.png) no-repeat center center/100% 100%;
    .login-form-wrap {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(188, 219, 241, 0.7);
      border-radius: 16%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .login-main {
        display: flex;
        flex-direction: column;
        width: 100%;
        .login-title {
          color: #333;
          font-size: 210%;
          margin: 4px 0 30px 0;
          text-align: center;
          flex: auto;
        }
        .main-wrap {
          display: flex;
          flex-direction: column;
          flex: auto;
          width: 100%;
        }
        .form-bottom-wrap {
          display: flex;
          flex-direction: column;
          flex: auto;
        }
        .form-item {
          padding-bottom: 4px;
          .item-wrap {
            position: relative;
            display: flex;
            .icon {
              width: 36px;
              line-height: 36px;
              font-size: 34px;
              background: #eee;
              border-right: 0;
              color: #777;
            }
            /deep/ .el-input--small {
              width: calc(100% -36px);
            }
            /deep/ .el-input--small .el-input__inner {
              width: 100%;
              line-height: 36px;
              height: 36px;
              border-radius: 0;
              font-size: 120%;
            }
            /deep/ .input-code.el-input--small .el-input__inner {
              padding-right: 122px;
            }
            .user-item-icon {
              position: absolute;
              right: 2px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 25px;
              color: #949494;
              cursor: pointer;
            }
            .item-button {
              position: absolute;
              top: 50%;
              right: 3px;
              transform: translateY(-50%);
              cursor: pointer;
              padding: 6px 10px;
              border-radius: 6px;
              background: #8080ff;
              color: #fff;
            }
          }
        }
        .submit-btn {
          background: #3075c8;
          color: #fff;
          font-size: 120%;
          text-align: center;
          line-height: 38px;
          width: 100%;
          margin-bottom: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .login-bottom {
    width: 100%;
    color: #a8a3a3;
    text-align: center;
    flex: auto;
    font-size: 150%;
    line-height: 3;
  }
}
@media screen and (max-width: 1280px) {
  .ui-login-wrap {
    font-size: 10px;
    .login-form-wrap {
      width: 320px;
      height: 320px;
      padding: 36px;
      .login-title {
        margin-bottom: 22px !important;
      }
      .form-item {
        padding-bottom: 0 !important;
      }
    }
  }
}
@media screen and (min-width: 1281px) and (max-width: 1440px) {
  .ui-login-wrap {
    font-size: 12px;
    .login-form-wrap {
      width: 350px;
      height: 350px;
      padding: 38px;
      .login-title {
        margin-bottom: 30px !important;
      }
      .form-item {
        padding-bottom: 4px !important;
      }
    }
  }
}
@media screen and (min-width: 1441px) and (max-width: 1920px) {
  .ui-login-wrap {
    font-size: 14px;
    .login-form-wrap {
      width: 400px;
      height: 400px;
      padding: 45px;
      .login-title {
        margin-bottom: 40px !important;
      }
      .form-item {
        padding-bottom: 6px !important;
      }
    }
  }
}
@media screen and (min-width: 1921px) {
  .ui-login-wrap {
    font-size: 17px;
    .login-form-wrap {
      width: 450px;
      height: 450px;
      padding: 52px;
      .login-title {
        margin-bottom: 50px !important;
      }
      .form-item {
        padding-bottom: 12px !important;
      }
    }
  }
}
</style>
