<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              :findById="findById"
              labelWidth="110px"
              @eventChange="eventChange">
        <el-button slot="slotBtn"
                   class="submit_btn"
                   @click="callbackFun('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
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
        url: this.$urlList.elc.getValUrl, // 接口
        param: { id: this.paramEdit.id }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  watch: {},
  methods: {
    checkOpenDateAndDueDate(rule, value, callback) {
      let openDate = new Date(this.$refs.formItem.formItem.openDate).getTime();
      let dueDate = new Date(this.$refs.formItem.formItem.dueDate).getTime();
      if (openDate && dueDate) {
        if (openDate <= dueDate) {
          callback();
        } else {
          callback(new Error('开户日期不应晚于到期日期'));
        }
      } else {
        callback();
      }
    },
    checkOpenDateAndBussDate(rule, value, callback) {
      let openDate = new Date(this.$refs.formItem.formItem.openDate).getTime();
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime();
      if (openDate && bussDate) {
        if (openDate <= bussDate) {
          callback();
        } else {
          callback(new Error('开户日期不应晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    eventChange(obj) {
      let _this = this; // 绑定指向
      if (_this.$store.getters.arrListFormItem.acctType == 'C1') {
        // C1账户行政区划为只读
        _this.common.Control(_this.arrList, {
          applyBusiDist: {
            disabled: true,
            value: '',
            rule: [{ required: false, trigger: 'blur' }],
          },
        });
      }
      _this.common.onselect('busiLines', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = { params: { type: 'E_BusiDtlLines_EL_' + obj.e } };
        let busiLines = _this.$refs.formItem.formItem.busiLines;
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        _this.getSystemId(param, busiLines);
        // 借贷业务大类 为 11-贷款
        if (obj.e == '11') {
          // 贷款发放形式 可以为“1-新增2-收回再贷3-借新还旧4-资产重组5-其他机构转入”
          _this.common.Control(_this.arrList, {
            loaFrm: {
              value: '',
              filter: ['9'],
            },
          });
        } else {
          // 贷款发放形式 可以为其他业务为“9-其他”
          _this.common.Control(_this.arrList, {
            loaFrm: {
              value: '',
              filter: ['1', '2', '3', '4', '5'], // 清除数组中的数据
            },
          });
        }
        // 当账户类型为D1、 R1、 R4时，贷款实际投向设为必填项
        if (
          _this.$store.getters.arrListFormItem.acctType == 'D1' ||
          _this.$store.getters.arrListFormItem.acctType == 'R1' ||
          _this.$store.getters.arrListFormItem.acctType == 'R4'
        ) {
          // 借贷业务大类 为 11-贷款
          if (obj.e == '11') {
            _this.common.Control(_this.arrList, {
              actInvest: {
                disabled: false,
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                ],
              },
            });
          } else {
            _this.common.Control(_this.arrList, {
              actInvest: {
                disabled: true,
                value: '',
                rule: [{ required: false, trigger: 'blur' }],
              },
            });
          }
        } else {
          _this.common.Control(_this.arrList, {
            actInvest: {
              disabled: true,
              value: '',
              rule: [{ required: false, trigger: 'blur' }],
            },
          });
        }
        // 对于R2/R3类账户，基本信息段到期日期统一填报“2099-12-31”,“信贷业务大类”只能为“2-信用卡”。
        if (
          _this.$store.getters.arrListFormItem.acctType == 'R2' ||
          _this.$store.getters.arrListFormItem.acctType == 'R3'
        ) {
          _this.common.Control(_this.arrList, {
            ' dueDate': {
              disabled: true,
              value: '2099-12-31',
            },
          });
        }
      });
      // 还款方式--对应 还款频率
      _this.common.onselect('repayMode', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == '90') {
          _this.common.Control(_this.arrList, {
            repayFreqcy: {
              // disabled : true,
              // noReset: false,
              // value: '月',
              customOption: { 10: '月' },
              hide: false,
            },
          });
        } else if (
          obj.e == '21' ||
          obj.e == '22' ||
          obj.e == '23' ||
          obj.e == '29'
        ) {
          _this.common.Control(_this.arrList, {
            repayFreqcy: {
              // disabled : true,
              // noReset: false,
              // value: '其它',
              customOption: { 99: '其它' },
              hide: false,
            },
          });
        } else {
          _this.common.Control(_this.arrList, {
            repayFreqcy: {
              disabled: false,
              // noReset: true,
              value: '',
              customOption: {
                10: '月',
                21: '双月',
                22: '季',
                23: '半年',
                24: '年',
                29: '其它大于月的频率',
                39: '其它小于月的频率',
                40: '不定期',
                99: '其它',
              },
              hide: false,
            },
          });
        }
      });
    },
    async getSystemId(param, busiLines) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      // 判断是初始化渲染还是选中之后重新渲染
      if (busiLines) {
        this.common.Control(this.arrList, {
          busiDtlLines: {
            customOption: response,
            value: '',
          },
        });
      } else {
        this.common.Control(this.arrList, {
          busiDtlLines: {
            customOption: response,
          },
        });
      }
    },
    // 根据账户类型的不同加载不同的数据----通过账户类型设置基本信息段只读字段
    getBusiLines() {
      // 账户类型
      let acctType = this.$store.getters.arrListFormItem.acctType;
      // 设置必填项--分次放款标志、借款期限分类
      if (acctType == 'D1') {
        this.common.Control(this.arrList, {
          flag: {
            // 分次放款标志
            disabled: false,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'change',
              },
            ],
          },
          loanTimeLimCat: {
            // 借款期限分类
            disabled: false,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'change',
              },
            ],
          },
          acctCredLine: {
            // 信用额度
            disabled: true,
            rule: [{ required: false }],
          },
        });
      } else if (acctType == 'D2') {
        this.common.Control(this.arrList, {
          // 清除必填项
          repayMode: {
            // 分次放款标志
            disabled: true,
            rule: [{ required: false }],
          },
          //   'repayFreqcy': { // 借款期限分类
          //     disabled: false,
          //     rule: [{required: false}]
          //   },
          //   'assetTrandFlag': { // 信用额度
          //     disabled: false,
          //     rule: [{required: false}]
          //   },
          // 设置只读属性
          acctCredLine: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          flag: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          repayFreqcy: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          loanTimeLimCat: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          actInvest: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          assetTrandFlag: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
        });
      } else if (acctType == 'R1') {
        this.common.Control(this.arrList, {
          acctCredLine: {
            // 信用额度
            disabled: false,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
            ],
          },
          loanAmt: {
            // 借款金额
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          flag: {
            // 分次放款标志
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          loanTimeLimCat: {
            // 借款期限分类
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
        });
      } else if (acctType == 'R4') {
        this.common.Control(this.arrList, {
          loanTimeLimCat: {
            // 借款期限分类
            disabled: false,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'change',
              },
            ],
          },
          acctCredLine: {
            // 借款金额
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          flag: {
            // 分次放款标志
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
        });
      } else if (acctType == 'C1') {
        this.common.Control(this.arrList, {
          // 设置只读属性--信用额度、还款方式、还款频率、担保方式、其他还款保证方式、贷款发放形式、业务经营类型、资产转让标志
          dueDate: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          repayMode: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          repayFreqcy: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          guarMode: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          othRepyGuarway: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          loaFrm: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          fundSou: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          flag: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          // 设置只读属性
          acctCredLine: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          applyBusiDist: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          //   'dueDate': {disabled: true, rule: [{required: false, trigger: 'blur'}]},
          loanTimeLimCat: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
          actInvest: {
            disabled: true,
            rule: [{ required: false, trigger: 'blur' }],
          },
          assetTrandFlag: {
            disabled: true,
            rule: [{ required: false, trigger: 'change' }],
          },
        });
      }
      // 当“账户类型”为“C1”时，“信贷业务大类”只能为“5-资产处置”、“6-垫款”
      if (this.$store.getters.arrListFormItem.acctType == 'C1') {
        this.common.Control(this.arrList, {
          busiLines: {
            customOption: { 5: '资产处置', 6: '垫款' },
          },
        });
        // 对于R2/R3类账户，基本信息段到期日期统一填报“2099-12-31”,“信贷业务大类”只能为“2-信用卡”。
      } else if (
        this.$store.getters.arrListFormItem.acctType == 'R2' ||
        this.$store.getters.arrListFormItem.acctType == 'R3'
      ) {
        this.common.Control(this.arrList, {
          dueDate: {
            disabled: true,
            value: '2099-12-31',
          },
          busiLines: {
            customOption: { 2: '信用卡' },
          },
        });
      } else {
        // 当“账户类型”为非“C1”时，“信贷业务大类”显示全部
        this.common.Control(this.arrList, {
          busiLines: {
            param: 'E_BusiLines_EL',
          },
        });
      }
    },
    // 根据账户类型自动加载还款方式的数据
    setRepayMode() {
      // 账户类型
      let acctType = this.$store.getters.arrListFormItem.acctType;
      // 若“账户类型”为 R4、D1 时，账户基本信息段中的“还款方式”必须不为“31”、“32”、“33”、“39”
      if (acctType == 'D1' || acctType == 'R4') {
        this.common.Control(this.arrList, {
          repayMode: {
            filter: ['31', '32', '33', '39'],
          },
        });
        // 若“账户类型”为 R1 时，账户“基本信息段”中的“还款方式”必须不为“11”、“12”、“13”、“14”、“15”、“19”、“21”、“22”、“23”、“29”
      } else if (acctType == 'R1') {
        this.common.Control(this.arrList, {
          repayMode: {
            filter: [
              '11',
              '12',
              '13',
              '14',
              '15',
              '19',
              '21',
              '22',
              '23',
              '29',
            ],
          },
        });
      }
    },
    callbackFun(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {
        bussNum: this.$store.getters.arrListFormItem.bussNum,
        deptCode: this.$store.getters.arrListFormItem.deptCode,
      });
      this.callback(formItem, 'elc', param);
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {
              type: 'hidden',
              name: 'bussNum',
              value: '',
              label: '业务号',
              span: 12,
              rule: [],
            },
          ],
          [
            {
              type: 'select',
              name: 'busiLines',
              value: '',
              param: 'E_BusiLines_EL',
              label: '借贷业务大类',
              span: 12,
              eventChange: true,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'busiDtlLines',
              value: '',
              customOption: {},
              label: '借贷业务种类细分',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'date',
              name: 'openDate',
              value: '',
              label: '开户日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.checkOpenDateAndBussDate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'cy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'acctCredLine',
              value: '',
              label: '信用额度',
              span: 12,
              rule: [
                { validator: this.validator.money, trigger: 'blur' },
                { max: 15, message: '最多15位', trigger: 'blur' },
                { validator: this.validator.minZero, trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'loanAmt',
              value: '',
              label: '借款金额',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.validator.money,
                  trigger: 'blur',
                },
                { max: 15, message: '最多15位', trigger: 'blur' },
                { validator: this.validator.minZero, trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'date',
              name: 'dueDate',
              value: '',
              label: '到期日期',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.checkOpenDateAndDueDate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'flag',
              value: '',
              param: 'E_SplitFlag',
              label: '分次放款标志',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'repayMode',
              value: '',
              param: 'E_RepayMode',
              label: '还款方式',
              span: 12,
              eventChange: true,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'repayFreqcy',
              value: '',
              param: 'E_RepayFreqcy',
              label: '还款频率',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'applyBusiDist',
              value: '',
              param: '',
              labelWidth: '140px',
              label: '业务申请地行政区划代码',
              span: 24,
            },
          ],
          [
            {
              type: 'select',
              name: 'guarMode',
              value: '',
              param: 'E_GuarMode_EG',
              label: '担保方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'othRepyGuarway',
              value: '',
              param: 'E_OthRepyGuarWay_EL',
              label: '其他还款保证方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'loanTimeLimCat',
              value: '',
              param: 'E_WaysOfBorrowing',
              label: '借款期限分类',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'loaFrm',
              value: '',
              param: 'E_LoanForm',
              label: '贷款发放方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'tree',
              treeurl: this.$urlList.common.empdTree,
              treetitle: '行业分类树',
              defaultProps: {
                children: 'children',
                label: function (a, b) {
                  return a.value;
                },
              },
              name: 'actInvest',
              value: '',
              label: '贷款实际投向',
              span: 12,
            },
            // {type: "input",name: "actInvest",value: "",label: "贷款实际投向",span: 12,rule: []
            // },
            {
              type: 'select',
              name: 'fundSou',
              value: '',
              param: 'E_FundSou',
              label: '业务经营类型',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'assetTrandFlag',
              value: '',
              param: 'E_AssetTrandFlag',
              label: '资产转让标志',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
          ],
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {
              type: 'hidden',
              name: 'bussNum',
              value: '',
              label: '业务号',
              span: 12,
              rule: [],
            },
          ],
          [
            {
              type: 'select',
              name: 'busiLines',
              value: '',
              param: 'E_BusiLines_EL',
              label: '借贷业务大类',
              eventChange: true,
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'busiDtlLines',
              value: '',
              customOption: {},
              label: '',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'date',
              name: 'openDate',
              value: '',
              label: '开户日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.checkOpenDateAndBussDate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'cy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'acctCredLine',
              value: '',
              label: '信用额度',
              span: 12,
              rule: [
                { validator: this.validator.money, trigger: 'blur' },
                { max: 15, message: '最多15位', trigger: 'blur' },
                { validator: this.validator.minZero, trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'loanAmt',
              value: '',
              label: '借款金额',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.validator.money,
                  trigger: 'blur',
                },
                { max: 15, message: '最多15位', trigger: 'blur' },
                { validator: this.validator.minZero, trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'date',
              name: 'dueDate',
              value: '',
              label: '到期日期',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.checkOpenDateAndDueDate,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'flag',
              value: '',
              param: 'E_SplitFlag',
              label: '分次放款标志',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'repayMode',
              value: '',
              param: 'E_RepayMode',
              label: '还款方式',
              eventChange: true,
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'repayFreqcy',
              value: '',
              param: 'E_RepayFreqcy',
              label: '还款频率',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'cascader',
              name: 'applyBusiDist',
              value: '',
              param: '',
              label: '业务申请地行政区划代码',
              span: 24,
              rule: [],
            },
          ],
          [
            {
              type: 'select',
              name: 'guarMode',
              value: '',
              param: 'E_GuarMode_EG',
              label: '担保方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'othRepyGuarway',
              value: '',
              param: 'E_OthRepyGuarWay_EL',
              label: '其他还款保证方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'loanTimeLimCat',
              value: '',
              param: 'E_WaysOfBorrowing',
              label: '借款期限分类',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'select',
              name: 'loaFrm',
              value: '',
              param: 'E_LoanForm',
              label: '贷款发放方式',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'tree',
              treeurl: this.$urlList.common.empdTree,
              treetitle: '行业分类树',
              defaultProps: {
                children: 'children',
                label: function (a, b) {
                  return a.value;
                },
              },
              name: 'actInvest',
              value: '',
              label: '贷款实际投向',
              span: 12,
            },
            // {type: "input",name: "actInvest",value: "",label: "贷款实际投向",span: 12,rule: []
            // },
            {
              type: 'select',
              name: 'fundSou',
              value: '',
              param: 'E_FundSou',
              label: '业务经营类型',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
          [
            {
              type: 'select',
              name: 'assetTrandFlag',
              value: '',
              param: 'E_AssetTrandFlag',
              label: '资产转让标志',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              noReset: true,
              disabled: true,
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
          ],
        ];
      }
    },
  },
  created() {
    this.init();
    // 根据账户类型的不同加载不同的数据
    this.getBusiLines();
    // 根据账户类型自动加载还款方式的数据
    this.setRepayMode();
  },

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
