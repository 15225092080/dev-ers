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
          <li>
            <el-button class="export_btn"
                       @click="exportBtn(exportUrl)"
                       v-permission="['dcp:system:loginLog:export']">
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
    <!-- 提示框（导入） -->
    <!-- <service-dialog v-bind:post="post" @toParent="uploads"></service-dialog> -->
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'loginLog',
  mixins: [MinXin],
  components: {},
  data() {
    return {
      exportUrl: this.$urlList.userinvitelog.exportUrl,
      detailUrl: {
        isTime: 'optionTime',
        id: 'id',
      },
      arrList: [
        [
          { type: 'input', name: 'search_LIKE_user_id', value: '', label: '用户名', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_LIKE_user_name', value: '', label: '用户姓名', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
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
            name: 'orgArea',
            value: '1',
            param: 'T_YHFWRZ_0001',
            label: '机构范围',
            noReset: true,
            default: {
              name: 'orgArea',
              value: '1',
            },
            span: 6,
          },
        ],
        [
          { type: 'daterange', name: 'optionTime', value: '', label: '操作时间', span: 12 },
          { type: 'select', name: 'search_EQ_result_type', value: '', param: 'T_YHFWRZ_0002', label: '结果类型', span: 6 },
          { type: 'input', name: 'search_LIKE_login_ip', value: '', label: 'IP', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
        ],
      ],
      paramTable: {
        bussName: 'userinvitelog',
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
            width: 130,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'getOrgName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getOrgName,
            },
          },
          {
            field: 'resultType',
            title: '结果类型',
            width: 100,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_YHFWRZ_0002',
            },
          },
          {
            field: 'failReason',
            title: '失败原因',
            width: 120,
            tooltip: true,
          },
          {
            field: 'loginIp',
            title: 'IP',
            width: 120,
            tooltip: true,
          },
          {
            field: 'operateTime',
            title: '操作时间',
            width: 145,
            tooltip: true,
          },
        ],
      },
      tableData: [],
    };
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  computed: {},
};
</script>

<style scoped="scoped">
</style>
