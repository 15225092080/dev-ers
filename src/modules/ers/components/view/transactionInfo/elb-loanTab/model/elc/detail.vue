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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="110px">
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
        url: this.$urlList.elc.getValUrl, // 接口
        param: {id: this.paramDetail.id} // 参数
      }
    };
  },
  props: ['paramDetail'],
  watch: {
  },
  methods: {
    init() {
      //this.url = this.$urlList.menu.create;
      this.arrList = [
        [
          // {type: "input",name: "bussNum",value: "",label: "业务号",span: 12,disabled:true},
          {type: 'select', name: 'busiLines', value: '', param: 'E_BusiLines_EL', label: '借贷业务大类', span: 12, disabled: true},
          {type: 'select', name: 'busiDtlLines', value: '', param: 'E_BusiDtlLines_EL_', label: '借贷业务种类细分', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'openDate', value: '', label: '开户日期', span: 12, disabled: true},
          {type: 'select', name: 'cy', value: '', param: 'E_Cy', label: '币种', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'acctCredLine', value: '', label: '信用额度', span: 12, disabled: true},
          {type: 'input', name: 'loanAmt', value: '', label: '借款金额', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'flag', value: '', param: 'E_SplitFlag', label: '分次放款标志', span: 12, disabled: true},
          {type: 'input', name: 'dueDate', value: '', label: '到期日期', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'repayMode', value: '', param: 'E_RepayMode', label: '还款方式', span: 12, disabled: true},
          {type: 'select', name: 'repayFreqcy', value: '', param: 'E_RepayFreqcy', label: '还款频率', span: 12, disabled: true}
        ],
        [
          {type: 'cascader', name: 'applyBusiDist', value: '', label: '业务申请地行政区划代码', span: 24, disabled: true}
        ],
        [
          {type: 'select', name: 'guarMode', value: '', param: 'E_GuarMode_EG', label: '担保方式', span: 12, disabled: true},
          {type: 'select', name: 'othRepyGuarway', value: '', param: 'E_OthRepyGuarWay_EL', label: '其他还款保证方式', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'loanTimeLimCat', value: '', param: 'E_WaysOfBorrowing', label: '借款期限分类', span: 12, disabled: true},
          {type: 'select', name: 'loaFrm', value: '', param: 'E_LoanForm', label: '贷款发放形式', span: 12, disabled: true}
        ],
        [
        //   {type: 'select', name: 'actInvest', value: '', param: 'E_InfoIDType2', label: '贷款实际投向', span: 12, disabled: true},
          {type: 'tree',
              treeurl: this.$urlList.common.empdTree,
              treetitle: '行业分类树',
              defaultProps: {children: 'children',
                label: function (a, b) {
                  return a.value
                  ;
                }},
              name: 'actInvest',
              value: '',
              label: '贷款实际投向',
              span: 12, disabled: true},
          {type: 'select', name: 'fundSou', value: '', param: 'E_FundSou', label: '业务经营类型', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'assetTrandFlag', value: '', param: 'E_AssetTrandFlag', label: '资产转让标志', span: 12, disabled: true},
          {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'deptCode', value: '', param: 'deptCode', label: '所属机构', span: 12, disabled: true},
        //   {type: 'tree',
        //     treeurl: this.$urlList.common.orgTree,
        //     treetitle: '机构树',
        //     defaultProps: {children: 'children',
        //       label: function (a, b) {
        //         return a.name
        //         ;
        //       }},
        //     name: 'deptCode',
        //     value: '',
        //     label: '所属机构',
        //     span: 12,
        //     disabled: true,
        //     noReset: true}
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
