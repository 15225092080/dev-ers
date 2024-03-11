<template>
  <div>
    <h4><i class="DHCiconfont">&#xe6cf;</i>注意事项</h4>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <p>
          此功能用于批量修改账户标识信息，请谨慎操作。标识变更前，需确保所有报文均已反馈成功，错误数据处理完毕。标识变更整个流程中不要做生成报文等操作。需确保所有标识变更全部正确加载，否则会引起数据不一致情况。
        </p>
        <p>标识变更数据文件模板及说明<el-button id="export"
                     class="elButton"
                     @click="download(downUrl)">下载</el-button>
        </p>
      </div>
      <div style="height: 400px;"
           class="aaaa">
        <ul class="stepUl">
          <li class="stepLi">
            <i class="stepIcon iconSelected">1</i>
            <div class="stepContent">
              上传标识变更列表：严格按照模板格式提供标识变更列表。<br>记录总数：<span>{{nums.recordNum}}</span>
            </div>
            <div class="operateBtn">
              <!-- <el-upload
                class="upload-demo"
                action="entRatingWeb/idcagsinf/upload"
                accept=".xlsx">
                <el-button class="elButton" id="upload">上传</el-button>
              </el-upload> -->
              <upload-file :uploadData="uploadData"
                           ref="uploadfile"></upload-file>
              <i class="el-icon-check"
                 v-if="showOk.showOk1"
                 style="position:absolute;left:300px;top:5px;"></i>
            </div>
          </li>
          <li class="stepLi">
            <i class="stepIcon"
               :class="{'iconSelected':handleStage >= 2}">2</i>
            <div class="stepContent">
              预校验：对标识变更列表进行预校验，全部通过校验后才可生成标识变更报文。<br>有错误数据时可重新上传正确的标识变更列表重新校验。<br>记录总数：<span>{{nums.totalRecNum}}</span>&nbsp;校验成功数：<span>{{nums.successNum}}</span>&nbsp;校验失败数：<span>{{nums.errNum}}</span>
            </div>
            <div class="operateBtn">
              <el-button class="elButton"
                         id="preValidate"
                         @click="preValidate"
                         :disabled="btnDisabled.preValidates"
                         :class="{'bgClass':btnDisabled.preValidates}">标识变更数据预校验</el-button>
              <el-button class="elButton"
                         id="errExport"
                         :disabled="btnDisabled.downloadError"
                         :class="{'bgClass':btnDisabled.downloadError}"
                         @click="download(preDownUrl)">预校验错误下载</el-button>
              <i class="el-icon-check"
                 v-if="showOk.showOk2 || handleStage > 2"
                 style="position: absolute;left:300px;top:4px;"></i>
              <i class="el-icon-close"
                 v-if="showOk.showClose"
                 style="position: absolute;left:300px;top:4px;"></i>
            </div>
          </li>
          <li class="stepLi">
            <i class="stepIcon"
               :class="{'iconSelected':handleStage >= 3}">3</i>
            <div class="stepContent">
              生成标识变更报文：标识变更列表中存在错误时，无法生成变更报文。生成标识变更报文后，<br>变更数据在报送系统中已生效，需确保所有变更成功加载。在此过程中，不要做生成报文等操作。<br>直接变更数：从未报送，可直接变更；生成报文数：已报送，需使用标识变更报文进行变更。<br>直接变更数：<span>{{nums.changesNum}}</span>&nbsp;生成报文数：<span>{{nums.msgNum}}</span>&nbsp;错误记录数：<span>{{nums.errRecNum}}</span>
            </div>
            <div class="operateBtn">
              <el-button class="elButton"
                         id="createReport"
                         @click="createReportClick"
                         :class="{'bgClass':btnDisabled.createReport}"
                         :disabled="btnDisabled.createReport">生成标识变更报文</el-button>
              <i class="el-icon-check"
                 v-if="showOk.showOk3 || handleStage > 3"
                 style="position: absolute;left:300px;top:4px;"></i>
            </div>
          </li>
          <li class="stepLi">
            <i class="stepIcon"
               :class="{'iconSelected':handleStage >= 4}">4</i>
            <div class="stepContent">
              标识变更报文报送：<br>将标识变更报文报送至征信中心。
            </div>
            <div class="operateBtn">
              <el-button class="elButton"
                         id="reportDown"
                         @click="downloadRpt(reportDownUrl)"
                         :class="{'bgClass':btnDisabled.reportDw}"
                         :disabled="btnDisabled.reportDw">标识变更报文下载</el-button>
              <el-button class="elButton btnWidth"
                         disabled>标识变更报文报送</el-button>
              <i class="el-icon-check"
                 v-if="showOk.showOk4 || handleStage > 4"
                 style="position: absolute;left:300px;top:4px;"></i>
            </div>
          </li>
          <li class="stepLi">
            <i class="stepIcon"
               :class="{'iconSelected':handleStage >= 5}">5</i>
            <div class="stepContent">
              导入反馈：导入标识变更反馈报文，确认报送情况。如果反馈报文中有错误，<br>需处理完毕后，再做其他操作。<br>反馈错误数：<span>{{nums.backErrNum}}</span>
            </div>
            <div class="operateBtn">
              <!-- <el-button class="elButton btnWidth" id="feedBack" disabled>标识变更报文反馈导入</el-button> -->
              <upload-file :uploadData="changeImport"
                           ref="changeImport"></upload-file>
              <el-button class="elButton"
                         id="feedError"
                         @click="download(feedDownUrl)"
                         :class="{'bgClass':btnDisabled.feedError}"
                         :disabled="btnDisabled.feedError">反馈错误下载</el-button>
              <i class="el-icon-check"
                 v-if="showOk.showOk5"
                 style="position: absolute;left:300px;top:4px;"></i>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  data() {
    this.uploadUrl =
      process.env.API_ROOT_ERS + this.$urlList.idcagsinf.uploadUrl;
    this.feedUrl = process.env.API_ROOT_ERS + this.$urlList.idcagsinf.feedUrl;
    return {
      uploadUrl: '',
      visible: false,
      uploadData: {
        // 按钮文字
        btnText: '上传',
        // url
        uploadUrl: this.uploadUrl,
        // 文件大小
        fileSize: 2,
        // 文件类型 xlsx|docx|image
        reg: 'xlsx',
        // 成功回调
        successCallback: this.uploadCallback,
        // 失败回调
        errorCallback: this.errorUpload,
        // 开始上传的回调
        startCallback: this.startUpload,
        // 是否禁用
        uploadDisabled: false,
        fileId: 'uploadId',
      },
      changeImport: {
        // 按钮文字
        btnText: '标识变更报文反馈导入',
        // url
        uploadUrl: this.feedUrl,
        // 文件大小
        fileSize: 2,
        // 文件类型 xlsx|docx|image
        reg: 'txt|enc',
        // 成功回调
        successCallback: this.changeSuccess,
        // 失败回调
        errorCallback: this.changeError,
        // 开始上传的回调
        startCallback: this.changeStart,
        // 是否禁用
        uploadDisabled: true,
        fileId: 'changeImportId',
      },
      btnDisabled: {
        // 预校验错误下载是否置灰
        downloadError: true,
        createReport: true,
        reportDw: true,
        feedError: true,
        preValidates: false,
      },
      // 对号叉号隐藏标识
      showOk: {
        showOk1: false,
        showOk2: false,
        showOk3: false,
        showOk4: false,
        showOk5: false,
        showClose: false,
      },
      nums: {
        // 上传记录总数
        recordNum: '',
        // 预校验记录总数
        totalRecNum: '',
        // 直接变更数
        changesNum: '',
        // 校验失败数
        errNum: '',
        // 校验成功数
        successNum: '',
        // 错误记录数
        errRecNum: '',
        // 生成报文数
        msgNum: '',
        // 反馈错误数
        backErrNum: '',
      },
      // 操作步数
      handleStage: 1,
      // 模板下载路径
      downUrl: this.$urlList.idcagsinf.modelDwUrl,
      // 预校验错误下载路径
      preDownUrl: this.$urlList.idcagsinf.errExcelUrl,
      // 标识变更报文下载路径
      reportDownUrl: this.$urlList.idcagsinf.downloadReportUrl,
      // 反馈错误下载路径
      feedDownUrl: this.$urlList.idcagsinf.feedErrorUrl,
      // 上传路径
      uploadUrl: this.uploadUrl,
    };
  },
  watch: {},
  methods: {
    // 上传成功回调方法
    uploadCallback(res) {
      // res = JSON.parse(res);
      // 关闭加载动画
      this.$refs.uploadfile.visible = false;
      // 图片上传成功回调
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传成功', '消息', '确认', 'success')
          .then(() => {
            // window.reload();
          });
      } else {
        // 返回的是text类型，需要转为对象  上传成功回调
        if (res.rescode == '000') {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'success')
            .then(() => {
              // 点击完上传按钮后，其他数值都置为0
              for (let k in this.nums) {
                this.nums[k] = 0;
              }
              // 所有对号叉号隐藏
              for (let i in this.showOk) {
                this.showOk[i] = 0;
              }
              // 如果预校验错误下载、反馈错误下载按钮是可点击状态则让其置灰不可点击
              this.btnDisabled.downloadError = true;
              this.btnDisabled.createReport = true;
              this.btnDisabled.feedError = true;
              // 记录总数赋值
              this.nums.recordNum = res.sum;
              // 表示这步完成的对号显示
              this.showOk.showOk1 = true;
              // 使得该步和下一步步骤条变亮  添加类名iconSelected
              this.handleStage = 2;
            });
        } else {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'error')
            .then(() => {
              // 记录总数赋值
              this.nums.recordNum = res.sum;
            });
        }
      }
    },
    //
    startUpload() {
      this.$refs.uploadfile.visible = true;
    },
    // 标识变更报文反馈导入上传成功回调方法
    changeSuccess(res) {
      // res = JSON.parse(res);
      // 关闭加载动画
      this.$refs.changeImport.visible = false;
      // 图片上传成功回调
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传成功', '消息', '确认', 'success')
          .then(() => {
            // window.reload();
          });
      } else {
        // 返回的是text类型，需要转为对象  上传成功回调
        if (res.rescode == '000') {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'success')
            .then(() => {
              this.handleStage = 5;
              //上传和预校验按钮可点击
              this.btnDisabled.preValidates = false;
              this.uploadData.uploadDisabled = false;
              this.showOk.showOk5 = true;
              //报文下载按钮不可点击
              this.btnDisabled.reportDw = true;
              //第五步反馈导入按钮不可点击
              this.changeImport.uploadDisabled = true;
              // 反馈错误数赋值
              this.nums.backErrNum = res.feedbakfail;
              // 如果没有错误数则反馈错误下载按钮不能点击
              if (res.feedbakfail && res.feedbakfail != '0') {
                this.btnDisabled.feedError = false;
              } else {
                this.btnDisabled.feedError = true;
              }
            });
        } else if (res.rescode == '006') {
          //提示信息为“操作成功，此报文中仍有报文未反馈”，弹框要用成功符号弹框
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'success')
            .then(() => {
              // 反馈错误数赋值
              this.nums.backErrNum = res.feedbakfail;
              //this.nums.recordNum = res.sum;
              if (res.feedbakfail != '0') {
                this.btnDisabled.feedError = false;
              } else {
                this.btnDisabled.feedError = true;
              }
            });
        } else {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'error')
            .then(() => {
              // 反馈错误数赋值
              this.nums.backErrNum = res.feedbakfail;
              //this.nums.recordNum = res.sum;
              if (res.feedbakfail != '0') {
                this.btnDisabled.feedError = false;
              } else {
                this.btnDisabled.feedError = true;
              }
            });
        }
      }
    },
    // 标识变更报文反馈导入上传开始
    changeStart() {
      this.$refs.changeImport.visible = true;
    },
    // 上传错误回调
    errorUpload(newFile) {
      this.$refs.uploadfile.visible = false;
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传失败', '消息', '确认', 'error')
          .then(() => {});
      } else {
        this.common.submitMsg(newFile.response);
        this.common
          .MessageBoxalert(newFile.response, '消息', '确认', 'error')
          .then(() => {});
      }
    },
    // 标识变更报文反馈导入错误回调
    changeError(newFile) {
      this.$refs.changeImport.visible = false;
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传失败', '消息', '确认', 'error')
          .then(() => {});
      } else {
        this.common.submitMsg(newFile.response);
        this.common
          .MessageBoxalert(newFile.response, '消息', '确认', 'error')
          .then(() => {});
      }
    },
    // 预校验 方法
    preValidate() {
      this.http.apiPost(this.$urlList.idcagsinf.preValidateUrl).then((res) => {
        if (res.rescode == '000') {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'success')
            .then(() => {});
          this.nums.totalRecNum = res.sum;
          this.nums.successNum = res.successnum;
          this.nums.errNum = res.errnum;
          //this.nums.errRecNum = res.errnum;
          // 当错误信息不为0时预校验错误下载 按钮可点击，叉号显示
          if (res.errnum != 0) {
            this.btnDisabled.downloadError = false;
            this.showOk.showClose = true;
          } else {
            // 当错误信息为0时 预校验错误下载 按钮置灰,对号显示，第三步高亮，生成报文按钮可点击
            this.btnDisabled.downloadError = true;
            this.showOk.showOk2 = true;
            this.btnDisabled.createReport = false;
            this.handleStage = 3;
          }
        } else {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'error')
            .then(() => {});
          this.showOk.showClose = true;
        }
      });
    },
    // 生成标识变更报文
    createReportClick() {
      this.http.apiPost(this.$urlList.idcagsinf.reportUrl).then((res) => {
        this.btnDisabled.createReport = true;
        if (res.rescode == '000') {
          this.nums.changesNum = res.changenum;
          //this.nums.errNum = res.errnum;
          this.nums.errRecNum = res.errnum;
          this.nums.msgNum = res.successnum;
          if (res.errnum != '0') {
            this.showOk.showClose = true;
            this.btnDisabled.downloadError = false;
          }

          if (res.successnum != '0') {
            this.handleStage = 4;
            //前两步按钮置灰不可点击
            this.btnDisabled.preValidates = true;
            this.uploadData.uploadDisabled = true;
            //报文下载按钮可点击
            this.btnDisabled.reportDw = false;
          } else {
            this.btnDisabled.preValidates = false;
            this.uploadData.uploadDisabled = false;
          }
        } else {
          this.common
            .MessageBoxalert(res.resmsg, '消息', '确认', 'error')
            .then(() => {});
        }
      });
    },
    init() {
      // 页面初次加载请求接口
      this.http.apiPost(this.$urlList.idcagsinf.firstUrl).then((res) => {
        // if(res.rescode == '000'){
        // res.handleStage+=1;
        //this.handleStage = parseInt(res.handleStage, 10);
        this.nums.changesNum = res.changenum;
        this.nums.errNum = res.errnum;
        this.nums.errRecNum = res.errnum;
        this.nums.successNum = res.successnum;
        this.nums.totalRecNum = res.sum;
        this.nums.recordNum = res.sum;
        this.nums.msgNum = res.msgnum;
        // 根据错误数是否为0判断预校验错误下载按钮能否点击
        if (res.errnum > 0) {
          this.btnDisabled.downloadError = false;
        } else {
          this.btnDisabled.downloadError = true;
        }
        if (res.successFlag == 1) {
          this.handleStage = parseInt(res.handleStage, 10);
          if (res.handleStage == 2) {
            this.showOk.showOk1 = true;
            this.showOk.showClose = true;
          } else if (res.handleStage == 5) {
            this.showOk.showOk1 = true;
            this.handleStage = 5;
            //前两步按钮置灰不可点击
            this.btnDisabled.preValidates = true;
            this.uploadData.uploadDisabled = true;
            //报文下载按钮可点击
            this.btnDisabled.reportDw = false;
            //第五步反馈导入按钮可点击
            this.changeImport.uploadDisabled = false;
          }
        } else {
          if (res.handleStage == 2) {
            this.showOk.showOk1 = true;
            this.showOk.showOK2 = true;
            //第三步高亮，生成报文按钮可点击
            this.handleStage = 3;
            this.btnDisabled.createReport = false;
          } else if (res.handleStage == 3) {
            this.showOk.showOk1 = true;
            if (res.msgnum != '0') {
              this.showOk.showOK3 = true;
              this.handleStage = 4;
              //前两步按钮置灰不可点击
              this.btnDisabled.preValidates = true;
              this.uploadData.uploadDisabled = true;
              //报文下载按钮可点击
              this.btnDisabled.reportDw = false;
            } else {
              this.handleStage = 3;
            }
          } else if (res.handleStage == 5) {
            this.showOk.showOk1 = true;
            this.showOk.showOk5 = true;
            this.handleStage = 5;
            //前两步按钮可点击
            this.btnDisabled.preValidates = false;
            this.uploadData.uploadDisabled = false;
            //报文下载按钮不可点击
            this.btnDisabled.reportDw = true;
            //第五步反馈导入按钮不可点击
            this.changeImport.uploadDisabled = true;
            if (res.feedbakfail != undefined) {
              //如果错误数为0则反馈错误下载按钮不能点击
              if (res.feedbakfail != '0') {
                this.btnDisabled.feedError = false;
              } else {
                this.btnDisabled.feedError = true;
              }
            } else {
              this.btnDisabled.feedError = true;
            }
          } else if (res.handleStage == 1) {
            this.handleStage = 2;
            this.showOk.showOk1 = true;
          } else if (res.handleStage == 4) {
            this.showOk.showOk1 = true;
            this.handleStage = 5;
            this.showOk.showOK4 = true;
            //前两步按钮不可点击
            this.btnDisabled.preValidates = true;
            this.uploadData.uploadDisabled = true;
            //报文下载按钮可点击
            this.btnDisabled.reportDw = false;
            //第五步反馈导入按钮可点击
            this.changeImport.uploadDisabled = false;
          }
        }

        // if (res.handleStage == 5) {
        //   this.btnDisabled.reportDw = false;
        // }
        // }
      });
    },

    // 下载方法
    download(url) {
      this.common.downLoad(url, {});
    },
    downloadRpt(url) {
      //标识变更报文下载方法
      this.common.downLoad(url, {});
      //下载完成第五步高亮，反馈按钮可点击
      this.handleStage = 5;
      this.showOk.showOk4 = true;
      this.changeImport.uploadDisabled = false;
    },
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped="scoped">
.bgClass {
  background-color: #e6e6e6 !important;
  color: #777 !important;
}
p {
  font-size: 12px;
}
.aaaa >>> .el-step__title.is-finish {
  font-size: 13px !important;
  border: 1px solid #ccc;
}
.paddingtop >>> .el-card__header {
  background: #e6e6e6;
}
.stepUl {
  position: relative;
}
.stepLi {
  position: relative;
  padding-bottom: 20px;
}
.stepIcon {
  text-align: center;
  position: absolute;
  top: 0px;
  left: -10px;
  border-radius: 20px;
  list-style: none;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 5px solid #ccc;
  background: #ffffff;
  color: #ccc;
  font-size: 20px;
  font-style: normal;
}
.stepContent {
  padding-left: 50px;
  /* position: relative; */
  font-size: 12px;
}
.operateBtn {
  position: absolute;
  top: 3px;
  left: 550px;
}
.operateBtn > div {
  float: left;
  border-radius: 5px;
  font-size: 12px;
}
.operateBtn >>> .file-uploads .el-button--small {
  height: 30px;
  font-size: 12px !important;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #dcdfe6;
  color: #ffffff;
  background-color: #2086ff;
  position: relative;
}
.elButton {
  display: inline-block;
  width: auto;
  height: 30px;
  margin-left: 10px;
  line-height: 29px;
  border-radius: 5px;
  color: #ffffff;
  background-color: #2086ff;
  font-size: 12px;
  cursor: pointer;
  padding: 0 15px;
}
.btnWidth,
.el-button--primary.is-disabled {
  /* width:130px; */
  background-color: #e6e6e6 !important;
  color: #777 !important;
}
.iconSelected {
  border: 5px solid #2086ff;
  color: #2086ff;
}
</style>
