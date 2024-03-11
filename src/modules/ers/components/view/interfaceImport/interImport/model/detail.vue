<template>
  <div>
    <v-collapse ref="collapse"
                :collapseList="collapseList"></v-collapse>
    <div class="classTab">
      <h3 class="tabTitle">具体表名详情</h3>
      <el-table :data="tableData"
                border
                class="tableClass">
        <el-table-column prop="tableName"
                         label="表名"></el-table-column>
        <el-table-column prop="chnTableName"
                         label="表中文名"></el-table-column>
        <el-table-column prop="totalNum"
                         label="总数"></el-table-column>
        <el-table-column prop="successNum"
                         label="成功数"></el-table-column>
        <el-table-column prop="errNum"
                         label="错误数"></el-table-column>
        <el-table-column prop="repeatNum"
                         label="接口重复数"></el-table-column>
        <el-table-column prop="unchangeNum"
                         label="无变化数据"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.taskStat == 1">{{ "导入成功" }}</span>
              <span v-if="scope.row.taskStat == 0">{{ "导入中" }}</span>
              <span v-if="scope.row.taskStat == 2">{{ "导入失败" }}</span>
              <span v-if="scope.row.taskStat == 9">{{ "无数据" }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
import vCollapse from '@/modules/ers/components/common/collapse.vue';
export default {
  name: 'child',
  components: {
    vCollapse,
  },
  data() {
    return {
      tableData: [],
      collapseList: {
        param: {
          routerReturn: '/interImport/list', // 返回跳转
          active: 0, // 锚点定位 默认值
        },
        item: [
          {
            name: 'interImport',
            title: '客户数据',
            showField: 'form',
            bind: 'arrList',
            findById: {
              // 表单赋值接口（编辑，详情用的较多）
              url: this.$urlList.interImport.getBatchNum, // 接口
              param: this.$route.query, // 参数
            },
            url: '',
            disabled: false,
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      this.collapseList.arrList = [
        [
          {
            type: 'input',
            name: 'batchNum',
            value: '',
            label: '批次号',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'beginTime',
            value: '',
            label: '批次开始时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'endTime',
            value: '',
            label: '批次结束时间',
            span: 12,
            disabled: true,
          },
          {
            type: 'select',
            name: 'batchStat',
            value: '',
            param: 'BATCH_STAT',
            label: '批次状态',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'totalNum',
            value: '',
            label: '总数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'successNum',
            value: '',
            label: '成功数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'errNum',
            value: '',
            label: '错误数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'repeatNum',
            value: '',
            label: '接口重复数',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'unchangeNum',
            value: '',
            label: '无变化数据',
            span: 12,
            disabled: true,
          },
          {
            type: 'input',
            name: 'operator',
            value: '',
            label: '操作员',
            span: 12,
            disabled: true,
          },
        ],
      ];
      this.getData();
    },
    // 获取下面表格数据
    getData() {
      this.http
        .apiPost(this.$urlList.interImport.getValUrl, this.$route.query)
        .then((res) => {
          this.tableData = res.list;
        });
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped="scoped">
.tabTitle {
  font-weight: normal;
  text-align: center;
  line-height: 40px;
  background-color: #efe;
}
.classTab {
  width: 85%;
  margin-top: 5px;
  margin-bottom: 30px;
  overflow: hidden;
}
</style>
