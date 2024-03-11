import "babel-polyfill";
import "ie9-oninput-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../../store"; // 引用vuex
import ElementUI, { MessageBox } from "element-ui";
import echarts from "echarts";
// import { MessageBox } from 'element-ui'
import urlList from "@/modules/ers/api/url.json"; // 系统配置路由
import commonUrl from "@/common/api/url.json"; // 公共接口
// import creditPerurlList from '@/modules/creditper/api/url.json'; //个人路由
// import creditEnurlList from '@/modules/crediten/api/url.json'; //企业路由
import common from "@/modules/ers/script/common";
import c from "@/common/script/common_c";
import filters from "../../common/script/filter";
import validator from "@/modules/ers/script/validator";
import http from "../../common/script/http";
import calcObj from "../../common/script/financial"; // 财报自动计算
// import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import "../../assets/style/theme-dh/index.css"; // 深蓝主题
import "../../assets/style/main.css";
import "../../assets/style/tree.css";
import "../../assets/style/icon.css";
import "../../assets/iconfont/iconfont.css"; // 字体图标
import vComponent from "@/modules/ers/script/globalComponents"; // 公共组件
import "./permission"; // 权限控制
const VueUploadComponent = require("vue-upload-component"); // 上传组件
Vue.component("file-upload", VueUploadComponent); // 上传组件
Vue.use(vComponent);
Vue.use(ElementUI, { size: "small" });
Vue.use(c);
Vue.use(common);
Vue.use(validator);
// 设置axios为form-data
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
axios.defaults.headers.get["Content-Type"] =
    "application/x-www-form-urlencoded";
axios.defaults.headers.put["Content-Type"] =
    "application/x-www-form-urlencoded";

axios.defaults.baseURL = process.env.API_ROOT_ERS;
for (let m in commonUrl) {
    for (let n in commonUrl[m]) {
        commonUrl[m][n] = "/communal/" + commonUrl[m][n];
    }
}

axios.defaults.transformRequest = [
    function(data) {
        let ret = "";
        for (let it in data) {
            // 为FormData类型
            if (typeof data[it] == "function") {
                return data;
            }
            if (typeof data[it] != "object") {
                if (data[it] && typeof data[it] == "string") {
                    data[it] = data[it].trim();
                }
                ret += it + "=" + encodeURI(data[it]) + "&";
            }
        }
        return ret;
    }
];
let getMenuRootId = [];
// 添加响应拦截器
let num = 0;

function debounce(fn, wait) {
    let timerId = null;
    let flag = true;
    return function() {
        clearTimeout(timerId);
        if (flag) {
            fn.apply(this, arguments);
            flag = false;
        }
        timerId = setTimeout(() => {
            flag = true;
        }, wait);
    };
}
const authError = debounce(message => {
    Vue.prototype.common
        .MessageBoxalert(message, "消息", "确认", "warning")
        .then(() => {
            localStorage.removeItem("ms_username");
            localStorage.removeItem("ms_userId");
            store.dispatch("user/resetRoles"); // 清空权限
            num = 0;
            sessionStorage.removeItem("systemId");
            MessageBox.close();
            if (packageModel == "0") {
                window.location.href = "/platform/#/login";
            } else {
                window.location.href = "/platform#/login";
            }
        });
}, 1000);
axios.interceptors.response.use(
    function(response) {
        if (num > 0) {
            return;
        }
        if (response.config.url.indexOf("login") < 0) {
            let fingBy = response.config.url.split("/");
            if (fingBy[fingBy.length - 1].indexOf("findBy") >= 0) {
                for (const key in response.data) {
                    if (response.data[key] != 0 && !response.data[key]) {
                        response.data[key] = "";
                    }
                }
            }
            // 修复打开页面时，控制台会报各种错误的问题
            if (response.data == [] || null) {
                return;
            }
            if (response.data.code == "3001" || response.data.code == "3009") {
                num++;
                authError(response.data.message); // 解决弹出层多次弹出
                return;
            } else if (response.status == "404") {
                router.push("/404");
            }
        }
        let reresponseData = response.data;
        var obj = {};
        if (window.nickByUserName) {
            obj = window.nickByUserName;
        }
        if (response.config.url.indexOf("auth/sysMenu/getMenuRoot") >= 0) {
            // debugger
            // console.log(response)
            for (let i = 0; i < response.data.menu.length; i++) {
                if (getMenuRootId.indexOf(response.data.menu[i].id) == -1) {
                    getMenuRootId.push(response.data.menu[i].id);
                }
                sessionStorage.getMenuRootId = getMenuRootId;
            }
        }
        // eslint-disable-next-line consistent-return
        return response;
    },
    function(err) {
        let logoutFlag = false;
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求错误(400)";
                    break;
                case 401:
                    logoutFlag = true;
                    // err.message = '未授权，请重新登录(401)';
                    err.message = err.response.data.msg;
                    break;
                case 403:
                    err.message = "拒绝访问(403)";
                    break;
                // case 404:
                //     err.message = '请求出错(404)';
                //     break;
                case 408:
                    err.message = "请求超时(408)";
                    break;
                case 500:
                    err.message = "服务器错误(500)";
                    break;
                case 501:
                    err.message = "服务未实现(501)";
                    break;
                case 502:
                    err.message = "网络错误(502)";
                    break;
                case 503:
                    err.message = "服务不可用(503)";
                    break;
                case 504:
                    err.message = "网络超时(504)";
                    break;
                case 505:
                    err.message = "HTTP版本不受支持(505)";
                    break;
                default:
                    err.message = `连接出错(${err.response.status})!`;
            }
            Vue.prototype.$alert(err.message, "消息", {
                confirmButtonText: "确定",
                type: "warning",
                callback: action => {
                    MessageBox.close();
                    if (logoutFlag) {
                        //   router.push('/login');
                        window.location.href = "/platform#/login";
                    }
                }
            });
            return Promise.reject(err);
        }
        return false;
    }
);
// eslint-disable-next-line no-extend-native
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
// eslint-disable-next-line no-extend-native
Array.prototype.in_array = function(e) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == e) {
            return true;
        }
    }
    return false;
};

