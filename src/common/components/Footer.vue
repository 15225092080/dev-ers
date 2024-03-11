<template>
    <div class="footer">
        <span>Copyright©2018-2027 All Rights Reserved 版权所有:东华软件股份公司</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <span>版本号：{{version}}</span> -->
    </div>
</template>
<script>
import Bus from '../script/bus';
export default {
  data() {
    return {
      version: '',
      active: sessionStorage.getItem('id')
    };
  },
  watch: {
    active: function () {
      // 监听过滤条件伸缩状态
      // if (newVal == "30000000") {
      //   this.getVersionnubmer(this.$creditEnUrl.common.versionNumber);
      // } else if (newVal == "20000000") {
      //    this.getVersionnubmer(this.$creditPerUrl.common.versionNumber);
      // } else {
      //    this.getVersionnubmer(this.$urlList.user.versionNumber);
      // }
    }
  },
  methods: {
    getVersionnubmer(url) {
      this.http.apiGet(url).then(res => {
        if (res.code == '00000001') {
          res = '';
        }
        this.version = res;
      });
    }
  },
  created() {
    Bus.$on('sysNo', msg => {
      this.active = msg;
      //    if (this.active == "30000000") {
      //       this.getVersionnubmer(this.$creditEnUrl.common.versionNumber);
      //     } else if (this.active == "20000000") {
      //        this.getVersionnubmer(this.$creditPerUrl.common.versionNumber);
      //     }else {
      //        this.getVersionnubmer(this.$urlList.user.versionNumber);
      //     }
    });
  }
};
</script>
