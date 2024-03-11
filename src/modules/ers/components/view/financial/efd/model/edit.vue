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
                  <h3>2002版利润及利润分配表</h3>
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
                    <td><b>一：主营业务收入</b></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="maiRevRev"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="maiRevRev"
                                  v-model="formItem.maiRevRev"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：出口产品（商品）销售收入</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="salIncOegp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="salIncOegp"
                                  v-model="formItem.salIncOegp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>进口产品（商品）销售收入</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="salIncOigp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="salIncOigp"
                                  v-model="formItem.salIncOigp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：销售折扣与折让</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="disAndAll"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="disAndAll"
                                  v-model="formItem.disAndAll"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二：主营业务收入净额</b></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="netAmoOifmb"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netAmoOifmb"
                                  v-model="formItem.netAmoOifmb"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）主营业务成本</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="maiOpeCos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="maiOpeCos"
                                  v-model="formItem.maiOpeCos"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：出口产品（商品）销售成本</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="salIncOep"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="salIncOep"
                                  v-model="formItem.salIncOep"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）主营业务税金及附加</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="priBusTaec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="priBusTaec"
                                  v-model="formItem.priBusTaec"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）经营费用</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="opeExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="opeExp"
                                  v-model="formItem.opeExp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）其他</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="othOpeCos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othOpeCos"
                                  v-model="formItem.othOpeCos"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：（一）递延收益</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="defInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defInc"
                                  v-model="formItem.defInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）代购代销收入</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="incFroSa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFroSa"
                                  v-model="formItem.incFroSa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）其他</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="othOpeInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othOpeInc"
                                  v-model="formItem.othOpeInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、主营业务利润（亏损以“－”号填列）</b></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="priBusPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="priBusPro"
                                  v-model="formItem.priBusPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：其他业务利润（亏损以“－”号填列）</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="othBusPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othBusPro"
                                  v-model="formItem.othBusPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）营业费用</span></td>
                    <td>16</td>
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
                    <td><span>（二）管理费用</span></td>
                    <td>17</td>
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
                    <td><span>（三）财务费用</span></td>
                    <td>18</td>
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
                    <td><span>（四）其他</span></td>
                    <td>19</td>
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
                    <td><b>四：营业利润（亏损以“－”号填列）</b></td>
                    <td>20</td>
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
                    <td><span>加：（一）投资收益（损失以“－”号填列）</span></td>
                    <td>21</td>
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
                    <td><span>（二）期货收益</span></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="futInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="futInc"
                                  v-model="formItem.futInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）补贴收入</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="allInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="allInc"
                                  v-model="formItem.allInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：补贴前亏损的企业补贴收入</span></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="allIncBa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="allIncBa"
                                  v-model="formItem.allIncBa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）营业外收入</span></td>
                    <td>25</td>
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
                    <td><span>其中：处置固定资产净收益</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="netGaiOdofa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netGaiOdofa"
                                  v-model="formItem.netGaiOdofa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>非货币性交易收益</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="incFroNct"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFroNct"
                                  v-model="formItem.incFroNct"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>出售无形资产收益</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="incFroOia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFroOia"
                                  v-model="formItem.incFroOia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>罚款净收入</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="incFroPen"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFroPen"
                                  v-model="formItem.incFroPen"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（五）其他</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="othInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othInc"
                                  v-model="formItem.othInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：用以前年度含量工资节余弥补利润</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="calFroTcsb"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="calFroTcsb"
                                  v-model="formItem.calFroTcsb"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）营业外支出</span></td>
                    <td>32</td>
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
                    <td><span>其中：处置固定资产净损失</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="losFroDofa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losFroDofa"
                                  v-model="formItem.losFroDofa"></el-input>
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
                    <td><span>债务重组损失</span></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="excOfNmal"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="excOfNmal"
                                  v-model="formItem.excOfNmal"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>罚款支出</span></td>
                    <td>35</td>
                    <td>
                      <el-form-item prop="losOfLaw"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losOfLaw"
                                  v-model="formItem.losOfLaw"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>捐赠支出</span></td>
                    <td>36</td>
                    <td>
                      <el-form-item prop="payForDon"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="payForDon"
                                  v-model="formItem.payForDon"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）其他支出</span></td>
                    <td>37</td>
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
                    <td><span>其中：结转的含量工资包干节余</span></td>
                    <td>38</td>
                    <td>
                      <el-form-item prop="balOfCs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="balOfCs"
                                  v-model="formItem.balOfCs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>五、利润总额（亏损总额以“－”号填列）</b></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="totPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totPro"
                                  v-model="formItem.totPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：所得税</span></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="incometax"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incometax"
                                  v-model="formItem.incometax"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b class="light">少数股东损益</b></td>
                    <td>41</td>
                    <td>
                      <el-form-item prop="impLos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="impLos"
                                  v-model="formItem.impLos"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：*未确认的投资损失（以“+”号填列）</span></td>
                    <td>42</td>
                    <td>
                      <el-form-item prop="unrInvLos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unrInvLos"
                                  v-model="formItem.unrInvLos"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>六、净利润（净亏损以“－”号填列）</b></td>
                    <td>43</td>
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
                    <td><span>加：（一）年初未分配利润</span></td>
                    <td>44</td>
                    <td>
                      <el-form-item prop="proDisAbop"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proDisAbop"
                                  v-model="formItem.proDisAbop"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）盈余公积补亏</span></td>
                    <td>45</td>
                    <td>
                      <el-form-item prop="comOfSr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="comOfSr"
                                  v-model="formItem.comOfSr"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）其他调整因素</span></td>
                    <td>46</td>
                    <td>
                      <el-form-item prop="othAdjFac"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othAdjFac"
                                  v-model="formItem.othAdjFac"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>七、可供分配的利润</b></td>
                    <td>47</td>
                    <td>
                      <el-form-item prop="proAvaFd"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proAvaFd"
                                  v-model="formItem.proAvaFd"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）单项留用的利润</span></td>
                    <td>48</td>
                    <td>
                      <el-form-item prop="proResFasi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proResFasi"
                                  v-model="formItem.proResFasi"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）补充流动资本</span></td>
                    <td>49</td>
                    <td>
                      <el-form-item prop="supCurCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="supCurCap"
                                  v-model="formItem.supCurCap"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）提取法定盈余公积</span></td>
                    <td>50</td>
                    <td>
                      <el-form-item prop="appOfSsr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="appOfSsr"
                                  v-model="formItem.appOfSsr"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）提取法定公益金</span></td>
                    <td>51</td>
                    <td>
                      <el-form-item prop="appOfSwf"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="appOfSwf"
                                  v-model="formItem.appOfSwf"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（五）提取职工奖励及福利基金</span></td>
                    <td>52</td>
                    <td>
                      <el-form-item prop="appOfSiawf"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="appOfSiawf"
                                  v-model="formItem.appOfSiawf"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（六）提取储备基金</span></td>
                    <td>53</td>
                    <td>
                      <el-form-item prop="appOfRf"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="appOfRf"
                                  v-model="formItem.appOfRf"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（七）提取企业发展基金</span></td>
                    <td>54</td>
                    <td>
                      <el-form-item prop="appOfEef"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="appOfEef"
                                  v-model="formItem.appOfEef"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（八）利润归还投资</span></td>
                    <td>55</td>
                    <td>
                      <el-form-item prop="proCapOroi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proCapOroi"
                                  v-model="formItem.proCapOroi"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（九）其他</span></td>
                    <td>56</td>
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
                    <td><b>八、可供投资者分配的利润</b></td>
                    <td>57</td>
                    <td>
                      <el-form-item prop="proAvaFod"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proAvaFod"
                                  v-model="formItem.proAvaFod"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）应付优先股股利</span></td>
                    <td>58</td>
                    <td>
                      <el-form-item prop="preStoDp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="preStoDp"
                                  v-model="formItem.preStoDp"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）提取任意盈余公积</span></td>
                    <td>59</td>
                    <td>
                      <el-form-item prop="witOthCaf"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="witOthCaf"
                                  v-model="formItem.witOthCaf"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）应付普通股股利</span></td>
                    <td>60</td>
                    <td>
                      <el-form-item prop="payDivOcs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="payDivOcs"
                                  v-model="formItem.payDivOcs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）转作资本（股本）的普通股股利</span></td>
                    <td>61</td>
                    <td>
                      <el-form-item prop="traFroOsdtpcos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="traFroOsdtpcos"
                                  v-model="formItem.traFroOsdtpcos"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（五）其他</span></td>
                    <td>62</td>
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
                    <td><b>九、未分配利润</b></td>
                    <td>63</td>
                    <td>
                      <el-form-item prop="unaPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unaPro"
                                  v-model="formItem.unaPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：应由以后年度税前利润弥补的亏损（以“+”号填列）</span></td>
                    <td>64</td>
                    <td>
                      <el-form-item prop="losComBtt"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="losComBtt"
                                  v-model="formItem.losComBtt"></el-input>
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

        maiRevRev: '',
        salIncOegp: '',
        salIncOigp: '',
        disAndAll: '',
        netAmoOifmb: '',
        maiOpeCos: '',
        salIncOep: '',
        priBusTaec: '',
        opeExp: '',
        othOpeCos: '',
        defInc: '',
        incFroSa: '',
        othOpeInc: '',
        priBusPro: '',
        othBusPro: '',
        selExp: '',
        genAndAe: '',
        finExp: '',

        othExp: '',

        opePro: '',
        invInc: '',
        futInc: '',
        allInc: '',
        allIncBa: '',
        nonOpeInc: '',
        netGaiOdofa: '',
        incFroNct: '',
        incFroOia: '',
        incFroPen: '',
        othInc: '',
        calFroTcsb: '',
        nonOpeExp: '',

        losFroDofa: '',
        excOfNmal: '',
        losOfLaw: '',
        payForDon: '',
        othPay: '',
        balOfCs: '',
        totPro: '',
        incometax: '',
        impLos: '',

        unrInvLos: '',
        netPro: '',
        proDisAbop: '',
        comOfSr: '',

        othAdjFac: '',
        proAvaFd: '',
        proResFasi: '',

        supCurCap: '',
        appOfSsr: '',
        appOfSwf: '',
        appOfSiawf: '',
        appOfRf: '',
        appOfEef: '',
        proCapOroi: '',
        others: '',
        proAvaFod: '',
        preStoDp: '',
        witOthCaf: '',
        payDivOcs: '',
        traFroOsdtpcos: '',

        others2: '',
        unaPro: '',
        losComBtt: '',
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
        maiRevRev: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        priBusPro: [
          { required: true, message: '输入不能为空', trigger: 'blur' },
        ],
        opePro: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
        totPro: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
        netPro: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
      },
      collapseList: {
        activeNames: ['efd'], // 默认显示那个折叠栏 没有默认显示全部。
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
          let url = this.$urlList.efd.getValUrl;
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
            url = this.$urlList.efd.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efd.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efd.update;
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
      'maiRevRev',
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
      'priBusPro',
      '',
      '',
      '',
      '',
      '',
      'opePro',
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
      'totPro',
      '',
      '',
      '',
      'netPro',
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
      'maiRevRev',
      'salIncOegp',
      'salIncOigp',
      'disAndAll',
      'netAmoOifmb',
      'maiOpeCos',
      'salIncOep',
      'priBusTaec',
      'opeExp',
      'othOpeCos',
      'defInc',
      'incFroSa',
      'othOpeInc',
      'priBusPro',
      'othBusPro',
      'selExp',
      'genAndAe',
      'finExp',
      'othExp',
      'opePro',
      'invInc',
      'futInc',
      'allInc',
      'allIncBa',
      'nonOpeInc',
      'netGaiOdofa',
      'incFroNct',
      'incFroOia',
      'incFroPen',
      'othInc',
      'calFroTcsb',
      'nonOpeExp',
      'losFroDofa',
      'excOfNmal',
      'losOfLaw',
      'payForDon',
      'othPay',
      'balOfCs',
      'totPro',
      'incometax',
      'impLos',
      'unrInvLos',
      'netPro',
      'proDisAbop',
      'comOfSr',
      'othAdjFac',
      'proAvaFd',
      'proResFasi',
      'supCurCap',
      'appOfSsr',
      'appOfSwf',
      'appOfSiawf',
      'appOfRf',
      'appOfEef',
      'proCapOroi',
      'others',
      'proAvaFod',
      'preStoDp',
      'witOthCaf',
      'payDivOcs',
      'traFroOsdtpcos',
      'others2',
      'unaPro',
      'losComBtt',
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
.star {
  color: #f00;
  font-size: 20px;
  padding-left: 0px;
  padding-right: 5px;
  display: inline-block;
  vertical-align: middle;
}
.light {
  font-weight: normal;
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
