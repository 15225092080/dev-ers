  <!-- 公告dialog -->
<template>
  <el-dialog :visible.sync="detail.detailsVisible"
             width="60%"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-s">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title el-dialog-titleM">系统公告-详情页</span>
      <span class="dialog-title-bg"></span>
    </span>
    <!-- content -->
    <span class="dialogBox">
      <el-form label-width="100px"
               class="ruleForm">
        <el-form-item class="textlabel"
                      label="通知标题：">
          <el-row>
            <el-col :span="22">
              <el-input class="formContent"
                        :value="`${detail.detailsIndex.title}`"
                        :disabled="true"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="textlabel textL"
                      label="下载附件: ">
          <a class="formpath"
             :href="this.$urlList.systemmsg.download+detail.detailsIndex.messageFilename">{{detail.detailsIndex.messageFilename}}</a>
        </el-form-item>
        <el-form-item class="textlabel"
                      label="通知正文：">
          <el-row>
            <el-col :span="22">
              <el-input class="formContent"
                        :disabled="true"
                        type="textarea"
                        :autosize="{minRows:8,maxRows: 8}"
                        v-model="detail.detailsIndex.content"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer"
          class="dialog-footer">
      <el-button class="close_btn"
                 @click="detail.detailsVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['detail'],
};
</script>
<style scoped>
/* 公告详情 */
.el-form-item__label {
  font-family: 'Microsoft YaHei';
  text-align: left !important;
  height: 14px;
  /* margin-left: 60px; */
  color: #666;
}
.formContent {
  /* width: 500px; */
  margin-bottom: 15px;
  clear: both;
  color: #ccc;
  border-color: #dedede;
  cursor: not-allowed;
  /* margin-left: 60px; */
  /* margin-right: 60px; */
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  border-bottom: 1px solid #dedede;
  height: 24px;
  letter-spacing: 2px;
}
.textlabel {
  margin-left: 60px;
  /* margin-top: 30px; */
}
.textL {
  margin-left: 49px;
}
.formpath {
  margin-left: 70px;
  margin-right: 60px;
  margin-bottom: 15px;
  color: #3075c7;
  text-decoration: underline;
}
</style>
