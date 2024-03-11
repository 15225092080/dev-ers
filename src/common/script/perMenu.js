// const menuObj = [{ "resourceName": "用户管理", "icon": "yonghuguanli", "path": "system-user", "pid": "10000000", "id": "10020000" }, { "resourceName": "角色管理", "icon": "jiaoseguanli", "path": "system-role", "pid": "10000000", "id": "10030000" }, { "resourceName": "菜单管理", "icon": "caidanguanli", "path": "system-menu", "pid": "10000000", "id": "10050000" }, { "children": [{ "resourceName": "参数基础属性", "icon": "canshujichushuxing", "path": "system-configBase", "pid": "10040000", "id": "10210000" }, { "resourceName": "参数属性", "icon": "canshushuxing", "path": "system-config", "pid": "10040000", "id": "10220000" }], "resourceName": "系统参数", "icon": "xitongcanshu", "path": "1", "pid": "10000000", "id": "10040000" }, { "resourceName": "系统字典", "icon": "xitongzidian", "path": "system-dic", "pid": "10000000", "id": "10060000" }, { "resourceName": "机构管理", "icon": "jigouguanli", "path": "system-org", "pid": "10000000", "id": "10090000" }, { "resourceName": "邮箱配置", "icon": "youxiangpeizhi", "path": "system-email", "pid": "10000000", "id": "10080000" }, { "resourceName": "运维日志下载", "icon": "xiazaianniu", "path": "system-sysLog", "pid": "10000000", "id": "10190000" }, { "children": [{ "resourceName": "用户操作日志", "icon": "yonghucaozuorizhi", "path": "system-operateLog", "pid": "10160000", "id": "10170000" }, { "resourceName": "用户访问日志", "icon": "yonghufangwenrizhi", "path": "system-userLogin", "pid": "10160000", "id": "10180000" }], "resourceName": "安全审计", "icon": "anquanshenji", "path": "2", "pid": "10000000", "id": "10160000" }, { "resourceName": "系统通知", "icon": "tongzhibao", "path": "system-message", "pid": "10000000", "id": "10070000" }, { "children": [{ "resourceName": "业务属性", "icon": "gerenjianguanyewucanshu", "path": "creditper-config", "pid": "20050000", "id": "20050101" }, { "resourceName": "征信用户管理", "icon": "xinjianguanlian", "path": "creditper-creditUser", "pid": "20050000", "id": "20050105" }, { "resourceName": "查询原因配置", "icon": "shouquandangan", "path": "creditper-queryReason", "pid": "20050000", "id": "20050106" }, { "resourceName": "异常查询阻断", "icon": "null", "path": "creditper-exceptionRule", "pid": "20050000", "id": "20050107" }, { "resourceName": "个人工作日管理", "icon": "gerengongzuoriguanli", "path": "creditper-dateinfo", "pid": "20050000", "id": "20050103" }, { "resourceName": "业务字典", "icon": "null", "path": "creditper-bizDic", "pid": "20050000", "id": "20050108" }], "resourceName": "个人配置管理", "icon": "gerenpeizhiguanli", "path": "3", "pid": "10000000", "id": "20050000" }, { "children": [{ "resourceName": "业务属性", "icon": "qiyejianguanyewucanshu", "path": "crediten-config", "pid": "30050000", "id": "30050101" }, { "resourceName": "征信用户管理", "icon": "xinjianguanlian", "path": "crediten-creditUser", "pid": "30050000", "id": "30050105" }, { "resourceName": "查询原因配置", "icon": "shouquandangan", "path": "crediten-queryReason", "pid": "30050000", "id": "30050106" }, { "resourceName": "异常查询阻断", "icon": "qiyeyichangzuduan", "path": "crediten-exceptionRule", "pid": "30050000", "id": "30050107" }, { "resourceName": "企业工作日管理", "icon": "gerenfuheqingqiuguanli", "path": "crediten-dateinfo", "pid": "30050000", "id": "30050103" }, { "resourceName": "业务字典", "icon": "null", "path": "crediten-bizDic", "pid": "30050000", "id": "30050108" }], "resourceName": "企业配置管理", "icon": "qiyepeizhiguanli", "path": "4", "pid": "10000000", "id": "30050000" }]
const menuObj = [{
  'children': [{
    'children': [{
      'params': {
        'icon': null,
        'id': '40010010',
        'resourceName': '基本信息维护',
        'pid': '40010000',
        'url': 'pbb-basicinfoTab'
      },
      'id': '40010010',
      'resourceName': '基本信息维护',
      'pid': '40010000'
    },
    {
      'params': {
        'icon': null,
        'id': '40010020',
        'resourceName': '家族关系维护',
        'pid': '40010000',
        'url': 'pcd-list'
      },
      'id': '40010020',
      'resourceName': '家族关系维护',
      'pid': '40010000'
    },
    {
      'params': {
        'icon': null,
        'id': '40010030',
        'resourceName': '个人证件整合',
        'pid': '40010000',
        'url': 'pcc-list'
      },
      'id': '40010030',
      'resourceName': '个人证件整合',
      'pid': '40010000'
    },
    {
      'params': {
        'icon': null,
        'id': '40010040',
        'resourceName': '个人证件有效期',
        'pid': '40010000',
        'url': 'pcb-list'
      },
      'id': '40010040',
      'resourceName': '个人证件有效期',
      'pid': '40010000'
    }],
    'params': {
      'icon': null,
      'id': '40010000',
      'resourceName': '客户信息',
      'pid': '40000000',
      'url': null
    },
    'id': '40010000',
    'resourceName': '客户信息',
    'pid': '40000000'
  },
  {
    'children': [{
      'params': {
        'icon': null,
        'id': '40020010',
        'resourceName': '授信协议维护',
        'pid': '40020000',
        'url': 'peb-creditinfoTab'
      },
      'id': '40020010',
      'resourceName': '授信协议维护',
      'pid': '40020000'
    },
    {
      'params': {
        'icon': null,
        'id': '40020020',
        'resourceName': '借贷交易维护',
        'pid': '40020000',
        'url': 'plb-loanTab'
      },
      'id': '40020020',
      'resourceName': '借贷交易维护',
      'pid': '40020000'
    },
    {
      'params': {
        'icon': null,
        'id': '40020030',
        'resourceName': '特殊事件信息',
        'pid': '40020000',
        'url': 'pls-list'
      },
      'id': '40020030',
      'resourceName': '特殊事件信息',
      'pid': '40020000'
    },
    {
      'params': {
        'icon': null,
        'id': '40020040',
        'resourceName': '担保交易维护',
        'pid': '40020000',
        'url': 'pgb-guaranteeTab'
      },
      'id': '40020040',
      'resourceName': '担保交易维护',
      'pid': '40020000'
    },
    {
      'params': {
        'icon': null,
        'id': '40020050',
        'resourceName': '抵质押合同维护',
        'pid': '40020000',
        'url': 'ppb-mortgageTab'
      },
      'id': '40020050',
      'resourceName': '抵质押合同维护',
      'pid': '40020000'
    }],
    'params': {
      'icon': null,
      'id': '40020000',
      'resourceName': '交易信息',
      'pid': '40000000',
      'url': null
    },
    'id': '40020000',
    'resourceName': '交易信息',
    'pid': '40000000'
  },
  {
    'children': [{
      'params': {
        'icon': null,
        'id': '40030010',
        'resourceName': '报文生成',
        'pid': '40030000',
        'url': 'submit-submit'
      },
      'id': '40030010',
      'resourceName': '报文生成',
      'pid': '40030000'
    },
    {
      'params': {
        'icon': null,
        'id': '40030020',
        'resourceName': '报文查询',
        'pid': '40030000',
        'url': 'pbatch-pmbtBatchTab'
      },
      'id': '40030020',
      'resourceName': '报文查询',
      'pid': '40030000'
    },
    {
      'params': {
        'icon': null,
        'id': '40030030',
        'resourceName': '错误信息查看',
        'pid': '40030000',
        'url': 'psgCheckError-list'
      },
      'id': '40030030',
      'resourceName': '错误信息查看',
      'pid': '40030000'
    }],
    'params': {
      'icon': null,
      'id': '40030000',
      'resourceName': '报文管理',
      'pid': '40000000',
      'url': null
    },
    'id': '40030000',
    'resourceName': '报文管理',
    'pid': '40000000'
  },
  {
    'children': [{
      'params': {
        'icon': null,
        'id': '40040010',
        'resourceName': '接口数据导入',
        'pid': '40040000',
        'url': 'interImport-list'
      },
      'id': '40040010',
      'resourceName': '接口数据导入',
      'pid': '40040000'
    },
    {
      'params': {
        'icon': null,
        'id': '40040020',
        'resourceName': '接口导入错误',
        'pid': '40040000',
        'url': 'pmieError-list'
      },
      'id': '40040020',
      'resourceName': '接口导入错误',
      'pid': '40040000'
    }],
    'params': {
      'icon': null,
      'id': '40040000',
      'resourceName': '接口导入',
      'pid': '40000000',
      'url': null
    },
    'id': '40040000',
    'resourceName': '接口导入',
    'pid': '40000000'
  },
  {
    'children': [{
      'params': {
        'icon': null,
        'id': '40050010',
        'resourceName': '标识变更',
        'pid': '40050000',
        'url': 'idcagsinf'
      },
      'id': '40050010',
      'resourceName': '标识变更',
      'pid': '40050000'
    }],
    'params': {
      'icon': null,
      'id': '40050000',
      'resourceName': '标识变更',
      'pid': '40000000',
      'url': null
    },
    'id': '40050000',
    'resourceName': '标识变更',
    'pid': '40000000'
  },
  {
    'children': [{
      'params': {
        'icon': null,
        'id': '40060010',
        'resourceName': '参数管理',
        'pid': '40060000',
        'url': 'pconfig-personConficTab'
      },
      'id': '40060010',
      'resourceName': '参数管理',
      'pid': '40060000'
    }],
    'params': {
      'icon': null,
      'id': '40060000',
      'resourceName': '配置管理',
      'pid': '40000000',
      'url': null
    },
    'id': '40060000',
    'resourceName': '配置管理',
    'pid': '40000000'
  }],
  'params': {
    'icon': 'layui-icon-set1',
    'id': '40000000',
    'resourceName': '个人征信报送系统',
    'pid': '0',
    'url': null
  },
  'id': '40000000',
  'resourceName': '个人征信报送系统',
  'pid': '0'
}];
export default menuObj;
