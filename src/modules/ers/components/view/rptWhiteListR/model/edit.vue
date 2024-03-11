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
      <v-form ref="formItem" :buttonGroup="buttonGroup" v-bind:arrList="arrList" :url="url" :findById="findById" submitFun labelWidth="100px" @eventChange="eventChange">
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
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.intercept.getValUrl, // 接口
        param: {id: this.$parent.detailUrl.resId} // 参数
      },
      buttonGroup: ['submit', 'cancle', 'close']
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
      // 证件类型
      _this.common.onselect('idType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.arrList, {
            'idNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                { validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
              ]
            }
          });
        } else if (obj.e == 20) {
          _this.common.Control(_this.arrList, {
            'idNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                {validator: _this.validator.isCCode, trigger: 'blur'}
              ]
            }
          });
        } else {
          _this.common.Control(_this.arrList, {
            'idNum': {
              rule: [
                {required: true, validator: _this.validator.empty, trigger: 'blur'},
                { validator: _this.validator.isCorpNo, trigger: 'blur'}
              ]
            }
          });
        }
      });
      _this.common.onselect('dataSource', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 1 ) { //数据来源是1的时候   系统编号，证件类型，证件号码为必填项
          _this.common.Control(_this.arrList, {
            'idType': {
              value: '', rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
            },
            'bussNum': {
              value: '', rule: [{required: false}]
            },
            'bussType': {
              value: '', rule: [{required: false}]
            },
            'systemId': {
              value: '', rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
            },
            'idNum': {
              value: '', rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
            }
          });
        } else if (obj.e == 2 ) {
          _this.common.Control(_this.arrList, {
            'idType': {
              value: '', rule: [{required: false}]
            },
            'bussNum': {
              value: '', rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
            },
            'bussType': {
              value: '', rule: [{required: true, validator: _this.validator.empty, trigger: 'blur'}]
            },
            'systemId': {
              value: '', rule: [{required: false}]
            },
            'idNum': {
              value: '', rule: [{required: false, trigger: 'blur'}]
            }
          });
        }
      });
    },
    init() {
      sessionStorage.setItem('bussNum', this.$route.path);
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.intercept.creUrl;
        // 页面表单
        this.arrList = [
          [
            {type: 'select',
              name: 'dataSource',
              value: '',
              label: '数据来源',
              param: 'DATASOURCE',
              eventChange: true,
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'bussNum',
              value: '',
              label: '业务编号',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'bussType',
              value: '',
              param: 'INTERCEPT_BUSSTYPE',
              label: '业务类型',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'systemId',
              value: '',
              label: '系统编号',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'idType',
              value: '',
              param: 'E_InfoIDType2',
              label: '证件类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: false, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'idNum',
              value: '',
              label: '证件号码',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'},
                {max: 20, message: '最多20位', trigger: 'blur'}]
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
            {type: 'input',
              name: 'reason',
              value: '',
              label: '免报原因',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ]
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.intercept.updUrl;
        // 页面表单
        this.arrList = [
          [
            {type: 'select',
              name: 'dataSource',
              value: '',
              label: '数据来源',
              param: 'DATASOURCE',
              eventChange: true,
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            },
            {type: 'input',
              name: 'bussNum',
              value: '',
              label: '业务编号',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'bussType',
              value: '',
              param: 'INTERCEPT_BUSSTYPE',
              label: '业务类型',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'systemId',
              value: '',
              label: '系统编号',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'select',
              name: 'idType',
              value: '',
              param: 'E_InfoIDType2',
              label: '证件类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: false, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'idNum',
              value: '',
              label: '证件号码',
              span: 12,
              rule: [
                {required: false, trigger: 'blur'},
                {max: 20, message: '最多20位', trigger: 'blur'}]
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
            {type: 'input',
              name: 'reason',
              value: '',
              label: '免报原因',
              span: 12,
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
};
</script>
<style>

</style>
