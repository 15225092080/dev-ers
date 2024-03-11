<template>
  <div class="querypage">
    <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>征信中心金融机构代码配置列表
        </span>
        <ul class="icongroup">
          <li>
            <el-button type="primary" @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
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
        dialogTitle: '征信中心金融机构代码配置'
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
        dialogTitle: '征信中心金融机构代码配置'
      },
      // 检索条件form表单
      arrList: [
        [
          {type: 'input', name: 'search_LIKE_deptCode', value: '', label: '内部机构代码', span: 6},
          {type: 'input', name: 'search_LIKE_centerCode', value: '', label: '征信中心机构代码', span: 6},
          {type: 'input', name: 'search_LIKE_orgEntityCenterCode', value: '', label: '法人机构征信中心机构代码', span: 6},
          {type: 'input', name: 'search_LIKE_topDeptCode', value: '', label: '上报机构内部机构代码', span: 6},
          {type: 'input', name: 'search_LIKE_topCenterCode', value: '', label: '上报机构征信中心机构代码', span: 6}
        ]
      ],
      detailUrl: {
        url: this.$urlList.amom.getValUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      },
      // 列表表头
      paramTable: {
        bussName: 'amom',
        tableHeader: [
          {
            // 详情demo
            field: 'deptCode',
            title: '内部机构代码',
            width: 180,
            oper: {
              name: 'link',
              clickFun: this.detailFuns
            }
          },
          {
            field: 'centerCode',
            title: '征信中心机构代码',
            width: 180
          },
          {
            field: 'orgEntityCenterCode',
            title: '法人机构征信中心机构代码',
            width: 220
          },
          {
            field: 'topDeptCode',
            title: '上报机构内部机构代码',
            width: 180
          },
          {
            field: 'topCenterCode',
            title: '上报机构征信中心机构代码',
            width: 220
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
