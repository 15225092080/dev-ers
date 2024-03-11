<template>
  <div class="ui-online-form-edit-dialog-wrap">
    <el-dialog :visible.sync="dialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               width="800px"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">自定义按钮</span>
        <span class="dialog-title-bg"></span>
      </span>
      <ul class="icongroup"
          style="float:left;margin-bottom:10px">
        <li>
          <el-button class="add_btn"
                     plain
                     @click="handleAdd">
            <i class="DHCiconfont">&#xe6c3;</i>创建
          </el-button>
        </li>
        <li v-if="selectedIds.length > 0">
          <el-button class="border_btn"
                     plain
                     @click="handleBatchDelete">
            批量删除<i class="DHCiconfont">&#xe6a3;</i>
          </el-button>
        </li>
      </ul>
      <o-table :columns="columns"
               :tableData="tableData"
               :pagination="pagination"
               @selectionChange="selectionChange"
               @paginationChange="paginationChange">
        <template slot="action"
                  slot-scope="scope">
          <span class="ui-link"
                @click="handleEdit(scope.data)">编辑</span>
          <el-popconfirm :title="`确定删除吗?`"
                         @confirm="handleDelete(scope.data.row)">
            <span class="ui-link"
                  slot="reference">删除</span>
          </el-popconfirm>
        </template>
      </o-table>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="close_btn"
                   @click="closeDialog"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </div>
    </el-dialog>
    <edit v-if="visibleEdit"
          :dialogVisible.sync="visibleEdit"
          :headId="headId"
          :param="editParam"></edit>
  </div>
</template>
<script>
import edit from './model/edit';
import oTable from '../../common/components/table.vue';
import { filterObj, filterMultiDictText } from '../../common/script/util.js';
import * as dict from '../../common/script/dict.json';
export default {
  data() {
    return {
      selectedIds: [],
      tableData: [],
      columns: [
        {
          title: '按钮编码',
          dataIndex: 'buttonCode',
          minWidth: 110,
        },
        {
          title: '按钮名称',
          dataIndex: 'buttonName',
          minWidth: 110,
        },
        {
          title: '按钮样式',
          dataIndex: 'buttonStyle',
          minWidth: 80,
          customRender: (text) => {
            return filterMultiDictText(dict.btnStyle, text);
          },
        },
        {
          title: '按钮类型',
          dataIndex: 'optType',
          minWidth: 80,
          customRender: (text) => {
            return filterMultiDictText(dict.optType, text);
          },
        },
        {
          title: '排序',
          dataIndex: 'orderNum',
          minWidth: 80,
        },
        {
          title: '按钮图标',
          dataIndex: 'buttonIcon',
          minWidth: 100,
        },
        {
          title: '表达式',
          dataIndex: 'exp',
          minWidth: 110,
        },
        {
          title: '按钮状态',
          dataIndex: 'buttonStatus',
          minWidth: 80,
          customRender: (text) => {
            return filterMultiDictText(dict.btnStatus, text);
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
          showLength: 120,
        },
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: [5, 10, 15, 20, 30],
        total: 0,
      },
      visibleEdit: false,
      editParam: {
        id: '',
        title: '',
      },
    };
  },
  components: {
    oTable,
    edit,
  },
  props: ['dialogVisible', 'headId'],
  methods: {
    async loadData() {
      const params = {
        column: 'orderNum',
        order: 'asc',
        curPage: this.pagination.current,
        maxSize: this.pagination.pageSize,
      };
      const res = await this.http.apiGet(`${this.$urlList.onlineConfigBtn.getPage}/${this.headId}`, { params: filterObj(params) });
      if (res.code == '0') {
        let result = res.data;
        if (Number(result.total) > 0) {
          this.pagination.total = Number(result.total);
          this.tableData = result.rows;
        } else {
          this.pagination.total = 0;
          this.tableData = [];
        }
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    selectionChange(selection) {
      this.selectedIds = [];
      selection.forEach((item) => {
        this.selectedIds.push(item.id);
      });
    },
    paginationChange({ current, pageSize }) {
      this.$set(this.pagination, 'current', current);
      this.$set(this.pagination, 'pageSize', pageSize || this.pagination.pageSize);
      this.loadData();
    },
    handleAdd() {
      this.$store.commit('user/SET_OPERATSTATE', 'add');
      this.visibleEdit = true;
      this.editParam.id = '';
      this.editParam.title = '创 建';
    },
    handleEdit({ row }) {
      this.$store.commit('user/SET_OPERATSTATE', 'edit');
      this.visibleEdit = true;
      this.editParam.id = row.id;
      this.editParam.title = '编 辑';
    },
    async handleDelete({ id }) {
      const res = await this.http.apiDelete(`${this.$urlList.onlineConfigBtn.delete}`, { params: { id } });
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    handleBatchDelete() {
      this.common.MessageBoxconfirm('是否删除选中数据?', '确认删除？', '确定', '取消', 'warning', 'shanchu').then(async () => {
        const res = await this.http.apiDelete(`${this.$urlList.onlineConfigBtn.deleteBatch}`, { params: { ids: this.selectedIds.join(',') } });
        if (res && res.code == '0') {
          this.common.message(true, res.message, 'success', 3000);
          this.loadData();
        } else {
          this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
        }
      });
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
  },
  created() {
    this.loadData();
  },
};
</script>
