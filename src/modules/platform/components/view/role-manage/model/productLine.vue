<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-s">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <div style="text-align: center;padding:10px;">
      <tree-transfer :title="['全部菜单权限', '当前角色菜单权限']"
                     height="50vh"
                     :from_data="roledata"
                     :to_data="userData"
                     :defaultProps="{label:'plName'}"
                     @addBtn="add"
                     @removeBtn="remove"
                     :mode="mode"
                     pid="pid"
                     node_key="plId"
                     :button_text="['到右边', '到左边']"></tree-transfer>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="confirm"
                 class="submit_btn"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      <el-button @click="close"
                 class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import treeTransfer from 'el-tree-transfer';
export default {
  name: 'child',
  components: {
    treeTransfer,
  },
  props: {
    param: {
      type: Object,
    },
  },
  data() {
    return {
      centerDialogVisible: true,
      roledata: [],
      userData: [],
      mode: 'transfer',
    };
  },
  methods: {
    //   提交
    handleData(confirmData) {
      for (let i = 0; i < confirmData.length; i++) {
        this.saveData.push(confirmData[i].plId);
      }
    },
    confirm() {
      this.saveData = [];
      this.handleData(this.confirmData);
      let plIds = this.saveData.join(',');
      if (this.saveData.length > 1) {
        this.param.saveParmas.plIds = plIds;
      } else {
        this.param.saveParmas.plIds = plIds + ',';
      }
      this.http.apiPost(this.param.saveUrl, this.param.saveParmas).then((res) => {
        if (res.code == 0) {
          this.common.MessageBoxalert(res.message, '消息', '确认', 'success').then(() => {
            this.param.close();
          });
        } else {
          this.common.MessageBoxalert(res.message, '消息', '确认', 'error').then(() => {
            // this.param.close();
          });
        }
      });
    },
    // 关闭窗口
    close() {
      this.param.close();
    },
    //   获取全部数据 左侧数据
    getAllData() {
      let paramData = {};
      paramData['params'] = this.param.params;
      this.http.apiGet(this.param.getAllUrl, paramData).then((res) => {
        if (res.data && res.data.length <= 0) {
          return;
        }
        this.userData = res.data.filter((item, index) => {
          item.pid = index;
          return item.showSelect;
        });
        this.roledata = res.data.filter((item, index) => {
          return !item.showSelect;
        });

        //   this.userData = res.data;
      });
    },
    //   获取用户数据 右侧数据
    //   getUserData(){
    //       let paramData = {};
    //       paramData['params'] = this.param.params;
    //       this.http.apiGet(this.param.getUserUrl,paramData).then((res)=>{
    //           this.userData = res.data;
    //       })
    //   },
    add(fromData, toData, obj) {
      this.confirmData = toData;
    },
    remove(fromData, toData, obj) {
      this.confirmData = toData;
    },
  },
  created() {
    this.getAllData();
    //   this.getUserData();
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
</style>
