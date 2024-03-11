<template>
  <div class="querypage">
    <el-row :gutter="10">
      <el-col :span="4">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i><span>{{$route.meta.title}}</span>
        </el-card>
        <el-card class="grid-content left"
                 :class="{'ieTreeClass':treeClass}">
          <div>
            <input v-model="filterText"
                   placeholder="输入关键字进行检索"
                   class="native">
            <el-tree :data="data"
                     default-expand-all
                     ref="dictree"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     :filter-node-method="filterNode"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="20">
        <v-operation ref="filter"
                     v-bind:arrList="arrList"
                     labelWidth="80px"></v-operation>
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
                           v-permission="['dcp:system:dict:create']">
                  <i class="DHCiconfont">&#xe6c3;</i>创建
                </el-button>
              </li>
            </ul>
          </div>
          <div>
            <v-table ref="dataTable"
                     tHeight="calc(100vh - 400px)"
                     v-bind:param="paramTable"></v-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <v-edit :param="paramEdit"
            v-if="visibleEdit"
            :vis.sync="visibleEdit"></v-edit>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import vEdit from './model/edit';
export default {
  name: 'system-dic',
  mixins: [MinXin],
  components: {
    vEdit,
  },
  inject: ['reload'],
  data() {
    return {
      filterText: '',
      treeClass: false,
      data: [],
      visibleEdit: false,
      exportUrl: this.$urlList.role.exportUrl,
      detailUrl: {
        delUrl: this.$urlList.dict.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      arrList: [
        [
          { type: 'input', name: 'search_like_dict_name', value: '', label: '字典名称', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_like_code', value: '', label: '字典代码', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
        ],
      ],
      paramEdit: {},
      paramTable: {
        bussName: 'dict',
        tableHeader: [
          {
            field: 'typeId',
            title: '字典类型',
            width: 120,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'TypeName',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.dict.getTypeName,
            },
          },
          {
            field: 'code',
            title: '字典代码',
            width: 120,
            tooltip: true,
          },
          {
            field: 'dictName',
            title: '字典名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'dictDesc',
            title: '字典描述',
            width: 120,
            tooltip: true,
          },
          {
            field: 'dictLevel',
            title: '级别',
            width: 80,
            tooltip: true,
          },
          {
            field: 'parentCode',
            title: '上级字典代码',
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
                  permission: 'dcp:system:dict:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModal,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:dict:delete',
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
          return a.params.name;
        },
      },
      areaArr: [],
      provcode: '',
      citycode: '',
      countycode: '',
    };
  },
  watch: {
    filterText(val) {
      this.$refs.dictree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.params.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      if (data.params.nodeType == '3') {
        this.paramTable.where = { search_eq_type_id: data.id, search_eq_system_id: sessionStorage.getItem('systemId') };
        this.$refs.filter.cancleForm();
        this.$refs.filter.queryPageForm();
      }
    },
    async getTypeName() {
      if (!sessionStorage.getItem(sessionStorage.getItem('systemId') + '_TypeName')) {
        let response = await this.http.apiGet(this.$urlList.dict.getTypeName, { params: { systemId: sessionStorage.getItem('systemId') } }); // 角色提供
        if (response.data && JSON.stringify(response.data) !== '{}') {
          sessionStorage[sessionStorage.getItem('systemId') + '_TypeName'] = JSON.stringify(response.data);
        }
      }
    },
    init() {
      // 获取机构树
      this.http.apiGet(this.$urlList.dict.dicttree).then((res) => {
        if (this.data.length == 0) {
          this.data = res.data;
        }
      });
      //  this.getTypeName()
    },
  },
  created() {
    if (this.common.BrowserType() == 'IE10') {
      this.treeClass = true;
    }
    this.init();
  },
};
</script>
<style scoped="scoped">
.left >>> .el-tree {
  height: calc(100vh - 200px);
  min-height: 570px;
}
</style>
