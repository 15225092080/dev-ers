// const menuObj = [{ "resourceName": "用户管理", "icon": "yonghuguanli", "path": "system-user", "pid": "10000000", "id": "10020000" }, { "resourceName": "角色管理", "icon": "jiaoseguanli", "path": "system-role", "pid": "10000000", "id": "10030000" }, { "resourceName": "菜单管理", "icon": "caidanguanli", "path": "system-menu", "pid": "10000000", "id": "10050000" }, { "children": [{ "resourceName": "参数基础属性", "icon": "canshujichushuxing", "path": "system-configBase", "pid": "10040000", "id": "10210000" }, { "resourceName": "参数属性", "icon": "canshushuxing", "path": "system-config", "pid": "10040000", "id": "10220000" }], "resourceName": "系统参数", "icon": "xitongcanshu", "path": "1", "pid": "10000000", "id": "10040000" }, { "resourceName": "系统字典", "icon": "xitongzidian", "path": "system-dic", "pid": "10000000", "id": "10060000" }, { "resourceName": "机构管理", "icon": "jigouguanli", "path": "system-org", "pid": "10000000", "id": "10090000" }, { "resourceName": "邮箱配置", "icon": "youxiangpeizhi", "path": "system-email", "pid": "10000000", "id": "10080000" }, { "resourceName": "运维日志下载", "icon": "xiazaianniu", "path": "system-sysLog", "pid": "10000000", "id": "10190000" }, { "children": [{ "resourceName": "用户操作日志", "icon": "yonghucaozuorizhi", "path": "system-operateLog", "pid": "10160000", "id": "10170000" }, { "resourceName": "用户访问日志", "icon": "yonghufangwenrizhi", "path": "system-userLogin", "pid": "10160000", "id": "10180000" }], "resourceName": "安全审计", "icon": "anquanshenji", "path": "2", "pid": "10000000", "id": "10160000" }, { "resourceName": "系统通知", "icon": "tongzhibao", "path": "system-message", "pid": "10000000", "id": "10070000" }, { "children": [{ "resourceName": "业务属性", "icon": "gerenjianguanyewucanshu", "path": "creditper-config", "pid": "20050000", "id": "20050101" }, { "resourceName": "征信用户管理", "icon": "xinjianguanlian", "path": "creditper-creditUser", "pid": "20050000", "id": "20050105" }, { "resourceName": "查询原因配置", "icon": "shouquandangan", "path": "creditper-queryReason", "pid": "20050000", "id": "20050106" }, { "resourceName": "异常查询阻断", "icon": "null", "path": "creditper-exceptionRule", "pid": "20050000", "id": "20050107" }, { "resourceName": "个人工作日管理", "icon": "gerengongzuoriguanli", "path": "creditper-dateinfo", "pid": "20050000", "id": "20050103" }, { "resourceName": "业务字典", "icon": "null", "path": "creditper-bizDic", "pid": "20050000", "id": "20050108" }], "resourceName": "个人配置管理", "icon": "gerenpeizhiguanli", "path": "3", "pid": "10000000", "id": "20050000" }, { "children": [{ "resourceName": "业务属性", "icon": "qiyejianguanyewucanshu", "path": "crediten-config", "pid": "30050000", "id": "30050101" }, { "resourceName": "征信用户管理", "icon": "xinjianguanlian", "path": "crediten-creditUser", "pid": "30050000", "id": "30050105" }, { "resourceName": "查询原因配置", "icon": "shouquandangan", "path": "crediten-queryReason", "pid": "30050000", "id": "30050106" }, { "resourceName": "异常查询阻断", "icon": "qiyeyichangzuduan", "path": "crediten-exceptionRule", "pid": "30050000", "id": "30050107" }, { "resourceName": "企业工作日管理", "icon": "gerenfuheqingqiuguanli", "path": "crediten-dateinfo", "pid": "30050000", "id": "30050103" }, { "resourceName": "业务字典", "icon": "null", "path": "crediten-bizDic", "pid": "30050000", "id": "30050108" }], "resourceName": "企业配置管理", "icon": "qiyepeizhiguanli", "path": "4", "pid": "10000000", "id": "30050000" }]
const menuObj = [{
    'children': [{
            'children': [{
                    'params': {
                        'icon': 'null',
                        'id': '50010010',
                        'resourceName': '基本信息维护',
                        'pid': '50010000',
                        'url': 'ebb-basicinfoTab'
                    },
                    'id': '50010010',
                    'resourceName': '基本信息维护',
                    'pid': '50010000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50010020',
                        'resourceName': '企业身份标识整合',
                        'pid': '50010000',
                        'url': 'ecb-list'
                    },
                    'id': '50010020',
                    'resourceName': '企业身份标识整合',
                    'pid': '50010000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50010030',
                        'resourceName': '关联关系信息',
                        'pid': '50010000',
                        'url': 'ecc-list'
                    },
                    'id': '50010030',
                    'resourceName': '关联关系信息',
                    'pid': '50010000'
                }
            ],
            'params': {
                'icon': 'null',
                'id': '50010000',
                'resourceName': '客户信息',
                'pid': '50000000',
                'url': '1'
            },
            'id': '50010000',
            'resourceName': '客户信息',
            'pid': '50000000'
        },
        {
            'children': [{
                    'params': {
                        'icon': 'null',
                        'id': '50020010',
                        'resourceName': '授信协议维护',
                        'pid': '50020000',
                        'url': 'eeb-creditinfoTab'
                    },
                    'id': '50020010',
                    'resourceName': '授信协议维护',
                    'pid': '50020000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50020020',
                        'resourceName': '借贷交易维护',
                        'pid': '50020000',
                        'url': 'elb-loanTab'
                    },
                    'id': '50020020',
                    'resourceName': '借贷交易维护',
                    'pid': '50020000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50020030',
                        'resourceName': '担保交易维护',
                        'pid': '50020000',
                        'url': 'egb-guaranteeTab'
                    },
                    'id': '50020030',
                    'resourceName': '担保交易维护',
                    'pid': '50020000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50020040',
                        'resourceName': '抵质押合同信息',
                        'pid': '50020000',
                        'url': 'epb-mortgageTab'
                    },
                    'id': '50020040',
                    'resourceName': '抵质押合同信息',
                    'pid': '50020000'
                }
            ],
            'params': {
                'icon': 'null',
                'id': '50020000',
                'resourceName': '交易信息',
                'pid': '50000000',
                'url': '2'
            },
            'id': '50020000',
            'resourceName': '交易信息',
            'pid': '50000000'
        },
        {
            'children': [{
                    'params': {
                        'icon': 'null',
                        'id': '50030010',
                        'resourceName': '02版资产负债表',
                        'pid': '50030000',
                        'url': 'financial-efb-list'
                    },
                    'id': '50030010',
                    'resourceName': '02版资产负债表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030020',
                        'resourceName': '07版资产负债表',
                        'pid': '50030000',
                        'url': 'financial-efc-list'
                    },
                    'id': '50030020',
                    'resourceName': '07版资产负债表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030030',
                        'resourceName': '02版利润分配表',
                        'pid': '50030000',
                        'url': 'financial-efd-list'
                    },
                    'id': '50030030',
                    'resourceName': '02版利润分配表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030040',
                        'resourceName': '07版利润分配表',
                        'pid': '50030000',
                        'url': 'financial-efe-list'
                    },
                    'id': '50030040',
                    'resourceName': '07版利润分配表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030050',
                        'resourceName': '02版现金流量表',
                        'pid': '50030000',
                        'url': 'financial-efg-list'
                    },
                    'id': '50030050',
                    'resourceName': '02版现金流量表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030060',
                        'resourceName': '07版现金流量表',
                        'pid': '50030000',
                        'url': 'financial-eff-list'
                    },
                    'id': '50030060',
                    'resourceName': '07版现金流量表',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030070',
                        'resourceName': '事业单位资产负债',
                        'pid': '50030000',
                        'url': 'financial-efh-list'
                    },
                    'id': '50030070',
                    'resourceName': '事业单位资产负债',
                    'pid': '50030000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50030080',
                        'resourceName': '事业单位收入支出',
                        'pid': '50030000',
                        'url': 'financial-efi-list'
                    },
                    'id': '50030080',
                    'resourceName': '事业单位收入支出',
                    'pid': '50030000'
                }
            ],
            'params': {
                'icon': 'null',
                'id': '50030000',
                'resourceName': '财务报表信息',
                'pid': '50000000',
                'url': '3'
            },
            'id': '50030000',
            'resourceName': '财务报表信息',
            'pid': '50000000'
        },
        {
            'children': [{
                    'params': {
                        'icon': 'null',
                        'id': '50040010',
                        'resourceName': '报文生成',
                        'pid': '50040000',
                        'url': 'submit-submitList'
                    },
                    'id': '50040010',
                    'resourceName': '报文生成',
                    'pid': '50040000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50040020',
                        'resourceName': '报文查询',
                        'pid': '50040000',
                        'url': 'ebatch-embtBatchTab'
                    },
                    'id': '50040020',
                    'resourceName': '报文查询',
                    'pid': '50040000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50040030',
                        'resourceName': '错误信息查看',
                        'pid': '50040000',
                        'url': 'psgCheckError-list'
                    },
                    'id': '50040030',
                    'resourceName': '错误信息查看',
                    'pid': '50040000'
                }
            ],
            'params': {
                'icon': 'null',
                'id': '50040000',
                'resourceName': '报文管理',
                'pid': '50000000',
                'url': '4'
            },
            'id': '50040000',
            'resourceName': '报文管理',
            'pid': '50000000'
        },
        {
            'children': [{
                    'params': {
                        'icon': 'null',
                        'id': '50050010',
                        'resourceName': '接口数据导入',
                        'pid': '50050000',
                        'url': 'interImport-list'
                    },
                    'id': '50050010',
                    'resourceName': '接口数据导入',
                    'pid': '50050000'
                },
                {
                    'params': {
                        'icon': 'null',
                        'id': '50050020',
                        'resourceName': '接口导入错误',
                        'pid': '50050000',
                        'url': 'emieError-list'
                    },
                    'id': '50050020',
                    'resourceName': '接口导入错误',
                    'pid': '50050000'
                }
            ],
            'params': {
                'icon': 'null',
                'id': '50050000',
                'resourceName': '接口导入',
                'pid': '50000000',
                'url': '5'
            },
            'id': '50050000',
            'resourceName': '接口导入',
            'pid': '50000000'
        },
        {
            'children': [{
                'params': {
                    'icon': 'null',
                    'id': '50060010',
                    'resourceName': '标识变更',
                    'pid': '50060000',
                    'url': 'idcagsinf'
                },
                'id': '50060010',
                'resourceName': '标识变更',
                'pid': '50060000'
            }],
            'params': {
                'icon': 'null',
                'id': '50060000',
                'resourceName': '标识变更',
                'pid': '50000000',
                'url': '6'
            },
            'id': '50060000',
            'resourceName': '标识变更',
            'pid': '50000000'
        },
        {
            'children': [{
                'params': {
                    'icon': 'null',
                    'id': '50070010',
                    'resourceName': '参数管理',
                    'pid': '50070000',
                    'url': 'econfig-entConficTab'
                },
                'id': '50070010',
                'resourceName': '参数管理',
                'pid': '50070000'
            }],
            'params': {
                'icon': 'null',
                'id': '50070000',
                'resourceName': '配置管理',
                'pid': '50000000',
                'url': '7'
            },
            'id': '50070000',
            'resourceName': '配置管理',
            'pid': '50000000'
        }
    ],
    'params': {
        'icon': 'layui-icon-set1',
        'id': '50000000',
        'resourceName': '企业征信报送系统',
        'pid': '0',
        'url': 'null'
    },
    'id': '50000000',
    'resourceName': '企业征信报送系统',
    'pid': '0'
}];
export default menuObj;