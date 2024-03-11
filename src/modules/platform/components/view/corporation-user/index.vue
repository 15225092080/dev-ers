<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 @eventChange="eventChange"
                 :customSearch="customSearch"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="addModal"
                       v-permission="['dcp:system:legalPerson:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button class="unlock_btn"
                       plain
                       @click="systemUnlock"
                       v-permission="['dcp:system:legalPerson:unlockUser']">
              <i class="DHCiconfont">&#xe73b;</i>解锁
            </el-button>
          </li>
          <li>
            <el-button class="resetPwd_btn"
                       @click="resetPassword"
                       v-permission="['dcp:system:legalPerson:resetPassword']">
              <i class="DHCiconfont">&#xe6dc;</i>重置密码
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
    <!-- 新增、编辑弹出框 -->
    <v-edit v-if="visibleEdit"
            :paramEdit="paramEdit"
            ref="child"
            :vis.sync="visibleEdit"></v-edit>
    <!-- 启停用弹窗 -->
    <!-- <v-stopreason :param="paramReason" v-if="visible" :vis.sync="visible"></v-stopreason> -->
  </div>
</template>

<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
import { systemUnlock, resetPassword, changestopFlag } from '@/modules/platform/script/user-manage/user-manage';
export default {
  name: 'system-corporationUser',
  mixins: [MinXin],
  components: {
    vEdit,
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '法人及系统用户管理',
      },
      // 检索条件的折叠控制
      show: true,
      secondshow: true,
      // 表格中选中的数据行
      selected_row: '',
      // 编辑及新增弹框的显隐控制
      visibleEdit: false,
      visible: false,
      loading: false,
      // 弹框种类名
      title: '',
      // 判断弹框为新增还是编辑
      operation: '',
      height: '',
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'input',
            name: 'search_like_user_id',
            value: '',
            label: '用户名',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'search_like_user_name',
            value: '',
            label: '用户姓名',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          // {type: "tree",treeurl:this.$urlList.corporationUser.getTopOrg,treetitle:"机构树",defaultProps:{children: "children",label: function(a,b){return a.orgName}},name: "search_eq_org_code",value: "",label: "所属机构",span: 6},
          {
            type: 'select',
            name: 'searchLockFlag',
            value: '',
            label: '锁定状态',
            param: 'T_FRJXTYHGL_0002',
            // filter: [],
            span: 6,
            eventChange: true,
          },
          {
            type: 'select',
            name: 'search_eq_stop_flag',
            value: '',
            label: '启停状态',
            param: 'T_FRJXTYHGL_0003',
            span: 6,
          },
        ],
        [
          {
            type: 'select',
            name: 'search_IN_user_type',
            value: '',
            label: '用户类型',
            param: 'T_FRJXTYHGL_0001',
            // customOption: {"A":"法人机构管理员","B":"系统管理员"},
            filter: ['C', 'D'],
            span: 6,
            eventChange: true,
          },
          {
            type: 'select',
            name: 'search_eq_org_code',
            value: '',
            label: '所属机构',
            customOption: {},
            span: 6,
            hide: false,
          },
        ],
      ],
      detailUrl: {
        // url: this.$urlList.corporationUser.getValUrl,
        delUrl: this.$urlList.corporationUser.delUrl,
        paramDataId: 'id', // 字段名
        id: 'userId', // 获取表格数据的字段名
        userId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'corporationUser',
        tableHeader: [
          {
            field: 'userId',
            title: '用户名',
            width: 120,
            tooltip: true,
          },
          {
            field: 'userName',
            title: '用户姓名',
            width: 120,
            tooltip: true,
          },
          {
            field: 'orgCode',
            title: '所属机构',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'getLegalPerOrg',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.corporationUser.getLegalPerOrg,
            },
          },
          {
            field: 'userType',
            title: '用户类型',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_FRJXTYHGL_0001',
            },
          },
          {
            field: 'lockType',
            title: '锁定状态',
            width: 100,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_FRJXTYHGL_0002',
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
                edit: {
                  name: '编辑',
                  permission: 'dcp:system:legalPerson:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
                delete: {
                  name: '删除',
                  permission: 'dcp:system:legalPerson:delete',
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
      var that = this;
      that.common.onselect('search_IN_user_type', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 'A') {
          that.common.Control(that.arrList, {
            search_eq_org_code: {
              hide: false,
              rule: [{ validator: that.validator.empty, trigger: 'blur' }],
            },
          });
        } else {
          that.common.Control(that.arrList, {
            search_eq_org_code: {
              hide: true,
              rule: [{ required: false }],
            },
          });
        }
      });
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
    // 系统解锁
    systemUnlock() {
      systemUnlock(this.$refs.dataTable.selectRow, this, 'corporationUser');
    },
    // 重置密码
    resetPassword() {
      resetPassword(this.$refs.dataTable.selectRow, this, 'corporationUser');
    },

    // 启停
    changestopFlag(row) {
      changestopFlag(row, this, 'corporationUser');
    },
    async setOrgVal() {
      // 所属机构下拉框赋值
      let systemId = sessionStorage.getItem('systemId');
      // 缓存中取法人机构数据
      let obj = JSON.parse(sessionStorage.getItem(systemId + '_getLegalPerOrg'));
      if (obj) {
        this.common.Control(this.arrList, {
          search_eq_org_code: {
            customOption: obj,
          },
        });
      }
    },
  },
  created() {},
  mounted() {
    this.common.getdic(this.$urlList.corporationUser.getLegalPerOrg, 'getLegalPerOrg', this.setOrgVal);
    //  this.setOrgVal()
  },
  computed: {},
};
</script>

<style scoped="scoped">
</style>
