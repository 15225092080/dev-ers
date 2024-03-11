<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfh">查看报送历史</el-button>
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
                  <h3>事业单位资产负债表</h3>
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
                    <th>项目</th>
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
                      <el-form-item prop="curFun"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curFun"
                                  v-model="formItem.curFun"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>短期投资</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="shoTerInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="shoTerInv"
                                  v-model="formItem.shoTerInv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政应返还额度</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="amoOfFr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="amoOfFr"
                                  v-model="formItem.amoOfFr"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="notRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="notRec"
                                  v-model="formItem.notRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收账款</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="accRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="accRec"
                                  v-model="formItem.accRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预付账款</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="prepayments"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="prepayments"
                                  v-model="formItem.prepayments"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应收款</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="othRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othRec"
                                  v-model="formItem.othRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="inventories"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="inventories"
                                  v-model="formItem.inventories"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="othCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othCurAss"
                                  v-model="formItem.othCurAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动资产合计</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="totCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurAss"
                                  v-model="formItem.totCurAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动资产：</b></td>
                    <td>12</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>长期投资</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="lonTerInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerInv"
                                  v-model="formItem.lonTerInv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="fixAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="fixAss"
                                  v-model="formItem.fixAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产原价</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="oriCosOfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="oriCosOfa"
                                  v-model="formItem.oriCosOfa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：累计折旧</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="fixAssAd"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="fixAssAd"
                                  v-model="formItem.fixAssAd"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="conInPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="conInPro"
                                  v-model="formItem.conInPro"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="intAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="intAss"
                                  v-model="formItem.intAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产原价</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="oriPriOia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="oriPriOia"
                                  v-model="formItem.oriPriOia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：累计摊销</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="accAmo"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="accAmo"
                                  v-model="formItem.accAmo"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待处理资产损溢</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="assToBpptp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="assToBpptp"
                                  v-model="formItem.assToBpptp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动资产合计</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="totNonCa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCa"
                                  v-model="formItem.totNonCa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>资产总计</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="totAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totAss"
                                  v-model="formItem.totAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动负债：</b></td>
                    <td>24</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>短期借款</span></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="shoTerBor"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="shoTerBor"
                                  v-model="formItem.shoTerBor"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴税费</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="taxPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="taxPay"
                                  v-model="formItem.taxPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴国库款</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="trePay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="trePay"
                                  v-model="formItem.trePay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴财政专户款</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="payFinSa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="payFinSa"
                                  v-model="formItem.payFinSa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付职工薪酬</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="empBenPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="empBenPay"
                                  v-model="formItem.empBenPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付票据</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="notPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="notPay"
                                  v-model="formItem.notPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付账款</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="accPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="accPay"
                                  v-model="formItem.accPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预收账款</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="recInAdv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="recInAdv"
                                  v-model="formItem.recInAdv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="othPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othPay"
                                  v-model="formItem.othPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>其他流动负债</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="othCurLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othCurLia"
                                  v-model="formItem.othCurLia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动负债合计</b></td>
                    <td>35</td>
                    <td>
                      <el-form-item prop="totCurLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurLia"
                                  v-model="formItem.totCurLia"
                                  disabled></el-input>
                      </el-form-item>
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
                    <th class="tab_left">项目</th>
                    <th class="tab_middle">行次</th>
                    <th class="tab_right">期末值</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>非流动负债：</b></td>
                    <td>36</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>37</td>
                    <td>
                      <el-form-item prop="lonTerBor"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerBor"
                                  v-model="formItem.lonTerBor"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>38</td>
                    <td>
                      <el-form-item prop="lonTerPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerPay"
                                  v-model="formItem.lonTerPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动负债合计</b></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="totNonCl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCl"
                                  v-model="formItem.totNonCl"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>负债合计</b></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="totLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLia"
                                  v-model="formItem.totLia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>净资产：</b></td>
                    <td>41</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>事业基金</span></td>
                    <td>42</td>
                    <td>
                      <el-form-item prop="entFun"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="entFun"
                                  v-model="formItem.entFun"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>非流动资产基金</span></td>
                    <td>43</td>
                    <td>
                      <el-form-item prop="nonCurAf"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonCurAf"
                                  v-model="formItem.nonCurAf"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>专用基金</span></td>
                    <td>44</td>
                    <td>
                      <el-form-item prop="spePurFun"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="spePurFun"
                                  v-model="formItem.spePurFun"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政补助结转</span></td>
                    <td>45</td>
                    <td>
                      <el-form-item prop="finAidCo"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finAidCo"
                                  v-model="formItem.finAidCo"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政补助结余</span></td>
                    <td>46</td>
                    <td>
                      <el-form-item prop="finAidBal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finAidBal"
                                  v-model="formItem.finAidBal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>非财政补助结转</span></td>
                    <td>47</td>
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
                    <td><span>非财政补助结余</span></td>
                    <td>48</td>
                    <td>
                      <el-form-item prop="nonFinAb"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonFinAb"
                                  v-model="formItem.nonFinAb"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>事业结余</span></td>
                    <td>49</td>
                    <td>
                      <el-form-item prop="undBal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="undBal"
                                  v-model="formItem.undBal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营结余</span></td>
                    <td>50</td>
                    <td>
                      <el-form-item prop="opeBal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeBal"
                                  v-model="formItem.opeBal"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>净资产合计</b></td>
                    <td>51</td>
                    <td>
                      <el-form-item prop="totNetAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNetAss"
                                  v-model="formItem.totNetAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>负债和净资产合计</b></td>
                    <td>52</td>
                    <td>
                      <el-form-item prop="totLiaAna"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLiaAna"
                                  v-model="formItem.totLiaAna"
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
    <efhHistory v-if="efhHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efhHistory"
                :vis.sync="efhHistory"></efhHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import efhHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    efhHistory,
  },
  data() {
    return {
      efhHistory: false,
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
    historyBtnEfh() {
      this.efhHistory = true;
      this.paramDetail = {
        title: '事业单位资产负债-报送历史列表页',
        dialogTitle: '',
        url: null,
        id: this.formItem.id,
      };
    },
    closeChild() {
      this.efhHistory = false;
    },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.efh.getValUrl;
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
