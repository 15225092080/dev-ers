<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              :model="formItem"
              :arrList="arrList"
              :findById="findById"
              :url="url"
              labelWidth="120px"
              :buttonGroup="buttonGroup"
              :convertResData="convertResData"
              @eventChange="eventChange"
              @eventClick="treeShow">
        <el-button class="submit_btn"
                   slot="slotBtn"
                   @click="submitEdit()"><i class="DHCiconfont">&#xe6b3;</i>提
          交</el-button>
        <el-button class="reset_btn"
                   slot="slotBtn"
                   @click="reset()"><i class="DHCiconfont">&#xe6b3;</i>重 置
        </el-button>
      </v-form>
      <v-tree ref="tree"
              v-bind:param="param"
              :orgIdfake.sync="formItem[orgCodesOrUserIds]"
              :orgId.sync="orgCodesOrUserIds"
              @eventChange="eventChange"></v-tree>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
// import {closeDialog} from '@/common/script/vForm';
import vTree from './orgAndUserTreedialog';
export default {
  name: 'child',
  components: {
    vTree,
  },
  mixins: [MinXin],
  data() {
    return {
      centerDialogVisible: true,
      url: '',
      selectFlag: false,
      arrList: [],
      orgData: null,
      userData: null,
      orgCodesOrUserIdsArr: [],
      orgCodesOrUserNameArr: [],
      orgCodesOrUserIds: '',
      userAsOrg: null,
      userAsOrgObj: null,
      orgChecked: null,
      formItem: {},
      // 树的参数
      param: {},
      findById: {
        url: this.$urlList.sysbusiness.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.resId } }, // 参数
      },
      buttonGroup: ['close'],
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    async treeShow() {
      // 展示树结构
      let argLevel = this.$refs.formItem.formItem.argLevel;
      // 获取机构数据
      let title = '选择机构';
      let orgCheckboxFlag = true;
      let orgChecked = this.orgCodesOrUserIdsArr;
      await this.http.apiGet(this.$urlList.sysbusiness.getOrgTree).then((res) => {
        this.orgData = res;
      });

      if (argLevel == 'C') {
        let param = { params: {} };
        param.params.orgCode = this.orgData.data.id;
        // 获取用户机构数据,
        if (this.userAsOrg && this.userAsOrg.length > 1) {
          param.params.orgCode = this.userAsOrg[0].orgId;
        }
        await this.http.apiGet(this.$urlList.sysbusiness.getOrgUser, param).then((res) => {
          // let obj = {userId:"allChecked",userName:"全选"};
          this.userData = res.data;
          // this.userData.unshift(obj);
        });
        title = '选择机构及用户';
        orgCheckboxFlag = false;
        if (this.userAsOrg.length < 1) {
          orgChecked = [];
        } else {
          orgChecked = [this.userAsOrg[0].orgId];
        }
      }
      this.userAsOrgObj = this.createUserAsOrgObj(this.userAsOrg);
      // 设置弹出窗口机构树和用户树参数
      this.param = {
        visible: true,
        type: argLevel,
        title: title,
        treedata: [this.orgData.data],
        userData: this.userData,
        checkbox: orgCheckboxFlag,
        checkboxStrictly: orgCheckboxFlag,
        orgChecked: orgChecked,
        userChecked: this.orgCodesOrUserIdsArr,
        userAsOrg: this.userAsOrgObj,
        orgKey: 'id',
        userKey: 'userId',
        defaultProps: {
          children: 'children',
          label: function (a) {
            return a.params.orgName;
          },
        },
        defaultUsers: {
          children: 'children',
          label: 'userName',
        },
        name: 'orgCodesOrUserShow',
      };
      // 设置默认选中机构
      if (argLevel == 'C') {
        this.$refs.tree.$emit('setCurrentKey', orgChecked + '');
      }
    },
    // 创建对象用于保存所有点击机构后所选用户
    createUserAsOrgObj(userAsOrg) {
      let obj = {};
      if (!userAsOrg || userAsOrg.length < 1) {
        return;
      }
      for (let i = 0; i < userAsOrg.length; i++) {
        obj[userAsOrg[i].orgId] = userAsOrg[i].userIds;
      }
      return obj;
    },
    eventChange(obj) {
      if (obj.e == '') {
        this.common.Control(this.arrList, {
          orgCodesOrUserIdsShow: {
            hide: true,
          },
        });
      } else if (obj.e == 'B') {
        this.common.Control(this.arrList, {
          orgCodesOrUserIdsShow: {
            label: '机构名',
            placeholder: '请点击选择机构',
            value: '',
            hide: false,
          },
        });
      } else if (obj.e == 'C') {
        this.common.Control(this.arrList, {
          orgCodesOrUserIdsShow: {
            label: '用户名',
            placeholder: '请点击选择机构及用户',
            value: '',
            hide: false,
          },
        });
      }
      // 首次赋值不触发change
      if (this.selectFlag) {
        this.orgCodesOrUserIdsArr = [];
        this.orgCodesOrUserNameArr = [];
      }
      this.selectFlag = true;
    },
    convertResData(res) {
      if (res.userAsOrg === null) {
        this.userAsOrg = [];
      } else {
        this.userAsOrg = res.userAsOrg;
      }
      this.orgCodesOrUserIdsArr = [];
      this.orgCodesOrUserNameArr = [];
      res.orgCodesOrUserIds.forEach((i) => {
        if (res.argLevel == 'B') {
          this.orgCodesOrUserIdsArr.push(i.orgCode);
          this.orgCodesOrUserNameArr.push(i.orgName);
        } else if (res.argLevel == 'C') {
          this.orgCodesOrUserIdsArr.push(i.userId);
          this.orgCodesOrUserNameArr.push(i.userName);
        }
      });
      res.orgCodesOrUserIdsShow = this.orgCodesOrUserNameArr + '';
      return res;
    },
    reset() {
      setTimeout(() => {
        // 重置重新渲染数据
        this.common.setVal(this.findById.url, this.findById.param).then((result) => {
          // 当定义数据处理方法时调用对返回对象进行数据处理
          if (this.convertResData) {
            result = this.convertResData(result);
          }
          this.$refs.formItem.formItem = result;
        });
        let argLevel = this.$refs.formItem.formItem.argLevel;
        // 通过返回参数级别渲染参数所属机构或用户
        if (argLevel == 'B') {
          this.common.Control(this.arrList, {
            orgCodesOrUserIds: {
              label: '机构名',
              placeholder: '请点击选择机构',
            },
          });
        } else if (argLevel == 'C') {
          this.common.Control(this.arrList, {
            orgCodesOrUserIds: {
              label: '用户名',
              placeholder: '请点击选择机构及用户',
            },
          });
        }
      }, 500);
    },
    // 提交方法--除了表单数据还要传orgId和userId
    submitEdit() {
      let param;
      param = this.$refs.formItem.formItem;
      // 从父页面取到orgId和userId并赋到要提交的表单数据中
      param.orgCodesOrUserIds = this.orgCodesOrUserIdsArr + '';
      delete param.userAsOrg;
      this.$refs.formItem.$refs.formItem.validate((valid) => {
        if (valid) {
          this.http
            .apiPost(this.$urlList.sysbusiness.update, param, {
              showLoading: true,
            })
            .then((res) => {
              // this.common.submitMsg(res, this);
              if (res.code == 0) {
                this.common.MessageBoxalert(res.message, '消息', '确认', 'success').then(() => {
                  // if (this) {
                  //   if (this.$el.className.includes('querypage')) {
                  //     this.$refs.dataTable.getTableData();
                  //   } else {
                  //     this && closeDialog(this);
                  //   }
                  // }
                  window.reload();
                });
              } else {
                this.common.MessageBoxalert(res.message, '消息', '确认', 'error').then(() => {});
              }
            });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '800', function () {
            return false;
          });
        }
      });
    },
    init() {
      this.arrList = [
        [
          {
            type: 'input',
            name: 'argName',
            value: '',
            label: '参数名称',
            span: 12,
            header: '',
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'systemId',
            value: '',
            label: '隶属系统',
            param: 'T_GGGL_0001',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'argLevel',
            value: '',
            label: '参数级别',
            span: 12,
            eventChange: true,
            eventClick: true,
            customOption: {
              B: '机构',
              C: '用户',
            },
          },
          {
            type: 'input',
            name: 'argValue',
            value: '',
            label: '参数值',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'orgCodesOrUserIdsShow',
            value: '',
            label: '机构名',
            span: 24,
            placeholder: '请点击选择机构',
            eventClick: true,
            customStyle: 'cursor: pointer;',
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
            ],
            readonly: true,
            noReset: true,
            hide: false,
          },
        ],
        [
          {
            type: 'textarea',
            name: 'argDescription',
            value: '',
            label: '参数描述',
            span: 24,
          },
        ],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
