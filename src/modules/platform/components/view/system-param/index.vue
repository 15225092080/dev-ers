<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe6ce;</i>检索结果
        </span>
        <ul class="icongroup">

        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <!-- 新增、编辑弹出框 -->
    <v-edit v-if="visibleEdit"
            :paramEdit="paramEdit"
            ref="child"
            :vis.sync="visibleEdit"></v-edit>
  </div>
</template>

<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
export default {
  name: 'system-configBase',
  mixins: [MinXin],
  components: {
    vEdit,
  },
  data() {
    // 弹框相关
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '系统参数管理',
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
      arrList: [
        [
          { type: 'input', name: 'search_like_config_name', value: '', label: '参数名称', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_like_description', value: '', label: '参数描述', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          // {type: "select",name: "",value: "",param: "",label: "隶属系统",span: 6}
        ],
      ],
      detailUrl: {
        paramDataId: 'configCode', // 字段名
        id: 'configCode', // 获取表格数据的字段名
        // configCode: "" //获取的id
      },
      paramTable: {
        bussName: 'systemparam',
        tableHeader: [
          {
            field: 'configName',
            title: '参数名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'configValue',
            title: '参数值',
            width: 120,
            tooltip: true,
          },
          {
            field: 'description',
            title: '参数描述',
            width: 300,
            tooltip: true,
          },
          {
            field: 'button',
            title: '操作',
            width: 100,
            tooltip: false,
            oper: {
              name: 'button',
              btnObj: {
                edit: {
                  name: '编辑',
                  permission: 'dcp:system:systemConfig:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
              },
            },
          },
          // {
          //     field: "updateUser",
          //     title: "编辑用户",
          //     width: 120
          // },
          // {
          //     field: "updateTime",
          //     title: "编辑时间",
          //     width: 120
          // }
        ],
      },
      tableData: [],
    };
  },
  watch: {},
  methods: {
    init() {
      this.$store.commit('SET_OPERATSTATE', '');
      this.$refs.dataTable.getTableData();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {},
};
</script>

<style scoped="scoped">
</style>
