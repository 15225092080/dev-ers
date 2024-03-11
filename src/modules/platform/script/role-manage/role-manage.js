let that;
export const bindEvent = obj => {
  that = obj;
};
export const changestopFlag = row => {
  let messageObj = {
    message: '停用原因?',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^(?!.{31}|^\s*$)/g,
    inputErrorMessage: '停用原因不能为空，且最多输入30个字符'
  };
  if (row.status == '0') {
    that.common
      .MessageBoxprompt(messageObj)
      .then(({ value }) => {
        that.http.apiGet(that.$urlList.role.changeStopFlag, { params: { reason: value, id: row.roleId, status: row.status } }).then(res => {
          that.common.submitMsg(res);
        });
      })
      ['catch'](() => {
        that.reload();
      });
  } else {
    that.http.apiGet(that.$urlList.role.changeStopFlag, { params: { id: row.roleId, status: row.status } }).then(res => {
      that.common.submitMsg(res);
    });
  }
};
