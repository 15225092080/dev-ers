<template>
  <div id="app"
       :class="['/login','/homePage'].indexOf($route.path)!=-1?'ui-overflow-x':''">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    // 把vue组件的methods方法绑定到window
    window.reload = (val) => {
      this.reload(val);
    };
    // location.origin在ie中的兼容性处理
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
  },
};
</script>

<style>
/* @import "../static/css/main.css"; */
@import '../../assets/style/color-dark.css'; /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>
