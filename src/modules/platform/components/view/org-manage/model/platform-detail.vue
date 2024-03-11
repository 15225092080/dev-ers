<template>
  <v-form v-if="isShowForm"
          v-bind:arrList="arrList"
          labelWidth="110px"
          :findById="findById"></v-form>
</template>
<script>
export default {
  name: 'child',
  data() {
    return {
      arrList: [],
      findById: {
        // 表单赋值接口（编辑，详情用的较多）
        url: this.$urlList.org.findById, // 接口
        param: {
          params: {
            orgCode: this.$route.query.orgCode,
          },
        }, // 参数
      },
      isShowForm: false,
    };
  },
  methods: {
    async getOrgRole() {
      // 表单赋值
      let response = await this.http.apiGet(this.$urlList.role.getOrgRole); // 角色提供
      let arr = [];
      response.data.forEach((element) => {
        arr.push({ value: element.roleId, label: element.roleName });
      });
      this.common.Control(this.arrList, {
        roleId: {
          checkboxs: arr,
        },
      });
    },
    async init() {
      this.arrList = [
        [
          {
            type: 'input',
            name: 'orgCode',
            value: '',
            label: '机构内部代码',
            span: 6,
            header: '机构管理基本信息',
            disabled: true,
          },
          {
            type: 'input',
            name: 'orgName',
            value: '',
            label: '机构名称',
            span: 6,
            disabled: true,
          },
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgtree,
            treetitle: '机构树',
            defaultProps: {
              children: 'children',
              label: function (a) {
                return a.params.orgName;
              },
            },
            name: 'parentOrgCode',
            value: '',
            label: '上级机构',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'financialOrgCode',
            value: '',
            label: '金融机构代码',
            span: 6,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'linkMan',
            value: '',
            label: '联系人',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'linkMode',
            value: '',
            label: '联系方式',
            span: 6,
            disabled: true,
          },
          {
            type: 'input',
            name: 'postCode',
            value: '',
            label: '邮政编码',
            span: 6,
            disabled: true,
          },
          {
            type: 'select',
            name: 'recordStopFlag',
            param: 'T_JGGL_0001',
            value: '',
            label: '启停状态',
            span: 6,
            disabled: true,
          },
        ],
        [
          {
            type: 'cascader',
            name: 'areaCode',
            value: '',
            label: '行政区划',
            span: 18,
            disabled: true,
          },
        ],
        [
          {
            type: 'textarea',
            name: 'address',
            value: '',
            label: '详细地址',
            span: 24,
            disabled: true,
          },
        ],
        [
          {
            type: 'textarea',
            name: 'remark',
            value: '',
            label: '备注',
            span: 24,
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'deptName',
            value: '',
            label: '部门',
            span: 24,
            header: '部门管理',
            disabled: true,
          },
        ],
        [
          {
            type: 'input',
            name: 'roleName',
            value: '',
            label: '机构角色',
            span: 24,
            toStriing: true,
            header: '机构角色',
            disabled: true,
          },
        ],
      ];
      await this.getOrgRole();
      this.isShowForm = true;
    },
  },
  created() {
    this.init();
  },
};
</script>
<style  scoped lang="less">
@top: 10px;
.margin-top {
  margin-top: @top;
}
.inactive {
  margin-top: @top;
  background-color: #f5f7fa;
}
.active {
  margin-top: @top;
}
</style>
