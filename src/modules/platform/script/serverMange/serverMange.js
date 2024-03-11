import _c from '@/common/script/common_c.js';
import http from '@/common/script/http.js';
export default {
  certification: function(row, url) {
    if (row.length > 0) {
      let paramData,
        serverIp = [],
        serverUsrName = [],
        serverPwd = [];
      if (row.length == 0) {
        paramData = {
          serverIp: row[0].serverIp,
          serverUsrName: row[0].serverUsrName,
          serverPwd: row[0].serverPwd
        };
      } else {
        for (var i = 0; i < row.length; i++) {
          serverIp.push(row[i].serverIp);
          serverUsrName.push(row[i].serverUsrName);
          serverPwd.push(row[i].serverPwd);
        }
        paramData = {
          serverIp: serverIp.join(','),
          serverUsrName: serverUsrName.join(','),
          serverPwd: serverPwd.join(',')
        };
      }
      http.apiPost(url, paramData, { showLoading: true }).then(res => {
        if (res.code == '00000001') {
          _c.MessageBoxalert(res.msg, '消息', '确认', 'error');
        } else {
          _c.MessageBoxalert(res.msg, '消息', '确认', 'success', function() {
            window.reload();
          });
        }
      });
    } else {
      _c.message(true, '请选择1条以上进行操作！', 'warning', '800');
    }
  },
  serverapplation: function(row, that) {
    if (row.length == 1) {
      if (row[0].serverStatus == 1) {
        that.$router.push({
          path: '/Server-applation',
          query: {
            serverIp: row[0].serverIp
          }
        });
      } else {
        _c.message(true, '认证未通过', 'warning', '800');
      }
    } else {
      _c.message(true, '请选择1条进行操作！', 'warning', '800');
    }
  },
  CommandLine: function(row, that) {
    if (row.length == 1) {
      if (row[0].serverStatus == 1) {
        let paramData = {
          serverIp: row[0].serverIp,
          serverUsrName: row[0].serverUsrName,
          serverPwd: row[0].serverPwd
        };
        http.apiPost(that.$urlList.Server.connection, paramData).then(res => {
          if (!res) {
            _c.MessageBoxalert('请确认返回信息', '消息', '确认', 'error');
          } else {
            that.visiblecommand = true;
            that.paramcommand = {
              title: '命令行工具'
            };
          }
        });
      } else {
        _c.message(true, '认证未通过', 'warning', '800');
      }
    } else {
      _c.message(true, '请选择1条进行操作！', 'warning', '800');
    }
  },
  monitor: function(row, that) {
    if (row.length == 1) {
      that.http
        .apiPost(that.detailUrl.url, {
          serverIp: row[0][that.detailUrl.resId]
        })
        .then(res => {
          if (res.serverStatus == 1) {
            let paramData = {
              serverIp: row[0].serverIp,
              serverUsrName: row[0].serverUsrName,
              serverPwd: row[0].serverPwd,
              serverPort: row[0].serverPort
            };
            that.http.apiPost(that.$urlList.Server.openNodeExporter, paramData).then(res => {
              if (res) {
                window.open(res);
              }
            });
          } else {
            _c.message(true, '认证未通过', 'warning', '800');
          }
        });
    } else {
      _c.message(true, '请选择1条进行操作！', 'warning', '800');
    }
  }
};
