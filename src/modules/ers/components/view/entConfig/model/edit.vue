<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
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
              :buttonGroup="buttonGroup"
              :url="url"
              :findById="findById"
              labelWidth="100px">
        <el-button slot="slotBtn"
                   class="submit_btn"
                   @click="callback('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
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
      buttonGroup: ['close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.econfig.getValUrl, // 接口
        param: { id: this.$parent.detailUrl.resId }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    callback(formItem) {
      let that = this;
      let param = Object.assign(this.$refs[formItem].formItem, {
        id: this.$refs[formItem].formItem.id,
      });
      this.$refs[formItem].$refs[formItem].validate((valid) => {
        if (valid) {
          this.http.apiPost(this.url, param).then((res) => {
            this.$store.dispatch('user/setModaltState', '');
            that.common.submitMsg(res).then(() => {
              // that.$router.go(-1)
              Bus.$emit('econfig');
              this.$refs.formItem.close();
            });
          });
        } else {
          this.common.message(
            true,
            '验证不通过，提交失败',
            'warning',
            '800',
            function () {
              return false;
            }
          );
        }
      });
    },
    // 监听下拉框事件
    init() {
      // this.url = this.paramEdit.url;
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.econfig.create;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'configName',
              value: '',
              label: '参数名称',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 20, message: '最多20位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'configValue',
              value: '',
              label: '参数值',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 170, message: '最多170位', trigger: 'blur' },
              ],
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
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'configDesc',
              value: '',
              label: '参数描述',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 170, message: '最多170位', trigger: 'blur' },
              ],
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
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
          ],
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.econfig.update;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'configName',
              value: '',
              label: '参数名称',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'configValue',
              value: '',
              label: '参数值',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 170, message: '最多170位', trigger: 'blur' },
              ],
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
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'configDesc',
              value: '',
              label: '参数描述',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 170, message: '最多170位', trigger: 'blur' },
              ],
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
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
          ],
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
