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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="160px" @eventChange="eventChange">
          <el-button slot="slotBtn"  class="submit_btn" @click="callbackFun('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import Bus from '@/common/script/bus.js';
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
      buttonGroup: ['cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.eld.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  watch: {
  },
  methods: {
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.idType = 0; // 获取身份类型
      _this.common.onselect('arlpIdType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = {params: {type: 'E_InfoIDType' + obj.e}};
        _this.getSystemId(param);
        _this.ipType = obj.e;
      });
      _this.common.onselect('arlpCertType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        // 身份类型
        if (_this.ipType == 1) {
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkIdcard, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 2) { // 护照
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkPassport, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 5) { // 港澳居民往来大陆通行证
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkHkmacidpassValidator, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 6) { // 台湾通行证
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkRocValidator, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {max: 20, message: '最多20位', trigger: 'blur'}
                ]
              }
            });
          }
        } else if (_this.ipType == 2) { // 组织机构
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 20) {
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.isCCode, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'arlpCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.isCorpNo, trigger: 'blur'}
                ]
              }
            });
          }
        }
      });
      // 当“还款责任人类型为“2-保证人”时，“联保标志”、“保证合同编号”不应为空
      _this.common.onselect('arlpType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == '1') {
          _this.common.Control(_this.arrList, {
            'arlpAmt': {
              value: '',
              disabled: true,
              rule: [{required: false, trigger: 'blur'}]
            },
            'wartySign': { // 联保标志
              value: '',
              disabled: true,
              rule: [{required: false, trigger: 'change'}]
            },
            'maxBussNum': { // 保证合同编号
              value: '',
              disabled: true,
              rule: [{required: false, trigger: 'blur'}]
            }
          });
        } else if (obj.e == '2') {
          _this.common.Control(_this.arrList, {
            'maxBussNum': {
              disabled: false,
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'}
              ]
            },
            'wartySign': {
              disabled: false,
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'change'}
              ]
            },
            'arlpAmt': {
              disabled: false,
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: _this.validator.minZero, trigger: 'blur'}
              ]
            }
          });
        } else if (obj.e == '3' || obj.e == '4' || obj.e == '5' || obj.e == '9') {
          _this.common.Control(_this.arrList, {
            'arlpAmt': {
              disabled: false,
              noReset: false,
              value: '',
              hide: false,
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: _this.validator.minZero, trigger: 'blur'}
              ]
            },
            'wartySign': {
              disabled: true,
              noReset: false,
              value: '',
              hide: false,
              rule: []
            },
            'maxBussNum': {
              disabled: true,
              noReset: false,
              value: '',
              hide: false,
              rule: [{required: false}]
            }
          });
        }
      });
    },
    async getSystemId(param) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      this.common.Control(this.arrList, {
        'arlpCertType': {
          customOption: response
        }
      });
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem, 'eld', param);
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'hidden', name: 'bussNum', value: '', label: '业务号', span: 12, rule: []}
          ],
          [
            {type: 'select',
              name: 'arlpIdType',
              value: '',
              param: 'E_InfoIDType',
              label: '身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'arlpName',
              value: '',
              label: '责任人名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 80, message: '最多80位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'arlpCertType',
              value: '',
              customOption: {},
              label: '责任人身份标识类型',
              eventChange: true,
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'arlpCertNum',
              value: '',
              label: '责任人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 40, message: '最多40位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'arlpType',
              value: '',
              param: 'E_ArlpType_PL',
              label: '还款责任人类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'arlpAmt',
              value: '',
              label: '还款责任金额',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'wartySign',
              value: '',
              param: 'E_WartySign_PL',
              label: '联保标志',
              span: 12,
              rule: [{required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'maxBussNum',
              value: '',
              label: '保证合同编号',
              span: 12,
              rule: [
                {max: 45, message: '最多45位', trigger: 'blur'},
                {validator: this.validator.noSpecialCaracters, trigger: 'blur'}]
            }
          ],
          [
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
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ]
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {type: 'hidden', name: 'bussNum', value: '', label: '业务号', span: 12, rule: []}
          ],
          [
            {type: 'select',
              name: 'arlpIdType',
              value: '',
              param: 'E_InfoIDType',
              label: '身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'arlpName',
              value: '',
              label: '责任人名称',
              span: 12,
              rule: [{required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 80, message: '最多80位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'arlpCertType',
              value: '',
              customOption: {},
              label: '责任人身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'arlpCertNum',
              value: '',
              label: '责任人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 40, message: '最多40位', trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'arlpType',
              value: '',
              param: 'E_ArlpType_PL',
              label: '还款责任人类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'arlpAmt',
              value: '',
              label: '还款责任金额',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'wartySign',
              value: '',
              param: 'E_WartySign_PL',
              label: '联保标志',
              span: 12,
              rule: [{required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'maxBussNum',
              value: '',
              label: '保证合同编号',
              span: 12,
              rule: [
                {max: 45, message: '最多45位', trigger: 'blur'},
                {validator: this.validator.noSpecialCaracters, trigger: 'blur'}]
            }
          ],
          [
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              noReset: true,
              disabled: true,
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ]
        ];
      }
    }
  },
  created() {
    this.init();
  }

  //  mixins: [http]
};
</script>
<style>
    /* .el-dialog__body{
        padding: 0px;
    }
    .treecard{
        height: '700px';
    } */
</style>
