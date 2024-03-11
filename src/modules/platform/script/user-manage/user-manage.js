export const batchOperation = (url, param, _this) => {
  _this.http
    .apiGet(url, {
      params: param
    })
    .then(res => {
      _this.common.submitMsg(res, _this);
    });
};
export const systemUnlock = (row, _this, urlName) => {
  let idArr = [],
    flag;
  if (row.length > 0) {
    // 是否有选中
    if (localStorage.getItem('ms_userId') == row[0].userId) {
      flag = false;
    } else {
      flag = true;
    }
    if (row.length == 1) {
      // 单选一条,只有锁定状态为“密码错误锁定”和系统锁定时才允许解锁，反之弹出提示
      if (flag) {
        if (row[0].lockType == '0' || row[0].lockType == '3') {
          // 先预留接口
          _this.common.message(true, '锁定状态为“未锁定”或“业务锁定”时，不允许解锁', 'warning', '2000');
          return false;
        } else {
          idArr = row[0].userId;
        }
      } else {
        _this.common.message(true, '用户仅可操作本人部分信息', 'error', '2000');
        return false;
      }
    } else {
      // 批量解锁时，选定信息内含有除“密码错误锁定”外的其他状态，则仅解锁其中的密码错误锁定
      row = row.filter(item => item.lockType != 0 && item.userId !== localStorage.getItem('ms_userId'));
      if (row.length > 0) {
        for (let i = 0; i < row.length; i++) {
          idArr.push(row[i].userId);
        }
      } else {
        _this.common.message(true, '没有可解锁的用户', 'error', '2000');
        return false;
      }
      idArr = idArr.join();
    }
    _this.common
      .MessageBoxconfirm('确认此项操作?', '提示', '确定', '取消', 'warning')
      .then(() => {
        batchOperation(
          _this.$urlList[urlName].unlockUser,
          {
            id: idArr
          },
          _this
        ); // 先预留接口
      })
      ['catch'](() => {});
  } else {
    _this.common.message(true, '请选择1条以上进行操作！', 'warning', '1000');
  }
  return true;
};
export const resetPassword = (row, _this, urlName) => {
  let idArr = [],
    flag;
  if (row.length > 0) {
    if (localStorage.getItem('ms_userId') == row[0].userId) {
      flag = false;
    } else {
      flag = true;
    }
    if (row.length == 1) {
      if (flag) {
        idArr = row[0].userId;
      } else {
        _this.common.message(true, '用户仅可操作本人部分信息', 'error', '2000');
        return false;
      }
    } else {
      row = row.filter(item => item.userId !== localStorage.getItem('ms_userId'));
      for (var i = 0; i < row.length; i++) {
        idArr.push(row[i].userId);
      }
      idArr = idArr.join();
    }
    _this.common
      .MessageBoxconfirm('确认此项操作?', '提示', '确定', '取消', 'warning')
      .then(() => {
        batchOperation(
          _this.$urlList[urlName].resetPassword,
          {
            id: idArr
          },
          _this
        );
      })
      ['catch'](() => {});
  } else {
    _this.common.message(true, '请选择1条以上进行操作！', 'warning', '1000');
  }
  return true;
};

