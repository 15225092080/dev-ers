<template>
  <div class="querypage">
    <!-- <v-operation ref="filter" v-bind:arrList="arrList" labelWidth = "100px"></v-operation> -->
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>系统通知内容配置列表
        </span>
        <!-- <ul class="icongroup">
          <li>
            <el-button type="primary" plain @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary" plain @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
        </ul> -->
      </div>
      <div>
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
        <el-table border :data="tableData" size="mini" stripe height="400">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="sceneDesc" label="通知场景描述"></el-table-column>
                <el-table-column prop="config" label="配置">
                  <template slot-scope="scope">
                    <el-button size="mini"  @click="showdetail(scope.row)" class="configBtn">配置</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="informStatus" label="启停状态">
                    <template slot-scope="scope">
                        <div>
                            <span>
                                <el-switch :width="60" v-model="scope.row.informStatus" inactive-text="停用"
                                  active-value="1" active-text="启用" inactive-value="0" @change="changestopFlag(scope.row)">
                                </el-switch>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
      </div>
    </el-card>
    <!-- 配置弹出框 -->
      <v-detail v-if="visible" ref="childDetails" :paramDetail="paramDetail" :vis.sync="visible"></v-detail>
  </div>
</template>

<script>
import vDetail from './config';
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  components: {
    vDetail
  },
  inject: ['reload'],
  data() {
    return {
      // 检索条件的折叠控制
      show: true,
      tableData:[],
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
        dialogTitle: '企业参数配置段'
      },
      detailUrl: {
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '' // 获取的id
      }
    };
  },
  watch: {
  },
  methods: {
    getTableData() { // 获取表格数据
      let url = this.$urlList.entInform.getPage1;
      this.http.apiGet(url, '').then(res => {
          this.tableData = res;
      });
    },
    // 启停用
    changestopFlag(row) {
      let params = {
        id: row.id,
        informStatus: row.informStatus
      };
      this.http.apiPost(this.$urlList.entInform.updateInformStatus, params).then(res => {
        console.log(res);
      });
    },
    // 点击配置按钮
    showdetail(selectRow) {
      this.visible = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '',
        id: selectRow.id,
        // url: this.$urlList.entInform.getValUrl
      };
    },
    init() {
      this.getTableData();
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
.configBtn{
  color: #3075c7 !important;
  border-color: #c1d6ee;
  background-color: #eaf1f9;
}
.el-switch__label--left {
  left: 62px !important;
}
.el-switch__label--right {
  right: 50px !important;
}
</style>
