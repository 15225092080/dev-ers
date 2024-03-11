import Clipboard from 'clipboard';
import oTable from '../components/table.vue';
import oSearch from '../components/search.vue';
import oSuperQuery from '../components/super-query.vue';

export default {
  components: {
    oTable,
    oSearch,
    oSuperQuery
  },
  data() {
    return {
      // 选择的id
      selectedIds: [],
      // 高级查询条件
      superQueryParams: '',
      // 高级查询拼接方式
      superQueryMatchType: 'and',
      // 复制弹窗显隐
      copyUrlDialogVisible: false,
      // 复制弹窗url
      configUrl: '',
      // 复制弹窗title
      copyUrlTitle: '',
      visibleSql: false,
      visibleConfigBtn: false,
      visibleEdit: false,
      editParam: {
        id: '',
        title: ''
      }
    };
  },
  methods: {
    /* 列表页公共方法begin */
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
    setConfigUrl(record) {
      this.configUrl = `online-form-view?code=${record.id}`;
      this.copyUrlTitle = '菜单链接[' + record.tableTxt + ']';
      this.copyUrlDialogVisible = true;
    },
    copyUrl() {
      var clipboard = new Clipboard('.copy-this-text');
      clipboard.on('success', () => {
        clipboard.destroy();
        this.common.message(true, '复制成功', 'success', 3000);
        this.copyUrlDialogVisible = false;
      });
      clipboard.on('error', () => {
        this.common.message(true, '该浏览器不支持自动复制', 'error', 3000);
        clipboard.destroy();
      });
    },
    enhanceJava() {},
    enhanceSql() {
      if (this.selectedIds && this.selectedIds.length !== 1) {
        this.common.message(true, '请先选中一条记录！', 'warning', 3000);
      } else {
        this.visibleSql = true;
      }
    },
    enhanceJs() {},
    configBtn() {
      if (this.selectedIds && this.selectedIds.length !== 1) {
        this.common.message(true, '请先选中一条记录！', 'warning', 3000);
      } else {
        this.visibleConfigBtn = true;
      }
    },
    handleMoreMenu(type, row) {
      this.currentRow = row;
      if (type === 'test') {
        this.$router.push({ path: '/online-form-view', query: { code: row.id } });
      }
      if (type === 'configUrl') {
        this.setConfigUrl(row);
      }
      if (type === 'syncDb') {
        this.syncType = 'normal';
        this.syncDbDialogVisible = true;
      }
      if (type == 'configView') {
        this.$router.push({ path: '/online-form-copy', query: { code: row.id } });
      }
    },
    handleAdd() {
      this.$store.commit('user/SET_OPERATSTATE', 'add');
      this.visibleEdit = true;
      this.editParam.id = '';
      this.editParam.title = '创建';
    },
    handleEdit({ row }) {
      this.$store.commit('user/SET_OPERATSTATE', 'edit');
      this.visibleEdit = true;
      this.editParam.id = row.id;
      this.editParam.title = '编辑';
    },
    async handleDelete({ id }, type) {
      const { deleteRecord, removeRecord } = this.urlList; // 必须是onlineFormHead
      const url = type === 'delete' ? deleteRecord : removeRecord;
      const res = await this.http.apiDelete(url, {
        params: {
          id
        }
      });
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    selectionChange(selection) {
      this.selectedIds = [];
      selection.forEach(item => {
        this.selectedIds.push(item.id);
      });
    },
    paginationChange({ current, pageSize }) {
      this.$set(this.tableParam.pagination, 'current', current);
      this.$set(this.tableParam.pagination, 'pageSize', pageSize || this.tableParam.pagination.pageSize);
      this.loadData();
    },
    clearSearchForm() {
      Object.keys(this.searchParam.form).forEach(key => {
        this.$set(this.searchParam.form, key, '');
      });
    }
    /* 列表页公共方法end */
    /* 编辑页公共方法begin */

    /* 编辑页公共方法end */
  }
};
