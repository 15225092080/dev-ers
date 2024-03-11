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
        url: this.$urlList.rateImportAsset.getValUrl, // 接口
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
        this.url = this.$urlList.rateImportAsset.create;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'area',
              value: '',
              label: '所在区域(市)',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
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
              name: 'deptName',
              value: '',
              label: '金融机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
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
          ],
          [
            {
              type: 'input',
              name: 'entName',
              value: '',
              param: '',
              label: '贷款企业名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
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
          ],
          [
            {
              type: 'select',
              name: 'countyEntFlag',
              label: '是否县域企业',
              value: '',
              span: 12,
              customOption: {
                是: '是',
                否: '否',
              },
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
              label: '行业归属',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
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
                问题严重: '问题严重',
                濒临破产: '濒临破产',
                优秀: '优秀',
              },
            },
          ],
          [
            {
              type: 'datetime',
              name: 'rateTime',
              value: '',
              label: '定级时间',
              span: 12,
            },
            {
              type: 'input',
              name: 'trackLevel',
              value: '',
              param: '',
              label: '贷款合同编号',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 80, message: '最多80位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'dueNum',
              value: '',
              param: '',
              label: '借据号',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 80, message: '最多80位', trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'matchState',
              label: '匹配状态',
              value: '',
              span: 12,
              customOption: {
                已匹配: '已匹配',
                未匹配: '未匹配',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'loanAmt',
              value: '',
              param: '',
              label: '贷款本金',
              span: 12,
              rule: [
                {
                  validator: this.validator.isFloat,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'guarMode',
              label: '担保方式',
              value: '',
              span: 12,
              customOption: {
                信用: '信用',
                保证: '保证',
                质押: '质押',
                抵押: '抵押',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'loanType',
              value: '',
              param: '',
              label: '贷款类型',
              span: 12,
              rule: [{ max: 10, message: '最多10位', trigger: 'blur' }],
            },
            {
              type: 'select',
              name: 'fiveCate',
              label: '五级分类',
              value: '',
              span: 12,
              customOption: {
                正常: '正常',
                关注: '关注',
                次级: '次级',
                可疑: '可疑',
                损失: '损失',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'annIntRate',
              value: '',
              param: '',
              label: '年利率(%)',
              span: 12,
              rule: [
                {
                  validator: this.validator.aPR,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'date',
              name: 'openDate',
              value: '',
              label: '贷款发放日',
              span: 12,
            },
          ],
          [
            {
              type: 'date',
              name: 'dueDate',
              value: '',
              label: '贷款到期日',
              span: 12,
            },
            {
              type: 'date',
              name: 'latRpyDate',
              value: '',
              label: '最近一次还款日',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'remainDays',
              value: '',
              param: '',
              label: '余期天数',
              span: 12,
              rule: [
                { max: 4, message: '最多4位', trigger: 'blur' },
                {
                  validator: this.validator.GtZreoInt,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'greenCreditFlag',
              label: '是否绿色信贷',
              value: '',
              span: 12,
              customOption: {
                是: '是',
                否: '否',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'acctBal',
              value: '',
              param: '',
              label: '贷款剩余本金',
              span: 12,
              rule: [
                {
                  validator: this.validator.isFloat,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'pledgeStatus',
              label: '质押状态',
              value: '',
              span: 12,
              customOption: {
                未质押: '未质押',
                已质押: '已质押',
              },
            },
          ],
          [
            {
              type: 'select',
              name: 'pledgeStatus',
              label: '贷款状态',
              value: '',
              span: 12,
              customOption: {
                正常: '正常',
                '关闭（结清）': '关闭（结清）',
              },
            },
            {
              type: 'datetime',
              name: 'informStorageTime',
              value: '',
              label: '信息入库时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'operateUser',
              value: '',
              param: '',
              label: '操作用户',
              span: 12,
              rule: [{ max: 32, message: '最多32位', trigger: 'blur' }],
            },
            {
              type: 'datetime',
              name: 'informUpdateTime',
              value: '',
              label: '信息更新时间',
              span: 12,
            },
          ],
          [
            {
              type: 'date',
              name: 'fileCreateDate',
              value: '',
              label: '文件生成日期',
              span: 12,
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
        this.url = this.$urlList.rateImportAsset.update;
        // 页面表单
        this.arrList = [
          [
            {
              type: 'input',
              name: 'area',
              value: '',
              label: '所在区域(市)',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
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
              name: 'deptName',
              value: '',
              label: '金融机构名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
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
          ],
          [
            {
              type: 'input',
              name: 'entName',
              value: '',
              param: '',
              label: '贷款企业名称',
              span: 12,
              rule: [{ max: 80, message: '最多80位', trigger: 'blur' }],
            },
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
          ],
          [
            {
              type: 'select',
              name: 'countyEntFlag',
              label: '是否县域企业',
              value: '',
              span: 12,
              customOption: {
                是: '是',
                否: '否',
              },
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
              label: '行业归属',
              span: 12,
              rule: [{ max: 30, message: '最多30位', trigger: 'blur' }],
            },
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
                问题严重: '问题严重',
                濒临破产: '濒临破产',
                优秀: '优秀',
              },
            },
          ],
          [
            {
              type: 'datetime',
              name: 'rateTime',
              value: '',
              label: '定级时间',
              span: 12,
            },
            {
              type: 'input',
              name: 'trackLevel',
              value: '',
              param: '',
              label: '贷款合同编号',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 80, message: '最多80位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'dueNum',
              value: '',
              param: '',
              label: '借据号',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 80, message: '最多80位', trigger: 'blur' },
              ],
            },
            {
              type: 'select',
              name: 'matchState',
              label: '匹配状态',
              value: '',
              span: 12,
              customOption: {
                已匹配: '已匹配',
                未匹配: '未匹配',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'loanAmt',
              value: '',
              param: '',
              label: '贷款本金',
              span: 12,
              rule: [
                {
                  validator: this.validator.isFloat,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'guarMode',
              label: '担保方式',
              value: '',
              span: 12,
              customOption: {
                信用: '信用',
                保证: '保证',
                质押: '质押',
                抵押: '抵押',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'loanType',
              value: '',
              param: '',
              label: '贷款类型',
              span: 12,
              rule: [{ max: 10, message: '最多10位', trigger: 'blur' }],
            },
            {
              type: 'select',
              name: 'fiveCate',
              label: '五级分类',
              value: '',
              span: 12,
              customOption: {
                正常: '正常',
                关注: '关注',
                次级: '次级',
                可疑: '可疑',
                损失: '损失',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'annIntRate',
              value: '',
              param: '',
              label: '年利率(%)',
              span: 12,
              rule: [
                {
                  validator: this.validator.aPR,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'date',
              name: 'openDate',
              value: '',
              label: '贷款发放日',
              span: 12,
            },
          ],
          [
            {
              type: 'date',
              name: 'dueDate',
              value: '',
              label: '贷款到期日',
              span: 12,
            },
            {
              type: 'date',
              name: 'latRpyDate',
              value: '',
              label: '最近一次还款日',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'remainDays',
              value: '',
              param: '',
              label: '余期天数',
              span: 12,
              rule: [
                { max: 4, message: '最多4位', trigger: 'blur' },
                {
                  validator: this.validator.GtZreoInt,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'greenCreditFlag',
              label: '是否绿色信贷',
              value: '',
              span: 12,
              customOption: {
                是: '是',
                否: '否',
              },
            },
          ],
          [
            {
              type: 'input',
              name: 'acctBal',
              value: '',
              param: '',
              label: '贷款剩余本金',
              span: 12,
              rule: [
                {
                  validator: this.validator.isFloat,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'select',
              name: 'pledgeStatus',
              label: '质押状态',
              value: '',
              span: 12,
              customOption: {
                未质押: '未质押',
                已质押: '已质押',
              },
            },
          ],
          [
            {
              type: 'select',
              name: 'pledgeStatus',
              label: '贷款状态',
              value: '',
              span: 12,
              customOption: {
                正常: '正常',
                '关闭（结清）': '关闭（结清）',
              },
            },
            {
              type: 'datetime',
              name: 'informStorageTime',
              value: '',
              label: '信息入库时间',
              span: 12,
            },
          ],
          [
            {
              type: 'input',
              name: 'operateUser',
              value: '',
              param: '',
              label: '操作用户',
              span: 12,
              rule: [{ max: 32, message: '最多32位', trigger: 'blur' }],
            },
            {
              type: 'datetime',
              name: 'informUpdateTime',
              value: '',
              label: '信息更新时间',
              span: 12,
            },
          ],
          [
            {
              type: 'date',
              name: 'fileCreateDate',
              value: '',
              label: '文件生成日期',
              span: 12,
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
