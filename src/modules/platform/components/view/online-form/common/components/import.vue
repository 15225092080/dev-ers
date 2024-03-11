<template>
  <el-dialog title="导入EXCEL"
             :modal="true"
             width="600px"
             :visible="visible"
             @close="close"
             :close-on-click-modal="false"
             custom-class="model-dialog ui-online-template-view-import-dialog">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">导入EXCEL</span>
      <span class="dialog-title-bg"></span>
    </span>
    <div class="dialog-content-wrap">
      <div class="switch-wrap"
           v-if="online">
        <span class="switch-content">是否开启校验:</span>
        <span class="switch-content">
          <el-switch :width="80"
                     :value="validateStatus==1"
                     @change="handleChangeValidateStatus"
                     active-text="是"
                     inactive-text="否"></el-switch>
        </span>
      </div>
      <el-upload ref="upload"
                 :action="uploadAction"
                 :data="params"
                 :multiple="false"
                 accept=".xls,.xlsx"
                 :file-list="fileList"
                 :on-remove="handleRemove"
                 :on-change="handleChange"
                 :on-success="handleSuccess"
                 :on-error="handleError"
                 :auto-upload="false"
                 :headers="{'Authorization': $store.getters.token}">
        <el-button plain
                   class="border_btn"><i class="DHCiconfont">&#xe6a9;</i>选择导入文件
        </el-button>
      </el-upload>
    </div>
    <template slot="footer">
      <el-button class="close_btn"
                 @click="close">关闭</el-button>
      <el-button class="submit_btn"
                 @click="handleImport"
                 :disabled="fileList.length === 0 || uploading">
        {{ uploading ? '上传中...' : '开始上传' }}
      </el-button>
    </template>

  </el-dialog>
</template>

<script>
export default {
  name: 'OImportDialog',
  props: {
    url: {
      type: String,
      default: '',
      required: false,
    },
    biz: {
      type: String,
      default: '',
      required: false,
    },
    // 是否online导入
    online: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      visible: false,
      uploading: false,
      fileList: [],
      uploadAction: '',
      foreignKeys: '',
      validateStatus: 0,
      params: {},
    };
  },
  watch: {
    url(val) {
      if (val) {
        this.uploadAction = process.env.API_ROOT_PLATFORM + val;
      }
    },
  },
  created() {
    this.uploadAction = process.env.API_ROOT_PLATFORM + this.url;
  },

  methods: {
    show(arg) {
      this.visible = true;
      this.foreignKeys = arg;
    },
    close() {
      this.visible = false;
      this.fileList = [];
      this.uploading = false;
      this.validateStatus = 0;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList];
    },
    handleImport() {
      if (this.biz) {
        this.$set(this.params, 'isSingleTableImport', this.biz);
      }
      if (this.foreignKeys && this.foreignKeys.length > 0) {
        this.$set(this.params, 'foreignKeys', this.foreignKeys);
      }
      if (this.online == true) {
        this.$set(this.params, 'validateStatus', this.validateStatus);
      }
      this.uploading = true;
      this.$refs.upload.submit();
    },
    handleSuccess(res) {
      this.close();
      this.$emit('loadData');
      if (res.code == '0') {
        this.common.message(true, res.message, 'success', 2000);
      } else if (res.code == '200037') {
        this.errorTip(res.message, res.data);
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    handleError(err) {
      this.common.MessageBoxalert(err.message || '上传失败！', '提示', '确定', 'warning').then(() => {
        this.close();
      });
    },
    // 是否开启校验 开关改变事件
    handleChangeValidateStatus(checked) {
      this.validateStatus = checked == true ? 1 : 0;
    },
    // 错误信息提示
    errorTip(tipMessage, fileUrl) {
      const pre = process.env.API_ROOT_PLATFORM.substring(0, process.env.API_ROOT_PLATFORM.lastIndexOf('/'));
      let href = `${pre}${fileUrl}?token=${this.$store.getters.token}`;
      this.$alert(
        `<div>
          <p>${tipMessage}</p>
          <div>具体详情请<a style="text-decoration: underline;color:#5088fb;cursor: pointer;" target='downloadFile' href="${href}">点击下载</a></div>
          <iframe style="display: none;" name="downloadFile"></iframe>
         </div>`,
        '导入成功,但是有错误数据!',
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
  },
};
</script>

<style lang="less">
.ui-online-template-view-import-dialog {
  .dialog-content-wrap {
    padding: 20px 25px 25px;
    .switch-wrap {
      display: flex;
      .switch-content {
        display: inline-block;
        line-height: 40px;
        height: 40px;
      }
    }
    .el-upload--text {
      border-radius: 0;
    }
  }
}
</style>
