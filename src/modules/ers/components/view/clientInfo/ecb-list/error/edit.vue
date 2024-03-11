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
        activeNames: ['ecb'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/ebb-basicinfoTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'ecb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.psgCheckError.getValUrl, // 接口
              param: { id: this.$route.query.id }, // 参数
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.ecb.creUrl,
            update: this.$urlList.ecb.updUrl,
            callback: true,
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
            type: 'select',
            name: 'certAssFlg',
            value: '',
            param: 'E_OthAssFlg',
            label: '身份标识关系有效标志',
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
            type: 'date',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.mobileverific,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'noReport',
            value: '',
            param: 'E_NO_REPORT',
            label: '免报标志',
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
            label: '所属机构',
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
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
</style>
