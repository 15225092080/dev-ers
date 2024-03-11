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
                                  v-model="formItem.curFun"></el-input>
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
                                  v-model="formItem.shoTerInv"></el-input>
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
                                  v-model="formItem.amoOfFr"></el-input>
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
                                  v-model="formItem.notRec"></el-input>
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
                                  v-model="formItem.accRec"></el-input>
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
                                  v-model="formItem.prepayments"></el-input>
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
                                  v-model="formItem.othRec"></el-input>
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
                                  v-model="formItem.inventories"></el-input>
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
                                  v-model="formItem.othCurAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>流动资产合计</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="totCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurAss"
                                  v-model="formItem.totCurAss"
                                  @blur="calcObj.clacTotAss(self)"></el-input>
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
                                  v-model="formItem.lonTerInv"></el-input>
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
                                  v-model="formItem.fixAss"></el-input>
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
                                  v-model="formItem.oriCosOfa"></el-input>
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
                                  v-model="formItem.fixAssAd"></el-input>
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
                                  v-model="formItem.conInPro"></el-input>
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
                                  v-model="formItem.intAss"></el-input>
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
                                  v-model="formItem.oriPriOia"></el-input>
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
                                  v-model="formItem.accAmo"></el-input>
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
                                  v-model="formItem.assToBpptp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>非流动资产合计</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="totNonCa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCa"
                                  v-model="formItem.totNonCa"
                                  @blur="calcObj.clacTotAss(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>资产总计</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="totAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totAss"
                                  v-model="formItem.totAss"
                                  :disabled="false"></el-input>
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
                                  v-model="formItem.shoTerBor"></el-input>
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
                                  v-model="formItem.taxPay"></el-input>
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
                                  v-model="formItem.trePay"></el-input>
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
                                  v-model="formItem.payFinSa"></el-input>
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
                                  v-model="formItem.empBenPay"></el-input>
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
                                  v-model="formItem.notPay"></el-input>
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
                                  v-model="formItem.accPay"></el-input>
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
                                  v-model="formItem.recInAdv"></el-input>
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
                                  v-model="formItem.othPay"></el-input>
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
                                  v-model="formItem.othCurLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>流动负债合计</b></td>
                    <td>35</td>
                    <td>
                      <el-form-item prop="totCurLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurLia"
                                  v-model="formItem.totCurLia"
                                  @blur="calcObj.clacTotLiaAl(self)"></el-input>
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
                                  v-model="formItem.lonTerBor"></el-input>
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
                                  v-model="formItem.lonTerPay"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>非流动负债合计</b></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="totNonCl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCl"
                                  v-model="formItem.totNonCl"
                                  @blur="calcObj.clacTotLiaAl(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>负债合计</b></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="totLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  :disabled="false"
                                  name="totLia"
                                  v-model="formItem.totLia"></el-input>
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
                                  v-model="formItem.entFun"></el-input>
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
                                  v-model="formItem.nonCurAf"></el-input>
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
                                  v-model="formItem.spePurFun"></el-input>
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
                                  v-model="formItem.finAidCo"></el-input>
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
                                  v-model="formItem.finAidBal"></el-input>
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
                                  v-model="formItem.nonFinAco"></el-input>
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
                                  v-model="formItem.nonFinAb"></el-input>
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
                                  v-model="formItem.undBal"></el-input>
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
                                  v-model="formItem.opeBal"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>净资产合计</b></td>
                    <td>51</td>
                    <td>
                      <el-form-item prop="totNetAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNetAss"
                                  v-model="formItem.totNetAss"
                                  @blur="calcObj.clacTotLiaAna(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>负债和净资产合计</b></td>
                    <td>52</td>
                    <td>
                      <el-form-item prop="totLiaAna"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLiaAna"
                                  :disabled="false"
                                  v-model="formItem.totLiaAna"></el-input>
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

        curFun: '',
        shoTerInv: '',
        amoOfFr: '',
        notRec: '',
        accRec: '',
        prepayments: '',
        othRec: '',
        inventories: '',
        othCurAss: '',
        totCurAss: '',
        lonTerInv: '',
        fixAss: '',

        oriCosOfa: '',
        fixAssAd: '',
        conInPro: '',
        intAss: '',
        oriPriOia: '',
        accAmo: '',
        assToBpptp: '',
        totNonCa: '',
        totAss: '',
        shoTerBor: '',
        taxPay: '',
        trePay: '',
        payFinSa: '',
        empBenPay: '',
        notPay: '',
        accPay: '',
        recInAdv: '',
        othPay: '',

        othCurLia: '',

        totCurLia: '',
        lonTerBor: '',
        lonTerPay: '',
        totNonCl: '',
        totLia: '',
        entFun: '',
        nonCurAf: '',
        spePurFun: '',
        finAidCo: '',
        finAidBal: '',
        nonFinAco: '',
        nonFinAb: '',
        undBal: '',

        opeBal: '',
        totNetAss: '',
        totLiaAna: '',
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
        totCurAss: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totNonCa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totAss: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
        totCurLia: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totNonCl: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totLia: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
        totNetAss: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totLiaAna: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
      },
      collapseList: {
        activeNames: ['efh'], // 默认显示那个折叠栏 没有默认显示全部。
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
          let url = this.$urlList.efh.getValUrl;
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
      // 资产总计 = 流动资产合计 + 非流动资产合计
      let totCurAss = this.formItem.totCurAss;
      let totNonCa = this.formItem.totNonCa;
      let totAss = this.formItem.totAss;
      if (totAss && totNonCa && totNonCa) {
        if (
          (parseFloat(totCurAss) + parseFloat(totNonCa)).toFixed(2) !=
          parseFloat(totAss)
        ) {
          this.$alert(
            '资产总计必须等于 流动资产合计 与 非流动资产合计 之和',
            '提示',
            {
              dangerouslyUseHTMLString: true,
            }
          );
          return false;
        }
      }
      // 负债和净资产合计 = 负债合计 + 净资产合计
      let totLia = this.formItem.totLia;
      let totNetAss = this.formItem.totNetAss;
      let totLiaAna = this.formItem.totLiaAna;
      if (totLiaAna && totCurAss && totNonCa) {
        if (
          (parseFloat(totLia) + parseFloat(totNetAss)).toFixed(2) !=
          parseFloat(totLiaAna)
        ) {
          this.$alert(
            '负债和净资产合计 必须等于 负债合计 与 净资产合计 之和',
            '提示',
            {
              dangerouslyUseHTMLString: true,
            }
          );
          return false;
        }
      }
      // 资产总计 是否 等于 负债和净资产总计
      if (totAss && totLiaAna) {
        if (totAss != totLiaAna) {
          this.$alert('资产总计必须等于负债和净资产总计', '提示', {
            dangerouslyUseHTMLString: true,
          });
          return false;
        }
      }
      // 验证提交
      this.$refs[formItem].validate((valid) => {
        // 必填项校验
        if (valid) {
          // 判断url接口是新增功能还是修改功能
          let url = '';
          if (this.$store.getters.operatState == 'add' && !this.comData) {
            // 新增功能
            url = this.$urlList.efh.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efh.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efh.update;
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
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'totCurAss',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'totNonCa',
      'totAss',
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
      'totCurLia',
      '',
      '',
      'totNonCl',
      'totLia',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'totNetAss',
      'totLiaAna',
    ];
    // 表单数字校验
    let arr = [
      'curFun',
      'shoTerInv',
      'amoOfFr',
      'notRec',
      'accRec',
      'prepayments',
      'othRec',
      'inventories',
      'othCurAss',
      'totCurAss',
      'lonTerInv',
      'fixAss',
      'oriCosOfa',
      'fixAssAd',
      'conInPro',
      'intAss',
      'oriPriOia',
      'accAmo',
      'assToBpptp',
      'totNonCa',
      'totAss',
      'shoTerBor',
      'taxPay',
      'trePay',
      'payFinSa',
      'empBenPay',
      'notPay',
      'accPay',
      'recInAdv',
      'othPay',
      'othCurLia',
      'totCurLia',
      'lonTerBor',
      'lonTerPay',
      'totNonCl',
      'totLia',
      'entFun',
      'nonCurAf',
      'spePurFun',
      'finAidCo',
      'finAidBal',
      'nonFinAco',
      'nonFinAb',
      'undBal',
      'opeBal',
      'totNetAss',
      'totLiaAna',
    ];

    let that = this;
    // 非空校验
    for (let i = 0; i < arr0.length; i++) {
      that.rules[arr0[i]] = [{}];
      that.rules[arr0[i]] = [];
      // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
      if (
        arr0[i] == 'totAss' ||
        arr0[i] == 'totLiaAna' ||
        arr0[i] == 'totLia'
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
      if (arr[i] == 'totAss' || arr[i] == 'totLiaAna' || arr[i] == 'totLia') {
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
