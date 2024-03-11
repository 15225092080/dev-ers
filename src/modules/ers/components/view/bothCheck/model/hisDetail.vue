<template>
  <div>
    <el-dialog
      :title="paramHisDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramHisDetail.dialogTitle + paramHisDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" :buttonGroup="buttonGroup" v-bind:arrList="arrList" :url="url" labelWidth="100px">
      </v-form>
      <!-- 导出按钮 -->
      <div class="historyGroups">
        <el-row class="historyBtn">
          <el-button type="primary" class="downBtn" @click="downLoad">导出</el-button>
        </el-row>
      </div>
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
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
      buttonGroup: ['close']
    };
  },
  props: ['paramHisDetail'],
  computed: {

  },
  watch: {
  },
  methods: {
    //导出方法
    downLoad(){
        if(this.$refs.formItem.formItem.endDate != ''){
          let form = {'endDate': this.$refs.formItem.formItem.endDate};
          this.common.downLoad(this.$urlList.dataCheck.newExportUrl,form)
        }else{
          this.$message.error('请填写截止日期');
        }
    },
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {type: 'date',
              name: 'endDate',
              value: '',
              label: '截止日期',
              span: 12,
              // pickerOptions: {
              //   disabledDate(time) {
              //     return time.getTime() > Date.now();
              //   }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'change'}]
            }
        ]

      ];
      // this.setOrgVal()
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
    bottom: 20px !important;
    right: 120px !important;
    z-index: 100000000000;
}
.downBtn{
    height:35px !important;
}
</style>
