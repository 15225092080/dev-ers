<template>
  <div class="sidebar">

    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#393D49"
      text-color="#fff"
      active-text-color="#3075c7"
      unique-opened
      @select="handselect"
    >
    <div class="sidebarHeader">
        <div>
            <img class="sidebar-icon" src="../../assets/images/common/icon.png">
            <span>系统管理</span>
            <img class="Handover" src="../../assets/images/common/sidebar.png">
        </div>
      </div>
      <template v-for="item in items">
        <template v-if="item.children">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i class="icon DHCiconfont" :class="'DHC-'+item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i class="icon DHCiconfont" :class="'DHC-'+item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Bus from "../script/bus";

export default {
  data() {
    return {
      collapse: false,
      items: [],
      aaa: 0,
      falg:true
    };
  },
  methods: {
    handselect(index, keyPath) {
      let name = this.search(this.items, index);
      // 兼容非vue组件，通过改变iframe的src属性实现跳转
      if (index.indexOf("-") < 0 ) {
         this.$router.push({
            path: "/iframe",
            query: {
              name: name,
              index:index
            }
          });
         sessionStorage["iframeLink"] = index;
         Bus.$emit("iframeSrc",index);
      }else{
        this.$router.push("/" + index);
      }
    },
    search(items, index) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].children) {
          for (var j = 0; j < items[i].children.length; j++) {
            if (items[i].children[j].children) {
            } else {
              if (items[i].children[j].index == index) {
                return items[i].children[j].name;
              }
            }
          }
        } else {
          if (items[i].index == index) {
            return items[i].name;
          }
        }
      }
    }
  },
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace("/", "");
    // }
  },
  created() {
    let urlList = this.$urlList; //读取接口文件
    this.$router.options.routes[0].children.forEach((items,index) => {
        if(items.path.indexOf('system') >= 0  && !items.meta['projectId']){
            items.meta['projectId'] = 10000000;
        }else if(items.path.indexOf('creditper') >= 0 && !items.meta['projectId']){
            items.meta['projectId'] = 20000000;
            if(items.children){
                for(var i = 0; i <items.children.length; i++){
                    items.children[i].meta['projectId'] = 20000000;
                }
            }
        }else if(items.path.indexOf('crediten') >= 0 && !items.meta['projectId']){
            items.meta['projectId'] = 30000000;
            if(items.children){
                for(var k = 0; k <items.children.length; k++){
                    items.children[k].meta['projectId'] = 30000000;
                }
            }
        }
    });
    Bus.$on("sysNo", msg => {
      this.sysNo = msg;
      let paramData = {
        params: {
          sysNo: this.sysNo
        }
      };

      this.http.apiGet(urlList.common.menu, paramData).then(res => {
        this.items = res;
        //添加结构化入库管理子菜单
        // let reportStructuredLogPer = {
        //   icon: "gerenyiyiguanli",
        //   id: "20030107",
        //   index: "creditper-reportStructuredLog",
        //   name: "结构化入库管理",
        //   pid: "20030000"
        // };
        // let reportStructuredLogEn = {
        //   icon: "gerenyiyiguanli",
        //   id: "30030107",
        //   index: "crediten-reportStructuredLog",
        //   name: "结构化入库管理",
        //   pid: "30030000"
        // };
        // if(this.sysNo =="20000000"){
        //   res[0].children.push(reportStructuredLogPer);
        // }else if(this.sysNo =="30000000"){
        //   res[0].children.push(reportStructuredLogEn);
        // }
        // console.log(res);
        // let per = {
        //   icon: "gerenjianguanyewucanshu",
        //   id: "2005010111",
        //   index: "creditper-exceptionRule",
        //   name: "异常阻断查询",
        //   pid: "20050000"
        // };
        sessionStorage['menuData'+ msg] = JSON.stringify(res);
        let routeIndex;
        // if(res[0]){
        //     routeIndex = res[0].index;
        // }else if(res[0].children){
        //     routeIndex = res[0].children[0].index;
        // }else if(res[0].children[0].children){
        //     routeIndex = res[0].children[0].children[0].index;
        // }
        // sessionStorage[routeIndex.split('-')[0]] = JSON.stringify(res);
        // this.storedictionary(res,msg);
      });
    });
  },
  mounted() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    Bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  destroyed() {
            /**
             * Bus这个事件需要解绑，要不然路由切换回缓存之前的调用
             */
            Bus.$off('sysNo')
    }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 8px;
  overflow-y: scroll;
}
.sidebarHeader{
    height: 80px;
    background: #263747;
    line-height: 80px;
}
.sidebarHeader div span{
    display: inline-block;
    color: #dbe6f8;
    margin-left: 7px;
}
.sidebarHeader div .sidebar-icon{
    margin-left: 15px;
}
.sidebarHeader div img{
    /* line-height: 38px; */
    vertical-align: middle
}
.Handover{
    width: 15px;
    height: 15px;
    margin-left: 32px;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}

.sidebar > ul {
  height: 100%;
}

.icon {
  font-size: 24px;
  margin-right: 3px;
}
</style>
