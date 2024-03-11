<template>
  <el-dialog :visible.sync="param.visible"
             :close-on-click-modal="false"
             @close="closeDialog('formItem')"
             custom-class="model-dialog el-dialog-m"
             :modal="true">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <el-form ref="formItem"
             :model="formItem"
             label-width="100px"
             :rules="rules">
      <div class="form-body">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题"
                          prop="title">
              <el-input v-model="formItem.title"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隶属系统"
                          prop="systemId">
              <v-select :options="systemList"
                        v-model="formItem['systemId']"
                        :disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告截止日期"
                          prop="expirationTime">
              <el-date-picker :editable="false"
                              v-model="formItem.expirationTime"
                              :picker-options="pickerOptions"
                              type="date"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              placeholder="请选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告正文"
                          prop="content">
              <el-input type="textarea"
                        v-model="formItem.content"
                        :autosize="{minRows:8,maxRows: 8}"
                        :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <v-upload ref="upload"
                    :uploadAttr="uploadAttr"
                    :data="data"
                    :uploadBtns="uploadBtns"
                    @close="close"></v-upload>
        </el-row>

        <!-- </form> -->
      </div>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <!-- <el-button type="primary" @click="saveEdit('formItem')" :loading="loading">提 交</el-button> -->
      <el-button class="submit_btn"
                 @click="savePage('formItem')"
                 :loading="loading"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      <!-- 新增时是清空，编辑是重置 -->
      <el-button class="empty_btn"
                 @click="cancle"
                 v-if="param.operation == 'add'"><i class="DHCiconfont">&#xe69e;</i>清 空</el-button>
      <el-button class="reset_btn"
                 @click="reset"
                 v-if="param.operation == 'edit'"><i class="DHCiconfont">&#xe72d;</i>重 置</el-button>
      <el-button class="close_btn"
                 @click="close()"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </span>
  </el-dialog>

</template>
<script>
export default {
  name: 'child',
  components: {},
  data() {
    return {
      // 上传组件中按钮控制
      uploadBtns: ['delete', 'select'],
      // 上传组件中配置属性
      uploadAttr: {
        // 上传组件是否置灰
        isDisabled: false,
        uploadUrl: this.$urlList.systemmsg.upload,
        deleteUrl: this.$urlList.systemmsg.deleteAttachment,
        // 新增或编辑的标识字段
        operation: '',
        // 父集id名，上传成功判断上传附件数量时使用
        parentIdKey: 'noticeId',
        // 文件属性
        format: 'jpg、png、pdf、txt、doc、xls、docx、xlsx、zip、rar',
        size: 100,
      },
      // 传入上传组件的请求报文请求体,值为操作公告的noticeId
      data: { noticeId: '' },
      // 提交路径
      submitUrl: '',
      // 查询条件
      formItem: {
        title: '',
        content: '',
        systemId: '',
        expirationTime: '',
      },
      systemList: JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList')),
      loading: false,
      disabled: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
      rules: {
        title: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'blur',
          },
          { max: 50, message: '长度不超过50位', trigger: 'blur' },
          {
            type: '1111|，,。.@#_-',
            validator: this.validator.comValidate,
            trigger: 'blur',
          },
        ],
        systemId: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'change',
          },
        ],
        content: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'blur',
          },
          { max: 1000, message: '长度不超过1000位', trigger: 'blur' },
        ],
      },
    };
  },
  props: ['param'],
  watch: {},
  methods: {
    // 关闭新增弹框
    closeDialog(formItem) {
      // 清除新增編輯彈出框的校驗
      this.$refs[formItem].resetFields();
    },
    // 清空方法
    cancle() {
      Object.keys(this.formItem).forEach((key) => (this.formItem[key] = ''));
      this.$refs.formItem.resetFields();
      let upload = this.$refs.upload.$refs.upload;
      upload.clear();
    },
    reset() {
      this.$emit('setVal', this.param.id);
    },
    // 关闭弹框方法
    close() {
      this.$emit('closeChild');
    },
    // 新增修改页保存endTime
    savePage() {
      // this.loading = true;
      // 表单校验
      this.$refs.formItem.validate((valid) => {
        // 判断是新增还是编辑调不同的接口
        if (this.$parent.paramAdd.operation == 'edit') {
          this.submitUrl = this.$urlList.systemmsg.update;
        } else {
          this.submitUrl = this.$urlList.systemmsg.create;
        }
        // valid为true校验通过
        if (valid) {
          // 若公告截止日期没有值，则传空字符串，不能是null
          if (!this.formItem.expirationTime) {
            this.formItem.expirationTime = '';
          }
          let data = this.formItem;
          // 新增提交，取到返回的id，以id为请求报文请求上传接口
          this.http
            .apiPost(this.submitUrl, data, {
              showLoading: true,
            })
            .then((res) => {
              // this.loading = false;
              let files = this.$refs.upload.files;
              // 过滤掉回显的附件，只取新增的附件，因为回显的附件无需再次上传
              files = files.filter((item) => !item.noticeId);
              // 判断是否有新上传的附件，若有则访问上传接口，若无直接弹框
              if (files.length) {
                // 拿到该条公告的ID，传给上传组件，作为上传时附带的参数
                this.data = { noticeId: res.data };
                // 上传组件开始上传的调用方法
                // 新增会把所有文件都上传，编辑只会上传新添加的文件
                this.$refs.upload.$refs.upload.active = true;
              } else {
                this.common.submitMsg(res, this).then(() => {
                  this.close();
                });
              }
            });
        } else {
          // this.loading = false;
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    init() {
      // 将父组件中的新增或编辑字段传过来，便于上传组件中判断
      this.uploadAttr.operation = this.param.operation;
      this.systemList = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList'));
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
.el-row {
  padding-left: 20px;
  padding-right: 20px;
}
.btn_file {
  display: none;
}
.warn {
  color: #fd971f;
}
/* 15533 平台通用，提示语过长换行时优化
.form-body >>> .el-form-item--small.el-form-item {
  margin-bottom: 35px;
} */
</style>