export const changestopFlag = (row, _this, urlName) => {
  if (localStorage.getItem('ms_userId') !== row.userId) {
    let messageObj = {
      message: '停用原因?',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^(?!.{31}|^\s*$)/g,
      inputErrorMessage: '停用原因不能为空，且最多输入30个字符'
    };
    if (row.stopFlag == '0') {
      _this.common
        .MessageBoxprompt(messageObj)
        .then(({ value }) => {
          _this.http
            .apiGet(_this.$urlList[urlName].changeStatus, {
              params: {
                reason: value,
                id: row.userId,
                status: row.stopFlag
              }
            })
            .then(res => {
              _this.common.submitMsg(res, _this);
            });
        })
        ['catch'](() => {
          _this.reload();
        });
    } else {
      _this.http
        .apiGet(_this.$urlList[urlName].changeStatus, {
          params: {
            id: row.userId,
            status: row.stopFlag
          }
        })
        .then(res => {
          _this.common.submitMsg(res, _this);
        });
    }
  } else {
    _this.common.message(true, '用户仅可操作本人部分信息', 'error', '2000');
  }
};
export const getOrgRole = async (_this, roleType, orgCode) => {
  // 表单赋值
  // 切换用户类型的时候 清空roleIds的值 bug13908
  _this.common.Control(_this.arrList, {
    roleIds: {
      value: []
    }
  });
  let response = await _this.http.apiGet(_this.$urlList.role.getOrgRole, {
    params: {
      roleType: roleType,
      orgCode: orgCode
    }
  });
  let arr = [];
  if (response.data) {
    response.data.forEach(element => {
      arr.push({
        value: element.roleId,
        label: element.roleName
      });
    });
  }
  if (arr.length > 0) {
    _this.common.Control(_this.arrList, {
      roleIds: {
        checkboxs: arr,
        header: '角色配置',
        hide: false
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      roleIds: {
        header: false,
        hide: true
      }
    });
  }
};
// 校验身份证号是否必填，0必填，1不必填
export const checkIdcard = async _this => {
  let response = await _this.http.apiGet(_this.$urlList.user.getConfigValue, {
    params: {
      configCode: 'idcardflag'
    }
  });
  if (response.data == '0') {
    _this.common.Control(_this.arrList, {
      idCard: {
        rule: [
          {
            required: true,
            validator: _this.validator.empty,
            trigger: 'blur'
          },
          {
            validator: _this.validator.checkIdcard,
            trigger: 'blur'
          }
        ]
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      idCard: {
        rule: [
          {
            validator: _this.validator.checkIdcard,
            trigger: 'blur'
          }
        ]
      }
    });
  }
};
// 校验手机号码是否必填，0必填，1不必填
export const checkMobile = async _this => {
  let response = await _this.http.apiGet(_this.$urlList.user.getConfigValue, {
    params: {
      configCode: 'phoneFlag'
    }
  });
  if (response.data == '0') {
    _this.common.Control(_this.arrList, {
      mobile: {
        rule: [
          {
            required: true,
            validator: _this.validator.empty,
            trigger: 'blur'
          },
          { max: 20, message: '长度不超过20位', trigger: 'blur' },
          { type: '0010|-', validator: _this.validator.comValidate, trigger: 'blur' }
        ]
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      mobile: {
        rule: [{ max: 20, message: '长度不超过20位', trigger: 'blur' }, { type: '0010|-', validator: _this.validator.comValidate, trigger: 'blur' }]
      }
    });
  }
};
// 校验手机号码是否必填
export const checkDeptName = async _this => {
  let response = await _this.http.apiGet(_this.$urlList.user.getConfigValue, {
    params: {
      configCode: 'deptNotNull'
    }
  });
  if (response.data == '1') {
    _this.common.Control(_this.arrList, {
      deptName: {
        rule: []
      }
    });
  } else {
    _this.common.Control(_this.arrList, {
      deptName: {
        rule: [
          {
            required: true,
            validator: _this.validator.empty,
            trigger: 'blur'
          }
        ]
      }
    });
  }
};

export const getParam = async _this => {
  let userData = JSON.parse(sessionStorage.userData);
  if (JSON.parse(_this.$store.getters.getLoginStatus).legalEntityFlag == '0') {
    // 判断当前用户所属机构是否是法人机构
    _this.common.Control(_this.arrList, {
      userType: {
        filter: ['B', 'A']
      }
    });
  }
  if (userData.userType == 'C' || userData.userType == 'D') {
    _this.common.Control(_this.arrList, {
      userType: {
        filter: ['B', 'A']
      }
    });
  }
  checkIdcard(_this);
  checkMobile(_this);
  checkDeptName(_this);
};

export const formTemplate = _this => {
  return {
    findById: _this.$urlList.user.findById,
    paramsValue: 'userId',
    paramsKey: 'id'
  };
};
