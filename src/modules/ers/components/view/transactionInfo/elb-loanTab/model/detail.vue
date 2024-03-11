<template>
  <div>
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="showHistory">查看报送历史</el-button>
      </el-row>
    </div>
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <!-- 基本信息段 -->
    <elc-detail v-if="elcDetail"
                ref="elcDetails"
                :paramDetail="paramDetail"
                :vis.sync="elcDetail"></elc-detail>
    <!-- 相关还款责任人段 -->
    <eld-detail v-if="eldDetail"
                ref="eldDetails"
                :paramDetail="paramDetail"
                :vis.sync="eldDetail"></eld-detail>
    <!-- 抵质押物信息段 -->
    <ele-detail v-if="eleDetail"
                ref="eleDetails"
                :paramDetail="paramDetail"
                :vis.sync="eleDetail"></ele-detail>
    <!-- 还款表现信息段 -->
    <elh-detail v-if="elhDetail"
                ref="elhDetails"
                :paramDetail="paramDetail"
                :vis.sync="elhDetail"></elh-detail>
    <!-- 特定交易说明段 -->
    <eli-detail v-if="eliDetail"
                ref="eliDetails"
                :paramDetail="paramDetail"
                :vis.sync="eliDetail"></eli-detail>
    <!-- 查询报送历史列表页 -->
    <historyList v-if="historyList"
                 ref="historyList"
                 :paramDetail="paramDetail"
                 @closeChild="closeChild"
                 :vis.sync="historyList"></historyList>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import MinXin from '@/common/script/mixin';
import elcDetail from './elc/detail';
import eldDetail from './eld/detail';
import eleDetail from './ele/detail';
import elhDetail from './elh/detail';
import eliDetail from './eli/detail';
import historyList from './historyList';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vCollapse,
    elcDetail,
    eldDetail,
    eleDetail,
    elhDetail,
    eliDetail,
    historyList,
  },
  data() {
    return {
      //   arrList:[],
      //   url:'',
      detailUrl: {
        url: this.$urlList.eli.getValUrl,
        delUrl: this.$urlList.elc.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 弹框相关
      paramDetail: {},
      elcDetail: false,
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
            name: 'elb',
            title: '基础段',
            showField: 'form',
            bind: 'elbList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            first: true,
            detailDataFun: this.elbDataFun,
          },
          {
            name: 'elc',
            title: '基本信息段',
            showField: 'table',
            bind: 'elcTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'eld',
            title: '相关还款责任人段',
            showField: 'table',
            bind: 'eldTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'ele',
            title: '抵质押物信息段',
            showField: 'table',
            bind: 'eleTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'elf',
            title: '授信额度信息段',
            showField: 'form',
            bind: 'elfList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elf.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'elg',
            title: '初始债权说明段',
            showField: 'form',
            bind: 'elgList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elg.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'elh',
            title: '还款表现信息段',
            showField: 'table',
            bind: 'elhTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'eli',
            title: '特定交易说明段',
            showField: 'table',
            bind: 'eliTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
        ],
        elcTable: {
          // height:'default', //表格自适应高度
          bussName: 'elc',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'busiLines',
              title: '借贷业务大类',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_BusiLines_EL',
                //   name: "link",
                clickFun: this.showdetailElc,
              },
            },
            {
              field: 'loanAmt',
              title: '借款金额',
              width: 120,
            },
            {
              field: 'openDate',
              title: '开户日期',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eldTable: {
          bussName: 'eld',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'arlpIdType',
              title: '身份类别',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_InfoIDType',
                clickFun: this.showdetailEld,
              },
            },
            {
              field: 'arlpName',
              title: '责任人名称',
              width: 120,
            },
            {
              field: 'arlpCertType',
              title: '责任人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'arlpIdType',
                changeName: 'arlpCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'arlpCertNum',
              title: '责任人身份标识号码',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eleTable: {
          bussName: 'ele',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'ccBussNum',
              title: '抵(质)押合同编号',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailEle,
              },
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        elhTable: {
          bussName: 'elh',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'rptDateCode',
              title: '报送时点',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_RptDateCode_EL',
                clickFun: this.showdetailElh,
              },
            },
            {
              // 详情demo
              field: 'acctStatus',
              title: '账户状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_AcctStatus',
              },
            },
            {
              field: 'acctBal',
              title: '余额',
              width: 120,
            },
            {
              field: 'fiveCate',
              title: '五级分类',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_FiveCate',
              },
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eliTable: {
          bussName: 'eli',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'chanTranType',
              title: '交易类型',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_ChanTranType',
                clickFun: this.showdetailEli,
              },
            },
            {
              field: 'tranDate',
              title: '交易日期',
              width: 120,
            },
            {
              field: 'tranAmt',
              title: '交易金额',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
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
          if (item.name == 'elc') {
            _this.collapseList.elcTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.elcTable.tableHeader[1].title = '信用额度';
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
    showdetailElc(selectRow) {
      this.elcDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '基本信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEld(selectRow) {
      this.eldDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '相关还款责任人段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEle(selectRow) {
      this.eleDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '抵质押物信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailElh(selectRow) {
      this.elhDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '还款表现信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEli(selectRow) {
      this.eliDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '特定交易说明段',
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
        id: this.$refs.collapse.$refs.elbList[0].formItem.id,
      };
    },
    closeChild() {
      this.historyList = false;
    },
    init() {
      this.collapseList.elbList = [
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
            name: 'entName',
            value: '',
            label: '借款人名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'entCertType',
            value: '',
            param: 'E_InfoIDType2',
            label: '借款人身份标识类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'entCertNum',
            value: '',
            label: '借款人身份标识号码',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'acctType',
            value: '',
            param: 'E_AcctType_EL',
            label: '账户类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            disabled: true,
          },
          {
            type: 'tree',
            name: 'deptCode',
            value: '',
            label: '所属机构',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
            span: 12,
            disabled: true,
          },
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
            name: 'noReport',
            value: '',
            param: 'E_NO_REPORT',
            label: '免报标志',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'reportState',
            value: '',
            param: 'E_REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'E_CENTER_EXIST',
            label: '中心是否存在',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'E_DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
          // {
          //   type: 'select',
          //   name: 'auditingState',
          //   value: '',
          //   param: 'E_AUDITING_STATE',
          //   label: '审核状态',
          //   span: 12,
          //   disabled: true,
          // },
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
      this.collapseList.elfList = [
        [
          {
            type: 'input',
            name: 'mccBussNum',
            value: '',
            label: '授信协议编号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            disabled: true,
          },
          // {type: 'tree', name: 'deptCode', value: '', label: '所属机构', span: 12, disabled: true}
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
            param: 'E_REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'E_DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'E_CENTER_EXIST',
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
      this.collapseList.elgList = [
        [
          {
            type: 'input',
            name: 'initCredName',
            value: '',
            label: '初始债券人姓名',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'initCredOrgNum',
            value: '',
            label: '初始债权人机构代码',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'origDbtCate',
            value: '',
            param: 'E_OrigDbtCate',
            label: '原债务种类',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'initRpySts',
            value: '',
            param: 'E_InitRpySts',
            label: '债权转移时的还款状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            disabled: true,
          },
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
            param: 'E_REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'E_DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'E_CENTER_EXIST',
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
