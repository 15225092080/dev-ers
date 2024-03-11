<template>
<el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-m"
    >
    <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "140px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>用户通知属性列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary" plain @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary" @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger" @click="deleteFun">
              <i class="DHCiconfont">&#xe6a3;</i>删除
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable" :param="paramTable"></v-table>
      </div>
    </el-card>
    <!-- 新增、编辑弹出框 -->
    <v-edit v-if="visibleEdit" :paramEdit="paramEdit" ref="child" :vis.sync="visibleEdit"></v-edit>
    <!-- <router-view></router-view> -->
  </div>
  <el-button @click="close()" class="close_btn closeBtn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
  </el-dialog>
</template>

<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {vEdit},
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '用户属性'
      },
      // 弹框显隐控制
      centerDialogVisible: true,
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
      selected_row: '',
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_userName', value: '', label: '姓名', span: 8},
          {type: 'select', name: 'search_EQ_userSex', value: '', customOption: {'男': '男', '女': '女'}, label: '性别', span: 8},
          {type: 'input', name: 'search_LIKE_deptName', value: '', label: '所属部门', span: 8}
        ],
        [
          {type: 'input', name: 'search_LIKE_telephone', value: '', label: '手机号', span: 8},
          {type: 'input', name: 'search_LIKE_email', value: '', label: '邮箱', span: 8}
        ]
      ],
      detailUrl: {
        url: this.$urlList.entInform.getValUrl,
        delUrl: this.$urlList.entInform.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      paramTable: {
        bussName: 'entInform',
        where: { 'id': this.paramDetail.id },
        tableHeader: [
          {
            // 详情demo
            field: 'userName',
            title: '姓名',
            width: 120
          },
          {
            field: 'deptName',
            title: '所属部门',
            width: 120
          },
          {
            field: 'telephone',
            title: '手机号',
            width: 120
          },
          {
            field: 'email',
            title: '邮箱',
            width: 120
          },
          {
            field: 'switchStatus',
            title: '启停状态',
            width: 120,
            oper: {
              name: 'switch',
              flag: { on: '1', off: '0' },
              clickFun: this.changestopFlag
            },
            tooltip: true
          }
        ]
      }
    };
  },
  props: ['paramDetail'],
  watch: {},
  methods: {
    searchFun() {
      this.paramTable.form = this.$refs.filter.$refs.formItem.formItem;
      this.$refs.dataTable.getTableData();
    },
    close() {
      this.centerDialogVisible = false;
    },
    changestopFlag(row) {
      this.http.apiGet(this.$urlList.entInform.updateSwitchStatus, {
        params: {
          id: row.id,
          informConfigId: this.paramDetail.id, // 父级id
          switchStatus: row.switchStatus
        }
      });
    },
    init() {

    }
  },
  created() {
  },
  mounted() {
    this.init();
  }
};
</script>
<style>
.closeBtn{
    float: right;
    margin-right: 30px;
    margin-bottom: 15px;
}
.cell.el-tooltip .el-switch .el-switch__core {
  padding: 0 30px !important;
  width: 60px !important;;
}
.cell.el-tooltip .el-switch .el-switch__label--left {
  left: 55px !important;
}
.cell.el-tooltip .el-switch .el-switch__label--right {
  right: 57px !important;
}
</style>
