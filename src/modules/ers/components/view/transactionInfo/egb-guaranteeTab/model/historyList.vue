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
            <div slot="sgmtCode" slot-scope="data">
               <span>
                  <span v-if="data.data.row.mdfcSgmtCode == null && data.data.row.delSgmtCode == null"></span>
                  <span v-else-if="data.data.row.mdfcSgmtCode == null">{{idTypeDic['E_SgmtCode_EG'][data.data.row.delSgmtCode]}}</span>
                  <span v-else-if="data.data.row.delSgmtCode == null">{{idTypeDic['E_SgmtCode_EG'][data.data.row.mdfcSgmtCode]}}</span>
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
      idTypeDic: {}, // 字典字段
      paramTable: {
        selectionShow:true,
        bussName: 'egb',
        where: {dataId: this.paramDetail.id},
        getDataUrl: this.$urlList.egb.getPageByDataId,
        tableHeader: [
          {
            field: 'infRecType',
            title: '信息记录类型',
            width: 120,
            oper: {
              name: 'linkDic',
              type: 'E_InfRecType',
              clickFun: this.showegbdetail
            }
          },
          {
            field: 'rptDateCode',
            title: '报送时点',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_RptDateCode_EG'
            }
          },
          {
            field: 'mdfcSgmtCode',
            title: '操作段标',
            width: 120,
            slotName: 'sgmtCode'
            // oper: {
            //   name: 'dic',
            //   type: 'E_SgmtCode_EG'
            // }
          },
          {
            field: 'rptDate',
            title: '信息报告日期',
            width: 120
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
    // 获取字典方法
    getdataDic() {
      let type = ['E_SgmtCode_EG', 'E_OthRepyGuarWay_EG', 'E_CompAdvFlag', 'E_ArlpType_EG', 'E_WartySign_EG', 'E_GuarMode_EG'];
      type.forEach((item, index) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    showegbdetail(selectRow) {
      this.paramEdit = true;
      this.paramEdit = {
        title: '',
        dialogTitle: '报送历史详情页',
        data: selectRow,
        url: null
      };
    },
    close() {
      this.$emit('closeChild');
    },
    closeChild() {
      this.paramEdit = false;
      this.$refs.dataTable.getTableData();
    }
  },
  created() {
    this.getdataDic();
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
