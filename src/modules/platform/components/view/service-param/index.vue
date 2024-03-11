<template>
  <div class="querypage">
    <el-row :gutter="10">
      <el-col :span="4"
              v-if="showOrgCol">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i><span>机构列表</span>
        </el-card>
        <el-card class="grid-content left">
          <div>
            <input v-model="filterTextOrg"
                   placeholder="输入关键字进行检索"
                   class="native" />
            <el-tree :data="data"
                     default-expand-all
                     ref="orgtree"
                     :props="defaultProps"
                     :expand-on-click-node="false"
                     @node-click="handleNodeClick"
                     :filter-node-method="filterNode"></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4"
              v-if="showUserCol">
        <el-card>
          <i class="icon DHCiconfont"
             :class="'DHC-jigouguanli'"></i><span>用户列表</span>
        </el-card>
        <el-card class="grid-content left">
          <div>
            <input v-model="filterTextUser"
                   placeholder="输入关键字进行检索"
                   class="native" />
            <!-- <el-tree
                            :data="data"
                            default-expand-all
                            ref="tree"
                            :props="defaultUsers"
                            @node-click="handleUserClick"
                            :filter-node-method="filterNode"
                        ></el-tree> -->
            <div class="userWrap">
              <div v-for="o in items"
                   :key="o.userId"
                   :class="{checked:o.userId==userActiveId}"
                   class="text item"
                   @click="getUserConfig(o.userId)">
                {{'-' + o.userName }}
              </div>

            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="contenWidth">
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

            </ul>
          </div>
          <div>
            <v-table v-if="showTable"
                     tHeight="calc(100vh - 400px)"
                     ref="dataTable"
                     v-bind:param="paramTable"></v-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 新增、编辑弹出框 -->
    <v-edit v-if="visibleEdit"
            ref="childEdit"
            :paramEdit="paramEdit"
            :vis.sync="visibleEdit"></v-edit>
  </div>
