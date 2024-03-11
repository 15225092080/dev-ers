<template>
  <div class="table-wrap">
    <div>
      <ul class="icongroup"
          v-if="param.showButton">
        <li>
          <el-button type="primary"
                     v-permission="param.btn && param.btn.add"
                     plain
                     @click="addModal(param.bussName,param.self)">
            <i class="DHCiconfont">&#xe6c3;</i>创建
          </el-button>
        </li>
        <li>
          <el-button type="primary"
                     v-permission="param.btn && param.btn.edit"
                     plain
                     @click="updateModal(param.bussName,param.self)">
            <i class="DHCiconfont">&#xe6c3;</i>编辑
          </el-button>
          <el-button type="danger"
                     v-permission="param.btn && param.btn.del"
                     @click="deletemodel(param.bussName,param.self)">
            <i class="DHCiconfont">&#xe6a3;</i>删除
          </el-button>
        </li>
      </ul>
      <el-table border
                :data.sync="tableData"
                size="mini"
                stripe
                :height="tHeight ? tHeight : 420"
                row-key="id"
                @select="selectFun"
                @row-click="rowClick"
                @select-all="selectAll"
                @selection-change="selectionChange"
                :tree-props="{children: 'children'}">
        <el-table-column type="selection"
                         v-if="!param.selectionShow"
                         width="55"></el-table-column>
        <!--&lt;!&ndash; prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper:&ndash;&gt;
            &lt;!&ndash;是否有操作列&ndash;&gt;
            &lt;!&ndash;oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 &ndash;&gt;-->
        <el-table-column v-for="(th, key) in tableHeader"
                         v-if="!th.colShow"
                         :key="key"
                         :prop="th.field"
                         :label="th.title"
                         :fixed="th.fixed"
                         :show-overflow-tooltip="true"
                         :min-width="th.width"
                         align="center">
          <!--加入template主要是对列的操作，dic表示字典，link表示详情，button表示按钮操作，swich表示开关-->
          <template slot-scope="scope">
            <div>
              <slot v-if="th.slotName"
                    :name="th.slotName"
                    :data="{row:scope.row,th:th}"></slot>
              <span v-else-if="th.oper && th.oper.name == 'function'"
                    v-dicFilter="{val:scope.row,format:th.oper,that:that}"></span>
              <span v-else-if="th.oper && th.oper.name == 'dic'"
                    :style="{background:th.oper.styleBg && th.oper.styleBg[scope.row[th.field]],color:th.oper.styleColor}">{{ scope.row[th.field] | filterDic(th.oper)}}</span>
              <span v-else-if="th.oper && th.oper.name == 'link'">
                <span @click="detail(th.oper.clickFun,scope.row)"
                      class="link">{{ scope.row[th.field] }}</span>
              </span>
              <span v-else-if="th.oper && th.oper.name == 'showText'">
                <span>{{ scope.row[th.field]!=1 ?'未上传' : '已上传' }}</span>
              </span>
              <span v-else-if="th.oper && th.oper.name == 'linkDic'">
                <span @click="detail(th.oper.clickFun,scope.row)"
                      class="link">{{ scope.row[th.field] | filterDic(th.oper)}}</span>
              </span>
              <!-- 表格中按钮添加了flag和icon ,flag用于自定义class名修改样式，icon用于按钮图标。-->
              <!-- 公共按钮 编辑flag:update,icon:bianji  删除 flag:delete,icon:shanchu -->
              <span v-else-if="th.oper && th.oper.name == 'button'">
                <el-button v-for="(o, key) in th.oper.btnObj"
                           :key="key"
                           @click="o.clickFun(scope.row)"
                           plain
                           type="primary"
                           size="mini"
                           :class="o.flag"
                           v-permission="[o.permission]"><i class="DHCiconfont"
                     :class="'DHC-'+o.icon"></i>{{o.name}}
                </el-button>
              </span>
              <span v-else-if="th.oper && th.oper.name == 'button_v1'">
                <template>
                  <el-button v-for="(o, key) in th.oper.btnObj"
                             :key="key"
                             :disabled="o.noShowBtn(scope.row)"
                             @click="o.clickFun(scope.row)"
                             plain
                             size="mini"
                             :class="o.flag"
                             v-permission="[o.permission]"><i class="DHCiconfont"
                       :class="'DHC-'+o.icon"></i>{{o.name}}
                  </el-button>
                </template>
              </span>
              <span v-else-if="th.oper && th.oper.name == 'switch'">
                <el-switch v-model="scope.row[th.field]"
                           :active-value="th.oper.flag.on?th.oper.flag.on:flag.on"
                           :inactive-value="th.oper.flag.off?th.oper.flag.off:flag.off"
                           :active-text="th.oper.activeText ? th.oper.activeText : '启用'"
                           :inactive-text="th.oper.inactiveText ? th.oper.inactiveText : '停用'"
                           @change="th.oper.clickFun(scope.row)"
                           :disabled="th.oper.disabled && scope.row[th.field] == th.oper.disabled.num">
                </el-switch>
              </span>
              <span v-else>{{ scope.row[th.field] }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="currentChange"
                     @size-change="sizeChange"
                     @prev-click="prevClick"
                     @next-click="nextClick"
                     class="page"
                     :current-page="curPage"
                     :page-sizes="[10,30,50,100]"
                     :page-size="maxSize"
                     layout="prev,pager,next, jumper, total, sizes"
                     :total="recordCnt"></el-pagination>
    </div>
  </div>
</template>
<script>
import Bus from '@/common/script/bus.js';
export default {
  data() {
    return {
      that: this,
      loading: true,
      maxSize: 10,
      disabled: false,
      nextPage: '',
      prePage: '',
      recordCnt: 1,
      curPage: 1,
      tableData: [],
      tableHeader: this.param.tableHeader,
      flag: {
        on: '0',
        off: '1'
      },
      selectRow: []
    };
  },
  props: {
    param: {
      bussName: {
        type: String,
        default: function () {
          return '';
        }
      },
      tableDataFun: {
        type: Function,
        default: function () {
          return function () {};
        }
      },
      tableHeader: {
        type: Array,
        default: function () {
          return [];
        }
      },
      selectionShow: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      selectRow: {
        type: Array,
        default: function () {
          return [];
        }
      },
      btn: {
        type: Object,
        default: function () {
          return {};
        }
      }
    },
    tHeight: {
      type: String
    }
  },
  watch: {
    model: function (newVal) {
      this.$emit('update:msg', newVal);
    }
  },
  methods: {
    rowClick(row) {
      if (this.param.rowClickFun) {
        this.param.rowClickFun(row);
      }
    },
    detail(clickFun, row) {
      this.$store.dispatch('user/setModaltState', 'detail');
      clickFun(row);
    },
    addModal(bussName, _this) {
      if (bussName == 'erg' || bussName == 'erh' || bussName == 'eri') {
        this.$store.dispatch('user/setOperatState', 'add');
        this.$router.push({
          path: '/' + bussName + '-edit',
          query: {
            custId: this.param.where.search_EQ_custId,
            deptCode: this.param.where.search_EQ_deptCode
          }
        });
      } else {
        // _this 这个是传过来的this 相当于是collapse.vue 的 this;

        this.$store.dispatch('user/setModaltState', 'add');
        _this[bussName + 'Edit'] = true;
        Bus.$off(bussName);
        Bus.$on(bussName, () => {
          this.getTableData();
        });
        _this.paramEdit = {
          title: '',
          dialogTitle:
            _this.collapseList[bussName + 'Table'].editTitle + '新增页',
          id: null,
          url: this.$urlList[bussName].create
        };
      }
    },
    updateModal(bussName, _this) {
      if (this.selectRow && this.selectRow.length == 1) {
        if (bussName == 'erg' || bussName == 'erh' || bussName == 'eri') {
          this.$store.dispatch('user/setModaltState', 'edit');
          this.$router.push({
            path: '/' + bussName + '-edit',
            query: {
              id: this.selectRow[0].id
            }
          });
        } else {
          this.$store.dispatch('user/setModaltState', 'edit');
          _this[bussName + 'Edit'] = true;
          Bus.$off(bussName);
          Bus.$on(bussName, () => {
            this.getTableData();
          });
          _this.paramEdit = {
            title: '',
            dialogTitle:
              _this.collapseList[bussName + 'Table'].editTitle + '编辑页',
            id: this.selectRow[0].id,
            url: this.$urlList[bussName].update
          };
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条进行操作',
          type: 'warning',
          duration: '800'
        });
      }
    },
    deletemodel(bussName, _this) {
      let that = this;
      if (this.selectRow && this.selectRow.length > 0) {
        let ids;
        let idArr = [];
        if (this.selectRow.length == 1) {
          ids = this.selectRow[0].id;
        } else {
          for (var i = 0; i < this.selectRow.length; i++) {
            idArr.push(this.selectRow[i].id);
          }
          ids = idArr.join(',');
        }
        this.common.MessageBoxconfirm(
          '确定删除？',
          '',
          '确定',
          '取消',
          'warning',
          true,
          function (action, instance) {
            if (action == 'confirm') {
              that.http
                .apiPost(that.$urlList[bussName]['delete'], {
                  id: ids
                })
                .then((res) => {
                  that.common.submitMsg(res).then(() => {
                    that.getTableData();
                  });
                });
            }
          }
        );
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条以上进行操作',
          type: 'warning',
          duration: '800'
        });
      }
    },
    currentChange(val) {
      this.curPage = val;
      this.getTableData();
    },
    sizeChange(val) {
      this.maxSize = val;
      this.curPage = 1;
      this.getTableData();
    },
    prevClick(val) {
      this.curPage = val;
      this.getTableData();
    },
    nextClick(val) {
      this.curPage = val;
      this.getTableData();
    },
    getTableData() {
      if (this.param.getTableData) {
        this.param.getTableData();
        return;
      }
      let paramData = {};
      if (this.$route.path == '/interceptA') {
        paramData = {
          params: {
            curPage: this.curPage,
            maxSize: this.maxSize,
            search_EQ_bussType: 'A'
          }
        };
      } else if (this.$route.path == '/interceptR') {
        paramData = {
          params: {
            curPage: this.curPage,
            maxSize: this.maxSize,
            search_EQ_bussType: 'R'
          }
        };
      } else if (this.$route.path == '/rptWhiteListA') {
        paramData = {
          params: {
            curPage: this.curPage,
            maxSize: this.maxSize,
            search_EQ_bussType: 'A'
          }
        };
      } else if (this.$route.path == '/rptWhiteListR') {
        paramData = {
          params: {
            curPage: this.curPage,
            maxSize: this.maxSize,
            search_EQ_bussType: 'R'
          }
        };
      } else {
        paramData = {
          params: {
            curPage: this.curPage,
            maxSize: this.maxSize
          }
        };
      }
      // 遍历检索条件form对象，每一项添加在请求报文params中
      if (this.param.form) {
        for (let i in this.param.form) {
          if (this.param.form[i]) {
            paramData.params[i] = this.param.form[i];
          }
        }
      }
      if (this.param.where) {
        for (let j in this.param.where) {
          if (this.param.where[j] || this.param.where[j] === 0) {
            paramData.params[j] = this.param.where[j];
          }
        }
      }
      // 根据id判断在哪个菜单中，获取对应的json路径对象
      let url = '';
      //   if (window.sessionStorage.id == '10000000') {
      //     urlList = '$urlList';
      //   } else if (window.sessionStorage.id == '20000000') {
      //     urlList = '$creditPerUrl';
      //   } else if (window.sessionStorage.id == '30000000') {
      //     urlList = '$creditEnUrl';
      //   }
      // 判断页面是否有配置表格的请求接口路径，若没配默认用getpage。
      // 配置接口路径适用于详情等弹框页面的表格
      if (!this.param.getDataUrl) {
        url = this.$urlList[this.param.bussName].getPage;
      } else {
        url = this.param.getDataUrl;
      }
      // let url = this[urlList][this.param.bussName].getPage;
      // "../static/js/test.json"
      this.http.apiGet(url, paramData).then((res) => {
        // res.list[0]["delegationPolicy"] = 1
        if (res.list) {
          for (var i = 0; i < res.list.length; i++) {
            res.list[i].stopFlag =
              res.list[i].stopFlag == null ? '0' : res.list[i].stopFlag;
            res.list[i].lockFlag =
              res.list[i].lockFlag == null ? '0' : res.list[i].lockFlag;
          }
        }
        this.tableData = res.list || [];
        this.recordCnt = res.recordCnt;
        this.selectRow = [];
        if (this.param.tableDataFun) {
          this.param.tableDataFun();
        }
      });
    },
    selectFun(selection, row) {
      this.selectRow = selection;
    },
    selectAll(selection) {
      this.selectRow = selection;
    },
    selectionChange(selection) {}
  },
  created() {
    let that = this;
    this.tableHeader.filter(function (item) {
      let url;
      if (
        item.oper &&
        (item.oper.name == 'dic' || item.oper.name == 'linkDic')
      ) {
        if (item.oper.type == 'deptCode') {
          url = that.$urlList.common.getDeptCodeName;
        } else if (item.oper.realTimeUrl) {
          url = item.oper.realTimeUrl;
        } else {
          url = that.$urlList.common.dic;
        }
        that.common.getdic(url, item.oper.type);
      }
    });
    this.getTableData();
  },
  mounted() {
    Bus.$on('init', () => {
      this.getTableData();
    });
  },
  destroyed() {
    /**
     * Bus这个事件需要解绑，要不然路由切换回缓存之前的调用
     */
    Bus.$off('init');
  }
};
</script>
<style scoped>
.el-table .cell.el-tooltip span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
}

.el-table .el-button--mini {
  padding: 4px 10px;
}

.link {
  color: #66b1ff;
  cursor: pointer;
}

.el-pagination {
  text-align: right;
}
.el-table__body .update {
}
.el-table__body .delete {
}
</style>
