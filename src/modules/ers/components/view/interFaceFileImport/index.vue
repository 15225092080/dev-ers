<template>
  <div class="querypage"
       v-loading="loading"
       element-loading-text="处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       style="height: 95%;">
    <!-- <v-operation ref="filter" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "100px"></v-operation> -->
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <!-- <span>
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span> -->
        <ul class="icongroup">
          <li>
            <el-button type="primary"
                       @click="downLoad">
              <i class="DHCiconfont">&#xe6c0;</i>接口数据文件模板和说明下载
            </el-button>
          </li>
          <li>
            <upload-file :uploadData="uploadData"
                         ref="uploadfile"></upload-file>
          </li>
          <li>
            <el-button type="info"
                       @click="downErr"
                       :disabled="disabledBtn"
                       :class="{ active: !disabledBtn }">
              <i class="DHCiconfont">&#xe6c0;</i>下载错误记录
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <div class="tableName">
          接口数据文件导入信息列表
        </div>
        <table class="table tableClass">
          <thead>
            <tr>
              <th>数据文件类型</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>总数</th>
              <th>成功数</th>
              <th>错误数</th>
              <th>接口重复数</th>
              <th>无变化数据</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in tableData"
                :key="i">
              <td>{{idTypeDic['DATAFILETYPE'][item.datafileType]}}</td>
              <td>{{item.beginTime}}</td>
              <td>{{item.endTime}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.successNum}}</td>
              <td>{{item.errNum}}</td>
              <td>{{item.repeatNum}}</td>
              <td>{{item.unchangeNum}}</td>
              <td>{{idTypeDic['DATABATCH_STATE'][item.infoState]}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    //vEdit, vDetail
  },
  inject: ['reload'],
  data() {
    let uploadUrl =
      process.env.API_ROOT_ERS + this.$urlList.interFaceFileImport.uploadUrl;
    return {
      loading: false,
      tableData: '',
      uploadData: {
        // 按钮文字
        btnText: '接口数据文件上传',
        // url
        uploadUrl: uploadUrl,
        // 文件大小
        fileSize: 32,
        // 文件类型 xlsx|docx|image
        reg: 'xls|zip',
        // 成功回调
        successCallback: this.uploadCallback,
        // 失败回调
        errorCallback: this.errorUpload,
        // 开始上传的回调
        startCallback: this.startUpload,
      },
      secondshow: true,
      //下载错误记录按钮可否点击
      disabledBtn: true,
      batchNum: '',
      idTypeDic: {}, // 字典字段
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取字典方法
    getdataDic() {
      let type = ['DATABATCH_STATE', 'DATAFILETYPE'];
      type.forEach((item, index) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(
          sessionStorage.getItem(
            sessionStorage.getItem('systemId') + '_' + item
          )
        );
      });
    },
    uploadCallback(res) {
      if (Object.prototype.toString.call(res) === '[object String]') {
        res = JSON.parse(res);
      }
      this.loading = false;
      // 图片上传成功回调
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传成功', '消息', '确认', 'success')
          .then(() => {
            // window.reload();
          });
      } else {
        // 返回的是text类型，需要转为对象  上传成功回调
        if (res.code == '00000000') {
          this.common
            .MessageBoxalert(res.msg, '消息', '确认', 'success')
            .then(() => {
              this.getdataDic();
              this.init();
            });
        } else if (res.code == '00000002') {
          this.loading = true;
          this.msgAjax(this.$urlList.interFaceFileImport.processUrl);
        } else {
          this.common
            .MessageBoxalert(res.msg, '消息', '确认', 'error')
            .then(() => {});
        }
      }
    },
    //异步请求
    msgAjax(url) {
      this.http.apiGet(url).then((res) => {
        if (res.code == '00000002') {
          this.loading = true;
          // 定时请求接口 setTimeout
          this.msgTimer(this.$urlList.interFaceFileImport.processUrl);
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
              this.getdataDic();
              this.init();
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
    startUpload() {
      this.loading = true;
    },
    errorUpload(newFile) {
      this.loading = false;
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
    downLoad() {
      this.common.downLoad(this.$urlList.interFaceFileImport.downloadModel, {});
    },
    downErr() {
      this.common.downLoad(this.$urlList.interFaceFileImport.errExcelUrl, {
        batchNum: this.batchNum,
      });
    },
    init() {
      let totalNum = 0;
      this.http
        .apiPost(this.$urlList.interFaceFileImport.getPage)
        .then((res) => {
          this.tableData = res;
          this.batchNum = this.tableData[0].batchNum;
          for (var i = 0; i < res.length; i++) {
            if (res[i].errNum == '0') {
              totalNum = totalNum + 1; //为0的条数
            } else {
              this.disabledBtn = false;
            }
            if (totalNum == res.length) {
              //错误数都为0时下载错误记录按钮置灰不能点击
              this.disabledBtn = true;
            } else {
              this.disabledBtn = false;
            }
          }
        });
    },
  },
  created() {
    this.getdataDic();
    this.init();
  },
  mounted() {},
};
</script>

<style scoped="scoped">
.active {
  background-color: #3075c7 !important;
  color: #fff !important;
}
.tableName {
  border: 1px solid #ddd;
  text-align: center;
  height: 35px;
  line-height: 35px;
}
.tabletitle {
  border: 1px solid #ddd;
  border-top: none;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.tabletitle span {
  margin-left: 20px;
}
.span2 {
  margin-left: 260px !important;
}
.span3 {
  float: right;
  margin-right: 30px;
}
.table td,
.tableClass td {
  border: 1px solid #ccc;
}
.tableClass td {
  font-size: 12px;
  padding: 5px 10px;
}
.table td,
.table th {
  font-size: 12px;
  padding: 5px 10px;
}
.tableClass {
  border-radius: 10px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
  color: #666;
  margin: 10px 0;
  margin-top: 0px;
}
.tableClass thead th {
  font-size: 14px;
  color: #666;
  background-color: #ecedf2;
  height: 20px;
  line-height: 20px;
  text-align: left;
  padding: 5px 10px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  width: 50px;
}
.el-button--primary {
  height: 32px !important;
  line-height: 16px !important;
}
.el-button--info,
.el-button--info.is-disabled {
  height: 30px !important;
  line-height: 15px !important;
}
</style>
