<template>
  <div class="online-template-view-edut-table-wrap">
    <div class="button-wrap">
      <el-button type="primary"
                 @click="handleAdd"><i class="DHCiconfont">&#xe6c3;</i>新增</el-button>
      <template v-if="selectedRowIds.length > 0">
        <el-popconfirm :title="`确定要删除这 ${selectedRowIds.length} 项吗?`"
                       @confirm="handleDelete">
          <el-button slot="reference"
                     class="button-gap"
                     type="primary"><i class="DHCiconfont">&#xe6a4;</i>删除</el-button>
        </el-popconfirm>
      </template>
    </div>
    <el-table ref="editTable"
              class="edit-table"
              :data="tableData"
              row-key="id"
              :fit="fit"
              :max-height="tableHeight"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="30px"
                       align="center"
                       :selectable="isSelectable"
                       v-if="selection"></el-table-column>
      <el-table-column label="#"
                       type="index"
                       width="40px"
                       align="center">
      </el-table-column>
      <el-table-column v-for="(th, key) in tableCfg"
                       :key="key"
                       label-class-name="label-wrap"
                       :prop="th.key"
                       :label="th.title"
                       :fixed="th.fixed"
                       :min-width="th.minWidth || '40px'"
                       :width="th.width || 'auto'"
                       :align="th.align ? th.align : 'center'">
        <template slot-scope="scope">
          <template v-if="th.type === 'select' || th.type === 'select_mult'">
            <el-tooltip v-bind="buildTooltip(scope.row, th)">
              <o-select @eventChange="handleSelectValidate"
                        :changeEventParam="{row:scope.row,col:th}"
                        :filterable="th.filterable || th.allowCreate"
                        :allowCreate="th.allowCreate"
                        :multiple="th.type === 'select_mult'"
                        :options="th.customOption"
                        :disabled="isDisabled(scope.row,th)"
                        :clearable="true"
                        v-model="scope.row[th.key]"></o-select>
            </el-tooltip>
          </template>
          <template v-else-if="th.type === 'checkbox'">
            <el-checkbox @change="th.change && th.change.handleChange($event,scope.$index)"
                         :disabled="isDisabled(scope.row,th)"
                         :true-label="checkboxLabel.trueLabel"
                         :false-label="checkboxLabel.falseLabel"
                         v-model="scope.row[th.key]"></el-checkbox>
          </template>
          <template v-else-if="th.type === 'input'">
            <el-tooltip v-bind="buildTooltip(scope.row, th)">
              <el-input @blur="handleValidate(scope.row,th)"
                        :disabled="isDisabled(scope.row,th)"
                        v-model="scope.row[th.key]"></el-input>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import oSelect from '../../common/components/select.vue';
import * as initData from '../../common/script/initData.json';
export default {
  name: 'child',
  components: { oSelect },
  data() {
    return {
      fieldRow: initData.fieldRow,
      selectedRowIds: [],
      checkboxLabel: {
        trueLabel: 1,
        falseLabel: 0,
      },
      // 存储显示tooltip的信息
      tooltips: {},
      // 存储没有通过验证的inputId
      notPassedIds: [],
    };
  },
  props: {
    tableCfg: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tableHeight: {
      type: String | Number,
      default: 260,
    },
    selection: {
      type: Boolean,
      default: true,
    },
    fit: {
      type: Boolean,
      default: true,
    },
    noPassed: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {},
  watch: {},
  methods: {
    handleSelectValidate({ row, col }) {
      this.$emit('handleValidate', { row, col });
    },
    handleValidate(row, col) {
      this.$emit('handleValidate', { row, col });
    },
    buildTooltip(row, col) {
      const key = row.id + '-' + col.field;
      const obj = this.noPassed[key];
      if (col.rules && obj && !obj.disabled) {
        let props = {
          key,
          effect: 'dark',
          content: obj.errorMsg,
          placement: 'top',
          class: 'validate-failed',
        };
        return props;
      } else {
        return {
          disabled: true,
        };
      }
    },
    isDisabled(row, th) {
      return row.disabled || th.disabled;
    },
    isSelectable(row) {
      return !row.disabled;
    },
    insertFieldRow(idx, num = 1, scrollToBottom = false) {
      const newRows = [];
      for (let i = 0; i < num; i++) {
        this.fieldRow.id = new Date().getTime() + i.toString() + '' + this.tableData.length;
        newRows.push(this._.cloneDeep(this.fieldRow));
      }
      this.tableData.splice(idx, 0, ...newRows);
      if (scrollToBottom) {
        this.$nextTick(() => {
          const top = this.$refs.editTable.bodyWrapper.scrollHeight;
          this.$refs.editTable.bodyWrapper.scrollTop = top;
        });
      }
    },
    handleDelete() {
      this.$emit('deleteTableData', this.selectedRowIds);
    },
    handleSelectionChange(selection) {
      this.selectedRowIds = [];
      selection.forEach((item) => {
        this.selectedRowIds.push(item.id);
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less">
.online-template-view-edut-table-wrap {
  .button-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    .button-gap {
      margin: 0 10px;
    }
  }
  .edit-table.el-table {
    th > .cell.label-wrap {
      white-space: pre-wrap;
      word-break: break-all;
    }
    td {
      padding: 2px 5px;
    }
    .el-table-column--selection .cell {
      padding: 0;
    }
    .validate-failed .el-input__inner {
      border-color: red;
      box-shadow: 0 0 0 2px rgb(255 0 0 / 20%);
    }
  }
}
</style>
