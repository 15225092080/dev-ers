<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>
    <erdSha-edit v-if="erdShaEdit"
                 :paramEdit="paramEdit"
                 ref="child"
                 :vis.sync="erdShaEdit"></erdSha-edit>
    <erdSha-detail v-if="erdShaDetail"
                   :paramEdit="paramDetail"
                   ref="erdShaDetail"
                   :vis.sync="erdShaDetail"></erdSha-detail>
    <ere-edit v-if="ereEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="ereEdit"></ere-edit>
    <ere-detail v-if="ereDetail"
                :paramEdit="paramDetail"
                ref="ereDetail"
                :vis.sync="ereDetail"></ere-detail>
    <erf-edit v-if="erfEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="erfEdit"></erf-edit>
    <erf-detail v-if="erfDetail"
                :paramEdit="paramDetail"
                ref="erfDetail"
                :vis.sync="erfDetail"></erf-detail>
    <erg-edit v-if="ergEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="ergEdit"></erg-edit>
    <erg-detail v-if="ergDetail"
                :paramEdit="paramDetail"
                ref="ergDetail"
                :vis.sync="ergDetail"></erg-detail>
    <erh-edit v-if="erhEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="erhEdit"></erh-edit>
    <erh-detail v-if="erhDetail"
                :paramEdit="paramDetail"
                ref="erhDetail"
                :vis.sync="erhDetail"></erh-detail>
    <eri-edit v-if="eriEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="eriEdit"></eri-edit>
    <eri-detail v-if="eriDetail"
                :paramEdit="paramDetail"
                ref="eriDetail"
                :vis.sync="erfDetail"></eri-detail>
    <!-- 查询报送历史列表页 -->
    <ebbHistory v-if="ebbHistory"
                :paramDetail="paramDetail"
                @closeChild="closeChild"
                ref="ebbHistory"
                :vis.sync="ebbHistory"></ebbHistory>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import erdShaEdit from './erdSha/edit';
