<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfg">查看报送历史</el-button>
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
                  <h3>2002版现金流量表</h3>
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
                    <td><b>一、经营活动产生的现金流量：</b></td>
                    <td>1</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>销售商品和提供劳务收到的现金</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="cashRecFsogoros"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="cashRecFsogoros"
                                  v-model="formItem.cashRecFsogoros"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到的税费返还</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="taxRef"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="taxRef"
                                  v-model="formItem.taxRef"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到的其他与经营活动有关的现金</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="othCasRrtoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othCasRrtoa"
                                  v-model="formItem.othCasRrtoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动现金流入小计</b></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="totCasIfoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasIfoa"
                                  v-model="formItem.totCasIfoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>购买商品、接受劳务支付的现金</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="casPaiFgas"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPaiFgas"
                                  v-model="formItem.casPaiFgas"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付给职工以及为职工支付的现金</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="casPaiTaoboe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPaiTaoboe"
                                  v-model="formItem.casPaiTaoboe"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付的各项税费</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="payOfAtot"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="payOfAtot"
                                  v-model="formItem.payOfAtot"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付的其他与经营活动有关的现金</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="othCasPfoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othCasPfoa"
                                  v-model="formItem.othCasPfoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动现金流出小计</b></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="totCasOfoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasOfoa"
                                  v-model="formItem.totCasOfoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动产生的现金流量净额</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="netCasFfoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netCasFfoa"
                                  v-model="formItem.netCasFfoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、投资活动产生的现金流量：</b></td>
                    <td>12</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>收回投资所收到的现金</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="casRecFroi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRecFroi"
                                  v-model="formItem.casRecFroi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>取得投资收益所收到的现金</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="casRecFo"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRecFo"
                                  v-model="formItem.casRecFo"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>处置固定资产、无形资产和其他长期资产所收回的现金净额</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="netCrfdofaiaaolta"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netCrfdofaiaaolta"
                                  v-model="formItem.netCrfdofaiaaolta"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到的其他与投资活动有关的现金</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="casRecRtoia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRecRtoia"
                                  v-model="formItem.casRecRtoia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动现金流入小计</b></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="totCasIfia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasIfia"
                                  v-model="formItem.totCasIfia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>购建固定资产、无形资产和其他长期资产所支付的现金</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="casPaiTafaiaaolta"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPaiTafaiaaolta"
                                  v-model="formItem.casPaiTafaiaaolta"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资所支付的现金</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="casPayFi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPayFi"
                                  v-model="formItem.casPayFi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付的其他与投资活动有关的现金</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="casPayRtoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPayRtoa"
                                  v-model="formItem.casPayRtoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动现金流出小计</b></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="totCasOfia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasOfia"
                                  v-model="formItem.totCasOfia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动产生的现金流量净额</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="netCasFfia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netCasFfia"
                                  v-model="formItem.netCasFfia"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、筹资活动产生的现金流量：</b></td>
                    <td>23</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>吸收投资所收到的现金</span></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="casRecFi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRecFi"
                                  v-model="formItem.casRecFi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>借款所收到的现金</span></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="casFroBor"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casFroBor"
                                  v-model="formItem.casFroBor"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到的其他与筹资活动有关的现金</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="othCasRrtfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othCasRrtfa"
                                  v-model="formItem.othCasRrtfa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹资活动现金流入小计</b></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="totCasIffa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasIffa"
                                  v-model="formItem.totCasIffa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>偿还债务所支付的现金</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="casRepFd"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRepFd"
                                  v-model="formItem.casRepFd"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>分配股利、利润或偿付利息所支付的现金</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="casPayFdodopaie"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPayFdodopaie"
                                  v-model="formItem.casPayFdodopaie"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付的其他与筹资活动有关的现金</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="casPayRtofa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casPayRtofa"
                                  v-model="formItem.casPayRtofa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹资活动现金流出小计</b></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="totCasOffa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCasOffa"
                                  v-model="formItem.totCasOffa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹集活动产生的现金流量净额</b></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="netCasFffa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netCasFffa"
                                  v-model="formItem.netCasFffa"
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
                    <td><b>四、汇率变动对现金的影响</b></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="effOfErcoc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="effOfErcoc"
                                  v-model="formItem.effOfErcoc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、现金及现金等价物净增加额</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="netIncIcace"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netIncIcace"
                                  v-model="formItem.netIncIcace"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>补充资料：</b></td>
                    <td>35</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><b>1、将净利润调节为经营活动现金流量：</b></td>
                    <td>36</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>净利润</span></td>
                    <td>37</td>
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
                    <td><span>加：计提的资产减值准备</span></td>
                    <td>38</td>
                    <td>
                      <el-form-item prop="proForAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proForAss"
                                  v-model="formItem.proForAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产拆旧</span></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="depOfFa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="depOfFa"
                                  v-model="formItem.depOfFa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产摊销</span></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="amoOfIa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="amoOfIa"
                                  v-model="formItem.amoOfIa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期待摊费用摊销</span></td>
                    <td>41</td>
                    <td>
                      <el-form-item prop="lonTerDea"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerDea"
                                  v-model="formItem.lonTerDea"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待摊费用减少（减：增加）</span></td>
                    <td>42</td>
                    <td>
                      <el-form-item prop="decOfDe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="decOfDe"
                                  v-model="formItem.decOfDe"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预提费用增加（减：减少）</span></td>
                    <td>43</td>
                    <td>
                      <el-form-item prop="addOfAe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="addOfAe"
                                  v-model="formItem.addOfAe"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>处置固定资产、无形资产和其他长期资产的损失（减：收益）</span></td>
                    <td>44</td>
                    <td>
                      <el-form-item prop="losOnDofaiaaolta"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losOnDofaiaaolta"
                                  v-model="formItem.losOnDofaiaaolta"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产报废损失</span></td>
                    <td>45</td>
                    <td>
                      <el-form-item prop="losOnSofa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losOnSofa"
                                  v-model="formItem.losOnSofa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财务费用</span></td>
                    <td>46</td>
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
                    <td><span>投资损失（减:收益）</span></td>
                    <td>47</td>
                    <td>
                      <el-form-item prop="losArsFi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losArsFi"
                                  v-model="formItem.losArsFi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延税款贷项（减:借项）</span></td>
                    <td>48</td>
                    <td>
                      <el-form-item prop="defTaxCre"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defTaxCre"
                                  v-model="formItem.defTaxCre"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货的减少（减:增加）</span></td>
                    <td>49</td>
                    <td>
                      <el-form-item prop="decInInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="decInInv"
                                  v-model="formItem.decInInv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营性应收项目的减少（减:增加）</span></td>
                    <td>50</td>
                    <td>
                      <el-form-item prop="decInOr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="decInOr"
                                  v-model="formItem.decInOr"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营性应付项目的增加（减:减少）</span></td>
                    <td>51</td>
                    <td>
                      <el-form-item prop="incInOr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incInOr"
                                  v-model="formItem.incInOr"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他</span></td>
                    <td>52</td>
                    <td>
                      <el-form-item prop="others"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="others"
                                  v-model="formItem.others"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>经营活动产生的现金流量净额</span></td>
                    <td>53</td>
                    <td>
                      <el-form-item prop="netCasFfoa2"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netCasFfoa2"
                                  v-model="formItem.netCasFfoa2"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>2、不涉及现金收支的投资及筹资活动：</b></td>
                    <td>54</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>债务转为资本</span></td>
                    <td>55</td>
                    <td>
                      <el-form-item prop="debTraTc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="debTraTc"
                                  v-model="formItem.debTraTc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的可转换公司债券</span></td>
                    <td>56</td>
                    <td>
                      <el-form-item prop="oneYeaDcb"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="oneYeaDcb"
                                  v-model="formItem.oneYeaDcb"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>融资租入固定资产</span></td>
                    <td>57</td>
                    <td>
                      <el-form-item prop="finRenTtfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finRenTtfa"
                                  v-model="formItem.finRenTtfa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>所其他</span></td>
                    <td>58</td>
                    <td>
                      <el-form-item prop="others2"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="others2"
                                  v-model="formItem.others2"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>3、现金及现金等价物净变动情况：</b></td>
                    <td>59</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>现金的期末余额</span></td>
                    <td>60</td>
                    <td>
                      <el-form-item prop="casAtTeop"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casAtTeop"
                                  v-model="formItem.casAtTeop"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：现金的期初余额</span></td>
                    <td>61</td>
                    <td>
                      <el-form-item prop="casAtTbotp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casAtTbotp"
                                  v-model="formItem.casAtTbotp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：现金等价物的期末余额</span></td>
                    <td>62</td>
                    <td>
                      <el-form-item prop="casEquAteotp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casEquAteotp"
                                  v-model="formItem.casEquAteotp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：现金等价物的期初余额</span></td>
                    <td>63</td>
                    <td>
                      <el-form-item prop="casRquAtbotp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="casRquAtbotp"
                                  v-model="formItem.casRquAtbotp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>现金及现金等价物净增加额</span></td>
                    <td>64</td>
                    <td>
                      <el-form-item prop="netIncIcace2"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netIncIcace2"
                                  v-model="formItem.netIncIcace2"
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
    <efgHistory v-if="efgHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efgHistory"
                :vis.sync="efgHistory"></efgHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import efgHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    efgHistory,
  },
  data() {
    return {
      efgHistory: false,
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
    historyBtnEfg() {
      this.efgHistory = true;
      this.paramDetail = {
        title: '02版现金流量表-报送历史列表页',
        dialogTitle: '',
        url: null,
        id: this.formItem.id,
      };
    },
    closeChild() {
      this.efgHistory = false;
    },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.efg.getValUrl;
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
