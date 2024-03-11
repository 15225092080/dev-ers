<template>
  <div>
    <el-dialog
      :title="paramEdit.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      :close-on-click-modal="false"
      @close="closeDialog"
      custom-class="model-dialog el-dialog-s"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" :findById="findById" submitFun labelWidth="100px">
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
      buttonGroup: ['submit', 'cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.amom.getValUrl, // 接口
        param: {id: this.$parent.detailUrl.resId} // 参数
      }
    };
  },
  props: ['paramEdit'],
  computed: {

  },
  watch: {
  },
  methods: {
    init() {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.amom.updUrl;
        // 页面表单
        this.arrList = [
          [
            {type: 'input',
              name: 'deptCode',
              value: '',
              label: '内部机构代码',
              span: 12,
              disabled:true,
              noReset:true
            },
            {type: 'input',
              name: 'centerCode',
              value: '',
              label: '征信中心机构代码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.requiredSize, trigger: 'blur'}  
              ]
            },
            {type: 'input',
              name: 'orgEntityCenterCode',
              value: '',
              label: '法人机构征信中心机构代码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.requiredSize, trigger: 'blur'} ]
            },
            {type: 'input',
              name: 'topDeptCode',
              value: '',
              label: '上报机构内部机构代码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.noSpecialCaracters, trigger: 'blur'},
                { max: 16, message: '最多16位', trigger: 'blur' }
              ]
            },
            {type: 'input',
              name: 'topCenterCode',
              value: '',
              label: '上报机构征信中心机构代码',
              span: 12,
              rule: [
                {required: true, validator: this.validator.requiredSize, trigger: 'blur'}]
            },
            {type: 'input',
              name: 'id',
              value: '',
              label: '',
              span: 12,
              hide:true,
              noReset:true
            }
          ]
        ];
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>

</style>
