<template>
  <div>
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEgb">查看报送历史</el-button>
      </el-row>
    </div>
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <egc-detail v-if="egcDetail"
                :paramEdit="paramDetail"
                ref="egcDetail"
                :vis.sync="egcDetail"></egc-detail>
    <egd-detail v-if="egdDetail"
                :paramEdit="paramDetail"
                ref="egdDetail"
                :vis.sync="egdDetail"></egd-detail>
    <ege-detail v-if="egeDetail"
                :paramEdit="paramDetail"
                ref="egeDetail"
                :vis.sync="egeDetail"></ege-detail>
    <!-- 查询报送历史列表页 -->
    <egbHistory v-if="egbHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="egbHistory"
                :vis.sync="egbHistory"></egbHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import egcDetail from './egc/detail';
import egdDetail from './egd/detail';
import egeDetail from './ege/detail';
import egbHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    egcDetail,
    egdDetail,
    egeDetail,
    egbHistory,
  },
  data() {
    return {
      egbHistory: false,
      egcDetail: false,
      egdDetail: false,
      egeDetail: false,
      paramEdit: {},
      paramDetail: {},
      collapseList: {
        //   activeNames:['eeb'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/egb/guaranteeTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'egb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.egb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            first: true,
          },
          {
            name: 'egc',
            title: '基本信息段',
            showField: 'table',
            bind: 'egcTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'ege',
            title: '相关还款责任人段',
            showField: 'table',
            bind: 'egeTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'egd',
            title: '在保责任信息段',
            showField: 'table',
            bind: 'egdTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'egg',
            title: '授信额度信息段',
            showField: 'form',
            bind: 'eggList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.egg.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            search: { bussNum: 'bussNum', deptCode: 'deptCode' },
          },
        ],
        egcTable: {
          // height:'default', //表格自适应高度
          bussName: 'egc',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            // {
            //   // 详情demo
            //   field: 'bussNum',
            //   title: '业务号',
            //   width: 120,
            //   oper: {
            //     name: 'link',
            //     clickFun: this.showdetail
            //   }
            // },
            {
              // 详情demo
              field: 'busiLines',
              title: '担保业务种类',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_BusiLines_EG',
                clickFun: this.showdetail,
              },
            },
            {
              field: 'guarAmt',
              title: '担保金额',
              width: 120,
            },
            {
              field: 'openDate',
              title: '开户日期',
              width: 120,
            },
            {
              field: 'dueDate',
              title: '到期日期',
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
        egdTable: {
          bussName: 'egd',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'acctStatus',
              title: '账户状态',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_AcctStatus_EG',
                clickFun: this.showdetailegd,
              },
            },
            {
              field: 'rptDateCode',
              title: '报送时点',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_RptDateCode_EG',
              },
            },
            {
              field: 'loanAmt',
              title: '在保余额',
              width: 120,
            },
            {
              field: 'repayPrd',
              title: '余额变化日期',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
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
        egeTable: {
          bussName: 'ege',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'infoIdType',
              title: '身份类别',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_InfoIDType',
                clickFun: this.showdetailege,
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
                followName: 'infoIdType',
                changeName: 'arlpCertType',
                //dicFun:this.dicFunc,  // 指令里自定义方法
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典 url : idDicUrl,type : ""
              },
            },
            {
              field: 'arlpCertNum',
              title: '责任人身份标识号码',
              width: 120,
            },
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
    showdetail(selectRow) {
      this.egcDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '基本信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailegd(selectRow) {
      this.egdDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '在保责任信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailege(selectRow) {
      this.egeDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '相关还款责任人段',
        id: selectRow.id,
        url: null,
      };
    },
    // 报送历史列表页 弹出对话框
    historyBtnEgb() {
      this.egbHistory = true;
      this.paramDetail = {
        title: '担保交易-报送历史列表',
        dialogTitle: '',
        url: null,
        id: this.$refs.collapse.$refs.arrList[0].formItem.id,
      };
    },
    closeChild() {
      this.egbHistory = false;
    },
    init() {
      this.collapseList.arrList = [
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
            label: '债务人名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'entCertType',
            value: '',
            param: 'E_InfoIDType2',
            label: '债务人身份标识类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'entCertNum',
            value: '',
            label: '债务人身份标识号码',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'acctType',
            value: '',
            param: 'E_AcctType_EG',
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
            type: 'select',
            name: 'deptCode',
            value: '',
            param: 'deptCode',
            label: '所属机构',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
      this.collapseList.eggList = [
        [
          {
            type: 'input',
            name: 'ctrcNum',
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
          // {type: 'select', name: 'noReport', value: '', param: 'E_NO_REPORT', label: '免报标志', span: 12, disabled: true},
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
          // {type: 'select', name: 'auditingState', value: '', param: 'E_AUDITING_STATE', label: '审核状态', span: 12, disabled: true},
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
