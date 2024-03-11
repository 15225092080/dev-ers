<template>
    <!-- <div class="login"> -->
    <el-row :gutter="20">
        <div class="navbar">
            <div class="right-menu">
                <el-col :lg="6" :xl="4" class="bg-purple">
                    <div class="login">
                        <img src="@/assets/images/platform/index/logo1.png">
                    </div>
                </el-col>
                <el-col :lg="12" :xl="16" class="bg-purple-light">
                    <div class="header_nav">
                        <ul>
                            <li v-for="todo in Menudata" :key="todo.id">
                                <a @click="menurouter(todo.id)" :class="{'active':todo.id==active}">{{ todo.name }}</a>
                            </li>
                            <!-- <li><a href="#">系统管理</a></li>
                            <li><a href="#">系统管理</a></li>
                            <li><a href="#">系统管理</a></li>
                            <li><a href="#">系统管理</a></li>
              <li><a href="#">系统管理</a></li>-->
                        </ul>
                    </div>
                </el-col>
                <el-col :lg="3" :xl="2">
                    <div class="userinfo">
                        <span style="cursor:pointer;" @click="modifyinformation">
                            <span>
                                <img src="@/assets/images/platform/login/header_user.png">
                            </span>
                            <span class="userName">{{username}}</span>
                        </span>
                    </div>
                </el-col>
                <el-col :lg="3" :xl="2">
                    <div class="header_right">
                        <ul>
                            <li>
                                <a href="#" @click="routerhome">
                                    <i class="el-icon-lx-home" style="font-size: 21px;color: #ffffff"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" id="password" @click="Changepassword">
                                    <img src="@/assets/images/platform/login/header_icon1.png">
                                </a>
                            </li>
                            <!-- <li><a href="#"><img src="../../../images/login/header_icon2.png"></a></li> -->
                            <li>
                                <a href="#" @click="loginout">
                                    <img src="@/assets/images/platform/login/header_icon3.png">
                                </a>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <!--<div class="header_rig_box"></div> -->
                <modify-Information v-bind:param="param" ref="mychild"></modify-Information>
                <change-password ref="changepwd"></change-password>
            </div>
        </div>
        <vTags></vTags>
    </el-row>
