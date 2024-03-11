import http from "@/common/script/http";
import { sha256 } from "js-sha256";
exports.install = Vue => {
    Vue.prototype.validator = {
        empty: (rule, value, callback) => {
            // 仅验证不能为空
            var reg;
            if (value === null || value == "" || typeof value == "undefined") {
                callback(new Error("输入不能为空"));
                return;
            } else if (Array.isArray(value) && value.length > 0) {
                callback();
            } else {
                if (value.constructor.toString().indexOf("Array") == -1) {
                    reg = value.replace(/(^\s*)|(\s*$)/g, "");
                }
            }
            setTimeout(() => {
                if (!reg) {
                    callback(new Error("输入不能为空"));
                } else {
                    callback();
                }
            }, 100);
        },
        allNumber: (rule, value, callback) => {
            // 判断是否是数字
            var reg = /^[0-9]+$/;
            setTimeout(() => {
                if (!value) {
                    callback(new Error("输入不能为空"));
                }
                if (reg.test(value)) {
                    callback(new Error("输入不能为纯数字"));
                } else {
                    callback();
                }
            }, 100);
        },
        // 数字 大写 小写 中文 不包含特殊字符
        cleanSpelChar: (rule, value, callback) => {
            var reg = /[0-9a-zA-Z]|[\u4e00-\u9fa5]/im;
            setTimeout(() => {
                if (!value) {
                    callback(new Error("输入不能为空"));
                }
                if (!reg.test(value)) {
                    callback(new Error("包含特殊字符"));
                } else {
                    callback();
                }
            }, 100);
        },
        ajaxUserName: (rule, value, callback) => {
            // 用户是否存在
            let paramData = {
                params: {
                    userId: value
                }
            };
            http.apiGet("user/haveUser", paramData).then(res => {
                setTimeout(() => {
                    if (res.data == false) {
                        callback(new Error("用户名已经存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxRoleName: (rule, value, callback) => {
            // 角色是否存在
            let that = rule.type;
            let paramData = {
                params: {
                    roleName: value,
                    roleId: that.$parent.detailUrl.resId
                }
            };
            http.apiGet("role/checkRoleNameExist", paramData).then(res => {
                setTimeout(() => {
                    if (res.data.result === true) {
                        callback(new Error("角色名已经存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxOrgIdCheck: (rule, value, callback) => {
            // 机构是否存在
            let paramData = {
                params: {
                    orgCode: value
                }
            };
            http.apiGet("org/haveOrg", paramData).then(res => {
                setTimeout(() => {
                    if (res.data !== false) {
                        callback(new Error("该代码已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxFinancialOrgCode: (rule, value, callback) => {
            // 金融机构代码是否存在
            let paramData = {
                params: {
                    financialOrgCode: value
                }
            };
            // 取到传过来的this
            let that = rule.type;
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (that.$store.getters.operatState == "add") {
                paramData.params.orgCode = "";
            } else {
                paramData.params.orgCode = that.findById.param.params.orgCode;
            }
            http.apiGet(that.financialOrgCodeUrl, paramData).then(res => {
                setTimeout(() => {
                    if (!res.data) {
                        callback(new Error("该金融机构代码已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxOrgName: (rule, value, callback) => {
            // 机构名称是否存在(机构管理)
            let paramData = {
                params: {
                    OrgName: value
                }
            };
            // 取到传过来的this
            let that = rule.type;
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (that.$store.getters.operatState == "add") {
                paramData.params.orgCode = "";
            } else {
                paramData.params.orgCode = that.findById.param.params.orgCode;
            }
            http.apiGet("org/haveOrgName", paramData).then(res => {
                setTimeout(() => {
                    if (!res.data) {
                        callback(new Error("该机构已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxlegalOrgName: (rule, value, callback) => {
            // 机构名称是否存在(FAREN机构管理)
            let paramData = {
                params: {
                    OrgName: value
                }
            };
            // 取到传过来的this
            let that = rule.type;
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (that.$store.getters.operatState == "add") {
                paramData.params.orgCode = "";
            } else {
                paramData.params.orgCode = that.findById.param.params.orgCode;
            }
            http.apiGet("legalpersonorg/haveOrgName", paramData).then(res => {
                setTimeout(() => {
                    if (!res.data) {
                        callback(new Error("该机构已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        ajaxhaveName: (rule, value, callback) => {
            // 该数据库是否存在
            let paramData = {
                params: {
                    datasourceName: value
                }
            };
            // 取到传过来的this
            let that = rule.type;
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (that.$store.getters.operatState == "add") {
                paramData.params.datasourceId = "";
            } else {
                paramData.params.datasourceId =
                    that.findById.param.params.datasourceId;
            }
            http.apiGet("datasource/haveName", paramData).then(res => {
                setTimeout(() => {
                    if (res.data) {
                        callback(new Error("该数据库已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        checkIdcard: (rule, value, callback) => {
            // 验证身份证
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (!idcardverific(value)) {
                    callback(new Error("请输入正确身份证号 "));
                } else {
                    // let paramData = { id :value };
                    // var urlList = this.$urlList;
                    // var that = this;
                    //     this.http.apiPost(urlList.user.ajaxIdCard, paramData).then(res => {
                    //         console.log(res)
                    //   });
                    callback();
                }
            }, 100);

            function idcardverific(idcard) {
                var re = /^\d{17}([0-9]|X)$/;
                var idcardArray = [];
                if (idcard.length > 0 && idcard !== null) {
                    // 15位身份证号转换18位
                    idcard = idLen15To18(idcard);
                    if (!idcard) {
                        return false;
                    }

                    var Y, JYM;
                    var S, M;

                    idcardArray = idcard.split("");
                    // 先判断18位身份证是否通过基本校验： 如长度 ，每一位是否为整数 以及18位最后一位是否为"X"
                    if (!re.test(idcard)) {
                        return false;
                    }
                    // 再判断18身份证的出生日期与校验位

                    // 判断出生日期是否合法
                    var date =
                        idcard.substr(6, 4) +
                        idcard.substr(10, 2) +
                        idcard.substr(12, 2);

                    if (isDate(date)) {
                        // 计算校验位
                        S =
                            (parseInt(idcardArray[0], 0) +
                                parseInt(idcardArray[10], 0)) *
                                7 +
                            (parseInt(idcardArray[1], 0) +
                                parseInt(idcardArray[11], 0)) *
                                9 +
                            (parseInt(idcardArray[2], 0) +
                                parseInt(idcardArray[12], 0)) *
                                10 +
                            (parseInt(idcardArray[3], 0) +
                                parseInt(idcardArray[13], 0)) *
                                5 +
                            (parseInt(idcardArray[4], 0) +
                                parseInt(idcardArray[14], 0)) *
                                8 +
                            (parseInt(idcardArray[5], 0) +
                                parseInt(idcardArray[15], 0)) *
                                4 +
                            (parseInt(idcardArray[6], 0) +
                                parseInt(idcardArray[16], 0)) *
                                2 +
                            parseInt(idcardArray[7], 0) * 1 +
                            parseInt(idcardArray[8], 0) * 6 +
                            parseInt(idcardArray[9], 0) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";

                        // 判断校验位是否合法
                        M = JYM.substr(Y, 1);
                        if (M == idcardArray[17]) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            function idLen15To18(idcard) {
                /* 每位加权因子 */
                var powers = [
                    "7",
                    "9",
                    "10",
                    "5",
                    "8",
                    "4",
                    "2",
                    "1",
                    "6",
                    "3",
                    "7",
                    "9",
                    "10",
                    "5",
                    "8",
                    "4",
                    "2"
                ];
                /* 第18位校检码 */
                var parityBit = [
                    "1",
                    "0",
                    "X",
                    "9",
                    "8",
                    "7",
                    "6",
                    "5",
                    "4",
                    "3",
                    "2"
                ];
                if (idcard.length == 15) {
                    var id17 =
                        idcard.substring(0, 6) + "19" + idcard.substring(6);
                    var id18 = getParityBit(id17, powers, parityBit);
                    //  if(!field.hasClass("idCard15")){
                    //  field.addClass("idCard15");
                    //  }
                    return id17 + id18;
                } else if (idcard.length == 18) {
                    return idcard;
                } else {
                    return false;
                }
            }

            function isDate(date) {
                var fmt = "yyyyMMdd";
                var yIndex = fmt.indexOf("yyyy");
                if (yIndex == -1) {
                    return false;
                }
                var year = date.substring(yIndex, yIndex + 4);
                var mIndex = fmt.indexOf("MM");
                if (mIndex == -1) {
                    return false;
                }
                var month = date.substring(mIndex, mIndex + 2);
                var dIndex = fmt.indexOf("dd");
                if (dIndex == -1) {
                    return false;
                }
                var day = date.substring(dIndex, dIndex + 2);
                if (!isNumber(year) || year > "2100" || year < "1900") {
                    return false;
                }
                if (!isNumber(month) || month > "12" || month < "01") {
                    return false;
                }
                if (day > getMaxDay(year, month) || day < "01") {
                    return false;
                }
                return true;
            }

            function getMaxDay(year, month) {
                if (month == 4 || month == 6 || month == 9 || month == 11) {
                    return "30";
                }
                if (month == 2) {
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                        return "29";
                    } else {
                        return "28";
                    }
                }
                return "31";
            }

            function getParityBit(id17, powers, parityBit) {
                /* 加权 */
                var power = 0;
                for (var i = 0; i < 17; i++) {
                    power +=
                        parseInt(id17.charAt(i), 10) * parseInt(powers[i], 0);
                }
                /* 取模 */

                var mod = power % 11;
                return parityBit[mod];
            }

            function isNumber(s) {
                var regu = "^[0-9]+$";
                var re = new RegExp(regu);
                if (s.search(re) != -1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        noSpecialCaracters: (rule, value, callback) => {
            // 英文字母或数字校验
            var reg = /^[0-9a-zA-Z]+$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请输入数字或字母"));
                } else {
                    callback();
                }
            }, 100);
        },
        ajaxHaveOrg: (rule, value, callback) => {
            // 法人机构是否存在
            let paramData = {
                params: {
                    orgCode: value
                }
            };
            http.apiGet("legalpersonorg/haveOrg", paramData).then(res => {
                setTimeout(() => {
                    if (res.data) {
                        callback(new Error("该机构内部代码已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        integerverific: (rule, value, callback) => {
            // 整数校验
            var reg = /^[-+]?\d+$/;
            setTimeout(() => {
                if (value == "" || value === null) {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请输入整数"));
                } else {
                    callback();
                }
            }, 100);
        },
        mobileverific: (rule, value, callback) => {
            // 手机号码校验
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请输入正确手机号码"));
                } else {
                    callback();
                }
            }, 100);
        },
        // 自定义校验规则，rule.type为自己配置的校验规则，0为不允许输入，1为允许输入
        // 例如“1111|·，,。.@#_-”，第一位大写字母，第二位小写字母，第三位数字，第四位汉字,|后为需要校验的特殊字符]|后为1的时候所有特殊字符都允许输入
        comValidate: (rule, value, callback) => {
            var alertText = "填写格式为";
            // rule.type为自己配置的校验规则
            var ruleType = rule.type;
            var val = value;
            var pRule;
            var pText = "";
            var pun = "";
            // 判断是否包含特殊字符规则
            if (ruleType.indexOf("|") > -1) {
                var ruleArr = ruleType.split("|");
                if (ruleArr > 2) {
                    pRule = ruleArr[1] + ruleArr[2] + "|";
                } else {
                    pRule = ruleArr[1];
                }
                if (pRule == 1) {
                    pRule = `~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、`;
                    pText = "";
                } else {
                    pText = pRule;
                }
                ruleType = ruleArr[0];
                // 遍历特殊字符，前面添加\
                for (var i = 0; i < pRule.length; i++) {
                    pun += "\\" + pRule.substring(i, i + 1);
                }
            }
            var vObj = {
                en: {
                    str: "A-Z",
                    flag: ruleType.charAt(0),
                    text: "大写字母"
                },
                En: {
                    str: "a-z",
                    flag: ruleType.charAt(1),
                    text: "小写字母"
                },
                num: {
                    str: "0-9",
                    flag: ruleType.charAt(2),
                    text: "数字"
                },
                chinese: {
                    str: "\\u4E00-\\u9FA5",
                    flag: ruleType.charAt(3),
                    text: "中文"
                },
                punctuation: {
                    str: pun,
                    flag: pRule ? 1 : 0,
                    text: "特殊字符" + pText
                }
            };
            var reg = "";
            var text = "";
            for (var k in vObj) {
                if (vObj[k].flag == 1) {
                    // 提示语添加顿号
                    if (text == "") {
                        text += vObj[k].text;
                    } else {
                        text += "、" + vObj[k].text;
                    }
                    reg += vObj[k].str;
                }
            }
            // 拼装校验规则
            var re = new RegExp("^[" + reg + "]+$", "g");
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (re.test(val)) {
                    callback();
                } else {
                    callback(new Error(alertText + text));
                }
            }, 100);
        },
        postCode: (rule, value, callback) => {
            // 邮政编码
            var reg = /^[0-9]{6}/;
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("无效的邮政编码"));
                } else if (value.length > 6) {
                    callback(new Error("最多6位"));
                } else {
                    callback();
                }
            }, 100);
        },
        // 根据校验规则校验密码
        checkPasswordByRule: (rule, value, callback) => {
            // let userData = JSON.parse(rule.type.$store.getters.getLoginStatus);
            let userData = JSON.parse(sessionStorage.getItem("userData"));
            // 用户类型为系统管理员时，直接跳过格式规则校验
            if (userData.userType != "B") {
                var reg;
                var passwordRule = sessionStorage.getItem("passwordRule");
                var passwordRuleArr = passwordRule.split("");
                if (passwordRuleArr[0] == 1) {
                    // 校验大写
                    reg = /[A-Z]/;
                    if (!reg.test(value)) {
                        callback(new Error("密码应包含大写字母，请重新输入"));
                        return;
                    }
                }
                if (passwordRuleArr[1] == 1) {
                    // 校验小写
                    reg = /[a-z]/;
                    if (!reg.test(value)) {
                        callback(new Error("密码应包含小写字母，请重新输入"));
                        return;
                    }
                }
                if (passwordRuleArr[2] == 1) {
                    // 校验数字
                    reg = /[0-9]/;
                    if (!reg.test(value)) {
                        callback(new Error("密码应包含数字，请重新输入"));
                        return;
                    }
                }
                if (passwordRuleArr[3] == 1) {
                    // 校验特殊字符
                    reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
                    if (!reg.test(value)) {
                        callback(new Error("密码应包含特殊符号，请重新输入"));
                        return;
                    }
                }
            }
            // 判断是首次修改密码页面还是在弹框修改密码页面，两个页面formItem取数据的路径不同
            let formItem = rule.type.$refs.formItem.formItem
                ? rule.type.$refs.formItem.formItem
                : rule.type.formItem;
            if (formItem.oldPwd && formItem.oldPwd == value) {
                callback(new Error("新旧密码不能一致，请重新输入"));
            } else if (formItem.newPwd && formItem.newPwd != value) {
                callback(new Error("确认密码与新密码不一致，请重新输入"));
            } else if (formItem.pwd && formItem.pwd != value) {
                callback(new Error("新密码与确认密码不一致，请重新输入"));
            } else {
                callback();
            }
        },
        // 发请求校验原密码是否正确
        checkPwdOld: (rule, value, callback) => {
            setTimeout(() => {
                let param = {
                    params: {
                        id: localStorage.getItem("ms_userId"),
                        pwd: sha256(value)
                    }
                };
                http.apiGet("pubHttpInterface/checkPwd", param).then(res => {
                    if (value == "") {
                        callback();
                    } else if (res.code == 0) {
                        callback();
                    } else {
                        callback(new Error(res.message));
                    }
                });
            }, 100);
        },
        // 校验非负整数
        checkNonNegativeInteger: (rule, value, callback) => {
            // 整数校验
            var reg = /^\d+$/;
            setTimeout(() => {
                if (value == "" || value === null) {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请输入正整数"));
                } else {
                    callback();
                }
            }, 100);
        },
        uniquenessCheck: (rule, value, callback) => {
            // 唯一性校验，现在统一了之前每个唯一性校验返回值都不一样
            value = encodeURIComponent(value);
            let paramData = {
                params: {
                    [rule.type.paramName]: value
                }
            };
            // 取到传过来的this
            let that = rule.type["this"];
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (that.$store.getters.operatState == "add") {
                paramData.params[rule.type.paramId] = "";
            } else {
                paramData.params[rule.type.paramId] = rule.type.paramValue;
            }
            http.apiGet(rule.type.url, paramData).then(res => {
                setTimeout(() => {
                    if (res.data) {
                        callback(new Error(rule.type.message));
                    } else {
                        callback();
                    }
                }, 100);
            });
        }
    };
};
