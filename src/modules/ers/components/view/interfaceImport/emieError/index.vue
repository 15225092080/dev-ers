<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>接口表数据导入错误列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="success"
                       @click="exportBtn(exportUrl)">
              <i class="DHCiconfont">&#xe676;</i>导出excel
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <!-- 详情弹出框 -->
    <v-detail v-if="visible"
              ref="childDetails"
              :paramDetail="paramDetail"
              :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
import vDetail from './model/detail';
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vDetail,
  },
  inject: ['reload'],
  data() {
    return {
      exportUrl: this.$urlList.emieError.exportUrl,
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
      height: '',
      // 详情
      paramDetail: {
        title: '',
        dialogTitle: '接口导入错误信息',
      },
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_batchNum',
            value: '',
            label: '批次号',
            span: 8,
          },
          {
            type: 'daterange',
            name: 'search_GTE_LTE_errTime_DATE_RANGE',
            value: '',
            label: '出错日期',
            span: 8,
          },
        ],
      ],
      detailUrl: {
        isTime: 'search_GTE_LTE_errTime_DATE_RANGE',
        url: this.$urlList.emieError.getValUrl,
        // delUrl: this.$urlList.emieError.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'emieError',
        tableHeader: [
          {
            // 详情demo
            field: 'batchNum',
            title: '批次号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.detailFuns,
            },
          },
          {
            field: 'errType',
            title: '错误原因',
            width: 120,
            oper: {
              name: 'dic',
              type: 'ERR_TYPE',
            },
          },
          {
            field: 'deptCode',
            title: '所属机构',
            width: 120,
            oper: {
              name: 'dic',
              type: 'deptCode',
            },
          },
          {
            field: 'errTime',
            title: '出错日期',
            width: 120,
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
