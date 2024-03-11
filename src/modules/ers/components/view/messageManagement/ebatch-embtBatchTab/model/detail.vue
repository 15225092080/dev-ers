<template>
  <div v-loading="loading"
       element-loading-text="处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-collapse ref="collapse"
                :collapseList="collapseList">
      <div class="btnBox"
           slot="msgTableBtn">
        <!-- <el-button class="collapseBtn submit_btn createExcel"
                   @click="createExcel"
                   :disabled="disabledBtn"
                   :class="{ active: !disabledBtn }">生成Excel报文</el-button> -->
        <el-button class="collapseBtn submit_btn downExcel"
                   @click="downLoadExcel"
                   :disabled="disabledBtn"
                   :class="{ active: !disabledBtn }">下载明文</el-button>
        <el-button class="collapseBtn submit_btn downExcelMi"
                   @click="downLoadExcelMi"
                   :disabled="disabledBtn"
                   :class="{ active: !disabledBtn }">下载密文</el-button>
      </div>
    </v-collapse>
    <!-- 基本信息段 -->
    <msg-detail v-if="msgDetail"
                ref="msgDetail"
                :paramDetail="paramDetail"
                :vis.sync="msgDetail"></msg-detail>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import MinXin from '@/common/script/mixin';
import msgDetail from './msgdetail';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vCollapse,
    msgDetail,
  },
  data() {
    return {
      loading: false,
      detailUrl: {
        url: this.$urlList.ebatch.getValUrl,
        delUrl: '',
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      //生成excel报文按钮可否点击
      disabledBtn: true,
      // 弹框相关
      paramDetail: {},
      msgDetail: false,
      collapseList: {
        //   activeNames:['elb'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/ebatch/embtBatchTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'ebatch',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.ebatch.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
          {
            name: 'emsg',
            title: '企业报文信息列表',
            showField: 'table',
            bind: 'msgTable',
            disabled: false,
          },
        ],
        msgTable: {
          // height:'default', //表格自适应高度
          bussName: 'emsg',
          where: { search_EQ_batchNum: this.$route.query.batchNum },
          tableHeader: [
            {
              // 详情demo
              field: 'txtFile',
              title: '报文名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetail,
              },
            },
            {
              field: 'infRecType',
              title: '报文类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'InfRecType',
              },
            },
            {
              field: 'endTime',
              title: '报文生成时间',
              width: 120,
            },
            {
              field: 'interErrAmount',
              title: '校验错误记录数',
              width: 120,
            },
            {
              field: 'msgAmount',
              title: '记录总数',
              width: 120,
            },
            {
              field: 'centerErrAmount',
              title: '反馈错误记录数',
              width: 120,
            },
            {
              field: 'msgStat',
              title: '报文状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'MSG_STAT',
              },
            },
          ],
        },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 点击生成excel报文按钮
    createExcel() {
      let url = this.$urlList.emsg.excelUrl;
      let msg = '报文中无数据，无需转换！';
      let flag = 2;
      this.downLoadZip(url, msg, flag);
    },
    // 点击下载明文按钮
    downLoadExcel() {
      let url = this.$urlList.emsg['export'];
      let msg = '报文中无数据，无需下载！';
      let flag = 1;
      this.downLoadZip(url, msg, flag, '3');
    },
    // 点击下载密文按钮
    downLoadExcelMi() {
      let url = this.$urlList.emsg['export'];
      let msg = '报文中无数据，无需下载！';
      let flag = 1;
      this.downLoadZip(url, msg, flag, '4');
    },
    //异步请求
    msgAjax(url) {
      this.loading = true;
      this.http.apiGet(url).then((res) => {
        if (res.flag == 0) {
          // 定时请求接口 setTimeout
          this.msgTimer(url);
        } else {
          // 关闭加载动画
          this.loading = false;
          // 下载
          this.common.downLoad(url + '&path=file', {});
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
    downLoadZip(url, msg, flag, msgStatus) {
      let form = { batchNum: this.$route.query.batchNum, txtFileStr: '' };
      let selectRow = this.$refs.collapse.$refs.msgTable[0].selectRow;
      let txtFileStr = [];
      let totalNum = 0;
      let urlParam = '';
      if (selectRow.length > 0) {
        if (selectRow.length == 1) {
          if (selectRow[0].msgAmount == 0) {
            // 记录总数为0的情况下
            this.$message({
              showClose: true,
              message: msg,
              type: 'warning',
              duration: '800',
            });
            return false;
          } else {
            form.txtFileStr = selectRow[0].txtFile;
          }
        } else {
          for (var i = 0; i < selectRow.length; i++) {
            if (selectRow[i].msgAmount == 0) {
              // 所选多条数据中记录总数都为0的情况下
              totalNum = totalNum + 1; // 为0的条数
              if (totalNum == selectRow.length) {
                this.$message({
                  showClose: true,
                  message: msg,
                  type: 'warning',
                  duration: '800',
                });
                return false;
              } else {
                txtFileStr.push(selectRow[i].txtFile);
              }
            } else {
              txtFileStr.push(selectRow[i].txtFile);
            }
          }
          form.txtFileStr = txtFileStr.join(',');
        }
        //this.common.downLoad(url, form);
        if (msgStatus) {
          urlParam =
            url +
            '?batchNum' +
            '=' +
            form.batchNum +
            '&txtFileStr' +
            '=' +
            form.txtFileStr +
            '&msgStatus=' +
            msgStatus;
        } else {
          urlParam =
            url +
            '?batchNum' +
            '=' +
            form.batchNum +
            '&txtFileStr' +
            '=' +
            form.txtFileStr;
        }
        this.http.apiGet(urlParam);
        if (flag == 1) {
          //下载明文密文
          this.msgAjax(
            this.$urlList.emsg.downloadUrlPath +
              '?batchNum' +
              '=' +
              form.batchNum
          );
        } else {
          //excel导出
          this.msgAjax(
            this.$urlList.emsg.excelUrlPath + '?batchNum' + '=' + form.batchNum
          );
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择1条以上进行操作！',
          type: 'warning',
          duration: '800',
        });
      }
    },
    showdetail(selectRow) {
      this.msgDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '报文详情',
        msgNum: selectRow.msgNum,
        url: null,
      };
    },
    init() {
      this.http
        .apiPost(this.$urlList.ebatch.getValUrl, this.$route.query)
        .then((res) => {
          if (res.batchPhase == '4') {
            //生成excel报文按钮和下载按钮置灰不能点击
            this.disabledBtn = true;
          } else {
            this.disabledBtn = false;
          }
        });

      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'beginTime',
            value: '',
            label: '批次开始时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'endTime',
            value: '',
            label: '批次结束时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'errTotal',
            value: '',
            label: '错误记录数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'fbErrTotal',
            value: '',
            label: '反馈错误数',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'batchPhase',
            value: '',
            param: 'BATCH_PHASE',
            label: '批次阶段',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'batchStat',
            value: '',
            param: 'BATCH_STAT',
            label: '批次状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '操作员',
            span: 12,
            disabled: true,
          },
        ],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
.btnBox {
  position: relative;
}
.collapseBtn {
  position: absolute;
  top: 0;
  right: 0;
  /* z-index: 9999; */
}
.createExcel {
  margin-right: 210px !important;
  height: 37px;
  /* line-height: 37px; */
}
.downExcel {
  margin-right: 120px !important;
  height: 37px;
}
.downExcelMi {
  margin-right: 30px !important;
  height: 37px;
}
</style>
