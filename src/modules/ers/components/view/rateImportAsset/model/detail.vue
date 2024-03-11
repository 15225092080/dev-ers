<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-m">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              labelWidth="180px">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  components: {},
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
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
    };
  },
  props: ['paramDetail'],
  computed: {},
  watch: {},
  methods: {
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {
            type: 'input',
            name: 'area',
            value: '',
            label: '所在区域(市)',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'goverPbocOrgan',
            value: '',
            label: '管辖人行机构',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'deptName',
            value: '',
            label: '金融机构名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'deptCode',
            value: '',
            param: 'deptCode',
            label: '金融机构代码',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'entName',
            value: '',
            param: '',
            label: '贷款企业名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'unifyCreditCode',
            value: '',
            label: '统一社会信用代码',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'countyEntFlag',
            value: '',
            label: '是否县域企业',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entScale',
            value: '',
            label: '企业规模',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'industryAffiliation',
            value: '',
            label: '行业归属',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entRateResult',
            value: '',
            label: '企业评级结果',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'rateTime',
            value: '',
            label: '定级时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'conNum',
            value: '',
            label: '贷款合同编号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'dueNum',
            value: '',
            label: '借据号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'matchState',
            value: '',
            label: '匹配状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'loanAmt',
            value: '',
            label: '贷款本金',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'guarMode',
            value: '',
            label: '担保方式',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'loanType',
            value: '',
            label: '贷款类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'fiveCate',
            value: '',
            label: '五级分类',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'annIntRate',
            value: '',
            label: '年利率(%)',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'openDate',
            value: '',
            label: '贷款发放日',
            span: 12,
            disabled: true,
            noReset: true,
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
            noReset: true,
          },
          {
            type: 'input',
            name: 'latRpyDate',
            value: '',
            label: '最近一次还款日',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'remainDays',
            value: '',
            label: '余期天数',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'greenCreditFlag',
            value: '',
            label: '是否绿色信贷',
            span: 12,
            disabled: true,
            noReset: true,
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
            noReset: true,
          },
          {
            type: 'input',
            name: 'pledgeStatus',
            value: '',
            label: '质押状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'acctStatus',
            value: '',
            label: '贷款状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'informStorageTime',
            value: '',
            label: '信息入库时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '数据操作者',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'getTime',
            value: '',
            label: '入库时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '修改时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '文件生成日期',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'bussId',
            value: '',
            label: '业务号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
