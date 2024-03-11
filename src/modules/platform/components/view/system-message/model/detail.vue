<template>
  <div>
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
               label-width="100px">
        <div class="form-body">
          <el-row>
            <el-col :span="10">
              <el-form-item label="公告标题"
                            prop="title">
                <el-input v-model="formItem.title"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="隶属系统"
                            prop="systemId">
                <v-select v-model="formItem['systemId']"
                          paramtype="systemList"
                          :url="this.$commonUrl.home.system"
                          :disabled="true"></v-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="公告截止日期"
                            prop="expirationTime">
                <el-input v-model="formItem.expirationTime"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所属机构"
                            prop="orgCode">
                <v-select v-model="formItem['orgCode']"
                          paramtype="getOrgName"
                          :url="this.$commonUrl.common.getOrgName"
                          :disabled="true"></v-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="编辑机构"
                            prop="updateOrgCode">
                <v-select v-model="formItem['updateOrgCode']"
                          paramtype="getOrgName"
                          :url="this.$commonUrl.common.getOrgName"
                          :disabled="true"></v-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="编辑用户"
                            prop="updateUserName">
                <el-input v-model="formItem.updateUserName"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="编辑时间"
                            prop="updateTime">
                <el-input v-model="formItem.updateTime"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="发布状态"
                            prop="status">
                <v-select v-if="statusOptions"
                          v-model="formItem['status']"
                          :options="statusOptions"
                          :disabled="true"></v-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="公告正文"
                            prop="content">
                <el-input type="textarea"
                          v-model="formItem.content"
                          :autosize="{minRows:8,maxRows: 8}"
                          :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <v-upload ref="upload"
                      :uploadAttr="uploadAttr"
                      :uploadBtns="uploadBtns"></v-upload>
          </el-row>

          <!-- </form> -->
        </div>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="close_btn"
                   @click="close()"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  name: 'child',
  components: {},
  data() {
    return {
      // 上传组件中按钮控制
      uploadBtns: ['download'],
      // 上传组件中配置属性
      uploadAttr: {
        // 上传组件是否置灰
        isDisabled: true,
        uploadUrl: this.$urlList.systemmsg.upload,
        downloadUrl: this.$urlList.systemmsg.download,
        operation: '',
        // 父集id名，上传成功判断上传附件数量时使用
        parentIdKey: 'noticeId',
        // 文件属性
        format: 'jpg、png、pdf、txt、doc、xls、docx、xlsx、zip、rar',
        size: 100,
      },
      // 查询条件
      formItem: {
        title: '',
        content: '',
        systemValue: '',
        endTime: '',
        createUserName: '',
        createTime: '',
        orgCode: '',
        status: '',
      },
      statusOptions: null,
      loading: false,
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
    // 关闭弹框方法
    close() {
      this.$emit('closeChild');
    },
    async getStatus() {
      const response = await this.http.apiGet(this.$commonUrl.common.dic, { params: { typeId: 'T_GGGL_0001', systemId: 'DCP' } });
      if (response.data && JSON.stringify(response.data) !== '{}') {
        this.statusOptions = response.data;
      }
    },
  },
  created() {
    this.getStatus();
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
</style>
