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

      <!-- 数据表格 -->
      <el-card class="paddingtop">
        <div>
          <v-table ref="dataTable" :param="paramTable"></v-table>
        </div>
      </el-card>
      <!-- 关闭按钮 -->
      <el-button @click="close()" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </el-dialog>

  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
import historyDetail from './historyDetail';
export default {
  name: 'child',
  components: {
    historyDetail
  },
  mixins: [MinXin],
  data() {
    return {
      paramEdit: false,
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      paramTable: {
        selectionShow:true,
        bussName: 'epb',
        where: {dataId: this.paramDetail.id},
        getDataUrl: this.$urlList.epb.getPageByDataId,
        tableHeader: [{
          // 详情demo
          field: 'infRecType',
          title: '信息记录类型',
          width: 120,
          oper: {
            name: 'linkDic',
            type: 'E_InfRecType',
            clickFun: this.showdetail0
          }
        },
        {
          field: 'rptDateCode',
          title: '报送时点',
          width: 120,
          oper: {
            name: 'dic',
            type: 'E_RptDateCode_P'
          }
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
  watch: {
  },
  methods: {
    // 获取字典方法
    getdataDic() {
      let type = ['E_PleType', 'E_MotgaProptIDType', 'E_ValOrgType', 'E_ImpType'];
      type.forEach((item, index) => {
        this.common.getdic(this.$urlList.common.dic, item);
        // this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    showdetail0(selectRow) {
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
    }
  },
  created() {
    this.getdataDic();
  }
  //  mixins: [http]
};
</script>
<style>
  .close_btn{
    float: right;
    margin-right: 30px;
    margin-bottom: 15px;
  }
</style>
