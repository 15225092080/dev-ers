<template>
  <div class="ui-online-form-edit-upload-wrap">
    <el-upload :class="{'ui-upload-disbled':disabled}"
               :before-upload="handleBeforeUpload"
               :on-change="handleChange"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :on-exceed="handleExceed"
               :on-success="handleSuccess"
               :file-list="fileList"
               :list-type="listType[type]"
               :limit="limit"
               :multiple="multiple"
               :action="uploadUrl"
               :disabled="disabled"
               :headers="headers">
      <i v-if="type==='image'"
         class="el-icon-plus"></i>
      <el-button v-else
                 plain
                 class="border_btn"><i class="DHCiconfont">&#xe6a9;</i>点击上传
      </el-button>
    </el-upload>
    <el-dialog :visible.sync="imgDialogVis"
               class="ui-online-template-img-preview-dialog"
               append-to-body>
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">图片预览</span>
        <span class="dialog-title-bg"></span>
      </span>
      <img width="100%"
           :src="dialogImageUrl">
      <div slot="footer"
           class="dialog-footer">
        <el-button class="close_btn"
                   @click="imgDialogVis=false"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { uidGenerator, getFileName, getFileUrl } from '../script/util';
export default {
  data() {
    return {
      headers: { Authorization: this.$store.getters.token },
      listType: {
        file: 'text',
        image: 'picture-card',
      },
      imgDialogVis: false,
      dialogImageUrl: '',
      fileList: [],
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    uploadUrl: {
      type: String,
    },
    type: {
      type: String,
    },
    limit: {
      type: [String, Number],
    },
    value: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    field: {
      type: String,
    },
  },
  watch: {},
  computed: {},
  methods: {
    initFileList(paths) {
      if (!paths || paths.length == 0) {
        this.fileList = [];
        return;
      }
      let fileList = [];
      let arr = paths.split(',');
      for (var a = 0; a < arr.length; a++) {
        let url = getFileUrl(arr[a]);
        fileList.push({
          uid: uidGenerator(),
          name: getFileName(arr[a]),
          status: 'done',
          url: url + '?token=' + this.$store.getters.token,
          response: {
            data: arr[a],
          },
        });
      }
      this.fileList = fileList;
    },
    handleFileList(fileList) {
      const arr = [];
      fileList.forEach((item) => {
        arr.push(item.response.data);
      });
      this.$emit('input', arr.join(','));
      this.$emit('validateField', this.field);
    },
    handleSuccess(response, file, fileList) {
      this.handleFileList(fileList);
    },
    handleRemove(file, fileList) {
      this.handleFileList(fileList);
    },
    handleChange(file, fileList) {},
    handleBeforeUpload(file) {
      var fileType = file.type;
      if (this.type === 'image' && fileType.indexOf('image') === -1) {
        this.common.message(true, '请上传图片', 'warning', 2000);
        return false;
      }
      return true;
    },

    handlePreview(file) {
      if (this.type === 'image') {
        this.dialogImageUrl = file.url;
        this.imgDialogVis = true;
      } else {
        location.href = file.url;
      }
    },
    handleExceed(files, fileList) {
      this.common.message(true, `当前限制选择 ${this.limit} 个文件`, 'warning', 2000);
    },
  },
  mounted() {
    this.initFileList(this.value);
  },
};
</script>
<style lang="less">
.ui-online-template-img-preview-dialog {
  .el-dialog__headerbtn .el-dialog__close {
    color: red;
    font-weight: bold;
  }
}
</style>
