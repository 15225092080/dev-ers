<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="160px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>信贷资产管理资产清单列表
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
  name: 'rateImportAsset-list',
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
        dialogTitle: '信贷资产管理资产清单',
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
        dialogTitle: '信贷资产管理资产清单',
      },
      // 检索条件form表单
      arrList: [
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
            name: 'search_LIKE_deptCode',
            value: '',
            label: '金融机构代码',
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
            type: 'input',
            name: 'search_LIKE_conNum',
            value: '',
            label: '贷款合同编号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_dueNum',
            value: '',
            label: '借据号',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_matchState',
            value: '',
            label: '匹配状态',
            customOption: {
              已匹配: '已匹配',
              未匹配: '未匹配',
            },
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_pledgeStatus',
            value: '',
            label: '质押状态',
            customOption: {
              未质押: '未质押',
              已质押: '已质押',
            },
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_acctStatus',
            value: '',
            label: '贷款状态',
            customOption: {
              正常: '正常',
              '关闭（结清）': '关闭（结清）',
            },
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_guarMode',
            value: '',
            label: '担保方式',
            customOption: {
              信用: '信用',
              保证: '保证',
              质押: '质押',
              抵押: '抵押',
            },
            span: 6,
          },
        ],
      ],
      detailUrl: {
        url: this.$urlList.rateImportAsset.getValUrl,
        delUrl: this.$urlList.rateImportAsset.delete,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'rateImportAsset',
        tableHeader: [
          {
            // 详情demo
            field: 'entName',
            title: '贷款企业名称',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.detailFuns,
            },
          },
          {
            field: 'deptCode',
            title: '金融机构代码',
            width: 170,
            oper: {
              name: 'dic',
              type: 'deptCode',
            },
          },
          {
            field: 'unifyCreditCode',
            title: '统一社会信用代码',
            width: 170,
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
            field: 'conNum',
            title: '贷款合同编号',
            width: 130,
          },
          {
            field: 'dueNum',
            title: '借据号',
            width: 130,
          },
          {
            field: 'matchState',
            title: '匹配状态',
            width: 130,
          },
          {
            field: 'loanAmt',
            title: '贷款本金',
            width: 130,
          },
          {
            field: 'guarMode',
            title: '担保方式',
            width: 130,
          },
          {
            field: 'loanType',
            title: '贷款类型',
            width: 130,
          },
          {
            field: 'pledgeStatus',
            title: '质押状态',
            width: 130,
          },
          {
            field: 'acctStatus',
            title: '贷款状态',
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
