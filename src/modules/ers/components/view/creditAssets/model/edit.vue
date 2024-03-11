<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>

    <!-- 基本信息段 -->
    <!-- <erk-edit v-if="erkEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="erkEdit"></erk-edit>
    <erk-detail v-if="erkDetail"
                ref="erkDetails"
                :paramDetail="paramDetail"
                :vis.sync="erkDetail"></erk-detail> -->
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
// import MinXin from "@/common/script/mixin";
import Bus from '@/common/script/bus';
// import erkDetail from './erk/detail';

// import erkEdit from './erk/edit';

export default {
  name: 'child',
  //   mixins: [MinXin],
  components: {
    vCollapse,
    // erkDetail,
    // erkEdit,
  },
  data() {
    let _this = this;
    return {
      // erkEdit: false,
      // erkDetail: false,
      //   arrList:[],
      //   url:'',
      deptCodeVal: '',
      validatorBussNum: {}, // 业务号重复校验对象
      isShow: false, // 字段表单是否显示隐藏
      isDisabled: false, // 字段是否可编辑
      // detailUrl: {
      //   // url: this.$urlList.eli.getValUrl,
      //   delUrl: this.$urlList.erk.delUrl,
      //   paramDataId: 'id', // 字段名
      //   id: 'id', // 获取表格数据的字段名
      //   resId: '', // 获取的id
      // },
      // 弹框相关
      paramDetail: {},
      paramEdit: {},
      visible: false,
      collapseList: {
        activeNames: ['erj'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/erj-rateTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        //   detailDataFun 编辑自定义事件 first 获取第一个form存储到vuex中一般只需在第一个form中添加  submitCustom 自定义提交事件  where表格请求参数  search 表单提交参数
        item: [
          {
            name: 'erj',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erj.getValUrl, // 接口
              param: this.$route.query, // 参数
              //   },url:"",disabled:false,submitFun:false,create:this.$urlList.erj.create,update:this.$urlList.erj.update,callback:true,first:true},
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.erj.create,
            update: this.$urlList.erj.update,
            submitCustom: this.submitCustom,
            detailDataFun: this.erjDataFun,
            first: true,
          },
          {
            name: 'erk',
            title: '基本信息段',
            showField: 'form',
            bind: 'erkList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.erk.getValUrl, // 接口
              param: this.$route.query, // 参数
              //   },url:"",disabled:false,submitFun:false,create:this.$urlList.erj.create,update:this.$urlList.erj.update,callback:true,first:true},
            },
            url: '',
            disabled: true,
            submitFun: false,
            create: this.$urlList.erk.create,
            update: this.$urlList.erk.update,
            submitFun: false,
            callback: true,
            search: {
              bussNum: 'bussNum',
              deptCode: 'deptCode',
              dueNum: 'dueNum',
              conNum: 'conNum',
            },
            defaultShow: true,
          },
        ],
        // erkTable: {
        //   // height:'default', //表格自适应高度
        //   bussName: 'erk',
        //   where: { search_EQ_bussNum: this.$route.query.bussNum },
        //   showButton: true,
        //   btn: {
        //     add: '',
        //     edit: '',
        //     del: '',
        //   },
        //   self: _this,
        //   editTitle: '基本信息段',
        //   tableHeader: [
        //     {
        //       // 详情demo
        //       field: 'dueNum',
        //       title: '借据号',
        //       width: 120,
        //       oper: {
        //         // name: 'linkDic',
        //         // type: 'E_BusiLines_EL',
        //         name: 'link',
        //         clickFun: this.showdetailerk,
        //       },
        //     },
        //     {
        //       field: 'conNum',
        //       title: '贷款合同编号',
        //       width: 120,
        //     },
        //     {
        //       field: 'busiDtlLines',
        //       title: '贷款业务种类细分',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'BusiDtlLines',
        //       },
        //     },
        //     {
        //       field: 'loanAmt',
        //       title: '贷款本金',
        //       width: 120,
        //     },
        //     {
        //       field: 'bussDate',
        //       title: '业务发生日期',
        //       width: 120,
        //     },
        //     // {
        //     //   field: 'deptCode',
        //     //   title: '所属机构',
        //     //   width: 120,
        //     //   oper: {
        //     //     name: 'dic',
        //     //     type: 'deptCode'
        //     //   }
        //     // },
        //     {
        //       field: 'dataState',
        //       title: '数据状态',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'DATA_STATE',
        //       },
        //     },
        //     {
        //       field: 'reportState',
        //       title: '报送状态',
        //       width: 120,
        //       oper: {
        //         name: 'dic',
        //         type: 'REPORT_STATE',
        //       },
        //     },
        //   ],
        // },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    checkOpenDateAndDueDate(rule, value, callback) {
      let latRpyDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.latRpyDate
      ).getTime();
      let dueDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.dueDate
      ).getTime();
      if (latRpyDate && dueDate) {
        if (latRpyDate <= dueDate) {
          callback();
        } else {
          callback(new Error('最近一次还款日期应不晚于贷款到期日'));
        }
      } else {
        callback();
      }
    },
    checkOpenDateAndBussDate(rule, value, callback) {
      let openDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.openDate
      ).getTime();
      let bussDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.bussDate
      ).getTime();
      let latRpyDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.latRpyDate
      ).getTime();
      let dueDate = new Date(
        this.$refs.collapse.$refs.erkList[0].formItem.dueDate
      ).getTime();
      if (openDate && bussDate && latRpyDate && dueDate) {
        if (
          openDate <= bussDate &&
          openDate <= latRpyDate &&
          openDate <= dueDate
        ) {
          callback();
        } else {
          callback(
            new Error('贷款发放日应不晚于同一条记录中的所有其他业务日期')
          );
        }
      } else {
        callback();
      }
    },
    erjDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        _this.collapseList.item[i].defaultShow = false;
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'C1'
        ) {
          if (item.name == 'erj') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D1'
        ) {
          if (item.name == 'erj') {
            // 隐藏掉某一折叠面板
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'D2'
        ) {
          if (item.name == 'erj') {
            item.hidden = true;
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.acctType == 'R1'
        ) {
          // 当账户类型为R1时，基本信息段表格的 字段 为 信用额度
          if (item.name == 'erj') {
            _this.collapseList.elcTable.tableHeader[1].field = 'acctCredLine';
            _this.collapseList.elcTable.tableHeader[1].title = '信用额度';
          }
          if (item.name == 'erj') {
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
                    this.erjDataFun();
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
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('idType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (obj.e == 10) {
          _this.common.Control(_this.collapseList.arrList, {
            idNum: {
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
            idNum: {
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
            idNum: {
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
        this.isDisabled = false; // 字段可编辑
        this.validatorBussNum = {
          url: this.$urlList.erj.ajaxIsOnly,
          required: true,
          validator: this.validator.validatorBussNum,
          trigger: 'blur',
        }; // 添加重复校验
      } else if (this.$store.getters.operatState == 'edit') {
        // 修改页---业务号、账户类型 两个字段隐藏，业务号去掉重复校验
        // this.isShow = true; // 字段隐藏
        this.isDisabled = true; // 字段不可编辑
        this.validatorBussNum = {}; // 去掉重复校验
      }

      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'bussNum',
            value: '',
            label: '业务号',
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
              { max: 64, message: '最多64位', trigger: 'blur' },
            ],
            noReset: this.isDisabled,
            disabled: this.isDisabled,
          },
          {
            type: 'input',
            name: 'dueNum',
            value: '',
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
            type: 'input',
            name: 'conNum',
            value: '',
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
          {
            type: 'input',
            name: 'name',
            value: '',
            label: '借款企业名称',
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
            name: 'idType',
            value: '',
            param: 'InfoIDType2',
            label: '借款企业身份标识类型',
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
            name: 'idNum',
            value: '',
            label: '借款企业身份标识号码',
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
        ],
      ];
      this.collapseList.erkList = [
        [
          // {
          //   type: 'hidden',
          //   name: 'bussNum',
          //   value: '',
          //   label: '业务号',
          //   span: 12,
          //   rule: [
          //     { validator: this.validator.empty, trigger: 'blur' },
          //     this.validatorBussNum,
          //     { max: 64, message: '最多64位', trigger: 'blur' },
          //     { validator: this.noSpecialCaracters, trigger: 'blur' },
          //   ],
          //   noReset: this.isDisabled,
          //   disabled: this.isDisabled,
          // },
          {
            type: 'select',
            name: 'busiDtlLines',
            value: '',
            param: 'BusiDtlLines',
            label: '借贷业务种类细分',
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
            name: 'latRpyDate',
            value: '',
            label: '最近一次还款日期',
            span: 12,
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              },
            },
            rule: [
              {
                // required: true,
                validator: this.checkOpenDateAndDueDate,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'input',
            name: 'loanAmt',
            value: '',
            label: '贷款本金',
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
          {
            type: 'date',
            name: 'dueDate',
            value: '',
            label: '贷款到期日',
            span: 12,
            // pickerOptions: {
            //   disabledDate(time) {
            //     return time.getTime() > Date.now();
            //   },
            // },
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
            name: 'acctBal',
            value: '',
            label: '贷款剩余本金',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.money,
                trigger: 'blur',
              },
              { max: 15, message: '最多15位', trigger: 'blur' },
              { validator: this.validator.minZero, trigger: 'blur' },
            ],
          },
          {
            type: 'select',
            name: 'acctStatus',
            value: '',
            param: 'LoanStatusCode',
            label: '贷款状态',
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
            name: 'gnCredit',
            value: '',
            param: 'GreenCreditCode',
            label: '是否符合绿色信贷',
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
            name: 'fiveCate',
            value: '',
            param: 'FiveCate',
            label: '五级分类',
            span: 12,
            eventChange: true,
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
            name: 'guarMode',
            value: '',
            param: 'GuarMode',
            label: '担保方式',
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
            name: 'annIntRate',
            value: '',
            label: '年利率',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              {
                required: true,
                validator: this.validator.aPR,
                trigger: 'blur',
              },
              { max: 5, message: '最多5位', trigger: 'blur' },
              { validator: this.validator.minZero, trigger: 'blur' },
            ],
          },
          {
            type: 'date',
            name: 'openDate',
            value: '',
            label: '贷款发放日',
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
              {
                required: true,
                validator: this.checkOpenDateAndBussDate,
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
