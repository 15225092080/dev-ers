<template>
  <div>
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtn2">查看报送历史</el-button>
      </el-row>
    </div>
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <epd-detail v-if="epdDetail"
                :paramEdit="paramDetail"
                ref="epdDetail"
                :vis.sync="epdDetail"></epd-detail>
    <epe-detail v-if="epeDetail"
                :paramEdit="paramDetail"
                ref="epeDetail"
                :vis.sync="epeDetail"></epe-detail>
    <epf-detail v-if="epfDetail"
                :paramEdit="paramDetail"
                ref="epfDetail"
                :vis.sync="epfDetail"></epf-detail>
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
import epdDetail from './epd/detail';
import epeDetail from './epe/detail';
import epfDetail from './epf/detail';
import historyList from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    epdDetail,
    epeDetail,
    epfDetail,
    historyList,
  },
  data() {
    return {
      epdDetail: false,
      epeDetail: false,
      epfDetail: false,
      historyList: false,
      collapseList: {
        //   activeNames:['eeb'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/epb/mortgageTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'epb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.epb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            first: true,
            detailDataFun: this.epbDataFun,
          },
          {
            name: 'epd',
            title: '其他债务人信息段',
            showField: 'table',
            bind: 'epdTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'epe',
            title: '抵押物信息段',
            showField: 'table',
            bind: 'epeTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'epf',
            title: '质物信息段',
            showField: 'table',
            bind: 'epfTable',
            disabled: false,
            where: { search_EQ_bussNum: 'bussNum' },
          },
        ],
        epdTable: {
          // height:'default', //表格自适应高度
          bussName: 'epd',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'guarName',
              title: '其他债务人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetail,
              },
            },
            {
              field: 'guarCertType',
              title: '其他债务人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'infOldType',
                changeName: 'guarCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'guarCertNum',
              title: '其他债务人身份标识号码',
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
        epeTable: {
          bussName: 'epe',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'pleDgorName',
              title: '抵押人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailepe,
              },
            },
            {
              field: 'pleorCertType',
              title: '抵押人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'pleDgorType',
                changeName: 'pleorCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'pleorCertNum',
              title: '抵押人身份标识号码',
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
        epfTable: {
          bussName: 'epf',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          tableHeader: [
            {
              // 详情demo
              field: 'pawnName',
              title: '出质人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailepf,
              },
            },
            {
              field: 'pawnCertType',
              title: '出质人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'ippc',
                changeName: 'pawnCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'pawnCertNum',
              title: '出质人身份标识号码',
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
    epbDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.guarType == '1'
        ) {
          if (item.name == 'epf') {
            item.hidden = true;
            // _this.collapseList.item.splice(i, 1);
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.guarType == '2'
        ) {
          if (item.name == 'epe') {
            item.hidden = true;
            // _this.collapseList.item.splice(i, 1);
          }
        }
        return arr.push(item);
      });
      _this.collapseList.item = arr;
    },
    showdetail(selectRow) {
      this.epdDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '其他债务人信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailepe(selectRow) {
      this.epeDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '抵押物信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailepf(selectRow) {
      this.epfDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '质物信息段',
        id: selectRow.id,
        url: null,
      };
    },
    // 报送历史列表页 弹出对话框
    historyBtn2() {
      this.historyList = true;
      this.paramDetail = {
        title: '抵质押合同信息-报送历史列表',
        dialogTitle: '',
        url: null,
        id: this.$refs.collapse.$refs.arrList[0].formItem.id,
      };
    },
    closeChild() {
      this.historyList = false;
    },
    init() {
      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '抵(质)押合同编号',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'guarType',
            value: '',
            param: 'E_GuarType',
            label: '合同类型',
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
            name: 'ccStatus',
            value: '',
            param: 'E_CcStatus',
            label: '抵(质)押合同状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'ccAmt',
            value: '',
            label: '担保金额',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'cy',
            value: '',
            param: 'E_Cy',
            label: '币种',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'ccvalDate',
            value: '',
            label: '抵(质)押合同生效日期',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'ccexpDate',
            value: '',
            label: '抵(质)押合同到期日期',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'maxGuar',
            value: '',
            param: 'E_MaxGuar',
            label: '最高额担保标志',
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
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
.historyGroup {
  width: 85%;
  overflow: hidden;
  padding-bottom: 10px;
}
.historyBtn {
  float: right;
}
</style>
