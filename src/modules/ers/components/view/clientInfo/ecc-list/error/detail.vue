<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
export default {
  name: 'child',
  components: {
    vCollapse,
  },
  data() {
    // let _this = this;
    return {
      collapseList: {
        activeNames: ['ecc'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/ebb-basicinfoTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'ecc',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.ecc.getValUrl, // 接口
              param: { id: this.$route.query.id }, // 参数
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.ecc.creUrl,
            update: this.$urlList.ecc.updUrl,
            callback: false,
            first: true,
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      // 注册资本段
      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'custId',
            value: '',
            label: '客户号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entName',
            value: '',
            label: 'A企业名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'entCertType',
            value: '',
            param: 'E_InfoIDType2',
            label: 'A企业身份标识类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'entCertNum',
            value: '',
            label: 'A企业身份标识号码',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'assoEntName',
            value: '',
            label: 'B企业名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'assoEntCertType',
            value: '',
            param: 'E_InfoIDType2',
            label: 'B企业身份标识类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'assoEntCertNum',
            value: '',
            param: '',
            label: 'B企业身份标识号码',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'assoType',
            value: '',
            param: 'E_AssociationType',
            label: '关联关系类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'assoSign',
            value: '',
            param: 'E_AssociationFlag',
            label: '证件关联关系有效标志',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
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
            label: '所属机构',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'rptDate',
            value: '',
            label: '信息报告日期',
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
            label: '操作员',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'changeTime',
            value: '',
            label: '修改时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'getTime',
            value: '',
            label: '入库时间',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'noReport',
            value: '',
            param: 'E_NO_REPORT',
            label: '免报标志',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'reportState',
            value: '',
            param: 'E_REPORT_STATE',
            label: '报送状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'centerExist',
            value: '',
            param: 'E_CENTER_EXIST',
            label: '中心是否存在',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'dataState',
            value: '',
            param: 'E_DATA_STATE',
            label: '数据状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'select',
            name: 'auditingState',
            value: '',
            param: 'E_AUDITING_STATE',
            label: '审核状态',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
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
