<template>
  <el-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             width="600px"
             custom-class="model-dialog el-dialog-s ui-online-data-dict-edit-dialog"
             append-to-body>
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <el-form :model="form"
             :rules="rules"
             ref="formId"
             label-width="100px">
      <div class="form-body">
        <el-form-item label="页面按钮"
                      prop="buttonCode">
          <o-select v-model.trim="form.buttonCode"
                    placeholder="请选择页面按钮"
                    :options="btnList"
                    :clearable="false"></o-select>
        </el-form-item>
        <el-form-item label="增强SQL"
                      prop="cgbSql">
          <o-code-editor v-model.trim="form.cgbSql"
                         language="sql"
                         placeholder="请输入SQL语句"
                         :lineNumbers="false"
                         :fullScreen="true"></o-code-editor>
        </el-form-item>
        <el-form-item label="描述"
                      prop="content">
          <el-input v-model.trim="form.content"
                    placeholder="请输入描述"
                    type="textarea"></el-input>
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
import oSelect from '../../../common/components/select.vue';
import oCodeEditor from '../../../common/components/code-editor.vue';
const formDefVal = {
  buttonCode: 'add',
  cgbSql: '',
  content: '',
};
export default {
  name: 'child',
  components: {
    oSelect,
    oCodeEditor,
  },
  props: {
    param: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    headId: {
      type: String,
    },
    btnList: {
      type: Array,
    },
  },
  data() {
    return {
      form: {},
      rules: {},
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formId.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const isAdd = this.$store.getters.operatState === 'add';
        const url = `${this.$urlList.onlineFormHead.enhanceSql}/${this.headId}`;
        const param = this.form;
        let res = null;
        if (isAdd) {
          res = await this.http.apiPost(url, param, { dataType: 'json' });
        } else {
          res = await this.http.apiPut(url, param, { dataType: 'json' });
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
    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
    init() {
      const isAdd = this.$store.getters.operatState === 'add';
      if (isAdd) {
        this.form = JSON.parse(JSON.stringify(formDefVal));
      } else {
        this.form = { ...this.param.form };
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less">
</style>
