<template>
  <el-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-s">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <el-form :model="param.form"
             :rules="rules"
             ref="formId"
             label-width="100px">
      <div class="form-body">
        <el-form-item label="字典名称"
                      prop="dictName">
          <el-input v-model.trim="param.form.dictName"
                    placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="字典编码"
                      prop="dictCode">
          <el-input v-model.trim="param.form.dictCode"
                    placeholder="请输入字典编码"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input v-model.trim="param.form.description"
                    placeholder="请输入字典描述"></el-input>
        </el-form-item>
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
</template>
<script>
export default {
  name: 'child',
  components: {},
  props: {
    param: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        dictName: [{ required: true, message: '请输入字典名称!' }],
        dictCode: [{ required: true, message: '请输入字典编码!' }, { validator: this.validateDictCode }],
      },
    };
  },
  methods: {
    validateDictCode(rule, value, callback) {
      var params = {
        tableName: 'sys_dict',
        fieldName: 'dict_code',
        fieldVal: value,
        dataId: this.param.form.id,
      };
      this.http.apiGet(this.$urlList.onlineDict.check, { params }).then((res) => {
        if (res.code == '0') {
          callback();
        } else {
          callback(new Error(res.message));
        }
      });
    },
    handleSubmit() {
      const { add, edit } = this.$urlList.onlineDict;
      this.$refs.formId.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const isAdd = this.$store.getters.operatState === 'add';
        const url = isAdd ? add : edit;
        const param = this.param.form;
        let res = null;
        if (isAdd) {
          res = await this.http.apiPost(url, param, { dataType: 'json' });
        } else {
          res = await this.http.apiPut(url, param, { dataType: 'json' });
        }
        if (res.code == 0) {
          this.common.message(true, '保存成功', 'success', 1000);
          this.closeDialog();
          this.$parent.$refs.dataTable.getTableData();
        } else {
          this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
        }
      });
    },
    closeDialog() {
      this.$emit('closed');
    },
  },
  created() {},
};
</script>
<style lang="less">
</style>
