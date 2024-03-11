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
              <td>{{ this.ehpbItem.batchNum }}</td>
              <td>{{ this.ehpbItem.msgNum }}</td>
              <td>{{ idTypeDic['E_REPORT_STATE'][this.ehpbItem.reportState] }}</td>
              <td>{{ this.ehpbItem.msgDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 整笔删除 -->
      <div class="tableData allDel" v-if="showAllDel">
        <h2 class="title">整笔删除类请求记录</h2>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待删除业务标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehpbItem.infRecType] }}</td>
              <td>{{ this.ehpbItem.ccc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 标识变更 -->
      <div class="tableData change" v-if="showChange">
        <h2 class="title">抵（质）押账户标识变更请求</h2>
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
              <td>{{ idTypeDic['E_InfRecType'][this.ehpbItem.infRecType] }}</td>
              <td>{{ this.ehpbItem.odBnesId }}</td>
              <td>{{ this.ehpbItem.nwBnesId }}</td>
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
              <th>债务人身份类别</th>
              <th>债务人名称</th>
              <th>债务人身份标识类型</th>
              <th>债务人身份标识号码</th>
              <th>信息报告日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehpbItem.infRecType] }}</td>
              <td>{{ idTypeDic['E_InfoIDType'][this.ehpbItem.infOldType] }}</td>
              <td>{{ this.ehpbItem.entName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][this.ehpbItem.entCertType] }}</td>
              <td>{{ this.ehpbItem.entCertNum }}</td>
              <td>{{ this.ehpbItem.rptDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>抵（质）押合同标识码</th>
              <th>报告时点说明代码</th>
              <th>业务管理机构代码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehpbItem.ccc }}</td>
              <td>{{ idTypeDic['E_RptDateCode_P'][this.ehpbItem.rptDateCode] }}</td>
              <td>{{ this.ehpbItem.mngmtOrgCode }}</td>
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
              <th>合同类型</th>
              <th>担保金额</th>
              <th>币种</th>
              <th>抵（质）押合同生效日期</th>
              <th>抵（质）押合同到期日期</th>
              <th>最高额担保标志</th>
              <th>抵（质）押合同状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_GuarType'][this.ehpbItem.guarType] }}</td>
              <td>{{ this.ehpbItem.ccAmt }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehpbItem.cy] }}</td>
              <td>{{ this.ehpbItem.ccvalDate }}</td>
              <td>{{ this.ehpbItem.ccexpDate }}</td>
              <td>{{ idTypeDic['E_MaxGuar'][this.ehpbItem.maxGuar] }}</td>
              <td>{{ idTypeDic['E_CcStatus'][this.ehpbItem.ccStatus] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 其他债务人信息段 -->
      <div class="tableData tableFourth" v-if="showTableFourth">
        <h3 class="title">其他债务人信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>其他债务人个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehpdItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>身份类别</th>
              <th>其他债务人名称</th>
              <th>其他债务人身份标识类型</th>
              <th>其他债务人身份标识号码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehpdItem" :key="item.index">
              <td>{{ idTypeDic['E_InfoIDType'][item.infOldType] }}</td>
              <td>{{ item.guarName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][item.guarCertType] || idTypeDic['E_InfoIDType1'][item.guarCertType] }}</td>
              <td>{{ item.guarCertNum }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 抵押物信息段 -->
      <div class="tableData tableFiveth" v-if="showTableFifth">
        <h3 class="title">抵押物信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>抵押物个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehpeItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>抵押物种类</th>
              <th>抵押物识别号类型</th>
              <th>抵押物唯一识别号</th>
              <th>抵押物位置所在地行政区划</th>
              <th>抵押物评估价值</th>
              <th>币种</th>
              <th>评估机构类型</th>
              <th>抵押物评估日期</th>
              <th>抵押人身份类别</th>
              <th>抵押人名称</th>
              <th>抵押人身份标识类型</th>
              <th>抵押人身份标识号码</th>
              <th>抵押物说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehpeItem" :key="item.index">
              <td>{{ idTypeDic['E_PleType'][item.pleType]  }}</td>
              <td>{{ idTypeDic['E_MotgaProptIDType'][item.motgaProptIdType] }}</td>
              <td>{{ item.pleCertId }}</td>
              <td v-text="formatDate(item.pleDistr)"></td>
              <td>{{ item.pleValue }}</td>
              <td>{{ idTypeDic['E_Cy'][item.pleCy] }}</td>
              <td>{{ idTypeDic['E_ValOrgType'][item.valOrgType] }}</td>
              <td>{{ item.valDate }}</td>
              <td>{{ idTypeDic['E_InfoIDType'][item.pleDgorType] }}</td>
              <td>{{ item.pleDgorName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][item.pleorCertType]||idTypeDic['E_InfoIDType1'][item.pleorCertType] }}</td> <!-- 关联字典 -->
              <td>{{ item.pleorCertNum }}</td>
              <td>{{ item.pleDesc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 质物信息段 -->
      <div class="tableData tableSixth" v-if="showTableSixth">
        <h3 class="title">质物信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>质物种类个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehpfItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>质物种类</th>
              <th>质物价值</th>
              <th>币种</th>
              <th>出质人身份类别</th>
              <th>出质人名称</th>
              <th>出质人身份标识类型</th>
              <th>出质人身份标识号码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehpfItem" :key="item.index">
              <td>{{ idTypeDic['E_ImpType'][item.impType] }}</td>
              <td>{{ item.ipmVal }}</td>
              <td>{{ idTypeDic['E_Cy'][item.impCy] }}</td>
              <td>{{ idTypeDic['E_InfoIDType'][item.ippc] }}</td>
              <td>{{ item.pawnName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][item.pawnCertType]||idTypeDic['E_InfoIDType1'][item.pawnCertType] }}</td> <!-- 关联字典 -->
              <td>{{ item.pawnCertNum }}</td>
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
      arr: [], // 行政区划字典数组
      // 提交的url
      url: '',
      resData: '',
      ehpbItem: {}, // 基础段--基本信息段
      showTableSec: true,
      ehpdItem: {}, // 其他债务人信息段
      showTableThird: true,
      ehpeItem: {}, // 抵押物信息段
      showTableFourth: true,
      ehpfItem: {}, // 质物信息段
      showChange: false, // 标识变更
      showAllDel: false, // 整笔删除
      showTableFifth: true,
      showTableSixth: true,
      textShow: '抵（质）押合同信息', // 标题
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.epb.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      idTypeDic: {} // 字典字段
    };
  },
  props: ['paramEdit'],
  computed: {
    formatDate() {
      return function (val) {		// 转换行政区划字典
          let options = this.common.changeAreaCode(val, this.arr);
          return options;
        };
      }
  },
  watch: {},
  methods: {
    // 获取字典方法
    getdataDic() {
      let type = ['E_InfoIDType2', 'E_InfoIDType1', 'E_REPORT_STATE', 'E_InfRecType', 'E_GuarType', 'E_CcStatus', 'E_AUDITING_STATE',
      'E_Cy', 'E_MaxGuar', 'E_InfoIDType', 'E_PleType', 'E_MotgaProptIDType', 'E_ValOrgType', 'E_ImpType', 'E_RptDateCode_P'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
        this.arr = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_getArea'));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
      this.resData = await this.http.apiPost(this.$urlList.epb.findDetailById, this.paramEdit.data, '');
      // 基础段-基本信息段
      this.ehpbItem = this.resData.ehpb;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehpbItem.infRecType == '511') { // 标识变更
        this.textShow = '抵（质）押账户标识变更信息';
        this.showChange = true;
        this.showTableSec = false;
        this.showTableThird = false;
        this.showTableFifth = false;
        this.showTableFourth = false;
        this.showTableSixth = false;
      } else if (this.ehpbItem.infRecType == '514') { // 整笔删除
        this.textShow = '抵（质）押合同整笔删除信息';
        this.showAllDel = true;
        this.showTableSec = false;
        this.showTableThird = false;
        this.showTableFifth = false;
        this.showTableFourth = false;
        this.showTableSixth = false;
      }
      // 其他债务人信息段
      this.ehpdItem = this.resData.ehpd;
      if (this.ehpdItem == null || this.ehpdItem == '' || this.ehpdItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableFourth = false;
      }
      // 抵押物信息段
      this.ehpeItem = this.resData.ehpe;
      if (this.ehpeItem == null || this.ehpeItem == '' || this.ehpeItem == undefined) { // 如果没有返回值则隐藏该段
        this.showTableFifth = false;
      }

      // 质物信息段
      this.ehpfItem = this.resData.ehpf;
      if (this.ehpfItem == null || this.ehpfItem == '' || this.ehpfItem == undefined) { // 如果没有返回值则隐藏该段
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
