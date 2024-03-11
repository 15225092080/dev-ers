<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>企评待审批数据列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary"
                       @click="approvalFun">
              <i class="DHCiconfont">&#xe668;</i>审批
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
    <!-- <v-edit v-if="visibleEdit" :paramEdit="paramEdit" ref="child" :vis.sync="visibleEdit"></v-edit> -->
    <!-- 详情弹出框 -->
    <v-detail v-if="visible"
              ref="childDetails"
              :paramDetail="paramDetail"
              :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
//import vEdit from './model/edit';
import vDetail from './model/detail';
import MinXin from '@/common/script/mixin';
export default {
  name: '',
  mixins: [MinXin],
  components: {
    //vEdit,
    vDetail,
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '企评待审批数据信息',
      },

      // 编辑及新增弹框的显隐控制
      visibleEdit: false,
      visible: false,
      // 弹框种类名
      title: '',
      // 判断弹框为新增还是编辑
      operation: '',
      // 详情
      paramDetail: {
        title: '',
        dialogTitle: '企评待审批数据信息',
        data: {},
      },
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_operator',
            value: '',
            label: '企业名称',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_idType',
            value: '',
            param: 'InfoIDType2',
            label: '身份标识类型',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_idNum',
            value: '',
            label: '身份标识号码',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_bussType',
            value: '',
            param: 'BussType',
            label: '业务类型',
            span: 6,
          },
        ],
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
            name: 'search_LIKE_custId',
            value: '',
            label: '客户号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_bussNum',
            value: '',
            label: '业务号',
            span: 6,
          },
        ],
      ],
      detailUrl: {
        url: this.$urlList.approval.getValUrl,
        paramDataId: 'taskId', // 字段名
        id: 'taskId', // 获取表格数据的字段名
        resId: '', // 获取的id
        slotBtnFlag: '', //判断是从待审批页面还是已审批页面点击的详情
        approverLevel: '',
      },
      // 列表表头
      paramTable: {
        tableDataFun: this.tableDataFun,
        showButton: false,
        // rowClickFun:this.rowClickFun,
        bussName: 'approval',
        tableHeader: [
          {
            // 详情demo
            field: 'operator',
            title: '企业名称',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.detailFuns,
            },
          },
          {
            field: 'idType',
            title: '身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'InfoIDType2',
            },
          },
          {
            field: 'idNum',
            title: '身份标识号码',
            width: 120,
          },
          {
            field: 'bussNum',
            title: '业务号',
            width: 120,
          },
          {
            field: 'custId',
            title: '客户号',
            width: 120,
          },
          {
            field: 'bussType',
            title: '业务类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'BussType',
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
            field: 'approver',
            title: '操作员',
            width: 120,
            colShow: true,
          },
          {
            field: 'approver',
            title: '审批员',
            width: 120,
            colShow: true,
          },
          {
            field: 'approveState',
            title: '审批状态',
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
    detailFuns(row) {
      this.detailUrl.slotBtnFlag = 0;
      setTimeout(() => {
        this.visible = true;
        // this.paramDetail.title = '-详情页'; // 标题
        let id = this.detailUrl.id;
        this.detailUrl.resId = row[id];
        let paramData = {
          taskId: this.detailUrl.resId,
        };
        this.http.apiPost(this.detailUrl.url, paramData).then((res) => {
          this.$refs.childDetails.$refs.formItem.formItem = res;
        });
      }, 10);
    },
    approvalFun(row) {
      this.detailUrl.slotBtnFlag = 2;
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length == 1
      ) {
        row = this.$refs.dataTable.selectRow[0];
        setTimeout(() => {
          this.visible = true;
          let id = this.detailUrl.id;
          this.detailUrl.resId = row[id];
          this.detailUrl.approverLevel = row.approverLevel;
          let paramData = {
            taskId: this.detailUrl.resId,
          };
          this.http.apiPost(this.detailUrl.url, paramData).then((res) => {
            this.$refs.childDetails.$refs.formItem.formItem = res;
          });
        }, 10);
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条进行操作',
          type: 'warning',
          duration: '800',
        });
      }
    },
    // rowClickFun(row){
    //   console.log(row)
    //   this.visibleEdit = true;
    //   this.paramEdit.data = row;
    //   this.paramEdit.close = this.close;
    // },
    close() {
      this.visibleEdit = false;
    },
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
    },
    tableDataFun() {
      if (this.$refs.dataTable.tableData[0]) {
        if (this.$refs.dataTable.tableData[0].approverLevel == '1') {
          console.log(111);
          this.paramTable.tableHeader['7'].colShow = false;
          this.paramTable.tableHeader['8'].colShow = true;
        } else {
          console.log(222);
          this.paramTable.tableHeader['7'].colShow = true;
          this.paramTable.tableHeader['8'].colShow = false;
        }
      }
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
