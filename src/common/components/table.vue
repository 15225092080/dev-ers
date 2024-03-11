<template>
    <div class="table-wrap">
        <div>
            <el-table border :data.sync="tableData" size="mini" stripe :height="tHeight ? tHeight : 420" row-key="id" @select="selectFun"
                @cell-mouse-enter="handleMouseEnter"
                @cell-mouse-leave="handleMouseOut"
                @select-all="selectAll"  :tree-props="{children: 'children'}">
                <el-table-column type="selection" width="55" :selectable="selectableFun"  v-if="selection"></el-table-column>
                <!--&lt;!&ndash; prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper:&ndash;&gt;
            &lt;!&ndash;是否有操作列&ndash;&gt;
            &lt;!&ndash;oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 &ndash;&gt;-->
                <el-table-column v-for="(th, key) in tableHeader" :key="key" :prop="th.field" :label="th.title"
                    :fixed="th.fixed" :show-overflow-tooltip="!th.tooltip" :min-width="th.width" :align="th.align?th.align:'center'">
                    <!--加入template主要是对列的操作，dic表示字典，link表示详情，button表示按钮操作，swich表示开关-->
                    <template slot-scope="scope">
                        <div>
                            <!-- <span v-if="th.oper && th.oper.name == 'dic'":style="{color:th.oper.styleColor[scope.row[th.field]]}">{{th.styleColor}}{{key}}</span> -->
                            <slot v-if="th.slotName" :name="th.slotName" :data="{row:scope.row,th:th}"></slot>
                            <span v-else-if="th.oper && th.oper.name == 'dic'" :style="{color:th.oper.styleColor && th.oper.styleColor[scope.row[th.field]]}">{{ scope.row[th.field] | filterDic(th.oper)}}</span>
                            <span v-else-if="th.oper && th.oper.name == 'area'">{{ scope.row[th.field] | filterDic(th.oper.fun)}}</span>
                            <span v-else-if="th.oper && th.oper.name == 'link'">
                                <span @click="th.oper.clickFun(scope.row)" class="link">{{ scope.row[th.field] }}</span>
                            </span>
                            <!-- 表格中按钮添加了flag和icon ,flag用于自定义class名修改样式，icon用于按钮图标。-->
                            <!-- 公共按钮 编辑flag:update,icon:bianji  删除 flag:delete,icon:shanchu -->
                            <span v-else-if="th.oper && th.oper.name == 'button'" style="display:inline;">
                                <!-- <el-button v-for="(o, key) in th.oper.btnObj" :key="key" @click="o.clickFun(scope.row)"
                                    size="mini" :class="o.flag" v-permission="[o.permission]"><i class="DHCiconfont" :class="'DHC-'+o.icon"></i>{{o.name}}
                                </el-button> -->
                                <el-button v-for="(o, key) in th.oper.btnObj" :key="key" @click="o.clickFun(scope.row)"
                                    size="mini" :class="buttonText(scope.row,o).flag" v-permission="[o.permission]"><i class="DHCiconfont" :class="'DHC-'+buttonText(scope.row,o).icon"></i><span style="display:inline;" v-text="buttonText(scope.row,o).name"></span>
                                </el-button>
                            </span>
                            <span v-else-if="th.oper && th.oper.name == 'switch'" style="width:140px;display:inline-block">
                                <el-switch  v-permission="[th.oper.permission]" v-model="scope.row[th.field]"
                                    :active-value="th.oper.flag.on?th.oper.flag.on:flag.on"
                                    :inactive-value="th.oper.flag.off?th.oper.flag.off:flag.off"
                                    :active-text="th.oper.activeText ? th.oper.activeText : '启用'"
                                    :inactive-text="th.oper.inactiveText ? th.oper.inactiveText : '停用'"
                                    @change="th.oper.clickFun(scope.row)"
                                    :disabled="th.oper.disabled && scope.row[th.field] == th.oper.disabled.num&&scope.row['orgCode']==ms_orgCode||scope.row['userId']==ms_userId"
                                    :width="60">
                                </el-switch>
                            </span>
                            <span v-else>{{ scope.row[th.field] }}</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="currentChange" @size-change="sizeChange" @prev-click="prevClick"
                @next-click="nextClick" class="page" :current-page.sync="curPage" :page-sizes="[10,30,50,100]" :page-size="maxSize"
                layout="slot,prev,pager,next, jumper, sizes" :total="recordCnt" v-if="!pagination">
                <span class="el-pagination-slot">本页显示:{{interval}}&nbsp;&nbsp;总计条数:{{recordCnt}}</span>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Bus from '../script/bus';
