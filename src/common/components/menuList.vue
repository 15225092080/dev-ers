<template>
    <div>
      <template v-for="item in menuData">
        <template v-if="item.children">
          <el-submenu :index="item.params.resourceId" :key="item.params.resourceId">
            <template slot="title">
              <i class="icon DHCiconfont" :class="'DHC-'+item.params.icon"></i>
              <span slot="title">{{ item.params.resourceName }}</span>
            </template>
            <!-- <template v-for="subItem in item.children">
              <el-submenu v-if="subItem.children" :index="subItem.params.url" :key="subItem.params.url">
                <template slot="title">{{ subItem.params.resourceName }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="threeItem.params.url"
                >{{ threeItem.params.resourceName }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.params.url" :key="subItem.params.url">{{ subItem.params.resourceName }}</el-menu-item>
            </template> -->
            <menuList :menuData='item.children'></menuList>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.params.url" :key="item.index">
            <i class="icon DHCiconfont" :class="'DHC-'+item.params.icon"></i>
            <span slot="title">{{ item.params.resourceName }}</span>
          </el-menu-item>
        </template>
      </template>
    </div>
</template>

<script>
export default {
  components: {},
  name: 'menuList',
  data() {
    return {};
  },
  computed: {},
  props: {
    menuData: {
      type: Array
    }
  },
  methods: {},
  created() {},
  mounted() {}
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
    display: flex;
    padding: 10px 0;
    width: 150px;
    margin: 0 auto;
    border-bottom: 1px solid #78ACFC;
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
/* .sidebar-el-menu{

} */
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
    bottom: 3px;
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
