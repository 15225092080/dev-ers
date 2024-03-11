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
        <!-- <h2 class="title">事业单位收入支出表信息</h2> -->
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
              <td>{{ this.ehfiItem.batchNum }}</td>
              <td>{{ this.ehfiItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfiItem.reportState] }}</td>
              <td>{{ this.ehfiItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfiItem.infRecType] }}</td>
              <td>{{ this.ehfiItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfiItem.entCertType] }}</td>
              <td>{{ this.ehfiItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfiItem.rptDate) }}</td>
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
              <td>{{ this.ehfiItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfiItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfiItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfiItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfiItem.rptDateCode] }}</td>
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
              <td>{{ this.ehfiItem.auditFirmName }}</td>
              <td>{{ this.ehfiItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfiItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>事业单位收入支出表</h3></td></tr>
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
                    <td><b>一、本期財政补助结转结余</b></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="curFinScob" label-width="0px">
                        <el-input class="inputCls" name="curFinScob" v-model="this.ehfiItem.curFinScob" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政补助收入</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="finSubRev" label-width="0px">
                        <el-input class="inputCls" name="finSubRev" v-model="this.ehfiItem.finSubRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：事业支出（财政补助支出）</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="undExpFse" label-width="0px">
                        <el-input class="inputCls" name="undExpFse" v-model="this.ehfiItem.undExpFse" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、本期事业结转结余</b></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="curUndCob" label-width="0px">
                        <el-input class="inputCls" name="curUndCob" v-model="this.ehfiItem.curUndCob" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（一）事业类收入</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="undClaRev" label-width="0px">
                        <el-input class="inputCls" name="undClaRev" v-model="this.ehfiItem.undClaRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>1.事业收入</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="undRev" label-width="0px">
                        <el-input class="inputCls" name="undRev" v-model="this.ehfiItem.undRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>2.上级补助收入</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="supSubRev" label-width="0px">
                        <el-input class="inputCls" name="supSubRev" v-model="this.ehfiItem.supSubRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>3.附属单位上缴收入</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="revTurObsu" label-width="0px">
                        <el-input class="inputCls" name="revTurObsu" v-model="this.ehfiItem.revTurObsu" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>4.其他收入</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="othRev" label-width="0px">
                        <el-input class="inputCls" name="othRev" v-model="this.ehfiItem.othRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：捐赠收入</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="donInc" label-width="0px">
                        <el-input class="inputCls" name="donInc" v-model="this.ehfiItem.donInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（二）事业类支出</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="undClaExp" label-width="0px">
                        <el-input class="inputCls" name="undClaExp" v-model="this.ehfiItem.undClaExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>1.事业支出（非财政补助支出）</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="undExpNfse" label-width="0px">
                        <el-input class="inputCls" name="undExpNfse" v-model="this.ehfiItem.undExpNfse" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>2.上缴上级支出</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="payToTha" label-width="0px">
                        <el-input class="inputCls" name="payToTha" v-model="this.ehfiItem.payToTha" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>3.对附属单位补助支出</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="graToTha" label-width="0px">
                        <el-input class="inputCls" name="graToTha" v-model="this.ehfiItem.graToTha" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>4.其他支出</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="othExp" label-width="0px">
                        <el-input class="inputCls" name="othExp" v-model="this.ehfiItem.othExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、本期经营结余</b></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="curOpeBal" label-width="0px">
                        <el-input class="inputCls" name="curOpeBal" v-model="this.ehfiItem.curOpeBal" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营收入</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="opeRev" label-width="0px">
                        <el-input class="inputCls" name="opeRev" v-model="this.ehfiItem.opeRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：经营支出</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="opeExp" label-width="0px">
                        <el-input class="inputCls" name="opeExp" v-model="this.ehfiItem.opeExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、弥补以前年度亏损后的经营结余</b></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="opeBalMufotpyol" label-width="0px">
                        <el-input class="inputCls" name="opeBalMufotpyol" v-model="this.ehfiItem.opeBalMufotpyol" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、本年非财政补助结转结余</b></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="nonFinScobty" label-width="0px">
                        <el-input class="inputCls" name="nonFinScobty" v-model="this.ehfiItem.nonFinScobty" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：非财政补助结转</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="nonFinAco" label-width="0px">
                        <el-input class="inputCls" name="nonFinAco" v-model="this.ehfiItem.nonFinAco" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>六、本年非财政补助结余</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="nonFinAbty" label-width="0px">
                        <el-input class="inputCls" name="nonFinAbty" v-model="this.ehfiItem.nonFinAbty" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：应缴企业所得税</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="entIncTp" label-width="0px">
                        <el-input class="inputCls" name="entIncTp" v-model="this.ehfiItem.entIncTp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：提取专用基金</span></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="speFunTe" label-width="0px">
                        <el-input class="inputCls" name="speFunTe" v-model="this.ehfiItem.speFunTe" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>七、转入事业基金</b></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="pubFunTi" label-width="0px">
                        <el-input class="inputCls" name="pubFunTi" v-model="this.ehfiItem.pubFunTi" disabled></el-input>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfiItem.infRecType] }}</td>
              <td>{{ this.ehfiItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfiItem.entCertType] }}</td>
              <td>{{ this.ehfiItem.entCertNum }}</td>
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
              <td>{{ this.ehfiItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfiItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfiItem.sheetTypeDivide] }}</td>
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
      ehfiItem: {}, // 基础段
      showTableSec:true,
      showTableTab:true, //报表
      showAllDel:false, //整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efi.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '事业单位收入支出表信息' // 标题
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
      this.resData = await this.http.apiPost(this.$urlList.efi.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfiItem = this.resData.EHFI;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehfiItem.infRecType == '654') { // 整笔删除
        this.textShow = '事业单位收入支出表整笔删除信息';
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
      padding-bottom: 40px!important;
    }
    .pleft28{
      padding-left: 28px;
    }
    .tabTitle{
      width: 100%;
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
