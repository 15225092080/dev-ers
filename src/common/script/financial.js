/**
 * 实现财报表单的自动计算
 * */
let calcObj = {
  // 进行表单自动加计算的函数
  calc(self, arr) {
    let total = 0; // 用于计算总和
    // 判断总和是不是存在值
    if (!self.formItem[arr[0]]) { // 注：数组的第一项为要求总和的表单名称 如 arr=['c','a','b']; c = a + b;
      self.formItem[arr[0]] = 0;
    }
    // 循环所有要进行计算的表单
    for (let i = 1; i < arr.length; i++) {
      let initname = arr[i];
      if (self.formItem[initname]) {
        total += Number(self.formItem[initname]);

        self.formItem[arr[0]] = Number(total).toFixed(2);
        //self.formItem.totAss = Number(total).toFixed(2);
        self.formItem.netIncIcace = Number(total).toFixed(2);
        self.formItem.theFinCaceb = Number(total).toFixed(2);
      }
    }
  },

  // 进行表单自动减计算的函数
  minus(self, arr) {
    let total = parseFloat(self.formItem[arr[1]]) || 0; // 用于计算总和
    // 判断总和是不是存在值
    if (!self.formItem[arr[0]]) { // 注：数组的第一项为要求总和的表单名称 如 arr=['c','a','b']; c = a - b;
      self.formItem[arr[0]] = total;
    }

    // 循环所有要进行计算的表单
    for (let i = 2; i < arr.length; i++) {
      let initname = arr[i];
      if (self.formItem[initname] != '') {
        total -= parseFloat(self.formItem[initname]);
      } else {
        total -= 0;
      }
      self.formItem[arr[0]] = Number(total).toFixed(2);
      self.formItem.totAss = Number(total).toFixed(2);
      self.formItem.theFinCaceb = Number(total).toFixed(2);
    }
  },
  // 两个数的运算
  calcTotal(self, arr) {
    var num1 = parseFloat(self.formItem[arr[1]]);
    var num2 = parseFloat(self.formItem[arr[2]]);
    self.formItem[arr[0]] = Number(num1 + num2).toFixed(2);
  },

  // 计算 负债和所有者权益总计的值
  clacTotEquAl(self) {
    let arr = ['totEquAl', 'totLia', 'totEqu'];
    this.calc(self, arr);
  },
  // 计算 负债和所有者权益总计的值
  clacTotEquAl2(self) {
    let arr = ['totEquAl', 'totLia', 'minInt', 'totEqu'];
    this.calc(self, arr);
  },
  // efi   中的运算 “本期财政补助结转结余=财政补助收入-事业支出”
  minusFinSubRev(self) {
    let arr = ['curFinScob', 'finSubRev', 'undExpFse'];
    this.minus(self, arr);
  },
  // efi   中的运算 “本期事业结转结余=事业类收入-事业类支出”
  minusCurUndCob(self) {
    let arr = ['curUndCob', 'undClaRev', 'undClaExp'];
    this.minus(self, arr);
  },
  // efi   中的运算 “本期经营结余=经营收入-经营支出”
  minusCurOpeBal(self) {
    let arr = ['curOpeBal', 'opeRev', 'opeExp'];
    this.minus(self, arr);
  },
  // efh    “负债和净资产总计=负债合计+净资产合计”
  clacTotLiaAna(self) {
    let arr = ['totLiaAna', 'totLia', 'totNetAss'];
    this.calc(self, arr);
  },
  // efh     "负债合计=流动负债+非流动负债"
  clacTotLiaAl(self) {
    let arr = ['totLia', 'totCurLia', 'totNonCl'];
    this.calc(self, arr);
  },
  // efh     “资产总计=流动资产+非流动资产”
  clacTotAss(self) {
    let arr = ['totAss', 'totCurAss', 'totNonCa'];
    this.calc(self, arr);
  },
  // efh    “资产总计=负债和净资产总计”
  // efg  经营活动产生的现金流量净额＝经营活动现金流入小计－经营活动现金流出小计
  //   minusNetCasFfoa(self) {
  //     let arr = ['netCasFfoa', 'totCasIfoa', 'totCasOfoa'];
  //     this.minus(self, arr);
  //   },
  // efg  “投资活动产生的现金流量净额＝投资活动现金流入小计－投资活动现金流出小计”
  minusNetCasFfia(self) {
    let arr = ['netCasFfia', 'totCasIfia', 'totCasOfia'];
    this.minus(self, arr);
  },
  // efg   筹集活动产生的现金流量净额＝筹资活动现金流入小计－筹资活动现金流出小计”
  minusNetCasFffa(self) {
    let arr = ['netCasFffa', 'totCasIffa', 'totCasOffa'];
    this.minus(self, arr);
  },
  // efg  现金及现金等价物净增加额＝筹集活动产生的现金流量净额＋汇率变动对现金的影响＋经营活动产生的现金流量净额＋投资活动产生的现金流量净额
  clacNetIncIcace(self) {
    let arr = ['netIncIcace', 'netCasFffa', 'effOfErcoc', 'netCasFfoa', 'netCasFfia'];
    this.calc(self, arr);
  },
  // eff  经营活动产生的现金流量净额＝经营活动现金流入小计－经营活动现金流出小计
  minusNetCasFfoa(self) {
    let arr = ['netCasFfoa', 'totCasIfoa', 'totCasOfoa'];
    this.minus(self, arr);
  },
  // eff  投资活动产生的现金流量净额＝投资活动现金流入小计－投资活动现金流出小计
  //   minusNetCasFfia(self) {
  //     let arr = ['netCasFfia', 'totCasIfia', 'totCasOfia'];
  //     this.minus(self, arr);
  //   },
  // eff   筹集活动产生的现金流量净额＝筹资活动现金流入小计－筹资活动现金流出小计”
  //   minusNetCasFffa(self) {
  //     let arr = ['netCasFffa', 'totCasIffa', 'totCasOffa'];
  //     this.minus(self, arr);
  //   },
  // eff   现金及现金等价物净增加额=经营活动产生的现金流量净额+投资活动产生的现金流量净额+筹资活动产生的现金流量净额+汇率变动对现金及现金等价物的影响
  clacTotIncAl(self) {
    let arr = ['netIncIcace', 'netCasFfoa', 'netCasFfia', 'netCasFffa', 'effOfErcoc'];
    this.calc(self, arr);
  },
  // eff  计算期末现金及现金等价物余额=现金及现金等价物净增加额+期初现金及现金等价物余额
  clacTotTheAl(self) {
    let arr = ['theFinCaceb', 'iniCasAceb', 'netIncIcace'];
    this.calcTotal(self, arr);
  }
};
export default calcObj;