</template>
<script>
    import Bus from '../script/bus'
    import modifyInformation from "../../modules/platform/components/common/information";
    import vTags from "./Tags.vue";
    export default {
        components: {
            modifyInformation,
            vTags
        },
        data() {
            return {
                param: {
                    visible: false
                },
                fullscreen: false,
                name: "linxin",
                message: 2,
                username: "",
                Menudata: [],
                firstid: "",
                active: ""
            };
        },
        methods: {
            modifyinformation() {
                this.param.visible = true;
                this.$refs.mychild.init();
            },
            loginout() {
                this.http.apiGet(this.$urlList.login.logout).then(res => {
                    if (res.code == "00000000") {
                        localStorage.removeItem("ms_username");
                        this.$router.push("/login");
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                Bus.$emit("collapse", this.collapse);
            },
            // 全屏事件
            handleFullScreen() {
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
            Changepassword() {
                this.$refs.changepwd.change_dialog = true;
            },
            menurouter(id) {
                if (sessionStorage.getItem("id") == id) {
                    return;
                }
                // this.$router.push("/dashboard");
                sessionStorage.setItem("id", id);
                // this.active = sessionStorage.getItem("id");
                // Bus.$emit("sysNo", this.active);
                this.Menudata[0].contextPath = "/creditper";
                this.Menudata[1].contextPath = "/crediten";
                this.Menudata[2].contextPath = "/platform";
                // 找后端改接口返回contextPath属性为项目前缀
                let href = "";
                for(let i=0;i<this.Menudata.length;i++){
                    if(id == this.Menudata[i].id){
                        href = this.Menudata[i].contextPath;
                    }
                }
                // END

                window.location.href = href;
                // 这是调用一次，session中存过就不会再请求了
            },
            routerhome() {
                this.$router.push("/dashboard");
            }
        },
        created() {
            this.http.apiGet(this.$urlList.common.getMenuRoot).then(res => {
                this.username = res.username;
                if (this.$store.state.login == true) {
                    this.Menudata = res.menu;
                    let isMenuId;
                    for (var k in res.menu) {
                        if (sessionStorage.getItem("id") && sessionStorage.getItem("id") == res.menu[k].id) {
                            isMenuId = true;
                        }
                    }
                    //  Bus.$emit("sysNo", res.menu[0].id); //首页加载报错\
                     sessionStorage.setItem("id", res.menu[2].id);
                    // if (!sessionStorage.getItem("id") && !isMenuId) {
                    //
                    // }else{
                    //     Bus.$emit("sysNo", sessionStorage.getItem("id"));
                    // }
                    this.Menudata[0].contextPath = "/creditper";
                    this.Menudata[1].contextPath = "/crediten";
                    this.Menudata[2].contextPath = "/";
                    // 找后端改接口返回contextPath属性为项目前缀
                    let href = "";

                    // if(){
                    //     href = this.Menudata[0].contextPath;
                    //     window.location.href = href;
                    // }
                    // END
                    sessionStorage.projectMenu = JSON.stringify(res.menu);
                    this.active = res.menu[2].id;
                    let id = "";
                    if(!sessionStorage.getItem("id")){
                        id = res.menu[2].id;
                    }else{
                        id = sessionStorage.getItem("id");
                    }
                    this.active = id;
                    Bus.$emit("sysNo", id);
                }
            });
            this.http.apiGet(this.$urlList.common.getNickByUserName).then(res => {
                window.nickByUserName = res;
            });
        },
        mounted() {
            Bus.$on('toHeader', HeaderId => {
                if (sessionStorage.getItem("id") == HeaderId) {
                    return;
                }
                sessionStorage.setItem("id", HeaderId);
                this.active = sessionStorage.getItem("id");
                Bus.$emit("sysNo", this.active);
            })
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
            this.http.apiGet(this.$urlList.user.currentUser).then(res => {
                window.userInfo = res
            });

        }
        //  mixins: [http]
    };

</script>
<style scoped>
    .navbar {
        border-radius: 0px !important;
        height: 62px;
        background: url(../../assets/images/platform/index/7.png);
        background-size: 100% 100%;
    }

    .header_nav li a.active {
        color: #fd971f;
    }

    .right-menu {
        height: 62px;
        background: url(../../assets/images/platform/index/header1.png) no-repeat;
    }

    .login {
        height: 62px;
    }

    .login img {
        margin-left: 30px;
    }

    .header_nav {
        height: 38px;
    }

    .header_nav>ul {
        display: block;
        list-style-type: none;
        line-height: 38px;
        padding-inline-start: 26px;
    }

    .header_nav li {
        float: left;
        color: #ffffff;
        font-size: 14px;
        margin-right: 25px;
    }

    .header_nav li a {
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
    }

    /* .header_nav li a:link{
      color: #
  }
  .header_nav li a:visited{
      color: #FF00FF
  } */
    .header_right {
        height: 38px;
    }

    .header_right>ul {
        display: block;
        list-style-type: none;
        margin-top: 10px;

        /* padding-inline-start: 26px; */
    }

    .userinfo {
        color: #ffffff;
        height: 38px;
        font-size: 14px;
    }

    .userinfo span {
        line-height: 38px;
    }

    .userinfo span img {
        vertical-align: middle;
    }

    /* .header_rig_box {
    float: right;
    }
  .header_rig_box span {
      float: left;
      display: block;
      color: #ffffff;
      line-height: 30px;
      margin-top: 5px;
      margin-right: 50px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
  }
  .header_rig_box span .userName {
      margin-top: 0px;
      margin-right: 10px;
      color: #FFFFFF;

  }
   .header_rig_box img {
      float: left;
      margin-right: 10px;
    } */
    /* .bg-purple-light{
        background: #39b5d4
    } */
    /* .bg-purple{
        background: #b9db20
    } */
    .header_nav li a.active {
        color: #FD971F;
    }

    .header_right li {
        float: left;
        margin-right: 15px;
        list-style: none;
    }

</style>
