<template>
  <div>
    <el-dialog :title="paramDetail.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramDetail.dialogTitle + paramDetail.title  }}</span>
        <span class="dialog-title-bg"></span>
      </span>

      <v-form ref="formItem"
              :buttonGroup="buttonGroup"
              v-bind:arrList="arrList"
              :url="url"
              labelWidth="100px">
        <!-- <el-button slot="slotBtn" class="submit_btn" @click="linkTo('-detail')" v-if="showSlotBtn">数据详情</el-button>
          <el-button slot="slotBtn" class="submit_btn" @click="yesBtnFun" v-if="showSlotBtn">通过</el-button>
          <el-button slot="slotBtn" class="submit_btn" @click="changestopFlag" v-if="showSlotBtn">拒绝</el-button> -->
      </v-form>
      <!-- 操作记录表格 -->
      <div>
        <div class="tableName">
          操作记录列表
        </div>
        <table class="talbe tableClass">
          <thead>
            <tr>
              <th>操作员</th>
              <th>操作时间</th>
              <th>操作方式</th>
              <th>业务类型</th>
              <th>具体信息段</th>
              <th>业务发生日期</th>
              <th>操作字段</th>
              <th>操作字段前后值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in tableData"
                :key="i">
              <td>{{item.operator}}</td>
              <td>{{item.operateDate}}</td>
              <td>{{idTypeDic['ApprovalDetails'][item.operatorMode]}}</td>
              <td>{{idTypeDic['BussType'][item.bussType]}}</td>
              <td>{{idTypeDic['InfoSegment'][item.infoSegment]}}</td>
              <td>{{item.bussDate}}</td>
              <td>{{item.operateField || "--"}}</td>
              <td>{{item.fieldOldvalue || "" }} -- {{item.fieldNewvalue || ""}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 审批记录列表表格 -->
      <div v-if="showApp">
        <div class="tableName">
          审批记录列表
        </div>
        <table class="table tableClass">
          <thead>
            <tr>
              <th>审批员</th>
              <th>审批时间</th>
              <th>审批状态</th>
              <th>审批备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in appData"
                :key="i">
              <td>{{item.approver}}</td>
              <td>{{item.approveDate}}</td>
              <td>{{idTypeDic['AUDITING_STATE'][item.approveState]}}</td>
              <td>{{item.remark}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footerBtn">
        <el-button class="submit_btn"
                   @click="linkTo('-detail')"
                   v-if="showSlotBtn">数据详情</el-button>
        <el-button class="submit_btn"
                   @click="yesBtnFun"
                   v-if="showSlotBtn">通过</el-button>
        <el-button class="submit_btn"
                   @click="changestopFlag"
                   v-if="showSlotBtn">拒绝</el-button>
        <el-button class="submit_btn"
                   @click="close">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import ecbDetail from '@/modules/ers/components/view/clientInfo/ecb-list/model/detail.vue';
import eccDetail from '@/modules/ers/components/view/clientInfo/ecc-list/model/detail.vue';
export default {
  name: 'child',
  components: {
    eccDetail,
    ecbDetail,
  },
  mixins: [MinXin],
  data() {
    return {
      // 弹框显隐控制
      centerDialogVisible: true,
      // 提交的url
      url: '',
      tableData: '',
      appData: '',
      showApp: false, //审批记录显隐
      showSlotBtn: true, //查看详情按钮
      // 新增、编辑页面表单
      arrList: [],
      formItem: {},
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        // url:this.$urlList.ecb.getValUrl,   //接口
        // param:{params:{id: this.$parent.detailUrl.resId}}   //参数
      },
      buttonGroup: [],
      idTypeDic: {}, // 字典字段
    };
  },
  props: ['paramDetail'],
  computed: {},
  watch: {},
  methods: {
    close() {
      this.$refs.formItem.close();
    },
    // 获取字典方法
    getdataDic() {
      let type = [
        'ApprovalDetails',
        'BussType',
        'InfoSegment',
        'AUDITING_STATE',
      ];
      type.forEach((item) => {
        this.common.getdic(this.$urlList.common.dic, item);
        this.idTypeDic[item] = JSON.parse(
          sessionStorage.getItem(
            sessionStorage.getItem('systemId') + '_' + item
          )
        );
      });
    },
    //点击拒绝按钮方法
    changestopFlag() {
      let row = this.$refs.formItem.formItem;
      let messageObj = {
        message: '请描述拒绝原因',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '拒绝原因不能为空',
      };
      this.common
        .MessageBoxprompt(messageObj)
        .then(({ value }) => {
          this.http
            .apiGet(
              this.$urlList.approval.approvalUrl,
              {
                params: {
                  remark: value,
                  taskId: row.taskId,
                  approveState: '3',
                  approverLevel: row.approverLevel,
                  dataId: row.dataId,
                },
              },
              { showLoading: true }
            )
            .then((res) => {
              this.common.submitMsg(res).then(() => {
                if (res.code == '00000000') {
                  this.centerDialogVisible = false;
                  this.$parent.$refs.dataTable.getTableData();
                }
              });
            });
        })
        ['catch'](() => {
          this.reload();
        });
    },
    //点击通过按钮方法
    yesBtnFun() {
      let row = this.$refs.formItem.formItem;
      this.http
        .apiGet(
          this.$urlList.approval.approvalUrl,
          {
            params: {
              remark: '',
              taskId: row.taskId,
              approveState: '4',
              approverLevel: row.approverLevel,
              dataId: row.dataId,
            },
          },
          { showLoading: true }
        )
        .then((res) => {
          this.common.submitMsg(res).then(() => {
            if (res.code == '00000000') {
              this.centerDialogVisible = false;
              this.$parent.$refs.dataTable.getTableData();
            }
          });
        });
    },
    //查看详情按钮
    linkTo(pathName) {
      // debugger;
      // this.$store.dispatch('user/setOperatState', 'edit');
      let jsonData = this.$refs.formItem.formItem;
      let name =
        jsonData.bussType.substr(0, 1).toLowerCase() +
        jsonData.bussType.substr(2, 2).toLowerCase();
      let query;
      if (
        name.substring(0, 3) ==
        ('era' ||
          'erb' ||
          'erc' ||
          'erd' ||
          'erdSha' ||
          'erf' ||
          'erg' ||
          'erh' ||
          'eri')
      ) {
        query = { custId: jsonData.custId };
        this.$router.push({ path: '/era-rateTab' + pathName, query });
      } else if (name.substring(0, 3) == ('erj' || 'erk')) {
        query = { bussNum: jsonData.bussNum };
        this.$router.push({ path: '/erj-rateTab' + pathName, query });
      } else if (name.substring(0, 2) == 'ef') {
        query = { id: jsonData.dataId };
      } else if (name.substring(0, 2) == 'ec') {
        query = { id: jsonData.dataId };
      } else {
        query = { bussNum: jsonData.bussNum };
      }
      // this.$router.push({ path: '/error-' + name + pathName, query });
    },
    // 监听下拉框事件
    init() {
      // 页面表单
      this.arrList = [
        [
          {
            type: 'select',
            name: 'bussType',
            value: '',
            param: 'BussType',
            label: '业务类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '企业名称',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'idType',
            value: '',
            param: 'InfoIDType2',
            label: '身份标识类型',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'idNum',
            value: '',
            label: '身份标识号码',
            span: 12,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'custId',
            value: '',
            label: '客户号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '业务编号',
            span: 12,
            disabled: true,
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
          },
          {
            type: 'input',
            name: 'approver',
            value: '',
            label: '操作员',
            hide: this.$parent.detailUrl.approverLevel == '1' ? false : true,
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'approver',
            value: '',
            label: '审批员',
            span: 12,
            hide: this.$parent.detailUrl.approverLevel == '1' ? true : false,
            disabled: true,
          },
        ],
      ];
      let data = { taskId: this.$parent.detailUrl.resId };
      //操作记录表格数据
      this.http
        .apiPost(this.$urlList.approval.getOperationRecord, data)
        .then((res) => {
          this.tableData = JSON.parse(res.comData).data;
        });
      //审批记录表格数据
      this.http
        .apiPost(this.$urlList.approval.getApprovalRecord, data)
        .then((res) => {
          this.appData = JSON.parse(res.comData).data;
          if (this.appData.length != 0) {
            //判断有无返回数据，有数据则展示审批记录
            this.showApp = true;
          } else {
            this.showApp = false;
          }
        });

      if (this.$parent.detailUrl.slotBtnFlag == 0) {
        //待审批页面的详情
        this.showSlotBtn = false;
        this.showApp = false;
      } else if (this.$parent.detailUrl.slotBtnFlag == 1) {
        //已审批页面的详情
        this.showSlotBtn = false;
      }
    },
    formatDic(dicType, value) {
      //字典转换
      let sys = sessionStorage['systemId'];
      return JSON.parse(sessionStorage[sys + '_' + dicType])[value];
    },
  },
  created() {
    this.getdataDic();
    this.init();
  },
};
</script>
<style scoped="scoped">
.submit_btn {
  height: 35px !important;
}
.footerBtn {
  float: right !important;
  margin-right: 20px !important;
  margin-bottom: 10px !important;
}
.tableName {
  border: 1px solid #ddd;
  text-align: center;
  height: 35px;
  line-height: 35px;
}
.tabletitle {
  border: 1px solid #ddd;
  border-top: none;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.tabletitle span {
  margin-left: 20px;
}
.table td,
.tableClass td {
  border: 1px solid #ccc;
}
.tableClass td {
  font-size: 12px;
  padding: 5px 10px;
}
.table td,
.table th {
  font-size: 12px;
  padding: 5px 10px;
}
.tableClass {
  border-radius: 10px;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  background-color: #fff;
  color: #666;
  margin: 10px 0;
  margin-top: 0px;
}
.tableClass thead th {
  font-size: 14px;
  color: #666;
  background-color: #ecedf2;
  height: 20px;
  line-height: 20px;
  text-align: left;
  padding: 5px 10px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  width: 50px;
}
</style>
<style>
.el-message-box__btns .DHCiconfont {
  font-size: 14px;
}
</style>
