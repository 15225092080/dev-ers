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
        url: this.$urlList.epd.getValUrl, // 接口
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
      _this.common.onselect('infOldType', obj, function () {
        let param = {params: {type: 'E_InfoIDType' + obj.e}};
        _this.ipType = obj.e;
        let infOldType = _this.$refs.formItem.formItem.infOldType

        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        _this.getSystemId(param,infOldType);

      });
      _this.common.onselect('guarCertType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        // 身份类型
        if (_this.ipType == 1) {
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkIdcard, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 2) { // 护照
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkPassport, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 5) { // 港澳居民往来大陆通行证
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkHkmacidpassValidator, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 6) { // 台湾通行证
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkRocValidator, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
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
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.checkLoanCardnorules, trigger: 'blur'}
                ]
              }
            });
          } else if (obj.e == 20) {
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
                rule: [
                  {required: true, validator: _this.validator.empty, trigger: 'blur'},
                  {required: true, validator: _this.validator.isCCode, trigger: 'blur'}
                ]
              }
            });
          } else {
            _this.common.Control(_this.arrList, {
              'guarCertNum': {
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

    async getSystemId(param,infOldType) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      // 判断是初始化渲染还是选中之后重新渲染
      if (infOldType) {
        this.common.Control(this.arrList, {
          'guarCertType': {
            customOption: response,
            value: ""
          }
        });
      }else {
        this.common.Control(this.arrList, {
          'guarCertType': {
            customOption: response
          }
        });
      };
    },
    callbackFun(formItem) {
        let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
        this.callback(formItem,'epd',param)
    },

    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'select',
              name: 'infOldType',
              value: '',
              param: 'E_InfoIDType',
              label: '身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'guarName',
              value: '',
              label: '其他债务人名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 80, message: '最多80位', trigger: 'blur' }]
            }
          ],
          [
            {type: 'select',
              name: 'guarCertType',
              value: '',
              customOption: {},
              label: '其他债务人身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            },
            {type: 'input',
              name: 'guarCertNum',
              value: '',
              label: '其他债务人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 40, message: '最多40位', trigger: 'blur' }]}
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
              name: 'infOldType',
              value: '',
              param: 'E_InfoIDType',
              label: '身份类别',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            },
            {type: 'input',
              name: 'guarName',
              value: '',
              label: '其他债务人名称',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 80, message: '最多80位', trigger: 'blur' }]
            }
          ],
          [
            {type: 'select',
              name: 'guarCertType',
              value: '',
              customOption: {},
              label: '其他债务人身份标识类型',
              span: 12,
              eventChange: true,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}] // 关联字典
            },
            {type: 'input',
              name: 'guarCertNum',
              value: '',
              label: '其他债务人身份标识号码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                { max: 40, message: '最多40位', trigger: 'blur' }]}
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
