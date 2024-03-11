<template>
  <div class="querypage online-template-view-wrap">
    <o-search v-if="searchParam.arrList.length>0"
              ref="search"
              :arrList="searchParam.arrList"
              :form="searchParam.form"
              :dictOptions="dictOptions"
              @queryPage="loadData"
              @clearForm="clearSearchForm"></o-search>
    <el-card v-if="tableParam.columns.length > 1"
             class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span>
        <ul class="icongroup">
          <li v-if="buttonSwitch.add">
            <el-button class="add_btn"
                       plain
                       @click="handleAdd">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li v-if="buttonSwitch.import">
            <el-button class="add_btn"
                       plain
                       @click="handleImport">
              <i class="DHCiconfont">&#xe774;</i>导入
            </el-button>
          </li>
          <li v-if="buttonSwitch.export">
            <el-button class="export_btn"
                       plain
                       @click="handleExport">
              <i class="DHCiconfont">&#xe676;</i>导出
            </el-button>
          </li>
          <template v-if="buttonList && buttonList.length>0">
            <li v-for="(item,index) in buttonList"
                :key="index">
              <el-button :key="'btn'+index "
                         @click="buttonHandler(item.optType,item.buttonCode)"
                         class="add_btn online-config-btn"
                         plain>
                <i class="online-config-btn-icon"
                   :class="item.buttonIcon"></i>{{ item.buttonName }}
              </el-button>
            </li>
          </template>
          <li>
            <o-super-query :fieldList="superFieldList"
                           @handleSuperQuery="handleSuperQuery"></o-super-query>
          </li>
          <li v-if="buttonSwitch.batch_delete && tableParam.selectedIds.length > 0">
            <el-button class="border_btn"
                       plain
                       @click="handleBatchDelete">
              批量删除<i class="DHCiconfont">&#xe6a3;</i>
            </el-button>
          </li>
        </ul>
        <o-table ref="currentTable"
                 :selection="tableParam.selection"
                 :isPagination="tableParam.isPagination"
                 :pagination="tableParam.pagination"
                 :columns="tableParam.columns"
                 :tableData="tableParam.data"
                 @sortChange="handleTableSort"
                 @selectionChange="selectionChange"
                 @paginationChange="paginationChange">
          <template slot="imgSlot"
                    slot-scope="scope">
            <span v-if="!scope.data.row[scope.data.th.dataIndex]"
                  class="table-col-tips">无图片</span>
            <img v-else
                 :src="getFullUrl(scope.data.row[scope.data.th.dataIndex])"
                 height="26px"
                 alt="图片不存在"
                 class="table-col-tips table-col-img" />
          </template>
          <template slot="fileSlot"
                    slot-scope="scope">
            <span v-if="!scope.data.row[scope.data.th.dataIndex]"
                  class="table-col-tips">无文件</span>
            <el-button v-else
                       class="border_btn table-row-btn"
                       @click="downloadRowFile(scope.data.row[scope.data.th.dataIndex])">
              <i class="DHCiconfont">&#59072;</i>下载
            </el-button>
          </template>
          <template slot="action"
                    slot-scope="scope">
            <span v-if="buttonSwitch.update"
                  class="ui-link"
                  @click="handleEdit(scope.data)">编辑</span>
            <el-dropdown @command="handleMoreMenu($event,scope.data.row)">
              <span class="ui-link">
                更多 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="detail">详情</el-dropdown-item>
                <el-dropdown-item v-if="buttonSwitch.delete"
                                  command="delete">
                  <el-popconfirm :title="`确定删除吗?`"
                                 @confirm="handleDelete(scope.data.row)">
                    <span class="online-dropmenu-item-content"
                          slot="reference">删除</span>
                  </el-popconfirm>
                </el-dropdown-item>
                <template v-if="buttonLinkList && buttonLinkList.length>0">
                  <el-dropdown-item v-for="(btnItem,btnIndex) in buttonLinkList"
                                    :key="'btnLink'+btnIndex ">
                    <span class="online-dropmenu-item-content"
                          @click="buttonLinkHandler(scope.data.row,btnItem.buttonCode,btnItem.optType)">
                      <i v-if="btnItem.buttonIcon"
                         :class="btnItem.buttonIcon" />
                      {{ btnItem.buttonName }}
                    </span>
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </o-table>
      </div>
    </el-card>
    <!-- <div v-else-if="isShowEmpty"
         class="ui-empty">暂无数据</div> -->
    <edit v-if="visibleEdit"
          :editParam="editParam"
          :dialogVisible.sync="visibleEdit"></edit>
    <o-import ref="oImport"
              :url="`${urlList.importXls}/${this.code}`"
              @loadData="loadData"></o-import>
  </div>
