<template>
  <div style="width:85%"
       class="formItem">
    <el-form ref="formItem"
             :model="formItem"
             :rules="rules"
             label-width="140px">
      <div>
        <el-row>
          <el-col :span="12"
                  v-show="showSee">
            <el-form-item label="客户号"
                          prop="custId">
              <el-input v-model="formItem.custId"
                        :disabled="editDisabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业名称"
                          prop="entName">
              <el-input v-model="formItem.entName"></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="企业身份标识类型"
                          prop="entCertType">
              <v-select paramtype="E_InfoIDType2"
                        :change="true"
                        @eventChange="changeEntCertType"
                        v-model="formItem.entCertType"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业身份标识号码"
                          prop="entCertNum">
              <el-input v-model="formItem.entCertNum"></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="报表年份"
                          prop="sheetYear">
              <el-date-picker v-model="formItem.sheetYear"
                              type="year"
                              :disabled="editDisabled"
                              placeholder="选择日期"
                              :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报表类型"
                          prop="sheetType">
              <!-- <v-select paramtype="E_ReportFormType" :disabled="editDisabled" v-model="formItem.sheetType"></v-select> -->
              <el-select v-model="formItem.sheetType"
                         :disabled="editDisabled"
                         placeholder="请选择">
                <el-option label="年报"
                           value="10"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="报表类型细分"
                          prop="sheetTypeDivide">
              <v-select paramtype="E_ReportFormdel"
                        :disabled="editDisabled"
                        v-model="formItem.sheetTypeDivide"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计事务所名称"
                          prop="auditFirmName">
              <el-input v-model="formItem.auditFirmName"></el-input>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="审计人员名称"
                          prop="auditorName">
              <el-input v-model="formItem.auditorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审计时间"
                          prop="auditTime">
              <el-date-picker v-model="formItem.auditTime"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item prop="deptCode"
                          label="所属机构">
              <!-- 这个是在页面展示得数据 -->
              <span @click="menutreeshow()">
                <el-input v-model="search_IN_orgId_fake"
                          readonly></el-input>
              </span>
              <!-- 向后台发送这个数据 -->
              <el-input v-model.trim="formItem.deptCode"
                        v-show="false"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务发生日期"
                          prop="bussDate">
              <el-date-picker v-model="formItem.bussDate"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="免报标志"
                          prop="noReport">
              <v-select :options="{0:'正常',1:'免报'}"
                        v-model="formItem.noReport"></v-select>
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
                    <td><span class="star">*</span><b>一、本期財政补助结转结余</b></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="curFinScob"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curFinScob"
                                  v-model="formItem.curFinScob"></el-input>
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
                                  @change="calcObj.minusFinSubRev(self)"></el-input>
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
                                  @change="calcObj.minusFinSubRev(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>二、本期事业结转结余</b></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="curUndCob"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curUndCob"
                                  v-model="formItem.curUndCob"></el-input>
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
                                  @change="calcObj.minusCurUndCob(self)"></el-input>
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
                                  v-model="formItem.undRev"></el-input>
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
                                  v-model="formItem.supSubRev"></el-input>
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
                                  v-model="formItem.revTurObsu"></el-input>
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
                                  v-model="formItem.othRev"></el-input>
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
                                  v-model="formItem.donInc"></el-input>
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
                                  @change="calcObj.minusCurUndCob(self)"></el-input>
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
                                  v-model="formItem.undExpNfse"></el-input>
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
                                  v-model="formItem.payToTha"></el-input>
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
                                  v-model="formItem.graToTha"></el-input>
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
                                  v-model="formItem.othExp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>三、本期经营结余</b></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="curOpeBal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curOpeBal"
                                  v-model="formItem.curOpeBal"></el-input>
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
                                  @change="calcObj.minusCurOpeBal(self)"></el-input>
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
                                  @change="calcObj.minusCurOpeBal(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>四、弥补以前年度亏损后的经营结余</b></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="opeBalMufotpyol"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeBalMufotpyol"
                                  v-model="formItem.opeBalMufotpyol"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>五、本年非财政补助结转结余</b></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="nonFinScobty"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinScobty"
                                  v-model="formItem.nonFinScobty"></el-input>
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
                                  v-model="formItem.nonFinAco"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>六、本年非财政补助结余</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="nonFinAbty"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinAbty"
                                  v-model="formItem.nonFinAbty"></el-input>
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
                                  v-model="formItem.entIncTp"></el-input>
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
                                  v-model="formItem.speFunTe"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>七、转入事业基金</b></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="pubFunTi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="pubFunTi"
                                  v-model="formItem.pubFunTi"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
        </el-row>
        <div class="btn_Submit">
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('formItem')">提交</el-button>
            <el-button class="submit_btn"
                       @click="resetForm('formItem')">清空</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <v-tree v-bind:param="paramTree"
            :orgIdfake.sync="search_IN_orgId_fake"
            :orgId.sync="formItem['deptCode']">
    </v-tree>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import vTree from '@/modules/ers/components/common/treedialog';
