<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :title="title"
             width="50%"
             :modal="true"
             :close-on-click-modal="false"
             @close="closed"
             custom-class="model-dialog">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{ title }}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <tree-transfer :title="['全部权限', '当前角色权限']"
                   height="60vh"
                   :from_data="roledata"
                   :to_data="usermenu"
                   :defaultProps="{label:'name'}"
                   :pid="parentId"
                   @addBtn="add"
                   @removeBtn="remove"
                   :mode="mode"
                   openAll
                   :button_text="['到右边', '到左边']"></tree-transfer>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="personalSubmit"
                 class="submit_btn"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      <el-button @click="closed"
                 class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import treeTransfer from 'el-tree-transfer';

export default {
  components: {
    treeTransfer,
  },
  inject: ['reload'],
  data() {
    return {
      parentId: 'parentId',
      title: '个人监管权限-配置页',
      mode: 'transfer',
      rowId: '',
      allvalue: [],
      value: [],
      roledata: [], // 这简单理解为左侧数据
      roleobj: [], // 操作后树结构数据
      usermenu: [], // 当前用户角色展示的树结构数据
      operlist: [], // 用户增加或删除权限剩余权限的ID数组
      isbool: false, // 判断用户有没有选择权限进行操作
      centerDialogVisible: true,
    };
  },
  methods: {
    closed() {
      this.reload();
    },
    // 获取当前用户角色的权限
    getAllMenu(data) {
      // 遍历树结构对象
      let that = this;
      for (let i = 0; i < data.length; i++) {
        // 遍历第一层子数据
        if (data[i].children && data[i].checked == true) {
          // 判断是否有孩子，如果有孩子进行遍历
          var menufather = [];
          // 没有孩子直接赋值
          that.allvalue.push({
            id: data[i].id,
            checked: data[i].checked,
            pid: data[i].pid,
            name: data[i].name,
            children: menufather, // 将第二层子孩子传入
          });
        } else if (data[i].pid == 0) {
          that.allvalue.push({
            id: data[i].id,
            checked: data[i].checked,
            pid: data[i].pid,
            name: data[i].name,
            children: [],
          });
        }
      }
    },
    // 获取当前用户角色的权限
    getuserMenu(data) {
      // 遍历树结构对象
      let that = this;
      for (let i = 0; i < data.length; i++) {
        // 遍历第一层子数据
        if (data[i].children && data[i].checked == true) {
          // 判断是否有孩子，如果有孩子进行遍历
          var menufather = [];
          data[i].children.forEach(function (item, index, array) {
            // 遍历第二层子数据
            var menuson = [];
            if (item.children && item.checked == true) {
              // 判断有没有孩子
              item.children.forEach(function (itemson, index, array) {
                // 遍历第三层子数据
                menuson.push({
                  id: itemson.id,
                  checked: data[i].checked,
                  pid: itemson.parentId,
                  name: itemson.name,
                });
              });
              menufather.push({
                id: item.id,
                checked: data[i].checked,
                pid: item.parentId,
                name: item.name,
                children: menuson, // 将第三层子孩子传入
              });
            } else if (item.checked == true) {
              menufather.push({
                id: item.id,
                checked: data[i].checked,
                pid: item.parentId,
                name: item.name,
                children: [], // 将第三层子孩子传入
              });
            }
          });
          // 没有孩子直接赋值
          that.value.push({
            id: data[i].id,
            checked: data[i].checked,
            pid: data[i].parentId,
            name: data[i].name,
            children: menufather, // 将第二层子孩子传入
          });
        } else if (data[i].checked == true) {
          that.value.push({
            id: data[i].id,
            checked: data[i].checked,
            pid: data[i].parentId,
            name: data[i].name,
            children: [],
          });
        }
      }
    },
    // 获取全部权限的ID
    getAllMenuID(data) {
      // 遍历树结构对象
      let that = this;
      for (let i = 0; i < data.length; i++) {
        // 遍历第一层子数据
        if (data[i].children) {
          // 判断是否有孩子，如果有孩子进行遍历
          data[i].children.forEach(function (item, index, array) {
            // 遍历第二层子数据
            if (item.children) {
              // 判断有没有孩子
              item.children.forEach(function (itemson, index, array) {
                // 遍历第三层子数据
                that.operlist.push(itemson.id);
              });
            }
            that.operlist.push(item.id);
          });
          that.operlist.push(data[i].id);
        } else {
          that.operlist.push(data[i].id);
        }
      }
    },
    init() {
      // 当前用户角色的权限
      this.getuserMenu(this.roledata);
      this.usermenu = this.value;
    },
    personalSubmit() {
      var subData = [];
      // 如果用户不进行任何操作则给出提示
      if (this.isbool == false) {
        this.$emit('update:loadingmsg', false);
        this.$emit('titleChanged');
        this.common.MessageBoxalert('请选择审批权限！', '提示', '确定', 'warning');
        return false;
      }
      // 查询用户操作后剩余的权限的ID组成的数组
      this.getAllMenuID(this.roleobj);
      // 对数组进行去重操作
      this.operlist = Array.from(new Set(this.operlist));
      subData = this.operlist;

      // 将要传入AJAX的参数拼接为一个字符串
      var paramStr = this.rowId + ',' + subData.join();
      var paramData = {
        ids: paramStr,
        type: '0',
      };
      if (!this.isContinuity(subData)) {
        this.common.message(true, '请选择连续的审批权限！', 'warning', '800');
      } else {
        this.http
          .apiPost(this.$urlList.perroleManage.saveUserReason, paramData, {
            showLoading: true,
          })
          .then((res) => {
            this.common.submitMsg(res).then(() => {
              // 弹出返回值消息、并写入回调
              window.reload();
            });
          });
      }
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      if (this.mode == 'transfer') {
        this.mode = 'addressList';
      } else {
        this.mode = 'transfer';
      }
    },
    // 监听穿梭框组件添加
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      // console.log("fromData:", fromData);
      // console.log("toData:", toData);
      // console.log("obj:", obj);
      this.roleobj = toData;
      this.isbool = true;
    },
    // 监听穿梭框组件移除
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      // console.log("fromData:", fromData);
      // console.log("toData:", toData);
      // console.log("obj:", obj);
      this.roleobj = toData;
      this.isbool = true;
    },
    isContinuity(arr) {
      var arr2 = [],
        type2 = '33',
        end = 8;
      arr.forEach(function (v, i) {
        if (v && v.substring(0, 2) == type2 && v.charAt(end) != '0') {
          arr2.push(v);
        }
      });
      arr2.splice(
        arr2.findIndex((item) => item === '33001'),
        1
      );
      arr2.sort();
      for (var j = 2; j < arr2.length; j++) {
        if (parseInt(arr2[j]) - parseInt(arr2[j - 1]) > 1) {
          return false;
        }
      }
      return true;
    },
  },
  created() {
    setTimeout(() => {
      this.init();
    }, 500);
  },
};
</script>
<style lang="less" scoped>
/deep/ .transfer .el-tree {
  height: auto;
}
/deep/ .transfer-center-item .el-button .el-icon-arrow-left {
  float: left;
}
</style>
