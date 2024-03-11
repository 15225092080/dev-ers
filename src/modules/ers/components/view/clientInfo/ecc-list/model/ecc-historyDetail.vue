<template>
  <div>
    <el-dialog
      :title="eccHisDetails.title"
      :visible.sync="centerDialogVisible"
      :modal="true"
      custom-class="model-dialog el-dialog-m"
    >
      <span slot="title" class="clearfix">
        <span class="dialog-title">{{ eccHisDetails.dialogTitle + eccHisDetails.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <!-- <v-form ref="formItem" v-bind:arrList="arrList" :url="url" labelWidth="100px"> -->

              <div class="tableData tableFirst">
                  <h2 class="title">企业关联关系</h2>
                  <table class="table0"><tbody class="ecc1">
                    <tr>
                      <th style="width:25%">批次号</th>
                      <th style="width:25%">报文号</th>
                      <th style="width:25%">报送状态</th>
                      <th style="width:25%">报文生成时间</th>
                    </tr>
                    <tr>
                      <td style="width:25%">{{this.ehcc.batchNum||''}}</td>
                      <td style="width:25%">{{this.ehcc.msgNum}}</td>
                      <td style="width:25%">{{this.idTypeDic["E_REPORT_STATE"][this.ehcc.reportState]}}</td>
                      <td style="width:25%">{{this.ehcc.msgDate}}</td>
                    </tr>
                    </tbody></table>
              </div>
              
                <!-- 正常上报 -->
              <div class="tableData normalInfo" v-if="showNormal">
                <h3 class="title">企业关联关系信息</h3>
                <table class="table0">
                    <tbody class="ecc2"><tr>
                      <th class="g-w-5">信息记录类型</th>
                      <th class="g-w-5">A企业名称</th>
                      <th class="g-w-5">A企业身份标识类型</th>
                      <th class="g-w-5">A企业身份标识号码</th>
                      <th class="g-w-5">信息报告日期</th>
                    </tr>
                    <tr>
                      <td class="g-w-5">{{this.idTypeDic["E_InfRecType"][this.ehcc.infRecType]}}</td>
                      <td class="g-w-5">{{this.ehcc.entName}}</td>
                      <td class="g-w-5">{{this.idTypeDic["E_InfoIDType2"][this.ehcc.entCertType]}}</td>
                      <td class="g-w-5">{{this.ehcc.entCertNum}}</td>
                      <td class="g-w-5">{{this.ehcc.rptDate}}</td>
                    </tr>
                  </tbody></table>
                  <table class="table0 noBorder"><!--抵消上边框-->
                    <tbody class="ecc3"><tr>
                      <th class="g-w-5">B企业名称</th>
                      <th class="g-w-5">B企业身份标识类型</th>
                      <th class="g-w-5">B企业身份标识号码</th>
                      <th class="g-w-5">关联关系类型</th>
                      <th class="g-w-5">关联标志</th>
                    </tr>
                    <tr>
                      <td class="g-w-5">{{this.ehcc.assoEntName}}</td>
                      <td class="g-w-5">{{this.idTypeDic["E_InfoIDType2"][this.ehcc.assoEntCertType]}}</td>
                      <td class="g-w-3">{{this.ehcc.assoEntCertNum}}</td>
                      <td class="g-w-3">{{this.idTypeDic["E_AssociationType"][this.ehcc.assoType]}}</td>
                      <td class="g-w-3">{{this.idTypeDic["E_AssociationFlag"][this.ehcc.assoSign]}}</td>
                    </tr>
                    </tbody></table>
              </div>
            <el-button @click="close()" class="close_btn closeBtn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      <!-- </v-form> -->
    </el-dialog>

  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
export default {
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
      ehcc: {},
      // 正常上报信息是否隐藏
      showNormal: true,
      idTypeDic: {}
    };
  },
  props: ['eccHisDetails'],
  computed: {

  },
  watch: {
  },
  methods: {
    close() {
      this.$emit('closeChilds');
    },
    init() {},
    // 调接口获取返回数据
    async getTableData() {
      this.resData = await this.http.apiPost(this.$urlList.ecc.findDetailById, this.eccHisDetails.data, '');
      this.ehcc = this.resData.ehcc;
      return this.resData;
    },
    // 获取字典方法
    getdataDic(){
      let type = ['E_InfoIDType2','E_REPORT_STATE','E_InfRecType','E_AssociationType','E_AssociationFlag'];
      type.forEach((item,index) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] =  JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + item));
      })
    }
  },
  async created() {
    this.init();
    this.getdataDic();
    this.getTableData();
  }
};
</script>
<style>
.closeBtn{
    float: right;
    margin-right: 30px;
    margin-bottom: 15px;
}
.historyGroups{
    position: absolute;
    bottom: 20px;
    right: 120px;
}
.table0{
      width:100%;
      border:1px solid #000;
      border-collapse:collapse;
      border-spacing:0;
    }
    .table0 tr:first{
      border-bottom: 1px solid #000;
    }
    .table0 tr th, .table0 tr td{
      border: 1px solid #000;
    }
    .noBorder tr th{
      border-top: 1px solid transparent!important;
    }
    .detailData{
      padding-bottom: 40px;
    }
    .tableData {
      padding: 0 8px;
      padding-bottom: 20px;
    }
    .tableData h2.title{
      font-size: 18px;
      padding-bottom: 20px;
      text-align: center;
    }
    .tableData h3.title{
      width: 100%;
      padding:8px 0;
      text-align: center;
    }
    .tableData tbody tr td{
      padding-left: 5px;
    }
    .tableData tbody tr th{
      text-align: center !important;
      padding-left: 5px;
    }
</style>
