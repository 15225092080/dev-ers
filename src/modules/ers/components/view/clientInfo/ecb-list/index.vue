<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "140px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>身份标识整合信息列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary" plain @click="addModal" v-permission="['crse:basicinfo:ecb:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary" @click="editFun" v-permission="['crse:basicinfo:ecb:update']">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger" @click="deleteFun" v-permission="['crse:basicinfo:ecb:delete']">
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
    <!-- 详情弹出框 -->
      <v-detail v-if="visible" ref="childDetails" :paramDetail="paramDetail" :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
import vEdit from './model/edit';
import vDetail from './model/detail';
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'ecb-list',
  mixins: [MinXin],
  components: {
    vEdit, vDetail
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '企业身份标识整合信息段'
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
        dialogTitle: '企业身份标识整合信息段'
      },
      // 检索条件form表单
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_custId', value: '', label: '客户号', span: 6},
          {type: 'input', name: 'search_LIKE_entName', value: '', label: '企业名称', span: 6},
          {type: 'select', name: 'search_EQ_entCertType', value: '', param: 'E_InfoIDType2', label: '企业身份标识类型', span: 6},
          {type: 'input', name: 'search_LIKE_entCertNum', value: '', label: '企业身份标识号码', span: 6}
        ],
        [
          {type: 'select', name: 'search_EQ_dataState', value: '', param: 'E_DATA_STATE', label: '数据状态', span: 6},
          {type: 'select', name: 'search_EQ_reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 6},
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name
                ;
              }},
            name: 'search_IN_deptCode',
            value: '',
            label: '所属机构',
            span: 6
          },
          {type: 'daterange', name: 'search_GTE_LTE_bussDate_DATE_RANGE', value: '', label: '业务发生日期', span: 6}
        ]
      ],
      detailUrl: {
        isTime: 'search_GTE_LTE_bussDate_DATE_RANGE',
        url: this.$urlList.ecb.getValUrl,
        delUrl: this.$urlList.ecb.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'ecb',
        tableHeader: [
          {
            // 详情demo
            field: 'custId',
            title: '客户号',
            width: 120,
            oper: {
              name: 'link',
              clickFun: this.detailFuns
            }
          },
          {
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
            field: 'entCertNum',
            title: '企业身份标识号码',
            width: 120
          },
          {
            field: 'certAssFlg',
            title: '身份标识关系有效标志',
            width: 120,
            oper: {
              name: 'dic',
              type: 'E_OthAssFlg'
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
  watch: {
  },
  methods: {
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
    }
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {
  }
};
</script>

<style scoped="scoped">

</style>
