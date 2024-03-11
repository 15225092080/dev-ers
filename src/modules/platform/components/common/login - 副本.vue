<template>
    <div class="login-wrap">
        <div class="login-header">
            <div class="login-logo"></div>
        </div>
        <el-row :gutter="20">
            <el-col :span="14" :offset="2">
                <div class="login-icon" v-bind:style="{width: iconWidth,height:iconHeight}"></div>
            </el-col>
            <el-col :span="8">
                <div class="ms-login">
                    <div class="ms-title">用户登录</div>
                    <el-form :model="formItem" :rules="rules" ref="formItem" label-width="0px" class="ms-content">
                        <el-form-item prop="username">
                            <el-input v-model="formItem.username" placeholder="请输入用户名">
                                <el-button tabindex="-1" slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" v-model="formItem.password">
                                <el-button tabindex="-1" slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha" v-if="verificationMode.image">
                            <el-row>
                                <el-col :span="14">
                                    <div class="login-captcha">
                                        <el-input placeholder="请输入验证码" v-model="formItem.captcha"
                                            @keyup.enter.native="submitForm('formItem')" class="inputWidth">
                                            <el-button tabindex="-1" slot="prepend" icon="el-icon-lx-comment">
                                            </el-button>
                                        </el-input>
                                    </div>
                                </el-col>&nbsp;&nbsp;
                                <el-col :span="7" :offset="1">
                                    <div class="login-captcha-img">
                                        <img @click="changeImgCode" :src="captchaId" alt="验证码">
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item v-if="verificationMode.sms" prop="sms">
                            <el-row>
                                <el-col :span="14">
                                    <div class="login-sms">
                                        <el-input placeholder="请输入短信验证码" v-model="formItem.sms"
                                            @keyup.enter.native="submitForm('formItem')">
                                            <el-button tabindex="-1" slot="prepend" icon="el-icon-mobile-phone">
                                            </el-button>
                                        </el-input>
                                    </div>
                                </el-col>&nbsp;&nbsp;
                                <el-col :span="7" :offset="1">
                                    <el-button type="primary" style="margin-right:5px" :disabled="smsDisabled"
                                        tabindex="-1" @click="validateBtn('smsDisabled','smsContent')">
                                        <span>{{smsContent}}</span>
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item v-if="verificationMode.email" prop="email">
                            <el-row>
                                <el-col :span="14">
                                    <div class="login-email">
                                        <el-input placeholder="请输入邮箱验证码" v-model="formItem.email"
                                            @keyup.enter.native="submitForm('formItem')">
                                            <el-button tabindex="-1" slot="prepend" icon="el-icon-message"></el-button>
                                        </el-input>
                                    </div>
                                </el-col>&nbsp;&nbsp;
                                <el-col :span="7" :offset="1">
                                    <el-button type="primary" style="margin-right:5px" :disabled="emailDisabled"
                                        @click="validateBtn('emailDisabled','emailContent')" tabindex="-1">
                                        <span>{{emailContent}}</span>
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item v-if="verificationMode.face" prop="face">
                            <el-row>
                                <el-col :span="14">
                                    <div class="login-face">
                                        <!-- <el-input
                      placeholder="请输入指纹"
                      v-model="formItem.face"
                      @keyup.enter.native="submitForm('formItem')"
                    >-->
                                        <el-button tabindex="-1" slot="prepend" icon="el-icon-message"></el-button>
                                        <!-- </el-input> -->
                                        <el-button tabindex="-1" type="primary" style="margin-right:5px"
                                            @click="faceBtn('face')">脸部识别</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item v-if="verificationMode.fingerprint" prop="fingerprint">
                            <el-row>
                                <el-col :span="14">
                                    <div class="login-fingerprint">
                                        <!-- <el-input
                      placeholder="请输入指纹"
                      v-model="formItem.fingerprint"
                      @keyup.enter.native="submitForm('formItem')"
                    >-->
                                        <el-button tabindex="-1" slot="prepend" icon="el-icon-message"></el-button>
                                        <!-- </el-input> -->
                                        <el-button tabindex="-1" type="primary" style="margin-right:5px"
                                            @click="faceBtn('fingerprint')">指纹识别</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm('formItem')">登 录</el-button>
                        </div>
                        <!--<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <!-- <el-dialog
      :title="faceTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      custom-class="model-dialog el-dialog-xs"
    >
        <span slot="title" class="clearfix">
            <span class="dialog-title">{{faceTitle}}</span>
            <span class="dialog-title-bg"></span>
        </span>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
        <!-- <div class="login-footer">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</div> -->
    </div>
</template>

