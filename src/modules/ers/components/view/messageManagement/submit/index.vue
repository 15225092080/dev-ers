<template>
  <div>
    <div class="classTab">
      <h3 class="tabTitle">企业报文生成</h3>
      <ul class="icongroup">
        <li>
          <div class="divInput">
            <input v-model="value"
                   type="text"
                   @click="openValue"
                   placeholder="全类型">
            <i class="el-icon-caret-bottom xiala"></i>
            <!-- </div> -->
            <div class="list"
                 v-show="show">
              <ul>
                <li @click="getvalue(index,item)"
                    v-for="(item,index) in list"
                    :key="item.index">{{ item.name }}</li>
              </ul>
            </div>
          </div>
        </li>
        <li>
          <el-button type="primary"
                     plain
                     @click="rptBtn"
                     v-text="rptBtnMsg"
                     :disabled="rptIsDisabled">
            <i class="DHCiconfont">&#xe6c3;</i>
          </el-button>
        </li>
        <li>
          <el-button type="primary"
                     plain
                     @click="preBtn"
                     v-text="preBtnMsg"
                     :disabled="preIsDisabled">
            <i class="DHCiconfont">&#xe6c3;</i>
          </el-button>
        </li>
        <li>
          <el-button type="primary"
                     plain
                     @click="correctBtn"
                     v-text="correctBtnMsg"
                     :disabled="correctIsDisabled">
            <i class="DHCiconfont">&#xe6c3;</i>
          </el-button>
        </li>
      </ul>
      <el-table :data="tableData"
                border
                class="tableClass">
        <el-table-column prop="typeName"
                         label="报文类型"
                         width="280"></el-table-column>
        <el-table-column prop="handledNum"
                         label="已处理数"></el-table-column>
        <el-table-column prop="sucessNum"
                         label="成功数"></el-table-column>
        <el-table-column prop="errNum"
                         label="错误数"></el-table-column>
        <el-table-column prop="percent"
                         label="成功百分比"></el-table-column>
        <el-table-column prop="msgStat"
                         align="center"
                         label="处理状态">
          <template slot-scope="scope">
            <td class="stat stat1"
                v-if="scope.row.msgStat == 20">报文生成中</td>
            <td class="stat stat8"
                v-else-if="scope.row.msgStat == 21">报文生成成功</td>
            <td class="stat stat5"
                v-else-if="scope.row.msgStat == 23">报文为空</td>
            <td class="stat stat9"
                v-else-if="scope.row.msgStat == 1">数据准备中</td>
            <td class="stat stat4"
                v-else-if="scope.row.msgStat == 2">无此类报文数据</td>
            <td class="stat stat3"
                v-else-if="scope.row.msgStat == 30">回滚中</td>
            <td class="stat stat8"
                v-else-if="scope.row.msgStat == 31">回滚成功</td>
            <td class="stat stat2"
                v-else-if="scope.row.msgStat == 32">回滚失败</td>
            <td class="stat stat6"
                v-else-if="scope.row.msgStat == 10">预检验处理中</td>
            <td class="stat stat8"
                v-else-if="scope.row.msgStat == 11">预校验成功</td>
            <td class="stat stat2"
                v-else-if="scope.row.msgStat == 12">预校验失败</td>
            <td class="stat stat9"
                v-else-if="scope.row.msgStat == 5">数据准备中</td>
            <td class="stat stat4"
                v-else-if="scope.row.msgStat == 6">无此类报文数据</td>
            <td class="stat"
                v-else-if="!scope.row.msgStat"></td>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>
