<template>
  <div class="ui-user-manage-edit-credit-wrap">
    <el-form ref="formItem"
             :rules="rules"
             :model="formItem"
             label-width="170px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="userName"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否允许打印"
                        prop="printPermit">
            <el-select v-model="formItem.printPermit"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="打印次数"
                        prop="printAmount">
            <el-input v-model="formItem.printAmount"
                      :disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否允许保存信用报告"
                        prop="savePermit">
            <el-select v-model="formItem.savePermit"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关联个人页面征信用户">
            <el-select v-model="formItem.creditUser"
                       clearable
                       placeholder="请选择"
                       :popper-append-to-body="false">
              <el-option v-for="(item,index) in creditUser"
                         :disabled="item === '[upCreditUser]'"
                         v-show="!(item === '[upCreditUser]' && Object.keys(creditUser).length > 1)"
                         :key="index"
                         :label="item"
                         :value="index">
                <span v-if="item === '[upCreditUser]' && Object.keys(creditUser).length > 1"></span>
                <span v-else-if="item === '[upCreditUser]' && Object.keys(creditUser).length<=1">无数据</span>
                <span v-else>{{ item }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关联接口征信用户">
            <el-select v-model="formItem.interfaceCreditUser"
                       clearable
                       placeholder="请选择"
                       :popper-append-to-body="false">
              <el-option v-for="(item,index) in interfaceCreditUser"
                         :disabled="item === '[upCreditUser]'"
                         v-show="!(item === '[upCreditUser]' && Object.keys(interfaceCreditUser).length > 1)"
                         :key="index"
                         :label="item"
                         :value="index">
                <span v-if="item === '[upCreditUser]' && Object.keys(interfaceCreditUser).length > 1"></span>
                <span v-else-if="item === '[upCreditUser]' && Object.keys(interfaceCreditUser).length<=1">无数据</span>
                <span v-else>{{ item }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="白名单"
                        prop="whiteList">
            <el-select v-model="formItem.whiteList"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="ui-button-wrap">
      <el-button type="primary"
                 @click="saveEdit"><i class="DHCiconfont">&#xe6b3;</i>提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'child',
  components: {},
  data() {
    return {
      isAdd: null,
      creditUser: null,
      interfaceCreditUser: null,
      disabled: true,
      checkPrintingNumPer: {},
      formItem: {
        userName: '',
        printPermit: '',
        printAmount: '',
        savePermit: '',
        creditUser: '',
        whiteList: '',
        interfaceCreditUser: '',
      },
      rules: {
        printPermit: [
          {
            required: true,
            message: '请选择是否允许打印',
            trigger: 'change',
          },
        ],
        savePermit: [
          {
            required: true,
            message: '请选择是否允许保存',
            trigger: 'change',
          },
        ],
        whiteList: [
          {
            required: true,
            message: '请选择白名单',
            trigger: 'change',
          },
        ],
        printAmount: [
          {
            required: true,
            validator: this.validator.onlyGtZreo,
            trigger: 'blur',
          },
          {
            max: 10,
            message: '长度为10个字符',
            trigger: 'blur',
          },
        ],
      },
      options: [
        {
          value: '1',
          label: '否',
        },
        {
          value: '0',
          label: '是',
        },
      ],
    };
  },
  watch: {
    userName(newVal, oldVal) {
      this.formItem.userName = newVal;
    },
    formItem: {
      handler(newVal, oldVal) {
        this.formItem.printPermit = newVal.printPermit;
        this.formItem.savePermit = newVal.savePermit;
        if (newVal.printPermit == '0') {
          this.rules.printAmount.push({
            required: true,
            validator: this.validator.onlyGtZreo,
            trigger: 'blur',
          });
          this.rules.printAmount.push({
            max: 10,
            message: '长度为10个字符',
            trigger: 'blur',
          });
          this.disabled = false;
        } else {
          this.rules.printAmount = [];
          this.$refs['formItem'].clearValidate('printAmount');
          this.disabled = true;
          this.formItem.printAmount = '';
        }
      },
      deep: true,
    },
    printPermit(newVal, oldVal) {},
  },
  computed: {
    userName() {
      return this.$route.query.id;
    },
    printPermit() {
      return this.formItem.printPermit;
    },
  },
  methods: {
    reset() {
      this.formItem = {
        userName: '',
        printPermit: '',
        printAmount: '',
        savePermit: '',
        creditUser: '',
      };
    },

    // 去重
    arrayUnique(arr, name) {
      // 去重
      var hash = {};
      return arr.reduce(function (item, next) {
        hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
        return item;
      }, []);
    },
    getccIdList() {
      let paramCcId = {
        params: {
          creditUserClass: '3',
          creditUserType: '2',
        },
      };
      let paramCreditUser = {
        params: {
          creditUserClass: '1',
          creditUserType: '1',
        },
      };
      this.http.apiGet(this.$urlList.perccUser.getCreditUser, paramCcId).then((res) => {
        if (res.code == '00000001') return;
        const creditUser = res.creditUser || {};
        const val = this.formItem.creditUser;
        this.$set(creditUser, this.formItem.creditUser, creditUser[val] || '[upCreditUser]');
        this.creditUser = creditUser;
      });
      this.http.apiGet(this.$urlList.perccUser.getCreditUser, paramCreditUser).then((res) => {
        if (res.code == '00000001') return;
        const interfaceCreditUser = res.creditUser || {};
        const val = this.formItem.interfaceCreditUser;
        this.$set(interfaceCreditUser, this.formItem.interfaceCreditUser, interfaceCreditUser[val] || '[upCreditUser]');
        this.interfaceCreditUser = interfaceCreditUser;
      });
    },
    saveEdit() {
      this.$emit('update:loadingmsg', true);
      if (this.isAdd) {
        this.submitedit('formItem');
      } else {
        this.submitAdd('formItem');
      }
    },
    submitAdd(formItem) {
      this.formItem.userName = this.userName;
      let paramData = this.formItem;
      let that = this;
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          this.http.apiPost(this.$urlList.peruserattr.create, paramData).then((res) => {
            if (res.code == '00000001') {
              this.$message.error(res.msg);
              this.$emit('update:loadingmsg', false);
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: '800',
                onClose: function () {
                  that.$emit('update:loadingmsg', false);
                },
              });

              this.$emit('perOrEnChild', 'CPQ');
              this.$emit('findByUserName');
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '验证不通过，提交失败',
            type: 'warning',
            duration: '800',
            onClose: function () {
              that.$emit('update:loadingmsg', false);
            },
          });
          return false;
        }
      });
    },
    submitedit(formItem) {
      this.formItem.userName = this.userName;
      let paramData = this.formItem;
      let that = this;
      this.$refs[formItem].validate((valid) => {
        if (valid) {
          this.http.apiPost(this.$urlList.peruserattr.update, paramData).then((res) => {
            if (res.code == '00000001') {
              this.$message.error(res.msg);
              this.$emit('update:loadingmsg', false);
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: '800',
                onClose: function () {
                  that.$emit('update:loadingmsg', false);
                },
              });

              this.$emit('perOrEnChild', 'CPQ');
              this.$emit('findByUserName');
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: '验证不通过，提交失败',
            type: 'warning',
            duration: '800',
            onClose: function () {
              that.$emit('update:loadingmsg', false);
            },
          });
          return false;
        }
      });
    },
  },
  mounted() {
    this.getccIdList();
  },
  created() {},
};
</script>
<style lang="less">
</style>
