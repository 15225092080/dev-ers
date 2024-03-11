<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              :buttonGroup="buttonGroup"
              v-bind:arrList="arrList"
              :url="url"
              labelWidth="100px">
        <el-button slot="slotBtn"
                   class="submit_btn"
                   @click="linkTo('-detail')"><i class="DHCiconfont">&#xe6b3;</i>错误查看</el-button>
        <el-button slot="slotBtn"
                   class="submit_btn"
                   @click="linkTo('-edit')"><i class="DHCiconfont">&#xe6b3;</i>错误修改</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import ecbEdit from '@/modules/ers/components/view/clientInfo/ecb-list/model/edit.vue';
import ecbDetail from '@/modules/ers/components/view/clientInfo/ecb-list/model/detail.vue';
import eccEdit from '@/modules/ers/components/view/clientInfo/ecc-list/model/edit.vue';
import eccDetail from '@/modules/ers/components/view/clientInfo/ecc-list/model/detail.vue';
export default {
  name: 'child',
  mixins: [MinXin],
  data() {
    return {
      offsideStatus: 'false',
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      // 新增、编辑页面表单
      arrList: [],
      buttonGroup: ['close'],
      formItem: {},
      // 表单赋值接口（编辑，详情用的较多）
      //   findById:{
      //     //url:this.$urlList.ecc.getValUrl,   //接口
      //     //param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      //   }
    };
  },
  components: {
    eccEdit,
    eccDetail,
    ecbEdit,
    ecbDetail,
  },
  props: ['paramDetail'],
  computed: {},
  watch: {},
  methods: {
    linkTo(pathName) {
      this.$store.dispatch('user/setOperatState', 'edit');
      let jsonData = this.$refs.formItem.formItem;
      let name =
        jsonData.errTab.substr(0, 1).toLowerCase() +
        jsonData.errTab.substr(2, 2).toLowerCase();
      let query;
      if (name.substring(0, 2) !== 'ef' && name.substring(0, 2) !== 'ec') {
        name = name.substring(0, 2) + 'b';
      }
      if (name.substring(0, 2) == 'eb') {
        query = { custId: jsonData.custId };
      } else if (name.substring(0, 2) == 'ef') {
        query = { id: jsonData.id };
      } else if (name.substring(0, 2) == 'ec') {
        query = { id: jsonData.id };
      } else {
        // query = { bussNum: jsonData.bussNum };
        query = { custId: jsonData.custId };
      }
      if (
        jsonData.infRecType == '410' ||
        jsonData.infRecType == '411' ||
        jsonData.infRecType == '412'
      ) {
        query = { bussNum: jsonData.bussNum };
        this.$router.push({ path: '/erj-rateTab' + pathName, query });
      } else if (
        jsonData.infRecType == '310' ||
        jsonData.infRecType == '311' ||
        jsonData.infRecType == '312' ||
        jsonData.infRecType == '313'
      ) {
        this.$router.push({ path: '/era-rateTab' + pathName, query });
      }
      // this.$router.push({ path: '/error-' + name + pathName, query });
    },
    init() {
      // 页面表单
      this.arrList = [
        [
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'msgNum',
            value: '',
            label: '报文号',
            span: 12,
            disabled: true,
            noReset: true,
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
            noReset: true,
          },
          {
            type: 'input',
            name: 'name',
            value: '',
            label: '企业名称',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'idType',
            value: '',
            param: 'InfoIDType2',
            label: '企业身份标识类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'idNum',
            value: '',
            label: '企业身份标识号码',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'custId',
            value: '',
            param: '',
            label: '客户号',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            param: '',
            label: '业务号',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        // [
        //   {type: 'input', name: 'ex1', value: '', param: '', label: '扩展1', span: 12, disabled: true, noReset: true
        //   },
        //   {type: 'input', name: 'ex2', value: '', param: '', label: '扩展2', span: 12, disabled: true, noReset: true
        //   }
        // ],
        // [
        //   {type: 'input', name: 'ex3', value: '', param: '', label: '扩展3', span: 12, disabled: true, noReset: true
        //   },
        //   {type: 'input', name: 'ex4', value: '', param: '', label: '扩展4', span: 12, disabled: true, noReset: true
        //   }
        // ],
        [
          {
            type: 'select',
            name: 'errStage',
            value: '',
            param: 'ERR_STAGE',
            label: '错误类型',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errTab',
            value: '',
            label: '错误段',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'errColZh',
            value: '',
            param: '',
            label: '错误数据项',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errValue',
            value: '',
            param: '',
            label: '错误字段值',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'ruleCode',
            value: '',
            param: '',
            label: '错误代码',
            span: 12,
            disabled: true,
            noReset: true,
          },
          {
            type: 'input',
            name: 'errTime',
            value: '',
            param: '',
            label: '出错日期',
            span: 12,
            disabled: true,
            noReset: true,
          },
        ],
        // [
        //   {type: 'input', name: 'rptDate', value: '', param: '', label: '信息报告日期', span: 12, disabled: true, noReset: true
        //   },
        //   {type: 'select', name: 'errStat', value: '', param: 'ERR_STAT', label: '处理状态', span: 12, disabled: true, noReset: true
        //   }
        // ],
        [
          {
            type: 'textarea',
            name: 'errMsg',
            value: '',
            label: '错误原因',
            span: 24,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'textarea',
            name: 'errCause',
            value: '',
            label: '错误说明',
            span: 24,
            disabled: true,
            noReset: true,
          },
        ],
        [
          {
            type: 'textarea',
            name: 'errAction',
            value: '',
            label: '解决方案',
            span: 24,
            disabled: true,
            noReset: true,
          },
        ],
      ];
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
