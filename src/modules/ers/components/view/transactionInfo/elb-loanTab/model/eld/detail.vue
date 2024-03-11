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
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="150px" @eventChange="eventChange">
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
        url: this.$urlList.eld.getValUrl, // 接口
        param: {id: this.paramDetail.id} // 参数
      }
    };
  },
  props: ['paramDetail'],
  watch: {
  },
  methods: {
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('arlpIdType', obj, function () { // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = {params: {type: 'E_InfoIDType' + obj.e}};
        _this.getSystemId(param);
      });
    },
    async getSystemId(param) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      this.common.Control(this.arrList, {
        'arlpCertType': {
          customOption: response
        }
      });
    },
    init() {
      this.arrList = [
        [
          {type: 'select', name: 'arlpIdType', value: '', param: 'E_InfoIDType', label: '身份类别', span: 12, disabled: true,eventChange: true},
          {type: 'input', name: 'arlpName', value: '', label: '责任人名称', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'arlpCertType', value: '', customOption: {}, label: '责任人身份标识类型', span: 12, disabled: true},
          {type: 'input', name: 'arlpCertNum', value: '', label: '责任人身份标识号码', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'arlpType', value: '', param: 'E_ArlpType_PL', label: '还款责任人类型', span: 12, disabled: true},
          {type: 'input', name: 'arlpAmt', value: '', label: '还款责任金额', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'wartySign', value: '', param: 'E_WartySign_PL', label: '联保标志', span: 12, disabled: true},
          {type: 'input', name: 'maxBussNum', value: '', label: '保证合同编号', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true},
          {type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name
                ;
              }},
            name: 'deptCode',
            value: '',
            label: '所属机构',
            span: 12,
            disabled: true,
            noReset: true}
        ],

        [
          {type: 'input', name: 'operator', value: '', label: '操作员', span: 12, disabled: true},
          {type: 'input', name: 'changeTime', value: '', label: '修改时间', span: 12, disabled: true}
        ],
        [
          {type: 'input', name: 'getTime', value: '', label: '入库时间', span: 12, disabled: true},
          {type: 'select', name: 'reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 12, disabled: true}
        ],
        [
          {type: 'select', name: 'dataState', value: '', param: 'E_DATA_STATE', label: '数据状态', span: 12, disabled: true},
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
