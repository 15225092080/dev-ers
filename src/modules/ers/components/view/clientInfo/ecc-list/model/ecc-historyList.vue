<template>
  <div class="querypage">
    <el-dialog
      :title="eccHis.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      custom-class="model-dialog el-dialog-m"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ eccHis.dialogTitle + eccHis.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <el-card class="paddingtop">
        <div>
          <v-table ref="dataTable" :param="paramTable"></v-table>
        </div>
      </el-card>
      <el-button @click="close()" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </el-dialog>
    <eccHisDetail v-if="eccHisDetail" :eccHisDetails="eccHisDetails" @closeChilds="closeChilds" ref="eccHisDetail"  :vis.sync="eccHisDetail"></eccHisDetail>
    <router-view></router-view>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
import eccHisDetail from './ecc-historyDetail';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {eccHisDetail},
  inject: ['reload'],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      eccHisDetails: {},
      eccHisDetail: false,
      // 表单赋值接口（编辑，详情用的较多）
      // findById: {
      //   url: this.$urlList.pbb.getValUrl, // 接口
      //   param: {id: this.paramDetail.id} // 参数
      // },
      detailUrl: {
        delUrl: this.$urlList.ecc['delete'],
        paramDataId: 'id', // 字段名
        id: 'custId', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      selected_row: '',
      paramTable: {
        selectionShow:true,
        bussName: 'ecc',
        where: {dataId: this.eccHis.id},
        getDataUrl: this.$urlList.ecc.getPageByDataId,
        tableHeader: [
          {
            field: 'entName',
            title: 'A企业名称',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showHisDetail
            }
          },
          {
            field: 'entCertType',
            title: 'A企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_InfoIDType2'
            }
          },
          {
            field: 'entCertNum',
            title: 'A企业身份标识号码',
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
  props: ['eccHis'],
  watch: {},
  methods: {
    showHisDetail(selectRow) {
      this.eccHisDetail = true;
      this.eccHisDetails = {
        title: '',
        dialogTitle: '报送历史详情',
        data: selectRow,
        url: null
      };
    },
    closeChilds() {
      this.eccHisDetail = false;
    },
    close() {
      this.$emit('closeChild');
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
