/*eslint-disable*/
import 'babel-polyfill';
import 'ie9-oninput-polyfill';
import _ from 'lodash';
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '../../store'; //引用vue
import ElementUI from 'element-ui';
import echarts from 'echarts';
import { MessageBox } from 'element-ui';
import urlList from '@/modules/platform/api/url.json'; //系统配置路由
import commonUrl from '@/common/api/url.json'; // 公共接口
import c from '@/common/script/common_c';
import filters from '../../common/script/filter';
import validator from '@/common/script/validator';
import http from '../../common/script/http';
import V_Component from '@/common/script/globalComponents'; //公共组件
import './permission'; // 权限控制
import ElTreeSelect from 'el-tree-select';
import Rsa from '@/common/script/rsa.js';
Vue.prototype.Rsa = Rsa; // 将Rsa注册为公共方法,方便其他页面调用
Vue.use(ElTreeSelect);
const VueUploadComponent = require('vue-upload-component'); //上传组件
Vue.component('file-upload', VueUploadComponent); //上传组件
Vue.use(V_Component);
Vue.use(ElementUI, { size: 'small' });
Vue.use(c);
Vue.use(validator);

Vue.prototype._ = _;
//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
// process.env.NODE_ENV === "development"
axios.defaults.baseURL = process.env.API_ROOT_PLATFORM;
axios.defaults.transformRequest = [
  function(data) {
    let ret = '';
    for (let it in data) {
      if (typeof data[it] == 'string') {
        data[it] = data[it].trim();
        ret += it + '=' + encodeURIComponent(data[it]) + '&';
      }
      if (data[it] instanceof Array) {
        ret += it + '=' + encodeURIComponent(data[it]) + '&';
      }
    }
    return ret;
  }
];
let getMenuRootId = [];
//添加响应拦截器
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
  Vue.prototype.common.MessageBoxalert(message, '消息', '确认', 'warning').then(() => {
    localStorage.removeItem('ms_username');
    localStorage.removeItem('ms_userId');
    store.dispatch('user/resetRoles'); //清空权限
    num = 0;
    sessionStorage.removeItem('systemId');
    MessageBox.close();
    router.push('login');
  });
}, 1000);
let filterLogOutUrl = [process.env.API_ROOT_PLATFORM + 'pubHttpInterface/config', process.env.API_ROOT_PLATFORM + 'getLoginType', process.env.API_ROOT_PLATFORM + 'login'];
axios.interceptors.response.use(
  function(response) {
    if (num > 0) {
      return;
    }
    // 手动清除缓存后做踢出系统操作
    if (filterLogOutUrl.indexOf(response.config.url) == -1 && !localStorage.getItem('ms_userId')) {
      authError('请登陆后进行访问');
    }
    if (response.config.url.indexOf('login') < 0) {
      let fingBy = response.config.url.split('/');
      if (fingBy[fingBy.length - 1].indexOf('findBy') >= 0) {
        for (const key in response.data) {
          if (!response.data[key] && response.data[key] != 0) {
            response.data[key] = '';
          }
        }
      }
      // if (response.data.code == '1') {
      //     // 如果用户被提出就不执行下面
      //     Vue.prototype.$alert(response.data.msg, '消息', {
      //         confirmButtonText: '确定',
      //         type: 'warning',
      //         callback: action => {
      //             MessageBox.close();
      //             router.push('/login')
      //         }
      //     });
      //     return;
      // } else if (response.data.code == '2') {
      //     // 如果用户被提出就不执行下面
      //     Vue.prototype.$alert(response.data.msg, '消息', {
      //         confirmButtonText: '确定',
      //         type: 'warning',
      //         callback: action => {
      //             MessageBox.close();
      //             router.push('/login')
      //         }
      //     });
      //     return;
      // } else if (response.data.code == '3' || response.data.code == '4') {
      //     //store.commit('loginflag',false);
      //     Vue.prototype.$alert(response.data.msg, '消息', {
      //         confirmButtonText: '确定',
      //         type: 'warning',
      //         callback: action => {
      //             MessageBox.close();
      //             router.push('/login')
      //         }
      //     });
      // }
      /* if (response.data.code == '1003005' || response.data.code == '1003004' || response.data.code == '1003006' || response.data.code == '1003007' || response.data.code == '3001' || response.data.code == '3009') {
                num++
                if (response.data.code == '1003007' || response.data.code == '1003005' || response.data.code == '3001' || response.data.code == '3009') {
                    authError(response.data.message) //解决弹出层多次弹出
                    return
                } else {
                    // 如果用户被提出就不执行下面
                    // Vue.prototype.common.MessageBoxalert(response.data.message, "消息", "确认", "warning").then(() => {
                    //     Vue.prototype.$urlList = urlList;
                    //     Vue.prototype.http.apiGet(Vue.prototype.$urlList.login.userlogout, { params: { userId: localStorage.getItem('ms_userId') } }).then(res => {
                    //         localStorage.removeItem('ms_username');
                    //         localStorage.removeItem('ms_userId');
                    //         store.dispatch('user/resetRoles') //清空权限
                    //         sessionStorage.removeItem('systemId');
                    //         MessageBox.close();
                    //         router.push('login');
                    //         num=0;
                    //         // this.$router.push('homePage');
                    //     });
                    // });
                    authError(response.data.message) //解决弹出层多次弹出
                    return;
                }
            } else if (response.status == '404') {
                router.push('/404')
            } */
      if (response.data.code == '3001' || response.data.code == '3009' || response.data.code == '3011') {
        num++;
        authError(response.data.message); //解决弹出层多次弹出
        return;
        // } else {
        //     // 如果用户被提出就不执行下面
        //     // Vue.prototype.common.MessageBoxalert(response.data.message, "消息", "确认", "warning").then(() => {
        //     //     Vue.prototype.$urlList = urlList;
        //     //     Vue.prototype.http.apiGet(Vue.prototype.$urlList.login.userlogout, { params: { userId: localStorage.getItem('ms_userId') } }).then(res => {
        //     //         localStorage.removeItem('ms_username');
        //     //         localStorage.removeItem('ms_userId');
        //     //         store.dispatch('user/resetRoles') //清空权限
        //     //         sessionStorage.removeItem('systemId');
        //     //         MessageBox.close();
        //     //         router.push('login');
        //     //         num=0;
        //     //         // this.$router.push('homePage');
        //     //     });
        //     // });
        //     authError(response.data.message) //解决弹出层多次弹出
        //     return;
        // }
      } else if (response.status == '404') {
        router.push('/404');
      } else if (response.data.code == '3010') {
        // 超长时间未登录强制修改密码
        Vue.prototype.common.MessageBoxalert(message, '消息', '确认', 'warning').then(() => {
          MessageBox.close();
          router.push('/changePwd');
        });
      }
    }
    let reresponseData = response.data;
    var obj = {};
    if (window.nickByUserName) {
      obj = window.nickByUserName;
    }
    if (response.config.url.indexOf('auth/sysMenu/getMenuRoot') >= 0) {
      for (var i = 0; i < response.data.menu.length; i++) {
        if (getMenuRootId.indexOf(response.data.menu[i].id) == -1) {
          getMenuRootId.push(response.data.menu[i].id);
        }
        sessionStorage['getMenuRootId'] = getMenuRootId;
      }
    }
    if (reresponseData.sign) {
      // 配合后端做的加密解密功能
      reresponseData.data = JSON.parse(Rsa.decrypt(reresponseData.data));
    }
    // 跳过把用户名转成姓名
    if (response.config.url.indexOf('platform/') >= 0) {
      return response;
    }
    if (reresponseData.list && reresponseData.list.length > 0) {
      for (var i = 0; i < reresponseData.list.length; i++) {
        reresponseData.list[i].userName = obj[reresponseData.list[i].userName]; //业务日志
        // reresponseData.list[i].clientName = obj[reresponseData.list[i].clientName] //审批记录
        reresponseData.list[i].operator = obj[reresponseData.list[i].operator]; //审批结果
        reresponseData.list[i].rekUser = obj[reresponseData.list[i].rekUser]; //审批结果 详情
        reresponseData.list[i].operateUser = obj[reresponseData.list[i].operateUser]; //审批结果 详情
        reresponseData.list[i].queryUser = obj[reresponseData.list[i].queryUser]; //审批结果 详情
        reresponseData.list[i].creator = obj[reresponseData.list[i].creator]; //审批结果 详情
        reresponseData.list[i].userAuthorized = obj[reresponseData.list[i].userAuthorized]; //审批结果 详情
      }
    }
    if (reresponseData) {
      // 审批记录详情
      // if(reresponseData.clientName){
      //     reresponseData.clientName = obj[reresponseData.clientName];
      // }
      // 审批结果
      if (reresponseData.operator) {
        reresponseData.operator = obj[reresponseData.operator];
      }
      if (reresponseData.creator) {
        reresponseData.creator = obj[reresponseData.creator];
      }
      if (reresponseData.operateUser) {
        reresponseData.operateUser = obj[reresponseData.operateUser];
      }
      if (reresponseData.queryUser) {
        reresponseData.queryUser = obj[reresponseData.queryUser];
      }
    }
    return response;
  },
  function(err) {
    let logoutFlag = false;
    if (err && err.response) {
      if (sessionStorage['getMenuRootId'].indexOf('20000000') == -1 && err.config.url.indexOf('person-query') != -1 && err.response.status == '404') {
        return;
      } else if (sessionStorage['getMenuRootId'].indexOf('30000000') == -1 && err.config.url.indexOf('ent-query') != -1 && err.response.status == '404') {
        return;
      }
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          logoutFlag = true;
          // err.message = '未授权，请重新登录(401)';
          err.message = err.response.data.msg;
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        // case 404:
        //     err.message = '请求出错(404)';
        //     break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
      Vue.prototype.$alert(err.message, '消息', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          MessageBox.close();
          if (logoutFlag) {
            router.push('/login');
          }
        }
      });
      return Promise.reject(err);
    }
    // } else {
    //     err.message = '连接服务器失败!'
    // }
    // Vue.prototype.$alert(err.message, '消息', {
    //     confirmButtonText: '确定',
    //     type: 'warning',
    //     callback: action => {
    //         MessageBox.close();
    //         if (logoutFlag) {
    //             router.push('/login')
    //         }
    //     }
    // });
    // return Promise.reject(err)
  }
);
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
Array.prototype.in_array = function(e) {
  for (i = 0; i < this.length; i++) {
    if (this[i] == e) return true;
  }
  return false;
};
// router.afterEach(route => {
//     MessageBox.close();
//   })

// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.http = http;
Vue.prototype.$urlList = urlList;
Vue.prototype.$commonUrl = commonUrl;
// Vue.prototype.$creditPerUrl = creditPerurlList;
// Vue.prototype.$creditEnUrl = creditEnurlList;
Vue.prototype.$echarts = echarts;
Vue.use(VueAxios, axios);
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     next();
//     console.log(to.redirectedFrom);
//     console.log(from);
// })
new Vue({
  router,
  store, //使用store
  render: h => h(App)
}).$mount('#app');
