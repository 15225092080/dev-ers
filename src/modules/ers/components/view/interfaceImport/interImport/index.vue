<template>
  <div class="querypage"
       v-loading="loading"
       element-loading-text="处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- <v-operation ref="filter" v-bind:arrList="arrList"></v-operation> -->
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe6cf;</i>接口表数据导入信息列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary"
                       plain
                       @click="importFun">
              <i class="
                       DHCiconfont">&#xe6c3;</i>接口表数据导入
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
    <router-view></router-view>
    <!-- <el-dialog
        :visible.sync="visible"
        width="20%"
        :modal="true"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
        custom-class="model-dialog el-dialog-l upload-loading"
    >
        <span slot="title" class="clearfix">
            <span class="dialog-title">提示</span>
            <span class="dialog-title-bg"></span>
        </span>
        <img src="@/assets/images/common/loading.gif" style="margin-left:30px;margin-right:10px;"/>
        <span>处理中</span>
        <img src="@/assets/images/common/loading2.gif"/>
    </el-dialog> -->
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  data() {
    return {
      //visible: false,
      loading: false,
      detailUrl: {
        delUrl: '',
        paramDataId: 'id', // 字段名
        id: 'batchNum', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      selected_row: '',
      arrList: [],
      paramTable: {
        selectionShow: true,
        bussName: 'interImport',
        tableHeader: [
          {
            // 详情demo
            field: 'batchNum',
            title: '批次号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'beginTime',
            title: '批次生成时间',
            width: 120,
          },
          {
            field: 'totalNum',
            title: '总数',
            width: 120,
          },
          {
            field: 'successNum',
            title: '成功数',
            width: 120,
          },
          {
            field: 'errNum',
            title: '错误数',
            width: 120,
          },
          {
            field: 'repeatNum',
            title: '接口重复数',
            width: 120,
          },
          {
            field: 'unchangeNum',
            title: '无变化数据',
            width: 120,
          },
          {
            field: 'batchStat',
            title: '批次状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'DATABATCH_STATE',
            },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    // 接口导入方法
    importFun() {
      // 加载动画显示
      this.loading = true;
      this.http.apiPost(this.$urlList.interImport.importUrl, '').then((res) => {
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
              this.msgAjax(this.$urlList.interImport.processUrl);
            }
          }
        }, 5000);
      });
    },
    //异步请求
    msgAjax(url) {
      this.http.apiGet(url).then((res) => {
        if (res.code == '00000002') {
          // 定时请求接口 setTimeout
          this.msgTimer(this.$urlList.interImport.processUrl);
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
    // 详情页
    showdetail(row) {
      this.$router.push({
        path: '/interImport-detail',
        query: {
          batchNum: row.batchNum,
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

