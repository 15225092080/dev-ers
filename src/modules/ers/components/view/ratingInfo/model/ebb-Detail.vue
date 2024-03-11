<template>
  <div class="querypage">
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               custom-class="model-dialog el-dialog-m">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <el-card class="paddingtop">
        <div>
          <div class="tableData tableFirst">
            <div class="title"
                 style="font-size: 15px;">
              <div style="float: left;margin-right: 100px;">
                <span>企业名称：</span><span class="entName">{{ paramDetail.entName }}</span>
              </div>
              <div style="float: left;"><span style="color:#D9001B;">得分：</span><span class="totalScore"
                      style="color:#D9001B;">{{ this.dataList[this.dataList.length-1].score}}</span></div>
              <div style="float: right;"><span>评级年份：</span><span class="sheetYear">{{sheetYear}}</span><span>年</span></div>
            </div>
            <table class="table0"
                   ref="table0">
              <thead>
                <tr>
                  <th style="width:10%;text-align: center;font-size: 15px;">序号</th>
                  <th style="width:35%;text-align: center;font-size: 15px;">指标名称</th>
                  <th style="width:10%;text-align: center;font-size: 15px;">满分</th>
                  <th style="width:10%;text-align: center;font-size: 15px;">最小值</th>
                  <th style="width:10%;text-align: center;font-size: 15px;">最大值</th>
                  <th style="width:15%;text-align: center;font-size: 15px;">企业数值</th>
                  <th style="width:10%;text-align: center;font-size: 15px;">得分</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in this.dataList"
                    :key="key"
                    v-if="item.indexId=='totalScore'">
                  <td colspan="2"
                      style="text-align: center;font-size: 15px;color: black;">合 计</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ 100 }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.score }}</td>
                </tr>
                <tr v-else-if="item.minValue!=undefined">
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.sortCode }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.indexName }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.fullScore }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.minValue==undefined ? '':(Number(item.minValue*100).toFixed(2)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.maxValue==undefined ? '':(Number(item.maxValue*100).toFixed(2)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.operationValue==undefined ? '':(Number(item.operationValue*100).toFixed(2)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.score }}</td>
                </tr>
                <tr v-else>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.sortCode }}</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.indexName }}</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.fullScore }}</td>
                  <td style="text-align: center;font-size: 15px;"></td>
                  <td style="text-align: center;font-size: 15px;"></td>
                  <td style="text-align: center;font-size: 15px;"></td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.score }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-card>

      <el-button @click="close()"
                 style="margin:0 30px 15px 0;float:right;"
                 class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </el-dialog>
  </div>
</template>

<script>
import MinXin from '@/common/script/mixin';
export default {
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  data() {
    return {
      dataList: {},
      sheetYear: '',
      paramEdit: false,
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
    };
  },
  props: ['paramDetail'],
  watch: {},
  computed: {
    totalScoreList: function () {
      return this.dataList.filter(function (dataList) {
        return dataList.indexId == 'totalScore';
      });
    },
    scoreList: function () {
      return this.dataList.filter(function (dataList) {
        return dataList.indexId == 'score';
      });
    },
  },
  methods: {
    async getDataTable() {
      let jsonData = await this.http.apiPost(
        this.$urlList.era.getIndexDetail,
        this.paramDetail.data,
        ''
      );
      this.sheetYear = JSON.parse(jsonData.comData).data.sheetYear;
      this.dataList = JSON.parse(jsonData.comData).data.dataList;
    },
    close() {
      this.$emit('closeChild');
    },
    closeChild() {
      this.paramEdit = false;
    },
  },
  async created() {
    this.getDataTable();
  },
  mounted() {},
};
</script>
<style scoped="scoped">
p {
  padding: 10px 0px;
}
</style>
