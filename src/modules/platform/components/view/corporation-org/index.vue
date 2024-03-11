<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
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
                       v-permission="['dcp:system:corporationOrg:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
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
    <!-- 新增、编辑组件 -->
    <v-edit v-if="visibleEdit"
            :paramEdit="paramEdit"
            ref="child"
            :vis.sync="visibleEdit"></v-edit>
  </div>
</template>

<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
import { bindEvent, changestopFlag } from '@/modules/platform/script/corporation-org/corporation-org';
export default {
  name: 'system-corporationOrg',
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
        dialogTitle: '法人机构管理',
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
            name: 'search_like_org_code',
            value: '',
            label: '机构内部代码',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'search_like_org_name',
            value: '',
            label: '机构名称',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'search_like_financial_org_code',
            value: '',
            label: '金融机构代码',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'select',
            name: 'search_eq_record_stop_flag',
            value: '',
            param: 'T_JGGL_0001',
            label: '启停状态',
            xl: 6,
            lg: 8,
          },
        ],
      ],
      detailUrl: {
        // url: this.$urlList.corporationOrg.findById,
        delUrl: this.$urlList.corporationOrg.delUrl,
        paramDataId: 'orgId', // 字段名
        id: 'orgCode', // 获取表格数据的字段名
        resCode: '',
      },
      systemId: sessionStorage.getItem('systemId'),
      areaOptions: [],
      // 列表表头
      paramTable: {
        bussName: 'corporationOrg',
        tableHeader: [
          {
            field: 'orgName',
            title: '机构名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'orgCode',
            title: '机构内部代码',
            width: 120,
            tooltip: true,
          },
          {
            field: 'financialOrgCode',
            title: '金融机构代码',
            width: 120,
            tooltip: true,
          },
          {
            field: 'areaCode',
            title: '行政区域',
            width: 180,
            tooltip: true,
            oper: {
              name: 'area',
              fun: (val) => {
                return this.common.changeAreaCode(val, JSON.parse(sessionStorage.getItem(this.systemId + '_getArea')));
              },
            },
          },
          {
            field: 'recordStopFlag',
            title: '启停状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'switch',
              flag: { on: '1', off: '0' },
              clickFun: changestopFlag,
            },
          },
          {
            field: 'createUserId',
            title: '创建用户',
            width: 120,
            tooltip: true,
          },
          {
            field: 'createTime',
            title: '创建时间',
            width: 145,
            tooltip: true,
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
                  permission: 'dcp:system:corporationOrg:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
                delete: {
                  name: '删除',
                  permission: 'dcp:system:corporationOrg:delete',
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
  methods: {},
  created() {
    bindEvent(this);
    // let systemId = sessionStorage.getItem('systemId');
    // // 判断缓存中是否有行政区域数据，若无许同步请求
    // if (sessionStorage.getItem(systemId + '_getArea')) {
    //     this.areaOptions = JSON.parse(sessionStorage.getItem(systemId + '_getArea'));
    // }else {
    //     this.areaOptions = await this.http.apiGet(this.$urlList.common.getArea, {params: {typeId: "T_MB_0001"}}).then((res) =>{
    //         return res.data;
    //     });
    //     sessionStorage.setItem(systemId + '_getArea',JSON.stringify(this.areaOptions));
    // };
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped="scoped">
</style>
