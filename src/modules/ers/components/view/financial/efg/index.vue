<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "140px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe6cf;</i>02版现金流量表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary" plain @click="addModal" v-permission="['crse:financial:efg:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary" @click="updateModal" v-permission="['crse:financial:efg:update']">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger" @click="deleteFun" v-permission="['crse:financial:efg:delete']">
              <i class="DHCiconfont">&#xe6a3;</i>删除
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable" :param="paramTable"></v-table>
      </div>
    </el-card>
    <router-view></router-view>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  name:'financial-efg-list',
  data() {
    return {
      detailUrl: {
        isTime: 'search_GTE_LTE_bussDate_DATE_RANGE',
        url: this.$urlList.efg.getValUrl,
        delUrl: this.$urlList.efg.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      selected_row: '',
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_custId', value: '', label: '客户号', span: 8},
          {type: 'input', name: 'search_LIKE_entName', value: '', label: '企业名称', span: 8},
          {type: 'select', name: 'search_EQ_entCertType', value: '', param: 'E_InfoIDType2', label: '企业身份标识类型', span: 8}
        ],
        [
          {type: 'input', name: 'search_LIKE_entCertNum', value: '', label: '企业身份标识号码', span: 8},
          {type: 'year', name: 'search_EQ_sheetYear', label: '报表年份', span: 8},
          {type: 'select', name: 'search_EQ_sheetType', value: '', param: 'E_ReportFormType', label: '报表类型', span: 8}

        ],
        [
          {type: 'select', name: 'search_EQ_reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 8},
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name;
              }},
            name: 'search_IN_deptCode',
            value: '',
            label: '所属机构',
            span: 8
          },
          {type: 'daterange', name: 'search_GTE_LTE_bussDate_DATE_RANGE', value: '', label: '业务发生日期', span: 8}
        ]
      ],
      paramTable: {
        bussName: 'efg',
        tableHeader: [
          {
            // 详情demo
            field: 'custId',
            title: '客户号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.showdetail
            }
          },
          {
            // 详情demo
            field: 'entName',
            title: '企业名称',
            width: 120
          },
          {
            field: 'entCertType',
            title: '企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_InfoIDType2'
            }
          },
          {
            // 详情demo
            field: 'entCertNum',
            title: '企业身份标识号码',
            width: 120
          },
          {
            field: 'sheetYear',
            title: '报表年份',
            width: 120
          },
          {
            field: 'sheetType',
            title: '报表类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_ReportFormType'
            }
          },
          {
            field: 'deptCode',
            title: '所属机构',
            width: 120,
            oper: {
              name: 'dic',
              type: 'deptCode'
            }
          },
          {
            field: 'dataState',
            title: '数据状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_DATA_STATE'
            }
          },
          {
            field: 'reportState',
            title: '报送状态',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_REPORT_STATE'
            }
          }
        ]
      }
    };
  },
  watch: {},
  methods: {
    addModal() { // 暂时写到这里，日后新增编辑详情这种跳转或者弹出可能做成可配置
      this.$store.dispatch('user/setOperatState', 'add');
      this.$router.push({path: '/financial-efg-edit'});
    },
    updateModal(row) {
      if (this.$refs.dataTable.selectRow && this.$refs.dataTable.selectRow.length == 1) {
        row = this.$refs.dataTable.selectRow[0];
        this.$store.dispatch('user/setOperatState', 'edit');
        this.$router.push({path: '/financial-efg-edit',
          query: {
            id: row.id
          }});
      }else{
        this.$message({
          showClose: true,
          message: '请选择一条进行操作',
          type: 'warning',
          duration: '800'
        });
      }
    },
    showdetail(row) {
      this.$router.push({path: '/financial-efg-detail',
        query: {
          id: row.id
        }});
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>
<style scoped="scoped">
</style>

