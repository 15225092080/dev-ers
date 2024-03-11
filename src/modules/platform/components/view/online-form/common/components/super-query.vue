<template>
  <div class="ui-online-super-query-wrap">
    <div>
      <el-tooltip v-if="superQueryFlag"
                  placement="top">
        <template slot="content">
          <span>已有高级查询条件生效</span>
          <el-divider direction="vertical" />
          <a class="ui-online-super-query-tooltip-reset-btn"
             @click="handleReset">清空</a>
        </template>
        <el-button class="add_btn"
                   plain
                   @click="superQuery">
          <i class="el-icon-loading"></i>
          <span>高级查询</span>
        </el-button>
      </el-tooltip>
      <el-button v-else
                 class="add_btn"
                 plain
                 @click="superQuery">
        <i class="DHCiconfont">&#xe6a5;</i>高级查询
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               width="950px"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">高级查询构造器</span>
        <span class="dialog-title-bg"></span>
      </span>
      <div class="dialog-content">
        <section class="query-add-card">
          <el-empty v-if="queryParamsModel.length === 0"
                    class="empty-card"
                    description="没有任何查询条件"
                    :image-size="80">
            <el-button class="add_btn"
                       plain
                       @click="addNewLine">点解新增</el-button>
          </el-empty>
          <div v-else
               class="add-form">
            <section class="top-item">
              <span class="item-label">过滤条件匹配</span>
              <o-select class="item-select"
                        v-model.trim="matchType"
                        :options="matchTypeOptions"></o-select>
            </section>
            <section class="add-item-wrap"
                     v-for="(item, index) in queryParamsModel"
                     :key="currentSavelabel+index">
              <o-select-tree class="ui-online-tree-select"
                             v-model.trim="item.field"
                             :selectParams="selectParams"
                             :treeParams="treeParams"
                             @handleSelectd="(data)=>handleSelected(data,item)">
              </o-select-tree>
              <o-select class="item-rule"
                        v-model="item.rule"
                        :options="ruleOptions"
                        :clearable="false"></o-select>
              <div class="item-val-wrap">
                <!-- 'date','datetime' -->
                <el-date-picker v-if="['date','datetime'].indexOf(item.type)!==-1"
                                :key="item.field"
                                v-model.trim="item.val"
                                :type="item.type"
                                :editable="false"
                                :value-format="dateFormat[item.type]"
                                :placeholder="'请选择' + (item.label || '')">
                </el-date-picker>
                <!-- select -->
                <o-select v-else-if="['list','list_multi','radio','checkbox'].indexOf(item.type)!==-1"
                          :key="item.field"
                          v-model.trim="item.val"
                          :dictCode="item.dictCode"
                          :dictTable="item.dictTable"
                          :dictText="item.dictText"
                          :options="item.options"
                          :multiple="['list_multi','checkbox'].indexOf(item.type)!==-1 || item.rule === 'in'"
                          :placeholder="'请选择' + (item.label || '')"></o-select>
                <!-- inputNumber -->
                <el-input-number v-else-if="item.type === 'number'"
                                 v-model.trim="item.val"
                                 controls-position="right"
                                 :placeholder="'请输入' + (item.label || '')"></el-input-number>
                <!-- input -->
                <el-input v-else
                          :key="item.field"
                          v-model.trim="item.val"
                          :placeholder="'请输入' + (item.label || '')"></el-input>
              </div>
              <i class="item-icon-btn el-icon-plus"
                 @click="addNewLine"></i>
              <i class="item-icon-btn el-icon-minus"
                 @click="handleDel(index)"></i>
            </section>
          </div>
        </section>
        <div class="save-query-card">
          <span class="title">保存的查询</span>
          <el-empty v-if="saveTreeData.length === 0"
                    class="empty-card"
                    description="没有保存任何查询"
                    :image-size="70">
          </el-empty>
          <el-tree v-else
                   :key="fullSaveCode"
                   class="tree"
                   :data="saveTreeData"
                   node-key="label"
                   :default-expand-all="true"
                   @node-click="handleNodeClick">
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>
                <i class="el-icon-document"></i>
                <span>{{ node.label }}</span>
              </span>
              <i class="el-icon-close"
                 @click="handleRemoveSaveTreeItem(node)"></i>
            </span>
          </el-tree>
          <!-- @select="handleTreeSelect" -->
        </div>
      </div>
      <template slot="footer">
        <div style="float: left">
          <el-button class="border_btn"
                     @click="handleReset">重 置</el-button>
          <el-button class="border_btn"
                     @click="handleSave">保存查询条件</el-button>
        </div>
        <el-button class="close_btn"
                   @click="closeDialog">关 闭</el-button>
        <el-button class="submit_btn"
                   @click="handleOk">查 询</el-button>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="prompt.visible"
               :modal="true"
               :close-on-click-modal="false"
               @close="prompt.visible=false"
               width="500px"
               custom-class="model-dialog"
               append-to-body>
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">请输入保存的名称</span>
        <span class="dialog-title-bg"></span>
      </span>
      <div class="form-body">
        <el-input v-model.trim="prompt.value"></el-input>
      </div>
      <template slot="footer">
        <el-button class="close_btn"
                   @click="prompt.visible=false">取 消</el-button>
        <el-button class="submit_btn"
                   @click="handlePromptOk">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import OSelectTree from './select-tree.vue';
