<template>
  <div>
    <!-- 查询报送历史按钮 -->
    <!-- <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="showHistory">查看报送历史</el-button>
      </el-row>
    </div> -->
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <!-- 基本信息段 -->
    <!-- <erk-detail v-if="erkDetail"
                ref="erkDetails"
                :paramDetail="paramDetail"
                :vis.sync="erkDetail"></erk-detail> -->
    <!-- 查询报送历史列表页 -->
    <!-- <historyList v-if="historyList"
                 ref="historyList"
                 :paramDetail="paramDetail"
                 @closeChild="closeChild"
                 :vis.sync="historyList"></historyList> -->
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import MinXin from '@/common/script/mixin';
import erkDetail from './erk/detail';
// import historyList from './historyList';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vCollapse,
    erkDetail,
    // historyList,
  },
  data() {
    return {
      //   arrList:[],
      //   url:'',
      detailUrl: {
        url: this.$urlList.eli.getValUrl,
        delUrl: this.$urlList.erk.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 弹框相关
      paramDetail: {},
      erkDetail: false,
      eldDetail: false,
      eleDetail: false,
      elhDetail: false,
      eliDetail: false,
      historyList: false,
      collapseList: {
        //   activeNames:['elb'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/elb-loanTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'erj',
            title: '基础段',
            showField: 'form',
            bind: 'erjList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erj.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            first: true,
            detailDataFun: this.elbDataFun,
          },
          {
            name: 'erk',
            title: '基本信息段',
            showField: 'form',
            bind: 'erkList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erk.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
        ],
        // erkTable: {
        //   // height:'default', //表格自适应高度
        //   bussName: 'erk',
        //   where: { search_EQ_bussNum: this.$route.query.bussNum },
        //   tableHeader: [
        //     {
        //       // 详情demo
        //       field: 'dueNum',
        //       title: '借据号',
        //       width: 120,
        //       oper: {
        //         // name: 'linkDic',
        //         // type: 'BusiLines_EL',
        //         name: 'link',
        //         clickFun: this.showdetailerk,
        //       },
        //     },
        //     {
        //       field: 'conNum',
        //       title: '贷款合同编号',
        //       width: 120,
        //     },
        //     {
        //       field: 'busiDtlLines',
        //       title: '贷款业务种类细分',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'BusiDtlLines',
        //       },
        //     },
        //     {
        //       field: 'deptCode',
        //       title: '贷款本金',
        //       width: 120,
        //     },
        //     {
        //       field: 'deptCode',
        //       title: '业务发生日期',
        //       width: 120,
        //     },
        //     {
        //       field: 'dataState',
        //       title: '数据状态',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'DATA_STATE',
        //       },
        //     },
        //     {
        //       field: 'reportState',
        //       title: '报送状态',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'REPORT_STATE',
        //       },
        //     },
        //   ],
        // },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    elbDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        _this.collapseList.item[i].defaultShow = false;
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'C1'
        ) {
          if (item.name == 'ele' || item.name == 'elf') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D1'
        ) {
          if (item.name == 'elg') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D2'
        ) {
          if (item.name == 'elf' || item.name == 'elg') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R1'
        ) {
          // 当账户类型为R1时，基本信息段表格的 字段 为 信用额度
          if (item.name == 'erk') {
            _this.collapseList.erkTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.erkTable.tableHeader[1].title = '信用额度';
          }
          if (item.name == 'elg') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R4'
        ) {
          if (item.name == 'elg') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        }
        return arr.push(item);
      });
      _this.collapseList.item = arr;
    },
    showdetailerk(selectRow) {
      this.erkDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '基本信息段',
        id: selectRow.id,
        url: null,
      };
    },
    // 报送历史列表页 弹出对话框
    showHistory() {
      this.historyList = true;
      this.paramDetail = {
        title: '借贷交易-报送历史列表',
        dialogTitle: '',
        url: null,
        id: this.$refs.collapse.$refs.erjList[0].formItem.id,
      };
    },
    closeChild() {
      this.historyList = false;
    },
    init() {
      this.collapseList.erjList = [
        [
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '业务号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'dueNum',
            value: '',
            label: '借据号',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'conNum',
            value: '',
            label: '贷款合同编号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'name',
            value: '',
            label: '借款企业名称',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'idType',
            value: '',
            param: 'InfoIDType2',
            label: '借款企业身份标识类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'idNum',
            value: '',
            label: '借款企业身份标识号码',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {
              children: 'children',
              label: function (a, b) {
                return a.name;
              },
            },
            name: 'deptCode',
            value: '',
            label: '内部机构代码',
            span: 12,
            disabled: true,
            // rule: [
            //   {
            //     required: true,
            //     validator: this.validator.empty,
            //     trigger: 'change',
            //   },
            // ],
          },
        ],
        // [
        // {
        //   type: 'select',
        //   name: 'dataState',
        //   value: '',
        //   param: 'DATA_STATE',
        //   label: '数据状态',
        //   span: 12,
        //   disabled: true,
        // },
        // {
        //   type: 'select',
        //   name: 'reportState',
        //   value: '',
        //   param: 'REPORT_STATE',
        //   label: '报送状态',
        //   span: 12,
        //   disabled: true,
        // },
        // ],
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'reportState',
            value: '',
            param: 'REPORT_STATE',
            label: '报送状态',
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
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
            span: 12,
            disabled: true,
          },
        ],
        [
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
      this.collapseList.erkList = [
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
            name: 'loanAmt',
            value: '',
            label: '贷款本金',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'dueDate',
            value: '',
            label: '贷款到期日',
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
        ],
        [
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'reportState',
            value: '',
            param: 'REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'CENTER_EXIST',
            label: '中心是否存在',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
            span: 12,
            disabled: true,
          },
        ],
        [
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
};
</script>
<style>
</style>
