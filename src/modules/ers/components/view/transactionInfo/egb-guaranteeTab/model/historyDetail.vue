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
              <td>{{ this.ehgbItem.batchNum }}</td>
              <td>{{ this.ehgbItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehgbItem.reportState] }}</td>
              <td>{{ this.ehgbItem.msgDate }}</td>
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
              <th>债务人名称</th>
              <th>债务人身份标识类型</th>
              <th>债务人身份标识号码</th>
              <th>信息报告日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehgbItem.infRecType] }}</td>
              <td>{{ this.ehgbItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehgbItem.entCertType] }}</td>
              <td>{{ this.ehgbItem.entCertNum }}</td>
              <td>{{ this.ehgbItem.rptDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>账户类型</th>
              <th>账户标识码</th>
              <th>报告时点说明代码</th>
              <th>业务管理机构代码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_AcctType_EG'][this.ehgbItem.acctType] }}</td>
              <td>{{ this.ehgbItem.acctCode }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EG'][this.ehgbItem.rptDateCode] }}</td>
              <td>{{ this.ehgbItem.mngmtOrgCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 按段更正 -->
      <div class="tableData amend" v-if="showAmend">
        <h3 class="title">基础段信息</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待更正业务标识码</th>
              <th>信息报告日期</th>
              <th>账户类型</th>
              <th>待更正段段标</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehgbItem.infRecType] }}</td>
              <td>{{ this.ehgbItem.acctCode }}</td>
              <td>{{ this.ehgbItem.rptDate }}</td>
              <td>{{ this.idTypeDic['E_AcctType_EG'][this.ehgbItem.acctType] }}</td>
              <td>{{ this.idTypeDic['E_SgmtCode_EG'][this.ehgbItem.mdfcSgmtCode] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 按段删除 -->
      <div class="tableData del" v-if="showDel">
        <h3 class="title">按段删除类请求记录</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待删除业务标识码</th>
              <th>待删除段段标</th>
              <th>待删除起始日期</th>
              <th>待删除结束日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehgbItem.infRecType] }}</td>
              <td>{{ this.ehgbItem.acctCode}}</td>
              <td>{{ this.idTypeDic['E_SgmtCode_EG'][this.ehgbItem.delSgmtCode] }}</td>
              <td>{{ this.ehgbItem.delStartDate }}</td>
              <td>{{ this.ehgbItem.delEndDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 整笔删除 -->
      <div class="tableData allDel" v-if="showAllDel">
        <h3 class="title">整笔删除类请求记录</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待删除业务标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehgbItem.infRecType] }}</td>
              <td>{{ this.ehgbItem.acctCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 标识变更 -->
      <div class="tableData change" v-if="showChange">
        <h3 class="title">企业担保账户标识变更请求</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>原业务标识码</th>
              <th>新业务标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehgbItem.infRecType] }}</td>
              <td>{{ this.ehgbItem.odBnesId }}</td>
              <td>{{ this.ehgbItem.nwBnesId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 基本信息段 -->
      <div class="tableData tableThird" v-if="showTableThird">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>担保业务大类</th>
              <th>担保业务种类细分</th>
              <th>开户日期</th>
              <th>担保金额</th>
              <th>币种</th>
              <th>到期日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_BusiLines_EG'][this.ehgcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>  <!-- 字典需要重新处理 -->
              <td>{{ this.ehgcItem.openDate }}</td>
              <td>{{ this.ehgcItem.guarAmt }}</td>
              <td>{{ this.idTypeDic['E_Cy'][this.ehgcItem.cy] }}</td>
              <td>{{ this.ehgcItem.dueDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>反担保方式</th>
              <th>其他还款保证方式</th>
              <th>保证金百分比</th>
              <th>担保合同文本编号</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_GuarMode_EG'][this.ehgcItem.guarMode] }}</td>
              <td>{{ this.idTypeDic['E_OthRepyGuarWay_EG'][this.ehgcItem.othRepyGuarWay] }}</td>
              <td>{{ this.ehgcItem.secDep }}</td>
              <td>{{ this.ehgcItem.ctrctTxtCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 相关还款责任人信息段 -->
      <div class="tableData tableFourth" v-if="showTableFourth">
        <h3 class="title">相关还款责任人段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>责任人个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehgeItem.perLiableNum }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>身份类别</th>
              <th>责任人名称</th>
              <th>责任人身份标识类型</th>
              <th>责任人身份标识号码</th>
              <th>还款责任人类型</th>
              <th>还款责任金额</th>
              <th>联保标志</th>
              <th>保证合同编号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehgeItem.List" :key="item.index">
              <td>{{ idTypeDic['E_InfoIDType'][item.infoIdType] }}</td>
              <td>{{ item.arlpName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][item.arlpCertType] || idTypeDic['E_InfoIDType1'][item.arlpCertType] }}</td> <!-- 关联字典 -->
              <td>{{ item.arlpCertNum }}</td>
              <td>{{ idTypeDic['E_ArlpType_EG'][item.arlpType] }}</td>
              <td>{{ item.arlpAmt }}</td>
              <td>{{ idTypeDic['E_WartySign_EG'][item.guarType] }}</td>
              <td>{{ item.maxGuarMcc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 在保责任信息段 -->
      <div class="tableData tableFifth" v-if="showTableFifth">
        <h3 class="title">在保责任信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>账户状态</th>
              <th>在保金额</th>
              <th>余额变化日期</th>
              <th>五级分类</th>
              <th>五级分类认定日期</th>
              <th>风险敞口</th>
              <th>代偿（垫款）标志</th>
              <th>账户关闭日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.idTypeDic['E_AcctStatus_EG'][this.ehgdItem.acctStatus] }}</td>
              <td>{{ this.ehgdItem.loanAmt }}</td>
              <td>{{ this.ehgdItem.repayPrd }}</td>
              <td>{{ this.idTypeDic['E_FiveCate'][this.ehgdItem.fiveCate] }}</td>
              <td>{{ this.ehgdItem.fiveCateAdjDate }}</td>
              <td>{{ this.ehgdItem.riEx }}</td>
              <td>{{ this.idTypeDic['E_CompAdvFlag'][this.ehgdItem.compAdvFlag] }}</td>
              <td>{{ this.ehgdItem.closeDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 授信额度信息段 -->
      <div class="tableData tablesixth" v-if="showTableSixth">
        <h3 class="title">授信额度信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>授信协议标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehggItem.mcc }}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
      str: '', // 担保业务种类细分字典
      // 提交的url
      url: '',
      resData: '',
      ehgbItem: {}, // 基础段
      showTableSec: true,
      ehgcItem: {}, // 基本信息段
      showTableThird: true,
      ehgdItem: {}, // 在保责任信息段
      showTableFifth: true,
      ehgeItem: {}, // 相关还款责任人段
      showTableFourth: true,
      ehggItem: {}, // 授信额度信息段
      showTableSixth: true,
      showChange: false, // 标识变更
      showAllDel: false, // 整笔删除
      showDel: false, // 按段删除
      showAmend: false, // 按段更正
      textShow: '企业担保账户信息', // 标题
      idTypeDic: {} // 字典字段
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
      let type = ['E_InfoIDType2', 'E_InfoIDType1', 'E_REPORT_STATE', 'E_InfRecType', 'E_AcctType_EG', 'E_BusiLines_EG', 'E_GuarMode_EG', 'E_Cy',
      'E_OthRepyGuarWay_EG', 'E_AcctStatus_EG', 'E_FiveCate', 'E_CompAdvFlag', 'E_InfoIDType', 'E_ArlpType_EG', 'E_WartySign_EG', 'E_RptDateCode_EG', 'E_SgmtCode_EG'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
      delete this.paramEdit.data.stopFlag;
      delete this.paramEdit.data.lockFlag;
      this.resData = await this.http.apiPost(this.$urlList.egb.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehgbItem = this.resData.ehgb;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehgbItem.infRecType == '441') { // 标识变更
        this.textShow = '企业担保交易账户标识变更信息';
        this.showChange = true;
        this.showTableSec = false;
        this.showTableThird = false;
        this.showTableFifth = false;
        this.showTableFourth = false;
        this.showTableSixth = false;
      } else if (this.ehgbItem.infRecType == '442') { // 按段更正
        this.textShow = '企业担保交易按段更正信息';
        this.showAmend = true;
        this.showTableSec = false;
        // this.showTableThird = false;
        // this.showTableFifth = false;
        // this.showTableSixth = false;
        if (this.resData.phge == '' || (this.resData.phge != null && this.resData.phge.List == '')) {
          this.showTableFourth = false;
        }
      } else if (this.ehgbItem.infRecType == '443') { // 按段删除
        this.textShow = '企业担保交易按段删除信息';
        this.showDel = true;
        this.showTableSec = false;
        this.showTableThird = false;
        this.showTableFifth = false;
        this.showTableFourth = false;
        this.showTableSixth = false;
      } else if (this.ehgbItem.infRecType == '444') { // 整笔删除
        this.textShow = '企业担保交易整笔删除信息';
        this.showAllDel = true;
        this.showTableSec = false;
        this.showTableThird = false;
        this.showTableFifth = false;
        this.showTableFourth = false;
        this.showTableSixth = false;
      }
      // 基本信息段
      this.ehgcItem = this.resData.ehgc;
      if (this.ehgcItem == null || this.ehgcItem == '' || this.ehgcItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableThird = false;
      } else {
        // 获取担保业务种类细分
        let sys = sessionStorage.getItem('systemId');
        this.common.getdic(this.$urlList.common.dic, 'E_BusiDtilLines_EG_' + this.ehgcItem.busiLines, () => {
          this.str = JSON.parse(sessionStorage[sys + '_E_BusiDtilLines_EG_' + this.ehgcItem.busiLines])[this.ehgcItem.busiDtilLines];
        });
      }
      // 在保责任信息段
      this.ehgdItem = this.resData.ehgd;
      if (this.ehgdItem == null || this.ehgdItem == '' || this.ehgdItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableFifth = false;
      }
      // 相关还款责任人段
      this.ehgeItem = this.resData.ehge;
      if (this.ehgeItem == null || this.ehgeItem == '' || this.ehgeItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableFourth = false;
      }
      // 授信额度信息段
      this.ehggItem = this.resData.ehgg;
      if (this.ehggItem == null || this.ehggItem == '' || this.ehggItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableSixth = false;
      }
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
    }
</style>
