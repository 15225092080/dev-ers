<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="160px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe6cf;</i>企业信贷资产信息记录列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="success"
                       @click="exportBtn(exportUrl)">
              <i class="DHCiconfont">&#xe676;</i>导出excel
            </el-button>
          </li>
          <li>
            <el-button type="primary"
                       plain
                       @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary"
                       @click="updateModal">
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
                 tHeight="calc(100vh - 430px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <router-view></router-view>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  name: 'creditAssets',
  data() {
    return {
      exportUrl: this.$urlList.erj.exportUrl,
      detailUrl: {
        // isTime: 'search_GTE_LTE_bussDate_DATE_RANGE',
        delUrl: this.$urlList.erj['delete'],
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      selected_row: '',
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_bussNum',
            value: '',
            label: '业务号',
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
            type: 'input',
            name: 'search_LIKE_name',
            value: '',
            label: '借款企业名称',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_idType',
            value: '',
            param: 'InfoIDType2',
            label: '借款企业身份标识类型',
            span: 6,
          },
        ],
        [
          {
            type: 'input',
            name: 'search_LIKE_idNum',
            value: '',
            label: '借款企业身份标识号码',
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
            name: 'search_IN_deptCode',
            value: '',
            label: '内部机构代码',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_dataState',
            value: '',
            param: 'DATA_STATE',
            label: '数据状态',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_reportState',
            value: '',
            param: 'REPORT_STATE',
            label: '报送状态',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_noReport',
            value: '',
            param: 'NO_REPORT',
            label: '免报标志',
            span: 6,
          },
          // {
          //   type: 'tree',
          //   treeurl: this.$urlList.common.orgTree,
          //   treetitle: '机构树',
          //   defaultProps: {
          //     children: 'children',
          //     label: function (a, b) {
          //       return a.name;
          //     },
          //   },
          //   name: 'search_IN_deptCode',
          //   value: '',
          //   label: '所属机构',
          //   span: 6,
          // },
          // {
          //   type: 'daterange',
          //   name: 'search_GTE_LTE_bussDate_DATE_RANGE',
          //   value: '',
          //   label: '业务发生日期',
          //   span: 6,
          // },
        ],
      ],
      paramTable: {
        bussName: 'erj',
        tableHeader: [
          {
            // 详情demo
            field: 'bussNum',
            title: '业务号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'dueNum',
            title: '借据号',
            width: 120,
          },
          {
            field: 'name',
            title: '借款企业名称',
            width: 120,
          },
          {
            field: 'idType',
            title: '借款企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'InfoIDType2',
            },
          },
          {
            field: 'idNum',
            title: '借款企业身份标识号码',
            width: 120,
          },
          {
            field: 'deptCode',
            title: '内部机构代码',
            width: 120,
            oper: {
              name: 'dic',
              type: 'deptCode',
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
          {
            field: 'auditingState',
            title: '报送状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'AUDITING_STATE',
            },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    addModal() {
      // 暂时写到这里，日后新增编辑详情这种跳转或者弹出可能做成可配置
      this.$store.dispatch('user/setOperatState', 'add');
      // this.$store.commit("SET_OPERsetOperatStateATSTATE",'add');
      this.$router.push({ path: '/erj-rateTab-edit' });
    },
    updateModal(row) {
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length == 1
      ) {
        row = this.$refs.dataTable.selectRow[0];
        this.$store.dispatch('user/setOperatState', 'edit');
        // this.$store.commit("SET_OPERATSTATE",'edit');
        this.$router.push({
          path: '/erj-rateTab-edit',
          query: {
            bussNum: row.bussNum,
            //   ,
            //   search_EQ_bussNum: row["bussNum"]
          },
        });
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条进行操作',
          type: 'warning',
          duration: '800',
        });
      }
    },
    showdetail(row) {
      this.$router.push({
        path: '/erj-rateTab-detail',
        query: {
          bussNum: row.bussNum,
          // search_EQ_bussNum: row["bussNum"]
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

