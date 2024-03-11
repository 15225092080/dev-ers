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
        url:this.$urlList.amom.getValUrl,   //接口
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
          {type: 'input', name: 'deptCode', value: '', label: '内部机构代码', span: 12, disabled: true},
          {type: 'input', name: 'centerCode', value: '', label: '征信中心机构代码', span: 12, disabled: true},
          {type: 'input', name: 'orgEntityCenterCode', value: '', label: '法人机构征信中心机构代码', span: 12, disabled: true},
          {type: 'input', name: 'topDeptCode', value: '', label: '上报机构内部机构代码', span: 12, disabled: true},
          {type: 'input', name: 'topCenterCode', value: '', label: '上报机构征信中心机构代码', span: 12, disabled: true}
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
.historyGroups{
    position: absolute;
    bottom: 20px;
    right: 120px;
    z-index: 100000000000;
}
</style>
