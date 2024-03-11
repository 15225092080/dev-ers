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
  if (row.recordStopFlag == '0') {
    that.common
      .MessageBoxprompt(messageObj)
      .then(({ value }) => {
        that.http.apiGet(that.$urlList.corporationOrg.stopOrg, { params: { reason: value, orgCode: row.orgCode, recordStopFlag: row.recordStopFlag } }, { showLoading: true }).then(res => {
          that.common.submitMsg(res);
        });
      })
      ['catch'](() => {
        that.reload();
      });
  } else {
    that.http.apiGet(that.$urlList.corporationOrg.stopOrg, { params: { orgCode: row.orgCode, recordStopFlag: row.recordStopFlag } }, { showLoading: true }).then(res => {
      that.common.submitMsg(res);
    });
  }
};
