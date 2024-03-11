<template>
  <div class="querypage">
    <el-container>
      <el-aside width="200px"
                style="background-color: #B3C0D1;height:100%; float:left;">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i>
          <span>{{$route.meta.title}}</span>
        </el-card>
        <el-card class="grid-content left">
          <div>
            <input v-model="filterText"
                   placeholder="请输入机构名称"
                   class="native" />
            <el-tree :data="data"
                     node-key="id"
                     default-expand-all
                     ref="orgtree"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     :filter-node-method="filterNode"
                     :expand-on-click-node="false"></el-tree>
          </div>
        </el-card>
      </el-aside>
      <el-main class="ui-main">
        <v-operation ref="filter"
                     v-bind:arrList="arrList"
                     labelWidth="100px"></v-operation>
        <el-card class="paddingtop right">
          <div slot="header"
               class="clearfix">
            <span class="leftFont">
              <i class="DHCiconfont">&#xe682;</i>检索结果
            </span>
            <ul class="icongroup">
              <li>
                <el-button class="add_btn"
                           plain
                           @click="addModal"
                           v-permission="['dcp:system:org:create']">
                  <i class="DHCiconfont">&#xe6c3;</i>创建
                </el-button>
              </li>
              <li>
                <el-button class="export_btn"
                           @click="exportCustomBtn(exportUrl)"
                           v-permission="['dcp:system:org:export']">
                  <i class="DHCiconfont">&#xe676;</i>导出
                </el-button>
              </li>
            </ul>
          </div>
          <div>
            <v-table ref="dataTable"
                     tHeight="calc(100vh - 410px)"
                     v-bind:param="paramTable"
                     selection></v-table>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import { bindEvent, changestopFlag } from '@/modules/platform/script/org-manage/org-manage';
