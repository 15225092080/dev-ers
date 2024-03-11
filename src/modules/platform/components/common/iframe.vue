<template>
  <el-card class="iframeCard">
    <iframe :src="src"
            width="100%"
            :height="height"
            frameborder="0"
            ref="iframe"
            name="_blank"
            id="_blank"></iframe>
  </el-card>
</template>

<script>
import Bus from '@/common/script/bus';
export default {
  components: {},
  data() {
    return {
      height: '',
      src: sessionStorage.iframeLink,
    };
  },
  watch: {
    $route: {
      handler: function () {
        window.top.eventBus.$emit('tagShow', true);
      },
      deep: true,
    },
  },
  methods: {
    iframeSrc(path) {
      let t = this;
      // let type = process.env.NODE_ENV;
      // if (type === 'development') {
      //   // 规则为arr[0]为iframe,arr[1]为项目名，arr[2]为模块名。
      //   let arr = path.split('/');
      //   t.src = arr[1] + '#/' + arr[2];
      // } else {
      // 没看出来一定要区分开发和生产环境的必要性，因为监管3.0配置页面嵌入平台3.0时，
      // iframe的路径无法去掉platform导致页面出不来,所以统一添加'/'
      let arr = path.split('/');
      t.src = '/' + arr[1] + '/#/' + arr[2];
      // }
    },
  },
  // beforeCreate(){
  //   let t = this;
  //   let type = process.env.NODE_ENV;
  //   Bus.$on("iframeSrc",function(index){
  //     if(type === "development"){
  //               // t.src =  ;
  //       // 规则为arr[0]为iframe,arr[1]为项目名，arr[2]为模块名。
  //       let arr = index.split("/");
  //       t.src = arr[1]+"#/"+arr[2];
  //     }else{
  //       t.src = index.replace("iframe","");
  //     }
  //   });
  // },
  created() {
    window.top.eventBus.$emit('tagShow', true);
    this.iframeSrc(sessionStorage.iframeLink);
    let t = this;
    Bus.$on('iframeSrc', function (index) {
      t.iframeSrc(index);
    });
    this.height = window.innerHeight - 150;
  },
  mounted() {},
  destroyed() {
    Bus.$off('iframeSrc');
  },
};
</script>

<style>
.el-card.iframeCard,
.iframeCard .el-card__body {
  padding: 0;
  box-shadow: none;
}
.iframeCard,
.iframeCard > .el-card__body,
.iframeCard iframe {
  height: 100%;
}
</style>

