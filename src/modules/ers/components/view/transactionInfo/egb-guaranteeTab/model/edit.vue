<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>
    <egc-edit v-if="egcEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="egcEdit"></egc-edit>
    <egc-detail v-if="egcDetail"
                :paramEdit="paramDetail"
                ref="egcDetail"
                :vis.sync="egcDetail"></egc-detail>
    <egd-edit v-if="egdEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="egdEdit"></egd-edit>
    <egd-detail v-if="egdDetail"
                :paramEdit="paramDetail"
                ref="egdDetail"
                :vis.sync="egdDetail"></egd-detail>
    <ege-edit v-if="egeEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="egeEdit"></ege-edit>
    <ege-detail v-if="egeDetail"
                :paramEdit="paramDetail"
                ref="egeDetail"
                :vis.sync="egeDetail"></ege-detail>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
import egcEdit from './egc/edit';
import egcDetail from './egc/detail';
import egdEdit from './egd/edit';
import egdDetail from './egd/detail';
import egeEdit from './ege/edit';
import egeDetail from './ege/detail';
import Bus from '@/common/script/bus';
export default {
  name: 'child',
  components: {
    vCollapse,
    egcEdit,
    egcDetail,
    egdEdit,
    egdDetail,
    egeEdit,
    egeDetail,
  },
  data() {
    let _this = this;
    return {
      egcEdit: false,
      egcDetail: false,
      egdEdit: false,
      egdDetail: false,
      egeEdit: false,
      egeDetail: false,
      paramEdit: {},
      paramDetail: {},
      validatorBussNum: {}, // 业务号重复校验对象
      isShow: false, // 字段表单是否显示隐藏
      collapseList: {
        activeNames: ['egb'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/egb/guaranteeTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'egb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.egb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.egb.create,
            update: this.$urlList.egb.update,
            callback: true,
            first: true,
          },
          {
            name: 'egc',
            title: '基本信息段',
            showField: 'table',
            bind: 'egcTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'ege',
            title: '相关还款责任人段',
            showField: 'table',
            bind: 'egeTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'egd',
            title: '在保责任信息段',
            showField: 'table',
            bind: 'egdTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'egg',
            title: '授信额度信息段',
            showField: 'form',
            bind: 'eggList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.egg.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            create: this.$urlList.egg.create,
            update: this.$urlList.egg.update,
            disabled: true,
            submitFun: false,
            callback: true,
            search: { bussNum: 'bussNum', deptCode: 'deptCode' },
          },
        ],
        egcTable: {
          // height:'default', //表格自适应高度
          bussName: 'egc',
          editTitle: '基本信息段',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:egc:create'],
            edit: ['crse:business:egc:update'],
            del: ['crse:business:egc:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'busiLines',
              title: '担保业务种类',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_BusiLines_EG',
                clickFun: this.showdetail,
              },
            },
            {
              field: 'guarAmt',
              title: '担保金额',
              width: 120,
            },
            {
              field: 'openDate',
              title: '开户日期',
              width: 120,
            },
            {
              field: 'dueDate',
              title: '到期日期',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
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
        egdTable: {
          bussName: 'egd',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          editTitle: '在保责任信息段',
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:egd:create'],
            edit: ['crse:business:egd:update'],
            del: ['crse:business:egd:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'acctStatus',
              title: '账户状态',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_AcctStatus_EG',
                clickFun: this.showdetailegd,
              },
            },
            {
              field: 'rptDateCode',
              title: '报送时点',
              width: 120,
              oper: {
                name: 'dic',
                type: 'E_RptDateCode_EG',
              },
            },
            {
              field: 'loanAmt',
              title: '在保余额',
              width: 120,
            },
            {
              field: 'repayPrd',
              title: '余额变化日期',
              width: 120,
            },
            {
              field: 'bussDate',
              title: '业务发生日期',
              width: 120,
            },
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
        egeTable: {
          bussName: 'ege',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          editTitle: '相关还款责任人段',
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:ege:create'],
            edit: ['crse:business:ege:update'],
            del: ['crse:business:ege:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'infoIdType',
              title: '身份类别',
              width: 120,
              oper: {
                name: 'linkDic',
                type: 'E_InfoIDType',
                clickFun: this.showdetailege,
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
                followName: 'infoIdType',
                changeName: 'arlpCertType',
                // dicFun:this.dicFunc,  // 指令里自定义方法
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典 url : idDicUrl,type : ""
              },
            },
            {
              field: 'arlpCertNum',
              title: '责任人身份标识号码',
              width: 120,
            },
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
    dicFunc(el, val, format) {
      const systemId = sessionStorage.getItem('systemId');
      const param = format.type + val[format.followName];
      if (
        typeof format.dicUrl != 'undefined' &&
        !sessionStorage.getItem(systemId + '_' + param)
      ) {
        this.http
          .apiGet(format.dicUrl, { params: { type: param } })
          .then((res) => {
            sessionStorage[systemId + '_' + param] = JSON.stringify(res);
            el.innerText = JSON.parse(
              sessionStorage[
                systemId + '_' + format.type + val[format.followName]
              ]
            )[val[format.changeName]];
          });
      } else {
        el.innerText = JSON.parse(
          sessionStorage[systemId + '_' + format.type + val[format.followName]]
        )[val[format.changeName]];
      }
    },
    showdetail(selectRow) {
      this.egcDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '基本信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailegd(selectRow) {
      this.egdDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '在保责任信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailege(selectRow) {
      this.egeDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '相关还款责任人段',
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
          url: this.$urlList.egb.ajaxIsOnly,
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
              { validator: this.validator.noSpecialCaracters, trigger: 'blur' },
              this.validatorBussNum,
              { max: 45, message: '最多45位', trigger: 'blur' },
            ],
          },
          {
            type: 'select',
            name: 'acctType',
            value: '',
            param: 'E_AcctType_EG',
            label: '账户类型',
            hide: this.isShow,
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
            name: 'entName',
            value: '',
            label: '债务人名称',
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
            label: '债务人身份标识类型',
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
            label: '债务人身份标识号码',
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
      // 授信额度信息段
      this.collapseList.eggList = [
        [
          {
            type: 'input',
            name: 'ctrcNum',
            value: '',
            param: '',
            label: '授信协议编号',
            span: 12,
            rule: [
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
    },
  },
  created() {
    Bus.$on('successCallback', (obj) => {
      if (obj) {
        this.common.Control(this.collapseList.arrList, {
          bussNum: {
            rule: [
              { validator: this.validator.empty, trigger: 'blur' },
              { max: 64, message: '最多64位', trigger: 'blur' },
              { validator: this.noSpecialCaracters, trigger: 'blur' },
            ],
            disabled: true,
          },
        });
        this.$refs.collapse.$refs.arrList[0].noresetItem.push('bussNum');
      }
    });
    this.init();
  },
};
</script>
<style>
</style>
