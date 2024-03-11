<template>
  <div>
    <el-dialog :visible.sync="param.visible"
               :close-on-click-modal="true"
               custom-class="model-dialog el-dialog-m notice"
               :modal="false"
               width="70%"
               :before-close="closeDialog"
               :close="closeDialog">
      <div class="left">
        <div class="outer-box">
          <div class="sidebarNotice">
            <el-menu :default-active="activeIndex"
                     class="el-menu-sysNotice"
                     :class="noticeParam.openMode"
                     background-color="#409eff"
                     text-color="#fff"
                     active-text-color="#190080"
                     @select="handleSelect">
              <el-menu-item v-for="(item,index) in noticeList"
                            :key="index"
                            :index="item.noticeId">
                <span slot="title"
                      class="menu_title"
                      :title="item.title">{{item.title}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </div>
        <right-sys-notice ref="getNotice"
                          :activeIndex="activeIndex"></right-sys-notice>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rightSysNotice from './rightSysNotice';
export default {
  props: ['noticeParam'],
  data() {
    return {
      noticeList: this.noticeParam.noticeList,
      param: {
        visible: true,
      },
      activeIndex: '1',
    };
  },
  components: {
    rightSysNotice,
  },
  methods: {
    closeDialog() {
      if (this.noticeParam.openMode == 'clickHideNotice') {
        //  如果打开方式是在侧边栏打开的   点击关闭弹窗
        this.$emit('update:show', false);
      } else {
        //  如果是首页通知栏   点击跳转到首页或者系统首页
        //   this.$router.push('homePage');
        if (JSON.parse(this.$store.getters.getLoginStatus).jumpFrame == 'homePage') {
          //  判断跳转如果跳转首页 用路由跳转
          this.$router.push('homePage');
        } else if (JSON.parse(this.$store.getters.getLoginStatus).jumpFrame) {
          // 跳转项目首页 因为是分模块打包 所以用window.location.href 跳转；
          window.location.href = '#/' + JSON.parse(this.$store.getters.getLoginStatus).jumpFrame;
        }
      }
    },
    handleSelect(key) {
      //   点击的时候调用公告详情事件 传一个id
      this.$refs.getNotice.getNoticeData(key);
    },
  },
  created() {},
  mounted() {
    //   获取所有公告的列表
    this.activeIndex = this.noticeParam.noticeList[0].noticeId;
  },
};
</script>
<style>
.notice .el-dialog__body {
  border: none;
  padding: 0;
  /* height: 70vh; */
}
.left {
  overflow: hidden;
}
.el-menu-sysNotice {
  width: 160px;
}
.sidebarNotice {
  display: block;
  position: absolute;
  width: 180px;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
<style scoped>
.outer-box {
  width: 160px;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background: #409eff;
}
.menu_title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
</style>