export default {
  data() {
    return {
      loading: true,
      maxSize: 10,
      disabled: false,
      nextPage: '',
      prePage: '',
      recordCnt: 0,
      curPage: 1,
      tableData: [],
      tableHeader: this.param.tableHeader,
      flag: {
        on: '0',
        off: '1'
      },
      selectRow: [],
      ms_userId: localStorage.getItem('ms_userId'),
      ms_orgCode: localStorage.getItem('ms_orgCode')
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
      tableHeader: {
        type: Array,
        default: function () {
          return [];
        }
      },
      noGetData: {
        type: Boolean
      }
    },
    tHeight: {
      type: Number
    },
    selection: {
      type: Boolean // 是否展示前面的勾选框 默认false
    },
    pagination: {
      type: Boolean
    },
    selectableFun: {
      type: Function
    },
    mouseEnter: {
      type: Function
    },
    mouseLeave: {
      type: Function
    }
  },
  watch: {
    model: function (newVal) {
      this.$emit('update:msg', newVal);
    }
  },
  computed: {
    interval: function () {
      let total = this.curPage * this.maxSize;
      if (this.curPage == 1) {
        return this.curPage + '-' + total;
      } else {
        let start = total - this.maxSize + 1;
        if (this.recordCnt < total) {
          total = this.recordCnt;
        }
        return start + '-' + total;
      }

      // return this.curPage
    },
    buttonText: function(){
       return function(row,o){
        if(o && o.funText && o.funText(row)){
          return o.funText(row);
        }
        return o;

      }
    }
  },
  methods: {
    handleMouseEnter(row, column, cell, event){
        if(this.mouseEnter){
            this.mouseEnter(row, column, cell, event)
        }
    },
    handleMouseOut(row, column, cell, event){
        if(this.mouseLeave){
            this.mouseLeave(row, column, cell, event)
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
      let paramData = {
        params: {
          curPage: this.curPage,
          maxSize: this.maxSize
        },
        showLoading: true
      };
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
      // 判断页面是否有配置表格的请求接口路径，若没配默认用getpage。
      // 配置接口路径适用于详情等弹框页面的表格
      if (!this.param.getDataUrl) {
        url = this.$urlList[this.param.bussName].getPage;
      } else {
        url = this.param.getDataUrl;
      }
      // let url = this[urlList][this.param.bussName].getPage;
      // "../static/js/test.json"
      this.http.apiGet(url, paramData).then(res => {
        // res.list[0]["delegationPolicy"] = 1
        if(res.code != 0){
            this.common.MessageBoxalert(res.message, '消息', '确认', 'error');
            return;
        }
        if (res.list) {
          for (var i = 0; i < res.list.length; i++) {
            res.list[i].stopFlag = res.list[i].stopFlag === null ? '0' : res.list[i].stopFlag;
            res.list[i].lockFlag = res.list[i].lockFlag === null ? '0' : res.list[i].lockFlag;
          }
        }
        // this.tableData =res['data']['rows']?res['data']['rows']:res['data'];
        this.tableData = res.data.rows ? res.data.rows : [];
        this.$store.dispatch('table/setTableData', this.tableData);
        this.recordCnt = res.data.total;
        this.selectRow = [];
      });
    },
    selectFun(selection) {
    // selectFun(selection, row) {
      this.selectRow = selection;
    },
    selectAll(selection) {
      this.selectRow = selection;
    }
    // ,selectionChange(selection) {}
  },
  created() {
    this.ms_userId = localStorage.getItem('ms_userId');
    this.ms_orgCode = localStorage.getItem('ms_orgCode');
    let that = this;
    this.tableHeader.filter(function (item) {
      // let type, url, index;
      let url;
      if (item.oper && item.oper.name == 'dic') {
        if (item.oper.realTimeUrl) {
          // 表格列数据需实时请求
          url = item.oper.realTimeUrl;
          that.common.realTimeRequest(url, item.oper.type);
        } else {
          // 表格列数据从字典获取
          url = that.$urlList.common.dic;
          that.common.getdic(url, item.oper.type);
        }
      }
    });
    setTimeout(() => {
      if (!this.param.noGetData) {
        this.getTableData();
      }
    }, 500);
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
        width: 100%;
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
         position: relative
    }
    .el-pagination-slot{
        position: absolute;
        left:0
    }
    /* .el-table__body .update{

    }
    .el-table__body .delete{

    } */
</style>
