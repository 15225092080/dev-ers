<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              :findById="findById"
              labelWidth="110px">
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
        url: this.$urlList.erk.getValUrl, // 接口
        param: { id: this.paramDetail.id }, // 参数
      },
    };
  },
  props: ['paramDetail'],
  watch: {},
  methods: {
    init() {
      //this.url = this.$urlList.menu.create;
      this.arrList = [
        [
          {
            type: 'input',
            name: 'dueNum',
            value: '',
            label: '借据号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'conNum',
            value: '',
            label: '贷款合同编号',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'busiDtlLines',
            value: '',
            param: 'BusiDtlLines',
            label: '贷款业务种类细分',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'loanAmt',
            value: '',
            label: '贷款本金',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'dueDate',
            value: '',
            label: '贷款到期日',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'latRpyDate',
            value: '',
            label: '最近一次还款日期',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'acctBal',
            value: '',
            label: '贷款剩余本金',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'acctStatus',
            value: '',
            param: 'LoanStatusCode',
            label: '贷款状态',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'gnCredit',
            value: '',
            param: 'GreenCreditCode',
            label: '是否符合绿色信贷',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'fiveCate',
            value: '',
            param: 'FiveCate',
            label: '五级分类',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'guarMode',
            value: '',
            param: 'GuarMode',
            label: '担保方式',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'annIntRate',
            value: '',
            label: '年利率',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'openDate',
            value: '',
            label: '贷款发放日',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'deptCode',
            value: '',
            param: 'deptCode',
            label: '所属机构',
            span: 12,
            disabled: true,
          },
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
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '操作员',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '修改时间',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'getTime',
            value: '',
            label: '入库时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'reportState',
            value: '',
            param: 'REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'CENTER_EXIST',
            label: '中心是否存在',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
          },
        ],
      ];
    },
  },
  created() {
    this.init();
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
