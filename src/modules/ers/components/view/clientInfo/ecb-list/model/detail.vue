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
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem" v-bind:arrList="arrList" :buttonGroup="buttonGroup" :url="url" labelWidth="100px">
      </v-form>
      <!-- 查询报送历史按钮 -->
      <div class="historyGroups">
        <el-row class="historyBtn">
          <el-button type="primary" plain  @click="showHistory">查看报送历史</el-button>
        </el-row>
      </div>
    </el-dialog>
    <ecbHistory v-if="ecbHistory" :ecbHis="ecbHis" @closeChild="closeChild" ref="ecbHistory"  :vis.sync="ecbHistory"></ecbHistory>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import ecbHistory from './ecb-historyList';
export default {
  name: 'child',
  components: {
    ecbHistory
  },
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
      ecbHistory: false,
      ecbHis: {},
      buttonGroup: ['close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      }
    };
  },
  props: ['paramDetail'],
  computed: {

  },
  watch: {
  },
  methods: {
    showHistory() {
      this.ecbHistory = true;
      this.ecbHis = {
        title: '企业身份标识整合-报送历史列表',
        dialogTitle: '',
        id: this.$parent.detailUrl.resId,
        url: null
      };
    },
    closeChild() {
      this.ecbHistory = false;
    },
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {type: 'input', name: 'custId', value: '', label: '客户号', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'entName', value: '', label: '企业名称', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'entCertType', value: '', param: 'E_InfoIDType2', label: '企业身份标识类型', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'entCertNum', value: '', label: '企业身份标识号码', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'othEntCertType', value: '', param: 'E_InfoIDType2', label: '企业其他身份标识类型', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'othEntCertNum', value: '', param: '', label: '企业其他身份标识号码', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'certAssFlg', value: '', param: 'E_OthAssFlg', label: '身份标识关系有效标志', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'bussDate', value: '', label: '业务发生日期', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'deptCode', value: '', param: 'deptCode', label: '所属机构', span: 12, disabled: true, noReset: true},
          {type: 'input', name: 'rptDate', value: '', label: '信息报告日期', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'input', name: 'operator', value: '', label: '操作员', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'changeTime', value: '', label: '修改时间', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'input', name: 'getTime', value: '', label: '入库时间', span: 12, disabled: true, noReset: true
          },
          {type: 'select', name: 'noReport', value: '', param: 'E_NO_REPORT', label: '免报标志', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 12, disabled: true, noReset: true
          },
          {type: 'select', name: 'centerExist', value: '', param: 'E_CENTER_EXIST', label: '中心是否存在', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'select', name: 'dataState', value: '', param: 'E_DATA_STATE', label: '数据状态', span: 12, disabled: true, noReset: true
          },
          {type: 'select', name: 'auditingState', value: '', param: 'E_AUDITING_STATE', label: '审核状态', span: 12, disabled: true, noReset: true
          }
        ],
        [
          {type: 'input', name: 'msgNum', value: '', label: '报文号', span: 12, disabled: true, noReset: true
          },
          {type: 'input', name: 'batchNum', value: '', label: '批次号', span: 12, disabled: true, noReset: true
          }
        ]
      ];
      // this.setOrgVal()
    }
  },
  created() {
    this.init();
  }
};
</script>
<style>
.historyGroups{
    position: absolute;
    bottom: 20px;
    right: 120px;
    z-index: 100000000000;
}
</style>