export default {
  name: 'child',
  components: {
    vCollapse,
    vTree,
  },
  data() {
    return {
      self: this,
      showSee: true,
      editDisabled: false,
      pickerOptions: {
        // 不能大于当前日
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      paramTree: {},
      search_IN_orgId_fake: '',
      formItem: {
        custId: '',
        entName: '',
        entCertType: '',
        entCertNum: '',
        sheetYear: '',
        sheetType: '',
        sheetTypeDivide: '',
        auditFirmName: '',
        auditorName: '',
        deptCode: '',
        bussDate: '',
        noReport: '',

        curFinScob: '',
        finSubRev: '',
        undExpFse: '',
        curUndCob: '',
        undClaRev: '',
        undRev: '',
        supSubRev: '',
        revTurObsu: '',
        othRev: '',
        donInc: '',
        undClaExp: '',
        undExpNfse: '',

        payToTha: '',
        graToTha: '',
        othExp: '',
        curOpeBal: '',
        opeRev: '',
        opeExp: '',
        opeBalMufotpyol: '',
        nonFinScobty: '',
        nonFinAco: '',
        nonFinAbty: '',
        entIncTp: '',
        speFunTe: '',
        pubFunTi: '',
      },
      rules: {
        custId: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { max: 64, message: '最多64个字符', trigger: 'blur' },
        ],
        entName: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { max: 80, message: '最多80个字符', trigger: 'blur' },
        ],
        entCertType: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        entCertNum: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
          { max: 40, message: '最多40个字符', trigger: 'blur' },
        ],
        sheetYear: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        sheetType: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        sheetTypeDivide: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        auditFirmName: [{ max: 80, message: '最多80个字符', trigger: 'blur' }],
        auditorName: [{ max: 30, message: '最多30个字符', trigger: 'blur' }],
        deptCode: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        bussDate: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        noReport: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        curFinScob: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        curUndCob: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        curOpeBal: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        opeBalMufotpyol: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        nonFinScobty: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        nonFinAbty: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        pubFunTi: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
      },
      collapseList: {
        activeNames: ['efi'], // 默认显示那个折叠栏 没有默认显示全部。
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
    changeEntCertType(obj) {
      if (obj.e == 10) {
        this.rules.entCertNum = [
          { required: true, validator: this.validator.empty, trigger: 'blur' },
          {
            required: true,
            validator: this.validator.checkLoanCardnorules,
            trigger: 'blur',
          },
        ];
      } else if (obj.e == 20) {
        this.rules.entCertNum = [
          { required: true, validator: this.validator.empty, trigger: 'blur' },
          {
            required: true,
            validator: this.validator.isCCode,
            trigger: 'blur',
          },
        ];
      } else {
        this.rules.entCertNum = [
          { required: true, validator: this.validator.empty, trigger: 'blur' },
          {
            required: true,
            validator: this.validator.isCorpNo,
            trigger: 'blur',
          },
        ];
      }
    },
    dateFormat(dateObj) {
      let date = new Date(dateObj);
      let y = date.getFullYear(); // 年
      let MM = date.getMonth() + 1; // 月
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate(); // 日
      d = d < 10 ? '0' + d : d;
      return y + '-' + MM + '-' + d;
    },
    menutreeshow() {
      // 加载树结构
      this.http.apiGet(this.$urlList.common.orgTree).then((res) => {
        // 行业分类代码的接口修改 就把这个判断去掉
        if (Object.prototype.toString.call(res) === '[object Object]') {
          res = [res];
        }
        this.paramTree = {
          visible: true,
          title: '机构树',
          treedata: res,
          defaultProps: {
            children: 'children',
            label: function (a, b) {
              return a.name;
            },
          },
          name: 'deptCode',
        };
        localStorage.setItem('ms_orgCode', res[0].id);
      });
    },
    init() {
      // 修改页实现单条数据的查询
      if (this.$store.getters.operatState == 'edit') {
        setTimeout(() => {
          let paramData = this.$route.query;
          let url = this.$urlList.efi.getValUrl;
          this.http.apiPost(url, paramData).then((res) => {
            res.sheetYear = res.sheetYear + '';
            this.formItem = res;
            this.deptCodeDic();
          });
        }, 10);

        // 当页面状态为修改页状态时，客户号、报表年份、报表类型、报表类型细分 设置必读属性
        this.editDisabled = true;
        // 客户号直接隐藏不显示
        this.showSee = false;
      }
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
    submitForm(formItem) {
      // 实现时间格式的转换
      if (this.formItem.sheetYear) {
        this.formItem.sheetYear = this.dateFormat(
          this.formItem.sheetYear
        ).split('-')[0];
      }
      if (this.formItem.bussDate) {
        this.formItem.bussDate = this.dateFormat(this.formItem.bussDate);
      }
      if (this.formItem.auditTime) {
        this.formItem.auditTime = this.dateFormat(this.formItem.auditTime);
      }
      // 当某个字段的值为0，且数据类型为数字时，将其转化为字符串类型
      for (let item in this.formItem) {
        if (
          this.formItem[item] == 0 &&
          typeof this.formItem[item] == 'number'
        ) {
          this.formItem[item] = 0 + '';
        }
      }
      // 数字计算
      // 本期财政补助结转结余 = 财政补助收入 - 事业支出
      let finSubRev = this.formItem.finSubRev;
      let undExpFse = this.formItem.undExpFse;
      let curFinScob = this.formItem.curFinScob;
      if (curFinScob || finSubRev || undExpFse) {
        if (
          parseFloat(finSubRev) - parseFloat(undExpFse) !=
          parseFloat(curFinScob)
        ) {
          this.$alert(
            '本期财政补助结转结余 = 财政补助收入 - 事业支出',
            '提示',
            {
              dangerouslyUseHTMLString: true,
            }
          );
          return false;
        }
      }
      // 本期事业结转结余 = 事业类收入 - 事业类支出
      let undClaRev = this.formItem.undClaRev;
      let undClaExp = this.formItem.undClaExp;
      let curUndCob = this.formItem.curUndCob;
      if (curUndCob || undClaRev || undClaExp) {
        if (
          parseFloat(undClaRev) - parseFloat(undClaExp) !=
          parseFloat(curUndCob)
        ) {
          this.$alert('本期事业结转结余 = 事业类收入 - 事业类支出', '提示', {
            dangerouslyUseHTMLString: true,
          });
          return false;
        }
      }
      // 本期经营结余 = 经营收入 - 经营支出
      let opeRev = this.formItem.opeRev;
      let opeExp = this.formItem.opeExp;
      let curOpeBal = this.formItem.curOpeBal;
      if (curOpeBal || opeRev || opeExp) {
        if (parseFloat(opeRev) - parseFloat(opeExp) != parseFloat(curOpeBal)) {
          this.$alert('本期经营结余 = 经营收入 - 经营支出', '提示', {
            dangerouslyUseHTMLString: true,
          });
          return false;
        }
      }
      // 验证提交
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          // 判断url接口是新增功能还是修改功能
          let url = '';
          if (this.$store.getters.operatState == 'add' && !this.comData) {
            // 新增功能
            url = this.$urlList.efi.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efi.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efi.update;
          }

          this.http
            .apiPost(url, this.formItem, {
              showLoading: true,
            })
            .then((res) => {
              this.editDisabled = true;
              this.comData = res.comData;
              this.common.submitMsg(res).then(() => {
                // if (res.code == '00000000') {
                // }
              });
            });
        }
        return false;
      });
    },
    resetForm(formItem) {
      // 只读属性字段的数组，不能被清空
      // 客户号、报表年份、报表类型、报表类型细分
      let disabledArr = ['custId', 'sheetYear', 'sheetType', 'sheetTypeDivide'];
      // 系统提供字段的数组，不能被清空
      let sysArr = [
        'auditingState',
        'centerEntCertNum',
        'centerEntCertType',
        'centerEntName',
        'centerExist',
        'centerRptDate',
        'changeTime',
        'dataState',
        'ex1',
        'ex2',
        'ex3',
        'getTime',
        'id',
        'infRecType',
        'msgNum',
        'operator',
        'orgEntity',
        'reporEntCertNum',
        'reportEntCertType',
        'reportEntName',
        'reportState',
        'rptDate',
        'rptDateCode',
      ];
      // 修改页状态
      if (this.editDisabled == true) {
        for (let item in this.formItem) {
          // 当遍历字段不为只读属性时，则将字段表单清空
          if (!disabledArr.includes(item) && !sysArr.includes(item)) {
            this.formItem[item] = '';
          }
        }
      } else {
        // 新增页状态
        for (let item in this.formItem) {
          this.formItem[item] = '';
        }
      }
      this.search_IN_orgId_fake = ''; // 所属机构
      // 清空按钮的重置功能
      // this.$refs[formItem].resetFields();
    },
  },
  created() {
    this.init();

    // 非空校验
    let arr0 = [
      'curFinScob',
      '',
      '',
      'curUndCob',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'curOpeBal',
      '',
      '',
      'opeBalMufotpyol',
      'nonFinScobty',
      '',
      'nonFinAbty',
      '',
      '',
      'pubFunTi',
    ];
    // 表单数字校验
    let arr = [
      'curFinScob',
      'finSubRev',
      'undExpFse',
      'curUndCob',
      'undClaRev',
      'undRev',
      'supSubRev',
      'revTurObsu',
      'othRev',
      'donInc',
      'undClaExp',
      'undExpNfse',
      'payToTha',
      'graToTha',
      'othExp',
      'curOpeBal',
      'opeRev',
      'opeExp',
      'opeBalMufotpyol',
      'nonFinScobty',
      'nonFinAco',
      'nonFinAbty',
      'entIncTp',
      'speFunTe',
      'pubFunTi',
    ];

    let that = this;
    // 非空校验
    for (let i = 0; i < arr0.length; i++) {
      that.rules[arr0[i]] = [{}];
      that.rules[arr0[i]] = [];
      // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
      if (
        arr0[i] == 'curFinScob' ||
        arr0[i] == 'curUndCob' ||
        arr0[i] == 'curOpeBal'
      ) {
        that.rules[arr0[i]].push({
          required: true,
          validator: that.validator.empty,
          trigger: 'blur',
        });
      } else {
        that.rules[arr0[i]].push({
          required: true,
          validator: that.validator.empty,
          trigger: 'blur',
        });
        that.rules[arr0[i]].push({
          required: true,
          validator: that.validator.plusAndMinus,
          trigger: 'blur',
        });
      }
    }
    // 数字校验
    for (let i = 0; i < arr.length; i++) {
      that.rules[arr[i]] = [{}];
      that.rules[arr[i]] = [];
      // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
      if (
        arr0[i] == 'curFinScob' ||
        arr0[i] == 'curUndCob' ||
        arr0[i] == 'curOpeBal'
      ) {
        that.rules[arr0[i]].push({
          required: true,
          validator: that.validator.empty,
          trigger: 'blur',
        });
      } else {
        that.rules[arr0[i]].push({
          required: true,
          validator: that.validator.empty,
          trigger: 'blur',
        });
        that.rules[arr[i]].push({
          required: true,
          validator: that.validator.plusAndMinus,
          trigger: 'blur',
        });
      }
    }
  },
};
</script>
<style scoped="scoped">
.classTab >>> .el-form-item__error {
  position: static !important;
  padding-left: 25px;
  text-align: left;
}
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
.star {
  color: #f00;
  font-size: 20px;
  padding-left: 0px;
  padding-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
table tr td b.starTitle {
  display: inline-block;
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
table .el-form-item--small.el-form-item {
  margin-bottom: 0px !important;
}
.btn_Submit {
  padding-top: 20px;
  overflow: hidden;
}
.btn_Submit .el-form-item {
  float: right;
}
</style>
