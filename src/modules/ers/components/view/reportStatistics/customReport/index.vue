<template>
  <div class="querypage">
    <v-operation ref="filter" v-if="operationShow" v-bind:arrList="arrList" :searchFun="searchFun" labelWidth = "100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header" class="clearfix">
        <span>
          <!-- <i class="DHCiconfont">&#xe66a;</i>检索结果 -->
        </span>
        <li>
            <el-button type="primary" @click="exportTable">
              <i class="DHCiconfont">&#xe668;</i>导出
            </el-button>
        </li>
      </div>
      <div v-if="tableData">
          <div class="tableName">
              {{title}}
          </div>
        <el-table
            :data="tableData"
            max-height="400">
            <!-- <el-table-column
            fixed
            prop="date"
            label="日期"
            width="150">
            </el-table-column> -->
            <el-table-column
                :show-overflow-tooltip="true"
                v-for="(item,i) in displayConfigs"
                :key="i"
                :prop="i + ''"
                :label="item.displayValue"
            >
            </el-table-column>
        </el-table>
        <el-pagination @current-change="currentChange" @size-change="sizeChange" @prev-click="prevClick"
                @next-click="nextClick" class="page" :curPage="curPage" :page-sizes="[10,30,50,100]" :page-size="maxSize"
                layout="prev,pager,next, jumper, total, sizes" :total="recordCnt" v-if="pageTrue"></el-pagination>
        <!-- <v-table ref="dataTable" :param="paramTable"></v-table> -->
      </div>
    </el-card>
  </div>
</template>

