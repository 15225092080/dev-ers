<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <!-- <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfe">查看报送历史</el-button>
      </el-row>
    </div> -->
    <el-form ref="formItem"
             :model="formItem"
             label-width="140px">
      <div>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="客户号"
                          prop="custId">
              <el-input v-model="formItem.custId"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="报表年份"
                          prop="sheetYear">
              <el-input v-model="formItem.sheetYear"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报表类型"
                          prop="sheetType">
              <v-select paramtype="ReportFormType"
                        v-model="formItem.sheetType"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表类型细分"
                          prop="sheetTypeDivide">
              <v-select paramtype="ReportFormdel"
                        v-model="formItem.sheetTypeDivide"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内部机构代码"
                          prop="deptCode">
              <v-select paramtype="deptCode"
                        v-model="formItem.deptCode"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务发生日期"
                          prop="bussDate">
              <el-input v-model="formItem.bussDate"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="中心是否存在"
                          prop="centerExist">
              <v-select paramtype="CENTER_EXIST"
                        v-model="formItem.centerExist"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作员"
                          prop="operator">
              <el-input v-model="formItem.operator"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入库时间"
                          prop="getTime">
              <el-input v-model="formItem.getTime"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修改时间"
                          prop="changeTime">
              <el-input v-model="formItem.changeTime"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="信息报告日期"
                          prop="rptDate">
              <el-input v-model="formItem.rptDate"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批次号"
                          prop="batchNum">
              <el-input v-model="formItem.batchNum"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报文号"
                          prop="msgNum">
              <el-input v-model="formItem.msgNum"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报送状态"
                          prop="reportState">
              <v-select paramtype="REPORT_STATE"
                        v-model="formItem.reportState"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数据状态"
                          prop="dataState">
              <v-select paramtype="DATA_STATE"
                        v-model="formItem.dataState"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="免报标志"
                          prop="noReport">
              <v-select paramtype="NO_REPORT"
                        v-model="formItem.noReport"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </div>
      <v-collapse ref="collapse"
                  :collapseList="collapseList"
                  style="width:100%;"></v-collapse>
      <div class="classTab">
        <el-row>
          <el-col :span="24"
                  style="width:100%">
            <table class="tabTitle">
              <tr>
                <td>
                  <h3>2022版利润及利润分配表</h3>
                </td>
              </tr>
            </table>
            <table class="unitCls">
              <tr>
                <td>
                  <h4 class="unitCls"><span>单位：</span><i>元</i></h4>
                </td>
              </tr>
            </table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <!-- 左侧表格 -->
              <table class="dataLeft">
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
                      <el-form-item prop="revOfSal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="revOfSal"
                                  v-model="formItem.revOfSal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：营业成本</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="cosOfSal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="cosOfSal"
                                  v-model="formItem.cosOfSal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>税金及附加</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="busAndOt"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="busAndOt"
                                  v-model="formItem.busAndOt"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>销售费用</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="selExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="selExp"
                                  v-model="formItem.selExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>管理费用</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="genAndAe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="genAndAe"
                                  v-model="formItem.genAndAe"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>研发费用</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="radExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="radExp"
                                  v-model="formItem.radExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财务费用</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="finExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finExp"
                                  v-model="formItem.finExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：利息费用</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="intExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="intExp"
                                  v-model="formItem.intExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>利息收入</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="intInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="intInc"
                                  v-model="formItem.intInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：其他收益</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="othInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othInc"
                                  v-model="formItem.othInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资收益（损失以“-”号填列）</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="invInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="invInc"
                                  v-model="formItem.invInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <!-- <tr>
                    <td><span>其中：对联营企业和合营企业的投资收益</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="invIncFabace"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="invIncFabace"
                                  v-model="formItem.invIncFabace"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>以摊余成本计量的金融资产终止确认收益（损失以“-”号填列）</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="incFroDofamaac"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFroDofamaac"
                                  v-model="formItem.incFroDofamaac"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr> -->
                  <tr>
                    <td><span>净敞口套期收益（损失以“-”号填列）</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="netExpHi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netExpHi"
                                  v-model="formItem.netExpHi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>公允价值变动收益（损失以“-”号填列）</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="proOrLafcifv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proOrLafcifv"
                                  v-model="formItem.proOrLafcifv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>信用减值损失（损失以“-”号填列）</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="creImpLos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="creImpLos"
                                  v-model="formItem.creImpLos"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资产减值损失（损失以“-”号填列）</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="impLosAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="impLosAss"
                                  v-model="formItem.impLosAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资产处置收益（损失以“-”号填列）</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="assDisInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="assDisInc"
                                  v-model="formItem.assDisInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、营业利润（亏损以“-”号填列）</b></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="opePro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opePro"
                                  v-model="formItem.opePro"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：营业外收入</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="nonOpeInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonOpeInc"
                                  v-model="formItem.nonOpeInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：营业外支出</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="nonOpeExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonOpeExp"
                                  v-model="formItem.nonOpeExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、利润总额（亏损总额以“-”号填列）</b></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="proBefTax"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proBefTax"
                                  v-model="formItem.proBefTax"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：所得税费用</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="incTaxExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incTaxExp"
                                  v-model="formItem.incTaxExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、净利润（净亏损以“-”号填列）</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="netPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netPro"
                                  v-model="formItem.netPro"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、其他综合收益的税后净额</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="othComInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othComInc"
                                  v-model="formItem.othComInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>六、综合收益总额</b></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="totComInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totComInc"
                                  v-model="formItem.totComInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>七、每股收益：</b></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="earPerSha"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="earPerSha"
                                  v-model="formItem.earPerSha"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（一）基本每股收益</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="basEarPs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="basEarPs"
                                  v-model="formItem.basEarPs"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）稀释每股收益</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="dilEarPs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="dilEarPs"
                                  v-model="formItem.dilEarPs"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>

      </div>
    </el-form>
    <!-- 查询报送历史列表页 -->
    <!-- <efeHistory v-if="efeHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efeHistory"
                :vis.sync="efeHistory"></efeHistory> -->
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
// import efeHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    // efeHistory,
  },
  data() {
    return {
      efeHistory: false,
      search_IN_orgId_fake: '',
      // 查询条件
      formItem: {
        title: '',
        content: '',
        systemValue: '',
        endTime: '',
        createUserName: '',
        createTime: '',
        orgCode: '',
        status: '',
      },

      collapseList: {
        //   activeNames:['efc'],//默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: 'list', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 报送历史列表页 弹出对话框
    // historyBtnEfe() {
    //   this.efeHistory = true;
    //   this.paramDetail = {
    //     title: '07版利润分配表-报送历史列表页',
    //     dialogTitle: '',
    //     url: null,
    //     id: this.formItem.id,
    //   };
    // },
    // closeChild() {
    //   this.efeHistory = false;
    // },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.erh.getValUrl;
        this.http.apiPost(url, paramData).then((res) => {
          res.sheetYear = res.sheetYear + '';
          this.formItem = res;
          this.deptCodeDic();
        });
      }, 10);
    },
    async deptCodeDic() {
      let response = await this.http.apiGet(
        this.$urlList.common.getDeptCodeName,
        {
          params: {
            type: 'deptCode',
          },
        }
      );
      this.search_IN_orgId_fake = response[this.formItem.deptCode];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped="scoped">
.classTab {
  padding-bottom: 40px !important;
}
.pleft28 {
  padding-left: 28px;
}
.tabTitle {
  width: 100%;
  font-weight: normal;
  text-align: center;
  line-height: 40px;
  background-color: #efe;
  border-bottom: none;
}
.tabTitle tr td {
  border-bottom: none;
}
.unitCls {
  height: 35px;
  width: 100%;
  line-height: 35px;
  text-align: right;
  font-weight: normal;
  border-bottom: none;
}
.unitCls tr td {
  border-bottom: none;
}
.unitCls > span {
  display: inline-block;
  text-align: center;
  width: 100px;
}
.unitCls > i {
  display: inline-block;
  font-style: normal;
  text-align: center;
  width: 100px;
}
table {
  border-collapse: collapse;
}
.dataLeft,
.dataRight {
  width: 100%;
  font-size: 14px;
  font-family: 'Microsoft YaHei';
}
table,
table tr th,
table tr td {
  height: 41px;
  border: 1px solid #000;
}
table thead tr th:nth-child(1) {
  width: 38%;
}
table thead tr th:nth-child(2) {
  width: 15%;
}
table thead tr th:nth-child(3) {
  width: 47%;
}
table tbody tr td {
  height: 41px;
}
table tbody tr td span {
  padding-left: 28px;
}
table tbody tr td .inputCls {
  width: 92%;
}
table tbody tr td input {
  width: 92%;
}
table tbody tr td:nth-child(1) {
  padding-left: 5px;
}
table tbody tr td:nth-child(2) {
  text-align: center;
}
table tbody tr td:nth-child(3) {
  padding-right: 10px;
  text-align: right;
}

table tbody tr td .el-form-item--small.el-form-item {
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
