<template>
  <div class="userDetail">
    <el-card>
      <div slot="header"
           class="clearfix">
        <i :style="{lineHeight:'25px'}"
           class="icon DHCiconfont DHC-yonghu"></i>
        <span :style="{lineHeight:'25px'}">{{userName}}</span>
        <el-button class="back_btn"
                   style="float: right"
                   size="mini"
                   @click="()=>{$store.commit('SET_OPERATSTATE',''),$router.push({path: '/homePage'})}">
          <i class="DHCiconfont">&#xe72c;</i>返回
        </el-button>
        <el-divider></el-divider>
      </div>
      <v-form v-bind:arrList="arrList"
              labelWidth="100px"
              :findById="findById"
              :gutter="120"></v-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'userDetails',
  data() {
    return {
      arrList: [],
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.user.findById, // 接口
        param: { params: { id: this.$route.query.id } }, // 参数
      },
      title: '用户信息-详情',
      userName: localStorage.getItem('ms_username'),
    };
  },
  methods: {
    init() {
      this.arrList = [
        [
          {
            type: 'input',
            name: 'userId',
            value: '',
            label: '用户名',
            span: 6,
            header: '基本信息',
            disabled: true,
          },
          {
            type: 'input',
            name: 'userName',
            value: '',
            label: '用户姓名',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'idCard',
            value: '',
            label: '身份证号码',
            span: 6,
            disabled: true,
          },
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgtree,
            treetitle: '机构树',
            defaultProps: {
              children: 'childOrg',
              label: function (a) {
                return a.params.resourceName;
              },
            },
            name: 'orgCode',
            value: '',
            label: '所属机构',
            span: 6,
            disabled: true,
          },
        ],
        [
          {
            type: 'select',
            name: 'deptName',
            value: '',
            customOption: {},
            label: '所属部门',
            span: 6,
            disabled: true,
          },
          {
            type: 'select',
            name: 'userType',
            value: '',
            param: 'T_YHGL_0003',
            label: '操作类型',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'mobile',
            value: '',
            label: '手机号码',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'telephone',
            value: '',
            label: '其他联系方式',
            span: 6,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'email',
            value: '',
            label: 'E-mail',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'address',
            value: '',
            label: '通讯地址',
            span: 18,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'remark',
            value: '',
            label: '备注',
            span: 24,
            disabled: true,
          },
        ],
      ];
    },
    async checkMobile() {
      let systemId = sessionStorage.getItem('systemId');
      let response = await this.http.apiGet(this.$urlList.common.getDeptName, {
        params: {
          systemId: systemId,
        },
      });
      this.common.Control(this.arrList, {
        deptName: {
          customOption: response.data,
        },
      });
    },
  },
  created() {
    this.init();
    this.checkMobile();
  },
};
</script>
<style scoped lang="less">
@top: 10px;

.margin-top {
  margin-top: @top;
}

.DHC-yonghu {
  font-size: 25px;
  float: left;
}

.userIcon {
  float: left;
}

.userfontSize {
  line-height: 1.8;
}

.inactive {
  margin-top: @top;
  background-color: #f5f7fa;
}
.detail .el-scrollbar__wrap {
  overflow-y: hidden;
}

.active {
  margin-top: @top;
}
</style>
