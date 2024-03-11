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
              <v-select paramtype="E_ReportFormType"
                        :disabled="editDisabled"
                        v-model="formItem.sheetType"></v-select>
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
                  <h3>2007版利润及利润分配表</h3>
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
                                  v-model="formItem.revOfSal"></el-input>
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
                                  v-model="formItem.cosOfSal"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>营业税金及附加</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="busAndOt"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="busAndOt"
                                  v-model="formItem.busAndOt"></el-input>
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
                                  v-model="formItem.selExp"></el-input>
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
                                  v-model="formItem.genAndAe"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财务费用</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="finExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finExp"
                                  v-model="formItem.finExp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资产减值损失</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="impLosAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="impLosAss"
                                  v-model="formItem.impLosAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：公允价值变动净收益（损失以“-”号填列）</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="proOrLafcifv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proOrLafcifv"
                                  v-model="formItem.proOrLafcifv"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资净收益（损失以“-”号填列）</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="invInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="invInc"
                                  v-model="formItem.invInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：对联营企业和合营企业的投资收益</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="invIncFabace"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="invIncFabace"
                                  v-model="formItem.invIncFabace"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、营业利润（亏损以“-”号填列）</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="opePro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opePro"
                                  v-model="formItem.opePro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：营业外收入</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="nonOpeInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonOpeInc"
                                  v-model="formItem.nonOpeInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：营业外支出</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="nonOpeExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonOpeExp"
                                  v-model="formItem.nonOpeExp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：非流动资产损失</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="nonCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonCurAss"
                                  v-model="formItem.nonCurAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、利润总额（亏损总额以“-”号填列）</b></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="proBefTax"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proBefTax"
                                  v-model="formItem.proBefTax"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：所得税费用</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="incTaxExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incTaxExp"
                                  v-model="formItem.incTaxExp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、净利润（净亏损以“-”号填列）</b></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="netPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netPro"
                                  v-model="formItem.netPro"></el-input>
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
                      <el-form-item prop="basEarPs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="basEarPs"
                                  v-model="formItem.basEarPs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）稀释每股收益</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="dilEarPs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="dilEarPs"
                                  v-model="formItem.dilEarPs"></el-input>
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

        revOfSal: '',
        cosOfSal: '',
        busAndOt: '',
        selExp: '',
        genAndAe: '',
        finExp: '',
        impLosAss: '',
        proOrLafcifv: '',
        invInc: '',
        invIncFabace: '',
        opePro: '',
        nonOpeInc: '',

        nonOpeExp: '',
        nonCurAss: '',
        proBefTax: '',
        incTaxExp: '',
        netPro: '',
        basEarPs: '',
        dilEarPs: '',
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
        revOfSal: [
          {
            type: 'string',
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
        ],
        opePro: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
        proBefTax: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        netPro: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
      },
      collapseList: {
        activeNames: ['efc'], // 默认显示那个折叠栏 没有默认显示全部。
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
          let url = this.$urlList.efe.getValUrl;
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
      // 验证提交
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          // 判断url接口是新增功能还是修改功能
          let url = '';
          if (this.$store.getters.operatState == 'add' && !this.comData) {
            // 新增功能
            url = this.$urlList.efe.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efe.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efe.update;
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
      'revOfSal',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'opePro',
      '',
      '',
      '',
      'proBefTax',
      '',
      'netPro',
      '',
      '',
    ];
    // 表单数字校验
    let arr = [
      'revOfSal',
      'cosOfSal',
      'busAndOt',
      'selExp',
      'genAndAe',
      'finExp',
      'impLosAss',
      'proOrLafcifv',
      'invInc',
      'invIncFabace',
      'opePro',
      'nonOpeInc',
      'nonOpeExp',
      'nonCurAss',
      'proBefTax',
      'incTaxExp',
      'netPro',
      'basEarPs',
      'dilEarPs',
    ];

    let that = this;
    // 非空校验
    for (let i = 0; i < arr0.length; i++) {
      that.rules[arr0[i]] = [{}];
      that.rules[arr0[i]] = [];
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
    // 数字校验
    for (let i = 0; i < arr.length; i++) {
      that.rules[arr[i]] = [{}];
      that.rules[arr[i]] = [];
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
