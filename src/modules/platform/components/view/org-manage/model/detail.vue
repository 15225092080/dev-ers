<template>
  <div>
    <el-card>
      <div class="headerStyle">
        <i class="icon DHCiconfont"
           :class="'DHC-'+$route.meta.icon"></i>
        <span>{{title}}</span>
        <el-button class="back_btn"
                   style="float: right"
                   size="mini"
                   @click="()=>{$store.dispatch('user/setOperatState',''),$router.push({path: '/system-org'})}"><i class="DHCiconfont">&#xe72c;</i>返回</el-button>
        <el-divider></el-divider>
      </div>
      <component :is=item.content
                 v-for="(item,index) in allComponents"
                 :key="index"></component>
      <p class="record">编辑记录</p>
      <v-table :param="paramTable"
               pagination></v-table>
    </el-card>
  </div>
</template>
<script>
import platformDetail from './platform-detail';
export default {
  name: 'system-org-detail',
  components: {
    platformDetail,
  },
  data() {
    return {
      allComponents: [
        {
          content: 'platformDetail',
        },
      ],
      paramTable: {
        bussName: 'common',
        where: { id: this.$route.query.orgCode, type: 'org' },
        tableHeader: [
          {
            // 详情demo
            field: 'updateUserId',
            title: '编辑用户',
            tooltip: true,
            width: 120,
          },
          {
            field: 'updateOrgCode',
            title: '编辑机构',
            tooltip: true,
            width: 120,
            oper: {
              name: 'dic',
              type: 'getOrgName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getOrgName,
            },
          },
          {
            field: 'updateTime',
            title: '编辑时间',
            tooltip: true,
            width: 140,
          },
          {
            field: 'updateDesc',
            title: '编辑内容简述',
            tooltip: true,
            width: 140,
          },
        ],
      },
      title: '机构管理-详情',
    };
  },
  methods: {},
  created() {
    this.$store.dispatch('user/setOperatState', '');
  },
};
</script>
<style  scoped lang="less">
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
.record {
  width: 18%;
}
</style>
