<template>
  <el-card shadow="hover"
           class="layui-card"
           style="height: 395px;">
    <div class="echarts-title">
      <img src="static/img/icon_02.png">用户查询情况
    </div>
    <div class="echarts-cont">
      <div id="myChart"
           :style="{width: '100%', height: '300px'}"></div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'echarts',
  components: {},
  props: ['value'],
  computed: {
    value1() {
      return this.value;
    },
  },
  watch: {
    value1(newList) {
      this.value = newList;
      this.queryChatesInit();
    },
  },
  mounted() {
    this.queryChatesInit();
  },
  methods: {
    queryChatesInit() {
      this.$nextTick(() => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['查询成功', '查询失败', '查无此人', '总计'],
          },
          xAxis: [
            {
              name: '日期',
              type: 'category',
              data: this.value.weekDay,
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#666', // 左边线的颜色
                  width: '2', // 坐标线的宽度
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: '查询量\n单位:笔',
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#666', // 左边线的颜色
                  width: '2', // 坐标线的宽度
                },
              },
            },
            {
              type: 'value',
              axisLabel: {
                formatter: function () {
                  return '';
                },
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#666', // 左边线的颜色
                  width: '0', // 坐标线的宽度
                },
              },
            },
          ],
          series: [
            {
              name: '查询成功',
              type: 'bar',
              data: this.value.success,
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: '#389535',
                },
              },
            },
            {
              name: '查询失败',
              type: 'bar',
              data: this.value.fail,
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: '#F70909',
                },
              },
            },
            {
              name: '查无此人',
              type: 'bar',
              data: this.value.noThisOne,
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: '#0968F7',
                },
              },
            },
            {
              name: '总计',
              type: 'line',
              data: this.value.total,
              itemStyle: {
                normal: {
                  color: '#E18124',
                },
              },
            },
          ],
        });

        // 使echarts图表自适应屏幕尺寸
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      });
    },
  },
};
</script>
<style scoped>
.echarts-title {
  padding-bottom: 5px;
  border-bottom: 2px solid #e4e7ed;
  margin-bottom: 10px;
  color: #606060;
  font-size: 14px;
}
.echarts-title img {
  margin-right: 5px;
}
.layui-card {
  margin-top: 15px;
  background: #ffffff;
  margin-top: 15px;
  padding: 10px 15px;
  line-height: 24px;
  font-size: 14px;
}
</style>