import erdShaDetail from './erdSha/detail';
import ereEdit from './ere/edit';
import ereDetail from './ere/detail';
import erfEdit from './erf/edit';
import erfDetail from './erf/detail';
import ergEdit from './erg/edit';
import ergDetail from './erg/detail';
import erhEdit from './erh/edit';
import erhDetail from './erh/detail';
import eriEdit from './eri/edit';
import eriDetail from './eri/detail';
import ebbHistory from './ebb-Edit';
import Bus from '@/common/script/bus.js';
export default {
  name: 'child',
  components: {
    vCollapse,
    erdShaEdit,
    erdShaDetail,
    ereEdit,
    ereDetail,
    erfEdit,
    erfDetail,
    ergEdit,
    ergDetail,
    erhEdit,
    erhDetail,
    eriEdit,
    eriDetail,
    ebbHistory,
  },
  data() {
    let _this = this;
    return {
      ebbHistory: false,
      erdShaEdit: false,
      erdShaDetail: false,
      ereEdit: false,
      ereDetail: false,
      erfEdit: false,
      erfDetail: false,
      ergEdit: false,
      ergDetail: false,
      erhEdit: false,
      erhDetail: false,
      eriEdit: false,
      eriDetail: false,
      detailUrl: {
        // url: this.$urlList.eli.getValUrl,
        delUrl: this.$urlList.erdSha.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      visible: false,
      paramEdit: {},
      paramDetail: {},
      isDisabled: false, // 字段是否可编辑
      validatorCustId: {}, // 重复校验是否添加
      collapseList: {
        activeNames: ['era'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/era-basicinfoTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'era',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.era.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.era.create,
            update: this.$urlList.era.update,
            submitCustom: this.submitCustom,
            detailDataFun: this.eraDataFun,
            first: true,
          },
          {
            name: 'erb',
            title: '基本概况段',
            showField: 'form',
            bind: 'erbList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            create: this.$urlList.erb.create,
            update: this.$urlList.erb.update,
            disabled: true,
            submitFun: false,
            callback: true,
            search: { custId: 'custId', deptCode: 'deptCode' },
            defaultShow: true,
          },
          {
            name: 'erc',
            title: '主要负责人段',
            showField: 'form',
            bind: 'ercList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erc.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            create: this.$urlList.erc.create,
            update: this.$urlList.erc.update,
            disabled: true,
            submitFun: false,
            callback: true,
            search: { custId: 'custId', deptCode: 'deptCode' },
            defaultShow: true,
          },
          {
            name: 'erd',
            title: '注册资本段',
            showField: 'form',
            bind: 'erdList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erd.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            create: this.$urlList.erd.create,
            update: this.$urlList.erd.update,
            disabled: true,
            submitFun: false,
            callback: true,
            search: { custId: 'custId', deptCode: 'deptCode' },
            defaultShow: true,
          },
          {
            name: 'erdSha',
            title: '主要出资人段',
            showField: 'table',
            bind: 'erdShaTable',
            disabled: true,
            where: { search_EQ_custId: 'custId' },
          },
          {
            name: 'ere',
            title: '对外投资信息段',
            showField: 'table',
            bind: 'ereTable',
            disabled: true,
            where: { search_EQ_custId: 'custId' },
          },
          {
            name: 'erf',
            title: '负面信息段',
            showField: 'table',
            bind: 'erfTable',
            disabled: true,
            where: {
              search_EQ_custId: 'custId',
            },
          },
          {
            name: 'erg',
            title: '资产负债表',
            showField: 'table',
            bind: 'ergTable',
            disabled: true,
            where: {
              search_EQ_custId: 'custId',
              search_EQ_deptCode: 'deptCode',
            },
          },
          {
            name: 'erh',
            title: '利润表',
            showField: 'table',
            bind: 'erhTable',
            disabled: true,
            where: {
              search_EQ_custId: 'custId',
              search_EQ_deptCode: 'deptCode',
            },
          },
          {
            name: 'eri',
            title: '现金流量表',
            showField: 'table',
            bind: 'eriTable',
            disabled: true,
            where: {
              search_EQ_custId: 'custId',
              search_EQ_deptCode: 'deptCode',
            },
          },
          {
            name: 'ers',
            title: '补充报表段',
            showField: 'form',
            bind: 'ersList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.ers.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            create: this.$urlList.ers.create,
            update: this.$urlList.ers.update,
            disabled: true,
            submitFun: false,
            callback: true,
            search: { custId: 'custId', deptCode: 'deptCode' },
            defaultShow: true,
          },
        ],
        // 主要出资人段
        erdShaTable: {
          bussName: 'erdSha',
          where: { search_EQ_custId: this.$route.query.custId },
          editTitle: '主要出资人段',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'sharhodName',
              title: '出资人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerdSha,
              },
            },
            {
              field: 'sharhodIdType',
              title: '出资人身份类别',
              width: 120,
              oper: {
                name: 'dic',
                type: 'InfoIDType',
              },
            },
            {
              field: 'sharhodCertIdType',
              title: '出资人身份标识类型',
              width: 180,
              oper: {
                name: 'function',
                followName: 'sharhodIdType',
                changeName: 'sharhodCertIdType',
                dicUrl: this.$urlList.common.dic,
                type: 'InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'sharhodIdNum',
              title: '出资人身份标识号码',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        // 对外投资信息段
        ereTable: {
          bussName: 'ere',
          where: { search_EQ_custId: this.$route.query.custId },
          editTitle: '对外投资信息段',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'invEntName',
              title: '被投资企业名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailere,
              },
            },
            {
              field: 'invCertType',
              title: '被投资企业身份标识类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'InfoIDType2',
              },
            },
            {
              field: 'invCertNum',
              title: '被投资企业身份标识号码',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        // 负面信息段
        erfTable: {
          bussName: 'erf',
          where: { search_EQ_custId: this.$route.query.custId },
          editTitle: '负面信息段',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'negInfo',
              title: '信息内容',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerf,
              },
            },
            {
              field: 'negType',
              title: '负面信息类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'NegativeType',
              },
            },
            {
              field: 'invAmount',
              title: '涉案金额',
              width: 120,
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        // 资产负债表
        ergTable: {
          bussName: 'erg',
          where: {
            search_EQ_custId: this.$route.query.custId,
            search_EQ_deptCode: this.$route.query.deptCode,
          },
          editTitle: '资产负债表',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerg,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        // 利润表
        erhTable: {
          bussName: 'erh',
          where: {
            search_EQ_custId: this.$route.query.custId,
            search_EQ_deptCode: this.$route.query.deptCode,
          },
          editTitle: '利润表',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailerh,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
        // 现金流量表
        eriTable: {
          bussName: 'eri',
          where: {
            search_EQ_custId: this.$route.query.custId,
            search_EQ_deptCode: this.$route.query.deptCode,
          },
          editTitle: '现金流量表',
          self: _this,
          showButton: true,
          btn: {
            add: '',
            edit: '',
            del: '',
          },
          tableHeader: [
            {
              // 详情demo
              field: 'sheetYear',
              title: '报表年份',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetaileri,
              },
            },
            {
              field: 'sheetType',
              title: '报表类型',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormType',
              },
            },
            {
              field: 'sheetTypeDivide',
              title: '报表类型细分',
              width: 120,
              oper: {
                name: 'dic',
                type: 'ReportFormdel',
              },
            },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'REPORT_STATE',
              },
            },
          ],
        },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 分数计算编辑页 弹出对话框
    historyBtnEbb() {
      // console.log(this.$refs.collapse.$refs.arrList[0].formItem.score);
      if (
        this.$refs.collapse.$refs.arrList[0].formItem.score !== '' ||
        undefined
      ) {
        this.ebbHistory = true;
        this.paramDetail = {
          title: '分数计算页-编辑',
          dialogTitle: '',
          url: null,
          entName: this.$refs.collapse.$refs.arrList[0].formItem.entName,
          data: {
            custId: this.$refs.collapse.$refs.arrList[0].formItem.custId,
          },
        };
      }
    },
    closeChild() {
      this.ebbHistory = false;
    },
    eraDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        _this.collapseList.item[i].defaultShow = false;
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'C1'
        ) {
          if (item.name == 'erd' || item.name == 'erdSha') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D1'
        ) {
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D2'
        ) {
          if (item.name == 'erdSha' || item.name == 'ere') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R1'
        ) {
          // 当账户类型为R1时，基本信息段表格的 字段 为 信用额度
          if (item.name == 'erb') {
            _this.collapseList.elcTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.elcTable.tableHeader[1].title = '信用额度';
          }
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R4'
        ) {
          if (item.name == 'ere') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        }
        return arr.push(item);
      });
      _this.collapseList.item = arr;
    },
    submitCustom(url, formItem, refsBind, i, name, self) {
      let _this = self;
      let formData = self.$refs[refsBind][0];
      if (formData.treeData) {
        formData.treeData.forEach((item, index) => {
          formData.formItem[item.name] = this.common.unique(formData.treeNodes);
        });
      }
      formData.$refs[formItem].validate((valid) => {
        if (valid) {
          let param;
          // comData 有值是编辑， 没有值是新增
          if (_this.$store.getters.arrListFormData[name]) {
            let formItemData = {};
            for (let k in formData.formItem) {
              if (formData.formItem[k]) {
                formItemData[k] = formData.formItem[k];
              }
            }
            param = Object.assign(
              _this.$store.getters.arrListFormData[name],
              formItemData
            );
            url = _this.collapseList.item[i].update;
          } else if (
            _this.collapseList.item[i].comData &&
            _this.collapseList.item[i].comData.id
          ) {
            param = Object.assign(
              _this.collapseList.item[i].comData,
              formData.formItem
            );
            url = self.collapseList.item[i].update;
          } else {
            url = self.collapseList.item[i].create;
            if (formData.formItem && formData.formItem.id) {
              url = self.collapseList.item[i].update;
            }
            formData.formItem.infOldType = 2;
            param = formData.formItem;
          }
          for (let k in _this.collapseList.item[i].where) {
            param[_this.collapseList.item[i].where[k]] =
              _this.$store.getters.arrListFormItem[
                _this.collapseList.item[i].where[k]
              ];
          }
          this.http
            .apiPost(url, param, {
              showLoading: true,
            })
            .then((res) => {
              this.common.submitMsg(res).then(() => {
                if (res.code == '00000000') {
                  // 储存第一个form
                  if (i == 0) {
                    this.$store.dispatch('user/setFormItem', param);
                    this.common.Control(this.collapseList.arrList, {
                      custId: {
                        rule: [
                          { validator: this.validator.empty, trigger: 'blur' },
                          { max: 64, message: '最多64位', trigger: 'blur' },
                          {
                            validator: this.noSpecialCaracters,
                            trigger: 'blur',
                          },
                        ],
                        disabled: true,
                      },
                      acctType: {
                        disabled: true,
                      },
                    });
                  }
                  this.$refs.collapse.$refs.arrList[0].noresetItem.push(
                    'custId'
                  );
                  this.$refs.collapse.$refs.arrList[0].noresetItem.push(
                    'acctType'
                  );
                  this.$nextTick(() => {
                    // 新增提交之后下面折叠栏可以点击 刪除对应的表格
                    self.collapseList.item.forEach((item, j) => {
                      /*  功能未知，暂时给注释掉  */
                      // if (res.comData && JSON.parse(res.comData).data.acctType == 'C1') {
                      //   if (item.name == ('erd' || 'ere')) {
                      //     self.collapseList.item.splice(j, 1);
                      //   }
                      // } else if (JSON.parse(res.comData).data.acctType == 'D2') {
                      //   if (item.name == 'erd') {
                      //     self.collapseList.item.splice(j, 1);
                      //   }
                      // }
                      if (item.showField == 'table') {
                        for (var k in item.where) {
                          let val = item.where[k];
                          self.collapseList[item.bind].where[k] =
                            _this.$store.getters.arrListFormItem[val];
                        }
                      }
                      item.disabled = false;
                    });
                    this.eraDataFun();
                  });

                  self.collapseList.item[i].url = self.$urlList[name].update;
                  self.collapseList.item[i].comData = JSON.parse(
                    res.comData
                  ).data;
                }
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
    showdetailerdSha(selectRow) {
      this.erdShaDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '主要出资人段详情页',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailere(selectRow) {
      this.ereDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '对外投资信息段详情页',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailerf(selectRow) {
      this.erfDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '负面信息段详情页',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailerg(selectRow) {
      this.$router.push({
        path: '/erg-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    showdetailerh(selectRow) {
      this.$router.push({
        path: '/erh-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    showdetaileri(selectRow) {
      this.$router.push({
        path: '/eri-detail',
        query: {
          id: selectRow.id,
        },
      });
    },
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('entCertType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.collapseList.arrList, {
            entCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.checkLoanCardnorules,
                  trigger: 'blur',
                },
              ],
            },
          });
        } else if (obj.e == 20) {
          _this.common.Control(_this.collapseList.arrList, {
            entCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.isCCode,
                  trigger: 'blur',
                },
              ],
            },
          });
        } else {
          _this.common.Control(_this.collapseList.arrList, {
            entCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.isCorpNo,
                  trigger: 'blur',
                },
              ],
            },
          });
        }
      });
      _this.common.onselect('supOrgCertType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.collapseList.erfList, {
            supOrgCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.checkLoanCardnorules,
                  trigger: 'blur',
                },
              ],
            },
          });
        } else if (obj.e == 20) {
          _this.common.Control(_this.collapseList.erfList, {
            supOrgCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.isCCode,
                  trigger: 'blur',
                },
              ],
            },
          });
        } else {
          _this.common.Control(_this.collapseList.erfList, {
            supOrgCertNum: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
                {
                  required: true,
                  validator: _this.validator.isCorpNo,
                  trigger: 'blur',
                },
              ],
            },
          });
        }
      });
      // 当国别代码为“CHN”时，登记地址不能为空
      _this.common.onselect('nationality', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 'CHN') {
          _this.common.Control(_this.collapseList.ercList, {
            regAdd: {
              rule: [
                {
                  required: true,
                  validator: _this.validator.empty,
                  trigger: 'blur',
                },
              ],
            },
          });
        } else {
          _this.common.Control(_this.collapseList.ercList, {
            regAdd: {
              rule: [{ required: false, trigger: 'blur' }],
            },
          });
        }
      });
    },
    treeCustom(code) {
      this.http
        .apiGet(this.$urlList.common.getEmpdCodeName, {
          params: { code: code },
        })
        .then((res) => {
          this.$refs.collapse.$refs.ercList[0].search_IN_orgId_fake = res;
        });
    },
    init() {
      // 根据返回的 新增页状态 还是 修改页状态 对 业务号 是否添加重复校验
      if (this.$store.getters.operatState == 'add') {
        // 新增页---客户号可编辑
        this.isDisabled = false; // 字段可编辑
        this.validatorCustId = {
          url: this.$urlList.era.ajaxIsOnly,
          required: true,
          validator: this.validator.validatorCustId,
          trigger: 'blur',
        }; // 添加重复校验
      } else if (this.$store.getters.operatState == 'edit') {
        // 修改页---客户号不可编辑
        this.isDisabled = true; // 字段不可编辑
        this.validatorCustId = {};
      }
      // 基础段
      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'custId',
            value: '',
            label: '客户号',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              this.validatorCustId,
              { max: 64, message: '最多64位', trigger: 'blur' },
              { validator: this.noSpecialCaracters, trigger: 'blur' },
            ],
            noReset: this.isDisabled,
            disabled: this.isDisabled,
          },
          {
            type: 'input',
            name: 'entName',
            value: '',
            label: '企业名称',
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
            type: 'select',
            name: 'entCertType',
            value: '',
            param: 'InfoIDType2',
            label: '企业身份标识类型',
            eventChange: true,
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
            name: 'entCertNum',
            value: '',
            label: '企业身份标识号码',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              { max: 40, message: '最多40位', trigger: 'blur' },
            ],
          },
        ],
        [
          // {
          //   type: 'select',
          //   name: 'deptCode',
          //   value: '',
          //   param: 'DEPT_CODE',
          //   label: '内部机构代码',
          //   span: 12,
          //   rule: [
          //     {
          //       required: true,
          //       validator: this.validator.empty,
          //       trigger: 'change',
          //     },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
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
            label: '内部机构代码',
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
            type: 'date',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
            rule: [
              {
                required: true,
                validator: this.validator.empty,
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
            param: 'NO_REPORT',
            label: '免报标志',
            eventChange: true,
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
            type: this.$store.getters.operatState == 'add' ? 'hidden' : 'input',
            name: 'score',
            value: '',
            label: '分数',
            span: 12,
            clickFun: this.historyBtnEbb,
            noReset: this.isDisabled,
            readonly: true,
          },
        ],
      ];
      // 基本概况段
      this.collapseList.erbList = [
        [
          // {
          //   type: 'hidden',
          //   name: 'custId',
          //   value: '',
          //   label: '客户号',
          //   span: 12,
          //   rule: [
          //     { validator: this.validator.empty, trigger: 'blur' },
          //     this.validatorCustId,
          //     { max: 64, message: '最多64位', trigger: 'blur' },
          //     { validator: this.noSpecialCaracters, trigger: 'blur' },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
          {
            type: 'input',
            name: 'regAdd',
            value: '',
            label: '登记注册地址',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                max: 100,
                message: '最多100位',
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'cascader',
            name: 'admDivOfReg',
            value: '',
            labelWidth: '140px',
            label: '登记地行政区划代码',
            span: 24,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'date',
            name: 'establishDate',
            value: '',
            label: '成立日期',
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
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
            name: 'bizRange',
            value: '',
            label: '业务范围',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'blur',
              // },
              {
                max: 400,
                message: '最多400位',
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'souIncome',
            value: '',
            label: '主营业务收入来源',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'blur',
              // },
              {
                max: 100,
                message: '最多100位',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'tree',
            treeurl: this.$urlList.common.empdTree,
            treetitle: '行业分类树',
            defaultProps: {
              children: 'children',
              label: function (a, b) {
                return a.value;
              },
            },
            name: 'ecoIndusCate',
            value: '',
            label: '行业分类代码',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'change',
              },
            ],
            custom: this.treeCustom,
          },
        ],
        [
          {
            type: 'select',
            name: 'ecoType',
            value: '',
            param: 'EconomicType',
            label: '经济类型代码',
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
            type: 'select',
            name: 'ratResults',
            value: '',
            param: 'IRROFI',
            label: '金融机构内部评级结果',
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
            name: 'ratSysDescr',
            value: '',
            label: '金融机构内评体系描述',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                max: 1000,
                message: '最多1000位',
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'select',
            name: 'busChanges',
            param: 'ChangeBusiness',
            value: '',
            label: '主营业务变更情况',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'change',
              // },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'assetSupport',
            param: 'CreditAssetSupport',
            value: '',
            label: '信贷资产支持',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'change',
              // },
            ],
          },
          {
            type: 'select',
            name: 'perChange',
            value: '',
            param: 'PersonnelChanges',
            label: '近一年主要人员是否发生变动',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'change',
              // },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'taxArrearNm',
            value: '',
            label: '近三年的欠税条数',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'blur',
              // },
              {
                // required: true,
                max: 2,
                message: '最多2位',
                trigger: 'blur',
              },
              {
                // required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'select',
            name: 'opePropeRights',
            value: '',
            param: 'PropertyRights',
            label: '经营地产权情况',
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
            name: 'practitionerNum',
            value: '',
            label: '从业人员数量',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              { required: true, max: 6, message: '最多6位', trigger: 'blur' },
              {
                required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'input',
            name: 'boaMemberNum',
            value: '',
            label: '董事会成员(执行董事)数量',
            span: 12,
            rule: [
              {
                // required: true,
                max: 6,
                message: '最多6位',
                trigger: 'blur',
              },
              {
                // required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'boaSupervisNm',
            value: '',
            label: '监事会成员(监事)数量',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'blur',
              // },
              {
                // required: true,
                max: 6,
                message: '最多6位',
                trigger: 'blur',
              },
              {
                // required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'select',
            name: 'countyEnterprises',
            value: '',
            param: 'IS_COUNTYENT',
            label: '是否县域企业',
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
            type: 'select',
            name: 'agrRelated',
            value: '',
            param: 'IS_AGRIBUSINESS',
            label: '是否涉农企业',
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
          // {
          //   type: 'tree',
          //   treeurl: this.$urlList.common.orgTree,
          //   treetitle: '机构树',
          //   defaultProps: {
          //     children: 'children',
          //     label: function (a, b) {
          //       return a.name;
          //     },
          //   },
          //   name: 'deptCode',
          //   value: '',
          //   label: '内部机构代码',
          //   span: 12,
          //   rule: [
          //     {
          //       required: true,
          //       validator: this.validator.empty,
          //       trigger: 'change',
          //     },
          //   ],
          // },
          {
            type: 'date',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
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
      // 主要负责人段
      this.collapseList.ercList = [
        [
          // {
          //   type: 'input',
          //   name: 'custId',
          //   value: '',
          //   label: '客户号',
          //   span: 12,
          //   rule: [
          //     { validator: this.validator.empty, trigger: 'blur' },
          //     this.validatorCustId,
          //     { max: 64, message: '最多64位', trigger: 'blur' },
          //     { validator: this.noSpecialCaracters, trigger: 'blur' },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
          {
            type: 'input',
            name: 'legalRepName',
            value: '',
            label: '主要负责人名称',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              { max: 30, message: '最多30位', trigger: 'blur' },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'legalRepIdType',
            value: '',
            param: 'InfoIDType1',
            label: '主要负责人身份标识类型',
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
            name: 'legalRepIdNum',
            value: '',
            label: '主要负责人身份证件号码',
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
        ],
        [
          {
            type: 'select',
            name: 'legalRepPstn',
            value: '',
            param: 'RegisteredResidence',
            label: '主要负责人户籍情况',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'change',
              // },
            ],
          },
          {
            type: 'select',
            name: 'legalRepEdu',
            value: '',
            param: 'Education',
            label: '主要负责人学历情况',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'change',
              // },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'legalRepEmpyears',
            value: '',
            label: '主要负责人在本单位从业年限',
            span: 12,
            rule: [
              // {
              //   required: true,
              //   validator: this.validator.empty,
              //   trigger: 'blur',
              // },
              { max: 2, message: '最多2位', trigger: 'blur' },
              {
                // required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
          // {
          //   type: 'select',
          //   name: 'deptCode',
          //   value: '',
          //   param: 'OrganizationalType',
          //   label: '内部机构代码',
          //   span: 12,
          //   rule: [
          //     {
          //       required: true,
          //       validator: this.validator.empty,
          //       trigger: 'change',
          //     },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
        ],
        [
          {
            type: 'date',
            name: 'bussDate',
            value: '',
            label: '业务发生日期',
            span: 12,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
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
      // 注册资本段
      this.collapseList.erdList = [
        [
          // {
          //   type: 'input',
          //   name: 'custId',
          //   value: '',
          //   label: '客户号',
          //   span: 12,
          //   rule: [
          //     { validator: this.validator.empty, trigger: 'blur' },
          //     this.validatorCustId,
          //     { max: 64, message: '最多64位', trigger: 'blur' },
          //     { validator: this.noSpecialCaracters, trigger: 'blur' },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
          {
            type: 'select',
            name: 'regCapCurrency',
            value: '',
            param: 'Cy',
            label: '注册资本币种',
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
            name: 'regCap',
            value: '',
            label: '注册资本',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              { max: 15, message: '最多15位', trigger: 'blur' },
              {
                required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
            ],
          },
          // {
          //   type: 'select',
          //   name: 'deptCode',
          //   value: '',
          //   param: 'OrganizationalType',
          //   label: '内部机构代码',
          //   span: 12,
          //   rule: [
          //     {
          //       required: true,
          //       validator: this.validator.empty,
          //       trigger: 'change',
          //     },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
        ],
        [
          {
            type: 'date',
            name: 'bussDate',
            value: '',
            param: '',
            label: '业务发生日期',
            span: 12,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
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
      // 补充报表段
      this.collapseList.ersList = [
        [
          // {
          //   type: 'input',
          //   name: 'custId',
          //   value: '',
          //   label: '客户号',
          //   span: 12,
          //   rule: [
          //     { validator: this.validator.empty, trigger: 'blur' },
          //     this.validatorCustId,
          //     { max: 64, message: '最多64位', trigger: 'blur' },
          //     { validator: this.noSpecialCaracters, trigger: 'blur' },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
          {
            type: 'input',
            name: 'intExp',
            value: '',
            label: '利息支出（费用化利息支出+资本化利息支出）',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'input',
            name: 'finExp',
            value: '',
            label: '财务费用利息支出',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'capIntExp',
            value: '',
            label: '资本化利息支出',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'input',
            name: 'gauEndOfPer',
            value: '',
            label: '期末未清担保余额',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
        ],
        [
          {
            type: 'input',
            name: 'oriFixedAssets',
            value: '',
            label: '固定资产原值',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'input',
            name: 'derIxedAssets',
            value: '',
            label: '固定资产累计折旧',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.isFloat,
                trigger: 'blur',
              },
            ],
          },
        ],
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
        ],
      ];
    },
  },
  created() {
    Bus.$on('successCallback', (obj) => {
      if (obj) {
        this.common.Control(this.collapseList.arrList, {
          custId: {
            rule: [
              { validator: this.validator.empty, trigger: 'blur' },
              { max: 64, message: '最多64位', trigger: 'blur' },
              { validator: this.noSpecialCaracters, trigger: 'blur' },
            ],
            disabled: true,
          },
        });
        this.$refs.collapse.$refs.arrList[0].noresetItem.push('custId');
      }
    });
    this.init();
  },
  beforeDestroy() {
    Bus.$off('successCallback');
  },
};
</script>
<style>
</style>
