<template>
  <div>
    <el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-l"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
        <v-table ref="dataTable" pagination :param="paramTable"></v-table>
      <!-- <v-form ref="formItem" :buttonGroup="buttonGroup" v-bind:arrList="arrList" :url="url" labelWidth="100px">
      </v-form> -->
      <div class="boxBtn">
        <el-button @click="close" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
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
      buttonGroup: ['close'],
      // 列表表头
      paramTable: {
        selectionShow:true,
        showButton:false,
        rowClickFun:this.rowClickFun,
        bussName: 'intercept',
        getDataUrl:this.$urlList.intercept.findOperateHistroy,
        where:this.paramDetail.data,
        getTableData:this.getTableData,
        tableHeader: [
          {
            // 详情demo
            field: 'operator',
            title: '操作员',
            width: 80
          },
          {
            field: 'operateTime',
            title: '操作时间',
            width: 120
          },
          {
            field: 'systemId',
            title: '系统编号',
            width: 120
          },
          {
            field: 'idType',
            title: '证件类型',
            width: 100,
            oper: {
              name: 'dic',
              type: 'E_InfoIDType2'
            }
          },
          {
            field: 'idNum',
            title: '证件号码',
            width: 150
          },
          {
            field: 'noReport',
            title: '免报标志',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_NO_REPORT'
            }
          },
          {
            field: 'reason',
            title: '免报原因',
            width: 120
          }
        ]
      }
    };
  },
  props: ['paramDetail'],
  watch: {
  },
  methods: {
      getTableData(){
        this.http.apiPost(this.$urlList.intercept.findOperateHistroy, this.paramDetail.data).then(res => {
          this.$refs.dataTable.tableData = res;
        })
      },
      close(){
        this.paramDetail.close()
      }
  },
  created() {
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
<style scoped>
    .boxBtn{
        text-align: right;
        padding:10px 20px 10px 0;
    }
</style>
