<template>
  <div>
    <el-card>
      <div class="headerStyle">
        <i class="icon DHCiconfont"
           :class="'DHC-'+$route.meta.icon"></i>
        <span style="color: #676767;">{{$store.getters.operatState=='add'?`用户管理-创建`:`用户管理-编辑`}}</span>
        <el-button class="back_btn"
                   style="float: right"
                   size="mini"
                   @click="()=>{$store.dispatch('user/setOperatState',''),$router.push({path: '/system-user'})}"><i class="DHCiconfont">&#xe72c;</i>返回</el-button>
        <el-divider></el-divider>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               :tab-position="tabsPosition"
               :before-leave="beforeLeave">
        <el-tab-pane name="first"
                     label="用户管理">
          <platform-edit ref="userChild"></platform-edit>
        </el-tab-pane>
        <el-tab-pane name="second"
                     v-if="personalFlag"
                     label="个人用户属性管理">
          <per-user-Attr ref="personalChild"
                         v-if="personalChildIsShow"
                         @perOrEnChild="perOrEnChild"
                         @findByUserName="findByUserName"
                         :loadingmsg.sync="loading"></per-user-Attr>
        </el-tab-pane>
        <el-tab-pane name="third"
                     v-if="enterpriseFlag"
                     label="企业用户属性管理">
          <en-user-Attr ref="enChild"
                        v-if="enChildIsShow"
                        @perOrEnChild="perOrEnChild"
                        @findByUserName="findByUserName"
                        :loadingmsg.sync="loading"></en-user-Attr>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import Bus from '@/common/script/bus.js';
import platformEdit from './platform-edit';
import perUserAttr from '../credit/perUserAttr';
import enUserAttr from '../credit/enUserAttr';
export default {
  name: 'system-user-edit',
  components: {
    platformEdit,
    perUserAttr,
    enUserAttr,
  },
  data() {
    return {
      loading: false,
      activeName: 'first',
      tabsPosition: 'top',
      tabIable: '用户管理',
      perOrEn: '', // 判断是企业还是个人
      enterpriseFlag: false,
      personalFlag: false,
      isAttr: false,
      enChildIsShow: false,
      personalChildIsShow: false,
    };
  },
  props: {
    paramEdit: {
      type: Object,
    },
  },
  methods: {
    perOrEnChild(msg) {
      this.perOrEn = msg;
    },

    beforeLeave(activeName, oldActiveName) {
      if (activeName !== 'first' && !this.$route.query.id) {
        this.$message.error('未获得权限，请优先完善其他信息');
      }
      return this.isAttr;
    },
    async handleClick(tab, event) {
      if (this.$route.query.id) {
        this.tabIable = tab.label; // 储存当前是哪个tab
      }
      if (tab.label == '个人用户属性管理') {
        this.perOrEn = 'CPQ';
        await this.findByUserName();
      } else if (tab.label == '企业用户属性管理') {
        this.perOrEn = 'CEQ';
        await this.findByUserName();
      }
    },
    /**
     * 判断个人用户属性管理 是新增还是详情
     */

    async findByUserName() {
      var Creditper;
      var childs;
      if (this.perOrEn == 'CPQ') {
        Creditper = this.$urlList.peruserattr;
        childs = 'personalChild';
      } else {
        Creditper = this.$urlList.enuserattr;
        childs = 'enChild';
      }
      let paramData = {
        userName: this.$route.query.id,
      };
      let that = this;
      await this.http.apiPost(Creditper.findByUserName, paramData).then((res) => {
        this[childs + 'IsShow'] = true;
        this.$nextTick(() => {
          if (res.code == '00000001') {
            that.$refs[childs].formItem.userName = that.$refs.userChild.$refs.formItem.formItem.userName;
            that.$refs[childs].isAdd = null;
          } else {
            that.$refs[childs].formItem = res.objectData;
            that.$refs[childs].isAdd = res.objectData;
          }
        });
      });
    },
  },
  created() {
    let projectMenu = JSON.parse(sessionStorage.getItem('projectMenu'));
    for (var i = 0; i < projectMenu.length; i++) {
      if (projectMenu[i].systemId == 'CPQ') {
        this.personalFlag = true;
      }
      if (projectMenu[i].systemId == 'CEQ') {
        this.enterpriseFlag = true;
      }
    }
    if (this.$store.getters.operatState == 'edit') {
      this.isAttr = true;
    }
  },
  mounted() {},
};
</script>
<style lang="less">
.ui-user-manage-edit-credit-wrap {
  .ui-button-wrap {
    float: right;
    margin-right: 20px;
  }
  .el-select-dropdown__item.selected.is-disabled {
    color: #c0c4cc;
    cursor: not-allowedt;
    font-weight: normal;
  }
}
</style>
