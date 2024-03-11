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
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'fileType',
            value: '',
            label: '文件类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'fileName',
            value: '',
            label: '文件名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'totalNum',
            value: '',
            label: '导入总数',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'successNum',
            value: '',
            param: '',
            label: '成功数',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errNum',
            value: '',
            label: '失败数',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'addNum',
            value: '',
            label: '新增数',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'changeNum',
            value: '',
            label: '修改数',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'outNum',
            value: '',
            label: '过时数',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'filePath',
            value: '',
            label: '文件存放路径',
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
            label: '导入者',
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
            name: 'fileCreateDate',
            value: '',
            label: '文件生成日期',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'importState',
            value: '',
            label: '导入状态',
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
            label: '金融机构代码',
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
