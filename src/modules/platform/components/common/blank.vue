<template>
  <div>
    <h1></h1>
  </div>
</template>

<script>
import Bus from '@/common/script/bus';
export default {
  data() {
    return {};
  },
  created() {
    this.$router.push({
      path: '/iframe',
      query: {
        name: this.$route.query.name,
        index: this.$route.query.index,
      },
    });
    Bus.$emit('iframeSrc', this.$route.query.index);
    //   let url = this.$route.query;
    //   let str = '';
    //   for(let i in url) {
    //     str += url[i];
    //   }
    //   const path = this.$route.query;
    //   this.$router.push({
    //     path: str,
    //   });
  },
};
</script>


<style scoped>
</style>
