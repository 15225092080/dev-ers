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
              <td>{{ this.ehlbItem.batchNum }}</td>
              <td>{{ this.ehlbItem.msgNum }}</td>
              <td>{{ idTypeDic['E_REPORT_STATE'][this.ehlbItem.reportState] }}</td>
              <td>{{ this.ehlbItem.msgDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 按段更正 -->
      <div class="tableData amend" v-if="showAmend">
        <h3 class="title">基础段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待更正业务标识码</th>
              <th>信息报告日期</th>
              <th>账户类型</th>
              <th>待更正段段标</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehlbItem.infRecType] }}</td>
              <td>{{ this.ehlbItem.acctCode }}</td>
              <td>{{ this.ehlbItem.rptDate }}</td>
              <td>{{ idTypeDic['E_AcctType_EL'][this.ehlbItem.acctType] }}</td>
              <td>{{ idTypeDic['E_SgmtCode_EL'][this.ehlbItem.mdfcSgmtCode] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 按段删除 -->
      <div class="tableData paraDel" v-if="showParaDel">
        <h3 class="title">按段删除类请求记录</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待删除业务标识码</th>
              <th>待删除段段标</th>
              <th>待删除起始日期</th>
              <th>待删除结束日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehlbItem.infRecType] }}</td>
              <td>{{ this.ehlbItem.acctCode }}</td>
              <td>{{ idTypeDic['E_SgmtCode_EL'][this.ehlbItem.delSgmtCode] }}</td>
              <td>{{ this.ehlbItem.delStartDate }}</td>
              <td>{{ this.ehlbItem.delEndDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 整笔删除 -->
      <div class="tableData allDel" v-if="showAllDel">
        <h3 class="title">整笔删除类请求记录</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>待删除业务标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehlbItem.infRecType] }}</td>
              <td>{{ this.ehlbItem.acctCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 标识变更 -->
      <div class="tableData change" v-if="showChange">
        <h3 class="title">企业借贷账户标识变更请求</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>原业务标识码</th>
              <th>新业务标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehlbItem.infRecType] }}</td>
              <td>{{ this.ehlbItem.odBnesId }}</td>
              <td>{{ this.ehlbItem.nwBnesId }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="normalInfo" v-if="showNormalInfo">
      <!-- 基础段 -->
      <div class="tableData" v-if="showElb">
        <h3 class="title">基础段信息</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>信息记录类型</th>
              <th>借款人名称</th>
              <th>借款人身份标识类型</th>
              <th>借款人身份标识号码</th>
              <th>信息报告日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_InfRecType'][this.ehlbItem.infRecType] }}</td>
              <td>{{ this.ehlbItem.entName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][this.ehlbItem.entCertType] }}</td>
              <td>{{ this.ehlbItem.entCertNum }}</td>
              <td>{{ this.ehlbItem.rptDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>账户类型</th>
              <th>账户标识码</th>
              <th>报告时点说明代码</th>
              <th>业务管理机构代码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_AcctType_EL'][this.ehlbItem.acctType] }}</td>
              <td>{{ this.ehlbItem.acctCode }}</td>
              <td>{{ idTypeDic['E_RptDateCode_EL'][this.ehlbItem.rptDateCode] }}</td>
              <td>{{ this.ehlbItem.mngmtOrgCode }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 基本信息段 -->
      <div class="tableData" v-if="showElcD1">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>借贷业务大类</th>
              <th>借贷业务种类细分</th>
              <th>开户日期</th>
              <th>币种</th>
              <th>借款金额</th>
              <th>分次放款标志</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_BusiLines_EL'][this.ehlcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>
              <td>{{ this.ehlcItem.openDate }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehlcItem.cy] }}</td>
              <td>{{ this.ehlcItem.loanAmt }}</td>
              <td>{{ idTypeDic['E_SplitFlag'][this.ehlcItem.flag] }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>到期日期</th>
              <th>还款方式</th>
              <th>还款频率</th>
              <th>担保方式</th>
              <th>其他还款保证方式</th>
              <th>借款期限分类</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlcItem.dueDate }}</td>
              <td>{{ idTypeDic['E_RepayMode'][this.ehlcItem.repayMode] }}</td>
              <td>{{ idTypeDic['E_RepayFreqcy'][this.ehlcItem.repayFreqcy] }}</td>
              <td>{{ idTypeDic['E_GuarMode_EG'][this.ehlcItem.guarMode] }}</td>
              <td>{{ idTypeDic['E_OthRepyGuarWay_EL'][this.ehlcItem.othRepyGuarway] }}</td>
              <td>{{ idTypeDic['E_WaysOfBorrowing'][this.ehlcItem.loanTimeLimCat] }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>业务申请地行政区划代码</th>
              <th>资产转让标志</th>
              <th>业务经营类型</th>
              <th>贷款发放形式</th>
              <th>贷款实际投向</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.options }}</td>
              <td>{{ idTypeDic['E_AssetTrandFlag'][this.ehlcItem.assetTrandFlag] }}</td>
              <td>{{ idTypeDic['E_FundSou'][this.ehlcItem.fundSou] }}</td>
              <td>{{ idTypeDic['E_LoanForm'][this.ehlcItem.loaFrm] }}</td>
              <td>{{ this.actInvests }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D2 基本信息段 -->
      <div class="tableData" v-if="showElcD2">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>借贷业务大类</th>
              <th>借贷业务种类细分</th>
              <th>开户日期</th>
              <th>币种</th>
              <th>借款金额</th>
              <th>到期日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_BusiLines_EL'][this.ehlcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>
              <td>{{ this.ehlcItem.openDate }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehlcItem.cy] }}</td>
              <td>{{ this.ehlcItem.loanAmt }}</td>
              <td>{{ this.ehlcItem.dueDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>业务申请地行政区划代码</th>
              <th>担保方式</th>
              <th>其他还款保证方式</th>
              <th>贷款发放形式</th>
              <th>业务经营类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.options }}</td> <!-- 行政区划 -->
              <td>{{ idTypeDic['E_GuarMode_EG'][this.ehlcItem.guarMode] }}</td>
              <td>{{ idTypeDic['E_OthRepyGuarWay_EL'][this.ehlcItem.othRepyGuarway] }}</td>
              <td>{{ idTypeDic['E_LoanForm'][this.ehlcItem.loaFrm] }}</td>
              <td>{{ idTypeDic['E_FundSou'][this.ehlcItem.fundSou] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- R1 基本信息段 -->
      <div class="tableData" v-if="showElcR1">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>借贷业务大类</th>
              <th>借贷业务种类细分</th>
              <th>开户日期</th>
              <th>币种</th>
              <th>信用额度</th>
              <th>到期日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_BusiLines_EL'][this.ehlcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>
              <td>{{ this.ehlcItem.openDate }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehlcItem.cy] }}</td>
              <td>{{ this.ehlcItem.acctCredLine }}</td>
              <td>{{ this.ehlcItem.dueDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>还款方式</th>
              <th>还款频率</th>
              <th>担保方式</th>
              <th>其他还款保证方式</th>
              <th>业务申请地行政区划代码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_RepayMode'][this.ehlcItem.repayMode] }}</td>
              <td>{{ idTypeDic['E_RepayFreqcy'][this.ehlcItem.repayFreqcy] }}</td>
              <td>{{ idTypeDic['E_GuarMode_EG'][this.ehlcItem.guarMode] }}</td>
              <td>{{ idTypeDic['E_OthRepyGuarWay_EL'][this.ehlcItem.othRepyGuarway] }}</td>
              <td>{{ this.options }}</td> <!-- 行政区划 -->
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>资产转让标志</th>
              <th>业务经营类型</th>
              <th>贷款发放形式</th>
              <th>贷款实际投向</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_AssetTrandFlag'][this.ehlcItem.assetTrandFlag] }}</td>
              <td>{{ idTypeDic['E_FundSou'][this.ehlcItem.fundSou] }}</td>
              <td>{{ idTypeDic['E_LoanForm'][this.ehlcItem.loaFrm] }}</td>
              <td>{{ this.actInvests }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- R4基本信息段 -->
      <div class="tableData" v-if="showElcR4">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>借贷业务大类</th>
              <th>借贷业务种类细分</th>
              <th>开户日期</th>
              <th>币种</th>
              <th>借款金额</th>
              <th>到期日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_BusiLines_EL'][this.ehlcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>
              <td>{{ this.ehlcItem.openDate }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehlcItem.cy] }}</td>
              <td>{{ this.ehlcItem.loanAmt }}</td>
              <td>{{ this.ehlcItem.dueDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>还款方式</th>
              <th>还款频率</th>
              <th>担保方式</th>
              <th>其他还款保证方式</th>
              <th>借款期限分类</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_RepayMode'][this.ehlcItem.repayMode] }}</td>
              <td>{{ idTypeDic['E_RepayFreqcy'][this.ehlcItem.repayFreqcy] }}</td>
              <td>{{ idTypeDic['E_GuarMode_EG'][this.ehlcItem.guarMode] }}</td>
              <td>{{ idTypeDic['E_OthRepyGuarWay_EL'][this.ehlcItem.othRepyGuarway] }}</td>
              <td>{{ idTypeDic['E_WaysOfBorrowing'][this.ehlcItem.loanTimeLimCat] }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>业务申请地行政区划代码</th>
              <th>资产转让标志</th>
              <th>业务经营类型</th>
              <th>贷款发放形式</th>
              <th>贷款实际投向</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.options }}</td> <!-- 行政区划 -->
              <td>{{ idTypeDic['E_AssetTrandFlag'][this.ehlcItem.assetTrandFlag] }}</td>
              <td>{{ idTypeDic['E_FundSou'][this.ehlcItem.fundSou] }}</td>
              <td>{{ idTypeDic['E_LoanForm'][this.ehlcItem.loaFrm] }}</td>
              <td>{{ this.actInvests}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- C1 基本信息段 -->
      <div class="tableData" v-if="showElcC1">
        <h3 class="title">基本信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>借贷业务大类</th>
              <th>借贷业务种类细分</th>
              <th>开户日期</th>
              <th>币种</th>
              <th>借款金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_BusiLines_EL'][this.ehlcItem.busiLines] }}</td>
              <td>{{ this.str }}</td>
              <td>{{ this.ehlcItem.openDate }}</td>
              <td>{{ idTypeDic['E_Cy'][this.ehlcItem.cy] }}</td>
              <td>{{ this.ehlcItem.loanAmt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 D2 R1 R4 C1 相关还款责任人段 -->
      <div class="tableData" v-if="showEld">
        <h3 class="title">相关还款责任人段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>责任人个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehldItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>身份类别</th>
              <th>责任人名称</th>
              <th>责任人身份标识类型</th>
              <th>责任人身份标识号码</th>
              <th>还款责任人类型</th>
              <th>还款责任金额</th>
              <th>联保标志</th>
              <th>保证合同编号</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehldItem" :key="item.index">
              <td>{{ idTypeDic['E_InfoIDType'][item.arlpIdType] }}</td>
              <td>{{ item.arlpName }}</td>
              <td>{{ idTypeDic['E_InfoIDType2'][item.arlpCertType] || idTypeDic['E_InfoIDType1'][item.arlpCertType] }}</td>
              <td>{{ item.arlpCertNum }}</td>
              <td>{{ idTypeDic['E_ArlpType_PL'][item.arlpType] }}</td>
              <td>{{ item.arlpAmt }}</td>
              <td>{{ idTypeDic['E_WartySign_PL'][item.wartySign] }}</td>
              <td>{{ item.maxGuarMcc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 R1 R4 抵质押物信息段 -->
      <div class="tableData" v-if="showEle">
        <h3 class="title">抵质押物信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>抵质押合同个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehleItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>抵（质）押合同标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehleItem" :key="item.index">
              <td>{{ item.ccc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 R1 R4 授信额度信息段 -->
      <div class="tableData" v-if="showElf">
        <h3 class="title">授信额度信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>授信协议标识码</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlfItem.mcc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- C1 初始债权说明段 -->
      <div class="tableData" v-if="showElgC1">
        <h3 class="title">初始债权说明段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>初始债权人名称</th>
              <th>初始债权人机构代码</th>
              <th>原债务种类</th>
              <th>债权转移时的还款状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlgItem.initCredName }}</td>
              <td>{{ this.ehlgItem.initCedOrgCode }}</td>
              <td>{{ idTypeDic['E_OrigDbtCate'][this.ehlgItem.origDbtCate] }}</td>
              <td>{{ idTypeDic['E_InitRpySts'][this.ehlgItem.initRpySts] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 D2 R4 还款表现信息段 -->
      <div class="tableData" v-if="showElh">
        <h3 class="title">还款表现信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>账户状态</th>
              <th>余额</th>
              <th>余额变化日期</th>
              <th>五级分类</th>
              <th>五级分类认定日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_AcctStatus'][this.ehlhItem.acctStatus] }}</td>
              <td>{{ this.ehlhItem.acctBal }}</td>
              <td>{{ this.ehlhItem.balChgDate }}</td>
              <td>{{ idTypeDic['E_FiveCate'][this.ehlhItem.fiveCate] }}</td>
              <td>{{ this.ehlhItem.fiveCateAdjDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>当前逾期总额</th>
              <th>当前逾期本金</th>
              <th>当前逾期天数</th>
              <th>还款形式</th>
              <th>账户关闭日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlhItem.totOverd }}</td>
              <td>{{ this.ehlhItem.overdPrinc }}</td>
              <td>{{ this.ehlhItem.overdDy }}</td>
              <td>{{ idTypeDic['E_FormOfRepayment'][this.ehlhItem.rpmtType] }}</td>
              <td>{{ this.ehlhItem.closeDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>最近一次实际还款日期</th>
              <th>最近一次实际还款金额</th>
              <th>最近一次实际归还本金</th>
              <th>最近一次约定还款日</th>
              <th>最近一次约定还款金额</th>
		          <th>下一次约定还款日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlhItem.latRpyDate }}</td>
              <td>{{ this.ehlhItem.latRpyAmt }}</td>
              <td>{{ this.ehlhItem.latRpyPrincAmt }}</td>
              <td>{{ this.ehlhItem.latAgrrRpyDate }}</td>
              <td>{{ this.ehlhItem.latAgrrRpyAmt }}</td>
              <td>{{ this.ehlhItem.nxtAgrrRpyDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- R1 还款表现信息段 -->
      <div class="tableData" v-if="showElhR1">
        <h3 class="title">还款表现信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>账户状态</th>
              <th>余额</th>
              <th>余额变化日期</th>
              <th>五级分类</th>
              <th>五级分类认定日期</th>
              <th>剩余还款月数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_AcctStatus'][this.ehlhItem.acctStatus] }}</td>
              <td>{{ this.ehlhItem.acctBal }}</td>
              <td>{{ this.ehlhItem.balChgDate }}</td>
              <td>{{ idTypeDic['E_FiveCate'][this.ehlhItem.fiveCate] }}</td>
              <td>{{ this.ehlhItem.fiveCateAdjDate }}</td>
              <td>{{ this.ehlhItem.pymtPrd }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>当前逾期总额</th>
				      <th>当前逾期本金</th>
		          <th>当前逾期天数</th>
		          <th>还款形式</th>
		          <th>账户关闭日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlhItem.totOverd }}</td>
              <td>{{ this.ehlhItem.overdPrinc }}</td>
              <td>{{ this.ehlhItem.overdDy }}</td>
              <td>{{ idTypeDic['E_FormOfRepayment'][this.ehlhItem.rpmtType] }}</td>
              <td>{{ this.ehlhItem.closeDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>最近一次实际还款日期</th>
		          <th>最近一次实际还款金额</th>
				      <th>最近一次实际归还本金</th>
		          <th>最近一次约定还款日</th>
		          <th>最近一次约定还款金额</th>
		          <th>下一次约定还款日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlhItem.latRpyDate }}</td>
              <td>{{ this.ehlhItem.latRpyAmt }}</td>
              <td>{{ this.ehlhItem.latRpyPrincAmt }}</td>
              <td>{{ this.ehlhItem.latAgrrRpyDate }}</td>
              <td>{{ this.ehlhItem.latAgrrRpyAmt }}</td>
              <td>{{ this.ehlhItem.nxtAgrrRpyDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- C1 还款表现信息段 -->
      <div class="tableData" v-if="showElhC1">
        <h3 class="title">还款表现信息段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>账户状态</th>
              <th>余额</th>
              <th>余额变化日期</th>
              <th>五级分类</th>
              <th>五级分类认定日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ idTypeDic['E_AcctStatus'][this.ehlhItem.acctStatus] }}</td>
              <td>{{ this.ehlhItem.acctBal }}</td>
              <td>{{ this.ehlhItem.balChgDate }}</td>
              <td>{{ idTypeDic['E_FiveCate'][this.ehlhItem.fiveCate] }}</td>
              <td>{{ this.ehlhItem.fiveCateAdjDate }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>最近一次实际还款日期</th>
		          <th>最近一次实际还款金额</th>
				      <th>最近一次实际归还本金</th>
		          <th>还款形式</th>
		          <th>账户关闭日期</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehlhItem.latRpyDate }}</td>
              <td>{{ this.ehlhItem.latRpyAmt }}</td>
              <td>{{ this.ehlhItem.latRpyPrincAmt }}</td>
              <td>{{ idTypeDic['E_FormOfRepayment'][this.ehlhItem.rpmtType] }}</td>
              <td>{{ this.ehlhItem.closeDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- D1 R1 R4 C1 特殊交易说明段 -->
      <div class="tableData" v-if="showEli">
        <h3 class="title">特定交易说明段</h3>
        <table class="table0">
          <thead>
            <tr>
              <th>交易个数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ this.ehliItem.length }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table0 noBorder">
          <thead>
            <tr>
              <th>交易类型</th>
              <th>交易日期</th>
              <th>交易金额</th>
              <th>到期日期变更月数</th>
              <th>交易明细信息</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.ehliItem" :key="item.index">
              <td>{{ idTypeDic['E_ChanTranType'][item.chanTranType] }}</td>
              <td>{{ item.tranDate }}</td>
              <td>{{ item.tranAmt }}</td>
              <td>{{ item.dueTranMon }}</td>
              <td>{{ item.detInfo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
      str: '', // 借款种类细分字典
      options: '', // 行政区划
      arr: [], // 行政区划字典数组
      // 提交的url
      url: '',
      resData: '',
      actInvests: '', // 贷款实际投向
      acctType: '', // 账户类型
      busiDtlLines: '', // 借贷种类细分
      ehlbItem: {}, // 基础段
      ehlcItem: {}, // 基本信息段
      ehldItem: {}, // 相关还款责任人段
      ehleItem: {}, // 抵押物信息段
      ehlfItem: {}, // 授信额度信息段
      ehlgItem: {}, // 初始债权说明段
      ehlhItem: {}, // 还款表现段
      ehliItem: {}, // 特殊交易段
      showNormalInfo: true, // 正常
      showAllDel: false, // 整笔删除
      showAmend: false, // 按段更正
      showChange: false, // 标识变更
      showParaDel: false, // 按段删除
      showEli: true,
      showElhC1: false,
      showElhR1: false,
      showElh: false,
      showElgC1: true,
      showElf: true,
      showEle: true,
      showEld: true,
      showElcC1: false,
      showElcR4: false,
      showElcR1: false,
      showElcD2: false,
      showElcD1: false,
      showElb: true,
      textShow: '企业借贷账户信息', // 标题
      // 表单赋值接口（编辑，详情用的较多）
      // findById: {
      //   url: this.$urlList.elb.findDetailById, // 接口
      //   param: this.paramEdit.data // 参数
      // },
      idTypeDic: {} // 字典字段
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
      let type = ['E_InfoIDType2', 'E_InfoIDType1', 'E_REPORT_STATE', 'E_InfRecType', 'E_AcctType_EL', 'E_Cy', 'E_OrigDbtCate', 'E_InitRpySts', 'E_InfoIDType', 'E_BusiLines_EL',
      'E_SplitFlag', 'E_RepayFreqcy', 'E_GuarMode_EG', 'E_OthRepyGuarWay_EL', 'E_AssetTrandFlag', 'E_FundSou', 'E_LoanForm', 'E_WaysOfBorrowing', 'E_RepayMode', 'E_ArlpType_PL',
      'E_WartySign_PL', 'E_AcctStatus', 'E_RptDateCode_EL', 'E_SgmtCode_EL', 'E_FiveCate', 'E_FormOfRepayment', 'E_ChanTranType'];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
        this.arr = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_getArea'));
      });
    },
    // 获取数据表格数据方法
    async getDataTable() {
       delete this.paramEdit.data.stopFlag;
       delete this.paramEdit.data.lockFlag;
       let postData = this.paramEdit.data;

      this.resData = await this.http.apiPost(this.$urlList.elb.findDetailById, this.null2str(postData), '');
      // 基础段-基本信息段
      this.ehlbItem = this.resData.ehlb;
      this.acctType = this.ehlbItem.acctType;
      // 根据后台返回的信息记录类型判断为哪个场景
      if (this.ehlbItem.infRecType == '414') { // 整笔删除
        this.textShow = '企业借贷整笔删除信息';
        this.showAllDel = true;
        this.showNormalInfo = false;
        this.showParaDel = false;
        this.showAmend = false;
        this.showChange = false;
      } else if (this.ehlbItem.infRecType == '411') { // 标识变更
        this.textShow = '企业借贷账户标识变更信息';
        this.showChange = true;
        this.showParaDel = false;
        this.showNormalInfo = false;
        this.showAllDel = false;
        this.showAmend = false;
      } else if (this.ehlbItem.infRecType == '412') { // 按段更正
        this.textShow = '企业借贷按段更正信息';
        this.showAmend = true;
        this.showParaDel = false;
       // this.showNormalInfo = false;
        this.showAllDel = false;
        this.showChange = false;
        // 根据待更正段段标不同的值显示不同的信息段
        if (this.ehlbItem.mdfcSgmtCode == 'C') { // 基本信息段显示
          this.showNormalInfo = true;
          this.showElb = false;
          if (this.acctType == 'D1') {
            this.showElcD1 = true;
          } else if (this.acctType == 'R1') {
            this.showElcR1 = true;
          } else if (this.acctType == 'D2') {
            this.showElcD2 = true;
          } else if (this.acctType == 'R4') {
            this.showElcR4 = true;
          } else if (this.acctType == 'C1') {
            this.showElcC1 = true;
          }
        } else if (this.ehlbItem.mdfcSgmtCode == 'H') {	// 还款表现信息段显示
            this.showNormalInfo = true;
            this.showElb = false;
            if (this.acctType == 'R1') {
              this.showElhR1 = true;
            } else if (this.acctType == 'C1') {
              this.showElhC1 = true;
            } else {
              this.showElh = true;
            }
        } else if (this.ehlbItem.mdfcSgmtCode == 'G') {	// 初始债权说明段显示
          this.showNormalInfo = true;
          this.showElb = false;
          if (this.acctType == 'C1') {
            this.showElgC1 = true;
          }
        } else if (this.ehlbItem.mdfcSgmtCode == 'I') {	// 特殊交易信息段显示
          this.showNormalInfo = true;
          this.showElb = false;
          this.showEli = true;
        }
      } else if (this.ehlbItem.infRecType == '413') { // 按段删除
        this.textShow = '企业借贷按段删除信息';
        this.showParaDel = true;
        this.showNormalInfo = false;
        this.showAllDel = false;
        this.showAmend = false;
        this.showChange = false;
      }
      // 基本信息段
      this.ehlcItem = this.resData.ehlc;
      if (this.ehlcItem == null || this.ehlcItem == '' || this.ehlcItem == undefined) { // 如果没有返回值则隐藏该段

      } else {
        // 获取贷款实际投向的名称
        this.http.apiGet(this.$urlList.common.getEmpdCodeName, { params: { 'code': this.ehlcItem.actInvest } }, { showLoading: true }).then(res => {
            this.actInvests = res;
        });
        // 获取借贷业务种类细分
        let sys = sessionStorage.getItem('systemId');
        this.common.getdic(this.$urlList.common.dic, 'E_BusiDtlLines_EL_' + this.ehlcItem.busiLines, () => {
          this.str = JSON.parse(sessionStorage[sys + '_E_BusiDtlLines_EL_' + this.ehlcItem.busiLines])[this.ehlcItem.busiDtlLines];
        });
        // 获取行政区划 字典转换
        if (this.ehlcItem.applyBusiDist != null) {
          this.options = this.common.changeAreaCode(this.ehlcItem.applyBusiDist, this.arr);
        } else {
          this.options = '';
        }


        if (this.acctType == 'D1') {
          this.showElcD1 = true;
        } else if (this.acctType == 'R1') {
          this.showElcR1 = true;
        } else if (this.acctType == 'D2') {
          this.showElcD2 = true;
        } else if (this.acctType == 'R4') {
          this.showElcR4 = true;
        } else if (this.acctType == 'C1') {
          this.showElcC1 = true;
        }
      }

      // 相关还款责任人段
      this.ehldItem = this.resData.ehld;
      if (this.ehldItem == null || this.ehldItem == '' || this.ehldItem == undefined) { // 如果没有返回值则隐藏该段
        this.showEld = false;
      } else {
        this.showEld = true;
      }
      // 抵押物信息段
      this.ehleItem = this.resData.ehle;
      if (this.ehleItem == null || this.ehleItem == '' || this.ehleItem == undefined) { // 如果没有返回值则隐藏该段
        this.showEle = false;
      } else {
        this.showEle = true;
      }
      // 授信额度信息段
      this.ehlfItem = this.resData.ehlf;
      if (this.ehlfItem == null || this.ehlfItem == '' || this.ehlfItem == undefined) { // 如果没有返回值则隐藏该段
        this.showElf = false;
      } else {
        this.showElf = true;
      }
      // 初始债权说明段
      this.ehlgItem = this.resData.ehlg;
      if (this.ehlgItem == null || this.ehlgItem == '' || this.ehlgItem == undefined) { // 如果没有返回值则隐藏该段
        this.showElgC1 = false;
      } else {
        if (this.acctType == 'C1') {
          this.showElgC1 = true;
        }
      }
      // 还款表现信息段
      this.ehlhItem = this.resData.ehlh;
      if (this.ehlhItem == null || this.ehlhItem == '' || this.ehlhItem == undefined) { // 如果没有返回值则隐藏该段

      } else {
        if (this.acctType == 'R1') {
          this.showElhR1 = true;
        } else if (this.acctType == 'C1') {
          this.showElhC1 = true;
        } else {
          this.showElh = true;
        }
      }
      // 特殊交易段
      this.ehliItem = this.resData.ehli;
      if (this.ehliItem == null || this.ehliItem == '' || this.ehliItem == undefined) { // 如果没有返回值则隐藏该段
        this.showEli = false;
      } else {
        this.showEli = true;
      }
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
    }
</style>
