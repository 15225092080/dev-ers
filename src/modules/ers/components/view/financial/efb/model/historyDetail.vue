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
              <td>{{ this.ehfbItem.batchNum }}</td>
              <td>{{ this.ehfbItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfbItem.reportState] }}</td>
              <td>{{ this.ehfbItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfbItem.infRecType] }}</td>
              <td>{{ this.ehfbItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfbItem.entCertType] }}</td>
              <td>{{ this.ehfbItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfbItem.rptDate) }}</td>
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
              <td>{{ this.ehfbItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfbItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfbItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfbItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfbItem.rptDateCode] }}</td>
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
              <td>{{ this.ehfbItem.auditFirmName }}</td>
              <td>{{ this.ehfbItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfbItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>2002版企业资产负债表</h3></td></tr>
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
                    <td><span>货币资金</span></td>
                    <td>1</td>
                    <td>
                      <el-form-item prop="curFun" label-width="0px">
                        <el-input class="inputCls" name="curFun" v-model="this.ehfbItem.curFun" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>短期投资</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="shoRerInv" label-width="0px">
                        <el-input class="inputCls" name="shoRerInv" v-model="this.ehfbItem.shoRerInv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="notRec" label-width="0px">
                        <el-input class="inputCls" name="notRec" v-model="this.ehfbItem.notRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收股利</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="divRec" label-width="0px">
                        <el-input class="inputCls" name="divRec" v-model="this.ehfbItem.divRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收利息</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="intRec" label-width="0px">
                        <el-input class="inputCls" name="intRec" v-model="this.ehfbItem.intRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收账款</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="accRec" label-width="0px">
                        <el-input class="inputCls" name="accRec" v-model="this.ehfbItem.accRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应收款</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="othRec" label-width="0px">
                        <el-input class="inputCls" name="othRec" v-model="this.ehfbItem.othRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预付账款</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="prepayments" label-width="0px">
                        <el-input class="inputCls" name="prepayments" v-model="this.ehfbItem.prepayments" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>期货保证金</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="futGua" label-width="0px">
                        <el-input class="inputCls" name="futGua" v-model="this.ehfbItem.futGua" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收补贴款</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="allRec" label-width="0px">
                        <el-input class="inputCls" name="allRec" v-model="this.ehfbItem.allRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收出口退税</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="expDraRec" label-width="0px">
                        <el-input class="inputCls" name="expDraRec" v-model="this.ehfbItem.expDraRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="inventories" label-width="0px">
                        <el-input class="inputCls" name="inventories" v-model="this.ehfbItem.inventories" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：原材料</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="rawMat" label-width="0px">
                        <el-input class="inputCls" name="rawMat" v-model="this.ehfbItem.rawMat" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>产成品（库存商品）</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="finPro" label-width="0px">
                        <el-input class="inputCls" name="finPro" v-model="this.ehfbItem.finPro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待摊费用</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="defExp" label-width="0px">
                        <el-input class="inputCls" name="defExp" v-model="this.ehfbItem.defExp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待处理流动资产净损失</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="unsGloCa" label-width="0px">
                        <el-input class="inputCls" name="unsGloCa" v-model="this.ehfbItem.unsGloCa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的长期债权投资</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="lonTerDifday" label-width="0px">
                        <el-input class="inputCls" name="lonTerDifday" v-model="this.ehfbItem.lonTerDifday" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="othCurAss" label-width="0px">
                        <el-input class="inputCls" name="othCurAss" v-model="this.ehfbItem.othCurAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动资产合计</b></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="totCurAss" label-width="0px">
                        <el-input class="inputCls" name="totCurAss" v-model="this.ehfbItem.totCurAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期投资</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="lonTerInv" label-width="0px">
                        <el-input class="inputCls" name="lonTerInv" v-model="this.ehfbItem.lonTerInv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：长期股权投资</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="lonTerEi" label-width="0px">
                        <el-input class="inputCls" name="lonTerEi" v-model="this.ehfbItem.lonTerEi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期债权投资</span></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="lonTerSi" label-width="0px">
                        <el-input class="inputCls" name="lonTerSi" v-model="this.ehfbItem.lonTerSi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>*合并价差</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="incPriDif" label-width="0px">
                        <el-input class="inputCls" name="incPriDif" v-model="this.ehfbItem.incPriDif" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>长期投资合计</b></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="totLonTi" label-width="0px">
                        <el-input class="inputCls" name="totLonTi" v-model="this.ehfbItem.totLonTi" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产原价</span></td>
                    <td>25</td>
                    <td>
                      <el-form-item prop="oriCosOfa" label-width="0px">
                        <el-input class="inputCls" name="oriCosOfa" v-model="this.ehfbItem.oriCosOfa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：累计折旧</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="rixAssAd" label-width="0px">
                        <el-input class="inputCls" name="rixAssAd" v-model="this.ehfbItem.rixAssAd" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产净值</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="fixAssNv" label-width="0px">
                        <el-input class="inputCls" name="fixAssNv" v-model="this.ehfbItem.fixAssNv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：固定资产值减值准备</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="proForIofa" label-width="0px">
                        <el-input class="inputCls" name="proForIofa" v-model="this.ehfbItem.proForIofa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产净额</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="netValOfa" label-width="0px">
                        <el-input class="inputCls" name="netValOfa" v-model="this.ehfbItem.netValOfa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产清理</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="fixAssPfd" label-width="0px">
                        <el-input class="inputCls" name="fixAssPfd" v-model="this.ehfbItem.fixAssPfd" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>工程物资</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="conMat" label-width="0px">
                        <el-input class="inputCls" name="conMat" v-model="this.ehfbItem.conMat" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="conInPro" label-width="0px">
                        <el-input class="inputCls" name="conInPro" v-model="this.ehfbItem.conInPro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待处理固定资产净损失</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="unsGloFa" label-width="0px">
                        <el-input class="inputCls" name="unsGloFa" v-model="this.ehfbItem.unsGloFa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>固定资产合计</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="totFixAss" label-width="0px">
                        <el-input class="inputCls" name="totFixAss" v-model="this.ehfbItem.totFixAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                   <tr>
                    <td><span>无形资产</span></td>
                    <td>35</td>
                    <td><el-form-item prop="intAss" label-width="0px"><el-input class="inputCls" name="intAss" v-model="this.ehfbItem.intAss" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：土地使用权</span></td>
                    <td>36</td>
                    <td><el-form-item prop="lanUseRig" label-width="0px"><el-input class="inputCls" name="lanUseRig" v-model="this.ehfbItem.lanUseRig" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>递延资产（长期待摊费用）</span></td>
                    <td>37</td>
                    <td><el-form-item prop="defAss" label-width="0px"><el-input class="inputCls" name="defAss" v-model="this.ehfbItem.defAss" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：固定资产修理</span></td>
                    <td>38</td>
                    <td><el-form-item prop="incFixAr" label-width="0px"><el-input class="inputCls" name="incFixAr" v-model="this.ehfbItem.incFixAr" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>固定资产改良支出</span></td>
                    <td>39</td>
                    <td><el-form-item prop="impExpOfa" label-width="0px"><el-input class="inputCls" name="impExpOfa" v-model="this.ehfbItem.impExpOfa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他长期资产</span></td>
                    <td>40</td>
                    <td><el-form-item prop="othLonTa" label-width="0px"><el-input class="inputCls" name="othLonTa" v-model="this.ehfbItem.othLonTa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：特准储备物资</span></td>
                    <td>41</td>
                    <td><el-form-item prop="amonItSarm" label-width="0px"><el-input class="inputCls" name="amonItSarm" v-model="this.ehfbItem.amonItSarm" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>无形及其他资产合计</b></td>
                    <td>42</td>
                    <td><el-form-item prop="totAssAoa" label-width="0px"><el-input class="inputCls" name="totAssAoa" v-model="this.ehfbItem.totAssAoa" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>递延税款借项</span></td>
                    <td>43</td>
                    <td><el-form-item prop="defAssDeb" label-width="0px"><el-input class="inputCls" name="defAssDeb" v-model="this.ehfbItem.defAssDeb" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>资产总计</b></td>
                    <td>44</td>
                    <td><el-form-item prop="totAss" label-width="0px"><el-input class="inputCls" name="totAss" v-model="this.ehfbItem.totAss" disabled></el-input></el-form-item></td>
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
                    <td><span>短期借款</span></td>
                    <td>45</td>
                    <td><el-form-item prop="shoTerBor" label-width="0px"><el-input class="inputCls" name="shoTerBor" v-model="this.ehfbItem.shoTerBor" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付票据</span></td>
                    <td>46</td>
                    <td><el-form-item prop="notPay" label-width="0px"><el-input class="inputCls" name="notPay" v-model="this.ehfbItem.notPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付账款</span></td>
                    <td>47</td>
                    <td><el-form-item prop="accPay" label-width="0px"><el-input class="inputCls" name="accPay" v-model="this.ehfbItem.accPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>预收账款</span></td>
                    <td>48</td>
                    <td><el-form-item prop="recInAdv" label-width="0px"><el-input class="inputCls" name="recInAdv" v-model="this.ehfbItem.recInAdv" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付工资</span></td>
                    <td>49</td>
                    <td><el-form-item prop="wagOrSp" label-width="0px"><el-input class="inputCls" name="wagOrSp" v-model="this.ehfbItem.wagOrSp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付福利费</span></td>
                    <td>50</td>
                    <td><el-form-item prop="empBen" label-width="0px"><el-input class="inputCls" name="empBen" v-model="this.ehfbItem.empBen" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付利润（股利）</span></td>
                    <td>51</td>
                    <td><el-form-item prop="incPay" label-width="0px"><el-input class="inputCls" name="incPay" v-model="this.ehfbItem.incPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应交税金</span></td>
                    <td>52</td>
                    <td><el-form-item prop="taxPay" label-width="0px"><el-input class="inputCls" name="taxPay" v-model="this.ehfbItem.taxPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他应交款</span></td>
                    <td>53</td>
                    <td><el-form-item prop="othPayTg" label-width="0px"><el-input class="inputCls" name="othPayTg" v-model="this.ehfbItem.othPayTg" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>54</td>
                    <td><el-form-item prop="othPay" label-width="0px"><el-input class="inputCls" name="othPay" v-model="this.ehfbItem.othPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>预提费用</span></td>
                    <td>55</td>
                    <td><el-form-item prop="proForExp" label-width="0px"><el-input class="inputCls" name="proForExp" v-model="this.ehfbItem.proForExp" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>预计负债</span></td>
                    <td>56</td>
                    <td><el-form-item prop="provisions" label-width="0px"><el-input class="inputCls" name="provisions" v-model="this.ehfbItem.provisions" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的长期负债</span></td>
                    <td>57</td>
                    <td><el-form-item prop="lonTerLdwoy" label-width="0px"><el-input class="inputCls" name="lonTerLdwoy" v-model="this.ehfbItem.lonTerLdwoy" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他流动负债</span></td>
                    <td>58</td>
                    <td><el-form-item prop="othCurLia" label-width="0px"><el-input class="inputCls" name="othCurLia" v-model="this.ehfbItem.othCurLia" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>流动负债合计</b></td>
                    <td>59</td>
                    <td><el-form-item prop="totCurLia" label-width="0px"><el-input class="inputCls" name="totCurLia" v-model="this.ehfbItem.totCurLia" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>60</td>
                    <td><el-form-item prop="lonTerBor" label-width="0px"><el-input class="inputCls" name="lonTerBor" v-model="this.ehfbItem.lonTerBor" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>应付债券</span></td>
                    <td>61</td>
                    <td><el-form-item prop="bonPay" label-width="0px"><el-input class="inputCls" name="bonPay" v-model="this.ehfbItem.bonPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>62</td>
                    <td><el-form-item prop="lonTerPay" label-width="0px"><el-input class="inputCls" name="lonTerPay" v-model="this.ehfbItem.lonTerPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>专项应付款</span></td>
                    <td>63</td>
                    <td><el-form-item prop="graPay" label-width="0px"><el-input class="inputCls" name="graPay" v-model="this.ehfbItem.graPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其他长期负债</span></td>
                    <td>64</td>
                    <td><el-form-item prop="othLonRl" label-width="0px"><el-input class="inputCls" name="othLonRl" v-model="this.ehfbItem.othLonRl" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：特准储备基金</span></td>
                    <td>65</td>
                    <td><el-form-item prop="speResFun" label-width="0px"><el-input class="inputCls" name="speResFun" v-model="this.ehfbItem.speResFun" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>长期负债合计</b></td>
                    <td>66</td>
                    <td><el-form-item prop="totLonTl" label-width="0px"><el-input class="inputCls" name="totLonTl" v-model="this.ehfbItem.totLonTl" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>递延税款贷项</span></td>
                    <td>67</td>
                    <td><el-form-item prop="defTaxCre" label-width="0px"><el-input class="inputCls" name="defTaxCre" v-model="this.ehfbItem.defTaxCre" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>负债合计</b></td>
                    <td>68</td>
                    <td><el-form-item prop="totLia" label-width="0px"><el-input class="inputCls" name="totLia" v-model="this.ehfbItem.totLia" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>*少数股东权益</span></td>
                    <td>69</td>
                    <td><el-form-item prop="minInt" label-width="0px"><el-input class="inputCls" name="minInt" v-model="this.ehfbItem.minInt" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>实收资本（股本）</span></td>
                    <td>70</td>
                    <td><el-form-item prop="paiCap" label-width="0px"><el-input class="inputCls" name="paiCap" v-model="this.ehfbItem.paiCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>国家资本</span></td>
                    <td>71</td>
                    <td><el-form-item prop="natCap" label-width="0px"><el-input class="inputCls" name="natCap" v-model="this.ehfbItem.natCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>集体资本</span></td>
                    <td>72</td>
                    <td><el-form-item prop="colCap" label-width="0px"><el-input class="inputCls" name="colCap" v-model="this.ehfbItem.colCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>法人资本</span></td>
                    <td>73</td>
                    <td><el-form-item prop="legPerCap" label-width="0px"><el-input class="inputCls" name="legPerCap" v-model="this.ehfbItem.legPerCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：国有法人资本</span></td>
                    <td>74</td>
                    <td><el-form-item prop="staOwnLpc" label-width="0px"><el-input class="inputCls" name="staOwnLpc" v-model="this.ehfbItem.staOwnLpc" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>集体法人资本</span></td>
                    <td>75</td>
                    <td><el-form-item prop="colLegPc" label-width="0px"><el-input class="inputCls" name="colLegPc" v-model="this.ehfbItem.colLegPc" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>个人资本</span></td>
                    <td>76</td>
                    <td><el-form-item prop="perCap" label-width="0px"><el-input class="inputCls" name="perCap" v-model="this.ehfbItem.perCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>外商资本</span></td>
                    <td>77</td>
                    <td><el-form-item prop="forBusCap" label-width="0px"><el-input class="inputCls" name="forBusCap" v-model="this.ehfbItem.forBusCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>资本公积</span></td>
                    <td>78</td>
                    <td><el-form-item prop="capRse" label-width="0px"><el-input class="inputCls" name="capRse" v-model="this.ehfbItem.capRse" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>盈余公积</span></td>
                    <td>79</td>
                    <td><el-form-item prop="surRes" label-width="0px"><el-input class="inputCls" name="surRes" v-model="this.ehfbItem.surRes" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>其中：法定盈余公积</span></td>
                    <td>80</td>
                    <td><el-form-item prop="staSurRes" label-width="0px"><el-input class="inputCls" name="staSurRes" v-model="this.ehfbItem.staSurRes" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>公益金</span></td>
                    <td>81</td>
                    <td><el-form-item prop="pubWelFun" label-width="0px"><el-input class="inputCls" name="pubWelFun" v-model="this.ehfbItem.pubWelFun" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>补充流动资本</span></td>
                    <td>82</td>
                    <td><el-form-item prop="supCurCap" label-width="0px"><el-input class="inputCls" name="supCurCap" v-model="this.ehfbItem.supCurCap" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>*未确认的投资损失（以“-”号填列）</span></td>
                    <td>83</td>
                    <td><el-form-item prop="unaInvLos" label-width="0px"><el-input class="inputCls" name="unaInvLos" v-model="this.ehfbItem.unaInvLos" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>未分配利润</span></td>
                    <td>84</td>
                    <td><el-form-item prop="unaPro" label-width="0px"><el-input class="inputCls" name="unaPro" v-model="this.ehfbItem.unaPro" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>*外币报表折算差额</span></td>
                    <td>85</td>
                    <td><el-form-item prop="difOnTofcfs" label-width="0px"><el-input class="inputCls" name="difOnTofcfs" v-model="this.ehfbItem.difOnTofcfs" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>所有者权益合计</b></td>
                    <td>86</td>
                    <td><el-form-item prop="totEqu" label-width="0px"><el-input class="inputCls" name="totEqu" v-model="this.ehfbItem.totEqu" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>负债和所有者权益合计</b></td>
                    <td>87</td>
                    <td><el-form-item prop="totEquAl" label-width="0px"><el-input class="inputCls" name="totEquAl" v-model="this.ehfbItem.totEquAl" disabled></el-input></el-form-item></td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfbItem.infRecType] }}</td>
              <td>{{ this.ehfbItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfbItem.entCertType] }}</td>
              <td>{{ this.ehfbItem.entCertNum }}</td>
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
              <td>{{ this.ehfbItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfbItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfbItem.sheetTypeDivide] }}</td>
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
      ehfbItem: {}, // 基础段
      showTableSec: true,
      showTableTab: true, // 报表
      showAllDel: false, // 整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efb.findDetailById, // 接口
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
      this.resData = await this.http.apiPost(this.$urlList.efb.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfbItem = this.resData.EHFB;
      // 根据后台返回的信息记录类型判断为哪个场景
       if (this.ehfbItem.infRecType == '614') { // 整笔删除
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
