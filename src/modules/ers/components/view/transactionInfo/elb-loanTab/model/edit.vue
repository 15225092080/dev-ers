<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>

    <!-- 基本信息段 -->
    <elc-edit v-if="elcEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="elcEdit"></elc-edit>
    <elc-detail v-if="elcDetail"
                ref="elcDetails"
                :paramDetail="paramDetail"
                :vis.sync="elcDetail"></elc-detail>
    <!-- 相关还款责任人段 -->
    <eld-edit v-if="eldEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="eldEdit"></eld-edit>
    <eld-detail v-if="eldDetail"
                ref="eldDetails"
                :paramDetail="paramDetail"
                :vis.sync="eldDetail"></eld-detail>
    <!-- 抵质押物信息段 -->
    <ele-edit v-if="eleEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="eleEdit"></ele-edit>
    <ele-detail v-if="eleDetail"
                ref="eleDetails"
                :paramDetail="paramDetail"
                :vis.sync="eleDetail"></ele-detail>
    <!-- 还款表现信息段 -->
    <elh-edit v-if="elhEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="elhEdit"></elh-edit>
    <elh-detail v-if="elhDetail"
                ref="elhDetails"
                :paramDetail="paramDetail"
                :vis.sync="elhDetail"></elh-detail>
    <!-- 特定交易说明段 -->
    <eli-edit v-if="eliEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="eliEdit"></eli-edit>
    <eli-detail v-if="eliDetail"
                ref="eliDetails"
                :paramDetail="paramDetail"
                :vis.sync="eliDetail"></eli-detail>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
// import MinXin from "@/common/script/mixin";
import Bus from '@/common/script/bus';
import elcDetail from './elc/detail';
import eldDetail from './eld/detail';
import eleDetail from './ele/detail';
import elhDetail from './elh/detail';
import eliDetail from './eli/detail';

import elcEdit from './elc/edit';
import eldEdit from './eld/edit';
import eleEdit from './ele/edit';
import elhEdit from './elh/edit';
import eliEdit from './eli/edit';

