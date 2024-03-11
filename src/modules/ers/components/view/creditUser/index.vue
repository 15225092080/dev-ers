<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>企业征信用户配置列表
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
  name: 'child',
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
        dialogTitle: '企业征信用户配置'
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
        dialogTitle: '企业征信用户配置'
      },
      // 检索条件form表单
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_creditUser', value: '', label: '征信用户账号', span: 6},
          {type: 'input', name: 'search_LIKE_digitalCertificate', value: '', label: '数字证书', span: 6},
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
            label: '征信用户所属机构',
            span: 6
          }
        ]
      ],
      detailUrl: {
        delUrl: this.$urlList.credituser['delete'],
        url: this.$urlList.credituser.getValUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'credituser',
        tableHeader: [
          {
            // 详情demo
            field: 'creditUser',
            title: '征信用户账号',
            width: 180,
            oper: {
              name: 'link',
              clickFun: this.detailFuns
            }
          },
          {
            field: 'creditOrgCode',
            title: '征信中心机构代码',
            width: 120,
            oper: {
              name: 'dic',
              type: 'deptCode'
            }
          },
          {
            field: 'digitalCertificate',
            title: '数字证书',
            width: 220
          },
          {
            field: 'updateDate',
            title: '更新时间',
            width: 180
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
