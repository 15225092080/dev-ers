<template>
  <div class="querypage" v-loading="loading"
    element-loading-text="处理中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-operation ref="filter" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop" v-if="showHeader">
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
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
        <div v-if="tableData">
            <table class="table tableTitle">
                <tr><td colspan="4"><h2>企业征信报送未结清数据业务量统计</h2></td></tr>
                <tr>
                    <td>所属机构: {{deptCodeHead}}</td>
                    <td>截止时间: {{tableData.header.date}}</td>
                    <td>报表生成时间: {{tableData.header.createTime}}</td>
                    <td>操作员: {{tableData.header.operator}}</td>
                </tr>
            </table>
            <table class="table tableClass">
                <thead>
                    <tr>
                        <th>账户类型</th>
                        <th>业务种类大类</th>
                        <th>客户数</th>
                        <th>业务笔数</th>
                        <th>金额</th>
                        <th>余额</th>
                    </tr>
                </thead>
                <tbody v-for="(data,index) in formatData(tableData)" :key="index">
                    <!-- {{data}} -->
                    <tr v-for="(item,i) in data" :key="i">
                        <td v-if="i == 0" :rowspan="item.rowspan">{{item.acctType}}</td>
                        <td>{{item.busiLines}}</td>
                        <td>{{item.custId}}</td>
                        <td>{{item.bussNum}}</td>
                        <td>{{item.acctCredLine | formatPrice}}</td>
                        <td>{{item.amt | formatPrice}}</td>
                    </tr>
                </tbody>
                <tbody v-if="tableData.total">
                    <tr v-for="total in [tableData.total]" :key="total.acctCredLine">
                        <td>{{total.acctType}}</td>
                        <td>{{total.busiDtlLines}}</td>
                        <td>{{total.custId}}</td>
                        <td>{{total.bussNum}}</td>
                        <td>{{total.acctCredLine | formatPrice}}</td>
                        <td>{{total.amt | formatPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </el-card>
    <!-- 新增、编辑弹出框 -->
      <!-- <v-edit v-if="visibleEdit" :paramEdit="paramEdit" ref="child" :vis.sync="visibleEdit"></v-edit> -->
    <!-- 详情弹出框 -->
      <!-- <v-detail v-if="visible" ref="childDetails" :paramDetail="paramDetail" :vis.sync="visible"></v-detail> -->
  </div>
</template>

<script>
//import vEdit from './model/edit';
//import vDetail from './model/detail';
// import axios from "axios";
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
      showHeader:false,
      loading: false,
      // 检索条件form表单
      tableData:'',
      deptCodeHead:'',
      arrList: [
        [
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name
                ;
              }},
            name: 'search_IN_deptCode',
            value: '',
            label: '所属机构',
            span: 6
          },
          {type: 'date', name: 'search_deadline_DATE', value:'', label: '截止日期', span: 6}
        ]
      ]
    };
  },
  watch: {
  },
  computed: {
    formatData() {
        return function(data) {
            let obj = {};
            let sys = sessionStorage['systemId'];
            for(let k in data) {
                let objData = data[k][k+'Type'];
                if(k != 'header' && k != 'total') {
                    if(k == 'loan' || k == 'guar') {
                        for(let key in objData) {
                            objData[key][0].rowspan = objData[key].length;
                            objData[key].rowspan = objData[key].length;
                            for(let i = 0; i < objData[key].length; i++) {
                              objData[key][i]['acctType'] = JSON.parse(sessionStorage[sys + '_E_AcctType_EG'])[objData[key][i]['acctType']] || JSON.parse(sessionStorage[sys + '_E_AcctType_EL'])[objData[key][i]['acctType']] || objData[key][i]['acctType'] ;
                              if(objData[key][i]['busiLines']=='null') {
                                  objData[key][i]['busiLines'] = '';
                              }else {
                                objData[key][i]['busiLines'] = JSON.parse(sessionStorage[sys + '_E_BusiLines_EL'])[objData[key][i]['busiLines']]
                                || JSON.parse(sessionStorage[sys + '_E_BusiLines_EG'])[objData[key][i]['busiLines']] || objData[key][i]['busiLines'] ;
                              }
                            }
                            obj[key] = objData[key]
                        }
                    }else {
                        objData[0].rowspan = objData.length;
                        for(let j = 0; j < objData.length; j++) {
                            objData[j]['busiLines'] = JSON.parse(sessionStorage[sys + '_E_GuarType'])[objData[j]['busiLines']] || JSON.parse(sessionStorage[sys + '_E_GuarType'])[objData[j]['busiLines']] || objData[j]['busiLines'] ;
                        }
                        obj[k] = objData
                    }
                }else if(k == 'header') {
                  this.deptCodeHead = JSON.parse(sessionStorage[sys + '_deptCode'])[data.header.deptCode]
                }
            }
            return obj;
            // for(let k in data){
            //     if(k == 'loanType' || k == 'guarType'){

            //     }else{
            //         data[k][0]['rowspan'] = data[k].length;
            //         return data[k];
            //     }
            // }
        }
    }
  },
  methods: {
    init(formData) {
      // 加载动画显示
      this.loading = true;
        this.http.apiPost(this.$urlList.businessVolume.findBusinessVolumeDate,formData).then(res => {
            if(res.code=='2') {
              // 加载动画关闭
              this.loading = false;
              this.tableData = res.objectData;
            }else if(res.code=='0'||res.code=='1') {
              this.msgTimer();
            }else {
                this.loading = false;
              // 弹窗提示语
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'warning',
                  duration: '5000'
                });
            }
        })
    },
    // 5秒定时请求接口刷新数据
    msgTimer() {
      let _this = this;
      setTimeout(function () {
        let formData = _this.$refs.filter.$refs.formItem.formItem;
        _this.init(formData);
      }, 5000);
    },
    downLoad() {
      let formData = this.$refs.filter.$refs.formItem.formItem;
      this.common.downLoad(this.$urlList.businessVolume.excel,formData)
    },
    searchFun() {
        let formData = this.$refs.filter.$refs.formItem.formItem;
        this.init(formData);
        this.showHeader = true;
    }
  },
  filters: {
      formatPrice(num) {
          if(!num) {
              return '--';
          }
          let sign,cents;
            num = num.replace(/\$|\,/g,'');
            if(isNaN(num))
            num = "0";
            sign = (num == (num = Math.abs(num)));
            num = Math.floor(num*10+0.50000000001);
            cents = num%10;
            num = Math.floor(num/10).toString();
            for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3));
            return (((sign)?'':'-') + num );
      }
  },
  created() {
      let url = this.$urlList.common.dic;
      this.common.getdic(url, 'E_AcctType_EG');
      this.common.getdic(url, 'E_AcctType_EL');
      this.common.getdic(url, 'E_BusiLines_EL');
      this.common.getdic(url, 'E_BusiLines_EG');
      this.common.getdic(url, 'E_GuarType');
      this.common.getdic(this.$urlList.common.getDeptCodeName, 'deptCode');
  },
  mounted() {
    // this.init();
  }
};
</script>

<style scoped="scoped">
h2{
    font-weight: 400
}
.table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
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
.tableTitle {
    margin-bottom: 0px;
    border-bottom: none;
    text-align: center;
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
