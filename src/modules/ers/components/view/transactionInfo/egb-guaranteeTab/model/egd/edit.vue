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
        url: this.$urlList.egd.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    //   日期校验
    contrastDate(rule, value, callback) {
      let repayPrd = new Date(this.$refs.formItem.formItem.repayPrd).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();
      if (repayPrd && bussDate) {
        if (repayPrd <= bussDate) {
          callback();
        } else {
          callback(new Error('余额变化日期应不晚于业务发生日期'));
        }
      }
    },
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('acctStatus', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == '1') {
          _this.common.Control(_this.arrList, {
            'closeDate': {
              rule: [
                {required: false, trigger: 'blur'}
              ],
              // disabled:true,
              value:''
            }
          });
        } else if (obj.e == '2') {
          _this.common.Control(_this.arrList, {
            'closeDate': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'}
              ],
              disabled:false
            }
          });
        }
      });
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem,'egd',param)
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'select',
              name: 'acctStatus',
              value: '',
              param: 'E_AcctStatus_EG',
              label: '账户状态',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'loanAmt',
              value: '',
              label: '在保余额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'date',
              name: 'repayPrd',
              value: '',
              label: '余额变化日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.contrastDate, trigger: 'blur'}]
            },
            {type: 'select',
              name: 'fiveCate',
              value: '',
              param: 'E_FiveCate',
              label: '五级分类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'date',
              name: 'fiveCateAdjDate',
              value: '',
              label: '五级分类认定日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'riEx',
              value: '',
              label: '风险敞口',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'compAdvFlag',
              value: '',
              param: 'E_CompAdvFlag',
              label: '代偿(垫款)标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date', name: 'closeDate', value: '', label: '账户关闭日期', span: 12, rule: []
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
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.contrastDate, trigger: 'blur'}]}
          ]
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {type: 'select',
              name: 'acctStatus',
              value: '',
              param: 'E_AcctStatus_EG',
              label: '账户状态',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'loanAmt',
              value: '',
              label: '在保余额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'date',
              name: 'repayPrd',
              value: '',
              label: '余额变化日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.contrastDate, trigger: 'blur'}]
            },
            {type: 'select',
              name: 'fiveCate',
              value: '',
              param: 'E_FiveCate',
              label: '五级分类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'date',
              name: 'fiveCateAdjDate',
              value: '',
              label: '五级分类认定日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'riEx',
              value: '',
              label: '风险敞口',
              span: 12,
              rule: [
                {validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {validator: this.validator.minZero, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'compAdvFlag',
              value: '',
              param: 'E_CompAdvFlag',
              label: '代偿(垫款)标志',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'closeDate',
              value: '',
              label: '账户关闭日期',
              span: 12,
              rule: [
              ]
            }
          ],
          [
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              span: 12,
              noReset:true, 
              disabled: true}
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
