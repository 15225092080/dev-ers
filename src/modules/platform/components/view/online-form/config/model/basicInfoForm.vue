<template>
  <el-form class="online-form-basic-info-form"
           ref="formId"
           :model="form"
           label-width="100px"
           :rules="rules">
    <div class="form-body">
      <el-row>
        <el-col :span="8">
          <el-form-item label="表名"
                        prop="tableName">
            <el-input v-model="form.tableName"
                      :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="表描述"
                        prop="tableTxt">
            <el-input v-model="form.tableTxt"
                      :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="表类型"
                        prop="tableType">
            <o-select key="tableType"
                      v-model="form.tableType"
                      :options="tableTypeOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isAttachedTb">
        <el-col :span="24">
          <div class="tableType-relation">
            <el-radio-group v-model="form.relationType">
              <el-radio v-for="(item,idx) in relationTypeOptions"
                        :key="idx"
                        :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
            <el-form-item label="序号"
                          label-width="52px"
                          prop="tabOrderNum">
              <el-input-number v-model="form.tabOrderNum"
                               controls-position="right"
                               :min="1"
                               :disabled="disabled"></el-input-number>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="表单分类"
                        prop="formCategory">
            <o-select key="formCategory"
                      v-model="form.formCategory"
                      :options="formCategoryOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主键策略"
                        prop="idType">
            <o-select key="idType"
                      v-model="form.idType"
                      :options="idTypeOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="显示复选框"
                        prop="isCheckbox">
            <o-select key="isCheckbox"
                      v-model="form.isCheckbox"
                      :options="ifOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="表单风格"
                        prop="formTemplate">
            <o-select key="formTemplate"
                      v-model="form.formTemplate"
                      :options="formColOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否分页"
                        prop="isPage">
            <o-select key="isPage"
                      v-model="form.isPage"
                      :options="ifOptions"
                      :disabled="disabled"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否树"
                        prop="isTree">
            <o-select key="isTree"
                      v-model="form.isTree"
                      :options="ifOptions"
                      :disabled="true"
                      :clearable="false"></o-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="editParam.id && form.tableType==2">
        <el-col :span="24">
          <el-form-item label="附表"
                        prop="subTableStr">
            <el-input v-model="form.subTableStr"
                      :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
<script>
import oSelect from '../../common/components/select.vue';
import MinXin from '@/common/script/mixin';
import * as dict from '../../common/script/dict.json';
export default {
  name: 'child',
  components: { oSelect },
  mixins: [MinXin],
  data() {
    return {
      disabled: false,
      ifOptions: dict.if,
      formColOptions: dict.formCol,
      idTypeOptions: dict.idType,
      formCategoryOptions: dict.formCategory,
      tableTypeOptions: dict.tableType,
      relationTypeOptions: dict.relationType,
      isAttachedTb: false,
      form: {
        tableName: '',
        tableTxt: '',
        tableType: 1,
        relationType: 0,
        tabOrderNum: 1,
        formCategory: 'temp',
        idType: 'UUID',
        isCheckbox: 'Y',
        formTemplate: '2',
        isPage: 'Y',
        isTree: 'N',
      },
      rules: {
        tableName: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'change',
          },
          {
            validator: this.checkOnlyTable,
            trigger: 'blur',
          },
        ],
        tableTxt: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'change',
          },
        ],
        tabOrderNum: [
          {
            required: true,
            validator: this.empty,
            message: '输入不能为空',
            trigger: 'change',
          },
        ],
      },
    };
  },
  props: ['editParam'],
  computed: {},
  watch: {
    'form.tableType': {
      deep: true,
      immediate: true,
      handler(val) {
        this.isAttachedTb = val == 3;
        this.$emit('tableTypeChange', this.isAttachedTb);
      },
    },
  },
  methods: {
    async checkOnlyTable(rule, value, callback) {
      const res = await this.http.apiGet(this.$urlList.onlineFormApi.checkOnlyTable, {
        params: {
          id: this.editParam.id || '',
          tbname: value,
        },
      });
      if (res.code == '0') {
        callback();
      } else {
        callback(new Error(res.message));
      }
    },
    async queryHead() {
      if (!this.editParam.id) return;
      const res = await this.http.apiGet(this.$urlList.onlineFormHead.queryById, {
        params: {
          id: this.editParam.id,
        },
      });
      if (res.code == '0') {
        Object.assign(this.form, res.data);
      }
    },
    clearForm() {
      for (let key in this.form) {
        this.form[key] = '';
        this.$refs.formId.clearValidate();
      }
    },
  },
  created() {
    this.queryHead();
  },
};
</script>
<style lang="less">
.online-form-basic-info-form {
  .tableType-relation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-input-number--small {
      width: 72px;
      .el-input-number__increase,
      .el-input-number__decrease {
        width: 22px;
      }
    }
    .el-radio-group {
      margin-bottom: 18px;
      .el-radio {
        margin-right: 16px;
      }
    }
  }
}
</style>
