// import Vue from 'vue';
import http from '@/common/script/http.js';
let systemId = sessionStorage.getItem('systemId');
exports.install = (Vue, options) => {
  Vue.prototype.common.getdic = function (url, param, callbackFn) { // 获取字典
    if (typeof url != 'undefined' && !sessionStorage.getItem(systemId + '_' + param)) {
      http.apiGet(url, { params: { type: param } }).then((res) => {
        sessionStorage[systemId + '_' + param] = JSON.stringify(res);
        if (callbackFn) {
          callbackFn();
        }
      });
    } else {
        if (callbackFn) {
            callbackFn();
        }
    }
  };
  Vue.prototype.common.setVal = async function (arr, url, param) { // 表单赋值
    let response = await http.apiPost(url, param);
    // arr.map((item)=>{
    //     item.map((i,index,array)=>{
    //         i.value = response['data'][i.name]
    //     })
    // })
    return response;
  };
  Vue.prototype.common.submitMsg = function (res, that) { // 表单赋值
    // let that = this;
    if (res.code == '00000000') {
      return this.MessageBoxalert(res.msg, '消息', '确认', 'success').then(() => {
        // window.reload()
        if (that) {
 that.$refs.dataTable.getTableData();
}
      });
    } else {
      return this.MessageBoxalert(res.msg, '消息', '确认', 'error', null, null, null, 'customAlert').then(() => {
        // window.reload()
      });
    }
  };
};

