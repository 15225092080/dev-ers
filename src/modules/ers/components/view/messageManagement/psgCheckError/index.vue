<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe6cf;</i>内部及反馈错误信息列表
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
                 tHeight="calc(100vh - 430px)"
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
import MinXin from '@/common/script/mixin';
import vDetail from './model/detail';
export default {
  mixins: [MinXin],
  inject: ['reload'],
  data() {
    return {
      exportUrl: this.$urlList.psgCheckError.exportUrl,
      detailUrl: {
        isTime: 'search_GTE_LTE_errTime_DATE_RANGE',
        url: this.$urlList.psgCheckError.getValUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      visible: false,
      paramDetail: {
        title: '内部错误信息',
        dialogTitle: '内部错误信息',
      },
      selected_row: '',
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_batchNum',
            value: '',
            label: '批次号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_msgNum',
            value: '',
            label: '报文号',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_errStage',
            value: '',
            param: 'ERR_STAGE',
            label: '错误类型',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_errStat',
            value: '',
            param: 'ERR_STAT',
            label: '处理状态',
            span: 6,
          },
          {
            type: 'daterange',
            name: 'search_GTE_LTE_errTime_DATE_RANGE',
            value: '',
            label: '出错日期',
            span: 6,
          },
        ],
      ],
      paramTable: {
        bussName: 'psgCheckError',
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
            field: 'name',
            title: '企业名称',
            width: 120,
          },
          {
            field: 'idType',
            title: '企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'InfoIDType2',
            },
          },
          {
            field: 'idNum',
            title: '企业身份标识号码',
            width: 120,
          },
          {
            field: 'custId',
            title: '客户号',
            width: 120,
          },
          {
            field: 'bussNum',
            title: '业务号',
            width: 120,
          },
          {
            field: 'errStage',
            title: '错误类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'ERR_STAGE',
            },
          },
          {
            field: 'errStat',
            title: '处理状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'ERR_STAT',
            },
          },
        ],
      },
    };
  },
  components: {
    vDetail,
  },
  watch: {},
  methods: {
    addModal() {
      // 暂时写到这里，日后新增编辑详情这种跳转或者弹出可能做成可配置
      this.$store.dispatch('user/setOperatState', 'add');
      // this.$store.commit("SET_OPERsetOperatStateATSTATE",'add');
      this.$router.push({ path: '/elb-loanTab-edit' });
    },
    updateModal(row) {
      row = this.$refs.dataTable.selectRow[0];

      this.$store.dispatch('user/setOperatState', 'edit');
      // this.$store.commit("SET_OPERATSTATE",'edit');
      this.$router.push({
        path: '/elb-loanTab-edit',
        query: {
          bussNum: row.bussNum,
          search_EQ_bussNum: row.bussNum,
        },
      });
    },
    showdetail(row) {
      this.$router.push({
        path: '/elb-loanTab-detail',
        query: {
          search_EQ_bussNum: row.bussNum,
        },
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped="scoped">
</style>

