<template>
  <div>
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" submitFun labelWidth="100px" @eventChange="eventChange">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      buttonGroup: ['submit', 'cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.ecb.getValUrl, // 接口
        param: {id: this.$parent.detailUrl.resId} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {

  },
  watch: {
  },
  methods: {
    // 监听下拉框事件
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('entCertType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.arrList, {
            'entCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
              ]
            }
          });
        } else if (obj.e == 20) {
          _this.common.Control(_this.arrList, {
            'entCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.isCCode, trigger: 'blur'}
              ]
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'entCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.isCorpNo, trigger: 'blur'}
              ]
            }
          });
        }
      });
      _this.common.onselect('othEntCertType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.arrList, {
            'othEntCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
              ]
            }
          });
        } else if (obj.e == 20) {
          _this.common.Control(_this.arrList, {
            'othEntCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.isCCode, trigger: 'blur'}
              ]
            }
          });
        } else if (obj.e == 30) {
          _this.common.Control(_this.arrList, {
            'othEntCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.isCorpNo, trigger: 'blur'}
              ]
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'othEntCertNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {max: 40, message: '最多40位', trigger: 'blur'}
              ]
            }
          });
        }
      });
    },
    init() {
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.ecb.creUrl;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'custId',
              value: '',
              label: '客户号',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true, validator: this.validator.validatorCustId, trigger: 'blur'}, 不用校验客户号重复
                {max: 64, message: '最多64位', trigger: 'blur'}
              // ,{validator: this.cleanSpelChar,trigger: "blur"}
              ]
            },
            {type: 'input',
              name: 'entName',
              value: '',
              label: '企业名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 80, message: '最多80位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'entCertType',
              value: '',
              param: 'E_InfoIDType2',
              label: '企业身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'entCertNum',
              value: '',
              label: '企业身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 40, message: '最多40位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'othEntCertType',
              value: '',
              param: 'E_OtherType',
              label: '企业其他身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'othEntCertNum',
              value: '',
              param: '',
              label: '企业其他身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 40, message: '最多40位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'certAssFlg',
              value: '',
              param: 'E_OthAssFlg',
              label: '身份标识关系有效标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'select',
              name: 'noReport',
              value: '0',
              param: 'E_NO_REPORT',
              filter: ['2'],
              label: '免报标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {children: 'children',
                label: function (a, b) {
                  return a.name
                  ;
                }},
              name: 'deptCode',
              value: '',
              label: '所属机构',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]}
          ]
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.ecb.updUrl;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'custId',
              value: '',
              label: '客户号',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'entName',
              value: '',
              label: '企业名称',
              span: 12,
              hide:true,
              noReset:true
            }
          ],
          [
            {type: 'select',
              name: 'entCertType',
              value: '',
              param: 'E_InfoIDType2',
              label: '企业身份标识类型',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'entCertNum',
              value: '',
              label: '企业身份标识号码',
              span: 12,
              hide:true,
              noReset:true
            }
          ],
          [
            {type: 'select',
              name: 'othEntCertType',
              value: '',
              param: 'E_OtherType',
              label: '企业其他身份标识类型',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'othEntCertNum',
              value: '',
              param: '',
              label: '企业其他身份标识号码',
              span: 12,
              hide:true,
              noReset:true
            }
          ],
          [
            {type: 'select',
              name: 'certAssFlg',
              value: '',
              param: 'E_OthAssFlg',
              label: '身份标识关系有效标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'select',
              name: 'noReport',
              value: '',
              param: 'E_NO_REPORT',
              filter: ['2'],
              label: '免报标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {children: 'children',
                label: function (a, b) {
                  return a.name
                  ;
                }},
              name: 'deptCode',
              value: '',
              label: '所属机构',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]},
            {type: 'input',
              name: 'id',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'reportState',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'auditingState',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'centerExist',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'dataState',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'operator',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            },
            {type: 'input',
              name: 'orgEntity',
              value: '',
              label: '所属机构',
              span: 12,
              hide:true,
              noReset:true
             }
          ]
        ];
      }
      // this.setOrgVal()
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>

</style>
