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
        url: this.$urlList.egc.getValUrl, // 接口
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
      _this.common.onselect('busiLines', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = {params: {type: 'E_BusiDtilLines_EG_' + obj.e}};
        let busiLines = _this.$refs.formItem.formItem.busiLines

        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        _this.getSystemId(param,busiLines);
      });
      _this.common.onselect('guarMode', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == '1') {
          _this.common.message(true, '“反担保方式”为“1-保证”时，应出现相关还款责任人信息段', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    async getSystemId(param,busiLines) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      // 判断是初始化渲染还是选中之后重新渲染
      if (busiLines) {
        this.common.Control(this.arrList, {
        'busiDtilLines': {
            customOption: response,
            value: ""
        }
      });
      }else {
        this.common.Control(this.arrList, {
          'busiDtilLines': {
            customOption: response
          }
        });
      };
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem,'egc',param)
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'select',
              name: 'busiLines',
              value: '',
              param: 'E_BusiLines_EG',
              label: '担保业务大类',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'busiDtilLines',
              value: '',
              customOption: {},
              label: '担保业务种类细分',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            }
          ],
          [
            {type: 'date',
              name: 'openDate',
              value: '',
              label: '开户日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'guarAmt',
              value: '',
              label: '担保金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}
              ]}
          ],
          [
            {type: 'select',
              name: 'cy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'dueDate',
              value: '',
              label: '到期日期',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'guarMode',
              value: '',
              param: 'E_GuarMode_EG',
              label: '反担保方式',
              eventChange: true,
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'othRepyGuarWay',
              value: '',
              param: 'E_OthRepyGuarWay_EG',
              label: '其他还款保证方式',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'secDep',
              value: '',
              label: '保证金百分比',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.minZeroMax, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'ctrctTxtCode',
              value: '',
              label: '担保合同文本编号',
              span: 12,
              rule: [
                {max: 60, message: '最多60位', trigger: 'blur'}
              ]}
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
                {required: true, validator: this.validator.empty, trigger: 'blur'}]}
          ]
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {type: 'select',
              name: 'busiLines',
              value: '',
              param: 'E_BusiLines_EG',
              label: '担保业务大类',
              eventChange: true,
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'busiDtilLines',
              value: '',
              param: '',
              customOption: {},
              label: '担保业务种类细分',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            }
          ],
          [
            {type: 'date',
              name: 'openDate',
              value: '',
              label: '开户日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'guarAmt',
              value: '',
              label: '担保金额',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 15, message: '最多15位', trigger: 'blur'},
                {required: true, validator: this.validator.minZero, trigger: 'blur'}
              ]}
          ],
          [
            {type: 'select',
              name: 'cy',
              value: '',
              param: 'E_Cy',
              label: '币种',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'date',
              name: 'dueDate',
              value: '',
              label: '到期日期',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ],
          [
            {type: 'select',
              name: 'guarMode',
              value: '',
              param: 'E_GuarMode_EG',
              label: '反担保方式',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'select',
              name: 'othRepyGuarWay',
              value: '',
              param: 'E_OthRepyGuarWay_EG',
              label: '其他还款保证方式',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
          ],
          [
            {type: 'input',
              name: 'secDep',
              value: '',
              label: '保证金百分比',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.money, trigger: 'blur'},
                {max: 3, message: '最多3位', trigger: 'blur'},
                {required: true, validator: this.validator.minZeroMax, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'ctrctTxtCode',
              value: '',
              label: '担保合同文本编号',
              span: 12,
              rule: [
                {max: 60, message: '最多60位', trigger: 'blur'}
              ]}
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
