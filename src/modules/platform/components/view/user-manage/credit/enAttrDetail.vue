<template>
  <el-form ref="formItem"
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
        <el-form-item label="是否允许打印">
          <el-select disabled
                     v-model="formItem.printPermit"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="打印次数">
          <el-input v-model="formItem.printAmount"
                    disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="是否允许保存信用报告">
          <el-select disabled
                     v-model="formItem.savePermit"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="关联企业页面征信用户"
                      prop="creditUser">
          <el-select disabled
                     v-model="formItem.creditUser"
                     clearable
                     placeholder="请选择">
            <el-option v-for="(item,index) in creditUser"
                       :key="index"
                       :label="item"
                       :value="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="关联接口征信用户">
          <el-select disabled
                     v-model="formItem.interfaceCreditUser"
                     clearable
                     placeholder="请选择">
            <el-option v-for="(item,index) in interfaceCreditUser"
                       :key="index"
                       :label="item"
                       :value="index"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="白名单">
          <el-select disabled
                     v-model="formItem.whiteList"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  name: 'enAttrDetail',
  components: {},
  data() {
    return {
      creditUser: {},
      interfaceCreditUser: {},
      formItem: {
        userName: '',
        printPermit: '',
        printAmount: '',
        savePermit: '',
        seniorCreditUser: '',
        whiteList: '',
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
  },
  computed: {
    userName() {
      return this.formItem.userName || this.$route.query.id;
    },
  },
  methods: {
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
      this.http.apiGet(this.$urlList.enccUser.getCreditUser, paramCcId).then((res) => {
        if (res.code == '00000001') return;
        const creditUser = res.creditUser || {};
        const val = this.formItem.creditUser;
        this.$set(creditUser, this.formItem.creditUser, creditUser[val] || '[upCreditUser]');
        this.creditUser = creditUser;
      });
      this.http.apiGet(this.$urlList.enccUser.getCreditUser, paramCreditUser).then((res) => {
        if (res.code == '00000001') return;
        const interfaceCreditUser = res.creditUser || {};
        const val = this.formItem.interfaceCreditUser;
        this.$set(interfaceCreditUser, this.formItem.interfaceCreditUser, interfaceCreditUser[val] || '[upCreditUser]');
        this.interfaceCreditUser = interfaceCreditUser;
      });
    },
  },
  mounted() {
    this.getccIdList();
  },
  created() {},

  //  mixins: [http]
};
</script>
<style>
.desc4 .el-form-item__label {
  width: 120px !important;
}
.desc4 .el-form-item__content {
  margin-left: 120px !important;
}
/* .el-dialog__body{
    padding: 0px;
}
.treecard{
    height: '700px';
} */
</style>
