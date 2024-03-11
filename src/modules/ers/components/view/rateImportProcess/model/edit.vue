<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-m">
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
              submitFun
              labelWidth="180px">
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
        url: this.$urlList.rateImportProcess.getValUrl, // 接口
        param: { id: this.$parent.detailUrl.resId }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    init() {
      // 判断是新增or编辑
      if (this.$store.getters.operatState == 'add') {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.rateImportProcess.create;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'year',
              name: 'sheetYear',
              value: '',
              label: '报表年份',
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
              name: 'goverPbocOrgan',
              value: '',
              label: '管辖人行机构',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'area',
              value: '',
              label: '地区',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
            {
              type: 'input',
              name: 'deptName',
              value: '',
              label: '业务管理金融机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {
                children: 'children',
                label: function (a, b) {
                  return a.name;
                },
              },
              name: 'deptCode',
              value: '',
              label: '业务管理金融机构代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'input',
              name: 'entName',
              value: '',
              param: '',
              label: '企业名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'unifyCreditCode',
              value: '',
              param: '',
              label: '统一社会信用代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.validator.isCCode,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'entScale',
              value: '',
              param: '',
              label: '企业规模',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'industryCategory',
              value: '',
              param: '',
              label: '行业分类',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
            {
              type: 'select',
              name: 'rateProcess',
              label: '评级进程',
              value: '',
              span: 12,
              customOption: {
                评级资料未提交中: '评级资料未提交中',
                资料审查中: '资料审查中',
                审查退回中: '审查退回中',
                等级初评中: '等级初评中',
                实地调查中: '实地调查中',
                上会审核中: '上会审核中',
                已定级: '已定级',
              },
            },
          ],
          [
            {
              type: 'select',
              name: 'entRateResult',
              label: '企业评级结果',
              value: '',
              span: 12,
              customOption: {
                很好: '很好',
                好: '好',
                正常: '正常',
                可接受: '可接受',
                一般: '一般',
                弱: '弱',
                有偿付风险: '有偿付风险',
                濒临破产: '濒临破产',
                优秀: '优秀',
              },
            },
            {
              type: 'datetime',
              name: 'rateTime',
              value: '',
              label: '定级时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'trackLevel',
              value: '',
              param: '',
              label: '跟踪级别',
              span: 12,
              rule: [{ max: 10, message: '最多10位', trigger: 'blur' }],
            },
            {
              type: 'datetime',
              name: 'trackTime',
              value: '',
              label: '跟踪时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'dataUploadDeptName',
              value: '',
              param: '',
              label: '数据上传机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
            {
              type: 'date',
              name: 'fileCreateDate',
              value: '',
              label: '文件生成日期',
              span: 12,
              // pickerOptions: {
              //   disabledDate(time) {
              //     return time.getTime() > Date.now();
              //   },
              // },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
        ];
      } else {
        // 根据弹框状态改变提交url
        this.url = this.$urlList.rateImportProcess.update;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'year',
              name: 'sheetYear',
              value: '',
              label: '报表年份',
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
              name: 'goverPbocOrgan',
              value: '',
              label: '管辖人行机构',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'area',
              value: '',
              label: '地区',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
            {
              type: 'input',
              name: 'deptName',
              value: '',
              label: '业务管理金融机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'tree',
              treeurl: this.$urlList.common.orgTree,
              treetitle: '机构树',
              defaultProps: {
                children: 'children',
                label: function (a, b) {
                  return a.name;
                },
              },
              name: 'deptCode',
              value: '',
              label: '业务管理金融机构代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
            {
              type: 'input',
              name: 'entName',
              value: '',
              param: '',
              label: '企业名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'unifyCreditCode',
              value: '',
              param: '',
              label: '统一社会信用代码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: this.validator.isCCode,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'entScale',
              value: '',
              param: '',
              label: '企业规模',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
          ],
          [
            {
              type: 'input',
              name: 'industryCategory',
              value: '',
              param: '',
              label: '行业分类',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
            {
              type: 'select',
              name: 'rateProcess',
              label: '评级进程',
              value: '',
              span: 12,
              customOption: {
                评级资料未提交中: '评级资料未提交中',
                资料审查中: '资料审查中',
                审查退回中: '审查退回中',
                等级初评中: '等级初评中',
                实地调查中: '实地调查中',
                上会审核中: '上会审核中',
                已定级: '已定级',
              },
            },
          ],
          [
            {
              type: 'select',
              name: 'entRateResult',
              label: '企业评级结果',
              value: '',
              span: 12,
              customOption: {
                很好: '很好',
                好: '好',
                正常: '正常',
                可接受: '可接受',
                一般: '一般',
                弱: '弱',
                有偿付风险: '有偿付风险',
                濒临破产: '濒临破产',
                优秀: '优秀',
              },
            },
            {
              type: 'datetime',
              name: 'rateTime',
              value: '',
              label: '定级时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'trackLevel',
              value: '',
              param: '',
              label: '跟踪级别',
              span: 12,
              rule: [{ max: 10, message: '最多10位', trigger: 'blur' }],
            },
            {
              type: 'datetime',
              name: 'trackTime',
              value: '',
              label: '跟踪时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'dataUploadDeptName',
              value: '',
              param: '',
              label: '数据上传机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
            {
              type: 'date',
              name: 'fileCreateDate',
              value: '',
              label: '文件生成日期',
              span: 12,
              // pickerOptions: {
              //   disabledDate(time) {
              //     return time.getTime() > Date.now();
              //   },
              // },
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'change',
                },
              ],
            },
          ],
        ];
      }
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
