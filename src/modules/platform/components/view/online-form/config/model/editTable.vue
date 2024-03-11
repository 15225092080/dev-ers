<template>
  <div>
    <div v-if="hasBtn"
         class="online-edittable-button-wrap">
      <el-button-group>
        <el-button type="primary"
                   @click="handleAdd"><i class="DHCiconfont">&#xe6c3;</i>新增</el-button>
        <el-popover v-if="addBtnSettings"
                    placement="right"
                    width="200"
                    trigger="hover"
                    popper-class="online-edittable-settings-wrap">
          <section class="settings-top">
            <span>选项</span>
            <span>
              <el-tooltip content="保存为默认值"
                          placement="top">
                <i type="text"
                   class="el-icon-collection settings-save-btn"
                   @click="setSettings" />
              </el-tooltip>
            </span>
          </section>
          <section class="settings-bottom">
            <div class="settings-bottom-item">
              <span class="item-label">添加行数</span>
              <el-input-number v-model="settings.addRowNum"
                               :min="1"
                               controls-position="right" />
            </div>
            <section class="settings-bottom-item-wrap">
              <div class="settings-bottom-item">
                <span class="item-label">添加位置</span>
                <el-input-number v-model="settings.addIndex"
                                 :min="0"
                                 :max="tableData.length"
                                 controls-position="right" />
              </div>
              <p class="setting-idx-tips">0 = 最底部</p>
            </section>
            <el-checkbox v-model="settings.addScrollToBottom">添加后滚动到底部</el-checkbox>
          </section>
          <el-button slot="reference"
                     icon="el-icon-setting"
                     class="settings-icon-btn"
                     type="primary">
          </el-button>
        </el-popover>
      </el-button-group>
      <template v-if="selectedRowIds.length > 0">
        <el-popconfirm :title="`确定要删除这 ${selectedRowIds.length} 项吗?`"
                       @confirm="handleDelete">
          <el-button slot="reference"
                     class="button-gap"
                     type="primary"><i class="DHCiconfont">&#xe6a4;</i>删除</el-button>
        </el-popconfirm>
        <el-button class="border_btn"
                   plain
                   @click="handleClearSelection">
          <i class="DHCiconfont">&#xe6a3;</i>清空选择
        </el-button>
      </template>
    </div>
    <el-table ref="editTable"
              class="online-edit-table"
              :data="tableData"
              row-key="id"
              :fit="fit"
              :max-height="tableHeight"
              @selection-change="handleSelectionChange">
      <el-table-column v-if="dragSort"
                       label=""
                       width="40px"
                       align="center"
                       @dblclick="insertRow(rowIndex)">
        <template slot-scope="scope">
          <el-dropdown @command="handleDragMenu($event,scope)">
            <i class="el-icon-s-operation drag-icon"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="moveUp"
                                :disabled="scope.$index === 0">向上移</el-dropdown-item>
              <el-dropdown-item command="moveDown"
                                :disabled="scope.$index === tableData.length - 1">向下移</el-dropdown-item>
              <el-dropdown-item v-if="hasBtn"
                                command="insertRow"
                                divided>插入一行</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
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
                       :prop="th.field"
                       :label="th.title"
                       :fixed="th.fixed"
                       :min-width="th.minWidth || '40px'"
                       :width="th.width || 'auto'"
                       :align="th.align ? th.align : 'center'">
        <template slot-scope="scope">
          <template v-if="th.fieldType === 'select' || th.fieldType === 'select_mult'">
            <el-tooltip v-bind="buildTooltip(scope.row, th)">
              <o-select @eventChange="handleSelectValidate"
                        :changeEventParam="{row:scope.row,col:th}"
                        :filterable="th.filterable || th.allowCreate"
                        :allowCreate="th.allowCreate"
                        :multiple="th.fieldType === 'select_mult'"
                        :options="th.customOption"
                        :disabled="isDisabled(scope.row,th)"
                        :clearable="true"
                        v-model="scope.row[th.field]"></o-select>
            </el-tooltip>
          </template>
          <template v-else-if="th.fieldType === 'checkbox'">
            <el-checkbox @change="th.change && th.change.handleChange($event,scope.$index)"
                         :disabled="isDisabled(scope.row,th)"
                         :true-label="checkboxLabel.trueLabel"
                         :false-label="checkboxLabel.falseLabel"
                         v-model="scope.row[th.field]"></el-checkbox>
          </template>
          <template v-else-if="th.fieldType === 'input'">
            <el-tooltip v-bind="buildTooltip(scope.row, th)">
              <el-input @blur="handleValidate(scope.row,th)"
                        :disabled="isDisabled(scope.row,th)"
                        v-model="scope.row[th.field]"></el-input>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import oSelect from '../../common/components/select.vue';
