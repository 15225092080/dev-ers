<template>
  <div class="querypage"
       v-loading="loading"
       element-loading-text="处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="120px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe6cf;</i>报文信息
        </span>
        <ul class="icongroup">
          <!-- <li>
            <el-button type="primary" @click="submitFun" class="submitFun">报送
            </el-button>
          </li>
          <li>
            <el-button type="primary" @click="autoBackFun" class="autoBackFun">
              自动反馈导入
            </el-button>
          </li> -->
          <li>
            <!-- <el-button type="primary" plain @click="feedbackFun"> -->
            <upload-file :uploadData="uploadData"
                         ref="uploadfile"></upload-file>
            <!-- </el-button> -->
          </li>
          <li>
            <el-button type="danger"
                       @click="revokeFun"
                       class="revokeFun">
              <i class="DHCiconfont">&#xe6a3;</i>撤销
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
    <v-revoke v-if="visibleEdit"
              :paramRevoke="paramRevoke"
              ref="child"
              :vis.sync="visibleEdit"></v-revoke>
    <v-submit v-if="visibleSub"
              :paramSubmit="paramSubmit"
              ref="child"
              :vis.sync="visibleSub"></v-submit>
    <v-back v-if="visibleBack"
            :paramBack="paramBack"
            ref="child"
            :vis.sync="visibleBack"></v-back>
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
import vRevoke from './model/revoke';
import vSubmit from './model/autoSubmit';
import vBack from './model/autoBack';
export default {
  mixins: [MinXin],
  components: {
    vRevoke,
    vSubmit,
    vBack,
  },
  inject: ['reload'],
  data() {
    let uploadUrl = process.env.API_ROOT_ERS + this.$urlList.efb['import'];
    return {
      paramRevoke: {
        title: '',
        dialogTitle: '撤销报文列表',
      },
      paramSubmit: {
        title: '',
        dialogTitle: '报送文件列表',
      },
      paramBack: {
        title: '',
        dialogTitle: '导入反馈报文列表',
      },
      visible: false,
      loading: false,
      visibleEdit: false,
      visibleSub: false,
      visibleBack: false,
      uploadData: {
        // 按钮文字
        btnText: '导入反馈',
        // url
        uploadUrl: uploadUrl,
        // 文件大小
        fileSize: 2,
        // 文件类型 xlsx|docx|image
        reg: '.',
        // 成功回调
        successCallback: this.uploadCallback,
        // 失败回调
        errorCallback: this.errorUpload,
        // 开始上传的回调
        startCallback: this.startUpload,
      },
      detailUrl: {
        isTime: 'search_GTE_LTE_endTime_DATE_RANGE',
        delUrl: '',
        paramDataId: 'id', // 字段名
        id: 'userId', // 获取表格数据的字段名
        resId: '', // 获取的id
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
            type: 'daterange',
            name: 'search_GTE_LTE_endTime_DATE_RANGE',
            value: '',
            label: '批次生成日期',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_batchStat',
            value: '',
            param: 'BATCH_STAT',
            label: '批次状态',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_batchType',
            value: '',
            param: 'BATCH_TYPE',
            label: '批次类型',
            span: 6,
          },
        ],
      ],
      paramTable: {
        bussName: 'ebatch',
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
            field: 'endTime',
            title: '批次生成时间',
            width: 120,
          },
          {
            field: 'msgNum',
            title: '报文数',
            width: 120,
          },
          {
            field: 'errTotal',
            title: '错误记录数',
            width: 120,
          },
          {
            field: 'fbErrTotal',
            title: '反馈错误数',
            width: 120,
          },
          {
            field: 'batchType',
            title: '批次类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'BATCH_TYPE',
            },
          },
          {
            field: 'batchPhase',
            title: '批次阶段',
            width: 120,
            oper: {
              name: 'dic',
              type: 'BATCH_PHASE',
            },
          },
          {
            field: 'batchStat',
            title: '批次状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'BATCH_STAT',
              styleColor: '#fff',
              styleBg: {
                0: '#d697ed',
                1: '#22C026',
                2: '#E77D03',
                3: '#f55b40',
              },
            },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    uploadCallback(res) {
      let url = this.$urlList.efb['efdetail'];
      if (typeof res == 'string') {
        res = JSON.parse(res);
      }
      this.$refs.uploadfile.visible = false;
      // 图片上传成功回调
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传成功', '消息', '确认', 'success')
          .then(() => {
            this.$refs.dataTable.getTableData();
          });
      } else {
        // 返回的是text类型，需要转为对象  上传成功回调
        if (res.flag != 0) {
          this.common
            .MessageBoxalert(res.data, '消息', '确认', 'success')
            .then(() => {
              this.$refs.dataTable.getTableData();
            });
        } else {
          this.$refs.uploadfile.visible = true;
          this.msgAjax(url);
        }
      }
    },
    startUpload() {
      this.$refs.uploadfile.visible = true;
    },
    errorUpload(newFile) {
      this.$refs.uploadfile.visible = false;
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传失败', '消息', '确认', 'error')
          .then(() => {});
      } else {
        // this.common.submitMsg(newFile.response);
        this.common
          .MessageBoxalert(newFile.response, '消息', '确认', 'error')
          .then(() => {});
      }
    },
    //异步请求
    msgAjax(url) {
      this.http.apiGet(url).then((res) => {
        if (res.flag != 0) {
          this.$refs.uploadfile.visible = true;
          let url = this.$urlList.efb['efdetail'];
          // 定时请求接口 setTimeout
          this.msgTimer(url);
        } else {
          this.$refs.uploadfile.visible = false;
          this.common
            .MessageBoxalert(res.data, '消息', '确认', 'success')
            .then(() => {
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
    // 报送方法
    submitFun(row) {
      let param;
      //勾选一条传该条数据的批次号，勾选多条时传逗号分隔的字符串，不勾选就传空
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length > 0
      ) {
        let data = this.$refs.dataTable.selectRow;
        let idArr = [];
        if (this.$refs.dataTable.selectRow.length == 1) {
          param = { batchNum: this.$refs.dataTable.selectRow[0].batchNum };
        } else {
          for (var i = 0; i < data.length; i++) {
            idArr.push(data[i].batchNum);
          }
          param = { batchNum: idArr.join(',') };
        }
      } else {
        param = {};
      }
      // 加载动画显示
      this.loading = true;

      this.http.apiPost(this.$urlList.ebatch.uploadUrl, param).then((res) => {
        setTimeout(() => {
          // 关闭加载动画
          this.loading = false;
          if (res.code == '00000001' || res.code == '00000002') {
            // 弹窗提示语
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'warning',
              duration: '5000',
            });
          } else {
            if (res) {
              if (res.length == 0) {
                this.paramSubmit.tableData = [];
                this.visibleSub = true;
              } else {
                this.paramSubmit.tableData = res;
                this.visibleSub = true;
              }
            }
          }
        }, 5000);
      });
    },
    // 自动反馈导入方法
    autoBackFun() {
      let param = {};
      // 加载动画显示
      this.loading = true;
      this.http.apiPost(this.$urlList.ebatch.backUrl, param).then((res) => {
        setTimeout(() => {
          // 关闭加载动画
          this.loading = false;
          if (res.code == '00000001' || res.code == '00000002') {
            // 弹窗提示语
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'warning',
              duration: '5000',
            });
          } else {
            if (res) {
              if (res.length == 0) {
                this.paramBack.tableData = [];
                this.visibleBack = true;
              } else {
                this.paramBack.tableData = res;
                this.visibleBack = true;
              }
            }
          }
        }, 5000);
      });
    },
    // 撤销
    revokeFun(row) {
      // let res = [{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011934000010.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"340","interErrAmount":0,"msgAmount":1,"msgNum":"10000000000000_20200119007340001","msgStat":"42","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011934000010.txt","useTime":1048},{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011961000010.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"610","interErrAmount":1,"msgAmount":1,"msgNum":"10000000000000_20200119007610001","msgStat":"41","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011961000010.txt","useTime":1097},{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011931000020.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"310","interErrAmount":1,"msgAmount":0,"msgNum":"10000000000000_20200119007310001","msgStat":"41","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011931000020.txt","useTime":1032},{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011962000010.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"620","interErrAmount":0,"msgAmount":1,"msgNum":"10000000000000_20200119007620001","msgStat":"41","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011962000010.txt","useTime":1110},{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011942000010.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"420","interErrAmount":1,"msgAmount":0,"msgNum":"10000000000000_20200119007420001","msgStat":"41","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011942000010.txt","useTime":2132},{"batchNum":"10000000000000_20200119007","beginTime":"2020-01-19","centerErrAmount":null,"deptCode":"10000000000000","encFile":"999999999999992020011944000010.enc","endTime":"2020-01-19","fbEncFile":null,"fbTime":null,"fbTxtFile":null,"infRecType":"440","interErrAmount":1,"msgAmount":0,"msgNum":"10000000000000_20200119007440001","msgStat":"41","operator":"zt","orgEntity":"10000000000000","txtFile":"999999999999992020011944000010.txt","useTime":1083}]
      // this.paramRevoke.tableData = res;
      // this.visibleEdit = true;
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length == 1
      ) {
        let data = this.$refs.dataTable.selectRow;
        if (
          (data[0].batchPhase == 5 && data[0].batchStat == 3) ||
          (data[0].batchPhase == 2 && data[0].batchStat != 0) ||
          (data[0].batchPhase == 4 && data[0].batchStat == 3) ||
          (data[0].batchPhase == 4 && data[0].batchStat == 2)
        ) {
          // 加载动画显示
          this.loading = true;
          let param = { batchNum: this.$refs.dataTable.selectRow[0].batchNum };
          this.http
            .apiPost(this.$urlList.ebatch.revokeUrl, param)
            .then((res) => {
              setTimeout(() => {
                // 关闭加载动画
                this.loading = false;
                if (res) {
                  if (res.length == 0) {
                    // 弹窗提示语
                    // this.$message({
                    //   showClose: true,
                    //   message: "无报文数据显示",
                    //   type: 'warning',
                    //   duration: '5000'
                    // });
                    this.paramRevoke.tableData = [];
                    this.visibleEdit = true;
                  } else {
                    this.paramRevoke.tableData = res;
                    this.visibleEdit = true;
                  }
                }
              }, 5000);
            });
        } else {
          this.common
            .MessageBoxalert(
              '该场景不可进行撤销操作！',
              '消息',
              '确认',
              'error'
            )
            .then(() => {});
        }
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
        path: '/ebatch-embtBatchTab-detail',
        query: {
          batchNum: row.batchNum,
        },
      });
    },
  },
  created() {
    let uploadUrl = process.env.API_ROOT_ERS + this.$urlList.efb['import'];

    console.log('uploadUrl', uploadUrl);
  },
  mounted() {},
};
</script>
<style scoped="scoped">
.revokeFun,
.submitFun,
.autoBackFun {
  height: 32px;
}
</style>

