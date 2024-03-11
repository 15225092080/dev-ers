<template>
  <div style="width:85%;">
    <!-- 查询报送历史按钮 -->
    <div class="historyGroup">
      <el-row class="historyBtn">
        <el-button type="primary"
                   plain
                   @click="historyBtnEfb">查看报送历史</el-button>
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
              <el-date-picker v-model="formItem.sheetYear"
                              type="year"
                              placeholder="选择日期"
                              disabled="disabled"></el-date-picker>
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
                  <h3>2002版企业资产负债表</h3>
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
                    <td><span>货币资金</span></td>
                    <td>1</td>
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
                    <td>2</td>
                    <td>
                      <el-form-item prop="shoRerInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="shoRerInv"
                                  v-model="formItem.shoRerInv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>3</td>
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
                    <td><span>应收股利</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="divRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="divRec"
                                  v-model="formItem.divRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收利息</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="intRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="intRec"
                                  v-model="formItem.intRec"
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
                    <td><span>其他应收款</span></td>
                    <td>7</td>
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
                    <td><span>预付账款</span></td>
                    <td>8</td>
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
                    <td><span>期货保证金</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="futGua"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="futGua"
                                  v-model="formItem.futGua"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收补贴款</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="allRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="allRec"
                                  v-model="formItem.allRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收出口退税</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="expDraRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="expDraRec"
                                  v-model="formItem.expDraRec"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>12</td>
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
                    <td><span>其中：原材料</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="rawMat"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="rawMat"
                                  v-model="formItem.rawMat"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>产成品（库存商品）</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="finPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finPro"
                                  v-model="formItem.finPro"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待摊费用</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="defExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defExp"
                                  v-model="formItem.defExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待处理流动资产净损失</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="unsGloCa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unsGloCa"
                                  v-model="formItem.unsGloCa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的长期债权投资</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="lonTerDifday"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerDifday"
                                  v-model="formItem.lonTerDifday"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>18</td>
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
                    <td>19</td>
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
                    <td><span>长期投资</span></td>
                    <td>20</td>
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
                    <td><span>其中：长期股权投资</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="lonTerEi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerEi"
                                  v-model="formItem.lonTerEi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期债权投资</span></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="lonTerSi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerSi"
                                  v-model="formItem.lonTerSi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>*合并价差</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="incPriDif"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incPriDif"
                                  v-model="formItem.incPriDif"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>长期投资合计</b></td>
                    <td>24</td>
                    <td>
                      <el-form-item prop="totLonTi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLonTi"
                                  v-model="formItem.totLonTi"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产原价</span></td>
                    <td>25</td>
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
                    <td>26</td>
                    <td>
                      <el-form-item prop="rixAssAd"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="rixAssAd"
                                  v-model="formItem.rixAssAd"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产净值</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="fixAssNv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="fixAssNv"
                                  v-model="formItem.fixAssNv"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：固定资产值减值准备</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="proForIofa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proForIofa"
                                  v-model="formItem.proForIofa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产净额</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="netValOfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="netValOfa"
                                  v-model="formItem.netValOfa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产清理</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="fixAssPfd"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="fixAssPfd"
                                  v-model="formItem.fixAssPfd"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>工程物资</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="conMat"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="conMat"
                                  v-model="formItem.conMat"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>32</td>
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
                    <td><span>待处理固定资产净损失</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="unsGloFa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unsGloFa"
                                  v-model="formItem.unsGloFa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>固定资产合计</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="totFixAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totFixAss"
                                  v-model="formItem.totFixAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产</span></td>
                    <td>35</td>
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
                    <td><span>其中：土地使用权</span></td>
                    <td>36</td>
                    <td>
                      <el-form-item prop="lanUseRig"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lanUseRig"
                                  v-model="formItem.lanUseRig"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延资产（长期待摊费用）</span></td>
                    <td>37</td>
                    <td>
                      <el-form-item prop="defAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defAss"
                                  v-model="formItem.defAss"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：固定资产修理</span></td>
                    <td>38</td>
                    <td>
                      <el-form-item prop="incFixAr"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incFixAr"
                                  v-model="formItem.incFixAr"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产改良支出</span></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="impExpOfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="impExpOfa"
                                  v-model="formItem.impExpOfa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他长期资产</span></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="othLonTa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othLonTa"
                                  v-model="formItem.othLonTa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：特准储备物资</span></td>
                    <td>41</td>
                    <td>
                      <el-form-item prop="amonItSarm"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="amonItSarm"
                                  v-model="formItem.amonItSarm"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>无形及其他资产合计</b></td>
                    <td>42</td>
                    <td>
                      <el-form-item prop="totAssAoa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totAssAoa"
                                  v-model="formItem.totAssAoa"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延税款借项</span></td>
                    <td>43</td>
                    <td>
                      <el-form-item prop="defAssDeb"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defAssDeb"
                                  v-model="formItem.defAssDeb"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>资产总计</b></td>
                    <td>44</td>
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
                    <td><span>短期借款</span></td>
                    <td>45</td>
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
                    <td><span>应付票据</span></td>
                    <td>46</td>
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
                    <td>47</td>
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
                    <td>48</td>
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
                    <td><span>应付工资</span></td>
                    <td>49</td>
                    <td>
                      <el-form-item prop="wagOrSp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="wagOrSp"
                                  v-model="formItem.wagOrSp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付福利费</span></td>
                    <td>50</td>
                    <td>
                      <el-form-item prop="empBen"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="empBen"
                                  v-model="formItem.empBen"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付利润（股利）</span></td>
                    <td>51</td>
                    <td>
                      <el-form-item prop="incPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incPay"
                                  v-model="formItem.incPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应交税金</span></td>
                    <td>52</td>
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
                    <td><span>其他应交款</span></td>
                    <td>53</td>
                    <td>
                      <el-form-item prop="othPayTg"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othPayTg"
                                  v-model="formItem.othPayTg"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>54</td>
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
                    <td><span>预提费用</span></td>
                    <td>55</td>
                    <td>
                      <el-form-item prop="proForExp"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="proForExp"
                                  v-model="formItem.proForExp"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预计负债</span></td>
                    <td>56</td>
                    <td>
                      <el-form-item prop="provisions"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="provisions"
                                  v-model="formItem.provisions"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>一年内到期的长期负债</span></td>
                    <td>57</td>
                    <td>
                      <el-form-item prop="lonTerLdwoy"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerLdwoy"
                                  v-model="formItem.lonTerLdwoy"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动负债</span></td>
                    <td>58</td>
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
                    <td>59</td>
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
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>60</td>
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
                    <td><span>应付债券</span></td>
                    <td>61</td>
                    <td>
                      <el-form-item prop="bonPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="bonPay"
                                  v-model="formItem.bonPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>62</td>
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
                    <td><span>专项应付款</span></td>
                    <td>63</td>
                    <td>
                      <el-form-item prop="graPay"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="graPay"
                                  v-model="formItem.graPay"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他长期负债</span></td>
                    <td>64</td>
                    <td>
                      <el-form-item prop="othLonRl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othLonRl"
                                  v-model="formItem.othLonRl"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：特准储备基金</span></td>
                    <td>65</td>
                    <td>
                      <el-form-item prop="speResFun"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="speResFun"
                                  v-model="formItem.speResFun"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>长期负债合计</b></td>
                    <td>66</td>
                    <td>
                      <el-form-item prop="totLonTl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLonTl"
                                  v-model="formItem.totLonTl"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>递延税款贷项</span></td>
                    <td>67</td>
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
                    <td><b>负债合计</b></td>
                    <td>68</td>
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
                    <td><span>*少数股东权益</span></td>
                    <td>69</td>
                    <td>
                      <el-form-item prop="minInt"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="minInt"
                                  v-model="formItem.minInt"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>实收资本（股本）</span></td>
                    <td>70</td>
                    <td>
                      <el-form-item prop="paiCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="paiCap"
                                  v-model="formItem.paiCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>国家资本</span></td>
                    <td>71</td>
                    <td>
                      <el-form-item prop="natCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="natCap"
                                  v-model="formItem.natCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>集体资本</span></td>
                    <td>72</td>
                    <td>
                      <el-form-item prop="colCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="colCap"
                                  v-model="formItem.colCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>法人资本</span></td>
                    <td>73</td>
                    <td>
                      <el-form-item prop="legPerCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="legPerCap"
                                  v-model="formItem.legPerCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：国有法人资本</span></td>
                    <td>74</td>
                    <td>
                      <el-form-item prop="staOwnLpc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="staOwnLpc"
                                  v-model="formItem.staOwnLpc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>集体法人资本</span></td>
                    <td>75</td>
                    <td>
                      <el-form-item prop="colLegPc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="colLegPc"
                                  v-model="formItem.colLegPc"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>个人资本</span></td>
                    <td>76</td>
                    <td>
                      <el-form-item prop="perCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="perCap"
                                  v-model="formItem.perCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>外商资本</span></td>
                    <td>77</td>
                    <td>
                      <el-form-item prop="forBusCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="forBusCap"
                                  v-model="formItem.forBusCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>资本公积</span></td>
                    <td>78</td>
                    <td>
                      <el-form-item prop="capRse"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="capRse"
                                  v-model="formItem.capRse"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>盈余公积</span></td>
                    <td>79</td>
                    <td>
                      <el-form-item prop="surRes"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="surRes"
                                  v-model="formItem.surRes"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其中：法定盈余公积</span></td>
                    <td>80</td>
                    <td>
                      <el-form-item prop="staSurRes"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="staSurRes"
                                  v-model="formItem.staSurRes"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>公益金</span></td>
                    <td>81</td>
                    <td>
                      <el-form-item prop="pubWelFun"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="pubWelFun"
                                  v-model="formItem.pubWelFun"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>补充流动资本</span></td>
                    <td>82</td>
                    <td>
                      <el-form-item prop="supCurCap"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="supCurCap"
                                  v-model="formItem.supCurCap"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>*未确认的投资损失（以“-”号填列）</span></td>
                    <td>83</td>
                    <td>
                      <el-form-item prop="unaInvLos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unaInvLos"
                                  v-model="formItem.unaInvLos"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>未分配利润</span></td>
                    <td>84</td>
                    <td>
                      <el-form-item prop="unaPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unaPro"
                                  v-model="formItem.unaPro"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>*外币报表折算差额</span></td>
                    <td>85</td>
                    <td>
                      <el-form-item prop="difOnTofcfs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="difOnTofcfs"
                                  v-model="formItem.difOnTofcfs"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>所有者权益合计</b></td>
                    <td>86</td>
                    <td>
                      <el-form-item prop="totEqu"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totEqu"
                                  v-model="formItem.totEqu"
                                  disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>负债和所有者权益合计</b></td>
                    <td>87</td>
                    <td>
                      <el-form-item prop="totEquAl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totEquAl"
                                  v-model="formItem.totEquAl"
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
    <efbHistory v-if="efbHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="efbHistory"
                :vis.sync="efbHistory"></efbHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import efbHistory from './historyList';
export default {
  name: 'child',
  components: {
    vCollapse,
    efbHistory,
  },
  data() {
    return {
      efbHistory: false,
      search_IN_orgId_fake: '',
      paramDetail: {},
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
    historyBtnEfb() {
      this.efbHistory = true;
      this.paramDetail = {
        title: '02版资产负债表-报送历史列表页',
        dialogTitle: '',
        url: null,
        id: this.formItem.id,
      };
    },
    closeChild() {
      this.efbHistory = false;
    },
    init() {
      setTimeout(() => {
        let paramData = this.$route.query;
        let url = this.$urlList.efb.getValUrl;
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
