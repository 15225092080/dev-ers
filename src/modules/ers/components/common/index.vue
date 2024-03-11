<template>
  <div class="wrapper">
    <!-- <v-head></v-head> -->
    <!-- <v-tags></v-tags> -->
    <v-sidebar></v-sidebar>
    <div class="content-box"
         :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <!-- <v-baerdcrumb></v-baerdcrumb> -->
      <div class="content">
        <transition name="move"
                    mode="out-in">
          <keep-alive :include="tagsList"
                      :exclude="notCache">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
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
      if (
        !newVal.meta.keepAlive &&
        this.notCache.indexOf(newVal.fullPath.substr(1)) == -1
      ) {
        this.notCache.push(newVal.fullPath.substr(1));
      }
    },
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    vFooter, //, vBaerdcrumb
  },
  created() {
    // Bus.$on('collapse', msg => {
    //     this.collapse = msg;
    // })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    Bus.$on('tags', (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].path && arr.push(msg[i].path.substr(1));
      }
      this.tagsList = arr;
    });
  },
  mounted() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    Bus.$on('collapse', (msg) => {
      this.collapse = msg;
    });
  },
};
</script>


