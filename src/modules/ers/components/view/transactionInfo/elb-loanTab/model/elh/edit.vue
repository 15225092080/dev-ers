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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="170px" @eventChange="eventChange"  @eventBlur="eventBlur">
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
        url: this.$urlList.elh.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  watch: {
  },
  methods: {
    checkI2100H10(rule, value, callback) {
      let acctType = this.$store.getters.arrListFormItem.acctType; // 账户状态
      let overdPrinc = parseInt(this.$refs.formItem.formItem.overdPrinc, 10); // 当前逾期本金
      let totOverd = parseInt(this.$refs.formItem.formItem.totOverd, 10); // 当前逾期总额

      // 对于 D1/D2/R1/R4 账户，信息记录中“当前逾期本金”必须小于等于“当前逾期总额”
      if (acctType == 'D1' || acctType == 'D2' || acctType == 'R1' || acctType == 'R4') {
        if (overdPrinc > totOverd) {
          callback(new Error('当前逾期本金必须小于等于当前逾期总额'));
        } else {
          callback();
        }
      }
    },
    checkLatRpyAmt(rule, value, callback) {
      let latRpyPrincAmt = parseInt(this.$refs.formItem.formItem.latRpyPrincAmt, 10); // 最近一次实际归还本金
      let latRpyAmt = parseInt(this.$refs.formItem.formItem.latRpyAmt, 10); // 最近一次实际还款金额

      // “最近一次实际归还本金”必须小于等于“最近一次实际还款金额”
      if (latRpyPrincAmt > latRpyAmt) {
        callback(new Error('最近一次实际归还本金必须小于等于最近一次实际还款金额'));
      } else {
        callback();
      }
    },
    // 余额变化日期不应晚于业务发生日期
    checkBalChgDateAndBussDate(rule, value, callback) {
      let balChgDate = new Date(this.$refs.formItem.formItem.balChgDate).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();

      if (balChgDate && bussDate) {
        if (balChgDate <= bussDate) {
          callback();
        } else {
          callback(new Error('余额变化日期不应晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    // 五级分类认定日期应不晚于业务发生日期
    checkFiveCateAdjDateAndBussDate(rule, value, callback) {
      let fiveCateAdjDate = new Date(this.$refs.formItem.formItem.fiveCateAdjDate).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();
      if (fiveCateAdjDate && bussDate) {
        if (fiveCateAdjDate <= bussDate) {
          callback();
        } else {
          callback(new Error('五级分类认定日期应不晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    // 最近一次约定还款日应不晚于业务发生日期
    checkLatRpyDateAndBussDate(rule, value, callback) {
      let latRpyDate = new Date(this.$refs.formItem.formItem.latRpyDate).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();
      if (latRpyDate && bussDate) {
        if (latRpyDate <= bussDate) {
          callback();
        } else {
          callback(new Error('余额变化日期不应晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    // 最近一次约定还款日应不晚于业务发生日期
    checkLatAgrrRpyDateAndBussDate(rule, value, callback) {
      let latAgrrRpyDate = new Date(this.$refs.formItem.formItem.latAgrrRpyDate).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();
      if (latAgrrRpyDate && bussDate) {
        if (latAgrrRpyDate <= bussDate) {
          callback();
        } else {
          callback(new Error('最近一次约定还款日不应晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    // 当“账户关闭日期”不为空时，则必须不早于“余额变化日期”、“最近一次实际还款日期”、“最近一次约定还款日”、“五级分类认定日期”
    checkI2100H13(rule, value, callback) {
      let closeDate = new Date(this.$refs.formItem.formItem.closeDate).getTime() || ''; // 账户关闭日期
      let balChgDate = new Date(this.$refs.formItem.formItem.balChgDate).getTime() || ''; // 余额变化日期
      let latRpyDate = new Date(this.$refs.formItem.formItem.latRpyDate).getTime() || ''; // 最近一次实际还款日期
      let latAgrrRpyDate = new Date(this.$refs.formItem.formItem.latAgrrRpyDate).getTime() || ''; // 最近一次约定还款日
      let fiveCateAdjDate = new Date(this.$refs.formItem.formItem.fiveCateAdjDate).getTime() || ''; // 五级分类认定日期
      // 账户关闭日期
      if ((closeDate == '') || ((closeDate >= balChgDate) && (closeDate >= latRpyDate) && (closeDate >= latAgrrRpyDate) && (closeDate >= fiveCateAdjDate))) {
        callback();
      } else {
        callback(new Error('若账户关闭日期不为空时，则账户关闭日期应不早于余额变化日期、最近一次实际还款日期、最近一次约定还款日期、五级分类认定日期'));
      }
    },

    // 当“下一次约定还款日期”不为空时，必须不早于“余额变化日期”、“最近一次实际还款款日”、“最近一次约定还款日期”、“五级分类认定日期”
    contrastNxtAgrrRpyDate(rule, value, callback) {
      let nxtAgrrRpyDate = new Date(this.$refs.formItem.formItem.nxtAgrrRpyDate).getTime() || ''; // 下一次约定还款日期
      let balChgDate = new Date(this.$refs.formItem.formItem.balChgDate).getTime() || ''; // 余额变化日期
      let latRpyDate = new Date(this.$refs.formItem.formItem.latRpyDate).getTime() || ''; // 最近一次实际还款日期
      let latAgrrRpyDate = new Date(this.$refs.formItem.formItem.latAgrrRpyDate).getTime() || ''; // 最近一次约定还款日
      let fiveCateAdjDate = new Date(this.$refs.formItem.formItem.fiveCateAdjDate).getTime() || ''; // 五级分类认定日期
      // 下一次约定还款日期
      if ((nxtAgrrRpyDate == '') || ((nxtAgrrRpyDate >= balChgDate) && (nxtAgrrRpyDate >= latRpyDate) && (nxtAgrrRpyDate >= latAgrrRpyDate) && (nxtAgrrRpyDate >= fiveCateAdjDate))) {
        callback();
      } else {
        callback(new Error('若下一次约定还款日期不为空时，则下一次约定还款日期-应不早于余额变化日期、最近一次实际还款日期、最近一次约定还款日期、五级分类认定日期'));
      }
    },
    // eslint-disable-next-line no-unused-vars
    eventBlur(obj) { // 监听input失去焦点事件
      let _this = this; // 绑定指向
      let acctType = this.$store.getters.arrListFormItem.acctType;
      if (obj.e > 0 && obj.sname == 'latRpyPrincAmt') { // 最近一次实际归还本金失去焦点事件
        _this.common.Control(_this.arrList, {
          'latRpyAmt': {
            rule: [
              {required: true, validator: _this.validator.empty, trigger: 'blur'},
              {required: true, max: 15, message: '最多15位', trigger: 'blur'},
              {required: true, validator: _this.validator.money, trigger: 'blur'},
              {required: true, validator: _this.validator.minZero, trigger: 'blur'},
              {validator: _this.validator.GtZreoInt, trigger: 'blur'}
            ]
          }
        });
      } else {
        _this.common.Control(_this.arrList, {
          'latRpyAmt': {
            rule: [
              {required: true, validator: _this.validator.empty, trigger: 'blur'},
              {required: true, max: 15, message: '最多15位', trigger: 'blur'},
              {required: true, validator: _this.validator.money, trigger: 'blur'},
              {required: true, validator: _this.validator.minZero, trigger: 'blur'}
            ]
          }
        });
      }
      // 当前逾期总额>0时，当前逾期天数不为0
      if (acctType != 'C1') {
        if (obj.e != '' && obj.e > 0 && obj.sname == 'totOverd') {
          _this.common.Control(_this.arrList, {
            'overdDy': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: _this.validator.money, trigger: 'blur'},
                {required: true, validator: _this.validator.minZero, trigger: 'blur'},
                {validator: _this.validator.GtZreoInt, trigger: 'blur'}
              ]
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'overdDy': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: _this.validator.money, trigger: 'blur'},
                {required: true, validator: _this.validator.minZero, trigger: 'blur'}
              ]
            }
          });
        }
      }
    },
    eventChange(obj) {
      let _this = this; // 绑定指向
      let acctType = _this.$store.getters.arrListFormItem.acctType; // 账户类型
      // 还款方式--对应 还款频率
      _this.common.onselect('acctStatus', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数'
        // 当账户状态为C1催收账户时，不允许执行下拉框的切换操作
        // 当账户状态为C1催收账户时，“剩余还款月数”、“当前逾期总额”、“当前逾期本金”、“当前逾期天数”应置灰
        if (acctType == 'C1') {
          _this.common.Control(_this.arrList, {
            'pymtPrd': {
              disabled: true,
              noReset: false,
              rule: []
            },
            'totOverd': {
              disabled: true,
              noReset: false,
              rule: []
            },
            'overdPrinc': {
              disabled: true,
              noReset: false,
              rule: []
            },
            'overdDy': {
              disabled: true,
              noReset: false,
              rule: []
            }
          });
          // 若"账户状态"为"21-关闭,账户关闭日期不能为空
          if (obj.e == '21') {
            _this.common.Control(_this.arrList, {
              'acctBal': {
                disabled: true,
                noReset: false,
                value: '0',
                hide: false,
                rule: [{required: true, validator: _this.validator.empty}]
              },
              'closeDate': {
                disabled: false,
                noReset: false,
                rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'},
                       {validator: _this.checkI2100H13, trigger: 'blur'}]
              },
              'nxtAgrrRpyDate': {
                disabled: true,
                noReset: false
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'acctBal': {
                disabled: false,
                noReset: true,
                value: '',
                hide: false
              },
              'closeDate': {
                disabled: false,
                noReset: true,
                hide: false,
                rule: [{required: false, validator: _this.checkI2100H13, trigger: 'blur'}]
              },
              'nxtAgrrRpyDate': {
                disabled: true,
                noReset: true,
                hide: false
              }
            });
          }
        } else {
          // 当账户状态为非催收账户时，不允许执行下拉框的切换操作
          // 若"账户状态"为"21-关闭,账户关闭日期不能为空
          if (obj.e == '21') {
            // 剩余还款月数、当前逾期本金、下一次约定还款日期、当前逾期天数、当前逾期总额、余额、账户关闭日期
            _this.common.Control(_this.arrList, {
              'pymtPrd': {
                disabled: true,
                noReset: false,
                rule: []
              },
              'overdPrinc': {
                disabled: true,
                noReset: false,
                hide: false,
                value: '0',
                rule: []
              },
              'nxtAgrrRpyDate': {
                disabled: true,
                noReset: false,
                hide: false,
                rule: []
              },
              'overdDy': {
                disabled: true,
                noReset: false,
                hide: false,
                value: '0',
                rule: []
              },
              'totOverd': {
                disabled: true,
                noReset: false,
                hide: false,
                value: '0',
                rule: []
              },
              'acctBal': {
                disabled: true,
                noReset: false,
                value: '0',
                hide: false,
                rule: [{required: true, validator: _this.validator.empty}]
              },
              'closeDate': {
                disabled: false,
                noReset: false,
                hide: false,
                rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'},
                       {validator: _this.checkI2100H13, trigger: 'blur'}]
              }
            });
            // 若"账户状态"为"31、32，当前逾期总额不能为0
          } else if (obj.e == '31' || obj.e == '32') {
            _this.common.Control(_this.arrList, {
              'totOverd': {
                disabled: false,
                rule: [{required: true, validator: _this.validator.GtZreoInt, trigger: 'blur'}]
              },
              'overdPrinc': {
                disabled: false,
                value: ''
              },
              'overdDy': {
                disabled: false,
                value: ''
              },
              'closeDate': {
                disabled: false,
                rule: [{required: false, validator: _this.checkI2100H13, trigger: 'blur'}]
              }
            });
          } else {
            if (acctType == 'R1') {
              _this.common.Control(_this.arrList, {
                'pymtPrd': {
                  disabled: false,
                  noReset: false,
                  value: '',
                  hide: false,
                  rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
                }
              });
            }
            _this.common.Control(_this.arrList, {
              'acctBal': {
                disabled: false,
                noReset: false,
                value: '',
                hide: false
              },
              'totOverd': {
                disabled: false,
                noReset: false,
                hide: false,
                value: ''
              },
              'overdPrinc': {
                disabled: false,
                noReset: false,
                hide: false,
                value: ''
              },
              'overdDy': {
                disabled: false,
                noReset: false,
                value: '',
                hide: false
              },
              'closeDate': {
                disabled: false,
                noReset: false,
                hide: false,
                rule: [{required: false, validator: _this.checkI2100H13, trigger: 'blur'}]
              }
            });
          }
        }

        // 若"账户状态"为"31、32，当前逾期总额不能为0
        // if(obj.e == '31'||obj.e == '32'){
        //     _this.common.Control(_this.arrList,{
        //         'totOverd':{
        //             disabled : false,
        //             noReset: false,
        //             hide: false,
        //             rule: [{required: true,validator: _this.validator.GtZreoInt,trigger: "blur"}]
        //         }
        //     })
        // }else{
        //     _this.common.Control(_this.arrList,{
        //         'totOverd':{
        //             disabled : false,
        //             noReset: false,
        //             hide: false,
        //             rule: [{required: false}]
        //         }
        //     })
        // }
      });
    },
    // 根据账户类型设置只读属性
    setDisabled() {
      let acctType = this.$store.getters.arrListFormItem.acctType;
      if (acctType == 'D1' || acctType == 'D2' || acctType == 'R4') {
        this.common.Control(this.arrList, {
          'pymtPrd': {disabled: true, rule: [{required: false, trigger: 'blur'}]}
        });
      }
      if (acctType == 'C1') {
        this.common.Control(this.arrList, {
          'pymtPrd': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'totOverd': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'overdPrinc': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'overdDy': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'latAgrrRpyDate': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'latAgrrRpyAmt': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          'nxtAgrrRpyDate': {disabled: true, rule: [{required: false, trigger: 'blur'}]}
        });
      }
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem, 'elh', param);
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
              name: 'rptDateCode',
              value: '',
              param: 'E_RptDateCode_EL',
              label: '报送时点',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'acctStatus',
              value: '',
              param: 'E_AcctStatus',
              label: '账户状态',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'acctBal',
              value: '',
              label: '余额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'}]
            },
            {type: 'date',
              name: 'balChgDate',
              value: '',
              label: '余额变化日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkBalChgDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'fiveCate',
              value: '',
              param: 'E_FiveCate',
              label: '五级分类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
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
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkFiveCateAdjDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'pymtPrd',
              value: '',
              label: '剩余还款月数',
              span: 12,
              rule: [
              // {required: true,validator: this.validator.empty,trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'totOverd',
              value: '',
              label: '当前逾期总额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'overdPrinc',
              value: '',
              label: '当前逾期本金',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.checkI2100H10, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'overdDy',
              value: '',
              label: '当前逾期天数',
              span: 12,
              eventBlur: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'date',
              name: 'latRpyDate',
              value: '',
              label: '最近一次实际还款日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkLatRpyDateAndBussDate, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'latRpyAmt',
              value: '',
              label: '最近一次实际还款金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'latRpyPrincAmt',
              value: '',
              label: '最近一次实际归还本金',
              span: 12,
              eventBlur: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.checkLatRpyAmt, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'select',
              name: 'rpmtType',
              value: '',
              param: 'E_FormOfRepayment',
              label: '还款形式',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'date',
              name: 'latAgrrRpyDate',
              value: '',
              label: '最近一次约定还款日',
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkLatAgrrRpyDateAndBussDate, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'latAgrrRpyAmt',
              value: '',
              label: '最近一次约定还款金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'date',
              name: 'nxtAgrrRpyDate',
              value: '',
              label: '下一次约定还款日期',
              span: 12,
              rule: [
                {validator: this.contrastNxtAgrrRpyDate, trigger: 'blur'}]
            },
            {type: 'date',
              name: 'closeDate',
              value: '',
              label: '账户关闭日期',
              span: 12,
              rule: [
                {required: true, validator: this.checkI2100H13, trigger: 'blur'}]
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
              name: 'rptDateCode',
              value: '',
              param: 'E_RptDateCode_EL',
              label: '报送时点',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'acctStatus',
              value: '',
              param: 'E_AcctStatus',
              label: '账户状态',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'acctBal',
              value: '',
              label: '余额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'}]
            },
            {type: 'date',
              name: 'balChgDate',
              value: '',
              label: '余额变化日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkBalChgDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'fiveCate',
              value: '',
              param: 'E_FiveCate',
              label: '五级分类',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'fiveCateAdjDate',
              value: '',
              label: '五级分类认定日期',
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkFiveCateAdjDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'pymtPrd',
              value: '',
              label: '剩余还款月数',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'totOverd',
              value: '',
              label: '当前逾期总额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'overdPrinc',
              value: '',
              label: '当前逾期本金',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.checkI2100H10, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'overdDy',
              value: '',
              label: '当前逾期天数',
              span: 12,
              eventBlur: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'date',
              name: 'latRpyDate',
              value: '',
              label: '最近一次实际还款日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkLatRpyDateAndBussDate, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'latRpyAmt',
              value: '',
              label: '最近一次实际还款金额',
              span: 12,
              eventBlur: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'latRpyPrincAmt',
              value: '',
              label: '最近一次实际归还本金',
              span: 12,
              eventBlur: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.checkLatRpyAmt, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'select',
              name: 'rpmtType',
              value: '',
              param: 'E_FormOfRepayment',
              label: '还款形式',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'date',
              name: 'latAgrrRpyDate',
              value: '',
              label: '最近一次约定还款日',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkLatAgrrRpyDateAndBussDate, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'latAgrrRpyAmt',
              value: '',
              label: '最近一次约定还款金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                // {required: true,max: 15,message: "最多15位",trigger: "blur"},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            }
          ],
          [
            {type: 'date',
              name: 'nxtAgrrRpyDate',
              value: '',
              label: '下一次约定还款日期',
              span: 12,
              rule: [
                {validator: this.contrastNxtAgrrRpyDate, trigger: 'blur'}]
            },
            {type: 'date',
              name: 'closeDate',
              value: '',
              label: '账户关闭日期',
              span: 12,
              rule: [
                {required: true, validator: this.checkI2100H13, trigger: 'blur'}]
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
              rule: [
                {required: true, disabled: true}]
            }
          ]
        ];
      }
    }
  },
  created() {
    this.init();
    // 根据账户类型设置只读属性
    this.setDisabled();
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
