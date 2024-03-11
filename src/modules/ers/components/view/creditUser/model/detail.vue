<template>
  <div>
    <el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" :buttonGroup="buttonGroup" v-bind:arrList="arrList" :url="url" labelWidth="100px">
      </v-form>
    </el-dialog>
   
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  components: {
  },
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
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url:this.$urlList.credituser.getValUrl,   //接口
        param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
      buttonGroup: ['close']
    };
  },
  props: ['paramDetail'],
  computed: {

  },
  watch: {
  },
  methods: {
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {type: 'input', name: 'creditUser', value: '', label: '征信用户账号', span: 12, disabled: true},
          {type: 'password', name: 'creditPassword', value: '', label: '密码', span: 12, disabled: true},
          {type: 'input', name: 'digitalCertificate', value: '', label: '数字证书', span: 12, disabled: true},
          {type: 'select', name: 'creditOrgCode', value: '', param: 'deptCode', label: '征信用户所属机构', span: 12, disabled: true}
        ]
      ];
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>
</style>