import Sortable from 'sortablejs';
import * as initData from '../../common/script/initData.json';
export default {
  name: 'child',
  components: { oSelect },
  data() {
    return {
      fieldRow: initData.fieldRow,
      idxRow: initData.idxRow,
      settings: {
        // 添加行数
        addRowNum: 1,
        // 添加位置（下标），0 = 最底部
        addIndex: 0,
        // 添加后滚动到底部
        addScrollToBottom: false,
      },
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
      // 是否展示前面的勾选框
      type: Boolean,
      default: false,
    },
    fit: {
      // 列的宽度是否自撑开
      type: Boolean,
      default: true,
    },
    dragSort: {
      // 是否支持拖动排序
      type: Boolean,
      default: false,
    },
    hasBtn: {
      // 是否显示操作按钮
      type: Boolean,
      default: false,
    },
    // 是否显示添加按钮选项
    addBtnSettings: {
      type: Boolean,
      default: false,
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
    handleDragMenu(type, scope) {
      if (type === 'moveUp') {
        this.handleMoveUp(scope);
      }
      if (type === 'moveDown') {
        this.handleMoveDown(scope);
      }
      if (type === 'insertRow') {
        this.insertFieldRow(scope.$index + 1);
      }
    },
    handleMoveUp({ $index }) {
      if ($index === 0) return;
      const targetRow = this.tableData.splice($index, 1)[0];
      this.tableData.splice($index - 1, 0, targetRow);
    },
    handleMoveDown({ $index }) {
      if ($index === this.tableData.length - 1) return;
      const targetRow = this.tableData.splice($index, 1)[0];
      this.tableData.splice($index + 1, 0, targetRow);
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
    insertIdxRow() {
      this.idxRow.id = this.tableData.length + 1 + '' + new Date().getTime();
      this.tableData.push(this._.cloneDeep(this.idxRow));
    },
    handleAdd() {
      if (this.addBtnSettings) {
        const obj = {
          idx: parseInt(this.settings.addIndex) || this.tableData.length,
          num: this.settings.addRowNum,
          scrollToBottom: this.settings.addScrollToBottom,
        };
        this.insertFieldRow(obj.idx, obj.num, obj.scrollToBottom);
      } else {
        this.insertIdxRow();
      }
    },
    setSettings() {
      localStorage.setItem('online-edit-table-add-btn-settings', JSON.stringify(this.settings));
      this.common.message(true, '保存成功', 'success', 1000);
    },
    getSettings() {
      let obj = localStorage.getItem('online-edit-table-add-btn-settings');
      if (obj) {
        Object.assign(this.settings, JSON.parse(obj));
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
    handleClearSelection() {
      this.$refs.editTable.clearSelection();
    },
  },
  created() {
    this.getSettings();
  },
  mounted() {
    const el = this.$refs.editTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
    const sortable = Sortable.create(el, {
      handle: '.drag-icon',
      onEnd: (evt) => {
        const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
        this.tableData.splice(evt.newIndex, 0, targetRow);
        // for (let index in this.tableData) {
        //   this.tableData[index].sort = parseInt(index) + 1;
        // }
      },
    });
  },
};
</script>
<style lang="less">
.online-edittable-button-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  .settings-icon-btn.el-button--small {
    padding: 8px;
    border-radius: 0 3px 3px 0;
  }
  .button-gap {
    margin: 0 10px;
  }
}
.online-edittable-settings-wrap {
  &.el-popover {
    padding: 0 0 10px;
  }
  .settings-top {
    box-sizing: border-box;
    display: flex;
    padding: 8px 16px;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 12px;
    justify-content: space-between;
    align-items: center;
    .settings-save-btn {
      display: inline-block;
      cursor: pointer;
      color: #409eff;
    }
  }
  .settings-bottom {
    padding: 5px 16px;
    .settings-bottom-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-label {
        flex: none;
        margin-right: 6px;
      }
    }
    .settings-bottom-item-wrap {
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px solid #dcdfe6;
    }
    .setting-idx-tips {
      font-size: 12px;
      color: #aaa;
      line-height: 20px;
      text-align: right;
    }
  }
}
.online-edit-table.el-table {
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
  .drag-icon {
    display: inline-block;
    cursor: move;
  }
  .validate-failed .el-input__inner {
    border-color: red;
    box-shadow: 0 0 0 2px rgb(255 0 0 / 20%);
  }
}
</style>
