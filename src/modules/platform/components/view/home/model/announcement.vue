<template>
  <el-card shadow="hover"
           class="layui-card"
           style="height: 361px;margin-top:0; zIndex:999;">
    <el-tabs v-model="activeName">
      <el-tab-pane name="first">
        <span slot="label"
              class="noticeIcon">
          <i class="icon DHCiconfont DHC-gonggao"></i>&nbsp;公告
        </span>
        <!-- <el-card style="height: 250px;margin-top:0; zIndex:999;overflow:scroll"> -->
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
        <el-table ref="singleTable"
                  :data="value.list"
                  highlight-current-row>
          <el-table-column type="index"
                           width="50"
                           label="序号"></el-table-column>
          <el-table-column property="title"
                           label="标题">
            <template slot-scope="scope">
              <span @click="detailFun(scope.row)"
                    class="link">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column property="createTime"
                           label="日期"></el-table-column>
        </el-table>
        <el-pagination v-if="value.recordCnt"
                       @current-change="currentChange"
                       @prev-click="prevClick"
                       @next-click="nextClick"
                       class="page"
                       :curPage="value.curPage"
                       :page-size="value.maxSize"
                       layout="prev,pager,next, jumper, total"
                       :total="value.recordCnt"></el-pagination>
        <!-- </el-card> -->
      </el-tab-pane>
      <!-- 人行公告 -->
      <el-tab-pane name="second">
        <span slot="label"
              class="noticeIcon"
              @click="infoNotice">
          <i class="icon DHCiconfont DHC-daibanshixiang"></i>人行公告
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- 公告详情 -->
    <!-- <info-detail :detail="detail"></info-detail> -->
    <systemmsg-details ref="details"
                       :param="paramDetail"
                       v-if="visible"
                       :vis.sync="visible"></systemmsg-details>
    <info-notice v-bind:param="param"
                 ref="noticechild"></info-notice>
  </el-card>
