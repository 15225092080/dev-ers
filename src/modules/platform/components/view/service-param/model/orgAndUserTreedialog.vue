<template>
  <el-dialog :visible.sync="param.visible"
             :modal="false"
             :close-on-click-modal="false"
             :before-close="closeorgtree"
             :opened="beforeOpen"
             custom-class="model-dialog el-dialog-s">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <el-row>
      <el-col :span="param.type == 'C'?12:24"
              class="orgTree">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i><span>机构列表</span>
        </el-card>
        <el-card class="grid-content left">
          <div>
            <input v-model="filterTextOrg"
                   placeholder="输入关键字进行检索"
                   class="native" />
            <el-tree :data="param.treedata"
                     default-expand-all
                     ref="orgTree"
                     :node-key="param.orgKey"
                     :props="param.defaultProps"
                     :expand-on-click-node="false"
                     @node-click="handleNodeClick"
                     @check-change="handleCheckChange"
                     :highlight-current="!param.checkbox"
                     :default-checked-keys="param.orgChecked"
                     :show-checkbox="param.checkbox"
                     :check-strictly="param.checkboxStrictly"
                     :filter-node-method="filterNode"
                     :check-on-click-node="trueFlag"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12"
              v-if="param.type == 'C'">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i><span>用户列表</span>
        </el-card>
        <el-card class="grid-content left userTree">
          <div>
            <input v-model="filterTextUser"
                   placeholder="输入关键字进行检索"
                   class="native" />
            <el-tree :data="param.userData"
                     default-expand-all
                     ref="userTree"
                     :node-key="param.userKey"
                     @check-change="handleCheckChangeUser"
                     :props="param.defaultUsers"
                     :show-checkbox="trueFlag"
                     :check-strictly="trueFlag"
                     :check-on-click-node="trueFlag"
                     :default-checked-keys="param.userChecked"
                     :filter-node-method="filterNodeUser"></el-tree>
            <!-- <div class="userWrap">
                              <el-checkbox-group v-model="checkedUser" @change="handleCheckedUserChange" class="clearfix">
                                <el-checkbox  @change="handleCheckAllChange" v-model="checkAll" > 全选 </el-checkbox>
                                <el-checkbox v-for="name in userData" :key="name"  class="text item" >- {{name}}</el-checkbox>
                              </el-checkbox-group>
                        </div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button class="certain_btn"
                 @click="confirm"><i class="DHCiconfont">&#xe72a;</i>确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
      msg: '',
      dataId: '',
      userAsOrg: null,
      trueFlag: true,
      filterTextOrg: '',
      filterTextUser: '',
      userAllChecked: false,
      classobject: {
        padding: '5%',
        width: '40%',
      },
      // ,
      // orgCodesOrUserIdsObj:{}
    };
  },
  computed: {
    beforeOpen() {
      return this.param.visible;
    },
  },
  watch: {
    userAsOrg(newVal) {
      this.userAsOrg = newVal;
    },
    filterTextOrg(val) {
      this.$refs.orgTree.filter(val);
    },
    filterTextUser(val) {
      this.$refs.userTree.filter(val);
    },
  },
  props: ['param'],
  methods: {
    //  handleCheckAllChange(val) {
    //     this.checkedUser = val ? this.getUserArr() : [];
    //     this.isIndeterminate = false;
    //   },
    //   handleCheckedUserChange(value) {
    //     let user = this.getUserArr();
    //     let checkedCount = value.length;
    //     this.checkAll = checkedCount === user.length;
    //     this.isIndeterminate = checkedCount > 0 && checkedCount < user.length;
    //   },
    closeorgtree(done) {
      // 這是清除機構樹表單數據
      this.filterTextOrg = '';
      this.filterTextUser = '';
      done();
    },
    handleCheckChange(data, checked, indeterminate) {
      if (this.param.type == 'B') {
        if (checked) {
          this.$parent.$parent.orgCodesOrUserIdsArr.push(data.id);
          this.$parent.$parent.orgCodesOrUserNameArr.push(data.params.orgName);
        } else {
          this.common.arrayRemoveByValue(this.$parent.$parent.orgCodesOrUserIdsArr, data.id);
          this.common.arrayRemoveByValue(this.$parent.$parent.orgCodesOrUserNameArr, data.params.orgName);
        }
      } else if (this.param.type == 'C') {
      }
    },
    handleCheckChangeUser(data, checked, indeterminate) {
      // 全选
      // this.$refs.userTree.setCheckedNodes(this.param.userData);

      if (checked) {
        // if(!this.orgCodesOrUserIdsObj[data.orgCode]){
        //   this.orgCodesOrUserIdsObj[data.orgCode] = [];
        // };
        // this.orgCodesOrUserIdsObj[data.orgCode].push(data.userId);
        this.$parent.$parent.orgCodesOrUserIdsArr.push(data.userId);
        this.$parent.$parent.orgCodesOrUserNameArr.push(data.userName);
        // 用于展示
      } else {
        let arr = null;
        // if(this.orgCodesOrUserIdsObj[data.orgCode]){
        //   arr = this.orgCodesOrUserIdsObj[data.orgCode];
        // }else{
        //   arr =  this.param.userAsOrg[data.orgCode];
        // }
        if (this.param.userAsOrg) {
          arr = this.param.userAsOrg[data.orgCode];
          this.common.arrayRemoveByValue(arr, data.userId);
        }
        this.common.arrayRemoveByValue(this.$parent.$parent.orgCodesOrUserIdsArr, data.userId);
        this.common.arrayRemoveByValue(this.$parent.$parent.orgCodesOrUserNameArr, data.userName);
      }
    },
    handleNodeClick(data) {
      // 加载用户列表
      this.getOrgUser(data.id);
    },
    // 获取机构下的用户
    getOrgUser(data) {
      this.http.apiGet(this.$urlList.sysbusiness.getOrgUser, { params: { orgCode: data } }).then((res) => {
        // let obj = {userId:"allChecked",userName:"全选"};
        this.param.userData = res.data;
        // this.param.userData.unshift(obj);
      });
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return this.param.defaultProps.label(data).indexOf(value) !== -1;
    },
    filterNodeUser(value, data) {
      if (!value) {
        return true;
      }
      return data[this.param.defaultUsers.label].indexOf(value) !== -1;
    },
    confirm() {
      let t = this;
      let arr = this.common.arrayRemoveRepeatedVal(t.$parent.$parent.orgCodesOrUserNameArr);
      this.common.Control(t.$parent.$parent.arrList, {
        orgCodesOrUserIdsShow: {
          value: arr + '',
        },
      });
      this.param.visible = false;
      t.$parent.$parent.$refs['formItem'].$refs['formItem'].validate();
    },
    // 监听默认选中高亮机构
    monitoring() {
      this.$on('setCurrentKey', (res) => {
        this.$nextTick(function () {
          this.$refs.orgTree.setCurrentKey(res);
        });
      });
    },
  },
  created() {},
  mounted() {
    let p = this.param;
    this.flag = false;
    this.monitoring();
  },
};
</script>

<style scoped>
.el-tree-node:focus > .el-tree-node__content {
  color: #66b1ff;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #66b1ff;
}
</style>
