<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              :findById="findById"
              labelWidth="100px">
      </v-form>
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
      buttonGroup: ['close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.econfig.getValUrl, // 接口
        param: { id: this.paramDetail.id }, // 参数
      },
    };
  },
  props: ['paramDetail'],
  computed: {},
  watch: {},
  methods: {
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {
            type: 'input',
            name: 'configName',
            value: '',
            label: '参数名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'configValue',
            value: '',
            label: '参数值',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'hide',
            value: '',
            param: 'IS_DISPLAY',
            label: '是否可见',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'configDesc',
            value: '',
            label: '参数描述',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'configType',
            value: '',
            param: 'CONFIG_TYPE',
            label: '参数类型',
            span: 12,
            disabled: true,
          },
        ],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
