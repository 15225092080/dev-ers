<template>
  <div>
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="100px">
          <el-button slot="slotBtn"  class="submit_btn" @click="callback('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
import Bus from '@/common/script/bus.js';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      buttonGroup: ['close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.credituser.getValUrl, // 接口
        param: {id: this.$parent.detailUrl.resId} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {

  },
  watch: {
  },
  methods: {
    callback(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {'id': this.$refs[formItem].formItem.id});
      this.$refs[formItem].$refs[formItem].validate(valid => {
        if (valid) {
          this.http.apiPost(this.url, param).then(res => {
            this.$store.dispatch('user/setModaltState', '');
            that.common.submitMsg(res).then(() => {
              // that.$router.go(-1)
              Bus.$emit('credituser');
              this.$refs.formItem.close();
            });
          });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    // 监听下拉框事件
    init() {
      // this.url = this.paramEdit.url;
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.credituser.create;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'creditUser',
              value: '',
              label: '征信用户账号',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            },
            {type: 'password',
              name: 'creditPassword',
              value: '',
              label: '密码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'digitalCertificate',
              value: '',
              label: '数字证书',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },{type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {children: 'children',
                label: function (a, b) {
                  return a.name;
                }},
              name: 'creditOrgCode',
              value: '',
              label: '征信用户所属机构',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]}
          ]
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.credituser.update;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'creditUser',
              value: '',
              label: '征信用户账号',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            },
            {type: 'password',
              name: 'creditPassword',
              value: '',
              label: '密码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}
              ]
            }
          ],
          [
            {type: 'input',
              name: 'digitalCertificate',
              value: '',
              label: '数字证书',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            },
            {type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {children: 'children',
                label: function (a, b) {
                  return a.name;
                }},
              name: 'creditOrgCode',
              value: '',
              label: '征信用户所属机构',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]}
          ]
        ];
      }
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>

</style>
