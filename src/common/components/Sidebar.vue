<template>
  <div class="sidebar" :class="{'sidebarIe':isIe}">
    <div class="sidebarHeader">
        <div>
            <i class="header-icon DHCiconfont" :class="systemName.icon"></i>
            <span>{{systemName.resourceName}}</span>
            <el-popover
                placement="bottom"
                popper-class="modalSystem"
                v-model="visible"
                transition=""
                >
                    <ul style="list-style:none">
                        <li v-for="(item,index) in system" :class="'modalLi'+system.length" :key="index" @click="jumpPath(item.url,item.systemId)"><i class="icon DHCiconfont" :class="item.icon" :style="'background:'+item.bgColor"></i>{{item.resourceName}}</li>
                    </ul>
                <i slot="reference" class="header-icon DHCiconfont DHC-caidan"></i>
            </el-popover>
        </div>
      </div>
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#3075c7"
      text-color="#fff"
      active-text-color="#3075c7"
      unique-opened
      @select="handselect"
    >
    <menu-list :menuData="roles"></menu-list>
      <!-- <template v-for="item in roles">
        <template v-if="item.children">
          <el-submenu :index="item.params.url" :key="item.params.url">
            <template slot="title">
              <i class="icon DHCiconfont" :class="'DHC-'+item.params.icon"></i>
              <span slot="title">{{ item.params.resourceName }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.params.url" :key="subItem.params.url">
                <template slot="title">{{ subItem.params.resourceName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.params.url"
                >{{ threeItem.params.resourceName }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.params.url" :key="subItem.params.url">{{ subItem.params.resourceName }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.params.url" :key="item.index">
            <i class="icon DHCiconfont" :class="'DHC-'+item.params.icon"></i>
            <span slot="title">{{ item.params.resourceName }}</span>
          </el-menu-item>
        </template>
      </template> -->

    </el-menu>
    <div class="footerUser">
        <v-user @updatePwdShow="updatePwdShow"  @sysNoticeShow="sysNoticeShow" :userParam="userParam"></v-user>
    </div>
    <!-- 系统公告组件 -->
    <sys-notice v-if="visibleNotice" :show.sync="visibleNotice" :noticeParam="noticeParam"></sys-notice>
    <!-- 修改密码组件 -->
    <update-pwd  v-if="visibleEdit" :vis.sync="visibleEdit"></update-pwd>
  </div>
</template>

<script>
import Bus from '../script/bus';
import vUser from '@/modules/platform/components/common/user.vue';
import {menuObj} from '../../common/script/menu';
import sysNotice from '@/modules/platform/components/view/system-message/model/sysNotice';
import updatePwd from '@/modules/platform/components/common/updatePwd';
import { mapGetters } from 'vuex';
import menuList from './menuList';
export default {
  components: {
    vUser,
    sysNotice,
    updatePwd,
    menuList
  },
  name: '',
  data() {
    return {
      systemName: {},
      isIe: '',
      visible: false,
      system: [],
      visibleNotice: false,
      collapse: false,
      visibleEdit: false,
      items: [],
      aaa: 0,
      falg: true,
      userParam: {
        username: localStorage.getItem('ms_username'),
        bottomTriangle: false,
        popperStyle:'popperStyle'
      },
      noticeParam: {
        openMode: 'clickHideNotice', // 关闭弹出层方式 点击关闭
        noticeList: []
      }
    };
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    handselect(index) {
      // let name = this.search(this.items, index);
      let name = '';
      if (window.event.path) {
        name = window.event.path[0].innerText;
        name = encodeURI(name);
      } else {
        name = window.event.srcElement.innerText.trim();
      }

      if (index.indexOf('iframe') > -1) {
        // 因为ie的iframesrc的值改变不刷新页面，所以判断在ie浏览器的时候先跳转一个空路由
        if (this.common.BrowserType().indexOf('IE') == -1) {
          this.$router.push({
            path: '/iframe',
            query: {
              name: name,
              index: index
            }
          });
          Bus.$emit('iframeSrc', index);
        } else {
          this.$router.push({path: '/blank', query: {index: index, name: name}});
        }

        sessionStorage.iframeLink = index;
      } else {
        this.$router.push('/' + index);
      }
    },
    // search(items, index) {
    //   for (var i = 0; i < items.length; i++) {
    //     if (items[i].children) {
    //       for (var j = 0; j < items[i].children.length; j++) {
    //         if (items[i].children[j].children) {
    //         } else {
    //           if (items[i].children[j].index == index) {
    //             return items[i].children[j].name;
    //           }
    //         }
    //       }
    //     } else {
    //       if (items[i].index == index) {
    //         return items[i].name;
    //       }
    //     }
    //   }
    // },
    sysNoticeShow() {
      // 请求公告数据
      this.http.apiGet(this.$commonUrl.notice.getHome, null, {
        showLoading: true
      }).then((res) => {
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
    updatePwdShow() {
      this.$store.dispatch('user/setOperatState', '');
      this.visibleEdit = true;
    },
    jumpPath(path, systemId) {
      // 切换系统的时候缓存系统id
      if (!path) {
        return this.common.MessageBoxalert('未配置当前项目路径', '消息', '确认', 'error').then(() => {});
      }
      if (systemId == sessionStorage.getItem('systemId')) {
        this.visible = false;
        return false;
      }
      sessionStorage.setItem('systemId', systemId);
      window.location.href = window.location.origin + '/' + path + '#/';
      //  this.$store.dispatch('user/changeRoles')
      return true;
    },
    // 获取当前系统的行政区域数据，存在session中
    getArea() {
      let systemId = sessionStorage.getItem('systemId');
      // 判断缓存中是否有行政区域数据，若无则调接口请求
      if (!sessionStorage.getItem(systemId + '_getArea')) {
        this.http.apiGet(this.$urlList.common.getArea, {params: {typeId: 'T_MB_0001'}}).then((res) => {
          if (res.data && res.data.length) {
            sessionStorage.setItem(systemId + '_getArea', JSON.stringify(res.data));
          }
        });
      }
    }
  },
  async created() {
    this.$store.dispatch('user/changeRoles');
    await this.http.apiGet(this.$commonUrl.home.systemList).then((res) => {
      if (res.code == '0') {
        // 如果没有跳主页，就在这缓存系统id
        if (res.data.length == 1 && !sessionStorage.getItem('systemId')) {
          sessionStorage.setItem('systemId', res.data[0].systemId);
        }
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].icon) {
            let iconColor = res.data[i].icon.split('#');
            res.data[i].icon = iconColor[0];
            res.data[i].bgColor = '#' + iconColor[1];
          } else {
            res.data[i].icon = 'DHC-xitongmoren';
            res.data[i].bgColor = '#00a4ff';
          }
        }
        this.system = res.data;
      }
      if (sessionStorage.getItem('systemId')) {
        this.system.forEach((item) => {
          for (let k in item) {
            if (k == 'systemId' && item[k] == sessionStorage.getItem('systemId')) {
              this.systemName = item;
            }
          }
        });
      }
    });
    // let param = {
    //     params: {
    //         systemId:sessionStorage.getItem('systemId')
    //     }
    //   }
    // await this.http.apiGet(this.$urlList.common.menu,param).then(res => {
    //     //this.items = res.data;
    // });
  },
  mounted() {
    // 获取当前系统行政区域数据
    this.getArea();
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      this.isIe = true;
    } else {
      this.isIe = false;
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  margin-bottom: 38px;
  margin-top: 49px;
  /* z-index: 99; */
}
.sidebarIe{
    margin-top: 47px;
}
.sidebarHeader{
    position: fixed;
    top: 3px;
    left: 5px;
    width: 220px;
    background: #3075c7;
    border-radius: 5px 5px 0 0;
    border-bottom:1px solid #78ACFC;
    /* line-height: 50px; */
}
.sidebarHeader div{
    display: table;
    padding: 10px 0;
    margin: 0 auto;
}
.sidebarHeader div > *{
    display: inline-block;
}
.sidebarHeader div span{
    display: inline-block;
    color: #dbe6f8;
    font-size: 15px;
    margin-left: 13px;
    /* margin-right: 30px; */
}
.sidebarHeader>div>i:first-child{
    color: #3075c7;
}
.sidebarHeader div i:last-child{
    background: none;
}
.header-icon{
    height: 20px;
    width: 20px;
    color: #fff;
    background: #fff;
    font-size: 20px;
    border-radius: 3px;
}
.sidebarHeader div .sidebar-icon{
    margin-left: 15px;
}
.Handover{
    width: 15px;
    height: 15px;
    margin-left: 32px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu{
 z-index:99;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}

.sidebar-el-menu .icon{
    color: #fff;
}
.sidebar > ul {
  height: 100%;
}

.icon {
  font-size: 24px;
  margin-right: 3px;
}
.el-menu-item.is-active{
    color: #ffffff!important;
    border-left: 3px solid #0ce5ff;
    background-color: #265ba7!important;
}
.footerUser{
    height: 38px;
    width: 180px;
    position: fixed;
    left: 5px;
    bottom: 10px;
    background: #3075c7;
    padding: 0 20px;
    border-radius: 0 0 5px 5px;
    /* border-top: 1px solid #78ACFC; */
}
.modalSystem ul{
    list-style: none;
    width: 350px;
}

.modalSystem ul li{
    float: left;
    width: 25%;
    text-align: center;
}
.modalSystem ul li.modalLi1{
    width: 100%;
}
.modalSystem ul li.modalLi2{
    width: 50%;
}
.modalSystem ul li.modalLi3{
    width: 33%;
}
.modalSystem ul li.modalLi4{
    width: 25%;
}
.modalSystem ul li i{
    display:block;
    width: 36px;
    height: 36px;
    background: #1c97dd;
    color: #fff;
    font-size: 36px;
    line-height: 36px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 8px;
    margin-top: 10px;
}
.sidebar .item-menu{
    left: 5px;
}
</style>
