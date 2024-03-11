<template>
  <div class="detailData">
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      custom-class="model-dialog el-dialog-m"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <!-- 头部信息 -->
      <div class="tableData tableFirst">
        <!-- <h2 class="title">利润及利润分配表信息</h2> -->
        <h2 class="title" v-text="textShow"></h2>
        <table class="table0">
          <thead>
            <tr>
              <th>批次号</th>
              <th>报文号</th>
              <th>报送状态</th>
              <th>报文生成时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehfeItem.batchNum }}</td>
              <td>{{ this.ehfeItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfeItem.reportState] }}</td>
              <td>{{ this.ehfeItem.msgDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 基础段 -->
      <div class="tableData tableSec" v-if="showTableSec">
        <h3 class="title">基础段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>企业名称</th>
              <th>企业身份标识类型</th>
              <th>企业身份标识号码</th>
              <th>信息报告日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfeItem.infRecType] }}</td>
              <td>{{ this.ehfeItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfeItem.entCertType] }}</td>
              <td>{{ this.ehfeItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfeItem.rptDate) }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>报表年份</th>
              <th>报表类型</th>
              <th>报表类型细分</th>
              <th>客户资料维护机构代码</th>
              <th>报告时点说明代码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehfeItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfeItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfeItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfeItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfeItem.rptDateCode] }}</td>
            </tr>  
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>审计事务所名称</th>
              <th>审计人员名称</th>
              <th>审计时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehfeItem.auditFirmName }}</td>
              <td>{{ this.ehfeItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfeItem.auditTime) }}</td>
            </tr>  
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>2007版利润及利润分配表</h3></td></tr>
            </table>
            <table class="unitCls">
              <tr><td><h4 class="unitCls"><span>单位：</span><i>元</i></h4></td></tr>
            </table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <!-- 左侧表格 -->
              <table class="dataLeft dataTable">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>行次</th>
                    <th>期末值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>一、营业收入</b></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="revOfSal" label-width="0px">
                        <el-input class="inputCls" name="revOfSal" v-model="this.ehfeItem.revOfSal" disabled></el-input>
                      </el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：营业成本</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="cosOfSal" label-width="0px">
                        <el-input class="inputCls" name="cosOfSal" v-model="this.ehfeItem.cosOfSal" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>营业税金及附加</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="busAndOt" label-width="0px">
                        <el-input class="inputCls" name="busAndOt" v-model="this.ehfeItem.busAndOt" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>销售费用</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="selExp" label-width="0px">
                        <el-input class="inputCls" name="selExp" v-model="this.ehfeItem.selExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>管理费用</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="genAndAe" label-width="0px">
                        <el-input class="inputCls" name="genAndAe" v-model="this.ehfeItem.genAndAe" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财务费用</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="finExp" label-width="0px">
                        <el-input class="inputCls" name="finExp" v-model="this.ehfeItem.finExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资产减值损失</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="impLosAss" label-width="0px">
                        <el-input class="inputCls" name="impLosAss" v-model="this.ehfeItem.impLosAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：公允价值变动净收益（损失以“-”号填列）</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="proOrLafcifv" label-width="0px">
                        <el-input class="inputCls" name="proOrLafcifv" v-model="this.ehfeItem.proOrLafcifv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资净收益（损失以“-”号填列）</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="invInc" label-width="0px">
                        <el-input class="inputCls" name="invInc" v-model="this.ehfeItem.invInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：对联营企业和合营企业的投资收益</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="invIncFabace" label-width="0px">
                        <el-input class="inputCls" name="invIncFabace" v-model="this.ehfeItem.invIncFabace" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、营业利润（亏损以“-”号填列）</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="opePro" label-width="0px">
                        <el-input class="inputCls" name="opePro" v-model="this.ehfeItem.opePro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：营业外收入</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="nonOpeInc" label-width="0px">
                        <el-input class="inputCls" name="nonOpeInc" v-model="this.ehfeItem.nonOpeInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：营业外支出</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="nonOpeExp" label-width="0px">
                        <el-input class="inputCls" name="nonOpeExp" v-model="this.ehfeItem.nonOpeExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：非流动资产损失</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="nonCurAss" label-width="0px">
                        <el-input class="inputCls" name="nonCurAss" v-model="this.ehfeItem.nonCurAss" disabled></el-input>
                      </el-form-item>  </td>
                  </tr>
                  <tr>
                    <td><b>三、利润总额（亏损总额以“-”号填列）</b></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="proBefTax" label-width="0px">
                        <el-input class="inputCls" name="proBefTax" v-model="this.ehfeItem.proBefTax" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：所得税费用</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="incTaxExp" label-width="0px">
                        <el-input class="inputCls" name="incTaxExp" v-model="this.ehfeItem.incTaxExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、净利润（净亏损以“-”号填列）</b></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="netPro" label-width="0px">
                        <el-input class="inputCls" name="netPro" v-model="this.ehfeItem.netPro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、每股收益</b></td>
                    <td>18</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>（一）基本每股收益</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="basEarPs" label-width="0px">
                        <el-input class="inputCls" name="basEarPs" v-model="this.ehfeItem.basEarPs" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）稀释每股收益</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="dilEarPs" label-width="0px">
                        <el-input class="inputCls" name="dilEarPs" v-model="this.ehfeItem.dilEarPs" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>

      </div>
      <!-- 整笔删除 -->
      <div class="tableData allDel" v-if="showAllDel">
        <h3 class="title">整笔删除类请求记录</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>企业名称</th>
              <th>企业身份标识类型</th>
              <th>企业身份标识号码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfeItem.infRecType] }}</td>
              <td>{{ this.ehfeItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfeItem.entCertType] }}</td>
              <td>{{ this.ehfeItem.entCertNum }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>报表年份</th>
              <th>报表类型</th>
              <th>报表类型细分</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehfeItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfeItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfeItem.sheetTypeDivide] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-form>
      <!-- 关闭按钮 -->
      <el-button @click="close()" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import http from '@/common/script/http';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      resData: '',
      ehfeItem: {}, // 基础段
      showTableSec:true,
      showTableTab:true, //报表
      showAllDel:false, //整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efe.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '利润及利润分配表信息' // 标题
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    null2str(data) {
      for (let x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ''
          data[x] = '';
        } else {
          if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
              return null2str(z);
            });
          }
          if (typeof (data[x]) === 'object') { // 是json 递归继续处理
            data[x] = null2str(data[x]);
          }
        }
      }
      return data;
    },
    // 获取字典方法
    getdataDic() {
      let type = ['E_REPORT_STATE','E_InfRecType', 'E_InfoIDType2','E_ReportFormType','E_ReportFormdel','E_RptDateCode_EF'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
      delete this.paramEdit.data['stopFlag'];
      delete this.paramEdit.data['lockFlag'];
      this.resData = await this.http.apiPost(this.$urlList.efe.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfeItem = this.resData.EHFE;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehfeItem.infRecType == "624") { //整笔删除
        this.textShow = '利润及利润分配表整笔删除信息';
        this.showAllDel = true;
        this.showTableSec = false;
        this.showTableTab = false;
      }
    },
    formatDate(value) { // 日期格式转为年月日
      let data = '';
      if (value != undefined) {
        data = value.substring(0, 10);
      }
      return data;
    },
    close() {
      this.$emit('closeChild');
    }
  },
  async created() {
    this.getdataDic();
    this.getDataTable();
  }
};
</script>
<style>
    .el-form-item__label{
        padding: 0 5px 0 0;
    }
    .el-form .form-body{
      padding: 0 25px!important;
    }
    .close_btn{
      float: right;
      margin-right: 30px;
      margin-bottom: 15px;
    }
    .table0{
      width:100%;
      border:1px solid #000;
      border-collapse:collapse;
      border-spacing:0;
    }
    .table0 tr:first{
      border-bottom: 1px solid #000;
    }
    .table0 tr th, .table0 tr td{
      border: 1px solid #000;
    }
    .noBorder tr th{
      border-top: 1px solid transparent!important;
      /* border-bottom: 1px solid transparent!important; */
    }
    .detailData{
      padding-bottom: 40px;
    }
    .tableData {
      padding: 0 8px;
      padding-bottom: 20px;
    }
    .tableData h2.title{
      font-size: 18px;
      padding-bottom: 20px;
      text-align: center;
    }
    .tableData h3.title{
      width: 100%;
      padding:8px 0;
      text-align: center;
    }
    .tableData tbody tr td{
      padding-left: 5px;
      text-align: center;
    }

    .classTab{
      padding:0 8px;
      padding-bottom: 40px!important;
    }
    .pleft28{
      padding-left: 28px;
    }
    .tabTitle{
      width: 100%;
      padding:0 8px;
      font-weight: normal;
      text-align: center;
      line-height: 40px;
      background-color: #efe;
      border-bottom: none;
    }
    .tabTitle tr td{
      border-bottom: none;
    }
    .unitCls{
      height: 35px;
      width: 100%;
      line-height: 35px;
      text-align: right;
      font-weight: normal;
      border-bottom: none;
    }
    .unitCls tr td{
      border-bottom: none;
    }
    .unitCls>span{
      display: inline-block;
      text-align: center;
      width: 100px;
    }
    .unitCls>i{
      display: inline-block;
      font-style: normal;
      text-align: center;
      width: 100px;
    }
    
    .dataTable{
      border-collapse: collapse;
    }
    .dataLeft,
    .dataRight{
      width: 100%;
      font-size: 14px;
      font-family: "Microsoft YaHei";
    }
    .dataTable,.dataTable tr th,
    .dataTable tr td {
      height: 41px;
      border:1px solid #000;
    }
    .dataTable thead tr th:nth-child(1){
      width: 38%;
    }
    .dataTable thead tr th:nth-child(2){
      width: 15%;
    }
    .dataTable thead tr th:nth-child(3){
      width: 47%;
    }
    .dataTable tbody tr td{
      height: 41px;
    }
    .dataTable tbody tr td span{
      padding-left: 28px;
    }
    .dataTable tbody tr td .inputCls{
      width: 92%;
    }
    .dataTable tbody tr td input{
      width: 92%;
    }
    .dataTable tbody tr td:nth-child(1){
      padding-left: 5px;
    }
   .dataTable tbody tr td:nth-child(2){
      text-align: center;
    }
    .dataTable tbody tr td:nth-child(3){
      padding-right: 10px;
      text-align: right;
    }

    .dataTable tbody tr td .el-form-item--small.el-form-item{
      margin-top: 4px;
      margin-bottom: 4px;
    }
</style>