<script>
// import axios from "axios";
import MinXin from '@/common/script/mixin';
export default {
  name: 'customReport',
  mixins: [MinXin],
  components: {
  },
  inject: ['reload'],
  data() {
    return {
        operationShow: false,
        pageTrue: true,
        title: '',
        tableData: '',
        cusFormNum: '',
        curPage: 1,
        maxSize: 10,
        recordCnt: 1,
        exportData: [],
      // 检索条件form表单
      arrList: [
        [
          {type: 'input', name: 'search_EQ_custId', value: '', label: '客户号', span: 6},
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {children: 'children',
              label: function (a, b) {
                return a.name
                ;
              }},
            name: 'search_IN_deptCode',
            value: '',
            label: '所属机构',
            span: 6
          },
          {type: 'input', name: 'search_EQ_name', value: '', label: '姓名', span: 6},
          {type: 'select', name: 'search_EQ_idType', value: '', param: 'E_InfoIDType2', label: '证件类型', span: 6}
        ],
        [
          {type: 'input', name: 'search_EQ_idNum', value: '', label: '证件号码', span: 6},
          {type: 'select', name: 'search_EQ_reportState', value: '', param: 'E_REPORT_STATE', label: '报送状态', span: 6},
          {type: 'select', name: 'search_EQ_dataState', value: '', param: 'E_DATA_STATE', label: '数据状态', span: 6}
          // {type: 'date', name: 'search_GTE_LTE_bussDate_DATE_RANGE', value: '', param: 'DATA_STATE', label: '业务发生日期', span: 6}
        ]
      ],
      detailUrl: {

      }
    };
  },
  watch: {
  },
  methods: {
    exportTable() {
      // 纯前端导出
      const tHeader = [];// 要导出后表头是什么，可以跟tableDate中的表头不一致
      const filterVal = [];
      this.displayConfigs.forEach(element => {
        tHeader.push(element.displayValue);
      });
      for (let index = 0; index < tHeader.length; index++) {
        filterVal.push(index);
      }
      this.c.handleExportList(tHeader, filterVal, this.tableData, '自定义报表列表');
    },
    searchFun() {
        let formData = this.$refs.filter.$refs.formItem.formItem;
        if (this.resData.objectData && this.resData.objectData[0].conditionType != undefined && this.resData.objectData[0].conditionType != '') {
            for (let i = 0; i < this.resData.objectData.length; i++) {
                 this.resData.objectData[i].value = formData[this.resData.objectData[i].conditionCode];
            }
        } else {
            this.resData.objectData = [];
        }
        this.getTableData();
    },
    currentChange(val) {
      this.curPage = val;
      this.init();
    },
    sizeChange(val) {
      this.maxSize = val;
      this.curPage = 1;
      this.init();
    },
    prevClick(val) {
      this.curPage = val;
      this.init();
    },
    nextClick(val) {
      this.curPage = val;
      this.init();
    },
    init() {
        this.arrList = [];
        // let resData = {"code":"00000000","msg":"请求成功",
        //     "objectData":[
        //         {"conId":"1","conditionCode":"DEPT_CODE","conditionType":1,"conditionValue":"所属机构","flag":0,"formNum":"1"},
        //         {"conId":"2","conditionCode":"ORG_ENTITY","conditionType":1,"conditionValue":"法人实体","flag":0,"formNum":"1"},
        //         {"conId":"3","conditionCode":"ACCT_TYPE","conditionType":3,"conditionValue":"账户类型","dicCode":"AcctType_PL","flag":0,"formNum":"1"},
        //         {"conId":"2","conditionCode":"GENDER","conditionType":3,"conditionValue":"性别","flag":1,"formNum":"1",
        //         "list":[
        //             {"arrayCode":"0","arrayQue":1,"arrayValue":"女","conId":"2","id":"1"},
        //             {"arrayCode":"1","arrayQue":2,"arrayValue":"男","conId":"2","id":"2"}
        //         ]}
        //     ]
        // };
        let data = {
            params: {
                formNum: this.$route.query.formNum
            }
        };
        this.http.apiGet(this.$urlList.customize.getParams, data).then(resData => {
            this.resData = resData;
            if (resData.code == '00000000') {
              // let objData = resData.objectData ? resData.objectData : [];
                let objData = resData.objectData;
                if (objData != undefined) {
                  for (let i = 0; i < objData.length; i++) {
                    this.cusFormNum = objData[0].formNum;
                    if (objData[i].conditionType != undefined) {
                      if (objData[i].conditionCode.toLowerCase() == 'dept_code') { // 所属机构
                        this.arrList.push({
                          type: 'tree',
                          treeurl: this.$urlList.common.orgTree,
                          treetitle: '机构树',
                          defaultProps: {children: 'children',
                          label: function (a, b) {
                              return a.name
                              ;
                          }},
                          name: objData[i].conditionCode,
                          value: '',
                          label: objData[i].conditionValue,
                          span: 6
                        });
                      } else if (objData[i].conditionType == '1') {
                        this.arrList.push({type: 'input', name: objData[i].conditionCode, value: '', label: objData[i].conditionValue, span: 6});
                      } else if (objData[i].conditionType == '2') {
                        this.arrList.push({type: 'date', name: objData[i].conditionCode, value: '', label: objData[i].conditionValue, span: 6});
                      } else if (objData[i].conditionType == '3') {
                        if (objData[i].list != undefined) {
                            let dataDic = {};
                            for (let j = 0; j < objData[i].list.length; j++) {
                                dataDic[objData[i].list[j].arrayCode] = objData[i].list[j].arrayValue;
                            }
                            this.arrList.push({type: 'select', name: objData[i].conditionCode, value: '', label: objData[i].conditionValue, customOption: dataDic, span: 6});
                        } else {
                            this.arrList.push({type: 'select', name: objData[i].conditionCode, value: '', param: objData[i].dicCode, label: objData[i].conditionValue, span: 6});
                        }
                      }
                    }
                  }
                  this.operationShow = true;
                  this.arrList = [this.arrList];
                }
            }
        });
    },
    getTableData() {
            let arr = this.resData.objectData;
            let data = {
                configList: JSON.stringify(arr),
                formNum: this.cusFormNum,
                curPage: this.curPage,
                maxSize: this.maxSize
            };
            this.http.apiPost(this.$urlList.customize.getPage, data).then(res => {
                let arr = [];
                if (res.code == '00000000') {
                    if (res.flag == 0) { // 0-要分页 1-不要分页
                      this.pageTrue = true;
                    } else {
                      this.pageTrue = false;
                    }

                    if (this.curPage == '1') {
                        this.displayConfigs = res.displayConfigs;
                    }
                    let resList = res.pageResult.list;
                    this.exportData = res.pageResult.list;
                    resList.forEach(function (item, index) {
                      let obj = {};
                      item.forEach(function (k, i) {
                          obj[i] = k;
                      });
                      arr.push(obj);
                    });
                    // for(let i = 0; i < res.pageResult.list.length; i++){
                    //     let obj = {};
                    //     for(let k in res.pageResult.list[i]){
                    //         obj[k] = res.pageResult.list[i][k]
                    //     }
                    //     arr.push(obj)
                    // }
                    this.recordCnt = res.pageResult.recordCnt;
                    this.title = res.title;
                    this.tableData = arr;
                } else {
                  this.$message.error(res.msg);
                }
            });
        }
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {
  }
};
</script>

<style scoped="scoped">
    .el-pagination {
        text-align: right;
    }
    .tableName{
        width: 100%;
        text-align: center;
        border: 1px solid #ccc;
        padding: 5px 0;
    }
    .el-table__header{
        width: 100% !important;
    }
    .el-table__body{
        width: 100% !important;
    }
</style>
