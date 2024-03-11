<template>
  <div class="querypage">
    <v-operation v-bind:arrList="arrList"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe6b9;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="addModal"
                       v-permission="['dcp:system:notice:create']">
              <i class="DHCiconfont">&#xe6c3;</i>创建
            </el-button>
          </li>
          <!-- <li>
            <el-button type="primary" @click="editSelectDictionaries">
              <i class="DHCiconfont">&#xe668;</i>编辑
            </el-button>
          </li>
          <li>
            <el-button type="danger" @click="deletemodel">
              <i class="DHCiconfont">&#xe6a3;</i>删除
            </el-button>
          </li> -->
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <!--新增编辑出框 -->

    <systemmsg-edit ref="childAdd"
                    :param="paramAdd"
                    v-if="showEdit"
                    @closeChild="closeChild"
                    @setVal="setVal">
    </systemmsg-edit>

    <!-- 详情弹出框 -->

    <systemmsg-details ref="childDetails"
                       :param="paramDetail"
                       v-if="showDetails"
                       @closeChild="closeChild">
    </systemmsg-details>
  </div>
</template>

<script>
import vOperation from '@/common/components/search';
import systemmsgEdit from './model/edit';
import systemmsgDetails from './model/detail';
import vTable from '@/common/components/table';
import MinXin from '@/common/script/mixin';
// import axios from 'axios';
export default {
  name: 'system-notice',
  mixins: [MinXin],
  components: {
    vOperation,
    systemmsgEdit,
    systemmsgDetails,
    vTable,
  },
  data() {
    return {
      message: 'first',
      showHeader: false,
      show: true,
      secondshow: true,
      loading: false,
      flag: 'open',
      maxSize: 10,
      nextPage: '',
      prePage: '',
      recordCnt: 1,
      curPage: 1,
      selected_row: '',
      showEdit: false,
      showDetails: false,
      title: '',
      tipmessage: '',
      detailUrl: {
        paramDataId: 'id', // 字段名
        id: '',
        resId: '',
      },
      post: {
        messageVisible: false,
        select: '', // 判断是否单选
        flag: '', // 判断操作
      },
      height: '',
      paramAdd: {
        visible: false,
        title: '',
      },
      paramDetail: {
        visible: false,
        title: '',
        form: '',
      },
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_title',
            value: '',
            label: '公告标题',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'select',
            name: 'search_EQ_system_id',
            value: '',
            customOption: JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_systemList')),
            label: '隶属系统',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_status',
            value: '',
            param: 'T_GGGL_0001',
            label: '发布状态',
            span: 6,
          },
        ],
      ],
      paramTable: {
        // 表格数据
        bussName: 'systemmsg',
        tableHeader: [
          {
            field: 'title',
            title: '公告标题',
            width: 150,
            tooltip: true,
            oper: {
              name: 'link',
              clickFun: this.detailFun,
            },
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
          {
            field: 'status',
            title: '发布状态',
            width: 100,
            tooltip: false,
            oper: {
              name: 'switch',
              activeText: '发布',
              inactiveText: '关闭',
              flag: {
                on: '1',
                off: '0',
              },
              clickFun: this.changeStatus,
            },
          },
          {
            field: 'orgCode',
            title: '所属机构',
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
            field: 'updateOrgCode',
            title: '编辑机构',
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
                  permission: 'dcp:system:notice:update',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.editSelectDictionaries,
                },
                pasW: {
                  name: '删除',
                  permission: 'dcp:system:notice:delete',
                  icon: 'shanchu',
                  flag: 'delete_btn',
                  clickFun: this.deletemodel,
                },
              },
            },
          },
        ],
      },
      tableData: [],
    };
  },
  watch: {},
  methods: {
    // 新增方法
    addModal() {
      this.showEdit = true;
      this.paramAdd = {
        visible: true,
        title: '公告管理-新增页', // 标题
        operation: 'add', // 弹出框的类型
      };
    },
    // 编辑方法
    editSelectDictionaries(row) {
      this.showEdit = true;
      this.paramAdd = {
        visible: true,
        title: '公告管理-编辑页', // 标题
        operation: 'edit', // 弹出框的类型
        id: row.noticeId,
      };
      this.setVal(row.noticeId); // 这里提出来，编辑时有重置功能
    },
    setVal(id) {
      let paramData = {
        params: {
          id: id,
        },
      };
      this.http.apiGet(this.$urlList.systemmsg.findById, paramData).then((res) => {
        this.$refs.childAdd.formItem = res.data;
        // 如果getById接口返回的数据中有附件，需要把附件信息添加到upload组件中以便回显附件信息
        // if (res.data.fileList && res.data.fileList.length) {
        let upload = this.$refs.childAdd.$refs.upload.$refs.upload;
        upload.clear();
        upload.add(res.data.fileList);
        // }
      });
    },
    closeChild() {
      this.showEdit = false;
      this.showDetails = false;
    },
    // 详情方法
    detailFun(row) {
      this.showDetails = true;
      this.paramDetail = {
        visible: true,
        title: '公告管理-详情页', // 标题
        operation: 'detail', // 弹出框的类型
      };
      let paramData = {
        params: {
          id: row.noticeId,
        },
      };
      this.http.apiGet(this.$urlList.systemmsg.findById, paramData).then((res) => {
        this.$refs.childDetails.formItem = res.data;
        // 如果getById接口返回的数据中有附件，需要把附件信息添加到upload组件中以便回显附件信息
        if (res.data.fileList && res.data.fileList.length) {
          this.$refs.childDetails.$refs.upload.$refs.upload.add(res.data.fileList);
        }
      });
    },
    // 删除方法
    deletemodel(row) {
      let that = this;
      this.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, function (action) {
        if (action == 'confirm') {
          that.http
            .apiGet(that.$urlList.systemmsg.delUrl, {
              params: {
                id: row.noticeId,
              },
            })
            .then((res) => {
              that.common.submitMsg(res, that);
            });
        }
      });
    },
    // 改变列表发布状态("1":发布"0":停用)
    changeStatus(row) {
      let that = this;
      let expirationTime = row.expirationTime;
      if (expirationTime) {
        if (parseInt(Date.parse(expirationTime.replace(/-/g, '/')), 0) > parseInt(new Date().getTime() - 24 * 60 * 60 * 1000, 0)) {
          this.http
            .apiGet(this.$urlList.systemmsg.changeStatus, {
              params: {
                id: row.noticeId,
                status: row.status,
              },
            })
            .then((res) => {
              // 后台停用
              that.common.submitMsg(res, this);
            });
        } else {
          that.common.MessageBoxalert('公告截止日期应晚于发布日期，操作失败', '消息', '确认', 'error').then(() => {
            that.$refs.dataTable.getTableData();
          });
        }
      } else {
        this.http
          .apiGet(this.$urlList.systemmsg.changeStatus, {
            params: {
              id: row.noticeId,
              status: row.status,
            },
          })
          .then((res) => {
            // 后台停用
            that.common.submitMsg(res, this);
          });
      }
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
  async created() {
    let systemId = sessionStorage.getItem('systemId');
    // 判断缓存中是否有行政区域数据，若无则调接口请求
    await this.http.apiGet(this.$urlList.home.system).then((res) => {
      if (res.data) {
        sessionStorage.setItem(systemId + '_systemList', JSON.stringify(res.data));
      }
    });
  },
  mounted() {
    this.getSystemId();
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    },
  },
  // mixins: [http]
};
</script>

<style scoped="scoped">
.btnWrap {
  text-align: center;
}

.searchBody .el-form-item.el-form-item--small {
  margin-bottom: 5px;
}

.searchBody .el-card__body {
  padding: 20px 10px;
}

.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}

.page {
  float: right;
}
</style>
