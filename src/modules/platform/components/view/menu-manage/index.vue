<template>
  <div class="querypage">
    <v-operation v-bind:arrList="arrList"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe66a;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="addModal"
                       v-permission="['dcp:system:resource:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-treetable ref="dataTable"
                     :param="paramTable"></v-treetable>
      </div>
    </el-card>
    <v-edit :param="paramEdit"
            v-if="visibleEdit"
            :vis.sync="visibleEdit"></v-edit>
  </div>
</template>
<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
export default {
  name: 'system-resource',
  mixins: [MinXin],
  components: {
    vEdit,
  },
  data() {
    return {
      arrs: [],
      selected_row: '',
      visibleEdit: false,
      detailUrl: {
        delUrl: this.$urlList.menu.delUrl,
        paramDataId: 'resourceId', // 字段名
        id: 'resourceId', // 获取表格数据的字段名
        resId: '',
      },
      paramEdit: {},
      arrList: [
        [
          {
            type: 'input',
            name: 'search_like_resource_name',
            value: '',
            label: '资源名称',
            span: 6,
            rule: [{ max: 50, message: '长度不超过50位', trigger: 'blur' }],
          },
          { type: 'input', name: 'search_eq_resource_id', value: '', label: '资源代码', span: 6, rule: [{ max: 32, message: '长度不超过32位', trigger: 'blur' }] },
          { type: 'select', name: 'resourceType', value: '', param: 'T_ZYGL_0001', label: '资源类型', span: 6 },
        ],
      ],
      paramTable: {
        bussName: 'menu',
        tableHeader: [
          {
            field: 'resourceName',
            title: '资源名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'resourceId',
            title: '资源代码',
            width: 120,
            tooltip: true,
          },
          {
            field: 'resourceType',
            title: '资源类型',
            width: 90,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_ZYGL_0001',
            },
          },
          {
            field: 'url',
            title: '资源地址',
            width: 120,
            tooltip: true,
          },
          {
            field: 'orderNum',
            title: '资源排序',
            width: 80,
            align: 'center',
            tooltip: true,
          },
          {
            field: 'icon',
            title: '资源图标',
            width: 100,
            tooltip: true,
          },
          {
            field: 'permission',
            title: '权限字符串',
            width: 120,
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
                  permission: 'dcp:system:resource:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:resource:delete',
                  icon: 'shanchu',
                  flag: 'delete_btn',
                  clickFun: this.deleteCustom,
                },
              },
            },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    deleteCustom(row) {
      this.findResourceId(row.resourceId, this.$refs.dataTable.tableData);
      this.arrs.push(row.resourceId);
      let that = this;
      // let value = row[that.detailUrl.id]
      this.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, function (action) {
        if (action == 'confirm') {
          that.http
            .apiGet(that.detailUrl.delUrl, {
              params: {
                resourceId: that.arrs.join(),
              },
            })
            .then((res) => {
              that.common.submitMsg(res, that);
            });
        } else {
          that.arrs = [];
        }
      });
    },
    findResourceId(id, data) {
      // 递归查找resourceId
      let that = this;
      function findch(id, arr) {
        // eslint-disable-line
        arr.map((item) => {
          item.children.map((i) => {
            that.arrs.unshift(i.resourceId);
          });
          if (item.children.length > 0) {
            findch(id, item.children);
          }
        });
      }
      data.map((item) => {
        if (item.resourceId == id) {
          item.children.map((i) => {
            this.arrs.unshift(i.resourceId);
          });
          findch(id, item.children);
        }
        this.findResourceId(id, item.children);
      });
    },
  },
  created() {},
  mounted() {},
  computed: {},
};
</script>
<style scoped="scoped">
</style>
