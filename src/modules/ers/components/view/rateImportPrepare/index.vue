<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="160px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>评级准备信息列表
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
  name: 'rateImportPrepare-list',
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
        dialogTitle: '评级准备信息',
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
        dialogTitle: '评级准备信息',
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
            name: 'search_EQ_dataReviewStatus',
            value: '',
            label: '资料审查状态',
            customOption: {
              待提交: '待提交',
              待审查: '待审查',
              待复查: '待复查',
              审查退回: '审查退回',
              已审查: '已审查',
            },
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_authorizeStatus',
            value: '',
            label: '授权状态',
            customOption: {
              待授权: '待授权',
              已授权: '已授权',
            },
            span: 6,
          },
        ],
      ],
      detailUrl: {
        url: this.$urlList.rateImportPrepare.getValUrl,
        delUrl: this.$urlList.rateImportPrepare.delete,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'rateImportPrepare',
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
            width: 160,
          },
          {
            field: 'deptCode',
            title: '业务管理金融机构代码',
            width: 160,
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
            width: 150,
          },
          {
            field: 'dataReviewStatus',
            title: '资料审查状态',
            width: 120,
          },
          {
            field: 'authorizeStatus',
            title: '授权状态',
            width: 80,
          },
          {
            field: 'submitAuditTime',
            title: '提交审核时间',
            width: 130,
          },
          {
            field: 'passAuditTime',
            title: '审查通过时间',
            width: 130,
          },
          {
            field: 'returnAuditTime',
            title: '审查退回时间',
            width: 130,
          },
          {
            field: 'informStorageTime',
            title: '信息入库时间',
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
