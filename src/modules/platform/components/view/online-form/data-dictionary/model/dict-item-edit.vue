<template>
  <el-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-s ui-online-data-dict-edit-dialog"
             append-to-body>
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
        <el-form-item label="名称"
                      prop="itemText">
          <el-input v-model.trim="param.form.itemText"
                    placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="数据值"
                      prop="itemValue">
          <el-input v-model.trim="param.form.itemValue"
                    placeholder="请输入数据值"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="description">
          <el-input v-model.trim="param.form.description"
                    placeholder="请输入字典描述"></el-input>
        </el-form-item>
        <el-form-item label="排序值"
                      prop="sortOrder">
          <el-input-number v-model.trim="param.form.sortOrder"
                           placeholder="请输入排序值"
                           :min="1"></el-input-number>
          （注：值越小越靠前）
        </el-form-item>
        <el-form-item label="是否启用"
                      prop="description">
          <div class="switch-wrap">
            <el-switch v-model="param.form.status"
                       :active-text="switchCfg.active.text"
                       :inactive-text="switchCfg.inactive.text"
                       :active-value="switchCfg.active.value"
                       :inactive-value="switchCfg.inactive.value"
                       :width="80">
            </el-switch>
          </div>
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
      switchCfg: {
        active: {
          value: 1,
          text: '是',
        },
        inactive: {
          value: 0,
          text: '否',
        },
      },
      rules: {
        itemText: [{ required: true, message: '请输入名称!' }],
        itemValue: [{ required: true, message: '请输入数据值!' }, { validator: this.validateItemValue }],
      },
    };
  },
  methods: {
    validateItemValue(rule, value, callback) {
      var params = {
        itemValue: value,
        dictId: this.param.dictId,
        id: this.param.form.id,
      };
      if (value) {
        let reg = new RegExp("[`_~!@#$^&*()=|{}'.<>《》/?！￥（）—【】‘；：”“。，、？]");
        if (reg.test(value)) {
          callback(new Error('数据值不能包含特殊字符！'));
        } else {
          this.http.apiGet(this.$urlList.onlineDictItem.dictItemCheck, { params }).then((res) => {
            if (res.code == '0') {
              callback();
            } else {
              callback(new Error(res.message));
            }
          });
        }
      } else {
        callback();
      }
    },
    handleSubmit() {
      const { add, edit } = this.$urlList.onlineDictItem;
      this.$refs.formId.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const isAdd = this.$store.getters.operatState === 'add';
        const url = isAdd ? add : edit;
        const param = this.param.form;
        param.dictId = this.param.dictId;
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
.ui-online-data-dict-edit-dialog {
  .switch-wrap {
    .el-switch__label * {
      font-size: 12px;
    }
  }
}
</style>
