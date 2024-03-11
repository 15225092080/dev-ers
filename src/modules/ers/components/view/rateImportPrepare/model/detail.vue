<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-m">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              labelWidth="180px">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
  name: 'child',
  components: {},
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
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
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
            name: 'sheetYear',
            value: '',
            label: '报表年份',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'goverPbocOrgan',
            value: '',
            label: '管辖人行机构',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'area',
            value: '',
            label: '地区',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'deptName',
            value: '',
            label: '业务管理金融机构名称',
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
            label: '业务管理金融机构代码',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entName',
            value: '',
            param: '',
            label: '企业名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'unifyCreditCode',
            value: '',
            label: '统一社会信用代码',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entScale',
            value: '',
            label: '企业规模',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'industryCategory',
            value: '',
            label: '行业分类',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'dataReviewStatus',
            value: '',
            label: '资料审查状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'authorizeStatus',
            value: '',
            label: '授权状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'submitAuditTime',
            value: '',
            label: '提交审核时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'passAuditTime',
            value: '',
            label: '审查通过时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'returnAuditTime',
            value: '',
            label: '审查退回时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'informStorageTime',
            value: '',
            label: '信息入库时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'dataUploadDeptName',
            value: '',
            label: '数据上传机构名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'annexType',
            value: '',
            label: '附件类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'returnReason',
            value: '',
            label: '退回原因',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '数据操作者',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'getTime',
            value: '',
            label: '入库时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '修改时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '文件生成日期',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'bussId',
            value: '',
            label: '业务号',
            span: 12,
            disabled: true,
            noReset: true,
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
