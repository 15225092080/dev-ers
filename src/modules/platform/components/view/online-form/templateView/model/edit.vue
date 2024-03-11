<template>
  <div class="ui-online-form-edit-dialog-wrap">
    <el-dialog :title="editParam.title"
               :visible.sync="dialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ editParam.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <el-form v-if="isShow"
               ref="formId"
               :model="form"
               label-width="100px"
               :rules="rules">
        <div class="form-body">
          <form-content :preObj="preObj"
                        :formTemplate="formTemplate"
                        :arrList="formArrList"
                        :editParam="editParam"
                        :form="form">
          </form-content>
          <el-tabs v-model="subActive">
            <el-tab-pane v-for="item in tabArrList"
                         :key="item[1].key"
                         :label="item[1].describe"
                         :name="item[1].key">
              <form-content v-if="item[1].relationType == 1"
                            :preObj="preObj"
                            :formTemplate="item[1].formTemplate"
                            :arrList="item[1].formArrList"
                            :editParam="editParam"
                            :form="form">
              </form-content>
              <edit-table v-else
                          :tableCfg="item[1].columns"></edit-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
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
import formContent from './form-content.vue';
import editTable from './editTable.vue';
import { getCurrentDate } from '../../common/script/util.js';
export default {
  components: { formContent, editTable },
  data() {
    return {
      code: '',
      urlList: this.$urlList.onlineFormApi,
      isShow: false,
      form: {},
      rules: {},
      formArrList: [],
      formTemplate: '2',
      tabArrList: [],
      subActive: '',
      tableType: '',
      tableName: '',
      initNewRow: null,
      preObj: {
        text: '请输入',
        textarea: '请输入',
        number: '请输入',
        list: '请选择',
        list_multi: '请选择',
        date: '请输入',
        datetime: '请输入',
        file: '请上传',
        image: '请上传',
        radio: '请选择',
        checkbox: '请选择',
      },
    };
  },
  props: ['dialogVisible', 'editParam'],
  computed: {},
  methods: {
    validateField(field) {
      this.$refs.formId.validateField(field);
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
    handleSubmit() {
      this.$refs.formId.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const url = `${this.urlList.autoForm}/${this.code}?tableType=${this.tableType}`;
        const param = this.form;
        let res = null;
        if (this.editParam.id) {
          res = await this.http.apiPut(url, param, { dataType: 'json' });
        } else {
          res = await this.http.apiPost(url, param, { dataType: 'json' });
        }
        if (res.code == 0) {
          this.common.message(true, '保存成功', 'success', 1000);
          this.closeDialog();
          this.$parent.loadData();
        } else {
          this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
        }
      });
    },
    initPage() {
      const cfg = this.editParam.configInfo;
      this.formTemplate = parseInt(cfg.formTemplate);
      this.tableType = cfg.head.tableType;
      this.tableName = cfg.head.tableName;
      const { formArr, tabArr } = this.handleProperties(cfg.schema.properties, cfg.schema.required);
      this.formArrList = this.setFormConfig(formArr);
      this.tabArrList = this.setSubConfig(tabArr);
      this.subActive = tabArr.length > 0 ? tabArr[0][1].key : '';
    },
    handleProperties(properties, requiredList) {
      let formArr = [],
        tabArr = [];
      Object.entries(properties).forEach((item) => {
        const [key, valObj] = [...item];
        if (valObj.view === 'tab') {
          tabArr.push(item);
        } else {
          formArr.push(item);
          this.setFormDefVal(key, valObj.defVal);
          this.setMainFormRules(key, valObj, requiredList);
        }
      });
      const sortProp = function (a, b) {
        a = a[1].order;
        b = b[1].order;
        return a - b;
      };
      return { formArr: formArr.sort(sortProp), tabArr: tabArr.sort(sortProp) };
    },
    setFormDefVal(key, defVal, isTable) {
      // 设置表单默认值
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const sysUserId = userData.userId; // 当前登录用户的ID
      const sysUserName = userData.userName; // 当前登录用户的用户名
      const sysOrgCode = userData.orgCode; // 当前登录用户的机构代码
      const sysDate = getCurrentDate(); // 当前系统日期（例：2022-06-01）
      const systime = getCurrentDate(true); // 当前系统时间（例：2022-06-01 15:01:51）
      let value = defVal || '';
      if (value === '#{sysUserId}') {
        value = sysUserId;
      } else if (value === '#{sysUserName}') {
        value = sysUserName;
      } else if (value === '#{sysOrgCode}') {
        value = sysOrgCode;
      } else if (value === '#{sysDate}') {
        value = sysDate;
      } else if (value === '#{systime}') {
        value = systime;
      }
      if (isTable) {
        this.$set(this.initNewRow, key, value);
      } else {
        this.$set(this.form, key, value);
      }
    },
    setMainFormRules(key, valObj, requiredList) {
      if (requiredList && requiredList.indexOf(key) > -1) {
        const rule = {
          required: true,
          message: this.preObj[valObj.view] + valObj.title,
          trigger: 'blur',
        };
        this.$set(this.rules, key, [rule]);
      }
      if (valObj.pattern) {
        const rule = {
          onlyParam: {
            tableName: this.tableName,
            fieldName: key,
          },
          validator: this.validator.fieldValidate,
          pattern: valObj.pattern,
          errorInfo: valObj.errorInfo,
          trigger: 'blur',
        };
        if (this.editParam.id) {
          rule.onlyParam.dataId = this.editParam.id;
        }
        this.rules[key] ? this.rules[key].push(rule) : this.$set(this.rules, key, [rule]);
      }
    },
    setFormConfig(arrList) {
      let len = arrList.length;
      let n = this.formTemplate;
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
      let result = [];
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = arrList.slice(i * n, i * n + n);
        result.push(temp);
      }
      return result;
    },
    setSubConfig(arrList) {
      arrList.forEach((item) => {
        this.$set(this.form, item[0], []);
        this.$set(this.rules, item[0], []);
        if (item[1].relationType == 1) {
          const { formArr } = this.handleProperties(item[1].properties, item[1].required);
          item[1].formArrList = this.setFormConfig(formArr);
        } else if (item[1].relationType == 0 && item[1].columns.length > 0) {
          item[1].columns.forEach((col) => {
            this.setFormDefVal(col.key, col.fieldDefaultValue, true);
            let rules = [];
            col.validateRules.forEach((rule) => {
              if (rule.required) {
                rules.push(rule);
              } else if (rule.pattern) {
                rules.push({
                  onlyParam: {
                    tableName: this.tableName,
                    fieldName: col.key,
                  },
                  validator: this.validator.fieldValidate,
                  pattern: rule.pattern,
                  errorInfo: rule.message,
                  trigger: 'blur',
                });
              }
            });
            this.$set(this.rules[item[0]], col.key, rules);
          });
        }
      });
      return arrList;
    },
    async setPageData() {
      const res = await this.http.apiGet(`${this.urlList.autoForm}/${this.code}/${this.editParam.id}`);
      if (res.code == '0') {
        this.form = { ...res.data };
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    async init() {
      this.code = this.$route.query.code;
      this.initPage();
      if (this.editParam.id) {
        await this.setPageData();
      }
      this.isShow = true;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="less">
.ui-online-form-edit-dialog-wrap {
  .el-upload--text {
    border-radius: 0;
  }
  .el-upload-list {
    width: 60%;
  }
  .ui-upload-disbled .el-upload {
    display: none;
  }
}
.ui-online-template-img-preview-dialog {
  .el-dialog__headerbtn .el-dialog__close {
    color: red;
    font-weight: bold;
  }
}
</style>