export default {
  name: 'child',
  //   mixins: [MinXin],
  components: {
    vCollapse,
    elcDetail,
    eldDetail,
    eleDetail,
    elhDetail,
    eliDetail,
    elcEdit,
    eldEdit,
    eleEdit,
    elhEdit,
    eliEdit,
  },
  data() {
    let _this = this;
    return {
      elcEdit: false,
      elcDetail: false,
      eldEdit: false,
      eldDetail: false,
      eleEdit: false,
      eleDetail: false,
      elhEdit: false,
      elhDetail: false,
      eliEdit: false,
      eliDetail: false,
      //   arrList:[],
      //   url:'',
      deptCodeVal: '',
      validatorBussNum: {}, // 业务号重复校验对象
      isShow: false, // 字段表单是否显示隐藏
      detailUrl: {
        // url: this.$urlList.eli.getValUrl,
        delUrl: this.$urlList.elc.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      // 弹框相关
      paramDetail: {},
      paramEdit: {},
      visible: false,
      collapseList: {
        activeNames: ['elb'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/elb-loanTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        //   detailDataFun 编辑自定义事件 first 获取第一个form存储到vuex中一般只需在第一个form中添加  submitCustom 自定义提交事件  where表格请求参数  search 表单提交参数
        item: [
          {
            name: 'elb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elb.getValUrl, // 接口
              param: this.$route.query, // 参数
              //   },url:"",disabled:false,submitFun:false,create:this.$urlList.elb.create,update:this.$urlList.elb.update,callback:true,first:true},
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.elb.create,
            update: this.$urlList.elb.update,
            submitCustom: this.submitCustom,
            detailDataFun: this.elbDataFun,
            first: true,
          },
          {
            name: 'elc',
            title: '基本信息段',
            showField: 'table',
            bind: 'elcTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'eld',
            title: '相关还款责任人段',
            showField: 'table',
            bind: 'eldTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'ele',
            title: '抵质押物信息段',
            showField: 'table',
            bind: 'eleTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'elf',
            title: '授信额度信息段',
            showField: 'form',
            bind: 'elfList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elf.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: true,
            create: this.$urlList.elf.create,
            update: this.$urlList.elf.update,
            submitFun: false,
            callback: true,
            search: { bussNum: 'bussNum', deptCode: 'deptCode' },
            defaultShow: true,
          },
          {
            name: 'elg',
            title: '初始债权说明段',
            showField: 'form',
            bind: 'elgList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.elg.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: true,
            create: this.$urlList.elg.create,
            update: this.$urlList.elg.update,
            callback: true,
            search: { bussNum: 'bussNum', deptCode: 'deptCode' },
            defaultShow: true,
          },
          {
            name: 'elh',
            title: '还款表现信息段',
            showField: 'table',
            bind: 'elhTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
          {
            name: 'eli',
            title: '特定交易说明段',
            showField: 'table',
            bind: 'eliTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
            defaultShow: true,
          },
        ],
        elcTable: {
          // height:'default', //表格自适应高度
          bussName: 'elc',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          showButton: true,
          btn: {
            add: ['crse:business:elc:create'],
            edit: ['crse:business:elc:update'],
            del: ['crse:business:elc:delete'],
          },
          self: _this,
          editTitle: '基本信息段',
          tableHeader: [
            {
              // 详情demo
              field: 'busiLines',
              title: '借贷业务大类',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_BusiLines_EL',
                //   name: "link",
                clickFun: this.showdetailElc,
              },
            },
            {
              field: 'loanAmt',
              title: '借款金额',
              width: 120,
            },
            {
              field: 'openDate',
              title: '开户日期',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eldTable: {
          bussName: 'eld',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          showButton: true,
          btn: {
            add: ['crse:business:eld:create'],
            edit: ['crse:business:eld:update'],
            del: ['crse:business:eld:delete'],
          },
          self: _this,
          editTitle: '相关还款责任人段',
          tableHeader: [
            {
              // 详情demo
              field: 'arlpIdType',
              title: '身份类别',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_InfoIDType',
                clickFun: this.showdetailEld,
              },
            },
            {
              field: 'arlpName',
              title: '责任人名称',
              width: 120,
            },
            {
              field: 'arlpCertType',
              title: '责任人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'arlpIdType',
                changeName: 'arlpCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'arlpCertNum',
              title: '责任人身份标识号码',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eleTable: {
          bussName: 'ele',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          showButton: true,
          btn: {
            add: ['crse:business:ele:create'],
            edit: ['crse:business:ele:update'],
            del: ['crse:business:ele:delete'],
          },
          self: _this,
          editTitle: '抵质押物信息段',
          tableHeader: [
            {
              // 详情demo
              field: 'ccBussNum',
              title: '抵(质)押合同编号',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailEle,
              },
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        elhTable: {
          bussName: 'elh',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          showButton: true,
          btn: {
            add: ['crse:business:elh:create'],
            edit: ['crse:business:elh:update'],
            del: ['crse:business:elh:delete'],
          },
          self: _this,
          editTitle: '还款表现信息段',
          tableHeader: [
            {
              // 详情demo
              field: 'rptDateCode',
              title: '报送时点',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_RptDateCode_EL',
                clickFun: this.showdetailElh,
              },
            },
            {
              // 详情demo
              field: 'acctStatus',
              title: '账户状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_AcctStatus',
              },
            },
            {
              field: 'acctBal',
              title: '余额',
              width: 120,
            },
            {
              field: 'fiveCate',
              title: '五级分类',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_FiveCate',
              },
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
              },
            },
          ],
        },
        eliTable: {
          bussName: 'eli',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          showButton: true,
          btn: {
            add: ['crse:business:eli:create'],
            edit: ['crse:business:eli:update'],
            del: ['crse:business:eli:delete'],
          },
          self: _this,
          editTitle: '特定交易说明段',
          tableHeader: [
            {
              // 详情demo
              field: 'chanTranType',
              title: '交易类型',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_ChanTranType',
                clickFun: this.showdetailEli,
              },
            },
            {
              field: 'tranDate',
              title: '交易日期',
              width: 120,
            },
            {
              field: 'tranAmt',
              title: '交易金额',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
            // {
            //   field: 'deptCode',
            //   title: '所属机构',
            //   width: 120,
            //   oper: {
            //     name: 'dic',
            //     type: 'deptCode'
            //   }
            // },
            {
              field: 'dataState',
              title: '数据状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_DATA_STATE',
              },
            },
            {
              field: 'reportState',
              title: '报送状态',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_REPORT_STATE',
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
    elbDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        _this.collapseList.item[i].defaultShow = false;
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'C1'
        ) {
          if (item.name == 'ele' || item.name == 'elf') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D1'
        ) {
          if (item.name == 'elg') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D2'
        ) {
          if (item.name == 'elf' || item.name == 'elg') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R1'
        ) {
          // 当账户类型为R1时，基本信息段表格的 字段 为 信用额度
          if (item.name == 'elc') {
            _this.collapseList.elcTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.elcTable.tableHeader[1].title = '信用额度';
          }
          if (item.name == 'elg') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R4'
        ) {
          if (item.name == 'elg') {
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
                      bussNum: {
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
                    'bussNum'
                  );
                  this.$refs.collapse.$refs.arrList[0].noresetItem.push(
                    'acctType'
                  );
                  this.$nextTick(() => {
                    // 新增提交之后下面折叠栏可以点击 刪除对应的表格
                    self.collapseList.item.forEach((item, j) => {
                      /*  功能未知，暂时给注释掉  */
                      // if (res.comData && JSON.parse(res.comData).data.acctType == 'C1') {
                      //   if (item.name == ('ele' || 'elf')) {
                      //     self.collapseList.item.splice(j, 1);
                      //   }
                      // } else if (JSON.parse(res.comData).data.acctType == 'D2') {
                      //   if (item.name == 'ele') {
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
                    this.elbDataFun();
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
    showdetailElc(selectRow) {
      this.elcDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '基本信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEld(selectRow) {
      this.eldDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '相关还款责任人段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEle(selectRow) {
      this.eleDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '抵质押物信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailElh(selectRow) {
      this.elhDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '还款表现信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailEli(selectRow) {
      this.eliDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '特定交易说明段',
        id: selectRow.id,
        url: null,
      };
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
    },
    init() {
      // 根据返回的 新增页状态 还是 修改页状态 对 业务号 是否添加重复校验
      if (this.$store.getters.operatState == 'add') {
        // 新增页---业务号、账户类型 两个字段显示，业务号添加重复校验
        this.isShow = false; // 字段显示
        this.validatorBussNum = {
          url: this.$urlList.elb.ajaxIsOnly,
          required: true,
          validator: this.validator.validatorBussNum,
          trigger: 'blur',
        }; // 添加重复校验
      } else if (this.$store.getters.operatState == 'edit') {
        // 修改页---业务号、账户类型 两个字段隐藏，业务号去掉重复校验
        this.isShow = true; // 字段隐藏
        this.validatorBussNum = {}; // 去掉重复校验
      }

      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '业务号',
            hide: this.isShow,
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              this.validatorBussNum,
              {
                required: true,
                validator: this.validator.noSpecialCaracters,
                trigger: 'blur',
              },
              { max: 45, message: '最多45位', trigger: 'blur' },
            ],
          },
          {
            type: 'input',
            name: 'entName',
            value: '',
            label: '借款人名称',
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
            name: 'entCertType',
            value: '',
            param: 'E_InfoIDType2',
            label: '借款人身份标识类型',
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
            label: '借款人身份标识号码',
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
          {
            type: 'select',
            name: 'acctType',
            value: '',
            param: 'E_AcctType_EL',
            label: '账户类型',
            hide: this.isShow,
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
          {
            type: 'select',
            name: 'noReport',
            value: '0',
            param: 'E_NO_REPORT',
            filter: ['2'],
            label: '免报标志',
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
      this.collapseList.elfList = [
        [
          {
            type: 'input',
            name: 'mccBussNum',
            value: '',
            label: '授信协议编号',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.noSpecialCaracters,
                trigger: 'blur',
              },
              { max: 45, message: '最多45位', trigger: 'blur' },
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
          {
            type: 'input',
            name: 'deptCode',
            value:
              this.$store.getters.arrListFormItem.deptCode || 10000000000000,
            label: '所属机构',
            span: 12,
            hide: true,
          },
        ],
      ];
      this.collapseList.elgList = [
        [
          {
            type: 'input',
            name: 'initCredName',
            value: '',
            label: '初始债券人姓名',
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
            type: 'input',
            name: 'initCredOrgNum',
            value: '',
            label: '初始债权人机构代码',
            span: 12,
            rule: [
              { validator: this.validator.noSpecialCaracters, trigger: 'blur' },
              { validator: this.validator.initCredOrgNmSize, trigger: 'blur' },
              { validator: this.validator.isCCode, trigger: 'blur' },
            ],
          },
          {
            type: 'select',
            name: 'origDbtCate',
            value: '',
            param: 'E_OrigDbtCate',
            label: '原债务种类',
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
            name: 'initRpySts',
            value: '',
            param: 'E_InitRpySts',
            label: '债权转移时的还款状态',
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
