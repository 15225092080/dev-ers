<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop" v-if="tableShow">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="export_btn" @click="downLoad()">
              <i class="DHCiconfont">&#xe676;</i>导出
            </el-button>
          </li>
        </ul> 
      </div>
      <div>
          <div class="tableName">
              企业征信报送报文情况统计列表
          </div>
          <div class="tabletitle">
              <span>所属机构：{{deptCode}}</span>
              <span>报文生成时间：{{creTimeRange || ''}}</span>
              <span>报表生成时间：{{creTime}}</span>
              <span>操作员：{{operator}}</span>
          </div>
          <table class="talbe tableClass">
                <thead>
                    <tr>
                        <th>报文类型</th>
                        <th>报文名称</th>
                        <th>报文记录数</th>
                        <th>校验错误记录数</th>
                        <th>反馈错误数</th>
                        <th>报文生成时间</th>
                        <th>报文状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) in tableData" :key="i">
                        <td>{{idTypeDic['E_InfRecType'][item.infRecType] }}</td> 
                        <td>{{item.txtFile}}</td>
                        <td>{{item.msgAmount}}</td>
                        <td>{{item.interErrAmount}}</td>
                        <td>{{item.centerErrAmount}}</td>
                        <td>{{formatDate(item.beginTime)}}</td>
                        <td>{{idTypeDic['MSG_STAT'][item.msgStat] }}</td> 
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
      //表格显示隐藏
      tableShow: false,
      //导出路径
      exportUrl: this.$urlList.msgForm.exportUrl,
      // 检索条件的折叠控制
      show: true,
      secondshow: true,
      // 检索条件form表单
      arrList: [
        [
          {type: 'daterange', name: 'search_GTE_LTE_beginTime_DATE_RANGE', value: '', label: '报文生成日期', span: 6}
        ]
      ],
      detailUrl: {
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      idTypeDic: {} // 字典字段
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 获取字典方法
    getdataDic() {
      let type = ['E_InfRecType', 'MSG_STAT'];
      type.forEach((item,index) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    init(formData) {
        this.http.apiPost(this.$urlList.msgForm.getPage,formData).then(res=>{
            if(res.code == '00000001'){
              this.common.MessageBoxalert(res.msg, '消息', '确认', 'error').then(() => {
              });
            }else{
              let resData = JSON.parse(res.comData);
              this.tableData = resData.data;
              // if(this.tableData.length == 0){
              //   this.tableShow = false;
              //   this.common.message(true, '暂无数据', 'warning', '1800', function () {
              //     return false;
              //   });
              // }else{
              //   this.tableShow = true;
              // }
              this.deptCode = resData.deptName;
              let timeStart = resData.msg_time_start === undefined ? " " : resData.msg_time_start;
              let timeEnd = resData.msg_time_end === undefined ? " " : resData.msg_time_end;
              this.creTimeRange = timeStart+'--'+timeEnd;
              this.creTime = resData.rpt_form_time;
              this.operator = resData.operator;
            }
        })
    },
    downLoad(){
      let formData = this.$refs.filter.$refs.formItem.formItem;
      let str = formData['search_GTE_LTE_beginTime_DATE_RANGE'] === "" ? "" : formData['search_GTE_LTE_beginTime_DATE_RANGE'].join(' - ')
      this.common.downLoad(this.$urlList.msgForm.exportUrl,{search_GTE_LTE_beginTime_DATE_RANGE:str})
    },
    searchFun(){
      this.tableShow = true;
      let formData = this.$refs.filter.$refs.formItem.formItem;
      let str = formData['search_GTE_LTE_beginTime_DATE_RANGE'] === "" ? "" : formData['search_GTE_LTE_beginTime_DATE_RANGE'].join(' - ')
      this.getdataDic();
      this.init({search_GTE_LTE_beginTime_DATE_RANGE:str})
    },
    formatDate(value) {  //时间戳转为日期格式
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  created() {
    this.getdataDic();
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
  }
</style>
