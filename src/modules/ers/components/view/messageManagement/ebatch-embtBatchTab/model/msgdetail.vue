<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
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
              labelWidth="140px">
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
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
        url: this.$urlList.emsg.findByMsgNum, // 接口
        param: { msgNum: this.paramDetail.msgNum }, // 参数
      },
    };
  },
  props: ['paramDetail'],
  watch: {},
  methods: {
    init() {
      this.url = this.$urlList.menu.create;
      this.arrList = [
        [
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'txtFile',
            value: '',
            label: '加密加压前报文名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'encFile',
            value: '',
            label: '加密加压后报文名称',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'beginTime',
            value: '',
            label: '报文开始时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'endTime',
            value: '',
            label: '报文结束时间',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'infRecType',
            value: '',
            param: 'InfRecType',
            label: '报文类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'interErrAmount',
            value: '',
            label: '校验错误记录数',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'msgAmount',
            value: '',
            label: '记录总数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'centerErrAmount',
            value: '',
            label: '反馈错误记录数',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'fbEncFile',
            value: '',
            label: '反馈报文名称',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'fbTime',
            value: '',
            label: '导入反馈时间',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'msgStat',
            value: '',
            param: 'MSG_STAT',
            label: '报文状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '操作员',
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

  //  mixins: [http]
};
</script>
<style>
/* .el-dialog__body{
        padding: 0px;
    }
    .treecard{
        height: '700px';
    } */
</style>