// 全局注册过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.prototype.http = http;
// 区分当前部署版本：微服务为1,分布式为0

let configData = JSON.parse(window.sessionStorage.serverType);
let deployment = null,
    packageModel = null,
    context = null;
// deployment 区分当前部署版本：微服务为1,分布式为0
// packageModel 区分当前部署版本：jar为1,war为0
for (let i = 0; i < configData.length; i++) {
    if (configData[i].key == "deployment") {
        deployment = configData[i].value;
    } else if (configData[i].key == "packageModel") {
        packageModel = configData[i].value;
    } else if (configData[i].key == "context") {
        context = configData[i].value;
    }
}
// if (deployment === "0") {
//     // axios.defaults.baseURL = process.env.API_ROOT_ERS;
//     axios.defaults.baseURL = "";
//     if (packageModel === "0") {
//         for (let m in commonUrl) {
//             for (let n in commonUrl[m]) {
//                 commonUrl[m][n] = context + "/" + commonUrl[m][n];
//             }
//         }
//     }
//     for (let k in urlList) {
//         for (let j in urlList[k]) {
//             urlList[k][j] = process.env.API_ROOT_ERS + urlList[k][j];
//         }
//     }
//     Vue.prototype.$urlList = urlList;
// } else {
//     axios.defaults.baseURL = "";
//     let baseURL = "";
//     for (let k in urlList) {
//         // if (k == "interImport" || k == "emieError") {
//         //     baseURL = "/ent-import/";
//         // } else if (k == "ebatch" || k == "psgCheckError" || k == "submit") {
//         //     baseURL = "/ent-report/";
//         // } else {
//         //     baseURL = "/ent-comprehensive/";
//         // }
//         baseURL = "/entRatingWeb/";
//         for (let j in urlList[k]) {
//             urlList[k][j] = baseURL + urlList[k][j];
//         }
//     }
//     Vue.prototype.$urlList = urlList;
//     console.log("urlList", urlList);
//     for (let m in commonUrl) {
//         for (let n in commonUrl[m]) {
//             commonUrl[m][n] = "/communal/" + commonUrl[m][n];
//         }
//     }
// }
Vue.prototype.$urlList = urlList;
Vue.prototype.$commonUrl = commonUrl;
Vue.prototype.calcObj = calcObj;
Vue.prototype.$echarts = echarts;
Vue.use(VueAxios, axios);
// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     if (from.fullPath == "/approval-approvalTab" && to.fullPath != "/") {
//         to.meta.title = "数据详情";
//     }
//     next();
//     // console.log(to.redirectedFrom);
//     // console.log(from);
// });

new Vue({
    router,
    store, // 使用store
    render: h => h(App)
}).$mount("#app");
