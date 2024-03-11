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
                              placeholder="选择日期"
                              :picker-options="pickerOptions"
                              :disabled="editDisabled"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报表类型"
                          prop="sheetType">
              <v-select paramtype="E_ReportFormType"
                        v-model="formItem.sheetType"
                        :disabled="editDisabled"></v-select>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row> -->
          <el-col :span="12">
            <el-form-item label="报表类型细分"
                          prop="sheetTypeDivide">
              <v-select paramtype="E_ReportFormdel"
                        v-model="formItem.sheetTypeDivide"
                        :disabled="editDisabled"></v-select>
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
            <!-- <el-form-item label="所属机构" prop="deptCode"> -->
            <!-- <el-input v-model="formItem.deptCode"></el-input> -->
            <!-- 这个是在页面展示得数据 -->
            <!-- <span @click="menutreeshow(this.$urlList.common.orgTree,'所属机构',defaultProps)">
                  <el-input v-model="search_IN_orgId_fake" readonly disabled="disabled"></el-input>
              </span> -->
            <!-- 向后台发送这个数据 -->
            <!-- <el-input v-model.trim="formItem.deptCode" v-show="false"></el-input> -->
            <!-- </el-form-item> -->
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
                                  v-model="formItem.curFun"></el-input>
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
                                  v-model="formItem.shoRerInv"></el-input>
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
                                  v-model="formItem.notRec"></el-input>
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
                                  v-model="formItem.divRec"></el-input>
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
                                  v-model="formItem.intRec"></el-input>
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
                    <td><span>其他应收款</span></td>
                    <td>7</td>
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
                    <td><span>预付账款</span></td>
                    <td>8</td>
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
                    <td><span>期货保证金</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="futGua"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="futGua"
                                  v-model="formItem.futGua"></el-input>
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
                                  v-model="formItem.allRec"></el-input>
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
                                  v-model="formItem.expDraRec"></el-input>
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
                                  v-model="formItem.inventories"></el-input>
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
                                  v-model="formItem.rawMat"></el-input>
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
                                  v-model="formItem.finPro"></el-input>
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
                                  v-model="formItem.defExp"></el-input>
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
                                  v-model="formItem.unsGloCa"></el-input>
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
                                  v-model="formItem.lonTerDifday"></el-input>
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
                                  v-model="formItem.othCurAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>流动资产合计</b></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="totCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurAss"
                                  v-model="formItem.totCurAss"></el-input>
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
                                  v-model="formItem.lonTerInv"></el-input>
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
                                  v-model="formItem.lonTerEi"></el-input>
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
                                  v-model="formItem.lonTerSi"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b class="light">合并价差</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="incPriDif"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="incPriDif"
                                  v-model="formItem.incPriDif"></el-input>
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
                                  v-model="formItem.totLonTi"></el-input>
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
                                  v-model="formItem.oriCosOfa"></el-input>
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
                                  v-model="formItem.rixAssAd"></el-input>
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
                                  v-model="formItem.fixAssNv"></el-input>
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
                                  v-model="formItem.proForIofa"></el-input>
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
                                  v-model="formItem.netValOfa"></el-input>
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
                                  v-model="formItem.fixAssPfd"></el-input>
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
                                  v-model="formItem.conMat"></el-input>
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
                                  v-model="formItem.conInPro"></el-input>
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
                                  v-model="formItem.unsGloFa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>固定资产合计</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="totFixAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totFixAss"
                                  v-model="formItem.totFixAss"></el-input>
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
                                  v-model="formItem.intAss"></el-input>
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
                                  v-model="formItem.lanUseRig"></el-input>
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
                                  v-model="formItem.defAss"></el-input>
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
                                  v-model="formItem.incFixAr"></el-input>
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
                                  v-model="formItem.impExpOfa"></el-input>
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
                                  v-model="formItem.othLonTa"></el-input>
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
                                  v-model="formItem.amonItSarm"></el-input>
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
                                  v-model="formItem.totAssAoa"></el-input>
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
                                  v-model="formItem.defAssDeb"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>资产总计</b></td>
                    <td>44</td>
                    <td>
                      <el-form-item prop="totAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  :disabled="false"
                                  name="totAss"
                                  v-model="formItem.totAss"></el-input>
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
                                  v-model="formItem.shoTerBor"></el-input>
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
                                  v-model="formItem.notPay"></el-input>
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
                                  v-model="formItem.accPay"></el-input>
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
                                  v-model="formItem.recInAdv"></el-input>
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
                                  v-model="formItem.wagOrSp"></el-input>
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
                                  v-model="formItem.empBen"></el-input>
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
                                  v-model="formItem.incPay"></el-input>
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
                                  v-model="formItem.taxPay"></el-input>
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
                                  v-model="formItem.othPayTg"></el-input>
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
                                  v-model="formItem.othPay"></el-input>
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
                                  v-model="formItem.proForExp"></el-input>
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
                                  v-model="formItem.provisions"></el-input>
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
                                  v-model="formItem.lonTerLdwoy"></el-input>
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
                                  v-model="formItem.othCurLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>流动负债合计</b></td>
                    <td>59</td>
                    <td>
                      <el-form-item prop="totCurLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurLia"
                                  v-model="formItem.totCurLia"></el-input>
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
                                  v-model="formItem.lonTerBor"></el-input>
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
                                  v-model="formItem.bonPay"></el-input>
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
                                  v-model="formItem.lonTerPay"></el-input>
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
                                  v-model="formItem.graPay"></el-input>
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
                                  v-model="formItem.othLonRl"></el-input>
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
                                  v-model="formItem.speResFun"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>长期负债合计</b></td>
                    <td>66</td>
                    <td>
                      <el-form-item prop="totLonTl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLonTl"
                                  v-model="formItem.totLonTl"></el-input>
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
                                  v-model="formItem.defTaxCre"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>负债合计</b></td>
                    <td>68</td>
                    <td>
                      <el-form-item prop="totLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLia"
                                  v-model="formItem.totLia"
                                  @change="calcObj.clacTotEquAl2(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b class="light">少数股东权益</b></td>
                    <td>69</td>
                    <td>
                      <el-form-item prop="minInt"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="minInt"
                                  v-model="formItem.minInt"
                                  @change="calcObj.clacTotEquAl2(self)"></el-input>
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
                                  v-model="formItem.paiCap"></el-input>
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
                                  v-model="formItem.natCap"></el-input>
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
                                  v-model="formItem.colCap"></el-input>
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
                                  v-model="formItem.legPerCap"></el-input>
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
                                  v-model="formItem.staOwnLpc"></el-input>
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
                                  v-model="formItem.colLegPc"></el-input>
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
                                  v-model="formItem.perCap"></el-input>
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
                                  v-model="formItem.forBusCap"></el-input>
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
                                  v-model="formItem.capRse"></el-input>
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
                                  v-model="formItem.surRes"></el-input>
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
                                  v-model="formItem.staSurRes"></el-input>
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
                                  v-model="formItem.pubWelFun"></el-input>
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
                                  v-model="formItem.supCurCap"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b class="light">未确认的投资损失（以“-”号填列）</b></td>
                    <td>83</td>
                    <td>
                      <el-form-item prop="unaInvLos"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="unaInvLos"
                                  v-model="formItem.unaInvLos"></el-input>
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
                                  v-model="formItem.unaPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b class="light">外币报表折算差额</b></td>
                    <td>85</td>
                    <td>
                      <el-form-item prop="difOnTofcfs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="difOnTofcfs"
                                  v-model="formItem.difOnTofcfs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>所有者权益合计</b></td>
                    <td>86</td>
                    <td>
                      <el-form-item prop="totEqu"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totEqu"
                                  v-model="formItem.totEqu"
                                  @change="calcObj.clacTotEquAl2(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>负债和所有者权益合计</b></td>
                    <td>87</td>
                    <td>
                      <el-form-item prop="totEquAl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  :disabled="true"
                                  name="totEquAl"
                                  v-model="formItem.totEquAl"></el-input>
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
      formObj: {},
      sheetYear2: '',
      entCertNumRules: [],
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
        // auditTime: '',
        deptCode: '',
        bussDate: '',
        noReport: '',

        curFun: '',
        shoRerInv: '',
        notRec: '',
        divRec: '',
        intRec: '',
        accRec: '',
        othRec: '',
        prepayments: '',
        futGua: '',
        allRec: '',
        expDraRec: '',
        inventories: '',
        rawMat: '',
        finPro: '',
        defExp: '',
        unsGloCa: '',
        lonTerDifday: '',
        othCurAss: '',
        totCurAss: '',

        lonTerInv: '',
        lonTerEi: '',
        lonTerSi: '',
        incPriDif: '',
        totLonTi: '',
        oriCosOfa: '',
        rixAssAd: '',
        fixAssNv: '',
        proForIofa: '',
        netValOfa: '',
        fixAssPfd: '',
        conMat: '',
        conInPro: '',
        unsGloFa: '',
        totFixAss: '',

        intAss: '',
        lanUseRig: '',
        defAss: '',
        incFixAr: '',
        impExpOfa: '',
        othLonTa: '',
        amonItSarm: '',
        totAssAoa: '',
        defAssDeb: '',
        totAss: '',

        shoTerBor: '',
        notPay: '',
        accPay: '',
        recInAdv: '',
        wagOrSp: '',
        empBen: '',
        incPay: '',
        taxPay: '',
        othPayTg: '',
        othPay: '',
        proForExp: '',
        provisions: '',
        lonTerLdwoy: '',
        othCurLia: '',
        totCurLia: '',

        lonTerBor: '',
        bonPay: '',
        lonTerPay: '',
        graPay: '',
        othLonRl: '',
        speResFun: '',
        totLonTl: '',

        defTaxCre: '',
        totLia: '',

        minInt: '',
        paiCap: '',
        natCap: '',
        colCap: '',
        legPerCap: '',
        staOwnLpc: '',
        colLegPc: '',
        perCap: '',
        forBusCap: '',
        capRse: '',
        surRes: '',
        staSurRes: '',
        pubWelFun: '',
        supCurCap: '',
        unaInvLos: '',
        unaPro: '',
        difOnTofcfs: '',

        totEqu: '',
        totEquAl: '',
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
        // totCurAss: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totFixAss: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totAss: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totCurLia: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totLonTl: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totLia: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totEqu: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ],
        // totEquAl: [
        //    { required: true, message: ' ', trigger: 'blur' }
        // ]
      },
      collapseList: {
        activeNames: ['efb'], // 默认显示那个折叠栏 没有默认显示全部。
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
    dateFormat(dateObj) {
      let date = new Date(dateObj);
      let y = date.getFullYear(); // 年
      let MM = date.getMonth() + 1; // 月
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate(); // 日
      d = d < 10 ? '0' + d : d;
      return y + '-' + MM + '-' + d;
    },
    init() {
      // 修改页实现单条数据的查询
      if (this.$store.getters.operatState == 'edit') {
        setTimeout(() => {
          let paramData = this.$route.query;
          let url = this.$urlList.efb.getValUrl;
          this.http.apiPost(url, paramData).then((res) => {
            res.sheetYear = res.sheetYear + '';
            this.formItem = res;
            // 获取 客户号、报表年份、报表类型、报表类型细分 的值
            this.formObj.custId = this.formItem.custId;
            this.formObj.sheetYear = this.formItem.sheetYear;
            this.formObj.sheetType = this.formItem.sheetType;
            this.formObj.sheetTypeDivide = this.formItem.sheetTypeDivide;
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
      let totEquAl = this.formItem.totEquAl;
      let totAss = this.formItem.totAss;
      // 资产总计 是否 等于 负债和所有者权益合计
      if (totAss && totEquAl) {
        if (parseFloat(totAss) != parseFloat(totEquAl)) {
          this.$alert('资产总计 必须等于 负债和所有者权益合计', '提示', {
            dangerouslyUseHTMLString: true,
          });
          return false;
        }
      }
      // 验证提交
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          // 判断url接口是新增功能还是修改功能
          let url = '';
          if (this.$store.getters.operatState == 'add' && !this.comData) {
            // 新增功能
            url = this.$urlList.efb.create;
          } else if (this.$store.getters.operatState == 'add' && this.comData) {
            this.formItem = Object.assign(
              JSON.parse(this.comData).data,
              this.formItem
            );
            url = this.$urlList.efb.update;
          } else if (this.$store.getters.operatState == 'edit') {
            // 修改功能
            url = this.$urlList.efb.update;
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
                //   return true;
                // }
              });
            });
        }
        return false;
      });
    },
    // 重置按钮
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
      '',
      '',
      '',
      '',
      '',
      'totFixAss',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
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
      '',
      '',
      '',
      '',
      'totCurLia',
      '',
      '',
      '',
      '',
      '',
      '',
      'totLonTl',
      '',
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
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'totEqu',
      'totEquAl',
    ];
    // 表单数字校验
    let arr = [
      'curFun',
      'shoRerInv',
      'notRec',
      'divRec',
      'intRec',
      'accRec',
      'othRec',
      'prepayments',
      'futGua',
      'allRec',
      'expDraRec',
      'inventories',
      'rawMat',
      'finPro',
      'defExp',
      'unsGloCa',
      'lonTerDifday',
      'othCurAss',
      'totCurAss',
      'lonTerInv',
      'lonTerEi',
      'lonTerSi',
      'incPriDif',
      'totLonTi',
      'oriCosOfa',
      'rixAssAd',
      'fixAssNv',
      'proForIofa',
      'netValOfa',
      'fixAssPfd',
      'conMat',
      'conInPro',
      'unsGloFa',
      'totFixAss',
      'intAss',
      'lanUseRig',
      'defAss',
      'incFixAr',
      'impExpOfa',
      'othLonTa',
      'amonItSarm',
      'totAssAoa',
      'defAssDeb',
      'totAss',
      'shoTerBor',
      'notPay',
      'accPay',
      'recInAdv',
      'wagOrSp',
      'empBen',
      'incPay',
      'taxPay',
      'othPayTg',
      'othPay',
      'proForExp',
      'provisions',
      'lonTerLdwoy',
      'othCurLia',
      'totCurLia',
      'lonTerBor',
      'bonPay',
      'lonTerPay',
      'graPay',
      'othLonRl',
      'speResFun',
      'totLonTl',
      'defTaxCre',
      'totLia',
      'minInt',
      'paiCap',
      'natCap',
      'colCap',
      'legPerCap',
      'staOwnLpc',
      'colLegPc',
      'perCap',
      'forBusCap',
      'capRse',
      'surRes',
      'staSurRes',
      'pubWelFun',
      'supCurCap',
      'unaInvLos',
      'unaPro',
      'difOnTofcfs',
      'totEqu',
      'totEquAl',
    ];

    let that = this;
    // 非空校验
    for (let i = 0; i < arr0.length; i++) {
      that.rules[arr0[i]] = [{}];
      that.rules[arr0[i]] = [];
      // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
      if (arr0[i] == 'totAss' || arr0[i] == 'totEquAl') {
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
      if (arr[i] == 'totEquAl') {
        // arr[i] == 'totAss' ||
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
