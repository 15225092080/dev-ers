<template>
  <el-card class="iframeCard">
    <iframe
      :src="src"
      width="100%"
      :height="height"
      frameborder="0"
      name="_blank"
      id="_blank"
    ></iframe>
  </el-card>
</template>

<script>
import Bus from '@/common/script/bus';
export default {
  components: {},
  data() {
    return {
      height: '',
      src: sessionStorage.iframeLink
    };
  },
  computed: {

  },
  methods: {

  },
  created() {
    let t = this;
    Bus.$on('iframeSrc', function (index) {
      t.src = index;
    });
    this.height = window.innerHeight - 150;
  },
  mounted() {

  },
  destroyed() {
    // Bus.$off('iframeSrc');
  }
};
</script>

<style>
.el-card.iframeCard,.iframeCard .el-card__body{
    padding: 0;
    box-shadow:none;
}

</style>

