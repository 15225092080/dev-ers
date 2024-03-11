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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="110px" @eventChange="eventChange">
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
        url: this.$urlList.epe.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('pleDgorType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = {params: {type: 'E_InfoIDType' + obj.e}};
        _this.ipType = obj.e;
        let pleDgorType = _this.$refs.formItem.formItem.pleDgorType;
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        _this.getSystemId(param,pleDgorType);
      });
      _this.common.onselect('pleorCertType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        // 身份类型
        if (_this.ipType == 1) {
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkIdcard, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 2) { // 护照
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkPassport, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 5) { // 港澳居民往来大陆通行证
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkHkmacidpassValidator, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 6) { // 台湾通行证
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkRocValidator, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
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
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 20) {
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.isCCode, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'pleorCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.isCorpNo, trigger: 'blur'}
                ]
              }
            });
          }
        }
      });
    },
    async getSystemId(param,pleDgorType) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      // 判断是初始化渲染还是选中之后重新渲染
      if (pleDgorType) {
        this.common.Control(this.arrList, {
          'pleorCertType': {
            customOption: response,
            value: ""
          }
        });
      }else {
        this.common.Control(this.arrList, {
          'pleorCertType': {
            customOption: response
          }
        });
      };
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem,'epe',param)
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'select',
              name: 'pleType',
              value: '',
              param: 'E_PleType',
              label: '抵押物种类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'motgaProptIdType',
              value: '',
              param: 'E_MotgaProptIDType',
              label: '抵押物识别号类型',
              span: 12
            }
          ],
          [
            {type: 'input',
              name: 'pleCertId',
              value: '',
              label: '抵押物唯一识别号',
              span: 12,
              rule: [
                {max: 40, message: '最多40位', trigger: 'blur'}]},
            {type: 'cascader', name: 'pleDistr', value: '', param: '', label: '抵押物位置所在地行政区划', span: 24}
          ],
          [
            {type: 'input',
              name: 'pleValue',
              value: '',
              label: '抵押物评估价值',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}
              ]},
            {type: 'select',
              name: 'pleCy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12
            }
          ],
          [
            {type: 'select',
              name: 'valOrgType',
              value: '',
              param: 'E_ValOrgType',
              label: '评估机构类型',
              span: 12
            },
            {type: 'date',
              name: 'valDate',
              value: '',
              label: '抵押物评估日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }}
            }
          ],
          [
            {type: 'input',
              name: 'pleDesc',
              value: '',
              label: '抵押物说明',
              span: 12,
              rule: [
                { max: 200, message: '最多200位', trigger: 'blur' }]},
            {type: 'select',
              name: 'pleDgorType',
              value: '',
              param: 'E_InfoIDType',
              label: '抵押人身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'pleDgorName',
              value: '',
              label: '抵押人名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 80, message: '最多80位', trigger: 'blur' }]},
            {type: 'select',
              name: 'pleorCertType',
              value: '',
              customOption: {},
              label: '抵押人身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            }
          ],
          [
            {type: 'input',
              name: 'pleorCertNum',
              value: '',
              label: '抵押人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 40, message: '最多40位', trigger: 'blur' }]
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
                {required: true, validator: this.validator.empty, trigger: 'blur'}]}
          ]
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {type: 'select',
              name: 'pleType',
              value: '',
              param: 'E_PleType',
              label: '抵押物种类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'motgaProptIdType',
              value: '',
              param: 'E_MotgaProptIDType',
              label: '抵押物识别号类型',
              span: 12
            }
          ],
          [
            {type: 'input',
              name: 'pleCertId',
              value: '',
              label: '抵押物唯一识别号',
              span: 12,
              rule: [
                { max: 40, message: '最多40位', trigger: 'blur' }]},
            {type: 'cascader', name: 'pleDistr', value: '', param: '', label: '抵押物位置所在地行政区划', span: 24}
          ],
          [
            {type: 'input',
              name: 'pleValue',
              value: '',
              label: '抵押物评估价值',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}
              ]},
            {type: 'select',
              name: 'pleCy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12
            }
          ],
          [
            {type: 'select',
              name: 'valOrgType',
              value: '',
              param: 'E_ValOrgType',
              label: '评估机构类型',
              span: 12
            },
            {type: 'date',
              name: 'valDate',
              value: '',
              label: '抵押物评估日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }}
            }
          ],
          [
            {type: 'input',
              name: 'pleDesc',
              value: '',
              label: '抵押物说明',
              span: 12,
              rule: [
                { max: 200, message: '最多200位', trigger: 'blur' }]},
            {type: 'select',
              name: 'pleDgorType',
              value: '',
              param: 'E_InfoIDType',
              label: '抵押人身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'pleDgorName',
              value: '',
              label: '抵押人名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 80, message: '最多80位', trigger: 'blur' }]},
            {type: 'select',
              name: 'pleorCertType',
              value: '',
              customOption: {},
              label: '抵押人身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            }
          ],
          [
            {type: 'input',
              name: 'pleorCertNum',
              value: '',
              label: '抵押人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 40, message: '最多40位', trigger: 'blur' }]
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
                {required: true, validator: this.validator.empty, trigger: 'blur'}]}
          ]
        ];
      }
    }
  },
  created() {
    this.init();
  }

};
</script>
<style>
    /* .el-form-item__label{
        padding: 0 5px 0 0;
    } */
</style>
