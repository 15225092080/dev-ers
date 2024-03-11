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
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              :buttonGroup="buttonGroup"
              v-bind:arrList="arrList"
              :url="url"
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
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
      buttonGroup: ['close'],
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
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'custId',
            value: '',
            label: '客户号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '业务号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errTable',
            value: '',
            label: '出错表名',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'errType',
            value: '',
            param: 'ERR_TYPE',
            label: '错误原因',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errTime',
            value: '',
            label: '出错日期',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'deptCode',
            value: '',
            param: 'deptCode',
            label: '所属机构',
            span: 12,
            disabled: true,
          },
        ],
      ];
      // this.setOrgVal()
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
