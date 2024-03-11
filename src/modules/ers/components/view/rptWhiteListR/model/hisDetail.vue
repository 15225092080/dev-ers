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
      <!-- 下载错误记录按钮 -->
      <div class="historyGroups">
        <el-row class="historyBtn">
          <el-button type="primary" class="downBtn" :disabled="this.paramHisDetail.data.errNum == 0" @click="downLoad">下载错误记录</el-button>
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
    downLoad(){
        this.common.downLoad(this.$urlList.intercept.errExcel,{})
    },
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {type: 'input', name: 'state', value: this.paramHisDetail.data.state, label: '模板文件状态', span: 12, disabled: true},
          {type: 'input', name: 'sum', value: this.paramHisDetail.data.sum, label: '总记录数', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'successNum', value: this.paramHisDetail.data.successNum,label: '成功记录数', span: 12, disabled: true},
          {type: 'input', name: 'errNum', value: this.paramHisDetail.data.errNum, label: '错误记录数', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'startTime', value: this.paramHisDetail.data.startTime, label: '开始时间', span: 12, disabled: true},
          {type: 'input', name: 'endTime', value: this.paramHisDetail.data.endTime, label: '结束时间', span: 12, disabled: true}
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
