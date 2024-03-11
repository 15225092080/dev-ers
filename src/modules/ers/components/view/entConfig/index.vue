<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>参数配置信息列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary"
                       plain
                       @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary"
                       plain
                       @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
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
    <!-- 详情弹出框 -->
    <v-detail v-if="visible"
              ref="childDetails"
              :paramDetail="paramDetail"
              :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
import vEdit from './model/edit';
import vDetail from './model/detail';
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vEdit,
    vDetail,
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '企业参数配置',
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
      // 详情
      paramDetail: {
        title: '',
        dialogTitle: '企业参数配置',
      },
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_configName',
            value: '',
            label: '参数名称',
            span: 8,
          },
          {
            type: 'select',
            name: 'search_EQ_configType',
            value: '',
            param: 'CONFIG_TYPE',
            label: '参数类型',
            span: 8,
          },
        ],
      ],
      detailUrl: {
        url: this.$urlList.econfig.getValUrl,
        delUrl: this.$urlList.econfig.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'econfig',
        tableHeader: [
          {
            // 详情demo
            field: 'configName',
            title: '参数名称',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'configValue',
            title: '参数值',
            width: 120,
          },
          {
            field: 'configType',
            title: '参数类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'CONFIG_TYPE',
            },
          },
          {
            field: 'createUser',
            title: '创建用户',
            width: 120,
          },
          {
            field: 'createTime',
            title: '创建时间',
            width: 120,
          },
          {
            field: 'updateUser',
            title: '修改用户',
            width: 120,
          },
          {
            field: 'updateTime',
            title: '修改时间',
            width: 120,
          },
          {
            field: 'configDesc',
            title: '参数描述',
            width: 220,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    showdetail(selectRow) {
      this.visible = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '企业参数配置-详情',
        id: selectRow.id,
        url: this.$urlList.econfig.getValUrl,
      };
    },
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
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
