<template>
  <div>
    <el-card>
      <div class="headerStyle">
        <i class="icon DHCiconfont"
           :class="'DHC-'+$route.meta.icon"></i>
        <span style="color: #676767;">{{$store.getters.operatState=='add'?`机构管理-创建`:`机构管理-编辑`}}</span>
        <el-button class="back_btn"
                   style="float: right"
                   size="mini"
                   @click="()=>{
                    $store.dispatch('user/setOperatState',''),$router.push({path: '/system-org'})}"><i class="DHCiconfont">&#xe72c;</i>返回</el-button>
        <el-divider></el-divider>
      </div>
      <component :is=item.content
                 v-for="(item,index) in allComponents"
                 :key="index"></component>
    </el-card>
  </div>
</template>
<script>
import Bus from '@/common/script/bus.js';
import platformEdit from './platform-edit';
export default {
  name: 'system-org-edit',
  components: {
    platformEdit,
  },
  data() {
    return {
      allow: false,
      arrList: [],
      allComponents: [
        {
          content: 'platformEdit',
        },
      ],
      classObject: {
        inactive: true,
        active: false,
      },
    };
  },
  props: {
    paramEdit: {
      type: Object,
    },
  },
  methods: {},
  created() {},
  mounted() {
    Bus.$on('allow', (msg) => {
      this.allow = msg;
    });
  },
};
</script>
<style scoped lang="less">
@top: 10px;

.margin-top {
  margin-top: @top;
}

.inactive {
  margin-top: @top;
  background-color: #f5f7fa;
}

.active {
  margin-top: @top;
}
</style>
