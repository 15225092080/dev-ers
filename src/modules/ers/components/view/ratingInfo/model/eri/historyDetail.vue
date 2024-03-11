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
        <!-- <h2 class="title">现金流量表信息</h2> -->
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
              <td>{{ this.ehffItem.batchNum }}</td>
              <td>{{ this.ehffItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehffItem.reportState] }}</td>
              <td>{{ this.ehffItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehffItem.infRecType] }}</td>
              <td>{{ this.ehffItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehffItem.entCertType] }}</td>
              <td>{{ this.ehffItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehffItem.rptDate) }}</td>
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
              <td>{{ this.ehffItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehffItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehffItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehffItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehffItem.rptDateCode] }}</td>
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
              <td>{{ this.ehffItem.auditFirmName }}</td>
              <td>{{ this.ehffItem.auditorName }}</td>
              <td>{{ formatDate(this.ehffItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>2007版现金流量表</h3></td></tr>
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
                    <td><b>一、经营活动产生的现金流量：</b></td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span>销售商品和提供劳务收到的现金</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="cashRecFsogoros" label-width="0px">
                        <el-input class="inputCls" name="cashRecFsogoros" v-model="this.ehffItem.cashRecFsogoros" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到的税费返还</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="taxRef" label-width="0px">
                        <el-input class="inputCls" name="taxRef" v-model="this.ehffItem.taxRef" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到其他与经营活动有关的现金</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="othCasRrtoa" label-width="0px">
                        <el-input class="inputCls" name="othCasRrtoa" v-model="this.ehffItem.othCasRrtoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动现金流入小计</b></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="totCasIfoa" label-width="0px">
                        <el-input class="inputCls" name="totCasIfoa" v-model="this.ehffItem.totCasIfoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>购买商品、接受劳务支付的现金</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="casPaiFgas" label-width="0px">
                        <el-input class="inputCls" name="casPaiFgas" v-model="this.ehffItem.casPaiFgas" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付给职工以及为职工支付的现金</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="casPaiTaoboe" label-width="0px">
                        <el-input class="inputCls" name="casPaiTaoboe" v-model="this.ehffItem.casPaiTaoboe" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付的各项税费</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="payOfAtot" label-width="0px">
                        <el-input class="inputCls" name="payOfAtot" v-model="this.ehffItem.payOfAtot" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付其他与经营活动有关的现金</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="othCasPfoa" label-width="0px">
                        <el-input class="inputCls" name="othCasPfoa" v-model="this.ehffItem.othCasPfoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动现金流出小计</b></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="totCasOfoa" label-width="0px">
                        <el-input class="inputCls" name="totCasOfoa" v-model="this.ehffItem.totCasOfoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>经营活动产生的现金流量净额</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="netCasFfoa" label-width="0px">
                        <el-input class="inputCls" name="netCasFfoa" v-model="this.ehffItem.netCasFfoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>二、投资活动产生的现金流量：</b></td>
                    <td>12</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>收回投资所收到的现金</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="casRecFroi" label-width="0px">
                        <el-input class="inputCls" name="casRecFroi" v-model="this.ehffItem.casRecFroi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>取得投资收益所收到的现金</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="casRecFo" label-width="0px">
                        <el-input class="inputCls" name="casRecFo" v-model="this.ehffItem.casRecFo" disabled></el-input>
                      </el-form-item>  </td>
                  </tr>
                  <tr>
                    <td><span>处置固定资产无形资产和其他长期资产所收回的现金净额</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="netCrfdofaiaaolta" label-width="0px">
                        <el-input class="inputCls" name="netCrfdofaiaaolta" v-model="this.ehffItem.netCrfdofaiaaolta" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>处置子公司及其他营业单位收到的现金净额</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="netCasIodosaobe" label-width="0px">
                        <el-input class="inputCls" name="netCasIodosaobe" v-model="this.ehffItem.netCasIodosaobe" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到其他与投资活动有关的现金</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="casRecRtoia" label-width="0px">
                        <el-input class="inputCls" name="casRecRtoia" v-model="this.ehffItem.casRecRtoia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动现金流入小计</b></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="totCasIfia" label-width="0px">
                        <el-input class="inputCls" name="totCasIfia" v-model="this.ehffItem.totCasIfia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>购建固定资产无形资产和其他长期资产所支付的现金</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="casPaiTafaiaaolta" label-width="0px">
                        <el-input class="inputCls" name="casPaiTafaiaaolta" v-model="this.ehffItem.casPaiTafaiaaolta" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>投资所支付的现金</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="casPayFi" label-width="0px">
                        <el-input class="inputCls" name="casPayFi" v-model="this.ehffItem.casPayFi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>取得子公司及其他营业单位支付的现金净额</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="netCasOoposaobu" label-width="0px">
                        <el-input class="inputCls" name="netCasOoposaobu" v-model="this.ehffItem.netCasOoposaobu" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付其他与投资活动有关的现金</span></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="casPayRtoa" label-width="0px">
                        <el-input class="inputCls" name="casPayRtoa" v-model="this.ehffItem.casPayRtoa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动现金流出小计</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="totCasOfia" label-width="0px">
                        <el-input class="inputCls" name="totCasOfia" v-model="this.ehffItem.totCasOfia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>投资活动产生的现金流量净额</b></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="netCasFfia" label-width="0px">
                        <el-input class="inputCls" name="netCasFfia" v-model="this.ehffItem.netCasFfia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>三、筹资活动产生的现金流量：</b></td>
                    <td>25</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>吸收投资收到的现金</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="casRecFi" label-width="0px">
                        <el-input class="inputCls" name="casRecFi" v-model="this.ehffItem.casRecFi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>取得借款收到的现金</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="casFroBor" label-width="0px">
                        <el-input class="inputCls" name="casFroBor" v-model="this.ehffItem.casFroBor" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>收到其他与筹资活动有关的现金</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="othCasRrtfa" label-width="0px">
                        <el-input class="inputCls" name="othCasRrtfa" v-model="this.ehffItem.othCasRrtfa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹资活动现金流入小计</b></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="totCasIffa" label-width="0px">
                        <el-input class="inputCls" name="totCasIffa" v-model="this.ehffItem.totCasIffa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>偿还债务所支付的现金</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="casRepFd" label-width="0px">
                        <el-input class="inputCls" name="casRepFd" v-model="this.ehffItem.casRepFd" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>分配股利、利润或偿付利息所支付的现金</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="casPayFdodopaie" label-width="0px">
                        <el-input class="inputCls" name="casPayFdodopaie" v-model="this.ehffItem.casPayFdodopaie" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>支付其他与筹资活动有关的现金</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="casPayRtofa" label-width="0px">
                        <el-input class="inputCls" name="casPayRtofa" v-model="this.ehffItem.casPayRtofa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹资活动现金流出小计</b></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="totCasOffa" label-width="0px">
                        <el-input class="inputCls" name="totCasOffa" v-model="this.ehffItem.totCasOffa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>筹集活动产生的现金流量净额</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="netCasFffa" label-width="0px">
                        <el-input class="inputCls" name="netCasFffa" v-model="this.ehffItem.netCasFffa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>四、汇率变动对现金及现金等价物的影响</b></td>
                    <td>35</td>
                    <td><el-form-item prop="effOfErcoc" label-width="0px"><el-input class="inputCls" name="effOfErcoc" v-model="this.ehffItem.effOfErcoc" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>五、现金及现金等价物净增加额</b></td>
                    <td>36</td>
                    <td><el-form-item prop="netIncIcace" label-width="0px"><el-input class="inputCls" name="netIncIcace" v-model="this.ehffItem.netIncIcace" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：期初现金及现金等价物余额</span></td>
                    <td>37</td>
                    <td><el-form-item prop="iniCasAceb" label-width="0px"><el-input class="inputCls" name="iniCasAceb" v-model="this.ehffItem.iniCasAceb" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>六、期末现金及现金等价物余额</b></td>
                    <td>38</td>
                    <td><el-form-item prop="theFinCaceb" label-width="0px"><el-input class="inputCls" name="theFinCaceb" v-model="this.ehffItem.theFinCaceb" disabled></el-input></el-form-item></td>
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
                    <td><b>补充资料：</b></td>
                    <td></td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><b>1、将净利润调节为经营活动现金流量：</b></td>
                    <td>39</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>净利润</span></td>
                    <td>40</td>
                    <td><el-form-item prop="netPro" label-width="0px"><el-input class="inputCls" name="netPro" v-model="this.ehffItem.netPro" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：资产减值准备</span></td>
                    <td>41</td>
                    <td><el-form-item prop="proForAss" label-width="0px"><el-input class="inputCls" name="proForAss" v-model="this.ehffItem.proForAss" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>固定资产折旧、油气资产折耗、生产性生物资产折旧</span></td>
                    <td>42</td>
                    <td><el-form-item prop="depOfFa" label-width="0px"><el-input class="inputCls" name="depOfFa" v-model="this.ehffItem.depOfFa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>无形资产摊销</span></td>
                    <td>43</td>
                    <td><el-form-item prop="amoOfIa" label-width="0px"><el-input class="inputCls" name="amoOfIa" v-model="this.ehffItem.amoOfIa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>长期待摊费用摊销</span></td>
                    <td>44</td>
                    <td><el-form-item prop="lonTerDea" label-width="0px"><el-input class="inputCls" name="lonTerDea" v-model="this.ehffItem.lonTerDea" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>待摊费用减少（减：增加）</span></td>
                    <td>45</td>
                    <td><el-form-item prop="decOfDe" label-width="0px"><el-input class="inputCls" name="decOfDe" v-model="this.ehffItem.decOfDe" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>预提费用增加（减：减少）</span></td>
                    <td>46</td>
                    <td><el-form-item prop="addOfAe" label-width="0px"><el-input class="inputCls" name="addOfAe" v-model="this.ehffItem.addOfAe" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>处置固定资产、无形资产和其他长期资产的损失（收益以“-”号填列）</span></td>
                    <td>47</td>
                    <td><el-form-item prop="losOnDofaiaaolta" label-width="0px"><el-input class="inputCls" name="losOnDofaiaaolta" v-model="this.ehffItem.losOnDofaiaaolta" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>固定资产报废损失（收益以“-”号填列）</span></td>
                    <td>48</td>
                    <td><el-form-item prop="losOnSofa" label-width="0px"><el-input class="inputCls" name="losOnSofa" v-model="this.ehffItem.losOnSofa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>公允价值变动损失（收益以“-”号填列）</span></td>
                    <td>49</td>
                    <td><el-form-item prop="proOrLfcifv" label-width="0px"><el-input class="inputCls" name="proOrLfcifv" v-model="this.ehffItem.proOrLfcifv" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>财务费用（收益以“-”号填列）</span></td>
                    <td>50</td>
                    <td><el-form-item prop="finExp" label-width="0px"><el-input class="inputCls" name="finExp" v-model="this.ehffItem.finExp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>投资损失（收益以“-”号填列）</span></td>
                    <td>51</td>
                    <td><el-form-item prop="losArsFi" label-width="0px"><el-input class="inputCls" name="losArsFi" v-model="this.ehffItem.losArsFi" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>递延所得税资产减少（增加以“-”号填列）</span></td>
                    <td>52</td>
                    <td><el-form-item prop="defIncTa" label-width="0px"><el-input class="inputCls" name="defIncTa" v-model="this.ehffItem.defIncTa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>递延所得税负债增加（减少以“-”号填列）</span></td>
                    <td>53</td>
                    <td><el-form-item prop="defIncTl" label-width="0px"><el-input class="inputCls" name="defIncTl" v-model="this.ehffItem.defIncTl" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>存货的减少（增加以“-”号填列）</span></td>
                    <td>54</td>
                    <td><el-form-item prop="decInInv" label-width="0px"><el-input class="inputCls" name="decInInv" v-model="this.ehffItem.decInInv" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>经营性应收项目的减少（增加以“-”号填列）</span></td>
                    <td>55</td>
                    <td><el-form-item prop="decInOr" label-width="0px"><el-input class="inputCls" name="decInOr" v-model="this.ehffItem.decInOr" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b class="pleft28">经营性应付项目的增加（减少以“-”号填列）</b></td>
                    <td>56</td>
                    <td><el-form-item prop="incInOr" label-width="0px"><el-input class="inputCls" name="incInOr" v-model="this.ehffItem.incInOr" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他</span></td>
                    <td>57</td>
                    <td><el-form-item prop="others" label-width="0px"><el-input class="inputCls" name="others" v-model="this.ehffItem.others" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>经营活动产生的现金流量净额</b></td>
                    <td>58</td>
                    <td><el-form-item prop="netCasFfoa2" label-width="0px"><el-input class="inputCls" name="netCasFfoa2" v-model="this.ehffItem.netCasFfoa2" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>2、不涉及现金收支的重大投资及筹资活动：</b></td>
                    <td>59</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>债务转为资本</span></td>
                    <td>60</td>
                    <td><el-form-item prop="debTraTc" label-width="0px"><el-input class="inputCls" name="debTraTc" v-model="this.ehffItem.debTraTc" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的可转换公司债券</span></td>
                    <td>61</td>
                    <td><el-form-item prop="oneYeaDcb" label-width="0px"><el-input class="inputCls" name="oneYeaDcb" v-model="this.ehffItem.oneYeaDcb" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>融资租入固定资产</span></td>
                    <td>62</td>
                    <td><el-form-item prop="finRenTtfa" label-width="0px"><el-input class="inputCls" name="finRenTtfa" v-model="this.ehffItem.finRenTtfa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他</span></td>
                    <td>63</td>
                    <td><el-form-item prop="others2" label-width="0px"><el-input class="inputCls" name="others2" v-model="this.ehffItem.others2" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>3、现金及现金等价物净变动情况：</b></td>
                    <td>64</td>
                    <td>

                    </td>
                  </tr>
                  <tr>
                    <td><span>现金的期末余额</span></td>
                    <td>65</td>
                    <td><el-form-item prop="casAtTeop" label-width="0px"><el-input class="inputCls" name="casAtTeop" v-model="this.ehffItem.casAtTeop" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：现金的期初余额</span></td>
                    <td>66</td>
                    <td><el-form-item prop="casAtTbotp" label-width="0px"><el-input class="inputCls" name="casAtTbotp" v-model="this.ehffItem.casAtTbotp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>加：现金等价物的期末余额</span></td>
                    <td>67</td>
                    <td><el-form-item prop="casEquAteotp" label-width="0px"><el-input class="inputCls" name="casEquAteotp" v-model="this.ehffItem.casEquAteotp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>减：现金等价物的期初余额</span></td>
                    <td>68</td>
                    <td><el-form-item prop="casRquAtbotp" label-width="0px"><el-input class="inputCls" name="casRquAtbotp" v-model="this.ehffItem.casRquAtbotp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>现金及现金等价物净增加额</span></td>
                    <td>69</td>
                    <td><el-form-item prop="netIncIcace2" label-width="0px"><el-input class="inputCls" name="netIncIcace2" v-model="this.ehffItem.netIncIcace2" disabled></el-input></el-form-item></td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehffItem.infRecType] }}</td>
              <td>{{ this.ehffItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehffItem.entCertType] }}</td>
              <td>{{ this.ehffItem.entCertNum }}</td>
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
              <td>{{ this.ehffItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehffItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehffItem.sheetTypeDivide] }}</td>
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
      ehffItem: {}, // 基础段
      showTableSec:true,
      showTableTab:true, //报表
      showAllDel:false, //整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.eff.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '现金流量表信息' // 标题
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
      this.resData = await this.http.apiPost(this.$urlList.eff.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehffItem = this.resData.EHFF;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehffItem.infRecType == '634') { // 整笔删除
        this.textShow = '现金流量表整笔删除信息';
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
