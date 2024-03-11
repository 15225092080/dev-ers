<template>
  <div class="ui-online-form-edit-dialog-wrap">
    <el-dialog :visible.sync="centerDialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{'online在线表单-' + editParam.title}}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <basic-info-form ref="basicInfo"
                       :editParam="editParam"
                       @tableTypeChange="tableTypeChange"></basic-info-form>
      <el-tabs class="tabs-warp"
               v-model="activeName">
        <el-tab-pane label="数据库属性"
                     name="dbAttr">
          <edit-table :selection="noCopyPage"
                      :dragSort="true"
                      :hasBtn="noCopyPage"
                      :addBtnSettings="noCopyPage"
                      :tableCfg="param.dbAttrCfg"
                      :tableData="fieldTableData"
                      :noPassed="noPassedFieldCols"
                      @deleteTableData="deleteFieldTableData"
                      @handleValidate="validateColField"></edit-table>
        </el-tab-pane>
        <el-tab-pane label="页面属性"
                     name="pageAttr">
          <edit-table :tableCfg="param.pageAttrCfg"
                      :tableData="fieldTableData"></edit-table>
        </el-tab-pane>
        <el-tab-pane label="校验字段"
                     name="validateField">
          <edit-table :tableCfg="param.validateFieldCfg"
                      :tableData="fieldTableData"></edit-table>
        </el-tab-pane>
        <el-tab-pane label="外键"
                     name="foreignKey">
          <edit-table :tableCfg="param.fkCfg"
                      :fit="false"
                      :tableData="fieldTableData"></edit-table>
        </el-tab-pane>
        <el-tab-pane label="索引"
                     name="dbIndex">
          <edit-table :selection="noCopyPage"
                      :fit="false"
                      :hasBtn="noCopyPage"
                      :tableCfg="param.dbIdxCfg"
                      :tableData="idxTableData"
                      :noPassed="noPassedIdxCols"
                      @deleteTableData="deleteIdxTableData"
                      @handleValidate="validateColIdx"></edit-table>
        </el-tab-pane>
        <el-tab-pane label="查询配置"
                     name="queryConfig">
          <edit-table :tableCfg="param.queryCfg"
                      :tableData="fieldTableData"></edit-table>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="submit_btn"
                   @click="handleSubmit()"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
        <el-button class="close_btn"
                   @click="closeDialog"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import basicInfoForm from './basicInfoForm';
