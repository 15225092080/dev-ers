import Vue from "vue";
import http from "./http.js";
import SparkMD5 from "spark-md5";
import axios from "axios";
import store from "../../store"; // 引用vuex
import { closeDialog } from "@/common/script/vForm";
let v = new Vue();
let md5Arr = [];
let timer = null;
let systemId = sessionStorage.getItem("systemId");
exports.install = () => {
    Vue.prototype.common = {
        // 判断浏览器版本
        BrowserType() {
            var e = navigator.userAgent;
            var t = e.indexOf("Opera") > -1;
            var i = window.ActiveXObject || "ActiveXObject" in window;
            var n = e.indexOf("Edge") > -1;
            var a = e.indexOf("Firefox") > -1;
            var r = e.indexOf("Safari") > -1 && e.indexOf("Chrome") == -1;
            var o = e.indexOf("Chrome") > -1 && e.indexOf("Safari") > -1 && !n;
            if (i) {
                var l = new RegExp("MSIE (\\d+\\.\\d+);");
                l.test(e);
                var s = parseFloat(RegExp.$1);
                if (e.indexOf("MSIE 6.0") != -1) {
                    return "IE6";
                } else if (s == 7) {
                    return "IE7";
                } else if (s == 8) {
                    return "IE8";
                } else if (s == 9) {
                    return "IE9";
                } else if (s == 10) {
                    return "IE10";
                } else if (e.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
                    return "IE11";
                } else {
                    return "0";
                }
            }
            if (a) {
                return "FF";
            }
            if (t) {
                return "Opera";
            }
            if (r) {
                return "Safari";
            }
            if (o) {
                return "Chrome";
            }
            if (n) {
                return "Edge";
            }
            return true;
        },
        Control(arr, obj, formData) {
            // 控制表单属性
            for (let val of Object.keys(obj)) {
                arr.forEach(item => {
                    if (item.findIndex(i => i.name == val) > -1) {
                        Object.assign(
                            item[item.findIndex(i => i.name == val)],
                            obj[val]
                        );
                    }
                });
                if (obj[val].hasOwnProperty("value")) {
                    if (formData) {
                        formData.formItem[val] = obj[val].value;
                    } else {
                        window.bindForm(val, obj[val]);
                    }
                }
            }
        },
        submitMsg(res, _this) {
            // 提交成功失败之后的弹框
            if (res.code == 0) {
                return this.MessageBoxalert(
                    res.message,
                    "消息",
                    "确认",
                    "success"
                ).then(() => {
                    clearTimeout(timer);
                    if (_this) {
                        if (_this.$el.className.includes("querypage")) {
                            _this.$refs.dataTable.getTableData();
                        } else {
                            _this && closeDialog(_this);
                        }
                    }
                    // _this.$refs.dataTable.getTableData()
                });
            } else {
                return this.MessageBoxalert(
                    res.message,
                    "消息",
                    "确认",
                    "error"
                ).then(() => {
                    if (_this) {
                        if (_this.$el.className.includes("querypage")) {
                            _this.$refs.dataTable.getTableData();
                        }
                    }
                });
            }
        },
        // 统一全局样式 message
        message(showClose, message, type, duration, callback) {
            v.$message({
                showClose: showClose,
                message: message,
                type: type,
                duration: duration,
                onClose: callback
            });
        },
        // 统一全局样式 MessageBoxalert
        MessageBoxalert(
            message,
            title,
            confirmButtonText,
            type,
            center,
            callback,
            icon,
            customAlert
        ) {
            customAlert = customAlert || "";
            clearTimeout(timer);
            if (!icon) {
                icon = "shanchu";
            }
            if (type == "success") {
                timer = setTimeout(() => {
                    document
                        .querySelector(
                            ".msg-alert-success > .el-message-box__btns > .el-button"
                        )
                        .click();
                    clearTimeout(timer);
                }, 3000);
                icon = "wancheng";
            } else if (type == "error") {
                icon = "guanbi";
            } else if (type == "warning") {
                icon = "wenhao";
            } else if (type == "info") {
                icon = "tanhao";
            }
            const msg =
                '<p class="icon DHCiconfont DHC-' +
                icon +
                '"></p><p class="box_message">' +
                message +
                "</p>";
            return v.$alert(msg, title, {
                confirmButtonText: confirmButtonText,
                dangerouslyUseHTMLString: true,
                type: type,
                center: center,
                callback: callback,
                customClass: "msg-alert msg-alert-" + type + " " + customAlert
            });
        },
        // 统一全局样式 MessageBoxconfirm
        MessageBoxconfirm(
            message,
            title,
            confirmButtonText,
            cancelButtonText,
            type,
            center,
            callback,
            icon
        ) {
            if (!icon) {
                icon = "shanchu";
            }
            if (type == "success") {
                icon = "wancheng";
            } else if (type == "error") {
                icon = "guanbi";
            } else if (type == "warning") {
                icon = "wenhao";
            } else if (type == "info") {
                icon = "tanhao";
            }
            const msg =
                '<p class="icon DHCiconfont DHC-' +
                icon +
                '"></p><p class="box_message">' +
                message +
                "</p>";
            return v.$confirm(msg, title, {
                dangerouslyUseHTMLString: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                type: type,
                center: center,
                callback: callback,
                customClass: "msg-confirm msg-confirm-" + type
            });
        },
        // 统一全局样式 MessageBoxprompt
        MessageBoxprompt(messageObj) {
            return v.$prompt(messageObj.message, messageObj.title, {
                dangerouslyUseHTMLString: true,
                confirmButtonText: messageObj.confirmButtonText,
                cancelButtonText: messageObj.cancelButtonText,
                inputPattern: messageObj.inputPattern,
                inputErrorMessage: messageObj.inputErrorMessage,
                confirmButtonClass: "certain_btn icon DHCiconfont DHC-queding",
                cancelButtonClass:
                    "cancle_btn icon DHCiconfont DHC-quxiao el-button--primary",
                type: messageObj.type,
                center: messageObj.center,
                callback: messageObj.callback,
                closeOnClickModal: false
            });
        },

        /* eslint-disable */
        //暂时!null和url != undefined 不是一个意思，暂时屏蔽检测 !null会导致不加载字典
        // realTime 为true的时候会实时调用接口, 不再判断sessionStorage 是否有此字典
        getdic(url, param, callbackFn, realTime) {
            // 获取字典
            if (!systemId) {
                systemId = sessionStorage.getItem("systemId");
            }
            if (
                (url != undefined &&
                    !sessionStorage.getItem(systemId + "_" + param)) ||
                (url != undefined && realTime)
            ) {
                http.apiGet(url, {
                    params: { typeId: param, systemId: systemId }
                }).then(res => {
                    sessionStorage[systemId + "_" + param] = JSON.stringify(
                        res.data
                    );
                    if (callbackFn) {
                        callbackFn();
                    }
                });
            } else {
                if (callbackFn) {
                    callbackFn();
                }
            }
        },

        /* eslint-disable */
        realTimeRequest(url, param) {
            // 获取实时请求的表格列数据
            if (!systemId) {
                systemId = sessionStorage.getItem("systemId");
            }
            if (url != undefined) {
                http.apiGet(url, {
                    params: { typeId: param, systemId: systemId }
                }).then(res => {
                    sessionStorage[systemId + "_" + param] = JSON.stringify(
                        res.data
                    );
                });
            }
        },
        // 文件MD5加密
        get_filemd5sum(ofile) {
            var file = ofile;
            var tmpMd5;
            var blobSlice =
                    File.prototype.slice ||
                    File.prototype.mozSlice ||
                    File.prototype.webkitSlice,
                // file = this.files[0],
                chunkSize = 8097152, // Read in chunks of 2MB
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader();

            fileReader.onload = function(e) {
                // console.log('read chunk nr', currentChunk + 1, 'of', chunks);
                spark.append(e.target.result); // Append array buffer
                currentChunk++;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    tmpMd5 = spark.end();
                    // filemd5 = tmpMd5;
                    md5Arr.push({
                        name: file.name,
                        md5: tmpMd5
                    });
                    window.md5Arr = md5Arr;
                }
            };

            fileReader.onerror = function() {};

            function loadNext() {
                var start = currentChunk * chunkSize,
                    end =
                        start + chunkSize >= file.size
                            ? file.size
                            : start + chunkSize;
                fileReader.readAsArrayBuffer(
                    blobSlice.call(file.raw, start, end)
                );
            }

            loadNext();
        },
        onselect(fileter, e, callback) {
            // 绑定的下拉字段，change事件返回，回调函数
            // console.log(fileter,e)

            if (e.sname == fileter) {
                callback();
            }
        },
        setVal: async function(url, param) {
            // 表单赋值
            let response = await http.apiGet(url, param, { showLoading: true });
            return response.data;
        },
        getVal(arr, sname) {
            // 取指定字段的value值 参数为：（需要查找的数组，字段名）
            let array = arr.filter(
                item => item.findIndex(i => i.name == sname) > -1
            );
            let obj = array[0].find(i => i.name == sname);
            return obj.value;
        },
        unique(arr) {
            //数组去重
            const res = new Map();
            return arr.filter(a => !res.has(a) && res.set(a, 1));
        },
        // 对存在行政区域的表格数据做行政区域字段处理,resArr返回的表格数据数组,areaOptions行政区域数组
        getAreaOptions(resArr, areaOptions) {
            let tableData = [];
            resArr.forEach(item => {
                item.areaCode = this.changeAreaCode(item.areaCode, areaOptions);
                tableData.push(item);
            });
            return tableData;
        },
        // 行政区域表格字段拼接
        changeAreaCode(areaCode, areaArr) {
            // 当所传值为空时，返回空字符串
            let judgeArr = ["", undefined, null];
            if (judgeArr.includes(areaCode) || judgeArr.includes(areaArr)) {
                return "";
            }
            // 省份行政码
            let provcode = areaCode.substring(0, 2) + "0000";
            // 市区行政码
            let citycode = areaCode.substring(0, 4) + "00";
            // 县区码
            let countycode = areaCode;
            // 将省份/市区/县份行政码加入数组中
            var area = "";
            for (var i = 0; i < areaArr.length; i++) {
                if (areaArr[i].code == provcode) {
                    // 获取省级行政区域名称
                    area = areaArr[i].dictName;
                    // 获取市级行政区域名称
                    var cityChildren = areaArr[i].children;
                    if (cityChildren) {
                        for (var j = 0; j < cityChildren.length; j++) {
                            if (cityChildren[j].code == citycode) {
                                area += " / " + cityChildren[j].dictName;
                                // 获取县级行政区域名称
                                var countyChidren = cityChildren[j].children;
                                // 加一个判断 判断县或者区下面有没有数据 没有数据执行下面循环报错
                                if (countyChidren) {
                                    for (
                                        var z = 0;
                                        z < countyChidren.length;
                                        z++
                                    ) {
                                        if (countyChidren[z] != undefined) {
                                            if (
                                                countyChidren[z].code ===
                                                countycode
                                            ) {
                                                area +=
                                                    " / " +
                                                    countyChidren[z].dictName;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return area;
        },
        // callback为自定义传入的回调函数
        callbackFuncMsg(res, callback) {
            if (res.code == 0) {
                return this.MessageBoxalert(
                    res.message,
                    "消息",
                    "确认",
                    "success"
                ).then(callback);
            } else {
                return this.MessageBoxalert(
                    res.message,
                    "消息",
                    "确认",
                    "error"
                ).then(callback);
            }
        },
        // 请求密码校验规则
        getPasswordRule(url) {
            let that = this;
            let paramData = {
                params: {
                    configCode: "passwordRule"
                }
            };
            http.apiGet(url, paramData).then(res => {
                if (res.code == 0) {
                    sessionStorage.setItem("passwordRule", res.data);
                } else {
                    that.common.message(
                        true,
                        res.message,
                        "error",
                        "800",
                        function() {
                            return false;
                        }
                    );
                }
            });
        },
        // 导出下载公共方法
        downLoad(url, data, flag) {
            let that = this;
            // isTranscode 是否转码
            if (data.isTranscode) {
                data.path = decodeURI(data.path);
            }
            if (this.BrowserType() == "IE9" || flag) {
                let res = "?";
                if (!data) return;
                for (let k in data) {
                    res += k + "=" + data[k] + "&";
                }
                res += "token=" + store.getters.token;
                window.location.href = axios.defaults.baseURL + url + res;
                return;
            }
            axios.post(url, data, { responseType: "blob" }).then(res => {
                var reader = new FileReader();
                reader.readAsText(res.data);
                reader.onload = function() {
                    // var content = reader.result;// 内容就在这里
                    // res.headers['content-disposition'] 如果有值的话就是有文件，undefined就是没有文件  目前先这样判断。
                    if (
                        res.headers["content-disposition"] &&
                        res.data.type != "application/json"
                    ) {
                        let csvData = new Blob([res.data], {
                            type: "application /vnd.ms-excel"
                        });
                        let fileName = decodeURIComponent(
                            res.headers["content-disposition"].split("=")[1]
                        );
                        if (that.BrowserType().indexOf("IE") > -1) {
                            window.navigator.msSaveOrOpenBlob(
                                csvData,
                                fileName
                            );
                        } else {
                            let link = document.createElement("a");
                            link.href = window.URL.createObjectURL(csvData);
                            link.setAttribute("download", fileName);
                            document.body.appendChild(link);
                            link.click();
                        }
                    } else {
                        that.message(
                            true,
                            JSON.parse(reader.result).message,
                            "error",
                            "800",
                            function() {
                                return false;
                            }
                        );
                    }
                };
            });
        },
        // 去除数组中某个值
        arrayRemoveByValue(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i, 1);
                    break;
                }
            }
            return arr;
        },
        // 数组去除重复值
        arrayRemoveRepeatedVal(arr) {
            var newArr = [];
            for (var i = 0; i < arr.length; i++) {
                if (newArr.indexOf(arr[i]) === -1) {
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        },
        // 导出；列表
        handleExportList(tHeader, filterVal, tableData, fileName) {
            // this.downloadLoading = true;
            import("@/vendor/Export2Excel").then(excel => {
                const data = this.formatJson(filterVal, tableData);
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: fileName // 导出文件的名，自定义就好
                });
            });
        },
        // 下载方法中，需要用到的格式化json的方法
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "status") {
                        // 此处如没有要格式化的列，可以不用此判断
                        // return parseTime(v[j])
                        return v[j];
                    } else {
                        return v[j];
                    }
                })
            );
        }
    };
};
