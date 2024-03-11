<template>
  <el-dialog :visible.sync="dialogVisible"
             :close-on-click-modal="false"
             width="800px"
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="按钮编码"
                          prop="buttonCode">
              <el-input v-model.trim="form.buttonCode"
                        placeholder="请输入按钮编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮名称"
                          prop="buttonName">
              <el-input v-model.trim="form.buttonName"
                        placeholder="请输入按钮名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="按钮样式"
                          prop="buttonStyle">
              <o-select v-model.trim="form.buttonStyle"
                        placeholder="请选择按钮样式"
                        :clearable="false"
                        :options="btnStyle"></o-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮类型"
                          prop="optType">
              <o-select v-model.trim="form.optType"
                        placeholder="请选择按钮类型"
                        :clearable="false"
                        :options="optType"></o-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序"
                          prop="orderNum">
              <el-input-number v-model.trim="form.orderNum"
                               placeholder="请输入排序"
                               controls-position="right"
                               :min="1"
                               style="width:100%"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮图标"
                          prop="buttonIcon">
              <el-input v-model.trim="form.buttonIcon"
                        placeholder="请输入按钮图标">
                <el-tooltip slot="suffix"
                            effect="dark"
                            content="el-icon-***"
                            placement="top">
                  <i class="el-input__icon el-icon-info"></i>
                </el-tooltip>

              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="表达式"
                          prop="exp">
              <el-input v-model.trim="form.exp"
                        placeholder="请输入表达式"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="按钮状态"
                          prop="buttonStatus">
              <o-select v-model.trim="form.buttonStatus"
                        placeholder="请选择按钮状态"
                        :clearable="false"
                        :options="btnStatus"></o-select>
            </el-form-item>
          </el-col>
        </el-row>
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
import * as dict from '../../../common/script/dict.json';
const formDefVal = {
  buttonCode: '',
  buttonName: '',
  buttonStyle: 'link',
  optType: 'action',
  orderNum: '',
  buttonIcon: '',
  exp: '',
  buttonStatus: '1',
};
export default {
  name: 'child',
  components: {
    oSelect,
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
  },
  data() {
    return {
      form: {},
      btnStyle: dict.btnStyle,
      optType: dict.optType,
      btnStatus: dict.btnStatus,
      rules: {
        buttonCode: [{ required: true, message: '请输入按钮编码' }],
        buttonName: [{ required: true, message: '请输入按钮名称' }],
      },
    };
  },
  methods: {
    handleSubmit() {
      const { add, edit } = this.$urlList.onlineConfigBtn;
      this.$refs.formId.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const isAdd = this.$store.getters.operatState === 'add';
        const url = isAdd ? add : edit;
        const param = this.form;
        param.cgformHeadId = this.headId;
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
    async queryById() {
      const res = await this.http.apiGet(`${this.$urlList.onlineConfigBtn.queryById}`, { params: { id: this.param.id } });
      if (res.code == '0') {
        this.form = { ...res.data };
      } else {
        this.common.message(true, res.message, 'warning', 3000);
      }
    },
    init() {
      const isAdd = this.$store.getters.operatState === 'add';
      if (isAdd) {
        this.form = JSON.parse(JSON.stringify(formDefVal));
      } else {
        this.queryById();
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
