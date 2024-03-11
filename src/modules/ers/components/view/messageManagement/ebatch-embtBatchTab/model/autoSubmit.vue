<template>
  <div>
    <el-dialog
      :title="paramSubmit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramSubmit.dialogTitle + paramSubmit.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <el-table
        :data="tableData"
        align="center"
        style="width: 100%">
        <el-table-column
            prop="batchNum"
            label="批次号"
            width="220">
        </el-table-column>
        <el-table-column
            prop="reportFileName"
            label="报文名称"
            width="280">
        </el-table-column>
        <el-table-column
            prop="result"
            label="报送结果"
            width="200">
        </el-table-column>
        </el-table>
        <div class="form-footer">
            <el-form>
                <el-row>     <!-- 弹出层 -->
                    <el-col >
                        <el-form-item  style="float:right">
                            <el-button @click="close"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
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
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
      tableData:''
    };
  },
  props: ['paramSubmit'],
  computed: {

  },
  watch: {
  },
  methods: {
    //关闭方法
    close() {
      this.$parent.visibleSub = false;
      this.$parent.$refs.dataTable.getTableData();
    },
    //获取表格数据
    getListData() {
      this.tableData = this.paramSubmit.tableData;
    }
  },
  created() {
    // 加载数据
    this.getListData();
  }
};
</script>
<style scoped>
  .btnClose{
    float: right;
  }
  .el-button {
    color: #3075c7;
    border-radius: 0px;
    border-color: #c1d6ee;
    background-color: #eaf1f9;
  }
  .el-button:hover {
    color: #2b69b3;
    border-color: #2b69b3;
    outline: none;
  }
</style>
