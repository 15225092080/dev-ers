<template>
  <div>
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" labelWidth="160px">
          <el-button slot="slotBtn"  class="submit_btn" @click="callbackFun('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import Bus from '@/common/script/bus.js';
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
      buttonGroup: ['cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.ele.getValUrl, // 接口
        param: {id: this.paramEdit.id} // 参数
      }
    };
  },
  props: ['paramEdit'],
  watch: {
  },
  methods: {
    callbackFun(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {'bussNum': this.$store.getters.arrListFormItem.bussNum, deptCode: this.$store.getters.arrListFormItem.deptCode});
      this.callback(formItem, 'ele', param);
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {type: 'hidden', name: 'bussNum', value: '', label: '业务号', span: 12, rule: []}
          ],
          [
            {type: 'input',
              name: 'ccBussNum',
              value: '',
              label: '抵(质)押合同编号',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.noSpecialCaracters, trigger: 'blur'},
                {max: 45, message: '最多45位', trigger: 'blur'}]
            },
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ]
        ];
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {type: 'hidden', name: 'bussNum', value: '', label: '业务号', span: 12, rule: []}
          ],
          [
            {type: 'input',
              name: 'ccBussNum',
              value: '',
              label: '抵(质)押合同编号',
              span: 12,
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'},
                {required: true, validator: this.validator.noSpecialCaracters, trigger: 'blur'},
                {max: 45, message: '最多45位', trigger: 'blur'}]
            },
            {type: 'date',
              name: 'bussDate',
              value: '',
              label: '业务发生日期',
              // noReset: true,
              // disabled: true,
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }},
              rule: [
                {required: true, validator: this.validator.empty, trigger: 'blur'}]
            }
          ],
          // 隐藏表单
          [
            { type: 'input',
              name: 'centerExist',
              value: '',
              label: 'centerExist',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'changeTime',
              value: '',
              label: 'changeTime',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'dataState',
              value: '',
              label: 'dataState',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'getTime',
              value: '',
              label: 'getTime',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'id',
              value: '',
              label: 'ID',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'noReport',
              value: '',
              label: 'noReport',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'operator',
              value: '',
              label: 'operator',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'orgEntity',
              value: '',
              label: 'orgEntity',
              noReset: true,
              hide: true,
              span: 12
            },
            { type: 'input',
              name: 'reportState',
              value: '',
              label: 'reportState',
              noReset: true,
              hide: true,
              span: 12
            }
          ]
        ];
      }
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
