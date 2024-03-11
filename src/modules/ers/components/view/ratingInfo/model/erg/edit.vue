<template>
  <div style="width:85%"
       class="formItem">
    <el-form ref="formItem"
             :model="formItem"
             :rules="rules"
             label-width="140px">
      <div>
        <el-row>
          <!-- <el-col :span="12"
                  v-show="showSee">
            <el-form-item label="客户号"
                          prop="custId">
              <el-input v-model="formItem.custId"
                        :disabled="editDisabled"></el-input>
            </el-form-item>
          </el-col> -->
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
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报表类型"
                          prop="sheetType">
              <v-select paramtype="ReportFormType"
                        v-model="formItem.sheetType"
                        :disabled="editDisabled"></v-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报表类型细分"
                          prop="sheetTypeDivide">
              <v-select paramtype="ReportFormdel"
                        v-model="formItem.sheetTypeDivide"
                        :disabled="editDisabled"></v-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item prop="deptCode"
                          label="内部机构代码">
              这个是在页面展示得数据
              <span @click="menutreeshow()">
                <el-input v-model="search_IN_orgId_fake"
                          readonly></el-input>
              </span>
              向后台发送这个数据
              <el-input v-model.trim="formItem.deptCode"
                        v-show="false"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="业务发生日期"
                          prop="bussDate">
              <el-date-picker v-model="formItem.bussDate"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions"></el-date-picker>
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
                  <h3>2022版企业资产负债表</h3>
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
                  <!-- 流动资产 -->
                  <tr>
                    <td><b>流动资产：</b></td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>货币资金</span></td>
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
                    <td><span class="star">*</span><span>交易性金融资产</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="finAssHft"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finAssHft"
                                  v-model="formItem.finAssHft"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>衍生金融资产</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="derFinAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="derFinAss"
                                  v-model="formItem.derFinAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>应收票据</span></td>
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
                    <td><span class="star">*</span><span>应收账款</span></td>
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
                    <td><span class="star">*</span><span>应收款项融资</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="recFin"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="recFin"
                                  v-model="formItem.recFin"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>预付款项</span></td>
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
                    <td><span class="star">*</span><span>其他应收款</span></td>
                    <td>9</td>
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
                    <td><span class="star">*</span><span>存货</span></td>
                    <td>10</td>
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
                    <td><span class="star">*</span><span>合同资产</span></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="conAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="conAss"
                                  v-model="formItem.conAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>持有待售资产</span></td>
                    <td>12</td>
                    <td>
                      <el-form-item prop="assHfs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="assHfs"
                                  v-model="formItem.assHfs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>一年内到期的非流动资产</span></td>
                    <td>13</td>
                    <td>
                      <el-form-item prop="curPorOnca"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curPorOnca"
                                  v-model="formItem.curPorOnca"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他流动资产</span></td>
                    <td>14</td>
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
                    <td>15</td>
                    <td>
                      <el-form-item prop="totCurAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totCurAss"
                                  v-model="formItem.totCurAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <!-- 非流动资产 -->
                  <tr>
                    <td><b>非流动资产：</b></td>
                    <td>16</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>债权投资</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="debInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="debInv"
                                  v-model="formItem.debInv"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他债权投资</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="othDebInv"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othDebInv"
                                  v-model="formItem.othDebInv"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>长期应收款</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="lonTerRec"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerRec"
                                  v-model="formItem.lonTerRec"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>长期股权投资</span></td>
                    <td>20</td>
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
                    <td><span class="star">*</span><b class="light">其他权益工具投资</b></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="othEquIi"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othEquIi"
                                  v-model="formItem.othEquIi"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b class="light">其他非流动金融资产</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="othNonCfa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othNonCfa"
                                  v-model="formItem.othNonCfa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>投资性房地产</span></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="invPro"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="invPro"
                                  v-model="formItem.invPro"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>固定资产</span></td>
                    <td>24</td>
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
                    <td><span class="star">*</span><span>在建工程</span></td>
                    <td>25</td>
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
                    <td><span class="star">*</span><span>生产性生物资产</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="nonCurBa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="nonCurBa"
                                  v-model="formItem.nonCurBa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>油气资产</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="oilAndGa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="oilAndGa"
                                  v-model="formItem.oilAndGa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>使用权资产</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="useRigAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="useRigAss"
                                  v-model="formItem.useRigAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>无形资产</span></td>
                    <td>29</td>
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
                    <td><span class="star">*</span><span>开发支出</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="devDis"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="devDis"
                                  v-model="formItem.devDis"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>商誉</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="goodwill"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="goodwill"
                                  v-model="formItem.goodwill"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>长期待摊费用</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="lonTerDe"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lonTerDe"
                                  v-model="formItem.lonTerDe"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>递延所得税资产</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="defTaxAss"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defTaxAss"
                                  v-model="formItem.defTaxAss"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他非流动资产</span></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="othNonCa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othNonCa"
                                  v-model="formItem.othNonCa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>非流动资产合计</b></td>
                    <td>35</td>
                    <td>
                      <el-form-item prop="totNonCa"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCa"
                                  v-model="formItem.totNonCa"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>资产总计</b></td>
                    <td>36</td>
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
                    <td><b>流动负债：</b></td>
                    <td>37</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>短期借款</span></td>
                    <td>38</td>
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
                    <td><span class="star">*</span><span>交易性金融负债</span></td>
                    <td>39</td>
                    <td>
                      <el-form-item prop="finLiaHft"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="finLiaHft"
                                  v-model="formItem.finLiaHft"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>衍生金融负债</span></td>
                    <td>40</td>
                    <td>
                      <el-form-item prop="derFinLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="derFinLia"
                                  v-model="formItem.derFinLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>应付票据</span></td>
                    <td>41</td>
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
                    <td><span class="star">*</span><span>应付账款</span></td>
                    <td>42</td>
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
                    <td><span class="star">*</span><span>预收款项</span></td>
                    <td>43</td>
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
                    <td><span class="star">*</span><span>合同负债</span></td>
                    <td>44</td>
                    <td>
                      <el-form-item prop="conLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="conLia"
                                  v-model="formItem.conLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>应付职工薪酬</span></td>
                    <td>45</td>
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
                    <td><span class="star">*</span><span>应交税费</span></td>
                    <td>46</td>
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
                    <td><span class="star">*</span><span>其他应付款</span></td>
                    <td>47</td>
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
                    <td><span class="star">*</span><span>持有待售负债</span></td>
                    <td>48</td>
                    <td>
                      <el-form-item prop="liaHfs"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="liaHfs"
                                  v-model="formItem.liaHfs"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>一年内到期的非流动负债</span></td>
                    <td>49</td>
                    <td>
                      <el-form-item prop="curPorOltl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="curPorOltl"
                                  v-model="formItem.curPorOltl"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他流动负债</span></td>
                    <td>50</td>
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
                    <td>51</td>
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
                    <td><b>非流动负债：</b></td>
                    <td>52</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>长期借款</span></td>
                    <td>53</td>
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
                    <td><span class="star">*</span><span>应付债券</span></td>
                    <td>54</td>
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
                    <td><span class="star">*</span><span>其中：优先股</span></td>
                    <td>55</td>
                    <td>
                      <el-form-item prop="bonPreSto"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="bonPreSto"
                                  v-model="formItem.bonPreSto"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>永续债</span></td>
                    <td>56</td>
                    <td>
                      <el-form-item prop="bonPerBon"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="bonPerBon"
                                  v-model="formItem.bonPerBon"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>租赁负债</span></td>
                    <td>57</td>
                    <td>
                      <el-form-item prop="leaLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="leaLia"
                                  v-model="formItem.leaLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>长期应付款</span></td>
                    <td>58</td>
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
                    <td><span class="star">*</span><span>预计负债</span></td>
                    <td>59</td>
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
                    <td><span class="star">*</span><span>递延收益</span></td>
                    <td>60</td>
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
                    <td><span class="star">*</span><span>递延所得税负债</span></td>
                    <td>61</td>
                    <td>
                      <el-form-item prop="defTaxLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="defTaxLia"
                                  v-model="formItem.defTaxLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他非流动负债</span></td>
                    <td>62</td>
                    <td>
                      <el-form-item prop="othNonCl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othNonCl"
                                  v-model="formItem.othNonCl"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>非流动负债合计</b></td>
                    <td>63</td>
                    <td>
                      <el-form-item prop="totNonCl"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totNonCl"
                                  v-model="formItem.totNonCl"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b>负债合计</b></td>
                    <td>64</td>
                    <td>
                      <el-form-item prop="totLia"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="totLia"
                                  v-model="formItem.totLia"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>所有者权益（或股东权益）</b></td>
                    <td>65</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>实收资本（或股本）</span></td>
                    <td>66</td>
                    <td>
                      <el-form-item prop="paiInCosc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="paiInCosc"
                                  v-model="formItem.paiInCosc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><b class="light">其他权益工具</b></td>
                    <td>67</td>
                    <td>
                      <el-form-item prop="othEquIns"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othEquIns"
                                  v-model="formItem.othEquIns"
                                  @change="calcObj.clacTotEquAl2(self)"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其中：优先股</span></td>
                    <td>68</td>
                    <td>
                      <el-form-item prop="othPreSto"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othPreSto"
                                  v-model="formItem.othPreSto"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>永续债</span></td>
                    <td>69</td>
                    <td>
                      <el-form-item prop="othPerBon"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othPerBon"
                                  v-model="formItem.othPerBon"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>资本公积</span></td>
                    <td>70</td>
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
                    <td><span class="star">*</span><span>减：库存股</span></td>
                    <td>71</td>
                    <td>
                      <el-form-item prop="lesTreSto"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="lesTreSto"
                                  v-model="formItem.lesTreSto"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>其他综合收益</span></td>
                    <td>72</td>
                    <td>
                      <el-form-item prop="othComInc"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="othComInc"
                                  v-model="formItem.othComInc"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>专项储备</span></td>
                    <td>73</td>
                    <td>
                      <el-form-item prop="speRes"
                                    label-width="0px">
                        <el-input class="inputCls"
                                  name="speRes"
                                  v-model="formItem.speRes"></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="star">*</span><span>盈余公积</span></td>
                    <td>74</td>
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
                    <td><span class="star">*</span><span>未分配利润</span></td>
                    <td>75</td>
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
                    <td><span class="star">*</span><b>所有者权益（或股东权益）合计</b></td>
                    <td>76</td>
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
                    <td><span class="star">*</span><b>负债和所有者权益（或股东权益）总计</b></td>
                    <td>77</td>
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
        finAssHft: '',
        derFinAss: '',
        notRec: '',
        accRec: '',
        recFin: '',
        othRec: '',
        prepayments: '',
        conAss: '',
        assHfs: '',
        curPorOnca: '',
        inventories: '',
        debInv: '',
        othDebInv: '',
        lonTerRec: '',
        unsGloCa: '',
        lonTerDifday: '',
        othCurAss: '',
        totCurAss: '',

        lonTerInv: '',
        lonTerEi: '',
        lonTerSi: '',
        othEquIi: '',
        othNonCfa: '',
        invPro: '',
        fixAss: '',
        nonCurBa: '',
        oilAndGa: '',
        useRigAss: '',
        fixAssPfd: '',
        conMat: '',
        conInPro: '',
        unsGloFa: '',
        totFixAss: '',

        intAss: '',
        devDis: '',
        goodwill: '',
        lonTerDe: '',
        defTaxAss: '',
        othNonCa: '',
        totNonCa: '',
        finLiaHft: '',
        derFinLia: '',
        conLia: '',
        totAss: '',

        shoTerBor: '',
        notPay: '',
        accPay: '',
        recInAdv: '',
        empBenPay: '',
        empBen: '',
        liaHfs: '',
        taxPay: '',
        curPorOltl: '',
        othPay: '',
        bonPreSto: '',
        provisions: '',
        defInc: '',
        bonPerBon: '',
        othCurLia: '',
        totCurLia: '',

        lonTerBor: '',
        bonPay: '',
        leaLia: '',
        lonTerPay: '',
        bonPerBon: '',
        defTaxLia: '',
        othNonCl: '',
        totNonCl: '',

        paiInCosc: '',
        totLia: '',

        othEquIns: '',
        othPreSto: '',
        othPerBon: '',
        lesTreSto: '',
        othComInc: '',
        speRes: '',
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
        sheetYear: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        sheetType: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        sheetTypeDivide: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        // auditFirmName: [{ max: 80, message: '最多80个字符', trigger: 'blur' }],
        // auditorName: [{ max: 30, message: '最多30个字符', trigger: 'blur' }],
        // deptCode: [
        //   { required: true, message: '输入不能为空', trigger: 'blur' },
        // ],
        bussDate: [
          { required: true, message: '输入不能为空', trigger: 'change' },
        ],
        curFun: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        finAssHft: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        derFinAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        notRec: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        accRec: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        recFin: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        prepayments: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othRec: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        inventories: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        conAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        assHfs: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        curPorOnca: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othCurAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totCurAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        debInv: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othDebInv: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lonTerRec: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lonTerEi: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othEquIi: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othNonCfa: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        invPro: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        conInPro: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        nonCurBa: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        oilAndGa: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        useRigAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        intAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        devDis: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        goodwill: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lonTerDe: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        defTaxAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othNonCa: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totNonCa: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totAss: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        shoTerBor: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        finLiaHft: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        derFinLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        notPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        accPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        recInAdv: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        conLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        empBenPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        taxPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        liaHfs: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        curPorOltl: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othCurLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totCurLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lonTerBor: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        bonPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        bonPreSto: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        bonPerBon: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        leaLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lonTerPay: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        provisions: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        defInc: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        defTaxLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othNonCl: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totNonCl: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totLia: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        paiInCosc: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othEquIns: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othPreSto: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othPerBon: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        capRse: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        lesTreSto: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        othComInc: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        speRes: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        surRes: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        unaPro: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totEqu: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        totEquAl: [
          {
            required: true,
            message: '输入不能为空',
            trigger: 'blur',
          },
          {
            required: true,
            validator: this.validator.isFloat,
            trigger: 'blur',
          },
        ],
        // noReport: [
        //   { required: true, message: '输入不能为空', trigger: 'change' },
        // ],
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
        // totNonCl: [
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
        activeNames: ['erg'], // 默认显示那个折叠栏 没有默认显示全部。
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
    // menutreeshow() {
    //   // 加载树结构
    //   this.http.apiGet(this.$urlList.common.orgTree).then((res) => {
    //     // 行业分类代码的接口修改 就把这个判断去掉
    //     if (Object.prototype.toString.call(res) === '[object Object]') {
    //       res = [res];
    //     }
    //     this.paramTree = {
    //       visible: true,
    //       title: '机构树',
    //       treedata: res,
    //       defaultProps: {
    //         children: 'children',
    //         label: function (a, b) {
    //           return a.name;
    //         },
    //       },
    //       name: 'deptCode',
    //     };
    //     localStorage.setItem('ms_orgCode', res[0].id);
    //   });
    // },
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
      if (this.$store.getters.operatState == 'edit' && this.$route.query.id) {
        setTimeout(() => {
          let paramData = this.$route.query.id;
          // let paramData = this.$route.query;
          let url = this.$urlList.erg.getValUrl;
          this.http.apiPost(url, { id: paramData }).then((res) => {
            res.sheetYear = res.sheetYear + '';
            this.formItem = res;
            // 获取 客户号、报表年份、报表类型、报表类型细分 的值
            // this.formObj.custId = this.formItem.custId;
            // this.formObj.sheetYear = this.formItem.sheetYear;
            // this.formObj.sheetType = this.formItem.sheetType;
            // this.formObj.sheetTypeDivide = this.formItem.sheetTypeDivide;
            this.deptCodeDic();
          });
        }, 10);
        // 当页面状态为修改页状态时，客户号、报表年份、报表类型、报表类型细分 设置必读属性
        this.editDisabled = true;
        // 客户号直接隐藏不显示
        // this.showSee = false;
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
      // let param = Object.assign(this.$refs[formItem].formItem, {
      //   custId: this.$store.getters.arrListFormItem.custId,
      //   deptCode: this.$store.getters.arrListFormItem.deptCode,
      // });
      // this.callback(formItem, 'erg', param);
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
        // if (
        //   this.formItem[item] == 0 &&
        //   typeof this.formItem[item] == 'number'
        // ) {
        //   this.formItem[item] = 0 + '';
        // }
        if (
          // this.formItem[item] == 0 &&
          typeof this.formItem[item] == 'number'
        ) {
          this.formItem[item] = this.formItem[item].toFixed(2);
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
          if (this.formItem.custId != '' && this.formItem.deptCode != '') {
            if (this.$store.getters.operatState == 'add' && !this.comData) {
              // 新增功能
              url = this.$urlList.erg.create;
            } else if (
              this.$store.getters.operatState == 'add' &&
              this.comData
            ) {
              this.formItem = Object.assign(
                JSON.parse(this.comData).data,
                this.formItem
              );
              url = this.$urlList.erg.update;
            } else if (this.$store.getters.operatState == 'edit') {
              // 修改功能
              url = this.$urlList.erg.update;
            }
            this.$store.dispatch('user/setOperatState', 'edit');
            this.http
              .apiPost(url, this.formItem, {
                showLoading: true,
              })
              .then((res) => {
                this.editDisabled = true;
                this.comData = res.comData;
                this.common.submitMsg(res).then(() => {
                  if (res.code == '00000000') {
                    this.$router.push({
                      path: '/era-rateTab-edit',
                      query: {
                        custId: this.formItem.custId,
                        deptCode: this.formItem.deptCode,
                      },
                    });
                  }
                });
              });
          } else {
            url = this.$urlList.erg.create;
            this.formItem.custId = this.$route.query.custId;
            this.formItem.deptCode = this.$route.query.deptCode;
            this.$store.dispatch('user/setOperatState', 'edit');
            this.http
              .apiPost(url, this.formItem, {
                showLoading: true,
              })
              .then((res) => {
                this.editDisabled = true;
                this.comData = res.comData;
                if (res.code == '00000001') {
                  this.editDisabled = false;
                  this.formItem.custId = '';
                  this.formItem.deptCode = '';
                }
                this.common.submitMsg(res).then(() => {
                  if (res.code == '00000000') {
                    this.$router.push({
                      path: '/era-rateTab-edit',
                      query: {
                        custId: this.formItem.custId,
                        deptCode: this.formItem.deptCode,
                      },
                    });
                  }
                });
              });
          }
        }
        return false;
      });
    },
    // 重置按钮
    resetForm(formItem) {
      // 只读属性字段的数组，不能被清空
      // 客户号、报表年份、报表类型、报表类型细分
      let disabledArr = [
        'custId',
        'sheetYear',
        'sheetType',
        'sheetTypeDivide',
        'deptCode',
      ];
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
      'totNonCl',
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
      'finAssHft',
      'derFinAss',
      'notRec',
      'accRec',
      'recFin',
      'othRec',
      'prepayments',
      'conAss',
      'assHfs',
      'curPorOnca',
      'inventories',
      'debInv',
      'othDebInv',
      'lonTerRec',
      'unsGloCa',
      'lonTerDifday',
      'othCurAss',
      'totCurAss',
      'lonTerInv',
      'lonTerEi',
      'lonTerSi',
      'othEquIi',
      'othNonCfa',
      'invPro',
      'fixAss',
      'nonCurBa',
      'oilAndGa',
      'useRigAss',
      'fixAssPfd',
      'conMat',
      'conInPro',
      'unsGloFa',
      'totFixAss',
      'intAss',
      'devDis',
      'goodwill',
      'lonTerDe',
      'defTaxAss',
      'othNonCa',
      'totNonCa',
      'finLiaHft',
      'derFinLia',
      'conLia',
      'totAss',
      'shoTerBor',
      'notPay',
      'accPay',
      'recInAdv',
      'empBenPay',
      'empBen',
      'liaHfs',
      'taxPay',
      'curPorOltl',
      'othPay',
      'bonPreSto',
      'provisions',
      'defInc',
      'bonPerBon',
      'othCurLia',
      'totCurLia',
      'lonTerBor',
      'bonPay',
      'leaLia',
      'lonTerPay',
      'bonPerBon',
      'defTaxLia',
      'othNonCl',
      'totNonCl',
      'paiInCosc',
      'totLia',
      'othEquIns',
      'othPreSto',
      'othPerBon',
      'lesTreSto',
      'othComInc',
      'speRes',
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
    // // 非空校验
    // for (let i = 0; i < arr0.length; i++) {
    //   that.rules[arr0[i]] = [{}];
    //   that.rules[arr0[i]] = [];
    //   // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
    //   if (arr0[i] == 'totAss' || arr0[i] == 'totEquAl') {
    //     that.rules[arr0[i]].push({
    //       required: true,
    //       validator: that.validator.empty,
    //       trigger: 'blur',
    //     });
    //   } else {
    //     that.rules[arr0[i]].push({
    //       required: true,
    //       validator: that.validator.empty,
    //       trigger: 'blur',
    //     });
    //     that.rules[arr0[i]].push({
    //       required: true,
    //       validator: that.validator.plusAndMinus,
    //       trigger: 'blur',
    //     });
    //   }
    // }
    // // 数字校验
    // for (let i = 0; i < arr.length; i++) {
    //   that.rules[arr[i]] = [{}];
    //   that.rules[arr[i]] = [];
    //   // 当字段为 资产总计 或 负债和所有者权益合计 时，不进行数字校验
    //   if (arr[i] == 'totEquAl') {
    //     // arr[i] == 'totAss' ||
    //     that.rules[arr0[i]].push({
    //       required: true,
    //       validator: that.validator.empty,
    //       trigger: 'blur',
    //     });
    //   } else {
    //     that.rules[arr0[i]].push({
    //       required: true,
    //       validator: that.validator.empty,
    //       trigger: 'blur',
    //     });
    //     that.rules[arr[i]].push({
    //       required: true,
    //       validator: that.validator.plusAndMinus,
    //       trigger: 'blur',
    //     });
    //   }
    // }
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
  /* padding-left: 28px; */
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
