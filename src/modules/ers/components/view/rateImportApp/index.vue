<template>
  <div class="querypage"
       v-loading="loading"
       element-loading-text=""
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="100px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe683;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       @click="uploaddia"
                       plain><i class="DHCiconfont">&#xe6c3;</i>央评中心文件上传</el-button>
          </li>
          <li>
            <el-button class="delete_btn"
                       plain
                       @click="errExcelFun">
              <i class="iconfont DHCiconfont DHC-jiaoseguanli"></i>错误导出
            </el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <v-detail ref="childDetails"
              v-if="visible"
              :vis.sync="visible"
              :paramDetail="paramDetail"></v-detail>
    <el-dialog :title="upload.title"
               :visible.sync="upload.open"
               width="360px"
               append-to-body>
      <el-upload ref="upload"
                 name="files"
                 :multiple="true"
                 :action="upload.url"
                 :accept="upload.accept"
                 :headers="upload.headers"
                 :disabled="upload.isUploading"
                 :on-change="handleFileChange"
                 :before-remove="handleFileRemove"
                 :auto-upload="false"
                 :file-list="upload.fileList"
                 drag>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip"
             style="color:red"
             slot="tip">提示：仅允许导入“txt”格式文件！</div> -->
      </el-upload>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitFileForm">确 定</el-button>
        <el-button type="info"
                   @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import vDetail from './model/detail';
import MinXin from '@/common/script/mixin';
export default {
  name: 'rateImportApp',
  mixins: [MinXin],
  inject: ['reload'],
  components: {
    vDetail,
  },
  data() {
    return {
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '央评中心文件上传列表',
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        accept: '.xls',
        headers: {},
        // 上传的地址
        url: '',
        fileList: [],
        // fileName: [],
      },
      timer: null,
      title: '',
      visible: false,
      loading: false,
      detailUrl: {
        isTime: 'search_GTE_LTE_fileCreateDate_DATE_RANGE',
        url: this.$urlList.rateImportApp.getValUrl, // 请求详情的url
        isPreview: true, // 是否有预览功能
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      paramDetail: {
        title: '',
        dialogTitle: '央评中心文件导入',
      },
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_fileType',
            value: '',
            label: '文件类型',
            span: 6,
          },
          {
            type: 'daterange',
            name: 'search_GTE_LTE_fileCreateDate_DATE_RANGE',
            value: '',
            label: '文件生成日期',
            span: 6,
          },
          // {
          //   type: 'select',
          //   name: 'search_LIKE_infRecType',
          //   value: '',
          //   label: '报文类型',
          //   span: 6,
          //   url: this.$urlList.verper.dic,
          //   param: 'InfRecType',
          // },
          {
            type: 'input',
            name: 'search_LIKE_batchNum',
            value: '',
            label: '批次号',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_GT_errNum',
            value: '',
            label: '失败数大于',
            span: 6,
          },
        ],
      ],
      paramTable: {
        bussName: 'rateImportApp',
        tableHeader: [
          {
            field: 'batchNum',
            title: '批次号',
            width: 150,
            tooltip: true,
            oper: {
              name: 'link',
              clickFun: this.detailFuns,
            },
          },
          {
            field: 'fileType',
            title: '文件类型',
            width: 130,
            tooltip: true,
          },
          {
            field: 'totalNum',
            title: '导入总数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'successNum',
            title: '导入成功数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'errNum',
            title: '失败数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'addNum',
            title: '新增数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'changeNum',
            title: '修改数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'outNum',
            title: '过时数',
            width: 100,
            tooltip: true,
          },
          {
            field: 'getTime',
            title: '入库时间',
            width: 120,
            tooltip: true,
          },
          {
            field: 'fileName',
            title: '文件名称',
            width: 150,
            tooltip: true,
          },
          {
            field: 'fileCreateDate',
            title: '文件生成日期',
            width: 150,
            tooltip: true,
          },
          {
            field: 'importState',
            title: '导入状态',
            width: 100,
            tooltip: false,
            // oper: {
            //   name: 'dic',
            //   type: 'PER_IMPORT_STAGE',
            //   // 实时请求的表格列数据url
            //   realTimeUrl: this.$urlList.verper.dic,
            // },
          },
        ],
      },
    };
  },
  watch: {},
  methods: {
    fileupload(file) {
      // console.log(file);
      this.common.submitMsg(file);
      window.reload();
    },
    errExcelFun() {
      let batchNums = [];
      if (
        this.$refs.dataTable.selectRow &&
        this.$refs.dataTable.selectRow.length > 0
      ) {
        let data = this.$refs.dataTable.selectRow;
        if (this.$refs.dataTable.selectRow.length == 1) {
          if (data[0].importState == '2' || data[0].errNum > 0) {
            batchNums = data[0].batchNum;
          }
        } else {
          for (var i = 0; i < data.length; i++) {
            if (data[i].importState == '2' || data[i].errNum > 0) {
              batchNums.push(data[i].batchNum);
            }
          }
        }
        if (batchNums != '') {
          if (typeof batchNums == 'object') {
            batchNums = batchNums.join(',');
          }
          this.common.downLoad(this.$urlList.rateImportApp.exportExcel, {
            batchNums: batchNums,
          });
        } else {
          this.common.MessageBoxalert(
            '没有符合要求的文件可导出！',
            '消息',
            '确认',
            'error'
          );
        }
      } else {
        this.common.MessageBoxalert(
          '请选择1条以上进行操作！',
          '消息',
          '确认',
          'error'
        );
      }
    },
    // 报文文件上传弹窗
    uploaddia() {
      this.upload.open = true;
    },
    // 上传发生变化钩子
    handleFileChange(file, fileList) {
      this.upload.fileList = fileList;
    },
    // 删除之前钩子
    handleFileRemove(file, fileList) {
      this.upload.fileList = fileList;
    },
    // 提交上传文件
    submitFileForm() {
      this.upload.open = false;
      this.loading = true;
      //  创建新的数据对象
      let formData = new FormData();
      //  将上传的文件放到数据对象中
      this.upload.fileList.forEach((file) => {
        formData.append('file', file.raw);
      });
      // 自定义上传
      console.log(formData.getAll('file'));
      axios({
        url: 'rateImportApp/upload',
        method: 'post',
        data: formData,
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=----WebKitFormBoundaryE9O7un0Mvy0fNFtB',
        },
      })
        .then((res) => {
          this.upload.open = false;
          this.upload.isUploading = false;
          this.$refs.upload.clearFiles();
          this.upload.fileList = [];
          if (res.data.code == '00000002') {
            this.timer = setInterval(() => {
              this.filecheckProcess();
            }, 5000);
          } else {
            this.loading = false;
            this.common.MessageBoxalert(res.data.msg, '消息', '确认', 'error');
            this.$refs.dataTable.getTableData();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filecheckProcess() {
      this.http
        .apiGet(this.$urlList.rateImportApp.importProcess)
        .then((res) => {
          if (res.code != '2' || res.code != '3') {
            this.loading = false;
            clearInterval(this.timer);
            this.common.MessageBoxalert(
              res.message || res.msg,
              '消息',
              '确认',
              'success'
            );
            window.reload();
          }
        });
    },
  },
  created() {},
  mounted() {},
  computed: {},
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>
<style scoped="scoped">
.icongroup li:first-child > div {
  position: relative;
  top: 10px;
  height: 36px;
}
.loading {
  width: 300px;
  height: 300px;
}
.box_message {
  word-break: break-word;
}
</style>