<script>
    import md5 from "js-md5";
    export default {
        data: function () {
            return {
                mac: '',
                smsDisabled: false,
                emailDisabled: false,
                iconWidth: window.innerWidth * 0.4 + "px",
                iconHeight: window.innerHeight * 0.7 + "px",
                captchaId: "",
                paramData: "",
                smsContent: "发送验证码",
                emailContent: "邮箱验证码",
                smsTotalTime: 60,
                // verificationMode: {},
                verificationMode: {
                    fingerprint: false,
                    face: false,
                    email: false,
                    sms: false,
                    image: true
                },
                formItem: {
                    username: "",
                    password: "",
                    captcha: "",
                    captchaId: "",
                    mode: "PASSWORD",
                    needPWD: true,
                    sms: "",
                    email: ""
                },
                rules: {
                    username: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }],
                    captcha: [{
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }],
                    sms: [{
                            required: true,
                            message: "请输入短信验证码",
                            trigger: "blur"
                        },
                        {
                            validator: this.numberSms,
                            trigger: "blur"
                        }
                    ],
                    email: [{
                            required: true,
                            message: "请输入邮箱验证码",
                            trigger: "blur"
                        },
                        {
                            validator: this.numberSms,
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        methods: {
            getLoginType() {
                this.http
                    .apiPost(this.$urlList.login.getLoginType)
                    .then(res => {
                        this.verificationMode = res;
                        if (this.verificationMode.image) {
                            this.changeImgCode();
                        }
                    });
            },
            faceBtn(isMode) {
                if (isMode == "face") {
                    this.alertBtn('脸部识别', '脸部识别')

                } else {
                    this.alertBtn('<strong>这是 <i class="DHCiconfont">&#xe668;</i> 片段</strong>', '指纹认证')
                }
            },
            alertBtn(text, title) {
                this.$alert(text, title, {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                    showConfirmButton: false,
                    center: true,
                    callback: action => {}
                });
            },
            handleClose() {},
            validateBtn(isDisabled, isContent) {
                if (this.formItem.username) {
                    let paramData = {
                        userName: this.formItem.username
                    };
                    this.countDown(isDisabled, isContent);
                    // this.http
                    //     .apiPost(url, paramData)
                    //     .then(res => {
                    //         if ("00000000" == res.code) {
                    //             this.$message({
                    //                 message: res.msg,
                    //                 type: "success",
                    //                 duration: "2000"
                    //             });
                    //             this.countDown(isDisabled, isContent)
                    //         } else {
                    //             this.$message.error(res.msg);
                    //         }
                    //     });
                } else {
                    this.$message.error("请输入用户名");
                }
            },
            countDown(isDisabled, isContent) {
                var num = 60;
                this[isDisabled] = true;
                var self = this;
                var timer = setInterval(function () {
                    if (num == 0) {
                        self[isDisabled] = false;
                        self[isContent] = "重新发送";
                        clearInterval(timer);
                    } else {
                        num--;
                        self[isContent] = num + "s后重新发送";
                    }
                }, 1000);
            },
            changeImgCode() {
                var urlList = this.$urlList;
                this.captchaId = md5(Math.random() + "" + new Date().getTime());
                this.formItem.captchaId = this.captchaId;
                this.captchaId = urlList.login.imgCode + "?captchaId=" + this.captchaId;
            },
            submitForm(formItem) {
                var urlList = this.$urlList;
                let paramData = this.formItem;
                this.$refs[formItem].validate(valid => {
                    if (valid) {
                        let realmIp = window.location.host;
                        realmIp = realmIp.split(":")[0];
                        paramData.realmIp = realmIp;
                        paramData.password = md5(paramData.password);
                        if (this.mac) {
                            paramData.mac = this.mac;
                        }
                        this.http.apiPost(urlList.login.login, paramData).then(res => {
                            // data.code 1 成功非首次,2 成功首次,3 失败
                            if (res.code == 1) {
                                localStorage.setItem("ms_username", paramData.username);
                                this.$store.commit("loginflag", true);
                                this.$router.push("/");
                            } else if (res.code == 2) {
                                this.$store.commit("increment", false);
                                this.$store.commit("loginflag", false);
                                localStorage.setItem("ms_username", paramData.username);
                                this.$router.push("/changePassword");
                            } else {
                                this.$message.error(res.msg);
                                if (this.verificationMode.image) { //如果登陆方式有验证码时再请求
                                    this.changeImgCode();
                                }
                                if (res.msg != "验证码错误") {
                                    this.formItem.username = "";
                                }
                                this.formItem.password = "";
                                this.formItem.captcha = "";
                            }
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: "验证不通过，提交失败",
                            type: "warning"
                        });
                        return false;
                    }
                });
            },
            //
            /*submitForm(formName) {
                        console.log(formName);
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                localStorage.setItem('ms_username', this.ruleForm.username);
                                this.$router.push('/');
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    }*/
            isIE() {
                //ie    支持到ie11
                if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
                else return false;
            },
            MacInfo() {
                if (this.isIE()) {
                    var locator = new ActiveXObject("WbemScripting.SWbemLocator");
                    var service = locator.ConnectServer(".");
                    var properties = service.ExecQuery(
                        "Select * from Win32_NetworkAdapterConfiguration Where IPEnabled =True");
                    var e = new Enumerator(properties); {
                        var p = e.item();
                        var mac = p.MACAddress;
                        mac = mac.replace(/\:/g, '-')
                        this.mac = mac;
                        sessionStorage.setItem('mac', mac);
                    }
                }
            }
        },
        created() {
            this.getLoginType();
            this.MacInfo();
            //  this.changeImgCode();
        }
    };

</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../../../assets/images/platform/login/back_1.png);
        background-size: cover;
        overflow: hidden;
    }

    .login-header {
        padding: 10px 0;
        height: 44px;
        background: url(../../../../assets/images/platform/login/header_background4.png);
        background-size: 100% 100%;
    }

    .login-logo {
        height: 44px;
        width: 30%;
        background: #3075c7 url(../../../../assets/images/platform/login/logo2.png) no-repeat right center;
    }

    .login-icon {
        width: 50%;
        height: 50%;
        margin-top: 20px;
        background: transparent url(../../../../assets/images/platform/login/jr1.png) no-repeat center center;
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #333;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        width: 350px;
        margin-top: 150px;
        border-radius: 5px;
        background-color: #fff;
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .el-form-item--small .el-form-item__error {
        padding-top: 2px;
        margin-left: 50px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }

    .login-footer {
        position: absolute;
        margin: 0 auto 0 60px;
        width: 100%;
        color: #fff;
        z-index: 999;
        text-align: left;
        font-size: 20px;
        bottom: 20px;
    }

</style>
