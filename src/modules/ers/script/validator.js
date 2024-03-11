import http from "@/common/script/http";
import md5 from "js-md5";
import urlList from "@/modules/ers/api/url.json";
// import router from '../router/index';
// import VueData from 'vue';
const trim = function (val) {
    var str = val + "";
    if (str.length == 0) {
        return str;
    }
    var re = /^\s*/;
    str = str.replace(re, "");
    re = /\s*$/;
    return str.replace(re, "");
};
exports.install = (Vue, options) => {
    Vue.prototype.validator = {
        empty: (rule, value, callback) => {
            // 仅验证不能为空
            if (value && typeof value !== "string") {
                value = value.toString();
            }
            if (value == null || value == "") {
                callback(new Error("输入不能为空"));
                return;
            } else {
                value = value.replace(/(^\s*)|(\s*$)/g, "");
            }
            setTimeout(() => {
                if (!value) {
                    callback(new Error("输入不能为空"));
                } else {
                    callback();
                }
            }, 100);
        },
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
                    userId: value,
                },
            };
            http.apiGet("api/user/haveUser", paramData).then((res) => {
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
            let _this = rule.type;
            let paramData = {
                params: {
                    roleName: value,
                    roleId: _this.$parent.detailUrl.resId,
                },
            };
            http.apiGet("api/role/checkRoleNameExist", paramData).then(
                (res) => {
                    setTimeout(() => {
                        if (res.data.result === true) {
                            callback(new Error("角色名已经存在"));
                        } else {
                            callback();
                        }
                    }, 100);
                }
            );
        },
        ajaxOrgIdCheck: (rule, value, callback) => {
            // 机构是否存在
            let paramData = {
                params: {
                    orgCode: value,
                },
            };
            http.apiGet("api/org/haveOrg", paramData).then((res) => {
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
            // 机构是否存在
            let paramData = {
                params: {
                    financialOrgCode: value,
                },
            };
            // 取到传过来的this
            let _this = rule.type;
            // 根据状态为新增或编辑，请求报文添加不同的字段
            if (_this.$store.getters.operatState == "add") {
                paramData.params.orgCode = "";
            } else {
                paramData.params.orgCode = _this.findById.param.params.orgCode;
            }
            http.apiGet(_this.financialOrgCodeUrl, paramData).then((res) => {
                setTimeout(() => {
                    if (!res.data) {
                        callback(new Error("该金融机构代码已存在"));
                    } else {
                        callback();
                    }
                }, 100);
            });
        },
        checkPassport: (rule, value, callback) => {
            // 验证护照
            setTimeout(() => {
                if (!value) {
                    callback();
                } else {
                    let nationUrl = urlList.common.dic;
                    passportValidator(nationUrl, value, value.length, callback);
                    // callback();
                }
            }, 100);

            function passportValidator(nationUrl, idCard, idCardLength) {
                if (idCardLength > 3 && idCardLength <= 12) {
                    http.apiPost(nationUrl + "?type=E_Nation").then((res) => {
                        let index = idCard.substring(0, 3);
                        let jsonValue = res[index];
                        if (typeof jsonValue == "undefined") {
                            callback(
                                new Error(
                                    "护照前三位为国籍代码，总长度不超过12位 "
                                )
                            );
                        } else {
                            callback();
                            // return true;
                        }
                    });
                } else {
                    callback(
                        new Error("护照前三位为国籍代码，总长度不超过12位 ")
                    );
                }
            }
        },
        checkRocValidator: (rule, value, callback) => {
            // 验证台湾居民往来大陆通行证
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (!idTypeRocValidator(value)) {
                    callback(
                        new Error("请输入正确台湾居民往来大陆通行证号码 ")
                    );
                } else {
                    callback();
                }
            }, 100);

            function idTypeRocValidator(idCard) {
                let re1 = /^([0-9]{8}|[0-9]{10}[0-9A-Za-z]?[0-9A-Za-z]?)$/;
                let re2 = /^[0-9]{10}\([A-Za-z]\)$/;
                let re3 = /^[0-9]{10}\([0-9]{2}\)$/;
                let re4 = /^[0-9]{8}$/; //根据人行最新校验规则修改
                // if (re1.test(idCard) || re2.test(idCard) || re3.test(idCard)) {
                if (re4.test(idCard)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        checkHkmacidpassValidator: (rule, value, callback) => {
            // 验证港澳居民往来大陆通行证
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (!hkmacidpassValidator(value)) {
                    callback(
                        new Error("请输入正确港澳居民往来大陆通行证号码 ")
                    );
                } else {
                    callback();
                }
            }, 100);

            function hkmacidpassValidator(idcard) {
                //let re = /^[HM]{1}([0-9]{10}|[0-9]{8})$/;
                let re = /^[HM][0-9]{8}$/; //根据人行最新校验规则修改
                if (!re.test(idcard)) {
                    return false;
                } else {
                    return true;
                }
            }
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
                if (idcard.length > 0 && idcard != null) {
                    // 15位身份证号转换18位
                    idcard = idLen15To18(idcard);
                    if (!idcard) {
                        return false;
                    }
                    var re = /^\d{17}([0-9]|X)$/;
                    var Y, JYM;
                    //   var idcard, Y, JYM;
                    var S, M;
                    var idcardArray = [];
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
                            (parseInt(idcardArray[0], 10) +
                                parseInt(idcardArray[10], 10)) *
                                7 +
                            (parseInt(idcardArray[1], 10) +
                                parseInt(idcardArray[11], 10)) *
                                9 +
                            (parseInt(idcardArray[2], 10) +
                                parseInt(idcardArray[12], 10)) *
                                10 +
                            (parseInt(idcardArray[3], 10) +
                                parseInt(idcardArray[13], 10)) *
                                5 +
                            (parseInt(idcardArray[4], 10) +
                                parseInt(idcardArray[14], 10)) *
                                8 +
                            (parseInt(idcardArray[5], 10) +
                                parseInt(idcardArray[15], 10)) *
                                4 +
                            (parseInt(idcardArray[6], 10) +
                                parseInt(idcardArray[16], 10)) *
                                2 +
                            parseInt(idcardArray[7], 10) * 1 +
                            parseInt(idcardArray[8], 10) * 6 +
                            parseInt(idcardArray[9], 10) * 3;
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
                    "2",
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
                    "2",
                ];
                if (idcard.length == 15) {
                    var id17 =
                        idcard.substring(0, 6) + "19" + idcard.substring(6);
                    var id18 = getParityBit(id17, powers, parityBit);
                    //  if(!field.hasClass("idCard15")){
                    //    field.addClass("idCard15");
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
                        parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
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
        requiredSize: (rule, value, callback) => {
            // 英文字母或数字校验且为14位
            var reg = /^[0-9a-zA-Z]+$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请输入数字或字母"));
                } else if (value.length != 14) {
                    callback(new Error("应为14 位"));
                } else {
                    callback();
                }
            }, 100);
        },
        initCredOrgNmSize: (rule, value, callback) => {
            // 应为18 位
            //var reg = /^\d{18}$/;
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (value.length != 18) {
                    callback(new Error("应为18 位"));
                } else {
                    callback();
                }
            }, 100);
        },
        money: (rule, value, callback) => {
            // 只能是整数或逗号
            var reg = /^\d+(,\d+)*$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("无效的自然数"));
                } else {
                    callback();
                }
            }, 100);
        },
        GtZreoInt: (rule, value, callback) => {
            // 只能填写大于0自然数
            var reg = /^[1-9]{1}[0-9]*$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("只能填写大于0自然数"));
                } else {
                    callback();
                }
            }, 100);
        },
        plusAndMinus: (rule, value, callback) => {
            // 只能填写正负数
            var reg = /^(\-|\+)?\d+(\.([0-9]|\d[0-9]))?$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("只能填写正负数(最多保留2位小数)"));
                } else {
                    callback();
                }
            }, 100);
        },
        minOne: (rule, value, callback) => {
            // 最小值为1,最大值为100
            // var reg = /^\d+(,\d+)*$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (value < 1) {
                    callback(new Error("最小值为1"));
                } else if (value > 100) {
                    callback(new Error("最大值为100"));
                } else {
                    callback();
                }
            }, 100);
        },
        minZero: (rule, value, callback) => {
            // 最小值为0
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (value < 0) {
                    callback(new Error("最小值为0"));
                } else {
                    callback();
                }
            }, 100);
        },
        minZeroMax: (rule, value, callback) => {
            // 最小值为0,最大值为100
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (value < 0) {
                    callback(new Error("最小值为0"));
                } else if (value > 100) {
                    callback(new Error("最大值为100"));
                } else {
                    callback();
                }
            }, 100);
        },
        aPR: (rule, value, callback) => {
            // 年利率
            var reg =
                /^(([0-9]{1})|([1-9][0-9]{0,1}[.][0-9]{1,2})|([1-9][0-9]{1})|([0][.][1-9]{1}[0-9]{1})|([0][.][0][1-9]{1})|([0][.][1-9]{1}))$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("不符合年利率的规范"));
                } else {
                    callback();
                }
            }, 100);
        },
        invRatio: (rule, value, callback) => {
            // 出资比例
            var reg =
                /^(([1][0][0])|([1][0][0][.][0]{0,2})|([1-9][0-9]{0,1}[.][0-9]{1,2})|([1-9][0-9]{1})|([0-9]{1})|([0][.][1-9]{1}[0-9]{1})|([0][.][0][1-9]{1})|([0][.][1-9]{1}))$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("不符合出资比例的规范"));
                } else {
                    callback();
                }
            }, 100);
        },
        invRatio1: (rule, value, callback) => {
            // 持股比例
            var reg =
                /^(([1][0][0])|([1][0][0][.][0]{0,2})|([1-9][0-9]{0,1}[.][0-9]{1,2})|([1-9][0-9]{1})|([0-9]{1})|([0][.][1-9]{1}[0-9]{1})|([0][.][1-9]{1})|([0][.][0][1-9]{1}))$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("不符合持股比例的规范"));
                } else {
                    callback();
                }
            }, 100);
        },
        email: (rule, value, callback) => {
            // 邮箱
            // eslint-disable-next-line no-control-regex
            var reg =
                /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("无效的邮件地址"));
                } else {
                    callback();
                }
            }, 100);
        },
        chinaZip: (rule, value, callback) => {
            // 邮政编码
            var reg = /^\d{6}$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("无效的邮政编码"));
                } else {
                    callback();
                }
            }, 100);
        },
        ajaxHaveOrg: (rule, value, callback) => {
            // 法人机构是否存在
            let paramData = {
                params: {
                    orgCode: value,
                },
            };
            http.apiGet("api/legalpersonorg/haveOrg", paramData).then((res) => {
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
            //   var reg = /^[\-\+]?\d+$/;
            var reg = /^(0|\+?[1-9][0-9]*)$/;
            setTimeout(() => {
                if (value == "") {
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
        // 例如“1111|·，,。.@#_-”，第一位大写字母，第二位小写字母，第三位数字，第四位汉字,|后为需要校验的特殊字符]
        comValidate: (rule, value, callback) => {
            var alertText = "只能填写";
            // rule.type为自己配置的校验规则
            rule = rule.type;
            var val = value;
            var pRule;
            var pun = "";
            // 判断是否包含特殊字符规则
            if (rule.indexOf("|") > -1) {
                var ruleArr = rule.split("|");
                if (ruleArr > 2) {
                    pRule = ruleArr[1] + ruleArr[2] + "|";
                } else {
                    pRule = ruleArr[1];
                }
                rule = ruleArr[0];

                // 遍历特殊字符，前面添加\
                for (let i = 0; i < pRule.length; i++) {
                    pun += "\\" + pRule.substring(i, i + 1);
                }
            }
            var vObj = {
                en: {
                    str: "A-Z",
                    flag: rule.charAt(0),
                    text: "大写字母",
                },
                En: {
                    str: "a-z",
                    flag: rule.charAt(1),
                    text: "小写字母",
                },
                num: {
                    str: "0-9",
                    flag: rule.charAt(2),
                    text: "数字",
                },
                chinese: {
                    str: "\\u4E00-\\u9FA5",
                    flag: rule.charAt(3),
                    text: "中文",
                },
                punctuation: {
                    str: pun,
                    flag: pRule ? 1 : 0,
                    text: "及特殊字符" + pRule,
                },
            };
            var reg = "";
            var text = "";
            for (var k in vObj) {
                if (vObj[k].flag == 1) {
                    text += vObj[k].text;
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
            var reg = /^[1-9][0-9]{5}/;
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
        isCorpNo: (rule, value, callback) => {
            // 组织机构代码
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (isCorpNo(value) !== true) {
                    callback(new Error("无效的组织机构代码"));
                } else {
                    callback();
                }
            }, 100);

            function isCorpNo(idCard, arr) {
                idCard = trim(idCard);
                if (idCard == "") {
                    return true;
                }
                var reg = /^([0-9A-Z]){8}[0-9A-Z]$/;
                if (!reg.test(idCard)) {
                    return "无效的组织机构代码";
                }
                return true;
            }
        },
        isCCode: (rule, value, callback) => {
            // 统一社会信用代码
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (isCCode(value) !== true) {
                    callback(new Error("无效的统一社会信用代码"));
                } else {
                    callback();
                }
            }, 100);

            function isCCode(creditCode, arr) {
                var patrn = /^[0-9A-Z]+$/;
                // 18位校验及大写校验
                if (
                    creditCode.length != 18 ||
                    patrn.test(creditCode) == false
                ) {
                    return "无效的统一社会信用代码";
                } else {
                    var Ancode; // 统一社会信用代码的每一个值
                    var Ancodevalue; // 统一社会信用代码每一个值的权重
                    var total = 0;
                    var weightedfactors = [
                        1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10,
                        30, 28,
                    ]; // 加权因子
                    var str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
                    // 不用I、O、S、V、Z
                    for (var i = 0; i < creditCode.length - 1; i++) {
                        Ancode = creditCode.substring(i, i + 1);
                        Ancodevalue = str.indexOf(Ancode);
                        // 权重与加权因子相乘之和
                        total = total + Ancodevalue * weightedfactors[i];
                    }
                    var logiccheckcode = 31 - (total % 31);
                    //
                    if (logiccheckcode == 31) {
                        logiccheckcode = 0;
                    }
                    var Str =
                        "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
                    var ArrayStr = Str.split(",");
                    logiccheckcode = ArrayStr[logiccheckcode];
                    var checkcode = creditCode.substring(17, 18);
                    if (logiccheckcode != checkcode) {
                        return "无效的统一社会信用代码";
                    }
                    return true;
                }
            }
        },
        checkLoanCardnorules: (rule, value, callback) => {
            // 中证码
            setTimeout(() => {
                if (!value) {
                    callback();
                } else if (checkLoanCardnorules(value) !== true) {
                    callback(new Error("无效的中征码（原贷款卡编码）"));
                } else {
                    callback();
                }
            }, 100);

            function checkLoanCardnorules(loanCardNo, arr) {
                if (trim(loanCardNo).length != 16) {
                    return "* 无效的中征码（原贷款卡编码）";
                }
                var checkCode;
                var weightValue = [];
                var checkValue = [];
                var totalValue = 0;
                var c = 0;
                // 生成的校验码
                var str1;
                checkCode = trim(loanCardNo).substring(0, 14);
                for (var i = 0; i < 14; i++) {
                    var tempvalue = checkCode.charCodeAt(i);
                    if (
                        tempvalue >= "a".charCodeAt() &&
                        tempvalue <= "z".charCodeAt()
                    ) {
                        return "* 无效的中征码（原贷款卡编码）";
                    }
                }
                weightValue[0] = 1;
                weightValue[1] = 3;
                weightValue[2] = 5;
                weightValue[3] = 7;
                weightValue[4] = 11;
                weightValue[5] = 2;
                weightValue[6] = 13;
                weightValue[7] = 1;
                weightValue[8] = 1;
                weightValue[9] = 17;
                weightValue[10] = 19;
                weightValue[11] = 97;
                weightValue[12] = 23;
                weightValue[13] = 29;

                for (let j = 0; j < 14; j++) {
                    var tempValue = checkCode.substring(j, j + 1);
                    if (tempValue >= "A" && tempValue <= "Z") {
                        checkValue[j] = tempValue.charCodeAt() - 55;
                    } else {
                        checkValue[j] = tempValue;
                    }

                    totalValue = totalValue + weightValue[j] * checkValue[j];
                }

                // for (var j = 3; j < 14; j++) {
                //     checkValue[j] = checkCode.substring(j, j + 1);
                //     totalValue = totalValue + weightValue[j] * checkValue[j];
                // }

                c = 1 + (totalValue % 97);
                str1 = String(c);

                if (str1.length == 1) {
                    str1 = "0" + str1;
                }

                if (str1 == trim(loanCardNo).substring(14)) {
                    return true;
                } else {
                    return "* 无效的中征码（原贷款卡编码）";
                }
            }
        },
        // 根据校验规则校验密码
        checkPasswordByRule: (rule, value, callback) => {
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
                // eslint-disable-next-line no-useless-escape
                reg =
                    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
                if (!reg.test(value)) {
                    callback(new Error("密码应包含特殊符号，请重新输入"));
                    return;
                }
            }
            let formItem = rule.type.formItem;
            if (formItem.oldPwd && formItem.oldPwd == value) {
                callback(new Error("新老密码不能一致，请重新输入"));
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
                        pwd: md5(value),
                    },
                };
                http.apiGet("api/user/checkPwd", param).then((res) => {
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
        validatorBussNum(rule, value, callback) {
            // 校验业务号不能重复
            let paramData = {
                bussNum: value,
            };
            let routeUrl = sessionStorage.bussNum.split("-")[0];
            http.apiPost(rule.url, paramData).then((res) => {
                setTimeout(() => {
                    if (res.flag == "0") {
                        callback();
                    } else {
                        callback(new Error("业务号已经存在"));
                    }
                }, 100);
            });
        },
        validatorCustId(rule, value, callback) {
            // 校验客户号不能重复
            let paramData = {
                custId: value,
            };
            let routeUrl = sessionStorage.bussNum.split("-")[0];
            http.apiPost(rule.url, paramData).then((res) => {
                setTimeout(() => {
                    if (res.flag == "0") {
                        callback();
                    } else {
                        callback(new Error("客户号已经存在"));
                    }
                }, 100);
            });
        },
        isFloat: (rule, value, callback) => {
            // 报表数值校验
            var reg =
                /^((\-|\+)?([0-9]{1})|(\-|\+)?([1-9]{1}[0-9]{0,16}[.][0-9]{1,2})|(\-|\+)?([1-9]{1}[0-9]{0,16})|(\-|\+)?([0][.][0-9]{0,2}))$/;
            setTimeout(() => {
                if (value == "") {
                    callback();
                } else if (!reg.test(value)) {
                    callback(new Error("请填写符合要求的数值"));
                } else {
                    callback();
                }
            }, 100);
        },
    };
};
