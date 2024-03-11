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
                                  v-model="formItem.cashRecFsogoros"></el-input>
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
                                  v-model="formItem.taxRef"></el-input>
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
                                  v-model="formItem.othCasRrtoa"></el-input>
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
                                  @change="minusNetCasFfoa(clacNetIncIcace)"></el-input>
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
                                  v-model="formItem.casPaiFgas"></el-input>
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
                                  v-model="formItem.casPaiTaoboe"></el-input>
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
                                  v-model="formItem.payOfAtot"></el-input>
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
                                  v-model="formItem.othCasPfoa"></el-input>
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
                                  @change="minusNetCasFfoa(clacNetIncIcace)"></el-input>
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
                                  @change="clacNetIncIcace"
                                  :disabled="false"></el-input>
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
                                  v-model="formItem.casRecFroi"></el-input>
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
                                  v-model="formItem.casRecFo"></el-input>
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
                                  v-model="formItem.netCrfdofaiaaolta"></el-input>
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
                                  v-model="formItem.casRecRtoia"></el-input>
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
                                  @change="minusNetCasFfia(clacNetIncIcace)"></el-input>
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
                                  v-model="formItem.casPaiTafaiaaolta"></el-input>
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
                                  v-model="formItem.casPayFi"></el-input>
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
                                  v-model="formItem.casPayRtoa"></el-input>
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
                                  @change="minusNetCasFfia(clacNetIncIcace)"></el-input>
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
                                  @change="clacNetIncIcace"
                                  :disabled="false"></el-input>
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
                                  v-model="formItem.casRecFi"></el-input>
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
                                  v-model="formItem.casFroBor"></el-input>
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
                                  v-model="formItem.othCasRrtfa"></el-input>
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
                                  @change="minusNetCasFffa(clacNetIncIcace)"></el-input>
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
                                  v-model="formItem.casRepFd"></el-input>
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
                                  v-model="formItem.casPayFdodopaie"></el-input>
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
                                  v-model="formItem.casPayRtofa"></el-input>
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
                                  @change="minusNetCasFffa(clacNetIncIcace)"></el-input>
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
                                  @change="clacNetIncIcace"
                                  :disabled="false"></el-input>
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
                                  @change="clacNetIncIcace"></el-input>
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
                                  :disabled="false"></el-input>
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
                                  v-model="formItem.netPro"></el-input>
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
                                  v-model="formItem.proForAss"></el-input>
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
                                  v-model="formItem.depOfFa"></el-input>
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
                                  v-model="formItem.amoOfIa"></el-input>
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
                                  v-model="formItem.lonTerDea"></el-input>
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
                                  v-model="formItem.decOfDe"></el-input>
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
                                  v-model="formItem.addOfAe"></el-input>
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
                                  v-model="formItem.losOnDofaiaaolta"></el-input>
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
                                  v-model="formItem.losOnSofa"></el-input>
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
                                  v-model="formItem.finExp"></el-input>
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
                                  v-model="formItem.losArsFi"></el-input>
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
                                  v-model="formItem.defTaxCre"></el-input>
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
                                  v-model="formItem.decInInv"></el-input>
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
                                  v-model="formItem.decInOr"></el-input>
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
                                  v-model="formItem.incInOr"></el-input>
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
                                  v-model="formItem.others"></el-input>
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
                                  v-model="formItem.netCasFfoa2"></el-input>
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
                                  v-model="formItem.debTraTc"></el-input>
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
                                  v-model="formItem.oneYeaDcb"></el-input>
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
                                  v-model="formItem.finRenTtfa"></el-input>
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
                                  v-model="formItem.others2"></el-input>
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
                                  v-model="formItem.casAtTeop"></el-input>
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
                                  v-model="formItem.casAtTbotp"></el-input>
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
                                  v-model="formItem.casEquAteotp"></el-input>
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
                                  v-model="formItem.casRquAtbotp"></el-input>
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
                                  v-model="formItem.netIncIcace2"></el-input>
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
      showSee: true,
      editDisabled: false,
      search_IN_orgId_fake: '',
      search_IN_org: '',
      defaultProps: '',
      param: {},
      self: this,
      pickerOptions: {
        // 不能大于当前日
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      paramTree: {},
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

        cashRecFsogoros: '',
        taxRef: '',
        othCasRrtoa: '',
        totCasIfoa: '',
        casPaiFgas: '',
        casPaiTaoboe: '',
        payOfAtot: '',
        othCasPfoa: '',
        totCasOfoa: '',
        netCasFfoa: '',
        casRecFroi: '',
        casRecFo: '',

        netCrfdofaiaaolta: '',
        casRecRtoia: '',
        totCasIfia: '',
        casPaiTafaiaaolta: '',
        casPayFi: '',
        casPayRtoa: '',
        totCasOfia: '',
        netCasFfia: '',
        casRecFi: '',
        casFroBor: '',
        othCasRrtfa: '',
        totCasIffa: '',
        casRepFd: '',
        casPayFdodopaie: '',
        casPayRtofa: '',
        totCasOffa: '',
        netCasFffa: '',
        effOfErcoc: '',

        netIncIcace: '',

        netPro: '',
        proForAss: '',
        depOfFa: '',
        amoOfIa: '',
        lonTerDea: '',
        decOfDe: '',
        addOfAe: '',
        losOnDofaiaaolta: '',
        losOnSofa: '',
        finExp: '',
        losArsFi: '',
        defTaxCre: '',
        decInInv: '',

        decInOr: '',
        incInOr: '',
        others: '',
        netCasFfoa2: '',
        debTraTc: '',
        oneYeaDcb: '',
        finRenTtfa: '',
        others2: '',
        casAtTeop: '',

        casAtTbotp: '',
        casEquAteotp: '',
        casRquAtbotp: '',
        netIncIcace2: '',
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
        totCasIfoa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totCasOfoa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        netCasFfoa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        // netCasFfoa: [
        //   { required: true, message: '输入不能为空', trigger: 'blur' }
        // ],
        totCasIfia: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totCasOfia: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        netCasFfia: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totCasIffa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        totCasOffa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        netCasFffa: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        netIncIcace: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
      },
      collapseList: {
        activeNames: ['efg'], // 默认显示那个折叠栏 没有默认显示全部。
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
    // efg  经营活动产生的现金流量净额＝经营活动现金流入小计－经营活动现金流出小计
    minusNetCasFfoa(fun) {
      let arr = ['netCasFfoa', 'totCasIfoa', 'totCasOfoa'];
      this.calcObj.minus(this, arr);
      if (fun) {
        fun();
      }
    },
    // efg  “投资活动产生的现金流量净额＝投资活动现金流入小计－投资活动现金流出小计”
    minusNetCasFfia(fun) {
      let arr = ['netCasFfia', 'totCasIfia', 'totCasOfia'];
      this.calcObj.minus(this, arr);
      if (fun) {
        fun();
      }
    },
    // efg  筹集活动产生的现金流量净额＝筹资活动现金流入小计－筹资活动现金流出小计”
    minusNetCasFffa(fun) {
      let arr = ['netCasFffa', 'totCasIffa', 'totCasOffa'];
      this.calcObj.minus(this, arr);
      if (fun) {
        fun();
      }
    },
    // efg  现金及现金等价物净增加额＝筹集活动产生的现金流量净额＋汇率变动对现金的影响＋经营活动产生的现金流量净额＋投资活动产生的现金流量净额
    clacNetIncIcace() {
      let arr = [
        'netIncIcace',
        'netCasFffa',
        'effOfErcoc',
        'netCasFfoa',
        'netCasFfia',
      ];
      this.calcObj.calc(this, arr);
    },
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
          let url = this.$urlList.efg.getValUrl;
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
            url = this.$urlList.efg.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efg.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efg.update;
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
      'totCasIfoa',
      '',
      '',
      '',
      '',
      'totCasOfoa',
      'netCasFfoa',
      '',
      '',
      '',
      '',
      'totCasIfia',
      '',
      '',
      '',
      'totCasOfia',
      'netCasFfia',
      '',
      '',
      '',
      'totCasIffa',
      '',
      '',
      '',
      'totCasOffa',
      'netCasFffa',
      '',
      'netIncIcace',
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
      '',
      '',
      '',
      '',
    ];
    // 表单数字校验
    let arr = [
      'cashRecFsogoros',
      'taxRef',
      'othCasRrtoa',
      'totCasIfoa',
      'casPaiFgas',
      'casPaiTaoboe',
      'payOfAtot',
      'othCasPfoa',
      'totCasOfoa',
      'netCasFfoa',
      'casRecFroi',
      'casRecFo',
      'netCrfdofaiaaolta',
      'casRecRtoia',
      'totCasIfia',
      'casPaiTafaiaaolta',
      'casPayFi',
      'casPayRtoa',
      'totCasOfia',
      'netCasFfia',
      'casRecFi',
      'casFroBor',
      'othCasRrtfa',
      'totCasIffa',
      'casRepFd',
      'casPayFdodopaie',
      'casPayRtofa',
      'totCasOffa',
      'netCasFffa',
      'effOfErcoc',
      'netIncIcace',
      'netPro',
      'proForAss',
      'depOfFa',
      'amoOfIa',
      'lonTerDea',
      'decOfDe',
      'addOfAe',
      'losOnDofaiaaolta',
      'losOnSofa',
      'finExp',
      'losArsFi',
      'defTaxCre',
      'decInInv',
      'decInOr',
      'incInOr',
      'others',
      'netCasFfoa2',
      'debTraTc',
      'oneYeaDcb',
      'finRenTtfa',
      'others2',
      'casAtTeop',
      'casAtTbotp',
      'casEquAteotp',
      'casRquAtbotp',
      'netIncIcace2',
    ];

    let that = this;
    // 非空校验
    for (let i = 0; i < arr0.length; i++) {
      that.rules[arr0[i]] = [{}];
      that.rules[arr0[i]] = [];
      // 当字段为 经营活动产生的现金流量净额、投资活动产生的现金流量净额、筹集活动产生的现金流量净额、现金及现金等价物净增加额 时，不进行数字校验
      if (
        arr0[i] == 'netCasFfoa' ||
        arr0[i] == 'netCasFfia' ||
        arr0[i] == 'netCasFffa' ||
        arr0[i] == 'netIncIcace'
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
      // 当字段为 经营活动产生的现金流量净额、投资活动产生的现金流量净额、筹集活动产生的现金流量净额、现金及现金等价物净增加额 时，不进行数字校验
      if (
        arr0[i] == 'netCasFfoa' ||
        arr0[i] == 'netCasFfia' ||
        arr0[i] == 'netCasFffa' ||
        arr0[i] == 'netIncIcace'
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
