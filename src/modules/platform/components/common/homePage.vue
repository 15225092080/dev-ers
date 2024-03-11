<template>
  <div class="ui-home-wrap">
    <section class="home-top-wrap">
      <img class="top-img"
           src="../../../../assets/images/platform/login/home_bg.png"
           alt="">
      <!-- <div class="top-bg"></div> -->
      <v-user class="top-username"
              @updatePwdShow="updatePwdShow"
              @sysNoticeShow="sysNoticeShow"
              :userParam="userParam"></v-user>
      <div class="top-userInfo-wrap">
        <i class="DHCiconfont DHC-yonghu"></i>
        <div>
          <span>{{userParam.username}}，</span>
          <span v-if="time_range('00:00', '12:00')">上午好！</span>
          <span v-if="time_range('12:00', '21:00')">下午好！</span>
          <span v-if="time_range('21:00', '23:59')">晚上好！</span>
        </div>
        <a @click="routerTo">帐户信息</a>
      </div>
    </section>
    <section class="home-center-wrap">
      <div class="list-wrap">
        <dl v-for="(item,index) in system"
            :key="index"
            :class="'system'+system.length"
            @click="jumpPath(item.url,item.systemId);return false;">
          <dd class="icon DHCiconfont"
              :class="item.icon"
              :style="'background:'+item.bgColor"></dd>
          <dt>{{item.resourceName}}</dt>
        </dl>
      </div>
    </section>
    <footer class="home-bottom">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</footer>
    <sys-notice v-if="visibleNotice"
                :show.sync="visibleNotice"
                :noticeParam="noticeParam"
                @hideNotice="hideNotice"></sys-notice>
    <update-pwd v-if="visibleEdit"
                :vis.sync="visibleEdit"></update-pwd>
  </div>
</template>

<script>
import vUser from './user';
import sysNotice from '@/modules/platform/components/view/system-message/model/sysNotice';
import updatePwd from '@/modules/platform/components/common/updatePwd';
import Bus from '@/common/script/bus';
export default {
  components: {
    vUser,
    sysNotice,
    updatePwd,
  },
  data: function () {
    return {
      arrColor: ['4599d8', '3373c6', '02a3b3', 'e44b4b', '16b5ca'],
      userParam: {
        username: localStorage.getItem('ms_username'),
        bottomTriangle: true,
        fontClass: 'fontColor',
        popperStyle: 'homePopperStyle',
      },
      visibleNotice: false,
      visibleEdit: false,
      system: [],
      noticeParam: {
        openMode: 'clickHideNotice', // 关闭弹出层方式 点击关闭
        noticeList: [],
      },
    };
  },
  methods: {
    time_range(beginTime, endTime) {
      var strb = beginTime.split(':');
      if (strb.length != 2) {
        return false;
      }

      var stre = endTime.split(':');
      if (stre.length != 2) {
        return false;
      }

      var b = new Date();
      var e = new Date();
      var n = new Date();

      b.setHours(strb[0]);
      b.setMinutes(strb[1]);
      e.setHours(stre[0]);
      e.setMinutes(stre[1]);

      if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
      } else {
        return false;
      }
    },
    sysNoticeShow() {
      // 请求公告数据
      this.http
        .apiGet(this.$commonUrl.notice.getHome, null, {
          showLoading: true,
        })
        .then((res) => {
          if (res.code == 0) {
            if (res.data && res.data.length > 0) {
              this.visibleNotice = true;
              this.noticeParam.noticeList = res.data;
            } else {
              // 无数据不弹公告框
              this.$message.warning('暂无对您发布的公告');
            }
          } else {
            this.$message.error(res.message);
          }
        });
    },
    hideNotice() {
      this.visibleNotice = false;
    },
    updatePwdShow() {
      this.visibleEdit = true;
    },
    routerTo() {
      // 跳转详情页 面
      this.$store.dispatch('user/setOperatState', 'detail');
      this.$router.push({
        path: 'userInfoDetail',
        query: {
          id: localStorage.getItem('ms_userId'),
        },
      });
    },
    jumpPath(path, systemId) {
      if (!path) {
        return this.common.MessageBoxalert('未配置当前项目路径', '消息', '确认', 'error').then(() => {});
      }
      sessionStorage.setItem('systemId', systemId);
      Bus.$emit('sysNo', sessionStorage.getItem('systemId'));
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
      // 15642 平台通用-导航，刷新导航处理
      this.$store.dispatch('user/setTagsList', []);
      window.location.href = window.location.origin + '/' + path + '#/';
      // 解决服务器上跳转404问题
      // let url = window.location.href;
      // url = url.split('#')[0];
      // window.location.href = url;
      // window.location.href = window.location.origin + '/' + path + "#/";
      // END
      // 下面的代码解决当前页面在ie下未正常跳转，暂未见故注释
      // if(this.common.BrowserType().indexOf('IE') > -1){
      //     window.location.reload();
      // }

      return true;
    },
  },
  created() {
    this.$store.dispatch('user/setOperatState', '');
    this.common.realTimeRequest(this.$commonUrl.common.getOrgName, 'getOrgName');
    // 缓存当前用户信息
    this.http
      .apiGet(this.$commonUrl.user.findById, {
        params: {
          id: localStorage.getItem('ms_userId'),
        },
      })
      .then((res) => {
        if (res.code == '0') {
          sessionStorage.setItem('userData', JSON.stringify(res.data));
        }
      });
    // END
    this.http.apiGet(this.$commonUrl.home.systemList).then((res) => {
      if (res.code == '0') {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].icon) {
            let iconColor = res.data[i].icon.split('#');
            res.data[i].icon = iconColor[0];
            res.data[i].bgColor = '#' + iconColor[1];
          } else {
            res.data[i].icon = 'DHC-xitongmoren';
            res.data[i].bgColor = '#' + this.arrColor[1];
          }
        }
        this.system = res.data;
      }
    });
  },
};
</script>

