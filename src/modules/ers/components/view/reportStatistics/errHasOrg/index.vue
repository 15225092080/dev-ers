<template>
  <div class="querypage">
    <!-- <v-operation ref="filter" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "100px"></v-operation> -->
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <!-- <span>
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span> -->
        <ul class="icongroup">
          <li>
            <el-button class="export_btn" @click="downLoad()">
              <i class="DHCiconfont">&#xe676;</i>导出Excel
            </el-button>
          </li>
        </ul> 
      </div>
      <div>
          <div class="tableName">
              企业征信报送分机构数据错误信息统计
          </div>
          <div class="tabletitle">
              <span>所属机构：{{deptCode}}</span>
              <span class="span2">报表生成时间：{{creTime}}</span>
              <span class="span3">操作员：{{operator}}</span>
          </div>
          <table class="talbe tableClass">
                <thead>
                    <tr>
                        <th>所属机构</th>
                        <th>错误类型</th>
                        <th>错误段标</th>
                        <th>错误字段</th>
                        <th>错误编码</th>
                        <th>错误原因</th>
                        <th>错误记录数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in tableData" :key="i">
                        <td>{{item.deptCode}}</td>
                        <td>{{item.errStage}}</td>
                        <td>{{item.errTab}}</td>
                        <td>{{item.errCol}}</td>
                        <td>{{item.fbCode}}</td>
                        <td>{{item.reason}}</td>
                        <td>{{item.sum}}</td>
                    </tr>
                </tbody>
            </table>
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    //vEdit, vDetail
  },
  inject: ['reload'],
  data() {
    return {
      deptCode:'',
      creTimeRange:'',
      creTime:'',
      operator:'',
      tableData:'',
      //导出路径
      exportUrl: this.$urlList.hasorg.exportUrl,
      // 检索条件的折叠控制
      show: true,
      secondshow: true,
      // 检索条件form表单
      // arrList: [
      //   [
      //     {type: 'daterange', name: 'search_GTE_LTE_beginTime_DATE_RANGE', value: '', label: '报文生成日期', span: 6}
      //   ]
      // ],
      detailUrl: {
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    init() {
        this.http.apiPost(this.$urlList.hasorg.getPage).then(res=>{
            this.tableData = res.list;
            this.deptCode = res.operatorDeptCode;
            this.creTime = res.createTime;
            this.operator = res.operator;
        })
    },
    downLoad(){
      //let formData = this.$refs.filter.$refs.formItem.formItem;
      this.common.downLoad(this.$urlList.hasorg.exportUrl,"")
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>

<style scoped="scoped">
  .tableName{
    border:1px solid #ddd;
    text-align: center;
    height: 35px;
    line-height: 35px;
  }
  .tabletitle{
    border:1px solid #ddd;
    border-top:none;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .tabletitle span{
    margin-left:20px;
  }
  .span2{
    margin-left: 260px !important;
  }
  .span3{
    float: right;
    margin-right: 30px;
  }
  .table td,.tableClass td{
    border: 1px solid #ccc;
  }
  .tableClass td{
      font-size: 12px;
      padding: 5px 10px;
  }
  .table td,.table th{
      font-size: 12px;
      padding: 5px 10px;
  }
  .tableClass{
    border-radius: 10px;
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background-color: #fff;
    color: #666;
    margin: 10px 0;
    margin-top:0px;
  }
  .tableClass thead th{
      font-size: 14px;
      color: #666;
      background-color: #ECEDF2;
      height:20px;
      line-height: 20px;
      text-align: left;
      padding: 5px 10px;
      border-left:1px solid #ddd;
      border-right:1px solid #ddd;
      width: 50px;
  }
</style>
