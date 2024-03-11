export const submitFun = (formItem, _this) => {
  let param = _this.$refs[formItem].formItem;
  _this.$refs[formItem].$refs[formItem].validate(valid => {
    if (valid) {
      _this.http
        .apiPost(_this.url, param, {
          showLoading: true
        })
        .then(res => {
          _this.common.submitMsg(res, _this).then(() => {
            sessionStorage.removeItem(sessionStorage.getItem('systemId') + '_' + param.typeId);
            _this.common.getdic(_this.$urlList.common.dic, param.typeId);
          });
        });
    } else {
      _this.common.message(true, '验证不通过，提交失败', 'warning', '800', function() {
        return false;
      });
    }
  });
};