export default {
  name: 'system-org',
  mixins: [MinXin],
  components: {},
  inject: ['reload'],
  computed: {},
  data() {
    return {
      filterText: '',
      data: [],
      selected_row: '',
      exportUrl: this.$urlList.org.exportUrl,
      detailUrl: {
        delUrl: this.$urlList.org.delUrl,
        paramDataId: 'orgId', // 字段名
        id: 'orgCode', // 获取表格数据的字段名
      },
      arrList: [
        [
          {
            type: 'input',
            name: 'search_like_org_code',
            value: '',
            label: '机构内部代码',
            xl: 6,
            lg: 8,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'search_like_org_name',
            value: '',
            label: '机构名称',
            xl: 6,
            lg: 8,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'select',
            name: 'search_eq_record_stop_flag',
            value: '',
            param: 'T_JGGL_0001',
            label: '启停状态',
            xl: 6,
            lg: 8,
          },
        ],
      ],
      paramTable: {
        bussName: 'org',
        where: {},
        noGetData: true,
        tableHeader: [
          {
            field: 'orgCode',
            title: '机构内部代码',
            width: 120,
            tooltip: true,
            oper: {
              name: 'link',
              clickFun: this.showdetail,
            },
          },
          {
            field: 'orgName',
            title: '机构名称',
            width: 130,
            tooltip: true,
          },
          {
            field: 'parentOrgCode',
            title: '上级机构',
            width: 130,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'getOrgName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.common.getOrgName,
            },
          },
          {
            field: 'recordStopFlag',
            title: '启停状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'switch',
              flag: { on: '1', off: '0' },
              clickFun: changestopFlag,
              disabled: { num: true },
            },
          },
          {
            field: 'updateUserId',
            title: '编辑用户',
            width: 120,
            tooltip: true,
          },
          {
            field: 'updateTime',
            title: '编辑时间',
            width: 145,
            tooltip: true,
          },
          {
            field: 'button',
            title: '操作',
            width: 170,
            tooltip: false,
            oper: {
              name: 'button',
              btnObj: {
                jurisdiction: {
                  name: '编辑',
                  permission: 'dcp:system:org:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.updated,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:org:delete',
                  icon: 'shanchu',
                  flag: 'delete_btn',
                  clickFun: this.deleted,
                },
              },
            },
          },
        ],
      },
      defaultProps: {
        children: 'children',
        label: function (a) {
          return a.params.orgName;
        },
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.orgtree.filter(val);
    },
  },
  methods: {
    deleted(row) {
      let that = this;
      that.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, function (action) {
        if (action == 'confirm') {
          that.http
            .apiGet(that.detailUrl.delUrl, {
              params: {
                orgId: row.orgCode,
              },
            })
            .then((res) => {
              if (res.code == 0) {
                that.common.MessageBoxalert(res.message, '消息', '确认', 'success').then(() => {
                  that.init();
                });
              } else {
                that.common.MessageBoxalert(res.message, '消息', '确认', 'error');
              }
            });
        }
      });
    },
    addModal() {
      // 暂时写到这里，日后新增编辑详情这种跳转或者弹出可能做成可配置
      this.$store.dispatch('user/setOperatState', 'add');
      this.$router.push({ path: '/system-org-edit' });
    },
    updated(row) {
      this.$store.dispatch('user/setOperatState', 'edit');
      this.$router.push({
        path: '/system-org-edit',
        query: {
          orgCode: row.orgCode,
        },
      });
    },
    showdetail(row) {
      this.$store.dispatch('user/setOperatState', '');
      this.$router.push({
        path: '/system-org-detail',
        query: {
          orgCode: row.orgCode,
        },
      });
    },

    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.params.orgName.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.paramTable.where = { orgCode: data.id };
      this.$refs.filter.cancleForm();
      this.$refs.filter.queryPageForm();
    },
    exportCustomBtn(exportUrl) {
      // 机构的导出比较特殊，单独拉出来
      let form = this.$refs.filter.$refs.formItem.formItem;
      let arr = [];
      let paramData;
      this.selected_row = this.$refs.dataTable.selectRow;
      if (this.selected_row && this.selected_row.length == 1) {
        paramData = this.selected_row[0][this.detailUrl.id];
      } else if (this.selected_row.length > 1) {
        for (var i = 0; i < this.selected_row.length; i++) {
          arr.push(this.selected_row[i][this.detailUrl.id]);
        }
        paramData = arr.join();
      } else if (this.$refs.dataTable.tableData === null || this.$refs.dataTable.tableData.length == 0) {
        this.$message.error('无数据可导出');
        return false;
      } else {
        paramData = '';
      }
      // for (let item in form) {
      //     str += item + "=" + form[item] + "&"
      // }
      if (this.paramTable.where.orgCode) {
        form.orgCode = this.paramTable.where.orgCode;
        form.orgCodes = paramData;
        this.common.downLoad(exportUrl, form);
        return true;
        // window.location.href = exportUrl + "?" + str + "orgCode=" + this.paramTable.where.orgCode+"&"+"orgCodes=" + paramData
      } else {
        form.orgCodes = paramData;
        form.orgCode = '';
        this.common.downLoad(exportUrl, form);
        return true;
        // window.location.href = exportUrl + "?" + str + "orgCode="+"&"+"orgCodes=" + paramData
      }
    },
    init() {
      // 获取机构树
      this.http.apiGet(this.$urlList.common.orgtree).then((res) => {
        if (this.data.length == 0) {
          localStorage.setItem('ms_orgCode', res.data[0].id);
          this.$refs.dataTable.ms_orgCode = localStorage.getItem('ms_orgCode');
        }
        this.data = res.data;
        this.$refs.dataTable.getTableData();
      });
    },
  },
  created() {
    this.init();
    bindEvent(this);
  },
};
</script>

<style scoped="scoped">
.querypage {
  height: 100%;
}
/**修复ie10滚动条问题 */
.ui-main {
  width: calc(100% - 200px);
}
.left >>> .el-tree {
  height: calc(100vh - 180px);
  min-height: 590px;
}
/* .grid-content{
    height: 85vh;
}
.right{
    height:70vh;
} */
</style>
