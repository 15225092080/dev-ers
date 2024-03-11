<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfi">查看报送历史</el-button>
      </el-row>
    </div>
    <el-form ref="formItem"
             :model="formItem"
             label-width="140px">
      <div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户号"
                          prop="custId">
              <el-input v-model="formItem.custId"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称"
                          prop="entName">
              <el-input v-model="formItem.entName"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="企业身份标识类型"
                          prop="entCertType">
              <v-select paramtype="E_InfoIDType2"
                        v-model="formItem.entCertType"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业身份标识号码"
                          prop="entCertNum">
              <el-input v-model="formItem.entCertNum"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
              <v-select paramtype="E_ReportFormType"
                        v-model="formItem.sheetType"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表类型细分"
                          prop="sheetTypeDivide">
              <v-select paramtype="E_ReportFormdel"
                        v-model="formItem.sheetTypeDivide"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计事务所名称"
                          prop="auditFirmName">
              <el-input v-model="formItem.auditFirmName"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="审计人员名称"
                          prop="auditorName">
              <el-input v-model="formItem.auditorName"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计时间"
                          prop="auditTime">
              <el-input v-model="formItem.auditTime"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属机构"
                          prop="deptCode">
              <!-- 这个是在页面展示得数据 -->
              <el-input v-model="search_IN_orgId_fake"
                        readonly
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="免报标志"
                          prop="noReport">
              <v-select paramtype="E_NO_REPORT"
                        v-model="formItem.noReport"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态"
                          prop="auditingState">
              <v-select paramtype="E_AUDITING_STATE"
                        v-model="formItem.auditingState"
                        disabled="disabled"></v-select>
            </el-form-item>
          </el-col>
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
                  <h3>事业单位收入支出表</h3>
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
                    <td><b>一、本期財政补助结转结余</b></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="curFinScob"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curFinScob"
                                  v-model="formItem.curFinScob"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政补助收入</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="finSubRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finSubRev"
                                  v-model="formItem.finSubRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：事业支出（财政补助支出）</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="undExpFse"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undExpFse"
                                  v-model="formItem.undExpFse"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、本期事业结转结余</b></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="curUndCob"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curUndCob"
                                  v-model="formItem.curUndCob"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（一）事业类收入</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="undClaRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undClaRev"
                                  v-model="formItem.undClaRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>1.事业收入</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="undRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undRev"
                                  v-model="formItem.undRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>2.上级补助收入</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="supSubRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="supSubRev"
                                  v-model="formItem.supSubRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>3.附属单位上缴收入</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="revTurObsu"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="revTurObsu"
                                  v-model="formItem.revTurObsu"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>4.其他收入</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="othRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othRev"
                                  v-model="formItem.othRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：捐赠收入</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="donInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="donInc"
                                  v-model="formItem.donInc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（二）事业类支出</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="undClaExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undClaExp"
                                  v-model="formItem.undClaExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>1.事业支出（非财政补助支出）</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="undExpNfse"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undExpNfse"
                                  v-model="formItem.undExpNfse"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>2.上缴上级支出</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="payToTha"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="payToTha"
                                  v-model="formItem.payToTha"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>3.对附属单位补助支出</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="graToTha"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="graToTha"
                                  v-model="formItem.graToTha"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>4.其他支出</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="othExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othExp"
                                  v-model="formItem.othExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、本期经营结余</b></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="curOpeBal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curOpeBal"
                                  v-model="formItem.curOpeBal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营收入</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="opeRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeRev"
                                  v-model="formItem.opeRev"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：经营支出</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="opeExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeExp"
                                  v-model="formItem.opeExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、弥补以前年度亏损后的经营结余</b></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="opeBalMufotpyol"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeBalMufotpyol"
                                  v-model="formItem.opeBalMufotpyol"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、本年非财政补助结转结余</b></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="nonFinScobty"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinScobty"
                                  v-model="formItem.nonFinScobty"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：非财政补助结转</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="nonFinAco"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinAco"
                                  v-model="formItem.nonFinAco"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>六、本年非财政补助结余</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="nonFinAbty"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinAbty"
                                  v-model="formItem.nonFinAbty"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：应缴企业所得税</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="entIncTp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="entIncTp"
                                  v-model="formItem.entIncTp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：提取专用基金</span></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="speFunTe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="speFunTe"
                                  v-model="formItem.speFunTe"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>七、转入事业基金</b></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="pubFunTi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="pubFunTi"
                                  v-model="formItem.pubFunTi"
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
    <efiHistory v-if="efiHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efiHistory"
                :vis.sync="efiHistory"></efiHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import efiHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    efiHistory,
  },
  data() {
    return {
      efiHistory: false,
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
    historyBtnEfi() {
      this.efiHistory = true;
      this.paramDetail = {
        title: '事业单位收入支出-报送历史列表页',
        dialogTitle: '',
        url: null,
        id: this.formItem.id,
      };
    },
    closeChild() {
      this.efiHistory = false;
    },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.efi.getValUrl;
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
