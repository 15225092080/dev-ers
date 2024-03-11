<template>
  <div>
    <!-- 查询报送历史按钮 -->
    <!-- <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEbb">查看报送历史</el-button>
      </el-row>
    </div> -->
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <erdSha-detail v-if="erdShaDetail"
                   :paramEdit="paramDetail"
                   ref="erdShaDetail"
                   :vis.sync="erdShaDetail"></erdSha-detail>
    <ere-detail v-if="ereDetail"
                :paramEdit="paramDetail"
                ref="ereDetail"
                :vis.sync="ereDetail"></ere-detail>
    <erf-detail v-if="erfDetail"
                :paramEdit="paramDetail"
                ref="erfDetail"
                :vis.sync="erfDetail"></erf-detail>
    <erg-detail v-if="ergDetail"
                :paramEdit="paramDetail"
                ref="ergDetail"
                :vis.sync="ergDetail"></erg-detail>
    <erh-detail v-if="erhDetail"
                :paramEdit="paramDetail"
                ref="erhDetail"
                :vis.sync="erhDetail"></erh-detail>
    <eri-detail v-if="eriDetail"
                :paramEdit="paramDetail"
                ref="eriDetail"
                :vis.sync="eriDetail"></eri-detail>
    <!-- 查询报送历史列表页 -->
    <ebbHistory v-if="ebbHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="ebbHistory"
                :vis.sync="ebbHistory"></ebbHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import MinXin from '@/common/script/mixin';