</template>
<script>
import vEdit from './model/edit';
import MinXin from '@/common/script/mixin';
export default {
  name: 'system-configBussiness',
  mixins: [MinXin],
  components: {
    vEdit,
  },
  inject: ['reload'],
  data() {
    return {
      // 弹框相关
      paramEdit: {
        title: '',
        dialogTitle: '业务参数',
      },
      showTable: false,
      contenWidth: 16,
      filterText: '',
      data: [],
      filterTextUser: '',
      filterTextOrg: '',
      // 编辑及新增弹框的显隐控制
      visibleEdit: false,
      // getById返回值
      resData: '',
      // 机构、用户列表显示隐藏
      showOrgCol: true,
      showUserCol: true,
      // 是否有用户的标识
      isUser: '',
      // 用户列表选中ID
      userActiveId: '',
      params: {
        // 请求表格数据时传给后台的参数
        userId: '',
        orgId: '',
      },
      userNames: [],
      detailUrl: {
        // delUrl: this.$urlList.org.delUrl,
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      arrList: [
        [
          { type: 'input', name: 'search_like_arg_name', value: '', label: '参数名称', span: 8, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'search_like_arg_description', value: '', label: '参数描述', span: 8, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'select', name: 'search_EQ_system_id', value: '', customOption: JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList')), label: '隶属系统', span: 8 },
        ],
      ],
      paramTable: {
        bussName: 'sysbusiness',
        where: {},
        getDataUrl: '',
        tableHeader: [
          {
            field: 'argName',
            title: '参数名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'argValue',
            title: '参数值',
            width: 120,
            tooltip: true,
          },
          {
            field: 'argDescription',
            title: '参数描述',
            width: 200,
            tooltip: true,
          },
          {
            field: 'systemId',
            title: '隶属系统',
            width: 100,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'systemList',
              // 实时请求的表格列数据url
              realTimeUrl: this.$urlList.home.system,
            },
          },
          // {
          //   field: 'controlPattern',
          //   title: '控制方式',
          //   width: 120,
          //   oper: {
          //     name: 'dic',
          //     type: 'T_YWCSGL_0002'
          //   }
          // },
          {
            field: 'argLevel',
            title: '参数级别',
            width: 100,
            tooltip: true,
            oper: {
              name: 'dic',
              type: 'T_YWCSGL_0001',
            },
          },
          {
            field: 'button',
            title: '操作',
            width: 170,
            tooltip: false,
            oper: {
              name: 'button',
              btnObj: {
                edit: {
                  name: '编辑',
                  // permission: 'dcp:system:businessConfig:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editModals,
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
      // defaultUsers:{label: function(a,b){return a.params.userName}},
      areaArr: [],
      provcode: '',
      citycode: '',
      countycode: '',
    };
  },
  watch: {
    filterTextOrg(val) {
      this.$refs.orgtree.filter(val);
    },
    filterTextUser() {
      // this.$refs.orgtree.filter(val);
    },
    params: {
      handler(newVal) {
        this.paramTable.where = newVal;
      },
      deep: true,
    },
  },
  computed: {
    items: function () {
      // 模拟树结构检索
      let filterTextUser = this.filterTextUser;
      if (filterTextUser) {
        let reg = new RegExp(filterTextUser, 'ig');
        return this.userNames.filter(function (e) {
          return Object.keys(e).some(function () {
            return e.userName.match(reg);
          });
        });
      }
      return this.userNames;
    },
  },
  methods: {
    editModals(row) {
      let id = this.detailUrl.id;
      this.detailUrl.resId = row[id];
      this.paramEdit.title = '-编辑';
      // 将paramEdit和params合成一个对象，便于编辑页取值
      this.paramEdit = Object.assign(this.paramEdit, this.params);
      // 改变vuex中弹框状态
      this.$store.dispatch('user/setOperatState', 'edit');
      // 控制弹出框显隐
      this.http.apiGet(this.$urlList.sysbusiness.findById, { params: { id: row[id], orgId: this.params.orgId, userId: this.params.userId } }).then((res) => {
        // 判断code参数为1000202时，则编辑弹窗不能显示，弹出提示框
        if (res.code == '1000202') {
          // this.visibleEdit = false;
          this.$message({
            showClose: true,
            message: res.message,
            type: 'warning',
            duration: '5000',
          });
        } else {
          this.visibleEdit = true;
        }
      });
      // this.visibleEdit = true;
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      return data.params.orgName.indexOf(value) !== -1;
    },
    // 机构树节点点击方法
    handleNodeClick(data) {
      this.params.orgId = data.id;
      this.$refs.filter.cancleForm(); // 清空筛选条件
      // 根据判断是否有用户调对应的接口
      // if(this.isUser == true){
      //     this.getOrgUser(data.id)
      // }else{
      //     this.getOrgConfig(data.id)
      // }
      this.getOrgUser(data.id);
      this.getOrgConfig(data.id);
      // this.$refs.filter.queryPageForm()
    },
    // 获取机构下的用户
    getOrgUser(data) {
      this.http.apiGet(this.$urlList.sysbusiness.getOrgUser, { params: { orgCode: data } }).then((res) => {
        this.userNames = res.data;
      });
    },
    // 点击用户获取用户参数表格数据
    getUserConfig(data) {
      this.paramEdit.userId = data;
      this.userActiveId = data;
      this.params.userId = data;
      this.paramTable.getDataUrl = this.$urlList.sysbusiness.getUserConfig;
      this.$refs.filter.cancleForm(); // 清空筛选条件
      this.$refs.dataTable.getTableData();
    },
    // 根据机构获取表格数据
    getOrgConfig(data) {
      this.params.orgId = data;
      this.params.userId = '';
      this.paramTable.getDataUrl = this.$urlList.sysbusiness.getOrgConfig;
      this.$refs.dataTable.getTableData();
    },
    async init() {
      // 获取页面类型
      // let res = await this.http.apiGet(this.$urlList.sysbusiness.getPageType);
      // B-法人机构 C-普通机构 D-用户
      // if (res.data == 'D') {
      // 机构、用户列表显示
      this.showOrgCol = true;
      this.showUserCol = true;
      // 请求机构树接口
      let response = await this.http.apiGet(this.$urlList.sysbusiness.getOrgTree);
      // 机构树显示
      this.data.push(response.data);
      // 页面首次加载机构树未点击之前为orgId赋值
      this.params.orgId = response.data.id;
      // 检索路径
      this.paramTable.getDataUrl = this.$urlList.sysbusiness.getOrgConfig;
      // 请求用户接口
      let getUserRes = await this.http.apiGet(this.$urlList.sysbusiness.getOrgUser, { params: { orgCode: response.data.id } });
      // 用户列表显示
      this.userNames = getUserRes.data;
      // 请求用户参数表格数据所需参数id，通过where传到后台
      // this.params.userId = getUserRes['data'][0].userId;
      // 是否有用户标识，有用户为true
      this.isUser = true;

      // 废弃 判断页面类型显示
      // // 获取页面类型
      // let res = await this.http.apiGet(this.$urlList.sysbusiness.getPageType);
      // // B-法人机构 C-普通机构 D-用户
      // if (res.data == 'D') {
      //   // 机构、用户列表显示
      //   this.showOrgCol = true;
      //   this.showUserCol = true;
      //   // 请求机构树接口
      //   let response = await this.http.apiGet(this.$urlList.sysbusiness.getOrgTree);
      //   // 机构树显示
      //   this.data.push(response.data);
      //   // 页面首次加载机构树未点击之前为orgId赋值
      //   this.params.orgId = response.data.id;
      //   // 检索路径
      //   this.paramTable.getDataUrl = 'businessConfig/getOrgConfig';
      //   // this.paramTable.getDataUrl = "api/businessConfig/getUserConfig";
      //   // 请求用户接口
      //   let getUserRes = await this.http.apiGet(this.$urlList.sysbusiness.getOrgUser, {params: {orgCode: response.data.id}});
      //   // 用户列表显示
      //   this.userNames = getUserRes.data;
      //   // 请求用户参数表格数据所需参数id，通过where传到后台
      //   // this.params.userId = getUserRes['data'][0].userId;
      //   // 是否有用户标识，有用户为true
      //   this.isUser = true;
      // } else if (res.data == 'C') {
      //   // 机构列表显示
      //   this.showOrgCol = true;
      //   this.contenWidth = this.contenWidth + 4;
      //   // 机构树
      //   let response = await this.http.apiGet(this.$urlList.sysbusiness.getOrgTree);
      //   // 机构树显示
      //   this.data.push(response.data);
      //   // 是否有用户标识，无用户为false
      //   this.isUser = false;
      //   // 请求机构参数表格数据所需参数orgId，通过where传到后台
      //   this.params.orgId = response.data.id;
      //   // 检索路径
      //   this.paramTable.getDataUrl = 'businessConfig/getOrgConfig';
      // } else {
      //   this.contenWidth = this.contenWidth + 8;
      //   // 检索路径
      //   this.paramTable.getDataUrl = 'businessConfig/getLegalConfig';
      // }
      // 废弃 判断页面类型显示 END

      // 延迟表格方法加载的标识为true
      this.showTable = true;
    },
    async getSystemId() {
      // 获取隶属系统
      let response = await this.http.apiGet(this.$urlList.home.system); // 角色提供
      this.common.Control(this.arrList, {
        search_EQ_system_id: {
          customOption: response.data,
        },
      });
    },
  },
  created() {
    this.getSystemId();
    this.init();
  },
  mounted() {},
};
</script>
<style scoped="scoped">
.userWrap,
.left >>> .el-tree {
  height: calc(100vh - 200px);
  min-height: 570px;
  overflow: auto;
}
.grid-content {
  height: 85vh;
}
.right {
  /* height:75vh; */
  height: 100%;
}
.item {
  font-size: 13px;
  cursor: pointer;
  padding-bottom: 5px;
  padding-left: 20px;
}
.item:hover,
.item.checked {
  color: #3075c7;
  background-color: #efefef;
}
</style>
