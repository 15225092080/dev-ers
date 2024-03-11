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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="140px" @eventChange="eventChange">
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
        url: this.$urlList.eli.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  watch: {
  },
  methods: {
    checkTranDateAndBussDate(rule, value, callback) {
      let tranDate = new Date(this.$refs.formItem.formItem.tranDate).getTime(); // 交易日期
      let bussDate = new Date(this.$refs.formItem.formItem.bussDate).getTime(); // 业务发生日期
      if (tranDate && bussDate) {
        if (tranDate <= bussDate) {
          callback();
        } else {
          callback(new Error('交易日期不应晚于业务发生日期'));
        }
      } else {
        callback();
      }
    },
    eventChange(obj) {
      let _this = this; // 绑定指向
      // 当交易类型为"01-展期"时，"到期日期变更月数">0
      _this.common.onselect('chanTranType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 11) {
          _this.common.Control(_this.arrList, {
            'dueTranMon': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: _this.validator.GtZreoInt, trigger: 'blur'}
              ]
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'dueTranMon': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {required: true, validator: _this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'}
              ]
            }
          });
        }
        if (obj.e == 21) {
          _this.common.Control(_this.arrList, {
            'dueTranMon': {
              disabled: true, value: '0'
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'dueTranMon': {
              disabled: false, value: ''
            }
          });
        }
      });
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem, 'eli', param);
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
              name: 'chanTranType',
              value: '',
              param: 'E_ChanTranType',
              label: '交易类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'tranDate',
              value: '',
              label: '交易日期',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkTranDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'tranAmt',
              value: '',
              label: '交易金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'dueTranMon',
              value: '',
              label: '到期日期变更月数',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'}]
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
          ],
          [
            {type: 'textarea',
              name: 'detInfo',
              value: '',
              label: '交易明细信息',
              span: 24,
              rule: [
                {max: 200, message: '最多200位', trigger: 'blur'}]
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
              name: 'chanTranType',
              value: '',
              param: 'E_ChanTranType',
              label: '交易类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'tranDate',
              value: '',
              label: '交易日期',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {validator: this.checkTranDateAndBussDate, trigger: 'blur'}]
            }
          ],
          [
            {type: 'input',
              name: 'tranAmt',
              value: '',
              label: '交易金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'dueTranMon',
              value: '',
              label: '到期日期变更月数',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'}]
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
          ],
          [
            {type: 'textarea',
              name: 'detInfo',
              value: '',
              label: '交易明细信息',
              span: 24,
              rule: [
                {max: 200, message: '最多200位', trigger: 'blur'}]
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
