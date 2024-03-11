<template>
  <div>
    <el-dialog
      :title="paramDetail.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="140px">
          <!-- <el-button slot="slotBtn"  class="submit_btn" @click="callback('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button> -->
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
        url: this.$urlList.eli.getValUrl, // 接口
        param: {id: this.paramDetail.id} // 参数
      }
    };
  },
  props: ['paramDetail'],
  watch: {
  },
  methods: {
    init() {
      this.url = this.$urlList.eli.getValUrl;
      this.arrList = [
        [
          {type: 'select', name: 'chanTranType', value: '', param: 'E_ChanTranType', label: '交易类型', span: 12, disabled: true},
          {type: 'input', name: 'tranDate', value: '', label: '交易日期', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'tranAmt', value: '', label: '交易金额', span: 12, disabled: true},
          {type: 'input', name: 'dueTranMon', value: '', label: '到期日期变更月数', span: 12, disabled: true}
        ],
        [
          {type: 'textarea', name: 'detInfo', value: '', label: '交易明细信息', span: 24, disabled: true}
        ],
        // [
        //   {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true},
        //   {type: 'tree',
        //     treeurl: this.$urlList.common.orgTree,
        //     treetitle: '机构树',
        //     defaultProps: {children: 'children',
        //       label: function (a, b) {
        //         return a.name
        //         ;
        //       }},
        //     name: 'deptCode',
        //     value: '',
        //     label: '所属机构',
        //     span: 12,
        //     disabled: true,
        //     noReset: true}
        // ],


        [
          {type: 'input', name: 'operator', value: '', label: '操作员', span: 12, disabled: true},
          {type: 'input', name: 'changeTime', value: '', label: '修改时间', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'getTime', value: '', label: '入库时间', span: 12, disabled: true},
         // {type: 'select', name: 'noReport', value: '', param: 'E_NO_REPORT', label: '免报标志', span: 12, disabled: true}
          {type: 'select', name: 'reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 12, disabled: true}
        ],
        [
          {type: "select",name: "dataState",value: "",param: "E_DATA_STATE",label: "数据状态",span: 12,disabled:true},
          {type: 'select', name: 'centerExist', value: '', param: 'E_CENTER_EXIST', label: '中心是否存在', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'msgNum', value: '', label: '报文号', span: 12, disabled: true},
          {type: 'input', name: 'batchNum', value: '', label: '批次号', span: 12, disabled: true}
        ]
      ];
    }
  },
  created() {
    this.init();
  }

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
