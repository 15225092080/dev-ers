import _c from '@/common/script/common_c.js';
export default {
  rollback: function(row, url, that) {
    if (row.length == 1) {
      that.visibleRollback = true;
      that.paramRollback = {
        appId: row[0].appId,
        title: '应用管理-回滚'
      };
    } else {
      _c.message(true, '请选择1条以上进行操作！', 'warning', '800');
    }
  },
  VersionUpdate: function(row, that) {
    if (row.length == 1) {
      let paramData = {
        appId: row[0].appId
      };
      that.http.apiPost(that.detailUrl.url, paramData).then(res => {
        if (res.code == '00000001') {
          _c.message(true, res.msg, 'error', '800', function() {
            window.closeDialog();
          });
        } else {
          that.visibleUpdate = true;
          that.paramUpdate = {
            title: '应用管理-版本更新',
            formItem: res
          };
        }
      });
    } else {
      _c.message(true, '请选择1条以上进行操作！', 'warning', '800');
    }
  }
};
