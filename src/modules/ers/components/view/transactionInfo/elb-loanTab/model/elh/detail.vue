<template>
  <div>
    <el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="170px">
          <!-- <el-button slot="slotBtn"  class="submit_btn" @click="callback('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button> -->
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
        url: this.$urlList.elh.getValUrl, // 接口
        param: {id: this.paramDetail.id} // 参数
      }
    };
  },
  props: ['paramDetail'],
  watch: {
  },
  methods: {
    init() {
      this.arrList = [
        [
          // {type: "input",name: "bussNum",value: "",label: "业务号",span: 12,disabled:true},
          {type: 'select', name: 'rptDateCode', value: '', param: 'E_RptDateCode_EL', label: '报送时点', span: 12, disabled: true},
          {type: 'select', name: 'acctStatus', value: '', param: 'E_AcctStatus', label: '账户状态', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'acctBal', value: '', label: '余额', span: 12, disabled: true},
          {type: 'input', name: 'balChgDate', value: '', label: '余额变化日期', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'fiveCate', value: '', param: 'E_FiveCate', label: '五级分类', span: 12, disabled: true},
          {type: 'input', name: 'fiveCateAdjDate', value: '', label: '五级分类认定日期', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'pymtPrd', value: '', label: '剩余还款月数', span: 12, disabled: true},
          {type: 'input', name: 'totOverd', value: '', label: '当前逾期总额', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'overdPrinc', value: '', label: '当前逾期本金', span: 12, disabled: true},
          {type: 'input', name: 'overdDy', value: '', label: '当前逾期天数', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'latRpyDate', value: '', label: '最近一次实际还款日期', span: 12, disabled: true},
          {type: 'input', name: 'latRpyAmt', value: '', label: '最近一次实际还款金额', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'latRpyPrincAmt', value: '', label: '最近一次实际归还本金', span: 12, disabled: true},
          {type: 'select', name: 'rpmtType', value: '', param: 'E_FormOfRepayment', label: '还款形式', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'latAgrrRpyDate', value: '', label: '最近一次约定还款日', span: 12, disabled: true},
          {type: 'input', name: 'latAgrrRpyAmt', value: '', label: '最近一次约定还款金额', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'nxtAgrrRpyDate', value: '', label: '下一次约定还款日期', span: 12, disabled: true},
          {type: 'input', name: 'closeDate', value: '', label: '账户关闭日期', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true},
          {type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name
                ;
              }},
            name: 'deptCode',
            value: '',
            label: '所属机构',
            span: 12,
            disabled: true,
            noReset: true}
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