import erdShaDetail from './erdSha/detail';
import ereDetail from './ere/detail';
import erfDetail from './erf/detail';
import ergDetail from './erg/detail';
import erhDetail from './erh/detail';
import eriDetail from './eri/detail';
import ebbHistory from './ebb-Detail';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vCollapse,
    erdShaDetail,
    ereDetail,
    erfDetail,
    ergDetail,
    erhDetail,
    eriDetail,
    ebbHistory,
  },
  data() {
    return {
      //   arrList:[],
      //   url:'',
      //   findById:{   //表单赋值接口（编辑，详情用的较多）
      //     url:this.$urlList.eeb.findById,   //接口
      //     param:this.$route.query   //参数
      //   },
      ebbHistory: false,
      // erbDetail: false,
      // ercDetail: false,
      // erdDetail: false,
      detailUrl: {
        url: this.$urlList.eri.getValUrl,
        delUrl: this.$urlList.erh.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      erdShaDetail: false,
      ereDetail: false,
      erfDetail: false,
      ergDetail: false,
      erhDetail: false,
      eriDetail: false,
      paramEdit: {},
      paramDetail: {},
      collapseList: {
        //   activeNames:['eeb'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/era-basicinfoTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'era',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.era.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            first: true,
            detailDataFun: this.eraDataFun,
          },
          {
            name: 'erb',
            title: '基本概况段',
            showField: 'form',
            bind: 'erbList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'erc',
            title: '主要负责人段',
            showField: 'form',
            bind: 'ercList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erc.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'erd',
            title: '注册资本段',
            showField: 'form',
            bind: 'erdList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erd.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'erdSha',
            title: '主要出资人段',
            showField: 'table',
            bind: 'erdShaTable',
            disabled: false,
            where: { search_EQ_custId: 'custId' },
            defaultShow: true,
          },
          {
            name: 'ere',
            title: '对外投资信息段',
            showField: 'table',
            bind: 'ereTable',
            disabled: false,
          },
          {
            name: 'erf',
            title: '负面信息段',
            showField: 'table',
            bind: 'erfTable',
            disabled: false,
            where: { search_EQ_custId: 'custId' },
            defaultShow: true,
          },
          {
            name: 'erg',
            title: '资产负债表',
            showField: 'table',
            bind: 'ergTable',
            disabled: false,
            where: { search_EQ_custId: 'custId' },
            defaultShow: true,
          },
          {
            name: 'erh',
            title: '利润表',
            showField: 'table',
            bind: 'erhTable',
            disabled: false,
            where: { search_EQ_custId: 'custId' },
            defaultShow: true,
          },
          {
            name: 'eri',
            title: '现金流量表',
            showField: 'table',
            bind: 'eriTable',
            disabled: false,
            where: { search_EQ_custId: 'custId' },
            defaultShow: true,
          },
          {
            name: 'ers',
            title: '补充报表段',
            showField: 'form',
            bind: 'ersList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.ers.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
        ],
        erdShaTable: {
          bussName: 'erdSha',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'sharhodName',
              title: '出资人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerdSha,
              },
            },
            {
              field: 'sharhodIdType',
              title: '出资人身份类别',
              width: 120,
              oper: {
                name: 'dic',
                type: 'InfoIDType',
              },
            },
            {
              field: 'sharhodCertIdType',
              title: '出资人身份标识类型',
              width: 180,
              oper: {
                name: 'function',
                followName: 'sharhodIdType',
                changeName: 'sharhodCertIdType',
                dicUrl: this.$urlList.common.dic,
                type: 'InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'sharhodIdNum',
              title: '出资人身份标识号码',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        ereTable: {
          bussName: 'ere',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'invEntName',
              title: '被投资企业名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailere,
              },
            },
            {
              field: 'invCertType',
              title: '被投资企业身份标识类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'InfoIDType2',
              },
            },
            {
              field: 'invCertNum',
              title: '被投资企业身份标识号码',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        erfTable: {
          bussName: 'erf',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'negInfo',
              title: '信息内容',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerf,
              },
            },
            {
              field: 'negType',
              title: '负面信息类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'NegativeType',
              },
            },
            {
              field: 'invAmount',
              title: '涉案金额',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        ergTable: {
          bussName: 'erg',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerg,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        erhTable: {
          bussName: 'erh',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerh,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        eriTable: {
          bussName: 'eri',
          selectionShow: true,
          // height:'default', //表格自适应高度
          where: { search_EQ_custId: this.$route.query.custId },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetaileri,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
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
    eraDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        _this.collapseList.item[i].defaultShow = false;
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'C1'
        ) {
          if (item.name == 'erd' || item.name == 'erdSha') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D1'
        ) {
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D2'
        ) {
          if (item.name == 'erdSha' || item.name == 'ere') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R1'
        ) {
          // 当账户类型为R1时，基本信息段表格的 字段 为 信用额度
          if (item.name == 'erb') {
            _this.collapseList.elcTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.elcTable.tableHeader[1].title = '信用额度';
          }
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R4'
        ) {
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        }
        return arr.push(item);
      });
      _this.collapseList.item = arr;
    },
    showdetailerdSha(selectRow) {
      this.erdShaDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '主要出资人段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailere(selectRow) {
      this.ereDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '对外投资信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailerf(selectRow) {
      this.erfDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '负面信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailerg(selectRow) {
      this.$router.push({
        path: '/erg-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    showdetailerh(selectRow) {
      this.$router.push({
        path: '/erh-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    showdetaileri(selectRow) {
      this.$router.push({
        path: '/eri-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    // 分数计算详情页 弹出对话框
    historyBtnEbb() {
      if (
        this.$refs.collapse.$refs.arrList[0].formItem.score !== '' ||
        undefined
      ) {
        this.ebbHistory = true;
        this.paramDetail = {
          title: '分数计算页-详情',
          dialogTitle: '',
          url: null,
          entName: this.$refs.collapse.$refs.arrList[0].formItem.entName,
          data: {
            custId: this.$refs.collapse.$refs.arrList[0].formItem.custId,
          },
        };
      }
    },
    closeChild() {
      this.ebbHistory = false;
    },
    treeCustom(code) {
      this.http
        .apiGet(this.$urlList.common.getEmpdCodeName, {
          params: { code: code },
        })
        .then((res) => {
          this.$refs.collapse.$refs.ercList[0].search_IN_orgId_fake = res;
        });
    },
    init() {
      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'custId',
            value: '',
            label: '客户号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'entName',
            value: '',
            label: '企业名称',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'entCertType',
            value: '',
            param: 'InfoIDType2',
            label: '企业身份标识类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'entCertNum',
            value: '',
            label: '企业身份标识号码',
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
            name: 'score',
            value: '',
            label: '分数',
            span: 12,
            // disabled: true,
            clickFun: this.historyBtnEbb,
            noReset: this.isDisabled,
            readonly: true,
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
            name: 'operator',
            value: '',
            label: '操作员',
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
            name: 'noReport',
            value: '',
            param: 'NO_REPORT',
            label: '免报标志',
            span: 12,
            disabled: true,
          },
          // {
          //   type: 'select',
          //   name: 'auditingState',
          //   value: '',
          //   param: 'AUDITING_STATE',
          //   label: '审核状态',
          //   span: 12,
          //   disabled: true,
          // },
        ],
      ];
      this.collapseList.erbList = [
        [
          {
            type: 'input',
            name: 'regAdd',
            value: '',
            label: '登记注册地址',
            span: 12,
            disabled: true,
          },
          {
            type: 'cascader',
            name: 'admDivOfReg',
            value: '',
            label: '登记地行政区划代码',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'establishDate',
            value: '',
            label: '成立日期',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'bizRange',
            value: '',
            label: '业务范围',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'souIncome',
            value: '',
            label: '主营业务收入来源',
            span: 12,
            disabled: true,
          },
          {
            type: 'tree',
            treeurl: this.$urlList.common.empdTree,
            treetitle: '行业分类树',
            defaultProps: {
              children: 'children',
              label: function (a, b) {
                return a.value;
              },
            },
            name: 'ecoIndusCate',
            value: '',
            label: '行业分类代码',
            span: 12,
            disabled: true,
            // rule: [
            //   {
            //     required: true,
            //     validator: this.validator.empty,
            //     trigger: 'change',
            //   },
            // ],
            custom: this.treeCustom,
          },
        ],
        [
          {
            type: 'select',
            name: 'ecoType',
            value: '',
            param: 'EconomicType',
            label: '经济类型代码',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'ratResults',
            value: '',
            param: 'IRROFI',
            label: '金融机构内部评级结果',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'ratSysDescr',
            value: '',
            label: '金融机构内评体系描述',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'busChanges',
            value: '',
            param: 'ChangeBusiness',
            label: '主体业务变革情况',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'assetSupport',
            param: 'CreditAssetSupport',
            value: '',
            label: '信贷资产支持',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'perChange',
            value: '',
            param: 'PersonnelChanges',
            label: '近一年主要人员是否发生变动',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'taxArrearNm',
            value: '',
            label: '近三年的欠税条数',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'opePropeRights',
            param: 'PropertyRights',
            value: '',
            label: '经营地产权情况',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'practitionerNum',
            value: '',
            label: '从业人员数量',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'boaMemberNum',
            value: '',
            label: '董事会成员(执行董事)数量',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'boaSupervisNm',
            value: '',
            label: '监事会成员(监事)数量',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'countyEnterprises',
            value: '',
            param: 'IS_COUNTYENT',
            label: '是否县域企业',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'agrRelated',
            value: '',
            param: 'IS_AGRIBUSINESS',
            label: '是否涉农企业',
            span: 12,
            disabled: true,
          },
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
        [
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
            name: 'operator',
            value: '',
            label: '操作员',
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
          // {
          //   type: 'select',
          //   name: 'noReport',
          //   value: '',
          //   param: 'NO_REPORT',
          //   label: '免报标志',
          //   span: 12,
          //   disabled: true,
          // },
        ],
      ];
      this.collapseList.ercList = [
        [
          {
            type: 'input',
            name: 'legalRepName',
            value: '',
            label: '主要负责人名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'legalRepIdType',
            value: '',
            param: 'InfoIDType1',
            label: '主要负责人身份标识类型',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'legalRepIdNum',
            value: '',
            label: '主要负责人身份证件号码',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'legalRepPstn',
            value: '',
            param: 'RegisteredResidence',
            label: '主要负责人户籍情况',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'legalRepEdu',
            value: '',
            param: 'Education',
            label: '主要负责人学历情况',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'legalRepEmpyears',
            value: '',
            label: '主要负责人在本单位从业年限',
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
            name: 'operator',
            value: '',
            label: '操作员',
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
          // {
          //   type: 'select',
          //   name: 'noReport',
          //   value: '',
          //   param: 'NO_REPORT',
          //   label: '免报标志',
          //   span: 12,
          //   disabled: true,
          // },
        ],
      ];
      this.collapseList.erdList = [
        [
          {
            type: 'select',
            name: 'regCapCurrency',
            value: '',
            param: 'Cy',
            label: '注册资本币种',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'regCap',
            value: '',
            label: '注册资本',
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
            name: 'operator',
            value: '',
            label: '操作员',
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
            type: 'date',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
          // {
          //   type: 'select',
          //   name: 'noReport',
          //   value: '',
          //   param: 'NO_REPORT',
          //   label: '免报标志',
          //   span: 12,
          //   disabled: true,
          // },
        ],
      ];
      this.collapseList.ersList = [
        [
          {
            type: 'input',
            name: 'intExp',
            value: '',
            label: '利息支出（费用化利息支出+资本化利息支出）',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'finExp',
            value: '',
            label: '财务费用利息支出',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'capIntExp',
            value: '',
            label: '资本化利息支出',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'gauEndOfPer',
            value: '',
            label: '期末未清担保余额',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'oriFixedAssets',
            value: '',
            label: '固定资产原值',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'derIxedAssets',
            value: '',
            label: '固定资产累计折旧',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'year',
            name: 'sheetYear',
            value: '',
            label: '报表年份',
            span: 12,
            disabled: true,
          },
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
            name: 'getTime',
            value: '',
            label: '入库时间',
            span: 12,
            disabled: true,
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
  /* overflow: hidden; */
  padding-bottom: 10px;
}
.historyBtn {
  float: right;
}
</style>
