<template>
  <el-dialog :title="title"
             :visible.sync="param.visible"
             :close-on-click-modal="false"
             @close="closeDialog('formItem')"
             custom-class="model-dialog el-dialog-m">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title"> {{ title }}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <el-form ref="formItem"
             :model="formItem"
             label-width="100px"
             :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话"
                        prop="telephone">
            <el-input v-model="formItem.telephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机"
                        prop="mobile">
            <el-input v-model="formItem.mobile"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位电话"
                        prop="orgPhone">
            <el-input v-model="formItem.orgPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信号"
                        prop="weiChat">
            <el-input v-model="formItem.weiChat"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱"
                        prop="userEmail">
            <el-input v-model="formItem.userEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮政编码"
                        prop="postCode">
            <el-input v-model="formItem.postCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="通信地址"
                        prop="address">
            <el-input v-model="formItem.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button class="submit_btn"
                 @click="submitForm('formItem')"
                 :loading="loading"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      <el-button class="empty_btn"
                 @click="clear('formItem')"><i class="DHCiconfont">&#xe69e;</i>清 空</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'child',
  data() {
    return {
      title: '修改个人信息',
      disabled: false,
      paramData: '',
      formItem: {
        telephone: '',
        mobile: '',
        orgPhone: '',
        weiChat: '',
        userEmail: '',
        postCode: '',
        address: '',
      },
      loading: false,
      rules: {
        telephone: [{ validator: this.phone, trigger: 'blur' }],
        mobile: [{ validator: this.mobile, trigger: 'blur' }],
        orgPhone: [{ validator: this.phone, trigger: 'blur' }],
        weiChat: [{ validator: this.weiChat, trigger: 'blur' }],
        userEmail: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        postCode: [{ validator: this.postCode, trigger: 'blur' }],
        address: [{ validator: this.address, trigger: 'blur' }],
      },
    };
  },
  props: ['param'],
  methods: {
    closeDialog(formItem) {
      // 清除新增編輯彈出框的校驗
      this.$refs[formItem].resetFields();
    },
    submitForm(formItem) {
      let that = this;
      that.loading = true;
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          let paramData = this.formItem;
          this.http.apiPost(this.$urlList.user.update, paramData).then((res) => {
            if (res.code == '00000001') {
              this.$message.error(res.msg);
              that.loading = false;
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: '800',
                onClose: function () {
                  that.param.visible = false;
                  setTimeout(() => {
                    that.loading = false;
                    that.init();
                  }, 200);
                },
              });
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '验证不通过，提交失败',
            type: 'warning',
            onClose: function () {
              that.loading = false;
            },
          });
        }
      });
    },
    clear(formItem) {
      this.formItem = {
        telephone: '',
        mobile: '',
        orgPhone: '',
        weiChat: '',
        userEmail: '',
        postCode: '',
        address: '',
      };
      this.$refs[formItem].resetFields();
    },
    init() {
      this.http.apiGet(this.$urlList.user.currentUser).then((res) => {
        this.formItem = res;
      });
    },
  },
  created() {
    this.init();
  },

  //  mixins: [http]
};
</script>
<style>
/* .el-dialog__body{
        padding: 0px;
    }
    .treecard{
        height: '700px';
    } */
</style>
