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
        <!-- <h2 class="title">利润及利润分配表信息</h2> -->
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
              <td>{{ this.ehfdItem.batchNum }}</td>
              <td>{{ this.ehfdItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfdItem.reportState] }}</td>
              <td>{{ this.ehfdItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfdItem.infRecType] }}</td>
              <td>{{ this.ehfdItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfdItem.entCertType] }}</td>
              <td>{{ this.ehfdItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfdItem.rptDate) }}</td>
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
              <td>{{ this.ehfdItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfdItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfdItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfdItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfdItem.rptDateCode] }}</td>
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
              <td>{{ this.ehfdItem.auditFirmName }}</td>
              <td>{{ this.ehfdItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfdItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>2002利润及利润分配表</h3></td></tr>
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
                      <el-form-item prop="maiRevRev" label-width="0px">
                        <el-input class="inputCls" name="maiRevRev" v-model="this.ehfdItem.maiRevRev" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：出口产品（商品）销售收入</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="salIncOegp" label-width="0px">
                        <el-input class="inputCls" name="salIncOegp" v-model="this.ehfdItem.salIncOegp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>进口产品（商品）销售收入</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="salIncOigp" label-width="0px">
                        <el-input class="inputCls" name="salIncOigp" v-model="this.ehfdItem.salIncOigp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：销售折扣与折让</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="disAndAll" label-width="0px">
                        <el-input class="inputCls" name="disAndAll" v-model="this.ehfdItem.disAndAll" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二：主营业务收入净额</b></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="netAmoOifmb" label-width="0px">
                        <el-input class="inputCls" name="netAmoOifmb" v-model="this.ehfdItem.netAmoOifmb" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）主营业务成本</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="maiOpeCos" label-width="0px">
                        <el-input class="inputCls" name="maiOpeCos" v-model="this.ehfdItem.maiOpeCos" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：出口产品（商品）销售成本</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="salIncOep" label-width="0px">
                        <el-input class="inputCls" name="salIncOep" v-model="this.ehfdItem.salIncOep" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）主营业务税金及附加</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="priBusTaec" label-width="0px">
                        <el-input class="inputCls" name="priBusTaec" v-model="this.ehfdItem.priBusTaec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）经营费用</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="opeExp" label-width="0px">
                        <el-input class="inputCls" name="opeExp" v-model="this.ehfdItem.opeExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）其他</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="othOpeCos" label-width="0px">
                        <el-input class="inputCls" name="othOpeCos" v-model="this.ehfdItem.othOpeCos" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：（一）递延收益</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="defInc" label-width="0px">
                        <el-input class="inputCls" name="defInc" v-model="this.ehfdItem.defInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）代购代销收入</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="incFroSa" label-width="0px">
                        <el-input class="inputCls" name="incFroSa" v-model="this.ehfdItem.incFroSa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）其他</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="othOpeInc" label-width="0px">
                        <el-input class="inputCls" name="othOpeInc" v-model="this.ehfdItem.othOpeInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、主营业务利润（亏损以“－”号填列）</b></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="priBusPro" label-width="0px">
                        <el-input class="inputCls" name="priBusPro" v-model="this.ehfdItem.priBusPro" disabled></el-input>
                      </el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：其他业务利润（亏损以“－”号填列）</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="othBusPro" label-width="0px">
                        <el-input class="inputCls" name="othBusPro" v-model="this.ehfdItem.othBusPro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）营业费用</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="selExp" label-width="0px">
                        <el-input class="inputCls" name="selExp" v-model="this.ehfdItem.selExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）管理费用</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="genAndAe" label-width="0px">
                        <el-input class="inputCls" name="genAndAe" v-model="this.ehfdItem.genAndAe" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）财务费用</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="finExp" label-width="0px">
                        <el-input class="inputCls" name="finExp" v-model="this.ehfdItem.finExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）其他</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="othExp" label-width="0px">
                        <el-input class="inputCls" name="othExp" v-model="this.ehfdItem.othExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四：营业利润（亏损以“－”号填列）</b></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="opePro" label-width="0px">
                        <el-input class="inputCls" name="opePro" v-model="this.ehfdItem.opePro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>加：（一）投资收益（损失以“－”号填列）</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="invInc" label-width="0px">
                        <el-input class="inputCls" name="invInc" v-model="this.ehfdItem.invInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（二）期货收益</span></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="futInc" label-width="0px">
                        <el-input class="inputCls" name="futInc" v-model="this.ehfdItem.futInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（三）补贴收入</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="allInc" label-width="0px">
                        <el-input class="inputCls" name="allInc" v-model="this.ehfdItem.allInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：补贴前亏损的企业补贴收入</span></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="allIncBa" label-width="0px">
                        <el-input class="inputCls" name="allIncBa" v-model="this.ehfdItem.allIncBa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（四）营业外收入</span></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="nonOpeInc" label-width="0px">
                        <el-input class="inputCls" name="nonOpeInc" v-model="this.ehfdItem.nonOpeInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：处置固定资产净收益</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="netGaiOdofa" label-width="0px">
                        <el-input class="inputCls" name="netGaiOdofa" v-model="this.ehfdItem.netGaiOdofa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>非货币性交易收益</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="incFroNct" label-width="0px">
                        <el-input class="inputCls" name="incFroNct" v-model="this.ehfdItem.incFroNct" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>出售无形资产收益</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="incFroOia" label-width="0px">
                        <el-input class="inputCls" name="incFroOia" v-model="this.ehfdItem.incFroOia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>罚款净收入</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="incFroPen" label-width="0px">
                        <el-input class="inputCls" name="incFroPen" v-model="this.ehfdItem.incFroPen" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>（五）其他</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="othInc" label-width="0px">
                        <el-input class="inputCls" name="othInc" v-model="this.ehfdItem.othInc" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：用以前年度含量工资节余弥补利润</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="calFroTcsb" label-width="0px">
                        <el-input class="inputCls" name="calFroTcsb" v-model="this.ehfdItem.calFroTcsb" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：（一）营业外支出</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="nonOpeExp" label-width="0px">
                        <el-input class="inputCls" name="nonOpeExp" v-model="this.ehfdItem.nonOpeExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：处置固定资产净损失</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="losFroDofa" label-width="0px">
                        <el-input class="inputCls" name="losFroDofa" v-model="this.ehfdItem.losFroDofa" disabled></el-input>
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
              <table class="dataRight dataTable">
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
                    <td><el-form-item prop="excOfNmal" label-width="0px"><el-input class="inputCls" name="excOfNmal" v-model="this.ehfdItem.excOfNmal" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>罚款支出</span></td>
                    <td>35</td>
                    <td><el-form-item prop="losOfLaw" label-width="0px"><el-input class="inputCls" name="losOfLaw" v-model="this.ehfdItem.losOfLaw" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>捐赠支出</span></td>
                    <td>36</td>
                    <td><el-form-item prop="payForDon" label-width="0px"><el-input class="inputCls" name="payForDon" v-model="this.ehfdItem.payForDon" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（二）其他支出</span></td>
                    <td>37</td>
                    <td><el-form-item prop="othPay" label-width="0px"><el-input class="inputCls" name="othPay" v-model="this.ehfdItem.othPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：结转的含量工资包干节余</span></td>
                    <td>38</td>
                    <td><el-form-item prop="balOfCs" label-width="0px"><el-input class="inputCls" name="balOfCs" v-model="this.ehfdItem.balOfCs" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>五、利润总额（亏损总额以“－”号填列）</b></td>
                    <td>39</td>
                    <td><el-form-item prop="totPro" label-width="0px"><el-input class="inputCls" name="totPro" v-model="this.ehfdItem.totPro" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：所得税</span></td>
                    <td>40</td>
                    <td><el-form-item prop="incometax" label-width="0px"><el-input class="inputCls" name="incometax" v-model="this.ehfdItem.incometax" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>*少数股东损益</span></td>
                    <td>41</td>
                    <td><el-form-item prop="impLos" label-width="0px"><el-input class="inputCls" name="impLos" v-model="this.ehfdItem.impLos" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：*未确认的投资损失（以“+”号填列）</span></td>
                    <td>42</td>
                    <td><el-form-item prop="unrInvLos" label-width="0px"><el-input class="inputCls" name="unrInvLos" v-model="this.ehfdItem.unrInvLos" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>六、净利润（净亏损以“－”号填列）</b></td>
                    <td>43</td>
                    <td><el-form-item prop="netPro" label-width="0px"><el-input class="inputCls" name="netPro" v-model="this.ehfdItem.netPro" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：（一）年初未分配利润</span></td>
                    <td>44</td>
                    <td><el-form-item prop="proDisAbop" label-width="0px"><el-input class="inputCls" name="proDisAbop" v-model="this.ehfdItem.proDisAbop" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（二）盈余公积补亏</span></td>
                    <td>45</td>
                    <td><el-form-item prop="comOfSr" label-width="0px"><el-input class="inputCls" name="comOfSr" v-model="this.ehfdItem.comOfSr" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（三）其他调整因素</span></td>
                    <td>46</td>
                    <td><el-form-item prop="othAdjFac" label-width="0px"><el-input class="inputCls" name="othAdjFac" v-model="this.ehfdItem.othAdjFac" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>七、可供分配的利润</b></td>
                    <td>47</td>
                    <td><el-form-item prop="proAvaFd" label-width="0px"><el-input class="inputCls" name="proAvaFd" v-model="this.ehfdItem.proAvaFd" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：（一）单项留用的利润</span></td>
                    <td>48</td>
                    <td><el-form-item prop="proResFasi" label-width="0px"><el-input class="inputCls" name="proResFasi" v-model="this.ehfdItem.proResFasi" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（二）补充流动资本</span></td>
                    <td>49</td>
                    <td><el-form-item prop="supCurCap" label-width="0px"><el-input class="inputCls" name="supCurCap" v-model="this.ehfdItem.supCurCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（三）提取法定盈余公积</span></td>
                    <td>50</td>
                    <td><el-form-item prop="appOfSsr" label-width="0px"><el-input class="inputCls" name="appOfSsr" v-model="this.ehfdItem.appOfSsr" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（四）提取法定公益金</span></td>
                    <td>51</td>
                    <td><el-form-item prop="appOfSwf" label-width="0px"><el-input class="inputCls" name="appOfSwf" v-model="this.ehfdItem.appOfSwf" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（五）提取职工奖励及福利基金</span></td>
                    <td>52</td>
                    <td><el-form-item prop="appOfSiawf" label-width="0px"><el-input class="inputCls" name="appOfSiawf" v-model="this.ehfdItem.appOfSiawf" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（六）提取储备基金</span></td>
                    <td>53</td>
                    <td><el-form-item prop="appOfRf" label-width="0px"><el-input class="inputCls" name="appOfRf" v-model="this.ehfdItem.appOfRf" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（七）提取企业发展基金</span></td>
                    <td>54</td>
                    <td><el-form-item prop="appOfEef" label-width="0px"><el-input class="inputCls" name="appOfEef" v-model="this.ehfdItem.appOfEef" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（八）利润归还投资</span></td>
                    <td>55</td>
                    <td><el-form-item prop="proCapOroi" label-width="0px"><el-input class="inputCls" name="proCapOroi" v-model="this.ehfdItem.proCapOroi" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（九）其他</span></td>
                    <td>56</td>
                    <td><el-form-item prop="others" label-width="0px"><el-input class="inputCls" name="others" v-model="this.ehfdItem.others" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>八、可供投资者分配的利润</b></td>
                    <td>57</td>
                    <td><el-form-item prop="proAvaFod" label-width="0px"><el-input class="inputCls" name="proAvaFod" v-model="this.ehfdItem.proAvaFod" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：（一）应付优先股股利</span></td>
                    <td>58</td>
                    <td><el-form-item prop="preStoDp" label-width="0px"><el-input class="inputCls" name="preStoDp" v-model="this.ehfdItem.preStoDp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（二）提取任意盈余公积</span></td>
                    <td>59</td>
                    <td><el-form-item prop="witOthCaf" label-width="0px"><el-input class="inputCls" name="witOthCaf" v-model="this.ehfdItem.witOthCaf" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（三）应付普通股股利</span></td>
                    <td>60</td>
                    <td><el-form-item prop="payDivOcs" label-width="0px"><el-input class="inputCls" name="payDivOcs" v-model="this.ehfdItem.payDivOcs" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（四）转作资本（股本）的普通股股利</span></td>
                    <td>61</td>
                    <td><el-form-item prop="traFroOsdtpcos" label-width="0px"><el-input class="inputCls" name="traFroOsdtpcos" v-model="this.ehfdItem.traFroOsdtpcos" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>（五）其他</span></td>
                    <td>62</td>
                    <td><el-form-item prop="others2" label-width="0px"><el-input class="inputCls" name="others2" v-model="this.ehfdItem.others2" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>九、未分配利润</b></td>
                    <td>63</td>
                    <td><el-form-item prop="unaPro" label-width="0px"><el-input class="inputCls" name="unaPro" v-model="this.ehfdItem.unaPro" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：应由以后年度税前利润弥补的亏损（以“+”号填列）</span></td>
                    <td>64</td>
                    <td><el-form-item prop="losComBtt" label-width="0px"><el-input class="inputCls" name="losComBtt" v-model="this.ehfdItem.losComBtt" disabled></el-input></el-form-item></td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfdItem.infRecType] }}</td>
              <td>{{ this.ehfdItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfdItem.entCertType] }}</td>
              <td>{{ this.ehfdItem.entCertNum }}</td>
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
              <td>{{ this.ehfdItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfdItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfdItem.sheetTypeDivide] }}</td>
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
      ehfdItem: {}, // 基础段
      showTableSec:true,
      showTableTab:true, //报表
      showAllDel:false, //整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efd.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '利润及利润分配表信息' // 标题
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
            if(typeof(data[x]) === 'object'){ // 是json 递归继续处理
              data[x] = null2str(data[x])
            }
          }
        }
        return data;
    },
    // 获取字典方法
    getdataDic() {
      let type = ['E_REPORT_STATE','E_InfRecType', 'E_InfoIDType2','E_ReportFormType','E_ReportFormdel','E_RptDateCode_EF'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
      delete this.paramEdit.data['stopFlag'];
      delete this.paramEdit.data['lockFlag'];
      this.resData = await this.http.apiPost(this.$urlList.efd.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfdItem = this.resData.EHFD;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehfdItem.infRecType == '624') { // 整笔删除
        this.textShow = '利润及利润分配表整笔删除信息';
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
