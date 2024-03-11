<template>
        <div class="table-wrap">
            <el-table border :data.sync="tableData" size="mini" :class="configRowKey" :height="height" :row-key=" configRowKey ? this.param.config.rowKey :'resourceId'" @select="selectFun"
                @select-all="selectAll" @selection-change="selectionChange" :tree-props="{children: 'children'}" default-expand-all>
                <!--&lt;!&ndash; prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper:&ndash;&gt;
            &lt;!&ndash;是否有操作列&ndash;&gt;
            &lt;!&ndash;oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 &ndash;&gt;-->
                <el-table-column v-for="(th, key) in tableHeader" :key="key" :prop="th.field" :label="th.title"
                    :fixed="th.fixed" :show-overflow-tooltip="!th.class" :class-name="th.class" :min-width="th.width" :align="th.align?th.align:'left'">
                    <!--加入template主要是对列的操作，dic表示字典，link表示详情，button表示按钮操作，swich表示开关-->
                    <template slot-scope="scope">
                            <tt  v-if="th.oper && th.oper.name == 'dicStyle'"
                            :style="{color:th.oper.styleColor && th.oper.styleColor[scope.row[th.field]],
                            cursor: scope.row[th.field] == th.oper.styleColor.cursor ? 'pointer' : 'default' }" @click="th.oper.clickFun(scope.row)">
                               {{ scope.row[th.field] | filterDic(th.oper)}}</tt>
                            <tt  v-else-if="th.oper && th.oper.name == 'dic'">
                               {{ scope.row[th.field] | filterDic(th.oper)}}</tt>
                            <slot v-else-if="th.oper && th.oper.name == 'customName'" name="customTooltip" :data="{list:scope.row,field:th.field}"></slot>
                            <tt v-else-if="th.oper && th.oper.name == 'link'">
                                <span @click="th.oper.clickFun(scope.row)" class="link">{{ scope.row[th.field] }}</span>
                            </tt>
                            <!-- 表格中按钮添加了flag和icon ,flag用于自定义class名修改样式，icon用于按钮图标。-->
                            <!-- 公共按钮 编辑flag:update,icon:bianji  删除 flag:delete,icon:shanchu -->
                            <tt v-else-if="th.oper && th.oper.name == 'button'">
                                <el-button v-for="(o, key) in th.oper.btnObj" :key="key" @click="o.clickFun(scope.row)"
                                    plain size="mini" :class="o.flag"><i class="DHCiconfont" :class="'DHC-'+o.icon"></i>{{o.name}}
                                </el-button>
                            </tt>
                            <tt v-else-if="th.oper && th.oper.name == 'switch'">
                                <el-switch v-model="scope.row[th.field]"
                                    :active-value="th.oper.flag.on?th.oper.flag.on:flag.on"
                                    :inactive-value="th.oper.flag.off?th.oper.flag.off:flag.off"
                                    :active-text="th.oper.activeText ? th.oper.activeText : '启用'"
                                    :inactive-text="th.oper.inactiveText ? th.oper.inactiveText : '停用'"
                                    @change="th.oper.clickFun(scope.row)"
                                    :disabled="th.oper.disabled && scope.row[th.field] == th.oper.disabled.num">
                                </el-switch>
                            </tt>
                            <tt href="#" v-else-if="th.oper && th.oper.name == 'indent'" :style="{margin:scope.row.level ? scope.row.level * 20 +'px' : ''}">{{ scope.row[th.field] }}</tt>
                           <tt href="#" v-else-if="configRowKey">{{ scope.row[th.field] }}</tt>
                           <tt href="#" v-else :class= "[scope.row.children.length == 0? (scope.row.resourceType == 'A'?(th.field == 'resourceName'?'noChildren':''):''):'']">{{ scope.row[th.field] }}</tt>
                    </template>
                </el-table-column>
            </el-table>
        </div>
</template>
<script>
import Bus from '../script/bus';
export default {
  data() {
    return {
      disabled: false,
      nextPage: '',
      prePage: '',
      recordCnt: 1,
      tableData: [],
      tableHeader: this.param.tableHeader,
      flag: {
        on: '0',
        off: '1'
      },
      height: '60vh',
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
      tableHeader: {
        type: Array,
        default: function () {
          return [];
        }
      }
    }
  },
  watch: {
    model: function (newVal) {
      this.$emit('update:msg', newVal);
    }
  },
  computed: {
    configRowKey: function () {
      return this.param.config && this.param.config.rowKey;
    }
  },
  methods: {
    indent(parent, data, index) {
      data.forEach((x) => {
        x.level = index;
        if (x.children && x.children.length > 0) {
          this.indent(parent, x.children, index + 1);
        }
      });
      return data;
    },
    getTableData() {
      let paramData = {
        params: {
          curPage: this.curPage,
          maxSize: this.maxSize
        }
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
      // let urlList = "",url = '';
      // if(window.sessionStorage.id == "10000000"){
      //     urlList = "$urlList";
      // }else if(window.sessionStorage.id == "20000000"){
      //     urlList = "$creditPerUrl";
      // }else if(window.sessionStorage.id == "30000000"){
      //     urlList = "$creditEnUrl";
      // }
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
        if (res.list) {
          for (var i = 0; i < res.list.length; i++) {
            res.list[i].stopFlag = res.list[i].stopFlag == null ? '0' : res.list[i].stopFlag;
            res.list[i].lockFlag = res.list[i].lockFlag == null ? '0' : res.list[i].lockFlag;
          }
        }
        //  这个属性是表格的唯一值 row-key
        if (this.configRowKey) {
          res.data[0].stepHisId = -1;
          if (res.data.length > 0) {
            let index = 0;
            let data = this.indent([], res.data, index);
            this.tableData = data;
          } else {
            this.tableData = [];
          }
        } else {
          this.tableData = res.data.rows;
        }
        this.recordCnt = res.data.total;
        this.selectRow = [];
      });
    },
    selectFun(selection) {
      this.selectRow = selection;
    },
    selectAll(selection) {
      this.selectRow = selection;
    },
    selectionChange() {}
  },
  created() {
    let that = this;
    this.tableHeader.filter(function (item) {
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
<style>
    .stepHisId.el-table [class*=el-table__row--level] .el-table__expand-icon{
        display: none;
    }
</style>
<style scoped>
    .el-table .cell.el-tooltip span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .el-table .el-button--mini {
        padding: 4px 10px;
    }
    .el-table .noChildren{
        padding-left: 20px;
    }
    .link {
        color: #66b1ff;
        cursor: pointer;
    }

    .el-pagination {
        text-align: right;
    }
</style>
