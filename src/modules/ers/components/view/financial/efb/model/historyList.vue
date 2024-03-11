<template>
  <div class="querypage">
    <!-- 查询报送历史详情页 -->
    <historyDetail v-if="paramEdit" :paramEdit="paramEdit" @closeChild="closeChild" ref="paramEdit" :vis.sync="paramEdit"></historyDetail>
    <el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      custom-class="model-dialog el-dialog-m"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <el-card class="paddingtop">
        <div>
          <v-table ref="dataTable" :param="paramTable">
            <div slot="rpt" slot-scope="data">
                <span>  
                    <span v-if="data.data.row.rptDate != null">{{data.data.row.rptDate.split(" ")[0]}}</span>
                </span>
            </div>
          </v-table>
        </div>
      </el-card>
      <el-button @click="close()" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </el-dialog>

    <router-view></router-view>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
import historyDetail from './historyDetail';
export default {
  mixins: [MinXin],
  components: {
    historyDetail
  },
  inject: ['reload'],
  data() {
    return {
      paramEdit: false,
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      selected_row: '',
      paramTable: {
        selectionShow:true,
        bussName: 'efb',
        where: {id: this.paramDetail.id},
        getDataUrl: this.$urlList.efb.getPageByDataId,
        tableHeader: [
          {
            field: 'sheetType',
            title: '报表类型',
            width: 120,
            oper: {
              name: 'linkDic',
              type: 'E_ReportFormType',
              clickFun: this.showefbdetail
            }
          },
          {
            field: 'sheetYear',
            title: '报表年份',
            width: 120
          },
          {
            field: 'infRecType',
            title: '信息记录类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_InfRecType'
            }
          },
          {
            field: 'rptDate',
            title: '信息报告日期',
            width: 120,
            slotName: 'rpt'
          },
          {
            field: 'msgDate',
            title: '报文生成时间',
            width: 120
          },
          {
            field: 'reportState',
            title: '报送状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_REPORT_STATE'
            }
          }
        ]
      }
    };
  },
  props: ['paramDetail'],
  watch: {},
  methods: {
    showefbdetail(selectRow) {
      this.paramEdit = true;
      this.paramEdit = {
        title: '02版资产负债表-报送历史详情页',
        dialogTitle: '',
        data: selectRow,
        url: null
      };
    },
    close() {
      this.$emit('closeChild');
    },
    closeChild() {
      this.paramEdit = false;
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>
<style scoped="scoped">
.close_btn{
    float: right;
    margin-right: 30px;
    margin-bottom: 15px;
}
</style>
