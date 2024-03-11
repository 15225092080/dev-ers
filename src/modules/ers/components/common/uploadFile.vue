<template>
  <div>
    <!-- vue-upload-component组件上传方法 -->
    <file-upload
      ref="upload"
      v-model="files"
      :multiple="true"
      @input-file="inputFile"
      @input-filter="inputFilter"
      :post-action="uploadData.uploadUrl"
      :input-id="uploadData.fileId"
      :disabled="uploadData.uploadDisabled"
      :headers="{'Authorization': $store.getters.token}"
    >
          <el-button size="small" type="primary" class="right" :class="{'bgClass':uploadData.uploadDisabled}">{{uploadData.btnText}}</el-button>
    </file-upload>
    <el-dialog
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
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      // vue-upload-component组件上传
      files: [],
      // 选择文件的name名
      name: 'file',
      uploadNum: 0,
      newFilesLength: 0
    };
  },
  props: {
    // 控制操作列几个按钮的显隐
    uploadData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   只读
     * @param  Object|undefined   oldFile   只读
     */
    // 添加，删除之后调的方法，可以根据文件状态判断是否进行上传操作
    // 如果 newFile 值为 undefined 则是删除
    // 如果 oldFile 值为 undefined 则是添加
    inputFile: function (newFile, oldFile) {
      if (newFile && !oldFile) {
        // 添加文件
      }
      // 暂时无此功能
      if (newFile && oldFile) {
        // 更新文件
        // 开始上传
        if (newFile.active !== oldFile.active) {
        //   console.log('Start upload', newFile.active, newFile);
          // 限定最小字节
          // if (newFile.size >= 0 && newFile.size < 100 * 1024 * 1024) {
          //   newFile = this.$refs.upload.update(newFile, { error: "size" });
          // }
        }

        // 上传进度
        if (newFile.progress !== oldFile.progress) {
        //   console.log('progress', newFile.progress, newFile);
        }
        // 上传错误
        if (newFile.error !== oldFile.error) {
          this.uploadData.errorCallback(newFile);
          // 判断浏览器
          if (this.common.BrowserType() == 'IE9') {
            this.common.MessageBoxalert('上传失败', '消息', '确认', 'error').then(() => {
              window.reload();
            });
          } else {
            this.common.submitMsg(newFile.response);
          }
        }
        // 上传成功
        if (newFile.success !== oldFile.success) {
          // 判断浏览器,IE9返回值newFile.response有问题，所以单独弹框
          this.uploadData.successCallback(newFile.response);
          // if (this.common.BrowserType() == "IE9") {
          //   this.common.MessageBoxalert('上传成功', "消息", "确认", "success").then(() => {
          //       window.reload();
          //   })
          // }else {
          //     this.uploadData.successCallback(newFile.response);
          //   // 返回的是text类型，需要转为对象  上传成功回调
          //   let jsonData = newFile.response;
          //   if(jsonData.rescode == '000'){
          //       this.uploadData.successCallback(newFile.response)
          //   }else{
          //         this.common.MessageBoxalert(jsonData.resmsg, "消息", "确认", "error").then(() => {
          //             // window.reload();
          //         })
          //   }
          // //   this.common.submitMsg(JSON.parse(newFile.response));

          // };
        }
      }
      // 自动上传
      if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
        if (!this.$refs.upload.active) {
          this.$refs.upload.active = true;
          this.uploadData.startCallback();
        }
      }
    },
    /**
     * Pretreatment
     * @param  Object|undefined   newFile   读写
     * @param  Object|undefined   oldFile   只读
     * @param  Function           prevent   阻止回调
     * @return undefined
     */
    // 添加，删除之前调的方法，根据新老文件状态判断上传文件状态
    // 如果 newFile 值为 undefined 则是删除
    // 如果 oldFile 值为 undefined 则是添加
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // 限制上传文件的格式

        // eslint-disable-next-line no-useless-escape
        let reg = new RegExp('\.(' + this.uploadData.reg + ')$', 'i');
        if (
          !reg.test(newFile.name)
        ) {
          this.$message({
            message: '上传格式不正确!',
            type: 'warning'
          });
          return prevent();
        }
        // IE9上传处理，获取文件大小。（此组件size属性不支持IE9）
        if (this.common.BrowserType() == 'IE9') {
          var path = newFile.el.value; // 这里是你的文件路径
          // eslint-disable-next-line no-undef
          var fso = new ActiveXObject('Scripting.FileSystemObject');
          var fileSize = fso.GetFile(path).size;
          newFile.size = fileSize;
        }
        // 限制上传文件的大小小于100MB
        if (newFile.size > this.uploadData.fileSize * 1024 * 1024) {
          this.$message({
            message: '上传文件应小于' + this.uploadData.fileSize + 'MB!',
            type: 'warning'
          });
          return prevent();
        }
      }
      return false;
    }
  },
  created() {}
};
</script>
<style scoped>
.fullStyle {
  height: 75vh;
  position: relative;
}
.bgClass{
    background-color: #e6e6e6 !important;
    color: #777 !important;
}
.fullStyle >>> .el-dialog__body {
  height: 75%;
}
.fullStyle >>> .el-dialog__footer {
  position: absolute;
  padding: 0;
  bottom: 2%;
  right: 3%;
}
.file-uploads {
  width: 100%;
  text-align: left;
  overflow:inherit;
  cursor: pointer;
}
.file-uploads >>> .el-button--small {
  height: 32px;
}
.record span {
  font-size: 12px;
  color: #fd971f;
  margin-left: 20px;
}
.record {
  width:100%;
  padding-left: 15px !important;
  padding-right: 0px !important;
}
</style>
