<template>
  <div class="querypage online-index-wrap">
    <o-search ref="filter"
              :arrList="searchParam.arrList"
              :form="searchParam.form"
              :dictOptions="searchParam.dictOptions"
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
                       @click="handleAdd">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
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
          <li>
            <el-button class="add_btn"
                       plain
                       @click="visibleImportTable = true">
              <i class="DHCiconfont">&#xe689;</i>导入数据表
            </el-button>
          </li>
          <template v-if="false">
            <li>
              <el-button class="add_btn"
                         plain
                         @click="generateCode">
                <i class="DHCiconfont">&#xe6c3;</i>代码生成
              </el-button>
            </li>
          </template>
          <li>
            <o-super-query :fieldList="superFieldList"
                           @handleSuperQuery="handleSuperQuery"></o-super-query>
          </li>
          <li>
            <el-dropdown @command="handleBatchMenu">
              <el-button :disabled="selectedIds.length === 0"
                         class="border_btn"
                         plain>
                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
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
                <el-dropdown-item command="syncDb"
                                  v-if="scope.data.row.isDbSynch!='Y'">同步数据库</el-dropdown-item>
                <template v-if="scope.data.row.isDbSynch=='Y' && scope.data.row.tableType != 3">
                  <el-dropdown-item command="test">功能测试</el-dropdown-item>
                  <el-dropdown-item command="configUrl">配置地址</el-dropdown-item>
                </template>
                <el-dropdown-item command="copyView">
                  <el-popconfirm title="确定生成视图吗?"
                                 @confirm="handleCopyView(scope.data.row)">
                    <span class="online-dropmenu-item-content"
                          slot="reference">生成视图</span>
                  </el-popconfirm>
                </el-dropdown-item>
                <el-dropdown-item v-if="scope.data.row.hascopy==1"
                                  command="configView">视图管理</el-dropdown-item>
                <el-dropdown-item command="delete">
                  <el-popconfirm title="确定删除吗?"
                                 @confirm="handleDelete(scope.data.row,'delete')">
                    <span cllass="online-dropmenu-item-content"
                          slot="reference">删除</span>
                  </el-popconfirm>
                </el-dropdown-item>
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
    <!-- 同步数据库 -->
    <el-dialog custom-class="model-dialog"
               title="同步数据库"
               :visible.sync="syncDbDialogVisible"
               width="30%">
      <el-radio-group v-model="syncType">
        <el-radio style="margin-bottom:10px"
                  label="normal">普通同步(保留表数据)</el-radio>
        <el-radio label="force">强制同步(删除表,重新生成)</el-radio>
      </el-radio-group>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="border_btn"
                   @click="syncDbDialogVisible = false">关 闭</el-button>
        <el-button type="primary"
                   @click="syncDb">确 定</el-button>
      </span>
    </el-dialog>
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
    <!-- 删除 -->
    <el-dialog custom-class="model-dialog"
               title="提示"
               :visible.sync="deleteDialogVisible"
               width="30%">
      <span>移除只会删除表单配置、删除会删除对应的数据库表。请确认？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button class="border_btn"
                   @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleBatchDelete('0')">移 除</el-button>
        <el-button type="primary"
                   @click="handleBatchDelete('1')">删 除</el-button>
      </span>
    </el-dialog>
    <!-- 新增、编辑弹出框 -->
    <edit v-if="visibleEdit"
          ref="child"
          :noCopyPage="true"
          :editParam="editParam"
          :vis.sync="visibleEdit"></edit>
    <!-- 从数据库导入表单弹窗 -->
    <import-table v-if="visibleImportTable"
                  :dialogVisible.sync="visibleImportTable"></import-table>
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
import edit from './model/edit';
import importTable from './model/importTable.vue';
import configButton from './config-button/index.vue';
import enhanceSql from './enhance-sql/index.vue';
import { deleteDic, filterMultiDictText, filterObj } from '../common/script/util.js';
import * as dict from '../common/script/dict.json';
import MinXin from '../common/script/online-mixin.js';
export default {
  name: 'config',
  components: {
    edit,
    importTable,
    configButton,
    enhanceSql,
  },
  mixins: [MinXin],
  data() {
    return {
      urlList: this.$urlList.onlineFormHead,
      currentRow: '',
      deleteDialogVisible: false,
      syncDbDialogVisible: false,
      syncType: 'normal',
      visibleImportTable: false,
      searchParam: {
        arrList: [
          { mode: 'single', view: 'text', field: 'tableName', dbField: 'tableName', label: '表名' },
          { mode: 'single', view: 'list', field: 'tableType', dbField: 'tableType', dictCode: 'tableType', label: '表类型' },
          { mode: 'single', view: 'text', field: 'tableTxt', dbField: 'tableTxt', label: '表描述' },
        ],
        form: {
          tableName: '',
          tableType: '',
          tableTxt: '',
        },
        dictOptions: {
          tableType: dict.tableType,
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
            title: '表类型',
            dataIndex: 'tableType',
            customRender: (val, row) => {
              const text = filterMultiDictText(dict.tableType, val);
              const relationType = filterMultiDictText(dict.relationType, row.relationType);
              if (val == 3) {
                return `${text}(${relationType})`;
              }
              return text;
            },
            minWidth: 100,
          },
          {
            title: '表名',
            dataIndex: 'tableName',
            minWidth: 130,
          },
          {
            title: '表描述',
            dataIndex: 'tableTxt',
            minWidth: 130,
          },
          {
            title: '版本',
            dataIndex: 'tableVersion',
            minWidth: 50,
          },
          {
            title: '同步状态',
            dataIndex: 'isDbSynch',
            customRender: (val) => {
              const text = filterMultiDictText(dict.dbSynch, val);
              return text;
            },
            styleColor: {
              Y: '#32cd32',
              N: '#ff0000',
            },
            minWidth: 120,
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            minWidth: 140,
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
      superFieldList: [
        { type: 'text', value: 'tableName', label: '表名' },
        { type: 'list', value: 'tableType', label: '表类型', options: dict.tableType },
        { type: 'list', value: 'formCategory', label: '表单业务分类', options: dict.formCategory },
        { type: 'list', value: 'isDbSynch', label: '同步状态', options: dict.dbSynch },
        { type: 'date', value: 'createTime', label: '创建时间' },
        { type: 'text', value: 'tableTxt', label: '表描述' },
      ],
    };
  },
  watch: {},
  methods: {
    async loadData() {
      const { current, pageSize } = this.tableParam.pagination;
      let params = Object.assign({}, this.searchParam.form);
      params.copyType = 0;
      params.curPage = current;
      params.maxSize = pageSize;
      if (this.superQueryParams) {
        params['superQueryParams'] = encodeURI(this.superQueryParams);
        params['superQueryMatchType'] = this.superQueryMatchType;
      }
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
    async syncDb() {
      const url = `${this.$urlList.onlineFormApi.doDbSynch}/${this.currentRow.id}/${this.syncType}`;
      const res = await this.http.apiPost(url);
      if (res && res.code == '0') {
        this.syncDbDialogVisible = false;
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    async handleBatchDelete(flag) {
      const res = await this.http.apiDelete(this.urlList.deleteBatch, {
        params: {
          ids: this.selectedIds.join(','),
          flag,
        },
      });
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.deleteDialogVisible = false;
        this.loadData();
      } else {
        this.deleteDialogVisible = false;
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    async handleBatchMenu(type) {
      if (this.selectedIds.length < 1) return;
      if (type === 'delete') {
        this.deleteDialogVisible = true;
      }
    },
    async handleCopyView({ id }) {
      const res = await this.http.apiPost(`${this.urlList.copyOnline}?code=${id}`);
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    generateCode() {},
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
.online-index-wrap {
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
