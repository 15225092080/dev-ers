<template>
  <div class="left-steps">
    <el-button size="mini"
               type="warning"
               icon="el-icon-back"
               @click="goBack">返回</el-button>
    <!-- <el-button
        size="mini"
        type="warning"
        icon="el-icon-back"
        @click="()=>{$store.commit('SET_OPERATSTATE',''),$router.push({path: param.routerReturn})}"
      >返回</el-button> -->
    <el-steps :space="60"
              direction="vertical"
              :active="param.active"
              process-status="finish"
              finish-status="wait">
      <el-step v-for="(item, index) in itemData"
               :key="item.title"
               :title="item.title"
               @click.native="jump(index)"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      itemData: '',
    };
  },
  mounted: function () {},
  computed: {
    item() {
      return this.itemList;
    },
  },
  watch: {
    itemList: {
      handler(newValue, oldValue) {
        this.itemData = [];
        for (let i = 0; i < newValue.length; i++) {
          if (!newValue[i].hidden) {
            // newValue.splice(i,1)
            this.itemData.push(newValue[i]);
          }
        }
        // this.itemData = newValue;
      },
      deep: true,
    },
  },
  props: {
    itemList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    param: {
      type: Object,
      default: function () {
        return { active: 0 };
      },
    },
  },
  created() {
    this.itemData = this.itemList;
  },
  methods: {
    goBack() {
      if (this.$store.getters.operatState == 'add') {
        window.reload();
      }
      if (
        this.$route.fullPath.slice(0, this.$route.fullPath.indexOf('=')) ==
          '/erg-edit?custId' ||
        this.$route.fullPath.slice(0, this.$route.fullPath.indexOf('=')) ==
          '/erh-edit?custId' ||
        this.$route.fullPath.slice(0, this.$route.fullPath.indexOf('=')) ==
          '/eri-edit?custId'
      ) {
        this.$router.push({
          path: '/era-rateTab-edit',
          query: this.$route.query,
        });
      } else if (this.$route.path == '/era-rateTab-edit') {
        this.$router.push({ path: '/era-rateTab' });
      } else {
        this.$router.push({ path: this.$router.go(-1) });
      }
      this.$store.dispatch('user/setOperatState', 'edit');
    },
    smoothDown(distance, total, step) {
      if (distance < total) {
        distance += step;
        // Firefox
        document.documentElement.getElementsByClassName(
          'content'
        )[0].scrollTop = distance;
        // Chrome
        //   document.body.scrollTop = distance
        let _this = this;
        setTimeout(function () {
          _this.smoothDown(distance, total, step);
        }, 10);
      } else {
        document.documentElement.getElementsByClassName(
          'content'
        )[0].scrollTop = total;
        //   document.body.scrollTop = total
        window.pageYOffset = total;
      }
    },
    smoothUp(distance, total, step) {
      if (distance > total) {
        distance -= step;
        // Firefox
        document.documentElement.getElementsByClassName(
          'content'
        )[0].scrollTop = distance;
        // Chrome
        //   document.body.scrollTop = distance
        let _this = this;
        setTimeout(function () {
          _this.smoothUp(distance, total, step);
        }, 10);
      } else {
        document.documentElement.getElementsByClassName(
          'content'
        )[0].scrollTop = total;
        //   document.body.scrollTop = total
        window.pageYOffset = total;
      }
    },
    jump(index) {
      // 用 class="d_jump" 添加锚点
      this.param.active = index;
      let jump = document.querySelectorAll('.d_jump');
      let total = jump[index].offsetTop - 60;
      let distance =
        document.documentElement.getElementsByClassName('content')[0].scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        this.smoothDown(distance, total, step);
      } else {
        let newTotal = distance - total + 100;
        step = newTotal / 50;
        this.smoothUp(distance, total, step);
      }
    },
  },
};
</script>

<style>
.left-steps {
  margin: 20px 0 0 0;
}
.left-steps .el-steps {
  margin: 20px 0 0 0;
}
.left-steps .el-step__head {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.left-steps .el-step__title {
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
}

.left-steps .el-step__icon {
  line-height: 20px;
  font-size: 12px;
}

.left-steps .el-step.is-vertical .el-step__main {
  padding-left: 8px;
}

.left-steps .el-step__line.is-vertical {
  top: 24px;
  left: 11px;
}

/*设置步骤条样式*/
/* 步骤条左右布局 */
.v_collapse {
  width: 85%;
}
.collapseWidth {
  width: 100%;
}
.left-steps {
  position: fixed;
  top: 80px;
  right: 80px;
}
/*pc*/
@media screen and (max-width: 1500px) {
  .left-steps {
    position: fixed;
    top: 80px;
    right: 30px;
  }
}
</style>
