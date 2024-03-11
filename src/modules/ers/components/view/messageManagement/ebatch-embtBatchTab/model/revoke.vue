<template>
  <div>
    <el-dialog
      :title="paramRevoke.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramRevoke.dialogTitle + paramRevoke.title  }}</span>
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
            prop="encFile"
            label="报文名称"
            width="280">
        </el-table-column>
        <el-table-column
            prop="msgStat"
            label="撤销结果">
            <template slot-scope="scope">
                <span>{{ idTypeDic['MSG_STAT'][scope.row.msgStat] || '' }}</span>
            </template>
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
      tableData:'',
      idTypeDic: {} // 字典字段
    };
  },
  props: ['paramRevoke'],
  computed: {

  },
  watch: {
  },
  methods: {
    // 获取字典方法
    getdataDic() {
      let type = ['MSG_STAT'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    close() {
      this.$parent.visibleEdit = false;
      this.$parent.$refs.dataTable.getTableData();
    },
    // 根据字典的键获取字典的值
    loadDic() {
      // 加载字典
      this.common.getdic(this.$urlList.common.dic, 'MSG_STAT', () => {
        // 加载数据
        this.getListData();
      });
      // let url = this.$urlList.common.dic;
      // let paramData = {
      //   params: { type: 'MSG_STAT' }
      // };
      // this.http.apiGet(url, paramData).then(res => {
      //   this.idTypeDic['MSG_STAT'] = res;
      // });
    },
    getListData() {
      this.tableData = this.paramRevoke.tableData;
    }
  },
  created() {
    this.getdataDic();
    // 加载字典
    this.loadDic();
  }
};
</script>
<style scoped>
  .btnClose{
    float: right;
  }
  .el-button {
    color: #3075c7;
    border-color: #c1d6ee;
    background-color: #eaf1f9;
  }
  .el-button:hover {
    color: #2b69b3;
    border-color: #2b69b3;
    outline: none;
  }
</style>
