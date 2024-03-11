<template>
  <el-card shadow="hover"
           class="layui-card mb15"
           style="height: 395px;">
    <p class="card-head">
      <span class="left cardtitle">
        <img src="static/img/icon_06.png">快捷功能入口
      </span>
      <span class="right enterlink"
            @click="serviceShortcuts">
        <img src="static/img/btn_icon4.png">
      </span>
    </p>
    <div class="iconlink">
      <el-carousel height="230px"
                   :interval="5000"
                   arrow="hover"
                   :autoplay="autoplay"
                   indicator-position="outside">
        <el-carousel-item v-for="(item,index) in carddata"
                          :key="index">
          <template>
            <!-- 里面是菜单列表 -->
            <el-row :gutter="20">
              <el-col :xl="6"
                      :md="8"
                      :sm="8"
                      :xs="8"
                      v-for="(subitem,index) in item.data"
                      :key="index"
                      class="elcollist">
                <el-tooltip class="item"
                            effect="dark"
                            :content="subitem.name"
                            placement="top">
                  <div class="grid-content">
                    <a class="iconhref"
                       @click="handlePath(subitem)">
                      <i :class="`iconi DHCiconfont DHC-${subitem.menuStyle}`"></i>
                      <span class="icon_text">{{subitem.name}}</span>
                    </a>
                  </div>
                </el-tooltip>
              </el-col>
            </el-row>
          </template>
        </el-carousel-item>
      </el-carousel>
    </div>
    <service-shortcuts v-bind:param="param"
                       ref="shortcuts"
                       @init="init()"></service-shortcuts>
  </el-card>
</template>
<script>
import serviceShortcuts from './shortcuts';
import Bus from '@/common/script/bus';
export default {
  name: 'quickentry',
  components: {
    serviceShortcuts,
  },
  data() {
    return {
      param: {
        visible: false,
        title: '',
        cardListId: [],
      },
      activeName: 'first',
      autoplay: false,
      cardLink: [],
      cardId: [],
      turnpage: 1,
      carddata: [],
    };
  },
  created() {
    // this.init();
  },
  methods: {
    async init() {
      this.carddata = [];
      this.cardLink = [];
      this.param.cardListId = [];
      let params = { root: sessionStorage.getItem('id') };
      await this.http.apiPost(this.$creditPerUrl.common.getShortcutMenu, params).then((res) => {
        this.cardLink = res;
        this.cardLink.map((item) => {
          this.param.cardListId.push(item.id);
        });
      });
      this.handleturnpage();
    },
    serviceShortcuts() {
      this.param = {
        visible: true,
        title: '编辑快捷入口',
        cardListId: this.param.cardListId,
      };
      this.$refs.shortcuts.shortinit();
    },
    handlePath(subitem) {
      let index = subitem.link;
      // 兼容非vue组件，通过改变iframe的src属性实现跳转
      if (index.indexOf('-') < 0) {
        this.$router.push({
          path: '/iframe',
          query: {
            name: subitem.name,
            index: index,
          },
        });
        sessionStorage.iframeLink = index;
        Bus.$emit('iframeSrc', index);
      } else {
        this.$router.push(index);
      }
    },
    // 实现快捷入口走马灯分页
    handleturnpage() {
      let len = this.cardLink.length;
      let cut;
      if (window.screen.width <= 1366) {
        cut = 6;
      } else {
        cut = 8;
      }
      if (len <= cut) {
        this.turnpage = 1;
      } else {
        this.turnpage = Math.ceil(len / cut);
      }
      for (var i = 0; i < this.turnpage; i++) {
        var obj = {
          page: i + 1,
          data: [],
        };
        for (var j = cut * i; j < Math.min(len, cut * (i + 1)); j++) {
          obj.data[j % cut] = this.cardLink[j];
        }
        this.carddata.push(obj);
      }
    },
  },
};
</script>
<style scoped>
/* 公告样式 */
body {
  line-height: 24px;
  font: 14px Helvetica Neue, Helvetica, PingFang SC, \5fae\8f6f\96c5\9ed1, Tahoma, Arial, sans-serif;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.iconHeight .el-carousel__container {
  height: 100px;
}
.el-col {
  border-radius: 4px;
}
.el-row div:nth-of-type(2) {
  color: #3f91f4;
}
.el-row div:nth-of-type(3) {
  color: #f7664e;
}
.el-row div:nth-of-type(4) {
  color: #52ced6;
}
.el-row div:nth-child(5) {
  color: #a27352;
}
.el-row div:nth-child(6) {
  color: #389535;
}
.el-row div:nth-child(7) {
  color: #d74280;
}
.el-row div:nth-child(8) {
  color: #e18124;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  cursor: pointer;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
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
  margin-top: 15px;
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
.cardtitle {
  color: #606060;
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
  color: #f3b44b;
  font-size: 18px;
  opacity: 0.75;
  height: 180px;
  margin: 0;
}
.el-carousel .el-carousel__container {
  height: 200px !important;
}
.card-head {
  border-bottom: 2px solid #e4e7ed;
  overflow: hidden;
  padding-bottom: 5px;
}
.iconlink {
  height: 100px;
  padding-top: 30px;
  margin-top: 20px;
  padding-bottom: 30px;
}
.iconlink .grid-content {
  display: inline-block;
  width: 95%;
  text-align: center;
  border-radius: 2px;
  font-size: 30px;
  transition: all 0.3s;
  padding: 10px 0px;
  border: 1px solid #ffffff;
  height: 65px;
  overflow: hidden;
  text-align: center;
}
.iconlink .grid-content:hover {
  border: 1px dashed #dcdcdc;
}
.el-card__body .iconlink .grid-content .iconhref {
  display: block;
  overflow: hidden;
}
.iconlink .grid-content i.DHCiconfont {
  display: block;
  padding: 10px 0;
  font-size: 50px;
}
.iconlink .grid-content span.icon_text {
  display: block;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
