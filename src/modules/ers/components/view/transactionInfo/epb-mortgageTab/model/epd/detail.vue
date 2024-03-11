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
      buttonGroup: ['close'],
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
      _this.common.onselect('infOldType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = {params: {type: 'E_InfoIDType' + obj.e}};
        _this.getSystemId(param);
      });
    },
    async getSystemId(param) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      this.common.Control(this.arrList, {
        'guarCertType': {
          customOption: response
        }
      });
    },
    callback(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
      this.$refs[formItem].$refs[formItem].validate(valid => {
        if (valid) {
          this.http.apiPost(this.url, param).then(res => {
            this.$store.dispatch('user/setModaltState', '');
            that.common.submitMsg(res);
          });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    init() {
      this.arrList = [
        [
          {type: 'input', name: 'guarName', value: '', label: '其他债务人名称', span: 12, disabled: true
          },
          {type: 'select', name: 'infOldType', value: '', param: 'E_InfoIDType', label: '身份类别', span: 12, disabled: true, eventChange: true
          }
        ],
        [
          {type: 'select', name: 'guarCertType', value: '', customOption: {}, label: '其他债务人身份标识类型', span: 12, disabled: true // 关联字典
          },
          {type: 'input', name: 'guarCertNum', value: '', label: '其他债务人身份标识号码', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true},
          {type: 'select', name: 'deptCode', value: '', param: 'deptCode', label: '所属机构', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'operator', value: '', label: '操作员', span: 12, disabled: true},
          {type: 'input', name: 'changeTime', value: '', label: '修改时间', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'getTime', value: '', label: '入库时间', span: 12, disabled: true},
          {type: 'select', name: 'reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'dataState', value: '', param: 'E_DATA_STATE', label: '数据状态', span: 12, disabled: true},
          {type: 'select', name: 'centerExist', value: '', param: 'E_CENTER_EXIST', label: '中心是否存在', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'msgNum', value: '', label: '报文号', span: 12, disabled: true},
          {type: 'input', name: 'batchNum', value: '', label: '批次号', span: 12, disabled: true}
        ]
      ];
    }
  },
  created() {
    this.init();
  }

};
</script>
<style>
    .el-form-item__label{
        padding: 0 5px 0 0;
    }
</style>
