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
        <!-- <h2 class="title">事业单位资产负债表信息</h2> -->
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
              <td>{{ this.ehfhItem.batchNum }}</td>
              <td>{{ this.ehfhItem.msgNum }}</td>
              <td>{{ this.idTypeDic['E_REPORT_STATE'][this.ehfhItem.reportState] }}</td>
              <td>{{ this.ehfhItem.msgDate }}</td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfhItem.infRecType] }}</td>
              <td>{{ this.ehfhItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfhItem.entCertType] }}</td>
              <td>{{ this.ehfhItem.entCertNum }}</td>
              <td>{{ formatDate(this.ehfhItem.rptDate) }}</td>
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
              <td>{{ this.ehfhItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfhItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfhItem.sheetTypeDivide] }}</td>
              <td>{{ this.ehfhItem.cimoc }}</td>
              <td>{{ this.idTypeDic['E_RptDateCode_EF'][this.ehfhItem.rptDateCode] }}</td>
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
              <td>{{ this.ehfhItem.auditFirmName }}</td>
              <td>{{ this.ehfhItem.auditorName }}</td>
              <td>{{ formatDate(this.ehfhItem.auditTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-form>
      <div class="classTab" v-if="showTableTab">
        <el-row>
          <el-col :span="24" style="width:100%">
            <table class="tabTitle">
              <tr><td><h3>事业单位资产负债表</h3></td></tr>
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
                    <td><b>流动资产：</b></td>
                    <td>1</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>货币资金</span></td>
                    <td>2</td>
                    <td>
                      <el-form-item prop="curFun" label-width="0px">
                        <el-input class="inputCls" name="curFun" v-model="this.ehfhItem.curFun" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>短期投资</span></td>
                    <td>3</td>
                    <td>
                      <el-form-item prop="shoTerInv" label-width="0px">
                        <el-input class="inputCls" name="shoTerInv" v-model="this.ehfhItem.shoTerInv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>财政应返还额度</span></td>
                    <td>4</td>
                    <td>
                      <el-form-item prop="amoOfFr" label-width="0px">
                        <el-input class="inputCls" name="amoOfFr" v-model="this.ehfhItem.amoOfFr" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收票据</span></td>
                    <td>5</td>
                    <td>
                      <el-form-item prop="notRec" label-width="0px">
                        <el-input class="inputCls" name="notRec" v-model="this.ehfhItem.notRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应收账款</span></td>
                    <td>6</td>
                    <td>
                      <el-form-item prop="accRec" label-width="0px">
                        <el-input class="inputCls" name="accRec" v-model="this.ehfhItem.accRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预付账款</span></td>
                    <td>7</td>
                    <td>
                      <el-form-item prop="prepayments" label-width="0px">
                        <el-input class="inputCls" name="prepayments" v-model="this.ehfhItem.prepayments" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应收款</span></td>
                    <td>8</td>
                    <td>
                      <el-form-item prop="othRec" label-width="0px">
                        <el-input class="inputCls" name="othRec" v-model="this.ehfhItem.othRec" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>存货</span></td>
                    <td>9</td>
                    <td>
                      <el-form-item prop="inventories" label-width="0px">
                        <el-input class="inputCls" name="inventories" v-model="this.ehfhItem.inventories" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他流动资产</span></td>
                    <td>10</td>
                    <td>
                      <el-form-item prop="othCurAss" label-width="0px">
                        <el-input class="inputCls" name="othCurAss" v-model="this.ehfhItem.othCurAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动资产合计</b></td>
                    <td>11</td>
                    <td>
                      <el-form-item prop="totCurAss" label-width="0px">
                        <el-input class="inputCls" name="totCurAss" v-model="this.ehfhItem.totCurAss" disabled></el-input>
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
                      <el-form-item prop="lonTerInv" label-width="0px">
                        <el-input class="inputCls" name="lonTerInv" v-model="this.ehfhItem.lonTerInv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产</span></td>
                    <td>14</td>
                    <td>
                      <el-form-item prop="fixAss" label-width="0px">
                        <el-input class="inputCls" name="fixAss" v-model="this.ehfhItem.fixAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>固定资产原价</span></td>
                    <td>15</td>
                    <td>
                      <el-form-item prop="oriCosOfa" label-width="0px">
                        <el-input class="inputCls" name="oriCosOfa" v-model="this.ehfhItem.oriCosOfa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：累计折旧</span></td>
                    <td>16</td>
                    <td>
                      <el-form-item prop="fixAssAd" label-width="0px">
                        <el-input class="inputCls" name="fixAssAd" v-model="this.ehfhItem.fixAssAd" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>在建工程</span></td>
                    <td>17</td>
                    <td>
                      <el-form-item prop="conInPro" label-width="0px">
                        <el-input class="inputCls" name="conInPro" v-model="this.ehfhItem.conInPro" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产</span></td>
                    <td>18</td>
                    <td>
                      <el-form-item prop="intAss" label-width="0px">
                        <el-input class="inputCls" name="intAss" v-model="this.ehfhItem.intAss" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>无形资产原价</span></td>
                    <td>19</td>
                    <td>
                      <el-form-item prop="oriPriOia" label-width="0px">
                        <el-input class="inputCls" name="oriPriOia" v-model="this.ehfhItem.oriPriOia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>减：累计摊销</span></td>
                    <td>20</td>
                    <td>
                      <el-form-item prop="accAmo" label-width="0px">
                        <el-input class="inputCls" name="accAmo" v-model="this.ehfhItem.accAmo" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>待处理资产损溢</span></td>
                    <td>21</td>
                    <td>
                      <el-form-item prop="assToBpptp" label-width="0px">
                        <el-input class="inputCls" name="assToBpptp" v-model="this.ehfhItem.assToBpptp" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>非流动资产合计</b></td>
                    <td>22</td>
                    <td>
                      <el-form-item prop="totNonCa" label-width="0px">
                        <el-input class="inputCls" name="totNonCa" v-model="this.ehfhItem.totNonCa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>资产总计</b></td>
                    <td>23</td>
                    <td>
                      <el-form-item prop="totAss" label-width="0px">
                        <el-input class="inputCls" name="totAss" v-model="this.ehfhItem.totAss" disabled></el-input>
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
                      <el-form-item prop="shoTerBor" label-width="0px">
                        <el-input class="inputCls" name="shoTerBor" v-model="this.ehfhItem.shoTerBor" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴税费</span></td>
                    <td>26</td>
                    <td>
                      <el-form-item prop="taxPay" label-width="0px">
                        <el-input class="inputCls" name="taxPay" v-model="this.ehfhItem.taxPay" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴国库款</span></td>
                    <td>27</td>
                    <td>
                      <el-form-item prop="payFinSa" label-width="0px">
                        <el-input class="inputCls" name="payFinSa" v-model="this.ehfhItem.payFinSa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应缴财政专户款</span></td>
                    <td>28</td>
                    <td>
                      <el-form-item prop="payFinSa" label-width="0px">
                        <el-input class="inputCls" name="payFinSa" v-model="this.ehfhItem.payFinSa" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付职工薪酬</span></td>
                    <td>29</td>
                    <td>
                      <el-form-item prop="empBenPay" label-width="0px">
                        <el-input class="inputCls" name="empBenPay" v-model="this.ehfhItem.empBenPay" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付票据</span></td>
                    <td>30</td>
                    <td>
                      <el-form-item prop="notPay" label-width="0px">
                        <el-input class="inputCls" name="notPay" v-model="this.ehfhItem.notPay" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>应付账款</span></td>
                    <td>31</td>
                    <td>
                      <el-form-item prop="accPay" label-width="0px">
                        <el-input class="inputCls" name="accPay" v-model="this.ehfhItem.accPay" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>预收账款</span></td>
                    <td>32</td>
                    <td>
                      <el-form-item prop="recInAdv" label-width="0px">
                        <el-input class="inputCls" name="recInAdv" v-model="this.ehfhItem.recInAdv" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><span>其他应付款</span></td>
                    <td>33</td>
                    <td>
                      <el-form-item prop="othPay" label-width="0px">
                        <el-input class="inputCls" name="othPay" v-model="this.ehfhItem.othPay" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>其他流动负债</b></td>
                    <td>34</td>
                    <td>
                      <el-form-item prop="othCurLia" label-width="0px">
                        <el-input class="inputCls" name="othCurLia" v-model="this.ehfhItem.othCurLia" disabled></el-input>
                      </el-form-item>
                    </td>
                  </tr>
                  <tr>
                    <td><b>流动负债合计</b></td>
                    <td>35</td>
                    <td><el-form-item prop="totCurLia" label-width="0px"><el-input class="inputCls" name="totCurLia" v-model="this.ehfhItem.totCurLia" disabled></el-input></el-form-item></td>
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
                    <td><b>非流动负债：</b></td>
                    <td>36</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>长期借款</span></td>
                    <td>37</td>
                    <td><el-form-item prop="lonTerBor" label-width="0px"><el-input class="inputCls" name="lonTerBor" v-model="this.ehfhItem.lonTerBor" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>长期应付款</span></td>
                    <td>38</td>
                    <td><el-form-item prop="lonTerPay" label-width="0px"><el-input class="inputCls" name="lonTerPay" v-model="this.ehfhItem.lonTerPay" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>非流动负债合计</b></td>
                    <td>39</td>
                    <td><el-form-item prop="totNonCl" label-width="0px"><el-input class="inputCls" name="totNonCl" v-model="this.ehfhItem.totNonCl" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>负债合计</b></td>
                    <td>40</td>
                    <td><el-form-item prop="totLia" label-width="0px"><el-input class="inputCls" name="totLia" v-model="this.ehfhItem.totLia" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>净资产：</b></td>
                    <td>41</td>
                    <td>——</td>
                  </tr>
                  <tr>
                    <td><span>事业基金</span></td>
                    <td>42</td>
                    <td><el-form-item prop="entFun" label-width="0px"><el-input class="inputCls" name="entFun" v-model="this.ehfhItem.entFun" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>非流动资产基金</span></td>
                    <td>43</td>
                    <td><el-form-item prop="nonCurAf" label-width="0px"><el-input class="inputCls" name="nonCurAf" v-model="this.ehfhItem.nonCurAf" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>专用基金</span></td>
                    <td>44</td>
                    <td><el-form-item prop="spePurFun" label-width="0px"><el-input class="inputCls" name="spePurFun" v-model="this.ehfhItem.spePurFun" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>财政补助结转</span></td>
                    <td>45</td>
                    <td><el-form-item prop="finAidCo" label-width="0px"><el-input class="inputCls" name="finAidCo" v-model="this.ehfhItem.finAidCo" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>财政补助结余</span></td>
                    <td>46</td>
                    <td><el-form-item prop="finAidBal" label-width="0px"><el-input class="inputCls" name="finAidBal" v-model="this.ehfhItem.finAidBal" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>非财政补助结转</span></td>
                    <td>47</td>
                    <td><el-form-item prop="nonFinAco" label-width="0px"><el-input class="inputCls" name="nonFinAco" v-model="this.ehfhItem.nonFinAco" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>非财政补助结余</span></td>
                    <td>48</td>
                    <td><el-form-item prop="nonFinAb" label-width="0px"><el-input class="inputCls" name="nonFinAb" v-model="this.ehfhItem.nonFinAb" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>事业结余</span></td>
                    <td>49</td>
                    <td><el-form-item prop="undBal" label-width="0px"><el-input class="inputCls" name="undBal" v-model="this.ehfhItem.undBal" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><span>经营结余</span></td>
                    <td>50</td>
                    <td><el-form-item prop="opeBal" label-width="0px"><el-input class="inputCls" name="opeBal" v-model="this.ehfhItem.opeBal" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>净资产合计</b></td>
                    <td>51</td>
                    <td><el-form-item prop="totNetAss" label-width="0px"><el-input class="inputCls" name="totNetAss" v-model="this.ehfhItem.totNetAss" disabled></el-input></el-form-item></td>
                  </tr>
                  <tr>
                    <td><b>负债和净资产合计</b></td>
                    <td>52</td>
                    <td><el-form-item prop="totLiaAna" label-width="0px"><el-input class="inputCls" name="totLiaAna" v-model="this.ehfhItem.totLiaAna" disabled></el-input></el-form-item></td>
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
              <td>{{ this.idTypeDic['E_InfRecType'][this.ehfhItem.infRecType] }}</td>
              <td>{{ this.ehfhItem.entName }}</td>
              <td>{{ this.idTypeDic['E_InfoIDType2'][this.ehfhItem.entCertType] }}</td>
              <td>{{ this.ehfhItem.entCertNum }}</td>
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
              <td>{{ this.ehfhItem.sheetYear }}</td>
              <td>{{ this.idTypeDic['E_ReportFormType'][this.ehfhItem.sheetType] }}</td>
              <td>{{ this.idTypeDic['E_ReportFormdel'][this.ehfhItem.sheetTypeDivide] }}</td>
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
      ehfhItem: {}, // 基础段
      showTableSec:true,
      showTableTab:true, // 报表
      showAllDel:false, // 整笔删除
      idTypeDic: {}, // 字典字段
      findById: {
        url: this.$urlList.efh.findDetailById, // 接口
        param: this.paramEdit.data // 参数
      },
      textShow: '事业单位资产负债表信息' // 标题
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
            // eslint-disable-next-line no-loop-func
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
      delete this.paramEdit.data['stopFlag'];
      delete this.paramEdit.data['lockFlag'];
      this.resData = await this.http.apiPost(this.$urlList.efh.findDetailById, this.null2str(this.paramEdit.data), '');
      // 基础段
      this.ehfhItem = this.resData.EHFH;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehfhItem.infRecType == '644') { // 整笔删除
        this.textShow = '事业单位资产负债表整笔删除信息';
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
