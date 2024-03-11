<template>
  <div class="login-wrap">
    <!-- <div class="login-header">
            <div class="login-logo"></div>
        </div> -->
    <v-bg></v-bg>
    <div class="login-main">
      <!-- <el-row>
                <el-col :span="4" :offset="10">
                    <el-form label-width="0px" class="ms-content LoginStyle">
                        <el-collapse-transition>
                            <div>
                                <el-form-item>
                                    <ul>
                                        <li v-for="(item,i) in list" :key="i">
                                            <span>{{item.content}}</span>
                                            <span>{{item.createTime}}</span>
                                        </li>
                                    </ul>
                                </el-form-item>
                                <el-form-item>
                                    <img class="submitLeft" @click="submitLogin('formItem')" src="@/assets/images/platform/login/left.jpg" alt="">
                                </el-form-item>
                            </div>
                        </el-collapse-transition>
                    </el-form>
                </el-col>
            </el-row> -->
      <sys-notice :noticeParam="noticeParam"
                  v-if="visibleNotice"></sys-notice>
    </div>
    <!-- <div class="login-footer">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</div> -->
  </div>
</template>

<script>
import vBg from './vBackground';
import sysNotice from '@/modules/platform/components/view/system-message/model/sysNotice';
export default {
  components: {
    vBg,
    sysNotice,
  },
  data: function () {
    return {
      noticeParam: {
        openMode: '',
        noticeList: [],
      },
      visibleNotice: false,
      list: [
        {
          content: 'ddddfdfd',
          createTime: '2019-11-11',
          createUser: 'zt',
          createUserName: null,
          id: 'ff8080816dc9b9ac016e59860a630001',
          messageFilename: '',
          messageFilepath: '',
          msgtype: null,
          orgId: '10000000000000',
          title: 'ddddd',
        },
      ],
    };
  },
  methods: {
    sysNoticeShow() {
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
              // 无公告跳转首页
              this.$message.warning('暂无对您发布的公告');
              this.$router.push('homePage');
            }
          } else {
            // 请求错误跳转首页
            this.$message.error(res.message);
            this.$router.push('homePage');
          }
        });
    },
  },
  created() {
    // 请求公告数据
    this.sysNoticeShow();
  },
};
</script>

<style scoped>
.login-main {
  overflow: hidden;
  height: 100%;
}
.login-wrap {
  background: none;
  overflow: hidden;
  height: 100%;
}
.LoginStyle {
  margin-top: 300px;
}
.LoginStyle ul li {
  list-style: none;
  text-align: center;
}
.submitLeft {
  display: block;
  margin: 0 auto;
}
</style>