import editTable from './editTable.vue';
import { getDic, arrayUnique } from '../../common/script/util';
import * as testData from '../../common/script/testData.json';
import * as initData from '../../common/script/initData.json';
export default {
  name: 'child',
  components: {
    basicInfoForm,
    editTable,
  },
  mixins: [MinXin],
  data() {
    return {
      allFields: [],
      fieldTableData: [],
      idxTableData: [],
      deleteFieldIds: [],
      deleteIndexIds: [],
      noPassedFieldCols: {},
      noPassedIdxCols: {},
      testData: testData,
      // 弹框显隐控制
      centerDialogVisible: true,
      formItem: {},
      activeName: 'dbAttr',
      param: {},
      showTypeOptions: [],
      validateTypeOptions: [],
      queryShowTypeOptions: [],
      dbTypeOptions: [],
      allowForeignKey: false,
    };
  },
  props: ['editParam', 'noCopyPage'],
  computed: {},
  watch: {},
  methods: {
    tableTypeChange(val) {
      this.allowForeignKey = val;
    },
    validateColIdx({ row, col }) {
      if (!col.rules) return;
      const id = row.id;
      const field = col.field;
      const value = row[col.field];
      const key = id + '-' + field;
      for (let r = 0; r < col.rules.length; r++) {
        const ruleObj = col.rules[r];
        const current = { field, value, rule: ruleObj.rule, errorMsg: ruleObj.errorMsg };
        if (ruleObj.rule === 'Require' && (!value || (Array.isArray(value) && value.length === 0))) {
          current.disabled = false;
          this.$set(this.noPassedIdxCols, key, current);
          break;
        }
        this.$set(this.noPassedIdxCols, key, null);
      }
    },
    validateColField({ row, col }) {
      if (!col.rules) return;
      const id = row.id;
      const field = col.field;
      const value = row[col.field];
      const key = id + '-' + field;
      const sameRows = this.fieldTableData.filter((item) => {
        return item[col.field] === value;
      });
      let flag = true;
      console.log('🚀 ~ validateColField ~ noPassedFieldCols的key', key);
      for (let r = 0; r < col.rules.length; r++) {
        const ruleObj = col.rules[r];
        const current = { field, value, rule: ruleObj.rule, errorMsg: ruleObj.errorMsg };
        if (this.noPassedFieldCols[key] && this.noPassedFieldCols[key].rule === 'Only' && this.noPassedFieldCols[key].sameRows.length === 2) {
          // 修改后的新值和其它值重复时进入这里，此段代码必须放在noPassedFieldCols赋值之前
          this.noPassedFieldCols[key].sameRows.forEach((item) => {
            this.$set(this.noPassedFieldCols, item.id + '-' + field, null);
          });
          console.log('🚀 ~ 4 ~ validateColField ~ 两个重复值校验重置', this.noPassedFieldCols);
        }
        if (ruleObj.rule === 'Require' && !value) {
          current.disabled = false;
          this.$set(this.noPassedFieldCols, key, current);
          flag = false;
          console.log('🚀 ~ 1 ~ validateColField ~ 必填校验', this.noPassedFieldCols);
          break;
        }
        if (ruleObj.rule === 'RegExp' && !new RegExp(ruleObj.pattern).test(value)) {
          current.disabled = false;
          this.$set(this.noPassedFieldCols, key, current);
          flag = false;
          console.log('🚀 ~ 2 ~ validateColField ~ 正则校验', this.noPassedFieldCols);
          break;
        }
        if (ruleObj.rule === 'Only' && sameRows.length > 1) {
          current.sameRows = sameRows;
          current.disabled = false;
          if (value === 'id') {
            this.$set(this.noPassedFieldCols, key, current);
          } else {
            sameRows.forEach((item) => {
              const key2 = item.id + '-' + field;
              this.$set(this.noPassedFieldCols, key2, current);
            });
          }
          flag = false;
          console.log('🚀 ~ 3 ~ validateColField ~ 唯一校验', this.noPassedFieldCols);
          break;
        }
      }
      if (flag) {
        this.$set(this.noPassedFieldCols, key, null);
        console.log('🚀 ~ 5 ~ validateColField ~ 单个校验重置', this.noPassedFieldCols);
      }
    },
    validateTableField() {
      this.fieldTableData.forEach((row) => {
        this.param.dbAttrCfg.forEach((col) => {
          if (col.rules) {
            this.validateColField({ row, col });
          }
        });
      });
      let flag = true;
      for (let key in this.noPassedFieldCols) {
        if (this.noPassedFieldCols[key]) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    validateTableIdx() {
      this.idxTableData.forEach((row) => {
        this.param.dbIdxCfg.forEach((col) => {
          if (col.rules) {
            this.validateColIdx({ row, col });
          }
        });
      });
      let flag = true;
      for (let key in this.noPassedIdxCols) {
        if (this.noPassedIdxCols[key]) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    handleSubmit() {
      const isPassedDb = this.validateTableField();
      const isPassedDbIdx = this.validateTableIdx();
      const hasFk = this.fieldTableData.filter((item) => {
        return item.mainTable || item.mainField;
      });
      this.$refs.basicInfo.$refs.formId.validate((valid) => {
        if (!valid) {
          this.common.MessageBoxalert('校验未通过!', '提示', '确定', 'warning');
        } else if (!this.allowForeignKey && hasFk.length > 0) {
          this.activeName = 'foreignKey';
          this.common.MessageBoxalert('只有附表才能配置外键!', '提示', '确定', 'warning');
        } else if (!isPassedDb) {
          this.activeName = 'dbAttr';
          this.common.MessageBoxalert('数据库属性页签校验未通过!', '提示', '确定', 'warning');
        } else if (!isPassedDbIdx) {
          this.activeName = 'dbIndex';
          this.common.MessageBoxalert('索引页签校验未通过!', '提示', '确定', 'warning');
        } else {
          this.submitAll();
        }
      });
    },
    async submitAll() {
      const { addAll, editAll } = this.$urlList.onlineFormApi;
      const param = this.getSubmitParam();
      let res = null;
      if (this.editParam.id) {
        res = await this.http.apiPut(editAll, param, { dataType: 'json' });
      } else {
        res = await this.http.apiPost(addAll, param, { dataType: 'json' });
      }
      if (res.code == 0) {
        this.common.message(true, '保存成功', 'success', 1000);
        this.closeDialog();
        this.$parent.loadData();
      } else {
        this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
      }
    },
    getSubmitParam() {
      let fields = [];
      let indexs = [];
      if (this.editParam.id) {
        this.fieldTableData.forEach((item, idx) => {
          item.order_num = idx;
          item.orderNum = idx + 1;
          fields.push(item);
        });
        indexs = this.idxTableData;
      } else {
        this.fieldTableData.forEach((item, idx) => {
          // 删除id
          const { id, ...field } = item;
          field.order_num = idx;
          field.orderNum = idx + 1;
          fields.push(field);
        });
        this.idxTableData.forEach((item) => {
          // 删除id
          const { id, ...index } = item;
          indexs.push(index);
        });
      }
      const param = {
        head: this.$refs.basicInfo.form,
        fields,
        indexs,
        deleteFieldIds: this.deleteFieldIds,
        deleteIndexIds: this.deleteIndexIds,
      };
      return param;
    },
    closeDialog() {
      this.$emit('update:vis', false);
      this.$refs.basicInfo.clearForm();
      this.fieldTableData = [];
      this.idxTableData = [];
    },
    deleteFieldTableData(ids) {
      this.fieldTableData = this.fieldTableData.filter((item) => {
        return ids.indexOf(item.id) === -1;
      });
      ids.forEach((id) => {
        this.param.dbAttrCfg.forEach((col) => {
          if (col.rules) {
            this.$set(this.noPassedFieldCols, id + '-' + col.field, null);
          }
        });
      });
      this.deleteFieldIds = ids;
    },
    deleteIdxTableData(ids) {
      this.idxTableData = this.idxTableData.filter((item) => {
        return ids.indexOf(item.id) === -1;
      });
      ids.forEach((id) => {
        this.param.dbIdxCfg.forEach((col) => {
          if (col.rules) {
            this.$set(this.noPassedIdxCols, id + '-' + col.field, null);
          }
        });
      });
      this.deleteIndexIds = ids;
    },
    getTableParam() {
      const param = {
        queryCfg: [
          {
            fieldType: 'input',
            field: 'dbFieldName',
            title: '字段名称',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dbFieldTxt',
            title: '字段备注',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'select',
            field: 'queryShowType',
            title: '控件类型',
            minWidth: 130,
            customOption: this.queryShowTypeOptions,
          },
          {
            fieldType: 'input',
            field: 'queryDictTable',
            title: '字典Table',
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'queryDictField',
            title: '字典Code',
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'queryDictText',
            title: '字典Text',
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'queryDefVal',
            title: '默认值',
            minWidth: 130,
          },
          {
            fieldType: 'checkbox',
            field: 'queryConfigFlag',
            title: '是否启用',
            minWidth: 80,
          },
        ],
        dbIdxCfg: [
          {
            fieldType: 'input',
            field: 'indexName',
            title: '索引名称',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            rules: [{ rule: 'Require', errorMsg: '索引名称不能为空' }],
            width: '180',
          },
          {
            fieldType: 'select_mult',
            field: 'indexField',
            title: '索引栏位',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            rules: [{ rule: 'Require', errorMsg: '索引栏位不能为空' }],
            width: '260',
            customOption: this.allFields,
          },
          {
            fieldType: 'select',
            field: 'indexType',
            title: '索引类型',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            width: '130',
            customOption: [
              { label: 'normal', value: 'normal' },
              { label: 'unique', value: 'unique' },
            ],
          },
        ],
        fkCfg: [
          {
            fieldType: 'input',
            field: 'dbFieldName',
            title: '字段名称',
            disabled: true,
            minWidth: 150,
          },
          {
            fieldType: 'input',
            field: 'dbFieldTxt',
            title: '字段备注',
            disabled: true,
            minWidth: 150,
          },
          {
            fieldType: 'input',
            field: 'mainTable',
            title: '主表名',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 160,
          },
          {
            fieldType: 'input',
            field: 'mainField',
            title: '主表字段',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 160,
          },
        ],
        validateFieldCfg: [
          {
            fieldType: 'input',
            field: 'dbFieldName',
            title: '字段名称',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dbFieldTxt',
            title: '字段备注',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'fieldHref',
            title: '字段Href',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'select',
            field: 'fieldValidType',
            title: '验证规则',
            minWidth: 130,
            allowCreate: true,
            customOption: this.validateTypeOptions,
          },
          {
            fieldType: 'checkbox',
            field: 'fieldMustInput',
            title: '校验必填',
            minWidth: 80,
          },
          {
            fieldType: 'input',
            field: 'dictTable',
            title: '字典Table',
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dictField',
            title: '字典Code',
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dictText',
            title: '字典Text',
            minWidth: 130,
          },
        ],
        pageAttrCfg: [
          {
            fieldType: 'input',
            field: 'dbFieldName',
            title: '字段名称',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dbFieldTxt',
            title: '字段备注',
            disabled: true,
            minWidth: 130,
          },
          {
            fieldType: 'checkbox',
            field: 'isShowForm',
            title: '表单显示',
            minWidth: 50,
          },
          {
            fieldType: 'checkbox',
            field: 'isShowList',
            title: '列表显示',
            change: {
              handleChange: this.handleIsShowListChange,
            },
            minWidth: 50,
          },
          {
            fieldType: 'checkbox',
            field: 'sortFlag',
            title: '是否排序',
            minWidth: 50,
          },
          {
            fieldType: 'checkbox',
            field: 'isReadOnly',
            title: '是否只读',
            minWidth: 50,
          },
          {
            fieldType: 'select',
            field: 'fieldShowType',
            title: '控件类型',
            minWidth: 110,
            customOption: this.showTypeOptions,
          },
          {
            fieldType: 'input',
            field: 'fieldLength',
            title: '控件长度',
            disabled: true,
            minWidth: 80,
          },
          {
            fieldType: 'checkbox',
            field: 'isQuery',
            title: '是否查询',
            change: {
              handleChange: this.handleIsQueryChange,
            },
            minWidth: 80,
          },
          {
            fieldType: 'select',
            field: 'queryMode',
            title: '查询类型',
            minWidth: 120,
            customOption: [
              { value: 'single', label: '普通查询' },
              { value: 'group', label: '范围查询' },
            ],
          },
          {
            fieldType: 'input',
            field: 'fieldDefaultValue',
            title: '控件默认值',
            minWidth: 120,
          },
          {
            fieldType: 'input',
            field: 'fieldExtendJson',
            title: '扩展参数',
            minWidth: 120,
          },
          {
            fieldType: 'input',
            field: 'converter',
            title: '自定义转换器',
            disabled: true,
            minWidth: 120,
          },
        ],
        dbAttrCfg: [
          {
            fieldType: 'input',
            field: 'dbFieldName',
            title: '字段名称',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            rules: [
              { rule: 'Require', errorMsg: '字段名称不能为空' },
              { rule: 'RegExp', pattern: '^[a-zA-Z][a-zA-Z0-9_$]*$', errorMsg: '命名规则:必须以字母开头；只能由字母、数字、下划线、$符号组成' },
              { rule: 'Only', errorMsg: '字段名称不能重复' },
            ],
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dbFieldTxt',
            title: '字段备注',
            rules: [{ rule: 'Require', errorMsg: '字段备注不能为空' }],
            minWidth: 130,
          },
          {
            fieldType: 'input',
            field: 'dbLength',
            title: '字段长度',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 80,
          },
          {
            fieldType: 'input',
            field: 'dbPointLength',
            title: '小数点',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 80,
          },
          {
            fieldType: 'input',
            field: 'dbDefaultVal',
            title: '默认值',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 120,
          },
          {
            fieldType: 'select',
            field: 'dbType',
            title: '字段类型',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 100,
            customOption: this.dbTypeOptions,
          },
          {
            fieldType: 'checkbox',
            field: 'dbIsKey',
            title: '主键',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 80,
          },
          {
            fieldType: 'checkbox',
            field: 'dbIsNull',
            title: '允许空值',
            disabled: !this.noCopyPage, // 视图管理页面禁用
            minWidth: 80,
          },
        ],
      };
      return param;
    },
    handleIsQueryChange(newval, idx) {
      if (newval) {
        this.$set(this.fieldTableData[idx], 'isShowList', newval);
      }
    },
    handleIsShowListChange(newval, idx) {
      if (!newval) {
        this.$set(this.fieldTableData[idx], 'isQuery', newval);
      }
    },
    async queryFieldList() {
      if (!this.editParam.id) return;
      const res = await this.http.apiGet(this.$urlList.onlineFormField.listByHeadId, {
        params: {
          headId: this.editParam.id,
        },
      });
      if (res.code == '0') {
        this.fieldTableData = [];
        this.fieldTableData = res.data;
      }
    },
    async queryIdxList() {
      if (!this.editParam.id) return;
      const res = await this.http.apiGet(this.$urlList.onlineFormIdx.listByHeadId, {
        params: {
          headId: this.editParam.id,
        },
      });
      if (res.code == '0') {
        this.idxTableData = [];
        this.idxTableData = res.data;
      }
    },
    async init() {
      if (this.$store.getters.operatState == 'add') {
        this.fieldTableData = [];
        this.fieldTableData = this._.cloneDeep(initData.initRows);
      } else {
        await this.queryFieldList();
        await this.queryIdxList();
      }
      let allFields = [];
      this.fieldTableData.forEach((item) => {
        if (item.dbFieldName === 'id') {
          item.disabled = true;
        }
        allFields.push({ label: item.dbFieldName, value: item.dbFieldName });
        this.allFields = arrayUnique(allFields, 'value');
      });
      const dicUrl = this.$urlList.common.dic;
      this.dbTypeOptions = await getDic(dicUrl, 'T_DBTYPE_0001');
      this.validateTypeOptions = await getDic(dicUrl, 'T_VALIDTYPE_0001');
      this.showTypeOptions = await getDic(dicUrl, 'T_SHOWTYPE_0001');
      this.queryShowTypeOptions = await getDic(dicUrl, 'T_QUERYSHOWTYPE_0001');
      this.param = this.getTableParam();
    },
  },
  created() {
    this.init();
  },
  mounted() {},
};
</script>
<style lang="less">
.ui-online-form-edit-dialog-wrap {
  .tabs-warp {
    padding: 0 25px 20px;
  }
  .model-dialog {
    width: 80% !important;
    max-width: 1380px;
  }
}
</style>