</template>
<script>
import infoNotice from './notice';
import systemmsgDetails from '../../system-message/model/detail';
// import infoDetail from "./noticeDetails";
import vTable from '@/common/components/table';
import MinXin from '@/common/script/mixin';
export default {
  mixins: [MinXin],
  name: 'announcement',
  components: {
    infoNotice,
    // infoDetail,
    vTable,
    systemmsgDetails,
  },
  data() {
    return {
      activeName: 'first',
      visible: false,
      maxSize: 5,
      disabled: false,
      nextPage: '',
      prePage: '',
      recordCnt: 1,
      curPage: 1,
      paramDetail: {
        title: '系统公告-详情页',
        form: '',
      },
      detailUrl: {
        url: this.$urlList.systemmsg.findById,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      param: {
        visible: false,
        title: '',
      },
      detail: {
        detailsVisible: false,
        detailsIndex: '',
      },
    };
  },
  props: ['value'],
  methods: {
    currentChange(val) {
      this.curPage = val;
      this.getTableData();
    },
    prevClick(val) {
      this.curPage = val;
      this.getTableData();
    },
    nextClick(val) {
      this.curPage = val;
      this.getTableData();
    },
    infoNotice() {
      this.param = {
        visible: true,
        title: '人行公告',
      };
    },
    infoDetail(index) {
      this.detail = {
        detailsVisible: true,
        detailsIndex: this.value.list[index],
      };
    },
    handleDialogClose() {
      this.detailsVisible = false;
    },
    getTableData() {
      let paramData = {
        params: {
          curPage: this.curPage,
          maxSize: this.maxSize,
        },
      };
      // url个人企业是一样的一样的就不判断了
      this.http.apiGet('platform/config/systemMessage/homeMsg', paramData).then((res) => {
        this.value.list = res.list;
        this.maxSize = res.maxSize;
        this.recordCnt = res.recordCnt;
        this.curPage = res.curPage;
      });
    },
  },
  created: function () {
    setTimeout(() => {
      this.recordCnt = this.value.recordCnt;
    }, 300);
  },
};
</script>
<style scoped>
.link {
  color: #66b1ff;
  cursor: pointer;
}
/* 公告样式 */
.el-dialog-R {
  z-index: 999;
}
.left {
  float: left;
}
.right {
  float: right;
}
.mb15 {
  margin-bottom: 15px;
}
li:hover {
  color: #fd971f;
}
/* 公告详情 */
.el-form-item__label {
  font-family: 'Microsoft YaHei';
  text-align: left !important;
  height: 14px;
  margin-left: 60px;
  color: #666;
}
.formContent {
  width: 500px;
  margin-bottom: 15px;
  clear: both;
  color: #ccc;
  border-color: #dedede;
  cursor: not-allowed;
  margin-left: 60px;
  margin-right: 60px;
  font-family: 'Microsoft YaHei';
  font-size: 14px;
  border-bottom: 1px solid #dedede;
  height: 24px;
  letter-spacing: 2px;
}
.textlabel {
  margin-left: 60px;
  margin-top: 30px;
}
.textL {
  margin-left: 50px;
}
.formpath {
  margin-left: 70px;
  margin-right: 60px;
  margin-bottom: 15px;
  color: #3075c7;
  text-decoration: underline;
}
/* 左边中间层 */
.wrapBox1 {
  width: 100%;
  overflow: hidden;
  margin-left: 20px;
}
.count li {
  list-style: none;
}
.count a {
  width: 45%;
  height: 55px;
  display: block;
  border-radius: 5px;
  float: left;
  margin-right: 20px;
}
.img_color0 {
  background: #ffcd42;
}
.img_color1 {
  background: #e63751;
}
.xe-icon {
  width: 55px;
  float: left;
  height: 55px;
  line-height: 55px;
  float: left;
  margin-left: 5%;
}
.xe-icon .DHCiconfont {
  font-size: 42px;
  color: #fff;
}
.DHCiconfont {
  font-family: 'DHCiconfont' !important;
  /* font-size: 14px; */
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.xe-label {
  width: 75%;
  float: left;
}
.count b {
  color: #ffffff;
  font-size: 20px;
  float: left;
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
.count span {
  color: #ffffff;
  font-size: 12px;
  float: left;
  line-height: 15px;
  width: 100%;
  text-align: center;
}

.layui-card {
  margin-top: 15px;
  background: #ffffff;
  padding: 10px 15px;
  line-height: 24px;
  font-size: 14px;
}
.badge-mc p {
  margin: 20px 0px;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
}
.badge-mc strong {
  font-weight: 500;
  color: #606060;
  border-right: 1px solid #888888;
  padding-right: 20px;
  min-width: 70px;
  display: inline-block;
  text-align: right;
}
.badge-mc .item {
  font-size: 14px;
  margin-left: 20px;
}
.badge-mc .item button {
  border-radius: 15px;
  padding: 5px 15px;
  background: #fafafa;
}
.cardtitle img {
  margin-right: 5px;
  vertical-align: -2px;
}
.enterlink {
  border-left: 1px solid #eee;
  padding-left: 10px;
  padding-right: 10px;
}
.enterlink i {
  cursor: pointer;
}
.enterlink img {
  cursor: pointer;
  vertical-align: -2px;
}
/* 左边第三层 */
.echarts-title {
  font-size: 14px;
  font-weight: normal;
  padding-bottom: 5px;
  border-bottom: 2px solid #e4e7ed;
}
.echarts-title > img {
  vertical-align: -5px;
}
.echarts-cont {
  width: 100%;
  height: 300px;
  margin-top: 10px;
  border: 1px solid #ccc;
}

/* 右上(右边第一层) */
.tab-cont li {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
}
.tab-cont li div em {
  font-style: normal;
}
.tab-cont li div i {
  font-style: normal;
}
.noticeIcon .DHCiconfont {
  font-size: 30px;
  vertical-align: -5px;
}

/* 右下(右边第二层) */
.el-carousel__item {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  height: 280px;
  margin: 0;
}
.card-head {
  border-bottom: 2px solid #e4e7ed;
  overflow: hidden;
  padding-bottom: 5px;
}
.iconlink {
  margin-top: 30px;
}
.iconlink .grid-content {
  background-color: #0ff;
  height: 140px;
  overflow: hidden;
  text-align: center;
}
.iconlink .grid-content .iconhref {
  display: block;
  overflow: hidden;
  margin-top: 25px;
}
.iconlink .grid-content i.DHCiconfont {
  display: block;
  padding: 10px 0;
  font-size: 60px;
}
.iconlink .grid-content span.icon_text {
  display: block;
  font-size: 14px;
  color: #f3b44b;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
