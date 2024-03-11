<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe683;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="addModal"
                       v-permission="['dcp:system:role:create']"><i class="DHCiconfont">&#xe6c3;</i>创 建</el-button>
          </li>
          <li>
            <el-button class="edit_btn"
                       plain
                       @click="personalPermissions"
                       v-permission="['dcp:system:role:per:permiss']"><i class="DHCiconfont">&#xe668;</i>个人监管权限</el-button>
          </li>
          <li>
            <el-button class="edit_btn"
                       plain
                       @click="enterprisePermissions"
                       v-permission="['dcp:system:role:en:permiss']"><i class="DHCiconfont">&#xe668;</i>企业监管权限</el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 selection
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <v-edit :param="paramEdit"
            v-if="visibleEdit"
            :vis.sync="visibleEdit"></v-edit>
    <v-detail :param="paramEdit"
              v-if="visible"
              :vis.sync="visible"></v-detail>
    <per-permissions ref="perPermiss"
                     :title="title"
                     v-if="showpersonal"></per-permissions>
    <en-permissions ref="enPermiss"
                    :title="title"
                    v-if="showEn"></en-permissions>
  </div>
</template>
<script>
import vEdit from './model/edit';
import vDetail from './model/detail';
import enPermissions from './credit/enPermissions.vue';
import perPermissions from './credit/perPermissions.vue';
import MinXin from '@/common/script/mixin';
import { bindEvent, changestopFlag } from '@/modules/platform/script/role-manage/role-manage';
export default {
  name: 'system-role',
  mixins: [MinXin],
  inject: ['reload'],
  components: {
    vEdit,
    vDetail,
    enPermissions,
    perPermissions,
  },
  data() {
    return {
      showpersonal: false,
      showEn: false,
      title: '',
      visibleEdit: false,
      visible: false,
      paramEdit: {},
      detailUrl: {
        delUrl: this.$urlList.role.delUrl,
        paramDataId: 'id', // 字段名
        id: 'roleId', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      arrList: [
        [
          { type: 'input', name: 'search_like_role_name', value: '', label: '角色名称', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_like_role_desc', value: '', label: '角色描述', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'select', name: 'search_eq_role_type', value: '', param: 'T_JSGL_0001', label: '角色类型', filter: ['B'], span: 6 },
          { type: 'select', name: 'search_eq_status', value: '', param: 'T_JSGL_0002', label: '启停状态', span: 6 },
        ],
      ],
      paramTable: {
        bussName: 'role',
        tableHeader: [
          {
            field: 'roleName',
            title: '角色名称',
            width: 120,
            tooltip: true,
            oper: {
              name: 'link',
              clickFun: this.showdetailDialog,
            },
          },
          {
            field: 'roleType',
            title: '角色类型',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_JSGL_0001',
            },
          },
          {
            field: 'roleDesc',
            title: '角色描述',
            width: 140,
            tooltip: true,
          },
          {
            field: 'status',
            title: '启停用状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'switch',
              flag: { on: '1', off: '0' },
              clickFun: changestopFlag,
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
                  permission: 'dcp:system:role:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:role:delete',
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
    personalPermissions() {
      // 个人监管权限
      const selectedRow = this.$refs.dataTable.selectRow;
      if (selectedRow && selectedRow.length == 1) {
        this.title = '消息';
        let obj = selectedRow[0];
        // obj.roleId = '40286881766fb70001766fb876600003'; // 临时
        let paramData = {
          params: {
            id: obj.roleId,
            type: '0',
          },
        };

        // 全部角色
        this.http.apiGet(this.$urlList.perroleManage.getAllReason, paramData).then((res) => {
          this.$refs.perPermiss.roledata = res;
          this.$refs.perPermiss.rowId = obj.roleId; // 将行号ID传过去
        });
        this.title = '个人监管权限-配置页';
        this.showpersonal = true;
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条进行操作！',
          type: 'warning',
        });
      }
    },
    enterprisePermissions() {
      // 企业监管权限
      const selectedRow = this.$refs.dataTable.selectRow;
      if (selectedRow && selectedRow.length == 1) {
        this.title = '消息';
        let obj = selectedRow[0];
        // obj.roleId = '40286881766fb70001766fb876600003'; // 临时
        let paramData = {
          params: {
            id: obj.roleId,
            type: '1',
          },
        };

        // 全部角色
        this.http.apiGet(this.$urlList.enroleManage.getAllReason, paramData).then((res) => {
          this.$refs.enPermiss.roledata = res;
          this.$refs.enPermiss.rowId = obj.roleId; // 将行号ID传过去
        });
        this.title = '企业监管权限-配置页';
        this.showEn = true;
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条进行操作！',
          type: 'warning',
        });
      }
    },
  },
  created() {
    bindEvent(this);
    let userData = JSON.parse(sessionStorage.userData);
    if (userData.userType == 'C' || userData.userType == 'D') {
      this.common.Control(this.arrList, {
        search_eq_role_type: {
          filter: ['B', 'A'],
        },
      });
    }
  },
  mounted() {},
  computed: {},
};
</script>
<style scoped="scoped">
</style>
