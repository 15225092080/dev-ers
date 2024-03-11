<template>
  <div>
    <v-form ref="formItem"
            v-bind:arrList="arrList"
            labelWidth="110px"
            :reqFun="reqFun"
            :findById="findById"
            @eventChange="eventChange">
    </v-form>
    <p class="record">编辑记录</p>
    <v-table :param="paramTable"
             pagination></v-table>
  </div>
</template>
<script>
import { getOrgRole } from '@/modules/platform/script/user-manage/user-manage';

let orgCode;
export default {
  name: 'child',
  components: {},
  data() {
    return {
      arrList: [],
      url: '',
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.user.findById, // 接口
        param: {
          params: {
            id: this.$route.query.id,
          },
        }, // 参数
      },
      paramTable: {
        bussName: 'common',
        where: { id: this.$route.query.id, type: 'user' },
        tableHeader: [
          {
            field: 'updateUserId',
            title: '编辑用户',
            width: 120,
          },
          {
            field: 'updateOrgCode',
            title: '编辑机构',
            width: 120,
            oper: {
              name: 'dic',
              type: 'getOrgName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getOrgName,
            },
          },
          {
            field: 'updateTime',
            title: '编辑时间',
            width: 140,
          },
          {
            field: 'updateDesc',
            title: '编辑内容简述',
            tooltip: true,
            width: 140,
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    reqFun(formData) {
      formData.lockType = '0';
      if (formData.pwdLockFlag == 1) {
        formData.lockType = '1';
      } else if (formData.systemLockFlag == 1) {
        formData.lockType = '2';
      } else if (formData.businessLockFlag == 1) {
        formData.lockType = '3';
      }
    },
    async getdept(newQuestion) {
      // 二次优化
      let response = await this.http.apiGet(this.$urlList.org.getDept, { params: { orgCode: newQuestion } }); // 角色提供
      this.common.Control(this.arrList, {
        deptName: {
          customOption: Object.assign({}, response),
        },
      });
    },
    eventChange(obj) {
      let that = this; // 绑定指向
      that.common.onselect('orgCode', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        that.$refs.formItem.formItem.deptName = ''; // 下个版本封装下
        that.$refs.formItem.formItem.userType = '';
        that.getdept(obj.e);
        orgCode = obj.e;
        if (JSON.parse(that.$store.getters.getLoginStatus).legalEntityFlag == '1') {
          // 判断当前用户所属机构是否是法人机构
          //   if (obj.e !== localStorage.getItem('ms_orgCode')) {
          //     that.common.Control(that.arrList, {
          //       'userType': {
          //         filter: ['B', 'A']
          //       }
          //     });
          //   } else {
          that.common.Control(that.arrList, {
            userType: {
              filter: ['B'],
            },
          });
          //   }
        }
      });
      that.common.onselect('userType', obj, function () {
        // 监听下拉框事件 参数为绑定的下拉字段、change事件返回、回调函数
        if (orgCode) {
          getOrgRole(that, obj.e, orgCode);
        }
      });
    },
    init() {
      this.arrList = [
        [
          { type: 'input', name: 'userId', value: '', label: '用户名', span: 6, header: '基本信息', disabled: true },
          { type: 'input', name: 'userName', value: '', label: '用户姓名', span: 6, disabled: true },
          { type: 'input', name: 'idCard', value: '', label: '身份证号码', span: 12, disabled: true },
        ],
        [
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgtree,
            treetitle: '机构树',
            eventChange: true,
            defaultProps: { children: 'childOrg', label: 'orgName' },
            name: 'orgCode',
            value: '',
            label: '所属机构',
            span: 6,
            disabled: true,
          },
          { type: 'select', name: 'deptName', value: '', customOption: {}, param: 'stopFlag', label: '部门', span: 6, disabled: true },
          { type: 'select', name: 'userType', value: '', param: 'T_YHGL_0003', label: '用户类型', span: 6, disabled: true, eventChange: true },
          { type: 'input', name: 'mobile', value: '', label: '手机号码', span: 6, disabled: true },
        ],
        [
          { type: 'input', name: 'telephone', value: '', label: '其他联系方式', span: 6, disabled: true },
          { type: 'input', name: 'email', value: '', label: 'E-mail', span: 6, disabled: true },
          { type: 'input', name: 'address', value: '', label: '详细地址', span: 12, disabled: true },
        ],
        [{ type: 'textarea', name: 'remark', value: '', label: '备注', span: 24, disabled: true }],
        [
          { type: 'select', name: 'lockType', value: '', param: 'T_YHGL_0002', label: '锁定状态', span: 6, header: '用户状态', disabled: true },
          { type: 'select', name: 'stopFlag', value: '', param: 'T_YHGL_0004', label: '启停用状态', span: 6, disabled: true },
        ],
        [{ type: 'input', name: 'roleNames', value: '', label: '拥有角色', span: 18, toStriing: true, disabled: true }],
      ];
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped lang="less">
.record {
  width: 18%;
}
</style>
