<template>
  <div class="breadcrumb-box">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <p class="weizhi"><b>当前位置：</b></p>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
// import pathToRegexp from 'path-to-regexp'
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      levelList: null,
      show: true
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      // console.log(matched)
      const first = matched[0];

      if (!this.ishome(first)) {
        matched = [].concat(matched);
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
      // console.log(this.levelList)
    },
    ishome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase();
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  padding: 10px 10px;
  width: 100%;

}
.weizhi {
    float: left;
    color: #aeaeae;
    font-size: 14px;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
