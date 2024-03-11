<template>
        <div>
            <el-card class="searchBody">
                <div ref="filter" slot="header" class="clearfix">
                    <span class="leftFont">
                        <i class="DHCiconfont">&#xe666;</i>检索条件
                    </span>
                    <span class="icongroup_header icongroup">
                        <slot name="searchBtn"></slot>
                        <el-button @click="queryPageForm" v-if="!hideBtn.queryBtn" class="search_btn"><i class="DHCiconfont">&#xe6b1;</i>检索</el-button>
                        <el-button @click="cancleForm" v-if="!hideBtn.clearBtn" class="empty_btn"><i class="DHCiconfont">&#xe69e;</i>清空</el-button>
                    </span>
                </div>
                <v-form ref="formItem" :search="true" v-bind:arrList="arrList" :labelWidth="labelWidth" @eventChange="eventChange"></v-form>
            </el-card>
        </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      show: true,
      secondshow: true
    };
  },
  props: {
    arrList: {
      type: Array
    }, // 跨域请求标志
    labelWidth: {
      type: String
    },
    searchFun: {
        type: Function
    },
    hideBtn: {
      type: Object,
      default: function () {
        return {queryBtn:false,clear:false}
      }
    }
  },
  methods: {
    refresh() {
      // this.$emit('toParent') //调用父组件toParent方法，并传递参数
      window.reload();
    },
    queryPageForm() {
        if(this.searchFun){
            this.searchFun();
            return;
        }
        this.$refs.formItem.queryPageForm();
    },
    cancleForm() {
      this.$refs.formItem.cancleForm();
    },
    eventChange(obj) { // 下拉change事件
      this.$emit('eventChange', obj);
    }
  },
  created() {
    let filter = ['daterange'];// 如果以后有不同类型再往里加
    this.arrList.forEach((item) => {
      item.forEach((element) => {
        if (!filter.includes(element.type)) {
          element.rule = [{max: 512, message: '长度不超过512位', trigger: 'blur'}];
        }
      });
    });
  }
};

</script>
<style scope="less">
    .searchBody .el-card__header,.searchBody .el-card__body{
        padding: 15px;
    }
    .leftFont{
        height: 36px;
        line-height: 36px;
        text-align: -moz-center !important;
        text-align: center;
        vertical-align: middle;
    }
    .leftFont i{
        font-size: 30px;
        vertical-align: middle;
    }

</style>
