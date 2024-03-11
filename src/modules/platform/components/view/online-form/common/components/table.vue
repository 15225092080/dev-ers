<template>
  <div>
    <el-table :data="tableData"
              :stripe="true"
              :fit="true"
              @sort-change="sortChange"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="45px"
                       align="center"
                       v-if="selection"></el-table-column>
      <el-table-column v-for="(col,idx) in columns"
                       :key="idx"
                       :prop="col.dataIndex"
                       :label="col.title"
                       :sortable="col.sorter"
                       :sort-by="col.dataIndex"
                       :align="col.align || 'center'"
                       :fixed="col.fixed"
                       :width="col.showLength || 'auto'"
                       :min-width="col.minWidth || 80"
                       :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <slot v-if="col.scopedSlots"
                :name="col.scopedSlots.customRender"
                :data="{ row: scope.row, th: col }"></slot>
          <span v-else-if="col.customRender"
                :style="{color:col.styleColor && col.styleColor[scope.row[col.dataIndex]],}"
                class="ui-cell-span">{{ col.customRender(scope.row[col.dataIndex],scope.row) }}</span>
          <span v-else
                class="ui-cell-span">{{ scope.row[col.dataIndex]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="isPagination"
                   class="page"
                   :current-page.sync="pagination.current"
                   :page-sizes="pagination.pageSizeOptions"
                   :page-size="pagination.pageSize"
                   layout="slot,prev,pager,next,jumper,sizes"
                   :total="pagination.total"
                   @current-change="currentChange"
                   @size-change="sizeChange"
                   @prev-click="currentChange"
                   @next-click="currentChange">
      <span class="el-pagination-slot">本页显示:{{ currentRange }}&nbsp;&nbsp;总计条数:{{ pagination.total }}</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    selection: {
      type: Boolean,
      default: true,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Object,
      default: function () {
        return {
          current: 1,
          pageSize: 10,
          pageSizeOptions: [5, 10, 15, 20],
          total: 0,
        };
      },
    },
    columns: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  computed: {
    currentRange: function () {
      const { current, pageSize, total } = this.pagination;
      let currentTotal = current * pageSize;
      if (current == 1) {
        return current + '-' + currentTotal;
      } else {
        let start = currentTotal - pageSize + 1;
        if (total < currentTotal) {
          currentTotal = total;
        }
        return start + '-' + currentTotal;
      }
    },
  },
  methods: {
    queryPage() {},
    sortChange({ prop, order }) {
      this.$emit('sortChange', { column: prop, order });
    },
    handleSelectionChange(selection) {
      this.$emit('selectionChange', selection);
    },
    currentChange(current) {
      this.$emit('paginationChange', { current });
    },
    sizeChange(pageSize) {
      this.$emit('paginationChange', { pageSize, current: 1 });
    },
  },
  created() {},
};
</script>