<script>
// import vCollapse from '@/modules/ers/components/common/collapse.vue'
export default {
  name: 'child',
  components: {
    // vCollapse
  },
  data() {
    return {
      list: [
        {
          name: '全类型',
        },
        {
          name: '评级信息',
        },
        {
          name: '信贷信息',
        },
      ],
      show: false,
      value: '全类型',
      // 表格数据
      tableData: [],
      // 企业报文启动按钮内容
      rptBtnMsg: '报文启动',
      // 预校验按钮内容
      preBtnMsg: '预校验',
      // 按段更正按钮内容
      correctBtnMsg: '按段更正',
      // 按钮是否禁用标识
      rptIsDisabled: false,
      preIsDisabled: false,
      correctIsDisabled: false,
      // 请求生成报文url
      url1: this.$urlList.submit.normal,
      // 请求数据url
      url3: this.$urlList.submit.getdetailmsg,
      // 请求按段更正url
      url4: this.$urlList.submit.newSubmit,
    };
  },
  computed: {},
  watch: {},
  methods: {
    openValue() {
      this.show = !this.show;
    },
    getvalue(index, item) {
      this.value = item.name;
      this.show = false;
    },
    init() {
      if (this.rptIsDisabled == false) {
        this.getData();
      } else {
        this.preIsDisabled = true;
      }
    },
    // 首次加载页面获取表格数据
    getData() {
      this.http.apiPost(this.url3, this.$route.query).then((res) => {
        this.tableData = res.messageArr;
        //当报文生成中再次刷新页面后页面展示--两个按钮均为处理中不可点击状态
        if (res.StopFlag == false) {
          this.preBtnMsg = '处理中..';
          this.rptBtnMsg = '处理中..';
          this.correctBtnMsg = '处理中..';
          this.rptIsDisabled = true;
          this.preIsDisabled = true;
          this.correctIsDisabled = true;
          this.msgAjax(this.url3, { dataFrom: '0' });
        }
      });
    },
    // 点击预校验按钮
    preBtn() {
      let typeValue;
      if (this.value == '全类型') {
        typeValue = '0';
      } else if (this.value == '评级信息') {
        typeValue = '1';
      } else if (this.value == '信贷信息') {
        typeValue = '2';
      }
      // 该按钮内容改为“处理中”，按钮禁用
      this.preBtnMsg = '处理中..';
      this.rptIsDisabled = true;
      this.preIsDisabled = true;
      this.correctIsDisabled = true;
      // 定时发送请求
      // setTimeout(() => {
      //   this.msgAjax(this.url3, {dataFrom: '0'});
      // }, 5000);
      this.msgCreate(this.url1, { isPrecheck: true, bussType: typeValue });
    },
    // 点击报文启动按钮
    rptBtn() {
      let typeValue;
      if (this.value == '全类型') {
        typeValue = '0';
      } else if (this.value == '评级信息') {
        typeValue = '1';
      } else if (this.value == '信贷信息') {
        typeValue = '2';
      }
      // 该按钮内容改为“处理中”，按钮禁用
      this.rptBtnMsg = '处理中..';
      this.rptIsDisabled = true;
      this.preIsDisabled = true;
      this.correctIsDisabled = true;
      // 定时发送请求
      // let _this = this;
      // setTimeout(() => {
      //   this.msgAjax(this.url3, {dataFrom: '1'});
      // }, 5000);
      this.msgCreate(this.url1, { isPrecheck: false, bussType: typeValue });
    },
    // 点击按段更正按钮
    correctBtn() {
      // 该按钮内容改为“处理中”，按钮禁用
      this.correctBtnMsg = '处理中..';
      this.rptIsDisabled = true;
      this.preIsDisabled = true;
      this.correctIsDisabled = true;
      // 定时发送请求
      // let _this = this;
      // setTimeout(() => {
      //   this.msgAjax(this.url3, {dataFrom: '1'});
      // }, 5000);
      this.msgCreate(this.url4, { isPrecheck: false });
    },
    // 发送生成报文请求
    msgCreate(url, data) {
      this.http.apiPost(url, data).then((res) => {
        if (res.code == '00000000') {
          //因后台接口改变修改请求接口的顺序
          this.msgAjax(this.url3, { dataFrom: 'normal' });
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'warning',
            duration: '5000',
          });
          // 将按钮内容还原
          this.rptBtnMsg = '企业报文启动';
          this.preBtnMsg = '预校验';
          this.correctBtnMsg = '按段更正';
          this.rptIsDisabled = false;
          this.preIsDisabled = false;
          this.correctIsDisabled = false;
        }
      });
    },
    // 发送请求返回报文数据
    msgAjax(url, data) {
      this.http.apiPost(url, data).then((res) => {
        // 表格清空
        this.tableData = '';
        // 拼接表格
        this.tableData = res.messageArr;
        if (res.StopFlag != true) {
          // 定时请求接口 setTimeout
          this.msgTimer(url, data);
          // 该按钮内容改为“处理中”，按钮禁用
          this.preBtnMsg = '处理中..';
          this.rptBtnMsg = '处理中..';
          this.correctBtnMsg = '处理中..';
          this.rptIsDisabled = true;
          this.preIsDisabled = true;
          this.correctIsDisabled = true;
        } else {
          // 将按钮内容还原
          this.rptBtnMsg = '企业报文启动';
          this.preBtnMsg = '预校验';
          this.correctBtnMsg = '按段更正';
          this.rptIsDisabled = false;
          this.preIsDisabled = false;
          this.correctIsDisabled = false;
        }
      });
    },
    // 5秒定时请求接口刷新数据
    msgTimer(url, data) {
      let _this = this;
      setTimeout(function () {
        _this.msgAjax(url, data);
      }, 5000);
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped="scoped">
.divInput {
  position: relative;
}
.xiala {
  position: absolute;
  top: 5px;
  right: 10px;
  color: #3075c7;
}
ul li {
  list-style: none;
}
.divInput input {
  width: 130px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #cccccc;
  position: relative;
  color: #3075c7;
  background: #eaf1f9;
  border-color: #acc8e9;
  outline: 0;
}
.divInput input::-webkit-input-placeholder {
  color: #3075c7;
}
.list {
  position: absolute;
  width: 130px;
  border: 1px solid #cccccc;
  overflow: hidden;
  z-index: 9999;
}
.list ul {
  background-color: white;
}
.list ul li {
  width: 100%;
  height: 30px;
  cursor: pointer;
  line-height: 30px;
  padding: 0px;
}
.list ul li:hover {
  background-color: #cccccc;
}
.tabTitle {
  font-weight: normal;
  line-height: 40px;
  background-color: #efe;
}
.classTab {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 30px;
  overflow: hidden;
}
.stat {
  text-align: center;
  height: 30px;
  line-height: 20px;
  color: #efefef;
  width: 100%;
  display: inline-block;
}
.stat1 {
  background-color: #903daf;
}
.stat2 {
  background-color: #ea4b35;
}
.stat3 {
  background-color: #3f5994;
}
.stat4 {
  background-color: #e77d03;
}
.stat5 {
  background-color: #01bf9d;
}
.stat6 {
  background-color: #3f5994;
}
.stat7 {
  background-color: #e43983;
}
.stat8 {
  background-color: #22c026;
}
.stat9 {
  background-color: #e43983;
}
.stat10 {
  background-color: #d697ed;
}
</style>
