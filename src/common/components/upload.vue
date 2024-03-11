<template>
  <div>
    <!-- vue-upload-component组件上传方法 -->
    <file-upload
      ref="upload"
      v-model="files"
      :multiple="true"
      @input-file="inputFile"
      @input-filter="inputFilter"
      :post-action="uploadUrl"
      :data="data"
      :disabled="uploadAttr.isDisabled"
      :input-id="uploadAttr.inputId"
    >
      <p class="record clearfix">
        <el-col :span="20">
          附件上传：
          <span>支持{{uploadAttr.format}}格式的文件，且小于{{uploadAttr.size}}MB</span>
        </el-col>
        <el-col :span="3">
          <el-button class="right chooseFile_btn" v-if="uploadBtns.includes('select')"><i class="DHCiconfont">&#xe72e;</i>选择文件</el-button>
          <slot name="uploadBtn"></slot>   <!-- 插槽 -->
        </el-col>
      </p>
    </file-upload>
    <!-- 上传文件的列表 -->
    <el-table :data="files" style="width: 100%">
      <el-table-column prop="name" label="附件名" align="left"></el-table-column>
      <el-table-column prop="filepath" label="操作" align="center">
        <template slot-scope="scope">
          <el-button class="preview_btn" v-if="uploadBtns.includes('preview')" size="mini" @click.prevent="previewFile(scope.row)"><i class="DHCiconfont">&#xe730;</i>预 览</el-button>
          <el-button class="delete_btn" v-if="uploadBtns.includes('delete')" @click.prevent="removeFile(scope.row)"><i class="DHCiconfont">&#xe6a3;</i>删 除</el-button>
          <el-button class="download_btn" v-if="uploadBtns.includes('download')" size="mini" @click.prevent="downloadFile(scope.row)"><i class="DHCiconfont">&#xe6c0;</i>下 载</el-button>
          <slot name="slotBtn"></slot>   <!-- 插槽 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片预览的弹出框 -->
    <el-dialog
      title="图片预览"
      :visible.sync="editFile.show"
      :modal="false"
      :close-on-click-modal="false"
      @close="close"
      custom-class="fullStyle"
      :fullscreen="screen"
    >
      <label>Image:</label>
      <div class="edit-image">
        <img :src="editFile.blob" ref="editImage" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="full">{{fullText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // vue-upload-component组件上传
      files: [],
      // 预览相关
      editFile: {
        show: false,
        name: ''
      },
      screen: false,
      fullText: '全屏显示',
      // 选择文件的name名
      name: 'file',
      uploadUrl: process.env.API_ROOT_PLATFORM + this.$urlList.systemmsg.upload,
      uploadNum: 0,
      newFilesLength: 0
    };
  },
  props: {
    // 控制操作列几个按钮的显隐
    uploadAttr: {
      type: Object,
      default: function () {
        return {};
      }
    },
    // 请求报文中配置的请求体，字段为公告的ID
    data: {
      type: Object,
      default: function () {
        return {};
      }
    },
    // 文件列表的操作按钮
    uploadBtns: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  watch: {
    // 预览是否全屏
    screen() {
      this.fullText = this.screen ? '取消全屏' : '全屏显示';
    }
  },
  methods: {
    // vue-upload-component组件上传
    // 删除上传的文件方法
    removeFile(file) {
      // 判断为新增或编辑，新增的文件(无noticeId)直接删，编辑回显的文件需调接口删
      if (this.uploadAttr.operation == 'edit' && file[this.uploadAttr.parentIdKey]) {
        this.deleteFile(file);
      } else {
        this.$refs.upload.remove(file); // 会触发inputFile中删除条件
      }
    },
    // 删除附件
    deleteFile(file) {
      let paramData = {
        params: {
          id: file.id
        }
      };
      // 调接口删除服务器中的附件
      this.http.apiGet(this.uploadAttr.deleteUrl, paramData).then(res => {
        // 移除页面上的附件
        this.$refs.upload.remove(file);
        // 弹框
        this.common.callbackFuncMsg(res, () => {

        });
      });
    },
    // 下载附件
    downloadFile(file) {
      // window.open(this.uploadAttr.downloadUrl + "?path=" + encodeURI(file.attachmentPath));
      // 需用encodeURI（）方法进行转义，否则IE下载会报错
      this.common.downLoad(this.uploadAttr.downloadUrl, {attachmentId: file.id});
    //   window.location.href = this.uploadAttr.downloadUrl + '?path=' + encodeURI(file.attachmentPath);
    },
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
        // 请求报文中带上这条公告的ID
        newFile.data = this.data;
        // 开始上传
        if (newFile.active !== oldFile.active) {
          // console.log('Start upload', newFile.active, newFile);
          // 限定最小字节
          // if (newFile.size >= 0 && newFile.size < 100 * 1024 * 1024) {
          //   newFile = this.$refs.upload.update(newFile, { error: "size" });
          // }
        }

        // 上传进度
        if (newFile.progress !== oldFile.progress) {
          // console.log('progress', newFile.progress, newFile);
        }
        // 上传错误
        if (newFile.error !== oldFile.error) {
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
          // let uploaded = this.$refs.upload.uploaded;
          // 记录已上传附件的数量
          this.uploadNum++;
          // 筛选出新上传文件的长度，新上传文件都无noticeId，针对编辑页附件回显与新增
          // this.uploadAttr.parentIdKey，父集id名
          this.newFilesLength = this.newFilesLength ? this.newFilesLength : this.files.filter(item => !item[this.uploadAttr.parentIdKey]).length;
          // 全部上传成功之后，弹成功弹出框
          if (this.uploadNum == this.newFilesLength) {
            // 判断浏览器,IE9返回值newFile.response有问题，所以单独弹框
            if (this.common.BrowserType() == 'IE9') {
              let ieRes = newFile.response.replace(/<.+?>/g, '');
              let resData = ieRes.replace(/\\/g, '');
              //   this.common.MessageBoxalert('上传成功', '消息', '确认', 'success').then(() => {
              //     window.reload();
              //   });
              this.common.submitMsg(JSON.parse(resData), this).then(() => {
                this.$emit('close');
              });
            } else {
              // 返回的是text类型，需要转为对象
              let data;
              if (typeof newFile.response == 'object') {
                data = newFile.response;
              } else {
                data = JSON.parse(newFile.response);
              }
              this.common.submitMsg(data, this).then(() => {
                this.$emit('close');
              });
            }
          }
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
        if (this.uploadAttr.format) {
          // 多格式，拼接正则校验规则，拼接为'jpg|png'这种格式
          let formatCheck = this.uploadAttr.format.split('、').join('|');
          // 正则校验
          let regularCheck = new RegExp('.(' + formatCheck + ')$');
          if (!regularCheck.test(newFile.name)) {
            this.$message({
              message: '上传格式不正确!',
              type: 'warning'
            });
            return prevent();
          }
        }
        // IE9上传处理，获取文件大小。（此组件size属性不支持IE9）
        if (this.common.BrowserType() == 'IE9') {
          var path = newFile.el.value; // 这里是你的文件路径
          var fso = new ActiveXObject('Scripting.FileSystemObject');
          var fileSize = fso.GetFile(path).size;
          newFile.size = fileSize;
        }
        // 限制上传文件的大小小于100MB
        if (newFile.size > this.uploadAttr.size * 1024 * 1024) {
          this.$message({
            message: '上传文件应小于' + this.uploadAttr.size + 'MB!',
            type: 'warning'
          });
          return prevent();
        }
        // 创建 blob 字段 用于图片预览
        // 新增页面的预览
        if (this.uploadAttr.operation == 'add' && this.uploadAttr.preview == true) {
          newFile.blob = '';
          let URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file);
          }
        }
      }
      return true;
    },
    // 新增页面的预览方法
    previewFile(file) {
      this.editFile = { ...file, show: true };
    },
    // 是否全屏
    full() {
      this.screen = !this.screen;
      this.fullText = this.screen ? '取消全屏' : '全屏显示';
    },
    // 关闭预览弹框
    close() {
      this.editFile.show = false;
      this.fullText = '全屏显示';
      this.screen = false;
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
  width: 90%;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
