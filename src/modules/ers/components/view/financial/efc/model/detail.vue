<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfc">查看报送历史</el-button>
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
                  <h3>2007版企业资产负债表</h3>
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
          <el-col :span="12">
            <div class="grid-content">
              <!-- 左侧表格 -->
              <table class="dataLeft">
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
                    <td>
                      <el-input class="inputCls"
                                name="curFun"
                                v-model="formItem.curFun"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>交易性金融资产</span></td>
                    <td>3</td>
                    <td>
                      <el-input class="inputCls"
                                name="finAssHft"
                                v-model="formItem.finAssHft"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>4</td>
                    <td>
                      <el-input class="inputCls"
                                name="notRec"
                                v-model="formItem.notRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收账款</span></td>
                    <td>5</td>
                    <td>
                      <el-input class="inputCls"
                                name="accRec"
                                v-model="formItem.accRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预付账款</span></td>
                    <td>6</td>
                    <td>
                      <el-input class="inputCls"
                                name="prepayments"
                                v-model="formItem.prepayments"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收利息</span></td>
                    <td>7</td>
                    <td>
                      <el-input class="inputCls"
                                name="intRec"
                                v-model="formItem.intRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收股利</span></td>
                    <td>8</td>
                    <td>
                      <el-input class="inputCls"
                                name="divRec"
                                v-model="formItem.divRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应收款</span></td>
                    <td>9</td>
                    <td>
                      <el-input class="inputCls"
                                name="othRec"
                                v-model="formItem.othRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>10</td>
                    <td>
                      <el-input class="inputCls"
                                name="inventories"
                                v-model="formItem.inventories"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的非流动资产</span></td>
                    <td>11</td>
                    <td>
                      <el-input class="inputCls"
                                name="curPorOnca"
                                v-model="formItem.curPorOnca"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>12</td>
                    <td>
                      <el-input class="inputCls"
                                name="othCurAss"
                                v-model="formItem.othCurAss"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*流动资产合计：</b></td>
                    <td>13</td>
                    <td>
                      <el-input class="inputCls"
                                name="totCurAss"
                                v-model="formItem.totCurAss"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动资产：</b></td>
                    <td>14</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>可供出售金融资产</span></td>
                    <td>15</td>
                    <td>
                      <el-input class="inputCls"
                                name="finAssAfs"
                                v-model="formItem.finAssAfs"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>持有至到期投资</span></td>
                    <td>16</td>
                    <td>
                      <el-input class="inputCls"
                                name="helToMi"
                                v-model="formItem.helToMi"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期应收款</span></td>
                    <td>17</td>
                    <td>
                      <el-input class="inputCls"
                                name="lonTerEi"
                                v-model="formItem.lonTerEi"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期股权投资</span></td>
                    <td>18</td>
                    <td>
                      <el-input class="inputCls"
                                name="lonTerRec"
                                v-model="formItem.lonTerRec"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资性房地产</span></td>
                    <td>19</td>
                    <td>
                      <el-input class="inputCls"
                                name="invPro"
                                v-model="formItem.invPro"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产</span></td>
                    <td>20</td>
                    <td>
                      <el-input class="inputCls"
                                name="fixAss"
                                v-model="formItem.fixAss"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>21</td>
                    <td>
                      <el-input class="inputCls"
                                name="conInPro"
                                v-model="formItem.conInPro"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>工程物资</span></td>
                    <td>22</td>
                    <td>
                      <el-input class="inputCls"
                                name="conMat"
                                v-model="formItem.conMat"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产清理</span></td>
                    <td>23</td>
                    <td>
                      <el-input class="inputCls"
                                name="fixAssPfd"
                                v-model="formItem.fixAssPfd"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>生产性生物资产</span></td>
                    <td>24</td>
                    <td>
                      <el-input class="inputCls"
                                name="nonCurBa"
                                v-model="formItem.nonCurBa"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>油气资产</span></td>
                    <td>25</td>
                    <td>
                      <el-input class="inputCls"
                                name="oilAndGa"
                                v-model="formItem.oilAndGa"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产</span></td>
                    <td>26</td>
                    <td>
                      <el-input class="inputCls"
                                name="intAss"
                                v-model="formItem.intAss"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>开发支出</span></td>
                    <td>27</td>
                    <td>
                      <el-input class="inputCls"
                                name="devDis"
                                v-model="formItem.devDis"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>商誉</span></td>
                    <td>28</td>
                    <td>
                      <el-input class="inputCls"
                                name="goodwill"
                                v-model="formItem.goodwill"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期待摊费用</span></td>
                    <td>29</td>
                    <td>
                      <el-input class="inputCls"
                                name="lonTerDe"
                                v-model="formItem.lonTerDe"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延所得税资产</span></td>
                    <td>30</td>
                    <td>
                      <el-input class="inputCls"
                                name="defTaxAss"
                                v-model="formItem.defTaxAss"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他非流动资产</span></td>
                    <td>31</td>
                    <td>
                      <el-input class="inputCls"
                                name="othNonCa"
                                v-model="formItem.othNonCa"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*非流动资产合计</b></td>
                    <td>32</td>
                    <td>
                      <el-input class="inputCls"
                                name="totNonCa"
                                v-model="formItem.totNonCa"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*资产总计：</b></td>
                    <td>33</td>
                    <td>
                      <el-input class="inputCls"
                                name="totAss"
                                v-model="formItem.totAss"
                                disabled></el-input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <!-- 右侧表格 -->
              <table class="dataRight">
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
                    <td>
                      <el-input class="inputCls"
                                name="shoTerBor"
                                v-model="formItem.shoTerBor"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>交易性金融负债</span></td>
                    <td>36</td>
                    <td>
                      <el-input class="inputCls"
                                name="finLiaHft"
                                v-model="formItem.finLiaHft"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付票据</span></td>
                    <td>37</td>
                    <td>
                      <el-input class="inputCls"
                                name="notPay"
                                v-model="formItem.notPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付账款</span></td>
                    <td>38</td>
                    <td>
                      <el-input class="inputCls"
                                name="accPay"
                                v-model="formItem.accPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预收账款</span></td>
                    <td>39</td>
                    <td>
                      <el-input class="inputCls"
                                name="recInAdv"
                                v-model="formItem.recInAdv"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付职工薪酬</span></td>
                    <td>40</td>
                    <td>
                      <el-input class="inputCls"
                                name="empBenPay"
                                v-model="formItem.empBenPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应交税费</span></td>
                    <td>41</td>
                    <td>
                      <el-input class="inputCls"
                                name="taxPay"
                                v-model="formItem.taxPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付利息</span></td>
                    <td>42</td>
                    <td>
                      <el-input class="inputCls"
                                name="intPay"
                                v-model="formItem.intPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付股利</span></td>
                    <td>43</td>
                    <td>
                      <el-input class="inputCls"
                                name="divPay"
                                v-model="formItem.divPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>44</td>
                    <td>
                      <el-input class="inputCls"
                                name="othPay"
                                v-model="formItem.othPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的非流动负债</span></td>
                    <td>45</td>
                    <td>
                      <el-input class="inputCls"
                                name="curPorOltl"
                                v-model="formItem.curPorOltl"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*其他流动负债</b></td>
                    <td>46</td>
                    <td>
                      <el-input class="inputCls"
                                name="othCurLia"
                                v-model="formItem.othCurLia"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*流动负债合计</b></td>
                    <td>47</td>
                    <td>
                      <el-input class="inputCls"
                                name="totCurLia"
                                v-model="formItem.totCurLia"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动负债：</b></td>
                    <td>48</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>49</td>
                    <td>
                      <el-input class="inputCls"
                                name="lonTerBor"
                                v-model="formItem.lonTerBor"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付债券</span></td>
                    <td>50</td>
                    <td>
                      <el-input class="inputCls"
                                name="bonPay"
                                v-model="formItem.bonPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>51</td>
                    <td>
                      <el-input class="inputCls"
                                name="lonTerPay"
                                v-model="formItem.lonTerPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>专项应付款</span></td>
                    <td>52</td>
                    <td>
                      <el-input class="inputCls"
                                name="graPay"
                                v-model="formItem.graPay"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预计负债</span></td>
                    <td>53</td>
                    <td>
                      <el-input class="inputCls"
                                name="provisions"
                                v-model="formItem.provisions"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延所得税负债</span></td>
                    <td>54</td>
                    <td>
                      <el-input class="inputCls"
                                name="defTaxLia"
                                v-model="formItem.defTaxLia"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他非流动负债</span></td>
                    <td>55</td>
                    <td>
                      <el-input class="inputCls"
                                name="othNonCl"
                                v-model="formItem.othNonCl"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b class="pleft28">非流动负债合计</b></td>
                    <td>56</td>
                    <td>
                      <el-input class="inputCls"
                                name="totNonCl"
                                v-model="formItem.totNonCl"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*负债合计</b></td>
                    <td>57</td>
                    <td>
                      <el-input class="inputCls"
                                name="totLia"
                                v-model="formItem.totLia"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>所有者权益（或股东权益）：</b></td>
                    <td>58</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>实收资本（或股本）</span></td>
                    <td>59</td>
                    <td>
                      <el-input class="inputCls"
                                name="paiInCosc"
                                v-model="formItem.paiInCosc"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资本公积</span></td>
                    <td>60</td>
                    <td>
                      <el-input class="inputCls"
                                name="capRse"
                                v-model="formItem.capRse"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：库存股</span></td>
                    <td>61</td>
                    <td>
                      <el-input class="inputCls"
                                name="lesTreSto"
                                v-model="formItem.lesTreSto"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>盈余公积</span></td>
                    <td>62</td>
                    <td>
                      <el-input class="inputCls"
                                name="surRes"
                                v-model="formItem.surRes"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><span>未分配利润</span></td>
                    <td>63</td>
                    <td>
                      <el-input class="inputCls"
                                name="unaPro"
                                v-model="formItem.unaPro"
                                disabled></el-input>
                    </td>
                  </tr>
                  <tr>
                    <td><b>*所有者权益合计</b></td>
                    <td>64</td>
                    <td>
                      <el-input class="inputCls"
                                name="totEqu"
                                v-model="formItem.totEqu"
                                disabled></el-input>
                    </td>
                  </tr>
                  <!-- <tr>
                    <td></td>
                    <td>65</td>
                    <td></td>
                  </tr> -->
                  <tr>
                    <td><b>*负债和所有者权益总计</b></td>
                    <td>65</td>
                    <td>
                      <el-input class="inputCls"
                                name="totEquAl"
                                v-model="formItem.totEquAl"
                                disabled></el-input>
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
    <efcHistory v-if="efcHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efcHistory"
                :vis.sync="efcHistory"></efcHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import efcHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    efcHistory,
  },
  data() {
    return {
      efcHistory: false,
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
    historyBtnEfc() {
      this.efcHistory = true;
      this.paramDetail = {
        title: '07版资产负债表-报送历史列表页',
        dialogTitle: '',
        url: null,
        id: this.formItem.id,
      };
    },
    closeChild() {
      this.efcHistory = false;
    },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.efc.getValUrl;
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
</style>
