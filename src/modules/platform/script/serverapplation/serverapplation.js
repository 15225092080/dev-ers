export default {
  addfunServer: function(serverIp, that) {
    that.visibleEdit = true;
    that.paramEdit = {
      serverIp: serverIp,
      title: '服务器应用管理-新增'
    };
  },
  deleteFunServer: function(row, that) {
    if (row.length > 0) {
      let paramData = {},
        serverIpArr = [],
        appIdArr = [];
      if (row.length == 1) {
        paramData = {
          serverIp: row[0].serverIp,
          appId: row[0].appId
        };
      } else {
        for (var i = 0; i < row.length; i++) {
          serverIpArr.push(row[i][serverIp]);
          appIdArr.push(row[i][appId]);
        }
        paramData = {
          serverIp: serverIpArr.join(','),
          appId: appIdArr.join(',')
        };
      }
      that
        .$confirm('确认此项操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this['delete'](that, paramData);
        });
      // that.c.MessageBoxconfirm("确认此项操作?", "提示", "确定", "取消", "warning",this.delete(that,paramData))
    } else {
      that.c.message(true, '请选择1条以及以上进行操作！', 'warning', '800');
    }
  },
  delete: function(that, paramData) {
    that.http.apiPost(that.detailUrl.delUrl, paramData).then(res => {
      if ('00000000' == res.code) {
        that.c.message(true, res.msg, 'success', '800', function() {
          window.reload();
        });
      } else {
        that.c.message(true, res.msg, 'error', '800');
      }
    });
  },
  start: function(row, that, url) {
    if (row.length == 1) {
      let paramData = {
        serverIp: row[0].serverIp,
        appId: row[0].appId
      };
      that
        .$confirm('确认此项操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.http.apiPost(url, paramData).then(res => {
            if (res.code == '00000001') {
              that.c.MessageBoxalert(res.msg, '消息', '确认', 'error');
            } else {
              that.c.MessageBoxalert(res.msg, '消息', '确认', 'success', function() {
                window.reload();
              });
            }
          });
        });
    } else {
      that.c.message(true, '请选择1条以上进行操作！', 'warning', '800');
    }
  },
  stop: function(row, that, url) {
    if (row.length == 1) {
      let paramData = {
        serverIp: row[0].serverIp,
        appId: row[0].appId
      };
      that
        .$confirm('确认此项操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.http.apiPost(url, paramData).then(res => {
            if (res.code == '00000001') {
              that.c.MessageBoxalert(res.msg, '消息', '确认', 'error');
            } else {
              that.c.MessageBoxalert(res.msg, '消息', '确认', 'success', function() {
                window.reload();
              });
            }
          });
        });
    } else {
      that.c.message(true, '请选择1条以上进行操作！', 'warning', '800');
    }
  }
};
