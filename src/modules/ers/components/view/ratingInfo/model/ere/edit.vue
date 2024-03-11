<template>
  <div>
    <el-dialog :title="paramEdit.title"
               :visible.sync="centerDialogVisible"
               :modal="true"
               :modal-append-to-body="false"
               :close-on-click-modal="false"
               @close="closeDialog"
               custom-class="model-dialog el-dialog-s">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">{{ paramEdit.dialogTitle + paramEdit.title }}</span>
        <span class="dialog-title-bg"></span>
      </span>
      <v-form ref="formItem"
              v-bind:arrList="arrList"
              :buttonGroup="buttonGroup"
              :url="url"
              :findById="findById"
              labelWidth="110px"
              @eventChange="eventChange">
        <el-button slot="slotBtn"
                   class="submit_btn"
                   @click="callbackFun('formItem')"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
      </v-form>
    </el-dialog>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import Bus from '@/common/script/bus.js';
export default {
  name: 'child',
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
      buttonGroup: ['cancle', 'close'],
      // 表单赋值接口（编辑，详情用的较多）
      findById: {
        url: this.$urlList.ere.getValUrl, // 接口
        param: { id: this.paramEdit.id }, // 参数
      },
    };
  },
  props: ['paramEdit'],
  computed: {},
  watch: {},
  methods: {
    eventChange(obj) {
      let _this = this; // 绑定指向
      _this.common.onselect('actuCotrlIdType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        let param = { params: { type: 'InfoIDType' + obj.e } };
        _this.ipType = obj.e;
        let actuCotrlIdType = _this.$refs.formItem.formItem.actuCotrlIdType;
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        _this.getSystemId(param, actuCotrlIdType);
      });
      _this.common.onselect('actuCotrlCertIdType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        // 身份类型
        if (_this.ipType == 1) {
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                  {
                    required: true,
                    validator: _this.validator.checkIdcard,
                    trigger: 'blur',
                  },
                ],
              },
            });
          } else if (obj.e == 2) {
            // 护照
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                  {
                    required: true,
                    validator: _this.validator.checkPassport,
                    trigger: 'blur',
                  },
                ],
              },
            });
          } else if (obj.e == 5) {
            // 港澳居民往来大陆通行证
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                  {
                    required: true,
                    validator: _this.validator.checkHkmacidpassValidator,
                    trigger: 'blur',
                  },
                ],
              },
            });
          } else if (obj.e == 6) {
            // 台湾通行证
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                  {
                    required: true,
                    validator: _this.validator.checkRocValidator,
                    trigger: 'blur',
                  },
                ],
              },
            });
          } else {
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
                rule: [
                  {
                    required: true,
                    validator: _this.validator.empty,
                    trigger: 'blur',
                  },
                  { max: 20, message: '最多20位', trigger: 'blur' },
                ],
              },
            });
          }
        } else if (_this.ipType == 2) {
          // 组织机构
          if (obj.e == 10) {
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
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
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
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
            _this.common.Control(_this.arrList, {
              actuCotrlIdNum: {
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
        }
      });
    },
    async getSystemId(param, actuCotrlIdType) {
      let response = await this.http.apiGet(this.$urlList.common.dic, param);
      // 判断是初始化渲染还是选中之后重新渲染
      if (actuCotrlIdType) {
        this.common.Control(this.arrList, {
          actuCotrlCertIdType: {
            customOption: response,
            value: '',
          },
        });
      } else {
        this.common.Control(this.arrList, {
          actuCotrlCertIdType: {
            customOption: response,
          },
        });
      }
    },
    callbackFun(formItem) {
      let param = Object.assign(this.$refs[formItem].formItem, {
        custId: this.$store.getters.arrListFormItem.custId,
        deptCode: this.$store.getters.arrListFormItem.deptCode,
      });
      this.callback(formItem, 'ere', param);
    },
    init() {
      this.url = this.paramEdit.url;
      if (this.$store.getters.modelState == 'add') {
        this.arrList = [
          [
            {
              type: 'hidden',
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
                { max: 64, message: '最多64位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'invEntName',
              value: '',
              label: '被投资企业名称',
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
              name: 'invCertType',
              value: '',
              param: 'InfoIDType2',
              label: '被投资企业身份标识类型',
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
              type: 'input',
              name: 'invCertNum',
              value: '',
              label: '被投资企业身份标识号码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 18, message: '最多18位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'invRegCap',
              value: '',
              label: '被投资企业注册资本',
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
              name: 'invEstablishDate',
              value: '',
              label: '被投资企业成立日期',
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
              name: 'invCurrency',
              value: '',
              param: 'Cy',
              label: '投资币种',
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
              type: 'input',
              name: 'invSubscribed',
              value: '',
              label: '投资认缴金额',
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
          ],
          [
            {
              type: 'input',
              name: 'invPaid',
              value: '',
              label: '投资实缴金额',
              span: 12,
              rule: [
                { max: 15, message: '最多15位', trigger: 'blur' },
                {
                  validator: this.validator.money,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'invRatio',
              value: '',
              label: '持股比例',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.invRatio1,
                  trigger: 'blur',
                },
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
              name: 'invDate',
              value: '',
              label: '投资日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [],
            },
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
      } else if (this.$store.getters.modelState == 'edit') {
        this.arrList = [
          [
            {
              type: 'hidden',
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
                { max: 64, message: '最多64位', trigger: 'blur' },
              ],
            },
            {
              type: 'input',
              name: 'invEntName',
              value: '',
              label: '被投资企业名称',
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
              name: 'invCertType',
              value: '',
              param: 'InfoIDType2',
              label: '被投资企业身份标识类型',
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
              type: 'input',
              name: 'invCertNum',
              value: '',
              label: '被投资企业身份标识号码',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.empty,
                  trigger: 'blur',
                },
                { max: 18, message: '最多18位', trigger: 'blur' },
              ],
            },
          ],
          [
            {
              type: 'input',
              name: 'invRegCap',
              value: '',
              label: '被投资企业注册资本',
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
              name: 'invEstablishDate',
              value: '',
              label: '被投资企业成立日期',
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
              name: 'invCurrency',
              value: '',
              param: 'Cy',
              label: '投资币种',
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
              type: 'input',
              name: 'invSubscribed',
              value: '',
              label: '投资认缴金额',
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
          ],
          [
            {
              type: 'input',
              name: 'invPaid',
              value: '',
              label: '投资实缴金额',
              span: 12,
              rule: [
                { max: 15, message: '最多15位', trigger: 'blur' },
                {
                  validator: this.validator.money,
                  trigger: 'blur',
                },
              ],
            },
            {
              type: 'input',
              name: 'invRatio',
              value: '',
              label: '持股比例',
              span: 12,
              rule: [
                {
                  required: true,
                  validator: this.validator.invRatio1,
                  trigger: 'blur',
                },
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
              name: 'invDate',
              value: '',
              label: '投资日期',
              span: 12,
              pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                },
              },
              rule: [],
            },
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
      }
    },
  },
  created() {
    this.init();
  },
};
</script>
<style>
/* .el-form-item__label{
        padding: 0 5px 0 0;
    } */
</style>
