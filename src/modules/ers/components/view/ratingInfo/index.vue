<template>
  <div class="querypage"
       v-loading="loading"
       element-loading-text="处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="140px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>企业评级信息记录列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="success"
                       @click="exportBtn(exportUrl)">
              <i class="DHCiconfont">&#xe676;</i>导出excel
            </el-button>
          </li>
          <li>
            <el-button type="warning"
                       plain
                       @click="scoreFun">
              <i class="DHCiconfont">&#xe6c3;</i>评分
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
  name: 'era-rateTab',
  data() {
    return {
      exportUrl: this.$urlList.era.exportUrl,
      loading: false,
      detailUrl: {
        // isTime: 'search_GTE_LTE_bussDate_DATE_RANGE',
        delUrl: this.$urlList.era['delete'],
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      selected_row: '',
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_custId',
            value: '',
            label: '客户号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_entName',
            value: '',
            label: '企业名称',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_entCertType',
            value: '',
            param: 'InfoIDType2',
            label: '企业身份标识类型',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_entCertNum',
            value: '',
            label: '企业身份标识号码',
            span: 6,
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
          //   defaultProps: {children: 'children',
          //     label: function (a, b) {
          //       return a.name
          //       ;
          //     }},
          //   name: 'search_IN_deptCode',
          //   value: '',
          //   label: '所属机构',
          //   span: 6
          // },
          // {type: 'daterange', name: 'search_GTE_LTE_bussDate_DATE_RANGE', value: '', label: '业务发生日期', span: 6}
        ],
      ],
      paramTable: {
        bussName: 'era',
        tableHeader: [
          {
            // 详情demo
            field: 'custId',
            title: '客户号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'entName',
            title: '企业名称',
            width: 120,
          },
          {
            field: 'entCertType',
            title: '企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'InfoIDType2',
            },
          },
          {
            field: 'entCertNum',
            title: '企业身份标识号码',
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
            field: 'score',
            title: '分数',
            width: 80,
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
      // this.$store.commit("SET_OPERATSTATE",'add');
      this.$store.dispatch('user/setOperatState', 'add');
      this.$router.push({ path: '/era-rateTab-edit' });
    },
    updateModal(row) {
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length == 1
      ) {
        row = this.$refs.dataTable.selectRow[0];
        // this.$store.commit("SET_OPERATSTATE",'edit');
        this.$store.dispatch('user/setOperatState', 'edit');
        this.$router.push({
          path: '/era-rateTab-edit',
          query: {
            custId: row.custId,
            deptCode: row.deptCode,
            //   ,
            //   search_EQ_custId: row["custId"]
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
      this.$store.dispatch('user/setOperatState', 'detail');
      this.$router.push({
        path: '/era-rateTab-detail',
        query: {
          custId: row.custId,
          //   ,
          //   search_EQ_custId: row["custId"]
        },
      });
    },
    // 评分方法
    scoreFun() {
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length == 1
      ) {
        let data1 = { custIds: this.$refs.dataTable.selectRow[0].custId };
        this.loading = true;
        this.http.apiPost(this.$urlList.era.batch, data1).then((res) => {
          setTimeout(() => {
            if (res) {
              if (res.code == '00000001') {
                // 关闭加载动画
                this.loading = false;
                // 弹窗提示语
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'warning',
                  duration: '5000',
                });
              } else if (res.code == '00000000') {
                this.common
                  .MessageBoxalert(res.msg, '消息', '确认', 'success')
                  .then(() => {
                    // 关闭加载动画
                    this.loading = false;
                    // 刷新表格数据
                    this.$refs.dataTable.getTableData();
                  });
              } else {
                this.msgAjax(this.$urlList.era.batchProcess);
              }
            }
          }, 5000);
        });
      } else if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length > 1
      ) {
        let paramData = [];
        for (let i = 0; i < this.$refs.dataTable.selectRow.length; i++) {
          paramData.push(this.$refs.dataTable.selectRow[i].custId);
        }
        console.log('paramData', paramData);
        this.loading = true;
        this.http
          .apiPost(this.$urlList.era.batch, { custIds: paramData })
          .then((res) => {
            setTimeout(() => {
              if (res) {
                if (res.code == '00000001') {
                  // 关闭加载动画
                  this.loading = false;
                  // 弹窗提示语
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'warning',
                    duration: '5000',
                  });
                } else if (res.code == '00000000') {
                  this.common
                    .MessageBoxalert(res.msg, '消息', '确认', 'success')
                    .then(() => {
                      // 关闭加载动画
                      this.loading = false;
                      // 刷新表格数据
                      this.$refs.dataTable.getTableData();
                    });
                } else {
                  this.msgAjax(this.$urlList.era.batchProcess);
                }
              }
            }, 5000);
          });
      } else {
        // 加载动画显示
        this.loading = true;
        this.http.apiPost(this.$urlList.era.batch, '').then((res) => {
          setTimeout(() => {
            if (res) {
              if (res.code == '00000001') {
                // 关闭加载动画
                this.loading = false;
                // 弹窗提示语
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'warning',
                  duration: '5000',
                });
              } else if (res.code == '00000000') {
                this.common
                  .MessageBoxalert(res.msg, '消息', '确认', 'success')
                  .then(() => {
                    // 关闭加载动画
                    this.loading = false;
                    // 刷新表格数据
                    this.$refs.dataTable.getTableData();
                  });
              } else {
                this.msgAjax(this.$urlList.era.batchProcess);
              }
            }
          }, 5000);
        });
      }
    },
    // 异步请求
    msgAjax(url) {
      this.http.apiGet(url).then((res) => {
        if (res.code == '00000002') {
          // 定时请求接口 setTimeout
          this.msgTimer(this.$urlList.era.batchProcess);
        } else if (res.code == '00000001') {
          // 关闭加载动画
          this.loading = false;
          // 弹窗提示语
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning',
            duration: '5000',
          });
        } else {
          this.common
            .MessageBoxalert(res.msg, '消息', '确认', 'success')
            .then(() => {
              // 关闭加载动画
              this.loading = false;
              // 刷新表格数据
              this.$refs.dataTable.getTableData();
            });
        }
      });
    },
    // 5秒定时请求接口刷新数据
    msgTimer(url) {
      let _this = this;
      setTimeout(function () {
        _this.msgAjax(url);
      }, 5000);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped="scoped">
</style>