<style scoped lang="less">
.ui-home-wrap {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  .home-top-wrap {
    flex: none;
    position: relative;
    width: 100%;
    height: auto;
    background: #3075c8;
    .top-img {
      vertical-align: middle;
      width: 100%;
      height: auto;
      border-bottom: 1.4vh solid #3075c8;
    }
    .top-bg {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: #3075c8 url(../../../../assets/images/platform/login/home_bg.png) no-repeat top center;
      background-size: 100% 100%;
      border-bottom: 1.4vh solid #3075c8;
    }
    .top-username {
      position: absolute;
      top: 10px;
      right: 20px;
    }
    .top-userInfo-wrap {
      position: absolute;
      left: 50%;
      bottom: 5vh;
      width: 33%;
      min-width: 400px;
      transform: translateX(-50%);
      padding: 0 50px;
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
      display: flex;
      justify-content: start;
      align-items: center;
      color: #5294e9;
      i {
        font-size: 600%;
        line-height: 1;
        margin-right: 10px;
      }
      div {
        flex: auto;
        span {
          font-size: 158%;
        }
      }
      a {
        text-decoration: underline;
        cursor: pointer;
        align-self: flex-end;
        line-height: 4;
        font-size: 120%;
        flex: none;
      }
    }
  }
  .home-center-wrap {
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 150px;
    box-sizing: border-box;
    .list-wrap {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: self-start;
      flex-wrap: wrap;
      dl {
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 18%;
        padding: 16px 6px;
        cursor: pointer;
        dt {
          text-align: center;
          font-size: 160%;
          color: #333;
        }
        dd {
          font-size: 570%;
          color: #fff;
          line-height: 1;
          text-align: center;
          border-radius: 12px;
          margin-bottom: 16px;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
        }
      }
      dl:hover {
        dd {
          box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.5);
        }
        dt {
          text-decoration: underline;
        }
      }
    }
  }
  .home-bottom {
    flex: none;
    line-height: 3;
    background-color: #646464;
    font-size: 120%;
    color: #fff;
    text-align: center;
  }
}
@media screen and (max-width: 1280px) {
  .ui-home-wrap {
    font-size: 10px;
  }
}
@media screen and (min-width: 1281px) and (max-width: 1440px) {
  .ui-home-wrap {
    font-size: 12px;
  }
}
@media screen and (min-width: 1441px) and (max-width: 1920px) {
  .ui-home-wrap {
    font-size: 14px;
  }
}
@media screen and (min-width: 1921px) {
  .ui-home-wrap {
    font-size: 17px;
  }
}
</style>
