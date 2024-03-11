<template>
  <div>
    <div class="userinfo"
         :class="{'userInfoRight':userParam.bottomTriangle}">
      <p v-if="!userParam.bottomTriangle"
         class="icon DHCiconfont DHC-yonghu"></p>
      <span class="userName"
            :class="userParam.fontClass"
            style="cursor:pointer;">
        <!-- <a class="userRight" v-if="userParam.bottomTriangle" @click="userVisible = false">{{userParam.username}}</a> -->
        <el-popover placement="bottom"
                    width="180"
                    :popper-class="userParam.popperStyle"
                    v-model="userVisible">
          <ul :class="userParam.fontType"
              style="list-style:none">
            <li @click="getNotice"><i class="icon DHCiconfont DHC-xitonggonggao"></i>系统公告</li>
            <li @click="updatePwd"><i class="icon DHCiconfont DHC-xiugaimima"></i>修改密码</li>
            <li @click="getOut"><i class="icon DHCiconfont DHC-zhuxiao"></i>注销</li>
          </ul>
          <span v-if="!userParam.bottomTriangle"
                slot="reference"
                class="userName"><a>{{userParam.username}}</a></span>
          <a v-if="userParam.bottomTriangle"
             slot="reference">{{userParam.username}}<i class="triangle"
               :class="`el-icon-caret-bottom`"></i></a>
        </el-popover>
      </span>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    userParam: {
      username: {
        type: String,
        default: function () {
          return '';
        },
      },
      bottomTriangle: {
        type: Boolean,
        default: function () {
          return false;
        },
      },
      fontClass: {
        type: String,
        default: function () {
          return '';
        },
      },
    },
  },
  data() {
    return {
      userVisible: false,
    };
  },
  methods: {
    getOut() {
      let that = this;
      this.common
        .MessageBoxconfirm('确定注销用户？', '提示', '确定', '取消', 'warning', 'zhuxiao')
        .then(() => {
          this.userVisible = false;
          this.http
            .apiGet(that.$commonUrl.login.userlogout, {
              params: { userId: localStorage.getItem('ms_userId') },
            })
            .then(() => {
              localStorage.removeItem('ms_username');
              localStorage.removeItem('ms_userId');
              localStorage.removeItem('vuex');
              if (sessionStorage.getItem('systemId') != 'DCP') {
                sessionStorage.removeItem('systemId');
                if (sessionStorage.getItem('serverType')) {
                  let serverType = JSON.parse(sessionStorage.getItem('serverType'));
                  for (let i = 0; i < serverType.length; i++) {
                    if (serverType[i].key == 'packageModel') {
                      if (serverType[i].value == 0) {
                        window.location.href = '/platform/#/login';
                        return;
                      } else {
                        window.location.href = '/platform#/login';
                        return;
                      }
                    }
                  }
                }
                // window.location.href = '/platform#/login';
                // return;
              }
              sessionStorage.removeItem('systemId');
              this.$router.push('login');
              // this.$router.push('homePage');
            });
          this.$store.dispatch('user/resetRoles'); // 201912.18清除拥有当前权限，暂时写在这里，上面的接口返回302，调通后放进去
        })
        ['catch'](() => {});
      // this.$confirm('<p class="icon DHCiconfont DHC-zhuxiao"></p><p class="box_message">确定注销用户？</p>', '', {
      //     dangerouslyUseHTMLString: true,
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     customClass:"logoutConfirm"
      // }).then(() => {
      //     this.userVisible = false;
      //     this.http.apiGet(this.$urlList.login.logout).then((res)=>{
      //         localStorage.removeItem('ms_username');
      //         localStorage.removeItem('ms_userId');
      //         sessionStorage.removeItem('systemId');
      //         this.$router.push('homePage');
      //     })
      // }).catch(() => {
      // })

      // this.userVisible = false;
    },
    getNotice() {
      // 公告显示通知事件；
      this.$emit('sysNoticeShow');
      this.userVisible = false;
    },
    updatePwd() {
      // 修改密码
      // this.$parent.visibleEdit = true;
      this.$emit('updatePwdShow');
      // this.$store.commit("SET_OPERATSTATE", '');
      this.userVisible = false;
    },
  },
};
</script>
<style scoped>
.userinfo {
  color: #ffffff;
  height: 38px;
  font-size: 16px;
  position: relative;
}
.userinfo .icon {
  position: absolute;
}
.userInfoRight {
  text-align: right;
  padding-right: 30px;
}
.userinfo .DHC-yonghu {
  padding-top: 4px;
  float: left;
  font-size: 30px;
}
.userinfo span {
  line-height: 38px;
}
.userName {
  position: relative;
  width: 150px;
  margin-left: 15px;
  height: 38px;
  display: inline-block;
}
.userName a {
  width: 150px;
  display: inline-block;
  /* width: auto; */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.triangle {
  position: absolute;
  top: 12px;
  margin-left: 5px;
}

.userinfo span img {
  vertical-align: middle;
}

.el-popper ul {
  width: 110px;
  margin: 0 auto;
}

.el-popper ul li {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  padding: 5px 0 5px 10px;
}

.el-popper ul li:last-child {
  border: none;
}

.el-popper ul li i {
  display: block;
  float: left;
  font-size: 24px;
  padding-right: 5px;
}
</style>
<style>
/* .popperStyle{
    background-color: #a0b5de!important;
    padding: 0!important;
    border: none;
}
.popperStyle[x-placement^="top"] .popper__arrow::after{
    border-top-color: #a0b5de;
} */
.popperStyle .popper__arrow {
  left: 34.5px !important;
}
.popperStyle,
.homePopperStyle {
  width: 150px !important;
  padding: 3px !important;
  border-radius: 10px;
}
</style>