import OSelect from './select.vue';
import { isNullArray, removeEmptyObject } from '../script/util.js';

export default {
  name: 'SuperQuery',
  components: {
    OSelect,
    OSelectTree,
  },
  props: {
    fieldList: {
      type: Array,
      required: true,
    },
    /*
     * 这个回调函数接收一个数组参数 即查询条件
     * */
    callback: {
      type: String,
      required: false,
      default: 'handleSuperQuery',
    },

    // 当前是否在加载中
    loading: {
      type: Boolean,
      default: false,
    },

    // 保存查询条件的唯一 code，通过该 code 区分
    // 默认为 null，代表以当前路由全路径为区分Code
    saveCode: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      superQueryFlag: false,
      dialogVisible: false,
      matchTypeOptions: [
        { value: 'and', label: 'AND（所有条件都要求匹配）' },
        { value: 'or', label: 'OR（条件中的任意一个匹配）' },
      ],
      ruleOptions: [
        { value: 'eq', label: '等于' },
        { value: 'like', label: '包含' },
        { value: 'right_like', label: '以..开始' },
        { value: 'left_like', label: '以..结尾' },
        { value: 'in', label: '在...中' },
        { value: 'ne', label: '不等于' },
        { value: 'gt', label: '大于' },
        { value: 'ge', label: '大于等于' },
        { value: 'lt', label: '小于' },
        { value: 'le', label: '小于等于' },
      ],
      fieldTreeData: [],
      currentSavelabel: '',
      queryParamsModel: [],
      // 保存查询条件的treeData
      saveTreeData: [],
      // 查询类型，过滤条件匹配（and、or）
      matchType: 'and',
      selectParams: {
        clearable: true,
        placeholder: '请选择查询字段',
      },
      treeParams: {
        clickParent: true, // 许点击父级关闭弹出框 false 只能点击子级关闭弹出框
        filterable: true,
        'default-expand-all': true,
        'expand-on-click-node': false, // 是否在点击节点的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
        class: 'ui-online-select-tree',
        data: [],
        props: {
          children: 'children',
          label: 'label',
          disabled: 'disabled',
          value: 'value',
        },
      },
      dateFormat: {
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
      },
      prompt: {
        visible: false,
        value: '',
      },
      // 保存查询条件的前缀名
      saveCodeBefore: 'SuperQuerySaved_',
    };
  },
  computed: {
    fullSaveCode() {
      let saveCode = this.saveCode || this.$route.fullPath;
      return this.saveCodeBefore + saveCode;
    },
  },
  watch: {
    // 当 saveCode 变化时，重新查询已保存的条件
    fullSaveCode: {
      immediate: true,
      handler() {
        const data = localStorage.getItem(this.fullSaveCode);
        if (data) {
          this.saveTreeData = JSON.parse(localStorage.getItem(this.fullSaveCode));
        }
      },
    },
    fieldList: {
      deep: true,
      immediate: true,
      handler(val) {
        let mainData = [],
          subData = [];
        val.forEach((item) => {
          let data = { ...item };
          data.label = data.label || data.text;
          let hasChildren = data.children instanceof Array;
          data.disabled = hasChildren;
          data.selectable = !hasChildren;
          if (hasChildren) {
            data.children = data.children.map((item2) => {
              let child = { ...item2 };
              child.label = child.label || child.text;
              child.label = data.label + '-' + child.label;
              // 是否仅包含字段名，不需要拼接子表表名
              if (!data.onlyFieldName) {
                child.value = data.value + ',' + child.value;
              }
              child.val = '';
              return child;
            });
            data.val = '';
            subData.push(data);
          } else {
            mainData.push(data);
          }
        });
        this.fieldTreeData = mainData.concat(subData);
        this.$set(this.treeParams, 'data', this.fieldTreeData);
      },
    },
  },

  methods: {
    handleOk() {
      if (!isNullArray(this.queryParamsModel)) {
        let event = {
          matchType: this.matchType,
          params: removeEmptyObject(this.queryParamsModel, false),
        };
        this.emitCallback(event);
      } else {
        this.common.message(true, '不能查询空条件', 'warning', 2000);
      }
    },
    emitCallback(event = {}) {
      let { params = [], matchType = this.matchType } = event;
      this.superQueryFlag = params && params.length > 0;
      for (let param of params) {
        if (Array.isArray(param.val)) {
          param.val = param.val.join(',');
        }
      }
      console.debug('---高级查询参数--->', { params, matchType });
      this.$emit(this.callback, { params, matchType });
    },
    handleSelected(data, item) {
      let { value, label, type, dbType, options, dictCode, dictTable, dictText, customReturnField } = data;
      this.$set(item, 'options', options);
      this.$set(item, 'field', value);
      this.$set(item, 'label', label);
      this.$set(item, 'type', type);
      this.$set(item, 'dbType', dbType);
      this.$set(item, 'dictCode', dictCode);
      this.$set(item, 'dictTable', dictTable);
      this.$set(item, 'dictText', dictText);
      this.$set(item, 'customReturnField', customReturnField);
      this.$set(item, 'val', '');
    },
    renderFun(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
        </span>
      );
    },
    addNewLine() {
      this.queryParamsModel.push({ rule: 'eq' });
    },
    resetLine() {
      this.superQueryFlag = false;
      this.queryParamsModel = [];
      this.addNewLine();
    },
    handleDel(index) {
      this.queryParamsModel.splice(index, 1);
    },
    handleReset() {
      this.resetLine();
      this.emitCallback({});
    },
    handleSave() {
      let queryParams = removeEmptyObject(this._.cloneDeep(this.queryParamsModel));
      if (isNullArray(queryParams)) {
        this.common.message(true, '空条件不能保存', 'warning', 2000);
      } else {
        this.prompt.value = '';
        this.prompt.visible = true;
      }
    },
    handlePromptOk() {
      let { value } = this.prompt;
      if (!value) {
        this.common.message(true, '保存名称不能为空', 'warning', 2000);
        return;
      }
      let records = removeEmptyObject(this._.cloneDeep(this.queryParamsModel));
      const treeItem = {
        label: value,
        matchType: this.matchType,
        records: records,
      };
      // 判断有没有重名的
      let idx = this.saveTreeData.findIndex((i) => i.label === value);
      if (idx > -1) {
        const _this = this;
        this.common.MessageBoxconfirm(`${value} 已存在，是否覆盖？`, '', '确定', '取消', 'warning', true, function (action) {
          if (action === 'confirm') {
            _this.prompt.visible = false;
            _this.saveTreeData.splice(idx, 1, treeItem);
            localStorage.setItem(_this.fullSaveCode, JSON.stringify(_this.saveTreeData));
            _this.common.message(true, '保存成功', 'success', 2000);
          }
        });
      } else {
        // 没有重名的，直接添加
        this.prompt.visible = false;
        // 添加到树列表中
        this.saveTreeData.push(treeItem);
        localStorage.setItem(this.fullSaveCode, JSON.stringify(this.saveTreeData));
        this.common.message(true, '保存成功', 'success', 2000);
      }
    },
    handleNodeClick(data, node) {
      let { matchType, records, label } = data;
      this.currentSavelabel = label;
      // 将保存的matchType取出，兼容旧数据，如果没有保存就还是使用原来的
      this.matchType = matchType || this.matchType;
      this.queryParamsModel = this._.cloneDeep(records);
    },
    handleRemoveSaveTreeItem(node) {
      const _this = this;
      this.common.MessageBoxconfirm('是否删除当前查询？', '', '确定', '取消', 'warning', true, function (action) {
        if (action === 'confirm') {
          _this.saveTreeData.splice(
            _this.saveTreeData.findIndex((item) => {
              return item.label === node.label;
            }),
            1
          );
          localStorage.setItem(_this.fullSaveCode, JSON.stringify(_this.saveTreeData));
        }
      });
    },
    superQuery() {
      if (!this.queryParamsModel || this.queryParamsModel.length === 0) {
        this.resetLine();
      }
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.ui-online-super-query-wrap {
  .dialog-title {
    float: left;
  }
  .model-dialog .el-dialog__body {
    padding: 15px 20px;
  }
  .dialog-content {
    display: flex;
    .query-add-card {
      flex: 1;
      display: flex;
      justify-content: center;
      width: 72%;
      box-sizing: border-box;
      .add-form {
        width: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        .top-item {
          display: flex;
          align-items: center;
          .item-label {
            display: inline-block;
            width: 100px;
            text-align: left;
          }
          .item-select {
            width: 40%;
          }
        }
        .add-item-wrap {
          display: flex;
          margin-top: 16px;
          .ui-online-tree-select {
            width: 230px;
            .el-tree {
              height: auto;
            }
          }
          .item-rule {
            width: 110px;
            margin: 0 16px;
          }
          .item-val-wrap {
            width: 230px;
          }
          .item-icon-btn {
            width: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 16px;
            border: 1px solid #c0c4cc;
            border-radius: 4px;
            cursor: pointer;
            &.el-icon-plus {
              margin: 0 6px 0 16px;
            }
            &:hover {
              color: #3075c7;
              border-color: #3075c7;
            }
          }
        }
      }
    }
    .save-query-card {
      width: 28%;
      box-sizing: border-box;
      border: 1px solid #ecedf2;
      .title {
        display: block;
        text-align: left;
        font-weight: bold;
        border-bottom: 1px solid #ecedf2;
        padding: 8px;
      }
      .empty-card {
        margin: 10px 0;
      }
      .tree {
        padding: 3px 0;
        height: auto;
        .custom-tree-node {
          display: flex;
          width: 100%;
          padding: 3px 8px;
          box-sizing: border-box;
          justify-content: space-between;
          align-items: center;
          .el-icon-close {
            display: none;
          }
          &:hover {
            background: #e6f7ff;
            .el-icon-close {
              display: block;
            }
          }
        }
        .el-tree-node .el-tree-node__content .expanded.el-tree-node__expand-icon {
          background-image: none;
          min-width: 0;
        }
        .el-tree-node__content {
          .el-tree-node__expand-icon,
          .is-leaf.el-tree-node__expand-icon {
            background-image: none;
            min-width: 0;
          }
          .el-tree-node__label::before {
            content: '';
          }
        }
      }
    }
    .empty-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-empty__description {
        margin: 12px 0;
      }
    }
  }
}
.ui-online-super-query-tooltip-reset-btn {
  color: #5088fb;
  cursor: pointer;
}
.ui-online-super-query-tooltip-reset-btn:hover {
  font-weight: bold;
}
</style>
