<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>文件列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary"  @click="exportBtn(exportUrl)">
              <i class="DHCiconfont">&#xe6c0;</i>历史文件下载
            </el-button>
          </li>
          <li>
            <el-button type="primary"  @click="hisShow">
              <i class="DHCiconfont">&#xe6c0;</i>新文件导出
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable" :param="paramTable"></v-table>
      </div>
    </el-card>

    <!-- 历史详情弹出框 -->
      <v-hisDetail v-if="visibleHis" ref="childDetails" :paramHisDetail="paramHisDetail" :vis.sync="visibleHis"></v-hisDetail>
  </div>
</template>

<script>
import vHisDetail from './model/hisDetail';
import MinXin from '@/common/script/mixin';
export default {
  name: '',
  mixins: [MinXin],
  components: {
    vHisDetail
  },
  inject: ['reload'],
  data() {
    return {
      exportUrl: this.$urlList.dataCheck.downloadModel,
      // 编辑及新增弹框的显隐控制
      visibleHis:false,
      // 弹框种类名
      title: '',
      // 判断弹框为新增还是编辑
      operation: '',
      // 详情
      paramHisDetail: {
        title: '',
        dialogTitle: '',
        data: {}
      },
      // 检索条件form表单
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_fileName', value: '', label: '文件名', span: 12},
          {type: 'date', name: 'search_EQ_endDate_DATE', value: '', label: '截止日期', span: 12}
        ]
      ],
      detailUrl: {
       // isTime: 'search_GTE_LTE_operateTime_DATE_RANGE',
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      // 列表表头
      paramTable: {
        selectionShow:false,
        showButton:false,
        rowClickFun:this.rowClickFun,
        bussName: 'dataCheck',
        tableHeader: [
          {
            field: 'fileName',
            title: '文件名',
            width: 250
          },
          {
            field: 'totalNum',
            title: '数据总数',
            width: 180
          },
          {
            field: 'endDate',
            title: '截止日期',
            width: 220
          },
          {
            field: 'orgEntity',
            title: '总部机构代码',
            width: 200
          },
          {
            field: 'operator',
            title: '操作员',
            width: 180
          }
        ]
      }
    };
  },
  watch: {
  },
  methods: {
    hisShow(){
      this.visibleHis = true;
    },
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
    }
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {
  }
};
</script>

<style scoped="scoped">
.el-button--primary{
  height:32px !important;
  line-height: 17px !important;
}
.el-button--danger{
  height:32px !important;
  line-height: 17px !important;
}
</style>
