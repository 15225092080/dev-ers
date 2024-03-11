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
                <span>企业名称：</span><span>{{ paramDetail.entName }}</span>
              </div>
              <div style="float: left;"><span style="color:#D9001B;">得分：</span><span style="color:#D9001B;">{{ this.dataList[this.dataList.length-1].score}}</span></div>
              <div style="float: right;"><span>评级年份：</span><span>{{sheetYear}}</span><span>年</span></div>
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
                <!-- <tr v-for="(item, key) in totalScoreList"
                    :key="key">
                  <td colspan="2"
                      style="text-align: center;font-size: 16px;">合 计</td>
                  <td style="text-align: center;font-size: 16px;">{{ 100 }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="text-align: center;font-size: 16px;"><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr>
                <tr v-for="(item, key) in scoreList"
                    :key="key">
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.sortCode }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.indexName }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.fullScore }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.minValue==undefined ? '':(parseInt(item.minValue*100)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.maxValue==undefined ? '':(parseInt(item.maxValue*100)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.operationValue==undefined ? '':(parseInt(item.operationValue*100)+"%") }}</td>
                  <td><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;color: #818182;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr>
                <tr v-for="(item, key) in totalScoreList"
                    :key="key">
                  <td>{{ item.sortCode }}</td>
                  <td>{{ item.indexName }}</td>
                  <td>{{ item.fullScore }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr> -->
                <tr v-for="(item, key) in this.dataList"
                    :key="key"
                    v-if="item.indexId=='totalScore'">
                  <td colspan="2"
                      style="text-align: center;font-size: 15px;color: black;">合 计</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ 100 }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style="text-align: center;font-size: 15px;"><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;color: black;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr>
                <tr v-else-if="item.minValue!=undefined">
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.sortCode }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.indexName }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.fullScore }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.minValue==undefined ? '':(Number(item.minValue*100).toFixed(2)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.maxValue==undefined ? '':(Number(item.maxValue*100).toFixed(2)+"%") }}</td>
                  <td style="text-align: center;color: #818182;font-size: 15px;">{{ item.operationValue==undefined ? '':(Number(item.operationValue*100).toFixed(2)+"%") }}</td>
                  <td><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;color: #818182;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr>
                <tr v-else>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.sortCode }}</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.indexName }}</td>
                  <td style="text-align: center;font-size: 15px;color: black;">{{ item.fullScore }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><input type="text"
                           @focus="getScore(item)"
                           @blur="checkingScore(item)"
                           style="text-align: center;color: black;"
                           v-model="item.score"></td>
                  <td style="display: none;">{{ item.indexId }}</td>
                  <td style="display: none;">{{ item.operationValue }}</td>
                  <td style="display: none;">{{ item.topIndexId }}</td>
                  <td style="display: none;">{{ item.id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-card>

      <el-button @click="close()"
                 style="margin:0 30px 15px 0;float:right;"
                 class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      <el-button type="primary"
                 class="submit_btn"
                 style="margin:0 30px 15px 0;float:right;"
                 @click="submitScore()"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
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
      num1: 0,
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
    // totalScoreList: function () {
    //   return this.dataList.filter(function (dataList) {
    //     return dataList.indexId == 'totalScore';
    //   });
    // },
    // scoreList: function () {
    //   return this.dataList.filter(function (dataList) {
    //     return dataList.minValue != undefined;
    //   });
    // },
    // scoreList2: function () {
    //   return this.dataList.filter(function (dataList) {
    //     return (
    //       dataList.indexId != 'totalScore' && dataList.minValue == undefined
    //     );
    //   });
    // },
  },
  methods: {
    getScore(item) {
      // console.log('oldValue', item);
      this.num1 = Number(item.score);
    },
    checkingScore(item) {
      // console.log('newValue', item);
      if (
        Number(item.fullScore) < Number(item.score) ||
        isNaN(item.score) ||
        Number(item.score) < 0
      ) {
        this.$message({
          showClose: true,
          message: '输入的分数不符合规范',
          type: 'warning',
          duration: '3000',
        });
        item.score = this.num1.toFixed(2);
        this.num1 = 0;
        return false;
      }
      // console.log(this.dataList);
      item.score = Number(item.score).toFixed(2);
      let num2 = Number(item.score) - this.num1;
      for (let i = 0; i < this.dataList.length; i++) {
        if (
          this.dataList[i].minValue == undefined &&
          this.dataList[i].indexId != 'totalScore'
        ) {
          if (item.topIndexId == this.dataList[i].indexId) {
            // 修改序列为阿拉伯数字的行input框的值进行的运算
            this.dataList[i].score = Number(
              Number(this.dataList[i].score) + num2
            ).toFixed(2);
            this.dataList[this.dataList.length - 1].score = Number(
              Number(this.dataList[this.dataList.length - 1].score) + num2
            ).toFixed(2);
          }
          if (item.indexId == this.dataList[i].indexId) {
            this.dataList[this.dataList.length - 1].score = Number(
              Number(this.dataList[this.dataList.length - 1].score) + num2
            ).toFixed(2);
          }
        }
      }
      this.num1 = 0;
    },
    async getDataTable() {
      let jsonData = await this.http.apiPost(
        this.$urlList.era.getIndexDetail,
        this.paramDetail.data,
        ''
      );
      this.sheetYear = JSON.parse(jsonData.comData).data.sheetYear;
      this.dataList = JSON.parse(jsonData.comData).data.dataList;
      // console.log(this.dataList);
    },
    close() {
      this.$emit('closeChild');
    },
    submitScore() {
      let dateArr = [];
      // console.log(this);
      for (let i = 0; i < this.dataList.length; i++) {
        dateArr.push({
          custId: this.$route.query.custId,
          sheetYear: this.sheetYear,
          modelId: '001',
          score: this.dataList[i].score,
          indexName: this.dataList[i].indexName,
          indexId: this.dataList[i].indexId,
          operationValue: this.dataList[i].operationValue,
          id: this.dataList[i].id,
        });
      }
      let dateParam = { scoreStr: JSON.stringify(dateArr) };
      // console.log(dataParam);
      this.http
        .apiPost(this.$urlList.era.updateUserScore, dateParam)
        .then((res) => {
          if (res.code == '00000000') {
            this.common
              .MessageBoxalert(res.msg, '消息', '确认', 'success')
              .then(() => {
                window.reload();
              });
          } else {
            this.common
              .MessageBoxalert(res.msg, '消息', '确认', 'error')
              .then(() => {});
          }
        });
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
.close_btn {
  float: right;
  margin-right: 30px;
  margin-bottom: 15px;
}
.submit_btn {
  float: right;
  margin-right: 30px;
  margin-bottom: 15px;
}
p {
  padding: 10px 0px;
}
</style>
