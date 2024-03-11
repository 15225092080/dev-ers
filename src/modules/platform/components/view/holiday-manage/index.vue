<template>
  <div style="width: 60%;margin: 0 auto 50px;">
    <!-- 页头操作区 -->
    <el-row class="row">
      <!-- 业务线选择 -->
      <el-col :span="8">
        <el-form ref="form" label-width="80px">
          <el-form-item label="业务线">
            <el-select v-model="businessLine"
                       placeholder="请选择业务线"
                       @change="monthChange">
              <el-option v-for="(item,index) in businessLines"
                         :key="index"
                         :label="item.name"
                         :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                      @click.stop="handleDelBusiness(item.name)">删除</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 按钮 -->
      <el-col :span="16"
              style="text-align: right">
        <el-link type="primary"
                 @click="downloadTemplate">下载模板文件</el-link>
        <el-button class="submit_btn"
                   @click="addBusiness">
          <i class="DHCiconfont">&#xe6c3;</i>
          添加业务线
        </el-button>
        <vUpload :name="this.businessLine"
                 @callback="importCallback()"
                 style="display: inline-block"></vUpload>
      </el-col>
    </el-row>
    <!-- 日历 -->
    <el-calendar v-model="value"
                 :first-day-of-week="7">
      <template slot="dateCell"
                slot-scope="{date, data}">
        <vNode :key="data.day"
               :data="data"
               :monthConfig="monthConfigArr"
               :addWorkday="pushWorkday"
               :addHoliday="pushHoliday"
               :delWorkday="removeWorkday"
               :delHoliday="removeHoliday"
               :yearMonth="yearMonth"></vNode>
      </template>
    </el-calendar>
    <!-- 页尾 -->
    <el-row class="row edited">
      <el-tag effect="dark">
        修改为节假日
      </el-tag>
      <el-tag :key="idx" v-for="(item,idx) in holiday">
        {{item}}
      </el-tag>
    </el-row>
    <el-row class="row edited">
      <el-tag effect="dark">
        修改为工作日
      </el-tag>
      <el-tag :key="idx" v-for="(item,idx) in workday">
        {{item}}
      </el-tag>
    </el-row>
    <el-row class="row"
            style="text-align: center">
      <el-button class="submit_btn" style="float: right;" @click="submit">
        <i class="DHCiconfont">&#xe6b3;</i>
        提 交
      </el-button>
    </el-row>
    <v-create ref="addBusiness"
              @addCallback="init"></v-create>
  </div>
</template>

<script>
import vNode from './model/node';
import { getYearMonth } from './model/util';
import vCreate from './model/create';
import vUpload from './model/upload';

export default {
  name: 'holiday-manager',
  components: { vNode, vCreate, vUpload },
  data() {
    let date = new Date();
    return {
      // 业务线
      businessLine: '',
      // 全部业务线列表
      businessLines: [],
      // 日历当前时间
      value: date,
      // 原节假日切换到工作日
      workday: [],
      // 原工作日切换到节假日
      holiday: [],
      // 服务端获取已配置的月份数组
      monthConfigArr: [],
      // 当前页面年月
      yearMonth: getYearMonth(date),
      // 下载模板文件地址
      downloadUrl: this.$urlList.holiday.downloadTemplate,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    //月份切换事件
    this.$nextTick(() => {
      let prevBtn = document.querySelectorAll('.el-calendar__button-group .el-button-group .el-button');
      prevBtn.forEach((item) => {
        item.addEventListener('click', () => {
          this.monthChange();
        });
      });
    });
  },
  methods: {
    //初始化
    init() {
      //获取业务线列表,默认选中第一个
      this.http.apiGet(this.$urlList.holiday.getNames).then((res) => {
        this.businessLines = res.data;
        this.businessLine = this.businessLines[0].name;
        // 获取当前月份配置
        this.getMonthConfig();
      });
    },
    // 月份切换事件
    monthChange() {
      // 清除当前已更改的配置
      this.workday = [];
      this.holiday = [];
      this.yearMonth = getYearMonth(this.value);
      this.getMonthConfig();
    },
    //获取当前月份配置
    getMonthConfig() {
      // 获取当前月份配置
      let paramData = { params: { name: this.businessLine, date: this.yearMonth } };
      this.http.apiGet(this.$urlList.holiday.monthConfig, paramData).then((res) => {
        this.monthConfigArr = res.data;
      });
    },
    // 添加到工作日
    pushWorkday(day) {
      this.workday.push(day);
    },
    // 删除工作日
    removeWorkday(day) {
      let index = this.workday.indexOf(day);
      if (index > -1) {
        this.workday.splice(index, 1);
      }
    },
    // 添加到节假日
    pushHoliday(day) {
      this.holiday.push(day);
    },
    // 删除节假日
    removeHoliday(day) {
      let index = this.holiday.indexOf(day);
      if (index > -1) {
        this.holiday.splice(index, 1);
      }
    },
    // 添加业务线
    addBusiness() {
      this.$refs.addBusiness.show();
    },
    // 删除业务线
    handleDelBusiness(val) {
      let that = this;
      this.common.MessageBoxconfirm('确定删除业务线:' + val + '？', '', '确定', '取消', 'warning', true, function (action) {
        if (action === 'confirm') {
          let paramData = { params: { name: val } };
          that.http.apiGet(that.$urlList.holiday.deleteName, paramData).then((res) => {
            if (res.code === 0) {
              window.reload();
            }
          });
        }
      });
    },
    downloadTemplate() {
      this.common.downLoad(this.downloadUrl, {});
    },
    // 导入成功回调
    importCallback() {
      this.monthChange();
      this.common.message(true, '导入成功', 'success', '1000', function () {
        return false;
      });
    },
    // 提交配置
    submit() {
      // 组装配置请求参数
      let paramData = {
        name: this.businessLine,
        data: [],
      };
      // 遍历当前配置 0：工作日 1节假日
      for (let i = 0; i < this.workday.length; i++) {
        paramData.data.push({ ymd: this.workday[i], isWorkDay: '0' });
      }
      for (let i = 0; i < this.holiday.length; i++) {
        paramData.data.push({ ymd: this.holiday[i], isWorkDay: '1' });
      }
      if (paramData.data.length < 1) {
        this.common.message(true, '请选择要更改的日期', 'warning', '2000', function () {
          return false;
        });
        return;
      }
      this.http.apiPost(this.$urlList.holiday.update, paramData, { dataType: 'json' }).then((res) => {
        if (res.code === 0) {
          this.monthChange();
          this.common.message(true, '修改成功', 'success', '800', function () {
            return false;
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.row {
  padding: 10px 0;
}
/*表头*/
/deep/ .el-calendar-table thead th {
  padding: 6px 0;
  background-color: #f2f2f2;
  color: #666;
}
/*日历单元格样式*/
/deep/ .el-calendar-table .el-calendar-day {
  padding: 0;
  height: 60px;
}
/*按钮组*/
/deep/ .el-calendar__header .el-calendar__button-group .el-button {
  color: #606266;
}
/*标签*/
.edited .el-tag {
  margin: 0 2px;
}
// 阻止不是当月的点击事件
/deep/ .el-calendar-table:not(.is-range) td.prev,
/deep/ .el-calendar-table:not(.is-range) td.next {
  pointer-events: none;
}
</style>
