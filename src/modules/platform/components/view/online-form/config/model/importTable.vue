<template>
  <div class="ui-online-form-import-table-dialog-wrap">
    <el-dialog :visible.sync="dialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               width="500px"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">从数据库导入表单</span>
        <span class="dialog-title-bg"></span>
      </span>
      <div class="search-warp">
        <span class="item-label">表名：</span>
        <el-input v-model="tableName"
                  @keyup.enter.native="init"
                  placeholder="请输入表名按回车查询"></el-input>
      </div>
      <div class="select-tips-wrap">
        <span>已选择<a>{{selectedIds.length}}</a>项</span>
        <a @click="$refs.table.clearSelection();">清空</a>
      </div>
      <el-table ref="table"
                border
                stripe
                :data="tableData"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="50"></el-table-column>
        <el-table-column label="#"
                         type="index"
                         width="50px"
                         align="center">
        </el-table-column>
        <el-table-column prop="id"
                         label="表名">
        </el-table-column>
      </el-table>
      <el-pagination class="page"
                     :current-page.sync="pagination.current"
                     :page-sizes="pagination.pageSizeOptions"
                     :page-size="pagination.pageSize"
                     layout="slot,prev,pager,next,sizes"
                     :total="pagination.total"
                     @current-change="currentChange"
                     @size-change="sizeChange"
                     @prev-click="currentChange"
                     @next-click="currentChange">
        <span class="el-pagination-slot">共{{ pagination.total }}条</span>
      </el-pagination>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit_btn"
                   @click="submit"><i class="DHCiconfont">&#xe6b3;</i>生成表单</el-button>
        <el-button class="close_btn"
                   @click="closeDialog"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  components: {},
  mixins: [MinXin],
  data() {
    return {
      tableName: '',
      tableData: [],
      selectedIds: [],
      pagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 15, 20],
        total: 0,
      },
      urlList: this.$urlList.onlineFormHead,
    };
  },
  props: ['dialogVisible'],
  computed: {},
  watch: {},
  methods: {
    async submit() {
      let res = await this.http.apiPost(`${this.urlList.transTables}/${this.selectedIds.join(',')}`);
      if (res.code == 0) {
        this.common.message(true, '生成成功', 'success', 1000);
        this.closeDialog();
        this.$parent.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
    handleSelectionChange(selection) {
      this.selectedIds = [];
      selection.forEach((item) => {
        this.selectedIds.push(item.id);
      });
    },
    currentChange(current) {
      this.$set(this.pagination, 'current', current);
      this.init();
    },
    sizeChange(pageSize) {
      this.$set(this.pagination, 'pageSize', pageSize);
      this.$set(this.pagination, 'current', 1);
      this.init();
    },
    async init() {
      const params = {
        curPage: this.pagination.current,
        maxSize: this.pagination.pageSize,
        tableName: this.tableName,
      };
      const res = await this.http.apiGet(this.urlList.queryTables, { params });
      if (res.code == '0') {
        this.$set(this.pagination, 'total', res.data.total);
        this.tableData = res.data.rows;
      } else {
        this.$set(this.pagination, 'total', 0);
        this.tableData = [];
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less">
.ui-online-form-import-table-dialog-wrap {
  .search-warp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item-label {
      flex: none;
      margin-right: 6px;
    }
  }
  .select-tips-wrap {
    display: flex;
    justify-content: start;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    margin: 10px 0;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 4px;
    span {
      margin-right: 32px;
      line-height: 26px;
      font-size: 12px;
      color: #aaa;
    }
    a {
      color: #1890ff;
      line-height: 26px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .page {
    display: flex;
    justify-content: end;
  }
}
</style>
