<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="160px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>评级进程查看信息列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary"
                       plain
                       @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary"
                       @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger"
                       @click="deleteFun">
              <i class="DHCiconfont">&#xe6a3;</i>删除
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <!-- 新增、编辑弹出框 -->
    <v-edit v-if="visibleEdit"
            :paramEdit="paramEdit"
            ref="child"
            :vis.sync="visibleEdit"></v-edit>
    <!-- 详情弹出框 -->
    <v-detail v-if="visible"
              ref="childDetails"
              :paramDetail="paramDetail"
              :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
import vEdit from './model/edit';
import vDetail from './model/detail';
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'rateImportProcess-list',
  mixins: [MinXin],
  components: {
    vEdit,
    vDetail,
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '评级进程查看信息',
      },
      // 检索条件的折叠控制
      show: true,
      secondshow: true,
      // 表格中选中的数据行
      selected_row: '',
      // 编辑及新增弹框的显隐控制
      visibleEdit: false,
      visible: false,
      loading: false,
      // 弹框种类名
      title: '',
      // 判断弹框为新增还是编辑
      operation: '',
      height: '',
      // 详情
      paramDetail: {
        title: '',
        dialogTitle: '评级进程查看信息',
      },
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'year',
            name: 'search_EQ_sheetYear',
            label: '报表年份',
            span: 6,
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
            name: 'search_LIKE_deptCode',
            value: '',
            label: '业务管理金融机构代码',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_unifyCreditCode',
            value: '',
            label: '统一社会信用代码',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_rateProcess',
            value: '',
            label: '评级进程',
            customOption: {
              评级资料未提交中: '评级资料未提交中',
              资料审查中: '资料审查中',
              审查退回中: '审查退回中',
              等级初评中: '等级初评中',
              实地调查中: '实地调查中',
              上会审核中: '上会审核中',
              已定级: '已定级',
            },
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_entRateResult',
            value: '',
            label: '企业评级结果',
            customOption: {
              优秀: '优秀',
              很好: '很好',
              好: '好',
              正常: '正常',
              可接受: '可接受',
              一般: '一般',
              弱: '弱',
              有偿付风险: '有偿付风险',
              问题严重: '问题严重',
              濒临破产: '濒临破产',
            },
            span: 6,
          },
        ],
      ],
      detailUrl: {
        url: this.$urlList.rateImportProcess.getValUrl,
        delUrl: this.$urlList.rateImportProcess.delete,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'rateImportProcess',
        tableHeader: [
          {
            // 详情demo
            field: 'sheetYear',
            title: '报表年份',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.detailFuns,
            },
          },
          {
            field: 'deptName',
            title: '业务管理金融机构名称',
            width: 170,
          },
          {
            field: 'deptCode',
            title: '业务管理金融机构代码',
            width: 170,
            oper: {
              name: 'dic',
              type: 'deptCode',
            },
          },
          {
            field: 'entName',
            title: '企业名称',
            width: 120,
          },
          {
            field: 'unifyCreditCode',
            title: '统一社会信用代码',
            width: 120,
          },
          {
            field: 'rateProcess',
            title: '评级进程',
            width: 80,
          },
          {
            field: 'entRateResult',
            title: '企业评级结果',
            width: 120,
          },
          {
            field: 'rateTime',
            title: '定级时间',
            width: 130,
          },
          {
            field: 'trackLevel',
            title: '跟踪级别',
            width: 130,
          },
          {
            field: 'trackTime',
            title: '跟踪时间',
            width: 130,
          },
          {
            field: 'changeTime',
            title: '修改时间',
            width: 130,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {},
};
</script>

<style scoped="scoped">
</style>
