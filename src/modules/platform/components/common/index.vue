<template>
  <div class="wrapper">
    <v-sidebar></v-sidebar>
    <div class="content-box"
         :style="{bottom:setBottom}"
         :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content"
           :style="{height:setHeight}">
        <!-- <transition name="fade-transform" mode="out-in"> 这种写法是会导致错误要分开写
          <keep-alive :include="tagsList" >
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>-->
        <!--缓存页面需要的动画效果 -->
        <transition name="fade-transform"
                    mode="out-in">
          <keep-alive :include="tagsList"
                      :exclude="notCache">
            <router-view v-if="$route.meta.hasPageKey"
                         :key="$route.fullPath"></router-view>
            <router-view v-else></router-view>
          </keep-alive>
        </transition>
      </div>
      <!-- <v-footer></v-footer> -->
    </div>
  </div>
</template>

<script>
// import Velocity from 'velocity-animate';  //'Velocity' is defined but never used
import vHead from '@/common/components/Header.vue';
import vSidebar from '@/common/components/Sidebar.vue';
// import vSidebar  from '@/common/components/Sidebars'
import vTags from '@/common/components/Tags.vue';
// import vBaerdcrumb from '@/common/components/breadcrumb.vue';
import vFooter from '@/common/components/Footer';
import Bus from '@/common/script/bus';
export default {
  name: 'Layout',
  data() {
    return {
      tagsList: [],
      collapse: false,
      notCache: [],
    };
  },
  watch: {
    $route(newVal) {
      if (!newVal.meta.keepAlive && this.notCache.indexOf(newVal.fullPath.substr(1)) == -1) {
        this.notCache.push(newVal.fullPath.substr(1));
      }
    },
  },
  computed: {
    setHeight() {
      let height;
      if (this.$store.getters.tagStatus) {
        height = '95%';
      } else {
        height = '100%';
      }
      return height;
    },
    setBottom() {
      let bottom;
      if (this.$store.getters.tagStatus) {
        bottom = '5px';
      } else {
        bottom = '8px';
      }
      return bottom;
    },
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    vFooter, //, vBaerdcrumb
  },
  created() {},
  mounted() {
    let that = this;
    Bus.$on('tags', (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].path && arr.push(msg[i].path.substr(1));
      }
      that.tagsList = arr;
    });
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    Bus.$on('collapse', (msg) => {
      this.collapse = msg;
    });
  },
};
</script>


