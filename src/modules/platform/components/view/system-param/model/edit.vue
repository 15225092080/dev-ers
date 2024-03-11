<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :url="url"
              :findById="findById"
              submitFun
              labelWidth="70px"></v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.systemparam.findById, // 接口
        param: { params: { id: this.$parent.detailUrl.resId } }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    init() {
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.systemparam.create;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'configKey',
              value: '',
              label: '参数名称',
              span: 12,
              header: '',
              disabled: true,
              noReset: true,
            },
          ],
          [
            {
              type: 'input',
              name: 'configValue',
              value: '',
              label: '参数值',
              span: 24,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'change' },
                { max: 400, message: '长度不超过400位', trigger: 'blur' },
              ],
            },
          ],
          [{ type: 'textarea', name: 'description', value: '', label: '参数描述', span: 24, disabled: true, noReset: true }],
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.systemparam.update;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'configName',
              value: '',
              label: '参数名称',
              span: 12,
              header: '',
              disabled: true,
              noReset: true,
            },
            {
              type: '',
              name: 'id',
              value: '',
              label: 'id',
              span: 8,
              header: '',
              disabled: true,
              noReset: true,
            },
          ],
          [
            {
              type: 'input',
              name: 'configValue',
              value: '',
              label: '参数值',
              span: 24,
              rule: [
                { required: true, validator: this.validator.empty, trigger: 'change' },
                { max: 400, message: '长度不超过400位', trigger: 'blur' },
              ],
            },
          ],
          [{ type: 'textarea', name: 'description', value: '', label: '参数描述', span: 24, disabled: true, noReset: true }],
        ];
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