</template>

<script>
import oSearch from '../common/components/search.vue';
import oTable from '../common/components/table.vue';
import oImport from '../common/components/import.vue';
import oSuperQuery from '../common/components/super-query.vue';
import edit from './model/edit.vue';
import MinXin from '@/common/script/mixin';
import * as testData from '../common/script/testData.json';
import { filterMultiDictText, getFileUrl, filterObj } from '../common/script/util.js';
export default {
  name: 'online-form-view',
  mixins: [MinXin],
  components: { oSearch, oTable, oImport, edit, oSuperQuery },
  inject: ['reload'],
  data() {
    return {
      code: '',
      urlList: this.$urlList.onlineFormApi,
      isShowEmpty: false,
      searchParam: {
        arrList: [],
        form: {},
      },
      description: '在线报表功能测试页面',
      currentTableName: '',
      dictOptions: {},
      buttonList: null,
      buttonLinkList: null,
      buttonSwitch: {
        add: true,
        update: true,
        delete: true,
        batch_delete: true,
        import: true,
        export: true,
      },
      tableParam: {
        selection: false,
        isPagination: false,
        pagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: [5, 10, 15, 20, 30],
          total: 0,
        },
        orderObj: {
          column: 'id',
          order: 'desc',
        },
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          showLength: 120,
        },
        columns: [],
        data: [],
        selectedIds: [],
      },
      visibleEdit: false,
      editParam: {
        id: '',
        disabled: false,
        title: '',
        configInfo: null,
      },
      /* 高级查询条件 */
      superQueryParams: '',
      /** 高级查询拼接方式 */
      superQueryMatchType: 'and',
      superFieldList: [],
    };
  },
  watch: {},
  methods: {
    handleSuperQuery(obj) {
      const { params, matchType } = obj;
      // 高级查询方法
      if (!params || params.length === 0) {
        this.superQueryParams = '';
        this.superQueryMatchType = 'and';
      } else {
        this.superQueryParams = JSON.stringify(params);
        this.superQueryMatchType = matchType;
      }
      this.loadData();
    },
    handleAction(buttonCode, dataId) {
      let params = {
        formId: this.code,
        buttonCode: buttonCode,
        dataId,
      };
      console.log('自定义按钮请求后台参数：', params);
      this.http.apiPost(this.urlList.doButton, params, { dataType: 'json' }).then((res) => {
        if (res.code == 0) {
          this.loadData();
          this.common.message(true, '处理完成', 'success', 3000);
        } else {
          this.common.message(true, '处理失败', 'warning', 3000);
        }
      });
    },
    buttonHandler(optType, buttonCode) {
      if (optType === 'action') {
        if (!this.tableParam.selectedIds || this.tableParam.selectedIds.length == 0) {
          this.common.message(true, '请先选中一条记录', 'warning', 3000);
          return;
        }
        if (this.tableParam.selectedIds.length > 1) {
          this.common.message(true, '请只选中一条记录', 'warning', 3000);
          return;
        }
        this.handleAction(buttonCode, this.tableParam.selectedIds[0]);
      }
    },
    buttonLinkHandler(record, buttonCode, optType) {
      if (optType == 'action') {
        this.handleAction(buttonCode, record.id);
      }
    },
    downloadRowFile(text) {
      if (!text) {
        this.$message.warning('未知的文件');
        return;
      }
      const url = this.getFullUrl(text);
      window.open(url);
    },
    getFullUrl(text) {
      if (text && text.indexOf(',') > 0) {
        text = text.substring(0, text.indexOf(','));
      }
      return getFileUrl(text) + '?token=' + this.$store.getters.token;
    },
    handleImport() {
      this.$refs.oImport.show();
    },
    handleExport() {
      let params = this.searchParam.form;
      if (this.tableParam.selectedIds.length > 0) {
        params['selections'] = this.tableParam.selectedIds.join(',');
      }
      console.log('导出参数', params);
      this.http
        .apiExportGet(`${this.urlList.exportXls}/${this.code}`, {
          params,
          responseType: 'blob',
        })
        .then((res) => {
          const data = res.data;
          if (!data) {
            this.common.message(true, '文件下载失败', 'warning', 3000);
            return;
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(
              new Blob([data], {
                type: 'application/vnd.ms-excel',
              }),
              this.description + '.xls'
            );
          } else {
            let url = window.URL.createObjectURL(
              new Blob([data], {
                type: 'application/vnd.ms-excel',
              })
            );
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', this.description + '.xls');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // 释放掉blob对象
          }
        });
    },
    handleTableSort({ column, order }) {
      const obj = {
        ascending: 'asc',
        descending: 'desc',
      };
      this.$set(this.tableParam.orderObj, 'column', column);
      this.$set(this.tableParam.orderObj, 'order', obj[order] || order);
    },
    paginationChange({ current, pageSize }) {
      this.$set(this.tableParam.pagination, 'current', current);
      this.$set(this.tableParam.pagination, 'pageSize', pageSize || this.tableParam.pagination.pageSize);
      this.loadData();
    },
    async loadData() {
      const { current, pageSize } = this.tableParam.pagination;
      let params = Object.assign({}, this.searchParam.form, this.tableParam.orderObj);
      if (this.tableParam.isPagination) {
        params.pageNo = current;
        params.pageSize = pageSize;
      }
      if (this.superQueryParams) {
        params['superQueryParams'] = encodeURI(this.superQueryParams);
      }
      params['superQueryMatchType'] = this.superQueryMatchType;
      const res = await this.http.apiGet(`${this.urlList.getData}/${this.code}`, { params: filterObj(params) });
      if (res.code == '0') {
        let result = res.data;
        if (Number(result.total) > 0) {
          this.tableParam.pagination.total = Number(result.total);
          this.tableParam.data = result.records;
        } else {
          this.tableParam.pagination.total = 0;
          this.tableParam.data = [];
        }
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    async initColumns() {
      // const res = testData.getColumns;
      const res = await this.http.apiGet(`${this.urlList.getColumns}/${this.code}`);
      if (res.code == '0') {
        this.dictOptions = res.data.dictOptions;
        this.description = res.data.description;
        this.currentTableName = res.data.currentTableName;
        this.tableParam.selection = res.data.checkboxFlag == 'Y';
        this.tableParam.isPagination = res.data.paginationFlag == 'Y';
        this.initButtonList(res.data.cgButtonList);
        this.initButtonSwitch(res.data.hideColumns);
        // this.initCgEnhanceJs(res.data.enhanceJs);
        let currColumns = res.data.columns;
        for (let a = 0; a < currColumns.length; a++) {
          if (currColumns[a].customRender) {
            let dictCode = currColumns[a].customRender;
            let replaceFlag = '_replace_text_';
            if (dictCode.startsWith(replaceFlag)) {
              let textFieldName = dictCode.replace(replaceFlag, '');
              currColumns[a].customRender = (text, record) => {
                return record[textFieldName];
              };
            } else {
              currColumns[a].customRender = (text) => {
                return filterMultiDictText(this.dictOptions[dictCode], text);
              };
            }
          }
        }
        // if (res.result.scrollFlag == 1) {
        //   this.table.scroll = { x: '115%' };
        // } else {
        //   this.table.scroll = { x: false };
        // }
        currColumns.push(this.tableParam.actionColumn);
        this.tableParam.columns = currColumns;
        this.loadData();
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    async initForm() {
      const res = await this.http.apiGet(`${this.urlList.getFormItem}/${this.code}`);
      // const res = testData.getFormItem;
      if (res.code == '0') {
        this.$set(this.editParam, 'configInfo', res.data);
        const propObj = res.data.schema.properties;
        for (const key in propObj) {
          const superItem = {
            type: propObj[key].view,
            value: key,
            label: propObj[key].title,
            options: propObj[key].enum,
            dictCode: propObj[key].dictCode,
            dictTable: propObj[key].dictTable,
            dictText: propObj[key].dictText,
          };
          this.superFieldList.push(superItem);
        }
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    async initQueryInfo() {
      const res = await this.http.apiGet(`${this.urlList.getQueryInfo}/${this.code}`);
      if (res.code == '0') {
        this.searchParam.arrList = res.data;
        this.searchParam.arrList.forEach((item) => {
          if (item.mode === 'single') {
            this.$set(this.searchParam.form, item.dbField, item.defValue);
          } else {
            this.$set(this.searchParam.form, item.dbField + '_begin', item.defValue);
            this.$set(this.searchParam.form, item.dbField + '_end', item.defValue);
          }
        });
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    initButtonList(btnList) {
      let linkArr = [];
      let buttonArr = [];
      if (btnList && btnList.length > 0) {
        for (let i = 0; i < btnList.length; i++) {
          let temp = btnList[i];
          if (temp.buttonStyle == 'button') {
            buttonArr.push(temp);
          } else if (temp.buttonStyle == 'link') {
            linkArr.push(temp);
          }
        }
      }
      this.buttonLinkList = [...linkArr];
      this.buttonList = [...buttonArr];
    },
    initButtonSwitch(hideColumns) {
      if (hideColumns && hideColumns.length > 0) {
        Object.keys(this.buttonSwitch).forEach((key) => {
          if (hideColumns.indexOf(key) >= 0) {
            this.buttonSwitch[key] = false;
          }
        });
      }
    },
    handleAdd() {
      this.$store.commit('user/SET_OPERATSTATE', 'add');
      this.visibleEdit = true;
      this.editParam.id = '';
      this.editParam.isDetail = false;
      this.editParam.title = '创 建';
      // this.cgButtonJsHandler('beforeAdd');
    },
    handleEdit({ row }) {
      this.$store.commit('user/SET_OPERATSTATE', 'edit');
      this.visibleEdit = true;
      this.editParam.id = row.id;
      this.editParam.isDetail = false;
      this.editParam.title = '编 辑';
    },
    handleDetail(id) {
      this.$store.commit('user/SET_OPERATSTATE', 'detail');
      this.visibleEdit = true;
      this.editParam.id = id;
      this.editParam.isDetail = true;
      this.editParam.title = '详 情';
    },
    handleMoreMenu(type, row) {
      if (type === 'detail') {
        this.handleDetail(row.id);
      }
    },
    async handleDelete({ id }) {
      const res = await this.http.apiDelete(`${this.urlList.autoForm}/${this.code}/${id}`);
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    handleBatchDelete() {
      this.common.MessageBoxconfirm('是否删除选中数据?', '确认删除？', '确定', '取消', 'warning', 'shanchu').then(async () => {
        const res = await this.http.apiDelete(`${this.urlList.autoForm}/${this.code}/${this.tableParam.selectedIds.join(',')}`);
        if (res && res.code == '0') {
          this.common.message(true, res.message, 'success', 3000);
          this.loadData();
        } else {
          this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
        }
      });
    },
    selectionChange(selection) {
      this.tableParam.selectedIds = [];
      selection.forEach((item) => {
        this.tableParam.selectedIds.push(item.id);
      });
    },
    clearSearchForm() {
      Object.keys(this.searchParam.form).forEach((key) => {
        this.$set(this.searchParam.form, key, '');
      });
    },
    async init() {
      this.code = this.$route.query.code;
      await this.initColumns();
      this.initForm();
      this.initQueryInfo();
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.isShowEmpty = true;
    }, 3000);
    this.init();
  },
  computed: {},
};
</script>

<style lang="less">
.online-template-view-wrap {
  .icongroup {
    display: flex;
    .online-config-btn {
      line-height: 16px;
      icon {
        font-size: 16px;
      }
    }
  }
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
  .ui-empty {
    text-align: center;
    margin-top: 100px;
    color: #888;
  }
  .table-col-tips {
    font-size: 12px;
    font-style: italic;
  }
  .table-col-img {
    display: block;
    margin: 0 auto;
  }
  .table-row-btn.el-button--small {
    padding: 4px 10px;
    font-size: 12px;
  }
}
</style>
