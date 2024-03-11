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
        that.http.apiGet(that.$urlList.org.stop, { params: { reason: value, orgCode: row.orgCode, recordStopFlag: row.recordStopFlag } }, { showLoading: true }).then(res => {
          that.common.submitMsg(res);
        });
      })
      ['catch'](() => {
        that.reload();
      });
  } else {
    that.http.apiGet(that.$urlList.org.stop, { params: { orgCode: row.orgCode, recordStopFlag: row.recordStopFlag } }, { showLoading: true }).then(res => {
      that.common.submitMsg(res);
    });
  }
};
export const getOrgRole = async _this => {
  let response = await _this.http.apiGet(_this.$urlList.role.getOrgRole); // 角色提供
  let arr = [];
  if (response.data) {
    response.data.forEach(element => {
      arr.push({ value: element.roleId, label: element.roleName });
    });
  }
  if (arr.length > 0) {
    _this.common.Control(_this.arrList, {
      roleId: {
        checkboxs: arr
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      roleId: {
        header: false
      }
    });
  }
};
export const getParam = async _this => {
  let response = await _this.http.apiGet(_this.$urlList.user.getConfigValue, { params: { configCode: 'financialOrgIdFlag' } });
  if (response.data == '1') {
    _this.common.Control(_this.arrList, {
      financialOrgCode: {
        rule: [
          { max: 20, message: '长度不超过20位', trigger: 'blur' },
          { type: '1010', validator: _this.validator.comValidate, trigger: 'blur' },
          { type: _this, validator: _this.validator.ajaxFinancialOrgCode, trigger: 'blur' }
        ]
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      financialOrgCode: {
        rule: [
          { max: 20, message: '长度不超过20位', trigger: 'blur' },
          { type: '1010', validator: _this.validator.comValidate, trigger: 'blur' },
          { required: true, validator: _this.validator.empty, trigger: 'blur' },
          { type: _this, validator: _this.validator.ajaxFinancialOrgCode, trigger: 'blur' }
        ]
      }
    });
  }
};
export const getObjlen = obj => {
  // 判断一个OBJECT里的值是否为空
  return Object.keys(obj).filter(v => obj[v]).length;
};
export const formTemplate = _this => {
  return {
    findById: _this.$urlList.org.findById,
    paramsValue: 'orgCode',
    paramsKey: 'orgCode'
  };
};
