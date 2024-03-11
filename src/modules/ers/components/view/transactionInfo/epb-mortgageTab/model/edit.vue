<template>
  <div>
    <v-collapse ref="collapse"
                @eventChange="eventChange"
                :collapseList="collapseList"></v-collapse>
    <epd-edit v-if="epdEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="epdEdit"></epd-edit>
    <epd-detail v-if="epdDetail"
                :paramEdit="paramDetail"
                ref="epdDetail"
                :vis.sync="epdDetail"></epd-detail>
    <epe-edit v-if="epeEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="epeEdit"></epe-edit>
    <epe-detail v-if="epeDetail"
                :paramEdit="paramDetail"
                ref="epeDetail"
                :vis.sync="epeDetail"></epe-detail>
    <epf-edit v-if="epfEdit"
              :paramEdit="paramEdit"
              ref="child"
              :vis.sync="epfEdit"></epf-edit>
    <epf-detail v-if="epfDetail"
                :paramEdit="paramDetail"
                ref="epfDetail"
                :vis.sync="epfDetail"></epf-detail>
  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
// import Bus from '@/common/script/bus';
import epdEdit from './epd/edit';
import epdDetail from './epd/detail';
import epeEdit from './epe/edit';
import epeDetail from './epe/detail';
import epfEdit from './epf/edit';
import epfDetail from './epf/detail';
export default {
  name: 'child',
  components: {
    vCollapse,
    epdEdit,
    epdDetail,
    epeEdit,
    epeDetail,
    epfEdit,
    epfDetail,
  },
  data() {
    let _this = this;
    return {
      epdEdit: false,
      epdDetail: false,
      epeEdit: false,
      epeDetail: false,
      epfEdit: false,
      epfDetail: false,
      paramEdit: {},
      paramDetail: {},
      validatorBussNum: {}, // 业务号重复校验对象
      isShow: false, // 字段表单是否显示隐藏
      collapseList: {
        activeNames: ['epb'], // 默认显示那个折叠栏 没有默认显示全部。
        param: {
          routerReturn: '/epb/mortgageTab', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        //   detailDataFun 编辑自定义事件 first 获取第一个form存储到vuex中一般只需在第一个form中添加  submitCustom 自定义提交事件  where表格请求参数  search 表单提交参数
        item: [
          {
            name: 'epb',
            title: '基础段',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.epb.getValUrl, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
            submitFun: false,
            create: this.$urlList.epb.create,
            update: this.$urlList.epb.update,
            submitCustom: this.submitCustom,
            detailDataFun: this.epbDataFun,
            first: true,
          },
          {
            name: 'epd',
            title: '其他债务人信息段',
            showField: 'table',
            bind: 'epdTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'epe',
            title: '抵押物信息段',
            showField: 'table',
            bind: 'epeTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
          {
            name: 'epf',
            title: '质物信息段',
            showField: 'table',
            bind: 'epfTable',
            disabled: true,
            where: { search_EQ_bussNum: 'bussNum' },
          },
        ],
        epdTable: {
          // height:'default', //表格自适应高度
          bussName: 'epd',
          editTitle: '其他债务人信息段',
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:epd:create'],
            edit: ['crse:business:epd:update'],
            del: ['crse:business:epd:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'guarName',
              title: '其他债务人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetail,
              },
            },
            {
              field: 'guarCertType',
              title: '其他债务人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'infOldType',
                changeName: 'guarCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'guarCertNum',
              title: '其他债务人身份标识号码',
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
        epeTable: {
          bussName: 'epe',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          editTitle: '抵押物信息段',
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:epe:create'],
            edit: ['crse:business:epe:update'],
            del: ['crse:business:epe:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'pleDgorName',
              title: '抵押人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailepe,
              },
            },
            {
              field: 'pleorCertType',
              title: '抵押人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'pleDgorType',
                changeName: 'pleorCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'pleorCertNum',
              title: '抵押人身份标识号码',
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
        epfTable: {
          bussName: 'epf',
          // height:'default', //表格自适应高度
          where: { search_EQ_bussNum: this.$route.query.bussNum },
          editTitle: '质物信息段',
          self: _this,
          showButton: true,
          btn: {
            add: ['crse:business:epf:create'],
            edit: ['crse:business:epf:update'],
            del: ['crse:business:epf:delete'],
          },
          tableHeader: [
            {
              // 详情demo
              field: 'pawnName',
              title: '出质人名称',
              width: 120,
              oper: {
                name: 'link',
                clickFun: this.showdetailepf,
              },
            },
            {
              field: 'pawnCertType',
              title: '出质人身份标识类型',
              width: 120,
              oper: {
                name: 'function',
                followName: 'ippc',
                changeName: 'pawnCertType',
                dicUrl: this.$urlList.common.dic,
                type: 'E_InfoIDType', // 获取个人企业所有证件类型的字典
              },
            },
            {
              field: 'pawnCertNum',
              title: '出质人身份标识号码',
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
    contrastDate(rule, value, callback) {
      let idEfctDate = new Date(
        this.$refs.collapse.$refs.arrList[0].formItem.ccvalDate
      ).getTime();
      let bussDate = new Date(
        this.$refs.collapse.$refs.arrList[0].formItem.ccexpDate
      ).getTime();
      if (idEfctDate && bussDate) {
        if (idEfctDate <= bussDate) {
          callback();
        } else {
          callback(new Error('生效日期应不晚于到期日期'));
        }
      }
    },
    epbDataFun() {
      let _this = this;
      let arr = [];
      _this.collapseList.item.forEach((item, i) => {
        if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.guarType == '1'
        ) {
          if (item.name == 'epf') {
            item.hidden = true;
            // _this.collapseList.item.splice(i, 1);
          }
        } else if (
          _this.$store.getters.arrListFormItem &&
          _this.$store.getters.arrListFormItem.guarType == '2'
        ) {
          if (item.name == 'epe') {
            item.hidden = true;
            // _this.collapseList.item.splice(i, 1);
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
            formData.formItem.infOldType = 2;
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
          for (let k in _this.collapseList.item[i].search) {
            param[_this.collapseList.item[i].search[k]] =
              _this.$store.getters.arrListFormItem[
                _this.collapseList.item[i].search[k]
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
                      guarType: {
                        disabled: true,
                      },
                    });
                    this.$refs.collapse.$refs.arrList[0].noresetItem.push(
                      'bussNum'
                    );
                    this.$refs.collapse.$refs.arrList[0].noresetItem.push(
                      'guarType'
                    );
                    this.$nextTick(() => {
                      this.collapseList.item.forEach((item) => {
                        if (item.showField == 'table') {
                          for (var k in item.where) {
                            let val = item.where[k];
                            this.collapseList[item.bind].where[k] =
                              _this.$store.getters.arrListFormItem[val];
                          }
                        }
                        item.disabled = false;
                      });
                      this.epbDataFun();
                    });
                  }

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
    showdetail(selectRow) {
      this.epdDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '其他债务人信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailepe(selectRow) {
      this.epeDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '抵押物信息段',
        id: selectRow.id,
        url: null,
      };
    },
    showdetailepf(selectRow) {
      this.epfDetail = true;
      this.paramDetail = {
        title: '',
        dialogTitle: '质物信息段',
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
          url: this.$urlList.epb.ajaxIsOnly,
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
            label: '抵(质)押合同编号',
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
            name: 'guarType',
            value: '',
            param: 'E_GuarType',
            label: '合同类型',
            eventChange: true,
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
        ],
        [
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
        ],
        [
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
            type: 'select',
            name: 'ccStatus',
            value: '',
            param: 'E_CcStatus',
            label: '抵(质)押合同状态',
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
            name: 'ccAmt',
            value: '',
            label: '担保金额',
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
              {
                required: true,
                validator: this.validator.minZero,
                trigger: 'blur',
              },
            ],
          },
          {
            type: 'select',
            name: 'cy',
            value: '',
            param: 'E_Cy',
            label: '币种',
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
        [
          {
            type: 'date',
            name: 'ccvalDate',
            value: '',
            label: '抵(质)押合同生效日期',
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
              { required: true, validator: this.contrastDate, trigger: 'blur' },
            ],
          },
          {
            type: 'date',
            name: 'ccexpDate',
            value: '',
            label: '抵(质)押合同到期日期',
            span: 12,
            rule: [
              {
                required: true,
                validator: this.validator.empty,
                trigger: 'blur',
              },
              { required: true, validator: this.contrastDate, trigger: 'blur' },
            ],
          },
        ],
        [
          {
            type: 'select',
            name: 'maxGuar',
            value: '',
            param: 'E_MaxGuar',
            label: '最高额担保标志',
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
  mounted() {},
};
</script>
<style>
</style>
