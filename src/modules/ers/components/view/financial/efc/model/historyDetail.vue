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
        <!-- <h2 class="title">资产负债表信息</h2> -->
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
              <td>{{ this.ehfcItem.batchNum }}</td>
              <td>{{ this.ehfcItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfcItem.reportState] }}</td>
              <td>{{ this.ehfcItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfcItem.infRecType] }}</td>
              <td>{{ this.ehfcItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfcItem.entCertType] }}</td>
              <td>{{ this.ehfcItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfcItem.rptDate) }}</td>
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
              <td>{{ this.ehfcItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfcItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfcItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfcItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfcItem.rptDateCode] }}</td>
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
              <td>{{ this.ehfcItem.auditFirmName }}</td>
              <td>{{ this.ehfcItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfcItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>资产负债表（2007版）</h3></td></tr>
            </table>
            <table class="unitCls">
              <tr><td><h4 class="unitCls"><span>单位：</span><i>元</i></h4></td></tr>
            </table>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <!-- 左侧表格 -->
              <table class="dataLeft dataTable">
                <thead>
                  <tr>
                    <th>资产</th>
                    <th>行次</th>
                    <th>期末值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>流动资产：</b></td>
                    <td>1</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>货币资金</span></td>
                    <td>2</td>
                    <td><el-input class="inputCls" name="curFun" v-model="this.ehfcItem.curFun" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>交易性金融资产</span></td>
                    <td>3</td>
                    <td><el-input class="inputCls" name="finAssHft" v-model="this.ehfcItem.finAssHft" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>4</td>
                    <td><el-input class="inputCls" name="notRec" v-model="this.ehfcItem.notRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应收账款</span></td>
                    <td>5</td>
                    <td><el-input class="inputCls" name="accRec" v-model="this.ehfcItem.accRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>预付账款</span></td>
                    <td>6</td>
                    <td><el-input class="inputCls" name="prepayments" v-model="this.ehfcItem.prepayments" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应收利息</span></td>
                    <td>7</td>
                    <td><el-input class="inputCls" name="intRec" v-model="this.ehfcItem.intRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应收股利</span></td>
                    <td>8</td>
                    <td><el-input class="inputCls" name="divRec" v-model="this.ehfcItem.divRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>其他应收款</span></td>
                    <td>9</td>
                    <td><el-input class="inputCls" name="othRec" v-model="this.ehfcItem.othRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>10</td>
                    <td><el-input class="inputCls" name="inventories" v-model="this.ehfcItem.inventories" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的非流动资产</span></td>
                    <td>11</td>
                    <td><el-input class="inputCls" name="curPorOnca" v-model="this.ehfcItem.curPorOnca" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>12</td>
                    <td><el-input class="inputCls" name="othCurAss" v-model="this.ehfcItem.othCurAss" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*流动资产合计：</b></td>
                    <td>13</td>
                    <td><el-input class="inputCls" name="totCurAss" v-model="this.ehfcItem.totCurAss" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>非流动资产：</b></td>
                    <td>14</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>可供出售金融资产</span></td>
                    <td>15</td>
                    <td><el-input class="inputCls" name="finAssAfs" v-model="this.ehfcItem.finAssAfs" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>持有至到期投资</span></td>
                    <td>16</td>
                    <td><el-input class="inputCls" name="helToMi" v-model="this.ehfcItem.helToMi" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>长期应收款</span></td>
                    <td>17</td>
                    <td><el-input class="inputCls" name="lonTerEi" v-model="this.ehfcItem.lonTerEi" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>长期股权投资</span></td>
                    <td>18</td>
                    <td><el-input class="inputCls" name="lonTerRec" v-model="this.ehfcItem.lonTerRec" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>投资性房地产</span></td>
                    <td>19</td>
                    <td><el-input class="inputCls" name="invPro" v-model="this.ehfcItem.invPro" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>固定资产</span></td>
                    <td>20</td>
                    <td><el-input class="inputCls" name="fixAss" v-model="this.ehfcItem.fixAss" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>21</td>
                    <td><el-input class="inputCls" name="conInPro" v-model="this.ehfcItem.conInPro" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>工程物资</span></td>
                    <td>22</td>
                    <td><el-input class="inputCls" name="conMat" v-model="this.ehfcItem.conMat" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>固定资产清理</span></td>
                    <td>23</td>
                    <td><el-input class="inputCls" name="fixAssPfd" v-model="this.ehfcItem.fixAssPfd" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>生产性生物资产</span></td>
                    <td>24</td>
                    <td><el-input class="inputCls" name="nonCurBa" v-model="this.ehfcItem.nonCurBa" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>油气资产</span></td>
                    <td>25</td>
                    <td><el-input class="inputCls" name="oilAndGa" v-model="this.ehfcItem.oilAndGa" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>无形资产</span></td>
                    <td>26</td>
                    <td><el-input class="inputCls" name="intAss" v-model="this.ehfcItem.intAss" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>开发支出</span></td>
                    <td>27</td>
                    <td><el-input class="inputCls" name="devDis" v-model="this.ehfcItem.devDis" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>商誉</span></td>
                    <td>28</td>
                    <td><el-input class="inputCls" name="goodwill" v-model="this.ehfcItem.goodwill" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>长期待摊费用</span></td>
                    <td>29</td>
                    <td><el-input class="inputCls" name="lonTerDe" v-model="this.ehfcItem.lonTerDe" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>递延所得税资产</span></td>
                    <td>30</td>
                    <td><el-input class="inputCls" name="defTaxAss" v-model="this.ehfcItem.defTaxAss" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>其他非流动资产</span></td>
                    <td>31</td>
                    <td><el-input class="inputCls" name="othNonCa" v-model="this.ehfcItem.othNonCa" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*非流动资产合计</b></td>
                    <td>32</td>
                    <td><el-input class="inputCls" name="totNonCa" v-model="this.ehfcItem.totNonCa" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*资产总计：</b></td>
                    <td>33</td>
                    <td><el-input class="inputCls" name="totAss" v-model="this.ehfcItem.totAss" disabled></el-input></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <!-- 右侧表格 -->
              <table class="dataRight dataTable">
                <thead>
                  <tr>
                    <th class="tab_left">资产</th>
                    <th class="tab_middle">行次</th>
                    <th class="tab_right">期末值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>流动负债：</b></td>
                    <td>34</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>短期借款</span></td>
                    <td>35</td>
                    <td><el-input class="inputCls" name="shoTerBor" v-model="this.ehfcItem.shoTerBor" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>交易性金融负债</span></td>
                    <td>36</td>
                    <td><el-input class="inputCls" name="finLiaHft" v-model="this.ehfcItem.finLiaHft" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付票据</span></td>
                    <td>37</td>
                    <td><el-input class="inputCls" name="notPay" v-model="this.ehfcItem.notPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付账款</span></td>
                    <td>38</td>
                    <td><el-input class="inputCls" name="accPay" v-model="this.ehfcItem.accPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>预收账款</span></td>
                    <td>39</td>
                    <td><el-input class="inputCls" name="prepayments" v-model="this.ehfcItem.prepayments" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付职工薪酬</span></td>
                    <td>40</td>
                    <td><el-input class="inputCls" name="empBenPay" v-model="this.ehfcItem.empBenPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应交税费</span></td>
                    <td>41</td>
                    <td><el-input class="inputCls" name="taxPay" v-model="this.ehfcItem.taxPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付利息</span></td>
                    <td>42</td>
                    <td><el-input class="inputCls" name="intPay" v-model="this.ehfcItem.intPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付股利</span></td>
                    <td>43</td>
                    <td><el-input class="inputCls" name="divPay" v-model="this.ehfcItem.divPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>44</td>
                    <td><el-input class="inputCls" name="othPay" v-model="this.ehfcItem.othPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的非流动负债</span></td>
                    <td>45</td>
                    <td><el-input class="inputCls" name="curPorOltl" v-model="this.ehfcItem.curPorOltl" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*其他流动负债</b></td>
                    <td>46</td>
                    <td><el-input class="inputCls" name="othCurLia" v-model="this.ehfcItem.othCurLia" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*流动负债合计</b></td>
                    <td>47</td>
                    <td><el-input class="inputCls" name="totCurLia" v-model="this.ehfcItem.totCurLia" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>非流动负债：</b></td>
                    <td>48</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>49</td>
                    <td><el-input class="inputCls" name="lonTerBor" v-model="this.ehfcItem.lonTerBor" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>应付债券</span></td>
                    <td>50</td>
                    <td><el-input class="inputCls" name="bonPay" v-model="this.ehfcItem.bonPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>51</td>
                    <td><el-input class="inputCls" name="lonTerPay" v-model="this.ehfcItem.lonTerPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>专项应付款</span></td>
                    <td>52</td>
                    <td><el-input class="inputCls" name="graPay" v-model="this.ehfcItem.graPay" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>预计负债</span></td>
                    <td>53</td>
                    <td><el-input class="inputCls" name="provisions" v-model="this.ehfcItem.provisions" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>递延所得税负债</span></td>
                    <td>54</td>
                    <td><el-input class="inputCls" name="defTaxLia" v-model="this.ehfcItem.defTaxLia" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>其他非流动负债</span></td>
                    <td>55</td>
                    <td><el-input class="inputCls" name="othNonCl" v-model="this.ehfcItem.othNonCl" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b class="pleft28">非流动负债合计</b></td>
                    <td>56</td>
                    <td><el-input class="inputCls" name="totNonCl" v-model="this.ehfcItem.totNonCl" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*负债合计</b></td>
                    <td>57</td>
                    <td><el-input class="inputCls" name="totLia" v-model="this.ehfcItem.totLia" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>所有者权益（或股东权益）：</b></td>
                    <td>58</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>实收资本（或股本）</span></td>
                    <td>59</td>
                    <td><el-input class="inputCls" name="paiInCosc" v-model="this.ehfcItem.paiInCosc" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>资本公积</span></td>
                    <td>60</td>
                    <td><el-input class="inputCls" name="capRse" v-model="this.ehfcItem.capRse" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>减：库存股</span></td>
                    <td>61</td>
                    <td><el-input class="inputCls" name="lesTreSto" v-model="this.ehfcItem.lesTreSto" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>盈余公积</span></td>
                    <td>62</td>
                    <td><el-input class="inputCls" name="surRes" v-model="this.ehfcItem.surRes" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><span>未分配利润</span></td>
                    <td>63</td>
                    <td><el-input class="inputCls" name="unaPro" v-model="this.ehfcItem.unaPro" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td><b>*所有者权益合计</b></td>
                    <td>64</td>
                    <td><el-input class="inputCls" name="totEqu" v-model="this.ehfcItem.totEqu" disabled></el-input></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>65</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><b>*负债和所有者权益总计</b></td>
                    <td>66</td>
                    <td><el-input class="inputCls" name="totEquAl" v-model="this.ehfcItem.totEquAl" disabled></el-input></td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfcItem.infRecType] }}</td>
              <td>{{ this.ehfcItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfcItem.entCertType] }}</td>
              <td>{{ this.ehfcItem.entCertNum }}</td>
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
              <td>{{ this.ehfcItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfcItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfcItem.sheetTypeDivide] }}</td>
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
      ehfcItem: {}, // 基础段
      showTableSec: true,
      showTableTab: true, // 报表
      showAllDel: false, // 整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efc.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '资产负债表信息' // 标题
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
      let type = ['E_REPORT_STATE', 'E_InfRecType', 'E_InfoIDType2', 'E_ReportFormType', 'E_ReportFormdel', 'E_RptDateCode_EF'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
      delete this.paramEdit.data.stopFlag;
      delete this.paramEdit.data.lockFlag;
      this.resData = await this.http.apiPost(this.$urlList.efc.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfcItem = this.resData.EHFC;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehfcItem.infRecType == '614') { // 整笔删除
        this.textShow = '资产负债表整笔删除信息';
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
