<template>
  <div class="login-wrap">
    <v-bg></v-bg>
    <div class="login-main">
      <div class="login-fingerprint-box"
           @click="getLogin">
        <img src="@/assets/images/platform/login/icon1.png">
      </div>
      <p>验证指纹</p>
    </div>
    <!-- <div class="login-footer">Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</div> -->
  </div>
</template>

<script>
import vBg from './vBackground';
export default {
  components: {
    vBg,
  },
  data: function () {
    return {
      formItem: {
        newpassword: '',
        new: '',
      },
    };
  },
  methods: {
    // loginSuccess() {
    //   if (1 == 1) {
    //     this.$router.push('home');
    //   } else {
    //     this.$router.push('changePwd');
    //   }
    // },
    getLogin() {
      // 接口请求需要传userId 已经在 localStorage 存储
      // let paramData = {
      //     userId:localStorage.getItem('userId')
      // }
      // this.http.apiPost(this.$urlList.login.login,paramData,{showLoading:true}).then(res => {
      //     if(res.code == 0){
      //         localStorage.setItem("ms_userId", res.data.userId);
      //         localStorage.setItem("ms_username", res.data.userName);
      //         sessionStorage.setItem("systemId", res.data.jumpSystemId);
      //         // res.data.jumpFrame = 'homePage'
      //         this.$store.commit("LOGIN_ROUTER_STATUS", res.data);
      //         if(res.data.todayFirst){
      //             // 当天首次登录 true跳转通知页 false不跳转通知页
      //             this.$router.push('notice');
      //         }else if(res.data.jumpFrame == 'homePage' || res.data.jumpFrame == '/homePage'){
      //             //  判断跳转如果跳转首页 用路由跳转
      //             this.$router.push('homePage');
      //         }else if(res.data.jumpFrame){
      //             // 跳转项目首页 因为是分模块打包 所以用window.location.href 跳转；
      //             window.location.href = res.data.jumpFrame;
      //         }
      //         // if(JSON.parse(this.$store.getters.getLoginStatus).firstLogin){
      //         //     // 第一次登录校验 跳转修改密码 不跳转修改密码页
      //         //     this.$router.push('changePwd');
      //         // }else if(JSON.parse(this.$store.getters.getLoginStatus).todayFirst){
      //         //     // 当天首次登录 跳转通知页 不跳转通知页
      //         //     this.$router.push('notice');
      //         // }else if(JSON.parse(this.$store.getters.getLoginStatus).jumpFrame == 'homePage'){
      //         //     //  判断跳转如果跳转首页 用路由跳转
      //         //     this.$router.push('homePage');
      //         // }else if(JSON.parse(this.$store.getters.getLoginStatus).jumpFrame){
      //         //     // 跳转项目首页 因为是分模块打包 所以用window.location.href 跳转；
      //         //     window.location.href = JSON.parse(this.$store.getters.getLoginStatus).jumpFrame;
      //         // }
      //     }else if(res.code == '1003018'){
      //         localStorage.setItem("ms_userId", res.message);
      //         this.$router.push('changePwd');
      //     }else{
      //         this.$message.error(res.message);
      //     }
      // })
    },
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
.login-fingerprint-box {
  margin: 0 auto;
  margin-top: 300px;
  /* height: 50px; */
  width: 56px;
  border-radius: 8px;
  background: #000;
  /* line-height: 50px; */
  text-align: center;
}
.login-fingerprint-box img {
  padding: 10px;
}
.login-main p {
  text-align: center;
  font-size: 20px;
  padding-top: 10px;
}
</style>
