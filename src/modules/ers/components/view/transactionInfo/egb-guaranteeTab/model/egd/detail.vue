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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="110px">

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
        url: this.$urlList.egd.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
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
          {type: 'select', name: 'rptDateCode', value: '', param: 'E_RptDateCode_EG', label: '报送时点', span: 12, disabled: true
          },
          {type: 'select', name: 'acctStatus', value: '', param: 'E_AcctStatus_EG', label: '账户状态', span: 12, disabled: true
          },
          {type: 'input', name: 'loanAmt', value: '', label: '在保余额', span: 12, disabled: true
          }
        ],
        [
          {type: 'input', name: 'repayPrd', value: '', label: '余额变化日期', span: 12, disabled: true
          },
          {type: 'select', name: 'fiveCate', value: '', param: 'E_FiveCate', label: '五级分类', span: 12, disabled: true
          }
        ],
        [
          {type: 'input', name: 'fiveCateAdjDate', value: '', label: '五级分类认定日期', span: 12, disabled: true
          },
          {type: 'input', name: 'riEx', value: '', label: '风险敞口', span: 12, disabled: true
          }
        ],
        [
          {type: 'select', name: 'compAdvFlag', value: '', param: 'E_CompAdvFlag', label: '代偿(垫款)标志', span: 12, disabled: true
          },
          {type: 'input', name: 'closeDate', value: '', label: '账户关闭日期', span: 12, disabled: true
          }
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
