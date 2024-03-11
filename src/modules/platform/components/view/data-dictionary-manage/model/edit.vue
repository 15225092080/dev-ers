<template>
  <el-dialog :visible.sync="centerDialogVisible"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-m">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title">{{title+param.title }}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <v-form ref="formItem"
            v-bind:arrList="arrList"
            :url="url"
            labelWidth="110px"
            :findById="findById"
            @eventChange="eventChange">
      <el-button class="submit_btn"
                 slot="slotBtn"
                 @click="submit"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
    </v-form>
  </el-dialog>
</template>
<script>
import { submitFun } from '@/modules/platform/script/data-dictionary-manage/data-dictionary-manage';
export default {
  name: 'child',
  components: {},
  data() {
    return {
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.dict.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.resId } }, // 参数
      },
      centerDialogVisible: true,
      arrList: [],
      title: '数据字典',
      url: '',
      systemflag: '',
    };
  },
  props: {
    param: {
      type: Object,
    },
  },
  methods: {
    submit() {
      submitFun('formItem', this);
    },
    eventChange(obj) {
      let that = this; // 绑定指向
      that.common.onselect('systemId', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = { params: { type: 'classify', system: obj.e } };
        that.systemflag = obj.e;
        that.getClassifyId(param);
      });
      that.common.onselect('classifyId', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = { params: { type: 'type', system: that.systemflag, classify: obj.e } };
        that.getTypeId(param);
      });
    },
    async getSystemId() {
      // 获取隶属系统
      let response = await this.http.apiGet(this.$urlList.home.system); // 角色提供
      this.common.Control(this.arrList, {
        systemId: {
          customOption: response.data,
        },
      });
    },
    async getClassifyId(param) {
      // 获取隶属系统
      let response = await this.http.apiGet(this.$urlList.dict.getDictCascade, param); // 角色提供
      this.common.Control(this.arrList, {
        classifyId: {
          customOption: response.data,
        },
      });
      this.common.Control(this.arrList, {
        typeId: {
          customOption: response.data,
        },
      });
      if (this.$store.getters.operatState == 'add') {
        this.$refs.formItem.formItem.classifyId = '';
        this.$refs.formItem.formItem.typeId = '';
      }
    },
    async getTypeId(param) {
      // 获取隶属系统
      let response = await this.http.apiGet(this.$urlList.dict.getDictCascade, param); // 角色提供
      this.common.Control(this.arrList, {
        typeId: {
          customOption: response.data,
        },
      });
      if (this.$store.getters.operatState == 'add') {
        this.$refs.formItem.formItem.typeId = '';
      }
    },
  },
  created() {
    if (this.$store.getters.operatState == 'add') {
      this.url = this.$urlList.dict.create;
      this.arrList = [
        [
          {
            type: 'input',
            name: 'dictName',
            value: '',
            label: '字典名称',
            span: 12,
            rule: [
              { required: true, validator: this.validator.empty, trigger: 'blur' },
              { max: 100, message: '长度不超过100位', trigger: 'blur' },
              { type: '1111|，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
          {
            type: 'input',
            name: 'code',
            value: '',
            label: '字典代码',
            span: 12,
            rule: [
              { required: true, validator: this.validator.empty, trigger: 'blur' },
              { max: 50, message: '长度不超过50位', trigger: 'blur' },
              { type: '1110', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'systemId',
            value: '',
            customOption: {},
            label: '隶属系统',
            span: 12,
            eventChange: true,
            rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'dictLevel',
            value: '',
            label: '级别',
            span: 12,
            rule: [
              { type: '0010', validator: this.validator.comValidate, trigger: 'blur' },
              { validator: this.validator.checkNonNegativeInteger, trigger: 'blur' },
              { max: 2, message: '长度不超过2位', trigger: 'blur' },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'classifyId',
            value: '',
            customOption: {},
            label: '字典分类',
            span: 12,
            eventChange: true,
            rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }],
          },
          { type: 'select', name: 'typeId', value: '', customOption: {}, label: '字典类型', span: 12, rule: [{ required: true, validator: this.validator.empty, trigger: 'blur' }] },
        ],
        [
          {
            type: 'input',
            name: 'parentCode',
            value: '',
            label: '上级字典代码',
            span: 12,
            rule: [
              { max: 20, message: '长度不超过20位', trigger: 'blur' },
              { type: '1110', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
          {
            type: 'input',
            name: 'dictDesc',
            value: '',
            label: '字典描述',
            span: 12,
            rule: [
              { max: 400, message: '长度不超过400位', trigger: 'blur' },
              { type: '1111|，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
        ],
      ];
    } else if (this.$store.getters.operatState == 'edit') {
      this.url = this.$urlList.dict.update;
      this.arrList = [
        [
          {
            type: 'input',
            name: 'dictName',
            value: '',
            label: '字典名称',
            span: 12,
            rule: [
              { required: true, validator: this.validator.empty, trigger: 'blur' },
              { max: 100, message: '长度不超过100位', trigger: 'blur' },
              { type: '1111|，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
          {
            type: 'input',
            name: 'code',
            value: '',
            label: '字典代码',
            span: 12,
            rule: [
              { required: true, validator: this.validator.empty, trigger: 'blur' },
              { max: 50, message: '长度不超过50位', trigger: 'blur' },
              { type: '1110', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
        ],
        [
          { type: 'select', name: 'systemId', value: '', customOption: {}, label: '隶属系统', span: 12, eventChange: true, disabled: true },
          {
            type: 'input',
            name: 'dictLevel',
            value: '',
            label: '级别',
            span: 12,
            rule: [
              { type: '0010', validator: this.validator.comValidate, trigger: 'blur' },
              { validator: this.validator.checkNonNegativeInteger, trigger: 'blur' },
              { max: 2, message: '长度不超过2位', trigger: 'blur' },
            ],
          },
        ],
        [
          { type: 'select', name: 'classifyId', value: '', customOption: {}, label: '字典分类', span: 12, eventChange: true, disabled: true },
          { type: 'select', name: 'typeId', value: '', customOption: {}, label: '字典类型', span: 12, disabled: true },
        ],
        [
          {
            type: 'input',
            name: 'parentCode',
            value: '',
            label: '上级字典代码',
            span: 12,
            rule: [
              { max: 20, message: '长度不超过20位', trigger: 'blur' },
              { type: '1110', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
          {
            type: 'input',
            name: 'dictDesc',
            value: '',
            label: '字典描述',
            span: 12,
            rule: [
              { max: 400, message: '长度不超过400位', trigger: 'blur' },
              { type: '1111|，,。.@#_-', validator: this.validator.comValidate, trigger: 'blur' },
            ],
          },
        ],
      ];
    }
    this.getSystemId();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
</style>
