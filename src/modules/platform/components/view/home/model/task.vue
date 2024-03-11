<template>
  <el-card shadow="hover">
    <div class="wrapBox1">
      <ul class="count">
        <li v-for="(item,index) in value"
            @click="getRoute(item.link)"
            :key="item.name">
          <a class="img_color clearfix"
             :class="'img_color'+index">
            <div class="xe-icon">
              <i :class="`icon DHCiconfont ${item.style}`"></i>
            </div>
            <div class="xe-label">
              <b>{{ item.count }}</b>
              <span>{{ item.name }}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    value: Array,
  },
  methods: {
    // 实现路由的跳转
    getRoute(link) {
      this.$router.push(link);
    },
  },
};
</script>
<style scoped>
/* 公告样式 */

.left {
  float: left;
}
.right {
  float: right;
}
.mb15 {
  margin-bottom: 15px;
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
  cursor: pointer;
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
