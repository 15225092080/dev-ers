<template>
    <el-card>
            <span>
              <i class="el-icon-lx-filter"></i>筛选条件
            </span>
            <ul class="icongroup_header icongroup">
              <li @click="col">
                <i class="el-icon-caret-top" v-if="show"></i>
                <i class="el-icon-caret-bottom" v-else></i>
              </li>
              <li>
                <i class="el-icon-refresh" @click="refresh"></i>
              </li>
              <li>
                <i class="el-icon-close" @click="del"></i>
              </li>
            </ul>
          </el-card>
</template>
<script>
import Bus from '@/common/script/bus';
export default {
  data() {
    return {
      show: true,
      secondshow: true
    };
  },
  props: ['post'],
  methods: {
    refresh() {
      // this.$emit('toParent') //调用父组件toParent方法，并传递参数
      Bus.$emit('init');
    },
    col() {
      this.show = !this.show;
      this.$emit('update:showmsg', this.show);
    },
    del() {
      this.secondshow = !this.secondshow;
      this.$emit('update:secondshowmsg', this.secondshow);
    }
  },
  created() {
    // console.log(this.post)
  }
};
</script>
