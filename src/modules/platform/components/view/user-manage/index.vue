<template>
  <div class="querypage switch">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 @eventChange="eventChange"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe6cf;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="addModal"
                       v-permission="['dcp:system:user:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button class="unlock_btn"
                       @click="systemUnlock"
                       v-permission="['dcp:system:user:unlockUser']">
              <i class="DHCiconfont">&#xe73b;</i>解锁
            </el-button>
          </li>
          <li>
            <el-button class="resetPwd_btn"
                       @click="resetPassword"
                       v-permission="['dcp:system:user:resetPwd']">
              <i class="DHCiconfont">&#xe6dc;</i>重置密码
            </el-button>
          </li>
          <li>
            <el-button class="export_btn"
                       @click="exportBtn(exportUrl)"
                       v-permission="['dcp:system:user:export']">
              <i class="DHCiconfont">&#xe676;</i>导出
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 450px)"
                 :param="paramTable"
                 selection></v-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import { systemUnlock, resetPassword, changestopFlag } from '@/modules/platform/script/user-manage/user-manage';
export default {
  name: 'system-user',
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  data() {
    return {
      exportUrl: this.$urlList.user.exportUrl,
      detailUrl: {
        delUrl: this.$urlList.user.delUrl,
        paramDataId: 'id', // 字段名
        id: 'userId', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      selected_row: '',
      arrList: [
        [
          { type: 'input', name: 'search_like_user_id', value: '', label: '用户名', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_like_user_name', value: '', label: '用户姓名', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgtree,
            treetitle: '机构树',
            defaultProps: {
              children: 'children',
              label: function (a) {
                return a.params.orgName;
              },
            },
            name: 'orgCode',
            value: '',
            label: '所属机构',
            span: 6,
          },
          {
            type: 'select',
            name: 'orgRange',
            value: '1',
            param: 'T_YHGL_0001',
            label: '机构范围',
            noReset: true,
            default: {
              name: 'orgRange',
              value: '1',
            },
            span: 6,
          },
        ],
        [
          { type: 'select', name: 'searchLockFlag', value: '', param: 'T_YHGL_0002', label: '锁定状态', span: 6, eventChange: true },
          { type: 'select', name: 'search_eq_user_type', value: '', param: 'T_YHGL_0003', label: '用户类型', span: 6, filter: ['B'] },
          { type: 'select', name: 'search_eq_stop_flag', value: '', param: 'T_YHGL_0004', label: '启停状态', span: 6 },
        ],
      ],
      paramTable: {
        bussName: 'user',
        tableHeader: [
          {
            field: 'userId',
            title: '用户名',
            width: 120,
            tooltip: true,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'userName',
            title: '用户姓名',
            width: 120,
            tooltip: true,
          },
          {
            field: 'userType',
            title: '用户类型',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_YHGL_0003',
            },
          },
          {
            field: 'orgCode',
            title: '所属机构',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'getOrgName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getOrgName,
            },
          },
          {
            field: 'deptName',
            title: '部门',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'getDeptName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getDeptName,
            },
          },
          {
            field: 'lockType',
            title: '锁定状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'dic',
              type: 'T_YHGL_0002',
            },
          },
          {
            field: 'stopFlag',
            title: '启停状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'switch',
              flag: { on: '1', off: '0' },
              clickFun: this.changestopFlag,
            },
          },
          {
            field: 'updateUserId',
            title: '编辑用户',
            width: 120,
            tooltip: true,
          },
          {
            field: 'updateTime',
            title: '编辑时间',
            width: 145,
            tooltip: true,
          },
          {
            field: 'button',
            title: '操作',
            width: 170,
            tooltip: false,
            oper: {
              name: 'button',
              btnObj: {
                jurisdiction: {
                  name: '编辑',
                  permission: 'dcp:system:user:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.updateModal,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:user:delete',
                  icon: 'shanchu',
                  flag: 'delete_btn',
                  clickFun: this.deleted,
                },
              },
            },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    eventChange(obj) {
      let searchLock = {};
      if (obj.e) {
        if (obj.e == 0) {
          // 未锁定
          searchLock = {
            search_eq_pwd_lock_flag: '0',
            search_eq_system_lock_flag: '0',
            search_eq_business_lock_flag: '0',
          };
        } else if (obj.e == 1) {
          // 密码锁定
          searchLock = {
            search_eq_pwd_lock_flag: '1',
            search_eq_system_lock_flag: '',
            search_eq_business_lock_flag: '',
          };
        } else if (obj.e == 2) {
          // 系统锁定
          searchLock = {
            search_eq_pwd_lock_flag: '',
            search_eq_system_lock_flag: '1',
            search_eq_business_lock_flag: '',
          };
        } else if (obj.e == 3) {
          // 系统锁定
          searchLock = {
            search_eq_pwd_lock_flag: '',
            search_eq_system_lock_flag: '',
            search_eq_business_lock_flag: '1',
          };
        }
      } else {
        searchLock = {
          search_eq_pwd_lock_flag: '',
          search_eq_system_lock_flag: '',
          search_eq_business_lock_flag: '',
        };
      }
      this.$refs.filter.$refs.formItem.formItem = Object.assign(this.$refs.filter.$refs.formItem.formItem, searchLock);
    },
    systemUnlock() {
      systemUnlock(this.$refs.dataTable.selectRow, this, 'user');
    },
    resetPassword() {
      resetPassword(this.$refs.dataTable.selectRow, this, 'user');
    },
    changestopFlag(row) {
      changestopFlag(row, this, 'user');
    },
    addModal() {
      // 暂时写到这里，日后新增编辑详情这种跳转或者弹出可能做成可配置
      this.$store.dispatch('user/setOperatState', 'add');
      this.$router.push({ path: '/system-user-edit' });
    },
    updateModal(row) {
      this.$store.dispatch('user/setOperatState', 'edit');
      this.$router.push({
        path: '/system-user-edit',
        query: {
          id: row.userId,
          // params:{
          //     id: row["userId"]
          // }
        },
      });
    },
    showdetail(row) {
      this.$store.dispatch('user/setOperatState', '');
      this.$router.push({
        path: '/system-user-detail',
        query: {
          id: row.userId,
        },
      });
    },
  },
  created() {
    let userData = JSON.parse(sessionStorage.userData);
    if (userData.userType == 'C' || userData.userType == 'D') {
      this.common.Control(this.arrList, {
        search_eq_user_type: {
          filter: ['B', 'A'],
        },
      });
    }
  },
  mounted() {},
};
</script>
<style>
</style>
