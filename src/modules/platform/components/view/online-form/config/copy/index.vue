<template>
  <div class="querypage online-copy-index-wrap">
    <o-search ref="filter"
              :arrList="searchParam.arrList"
              :form="searchParam.form"
              @queryPage="loadData"
              @clearForm="clearSearchForm"></o-search>
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
                       @click="configBtn">
              <i class="DHCiconfont">&#xe6c8;</i>自定义按钮
            </el-button>
          </li>
          <li v-if="false">
            <el-button class="add_btn"
                       plain
                       @click="enhanceJs">
              <i class="DHCiconfont">&#xe779;</i>JS增强
            </el-button>
          </li>
          <li>
            <el-button class="add_btn"
                       plain
                       @click="enhanceSql">
              <i class="DHCiconfont">&#xe6af;</i>SQL增强
            </el-button>
          </li>
          <template v-if="false">
            <li>
              <el-button class="add_btn"
                         plain
                         @click="enhanceJava">
                <i class="DHCiconfont">&#xe76e;</i>JAVA增强
              </el-button>
            </li>
          </template>
        </ul>
      </div>
      <div>
        <o-table ref="dataTable"
                 :selection="tableParam.selection"
                 :isPagination="tableParam.isPagination"
                 :pagination="tableParam.pagination"
                 :columns="tableParam.columns"
                 :tableData="tableParam.data"
                 @selectionChange="selectionChange"
                 @paginationChange="paginationChange">
          <template slot="action"
                    slot-scope="scope">
            <span class="ui-link"
                  @click="handleEdit(scope.data)">编辑</span>
            <el-dropdown @command="handleMoreMenu($event,scope.data.row)">
              <span class="ui-link">
                更多 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="test">功能测试</el-dropdown-item>
                <el-dropdown-item command="configUrl">配置地址</el-dropdown-item>
                <el-dropdown-item command="remove">
                  <el-popconfirm :title="`确认要移除此记录?`"
                                 @confirm="handleDelete(scope.data.row,'remove')">
                    <span class="online-dropmenu-item-content"
                          slot="reference">移除</span>
                  </el-popconfirm>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </o-table>
      </div>
    </el-card>
    <!-- 配置地址 -->
    <el-dialog custom-class="model-dialog"
               :title="copyUrlTitle"
               :visible.sync="copyUrlDialogVisible"
               width="30%">
      <span>{{ configUrl }}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="border_btn"
                   @click="copyUrlDialogVisible = false">关 闭</el-button>
        <el-button type="primary"
                   class="copy-this-text"
                   :data-clipboard-text="configUrl"
                   @click="copyUrl">复 制</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <edit v-if="visibleEdit"
          ref="child"
          :noCopyPage="false"
          :editParam="editParam"
          :vis.sync="visibleEdit"></edit>
    <!-- 自定义按钮 -->
    <config-button v-if="visibleConfigBtn"
                   :dialogVisible.sync="visibleConfigBtn"
                   :headId="selectedIds[0]"></config-button>
    <!-- SQL增强 -->
    <enhance-sql v-if="visibleSql"
                 :dialogVisible.sync="visibleSql"
                 :headId="selectedIds[0]"></enhance-sql>
  </div>
</template>

<script>
import edit from '../model/edit';
import configButton from '../config-button/index.vue';
import enhanceSql from '../enhance-sql/index.vue';
import { deleteDic, filterObj } from '../../common/script/util.js';
import MinXin from '../../common/script/online-mixin.js';
export default {
  name: 'copy-config',
  components: {
    edit,
    configButton,
    enhanceSql,
  },
  mixins: [MinXin],
  data() {
    return {
      urlList: this.$urlList.onlineFormHead,
      searchParam: {
        arrList: [{ mode: 'single', view: 'text', field: 'tableName', dbField: 'tableName', label: '表名' }],
        form: {
          tableName: '',
        },
      },
      tableParam: {
        selection: true,
        isPagination: true,
        pagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: [5, 10, 15, 20, 30],
          total: 0,
        },
        columns: [
          {
            title: '视图表名',
            dataIndex: 'tableName',
            minWidth: 130,
          },
          {
            title: '视图表描述',
            dataIndex: 'tableTxt',
            minWidth: 130,
          },
          {
            title: '原表版本',
            dataIndex: 'tableVersion',
            minWidth: 60,
          },
          {
            title: '视图版本',
            dataIndex: 'copyVersion',
            minWidth: 60,
          },
          {
            title: '操作',
            dataIndex: 'action',
            minWidth: 120,
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          },
        ],
        data: [],
      },
    };
  },
  watch: {},
  methods: {
    async loadData() {
      const { current, pageSize } = this.tableParam.pagination;
      const param = {
        copyType: 1,
        physicId: this.$route.query.code,
        pageNo: current,
        pageSize: pageSize,
        column: 'id',
        order: 'desc',
      };
      let params = Object.assign({}, param, this.searchParam.form);
      const res = await this.http.apiGet(this.urlList.getPage, { params: filterObj(params) });
      if (res.code == '0') {
        let result = res.data;
        if (Number(result.total) > 0) {
          this.tableParam.pagination.total = Number(result.total);
          this.tableParam.data = result.rows;
        } else {
          this.tableParam.pagination.total = 0;
          this.tableParam.data = [];
        }
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
  },
  created() {
    this.loadData();
  },
  mounted() {},
  destroyed() {
    deleteDic(['T_DBTYPE_0001', 'T_VALIDTYPE_0001', 'T_SHOWTYPE_0001']);
  },
  computed: {},
};
</script>

<style lang="less">
.online-copy-index-wrap {
  .ui-link {
    cursor: pointer;
    color: #409eff;
    font-size: 14px;
  }
  .ui-link:first-child {
    margin-right: 8px;
  }
  .ui-link:hover {
    background-color: transparent !important;
    border: none !important;
    color: #3075c7;
  }
  .online-dropmenu-item-content {
    display: inline-block;
  }
  .model-dialog .el-dialog__body {
    padding: 15px 20px;
  }
}
</style>
