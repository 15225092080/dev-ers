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
                   @click="()=>{$store.commit('SET_OPERATSTATE',''),$router.push({path: '/system-user'})}"><i class="DHCiconfont">&#xe72c;</i>返回</el-button>
        <el-divider></el-divider>
      </div>
      <el-tabs type="card"
               v-model="activeNameDetail"
               :before-leave="beforeLeaveDetails">
        <el-tab-pane label="用户管理">
          <platform-detail></platform-detail>
        </el-tab-pane>
        <el-tab-pane v-if="personalFlag"
                     label="个人用户属性管理">
          <per-attr-detail v-if="personalDetailIsShow"
                           ref="personalDetail"></per-attr-detail>
        </el-tab-pane>
        <el-tab-pane v-if="enterpriseFlag"
                     label="企业用户属性管理">
          <en-attr-detail v-if="enDetailIsShow"
                          ref="enDetail"></en-attr-detail>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import platformDetail from './platform-detail';
import perAttrDetail from '../credit/perAttrDetail';
import enAttrDetail from '../credit/enAttrDetail';
export default {
  name: 'system-user-detail',
  components: {
    platformDetail,
    perAttrDetail,
    enAttrDetail,
  },
  data() {
    return {
      activeNameDetail: '0',
      title: '用户管理-详情',
      perOrEn: '', // 判断是企业还是个人
      personalDetailIsShow: false,
      enDetailIsShow: false,
    };
  },
  methods: {
    beforeLeaveDetails(activeNameDetail, oldActiveName) {
      if (activeNameDetail == '1') {
        this.perOrEn = 'CPQ';
        this.findByUserName('1');
      } else if (activeNameDetail == '2') {
        this.perOrEn = 'CEQ';
        this.findByUserName('1');
      }
    },
    findByUserName() {
      var Creditper;
      var childs;
      if (this.perOrEn == 'CPQ') {
        Creditper = this.$urlList.peruserattr;
        childs = 'personalDetail';
      } else {
        Creditper = this.$urlList.enuserattr;
        childs = 'enDetail';
      }
      let paramData = {
        userName: this.$route.query.id,
      };
      let that = this;
      this.http.apiPost(Creditper.findByUserName, paramData).then((res) => {
        this[childs + 'IsShow'] = true;
        this.$nextTick(() => {
          if (res.code == '00000001') {
            that.$refs[childs].formItem.userName = that.$refs.formItem.formItem.userName;
          } else {
            that.$refs[childs].formItem = res.objectData;
          }
        });
      });
    },
    init() {
      this.$store.dispatch('user/setOperatState', '');
    },
  },
  created() {
    this.init();
    let projectMenu = JSON.parse(sessionStorage.getItem('projectMenu'));
    for (var i = 0; i < projectMenu.length; i++) {
      if (projectMenu[i].systemId == 'CPQ') {
        this.personalFlag = true;
      }
      if (projectMenu[i].systemId == 'CEQ') {
        this.enterpriseFlag = true;
      }
    }
  },
};
</script>
<style  scoped lang="less">
</style>
