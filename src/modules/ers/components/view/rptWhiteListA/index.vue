<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="160px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span>
          <i class="DHCiconfont">&#xe66a;</i>信贷上报白名单数据文件导入信息列表
        </span>
        <ul class="icongroup">
          <!-- <li>
            <el-button type="primary"
                       @click="downLoad">
              <i class="DHCiconfont">&#xe6c0;</i>上报白名单数据文件模板和说明下载
            </el-button>
          </li> -->
          <li>
            <upload-file :uploadData="uploadData"
                         ref="uploadfile"></upload-file>
          </li>
          <!-- <li>
            <el-button type="primary"
                       plain
                       @click="addModal">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <li>
            <el-button type="primary"
                       @click="editFun">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger"
                       @click="deleteFun">
              <i class="DHCiconfont">&#xe6a3;</i>删除
            </el-button>
          </li> -->
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 :param="paramTable"></v-table>
      </div>
    </el-card>

    <!-- 新增、编辑弹出框 -->
    <!-- <v-edit v-if="visibleEdit"
            :paramEdit="paramEdit"
            ref="child"
            :vis.sync="visibleEdit"></v-edit> -->
    <!-- 详情弹出框 -->
    <!-- <v-detail v-if="visible"
              ref="childDetails"
              :paramDetail="paramDetail"
              :vis.sync="visible"></v-detail> -->
    <!-- 历史详情弹出框 -->
    <!-- <v-hisDetail v-if="visibleHis"
                 ref="childDetails"
                 :paramHisDetail="paramHisDetail"
                 :vis.sync="visibleHis"></v-hisDetail> -->
  </div>
</template>

<script>
import vEdit from './model/edit';
import vDetail from './model/detail';
import vHisDetail from './model/hisDetail';
import MinXin from '@/common/script/mixin';
export default {
  name: '',
  mixins: [MinXin],
  components: {
    vEdit,
    vDetail,
    vHisDetail,
  },
  inject: ['reload'],
  data() {
    let uploadUrl = process.env.API_ROOT_ERS + this.$urlList.rptWhiteListA.upload;
    return {
      // 弹框相关
      paramDetail: {
        title: '',
        dialogTitle: '信贷不上报白名单操作历史记录',
      },
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '信贷不上报白名单',
      },
      uploadData: {
        // 按钮文字
        btnText: '信贷上报白名单数据文件上传',
        // url
        uploadUrl: uploadUrl,
        // 文件大小
        fileSize: 2,
        // 文件类型 xlsx|docx|image
        reg: 'xls',
        // 成功回调
        successCallback: this.uploadCallback,
        // 失败回调
        errorCallback: this.errorUpload,
        // 开始上传的回调
        startCallback: this.startUpload,
      },
      // 编辑及新增弹框的显隐控制
      visibleEdit: false,
      visible: false,
      visibleHis: false,
      // 弹框种类名
      title: '',
      // 判断弹框为新增还是编辑
      operation: '',
      // 详情
      paramHisDetail: {
        title: '',
        dialogTitle: '信贷上报白名单数据文件导入详情信息',
        data: {},
      },
      // 检索条件form表单
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_bussNum',
            value: '',
            label: '业务号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_dueNum',
            value: '',
            label: '借据号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_conNum',
            value: '',
            label: '贷款合同编号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_mngmtOrgCode',
            value: '',
            label: '业务管理金融机构代码',
            span: 6,
          },
        ],
        [
          {
            type: 'select',
            name: 'search_EQ_noReport',
            value: '',
            param: 'NO_REPORT',
            filter: ['2'],
            label: '免报标志',
            span: 6,
          },
        ],
      ],
      detailUrl: {
        isTime: 'search_GTE_LTE_operateTime_DATE_RANGE',
        url: this.$urlList.rptWhiteListA.getValUrl,
        delUrl: this.$urlList.rptWhiteListA.delete,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 列表表头
      paramTable: {
        selectionShow: true,
        showButton: false,
        // rowClickFun: this.rowClickFun,
        bussName: 'rptWhiteListA',
        tableHeader: [
          {
            field: 'bussNum',
            title: '业务号',
            width: 120,
          },
          {
            field: 'dueNum',
            title: '借据号',
            width: 120,
          },
          {
            field: 'conNum',
            title: '贷款合同编号',
            width: 120,
          },
          {
            field: 'mngmtOrgCode',
            title: '业务管理金融机构代码',
            width: 120,
          },
          {
            field: 'noReport',
            title: '免报标志',
            width: 120,
            oper: {
              name: 'dic',
              type: 'NO_REPORT',
            },
          },
          {
            field: 'operateTime',
            title: '操作时间',
            width: 150,
          },
          {
            field: 'operater',
            title: '操作者',
            width: 120,
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    uploadCallback(res) {
      res = JSON.parse(res);
      if (res.code == '00000000') {
        this.common
          .MessageBoxalert(res.msg, '消息', '确认', 'success')
          .then(() => {
            this.$refs.dataTable.getTableData();
          });
      } else {
        this.common
          .MessageBoxalert(res.msg, '消息', '确认', 'error')
          .then(() => {});
      }
    },
    startUpload() {
      // this.$refs.uploadfile.visibleHis = true;
    },
    errorUpload(newFile) {
      // this.$refs.uploadfile.visibleHis = false;
      if (this.common.BrowserType() == 'IE9') {
        this.common
          .MessageBoxalert('上传失败', '消息', '确认', 'error')
          .then(() => {});
      } else {
        // this.common.submitMsg(newFile.response);
        this.common
          .MessageBoxalert(newFile.response, '消息', '确认', 'error')
          .then(() => {});
      }
    },
    // downLoad() {
    //   this.common.downLoad(this.$urlList.rptWhiteListA.downloadModel, {});
    // },
    // rowClickFun(row) {
    //   this.visible = true;
    //   this.paramDetail.data = row;
    //   this.paramDetail.close = this.close;
    // },
    close() {
      this.visible = false;
    },
    init() {
      // this.$store.commit("SET_OPERATSTATE",'');
      // this.$refs.dataTable.getTableData();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {},
};
</script>

<style scoped="scoped">
.el-button--primary {
  height: 32px !important;
  line-height: 17px !important;
}
.el-button--danger {
  height: 32px !important;
  line-height: 17px !important;
}
</style>
