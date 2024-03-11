<template>
  <div class="ui-online-form-edit-dialog-wrap">
    <el-dialog :visible.sync="dialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               width="700px"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">SQL增强</span>
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
               :isPagination="false"
               @selectionChange="selectionChange">
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
          :param="editParam"
          :btnList="btnList"></edit>
  </div>
</template>
<script>
import edit from './model/edit';
import oTable from '../../common/components/table.vue';
import { filterMultiDictText } from '../../common/script/util.js';
export default {
  data() {
    return {
      btnList: [],
      selectedIds: [],
      tableData: [],
      columns: [
        {
          title: '页面按钮',
          dataIndex: 'buttonCode',
          minWidth: 100,
          customRender: (text) => {
            return filterMultiDictText(this.btnList, text);
          },
        },
        {
          title: '增强SQL',
          dataIndex: 'cgbSql',
          minWidth: 360,
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
        form: {},
      },
    };
  },
  components: {
    oTable,
    edit,
  },
  props: ['dialogVisible', 'headId'],
  methods: {
    async getBtnList() {
      const res = await this.http.apiGet(`${this.$urlList.onlineFormHead.enhanceButton}/${this.headId}`);
      if (res.code == '0') {
        let btnList = [
          { label: '创建', value: 'add' },
          { label: '编辑', value: 'edit' },
          { label: '删除', value: 'delete' },
        ];
        res.data.forEach((item) => {
          if (item.optType == 'action') {
            btnList.push({ label: item.buttonName, value: item.buttonCode });
          }
        });
        this.btnList = btnList;
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    async loadData() {
      const res = await this.http.apiGet(`${this.$urlList.onlineFormHead.enhanceSql}/${this.headId}`);
      if (res.code == '0') {
        this.tableData = res.data;
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
      this.editParam.form = row;
    },
    async handleDelete({ id }) {
      const res = await this.http.apiDelete(`${this.$urlList.onlineFormHead.enhanceSql}`, { params: { id } });
      if (res && res.code == '0') {
        this.common.message(true, res.message, 'success', 3000);
        this.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    handleBatchDelete() {
      this.common.MessageBoxconfirm('是否删除选中数据?', '确认删除？', '确定', '取消', 'warning', 'shanchu').then(async () => {
        const res = await this.http.apiDelete(`${this.$urlList.onlineFormHead.deletebatchEnhanceSql}`, { params: { ids: this.selectedIds.join(',') } });
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
    this.getBtnList();
    this.loadData();
  },
};
</script>
