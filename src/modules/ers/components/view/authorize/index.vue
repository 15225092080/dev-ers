<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="200px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe6ce;</i>检索结果
        </span>
        <ul class="icongroup">

        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <el-dialog :title="upload.title"
               :visible.sync="upload.open"
               width="360px"
               append-to-body>
      <el-upload ref="upload"
                 name="file"
                 :multiple="false"
                 :action="upload.url"
                 :accept="upload.accept"
                 :headers="upload.headers"
                 :disabled="upload.isUploading"
                 :on-change="handleFileChange"
                 :before-remove="handleFileRemove"
                 :auto-upload="false"
                 :limit="1"
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
import MinXin from '@/common/script/mixin';
export default {
  name: 'authorize',
  mixins: [MinXin],
  components: {},
  data() {
    // 弹框相关
    return {
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '文件上传列表',
        // 是否禁用上传
        isUploading: false,
        // 设置上传的请求头部
        data: {},
        accept: '',
        headers: {},
        // 上传的地址
        url: '',
        fileList: [],
        // fileName: [],
      },
      timer: null,
      row: {},
      title: '',
      visible: false,
      loading: false,
      arrList: [
        [
          {
            type: 'input',
            name: 'search_LIKE_custId',
            value: '',
            label: '客户号',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'input',
            name: 'search_LIKE_entName',
            value: '',
            label: '企业名称',
            span: 6,
            rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }],
          },
          {
            type: 'select',
            name: 'search_EQ_entCertType',
            value: '',
            param: 'InfoIDType2',
            label: '企业身份标识类型',
            span: 6,
          },
          {
            type: 'input',
            name: 'search_LIKE_entCertNum',
            value: '',
            label: '企业身份标识号码',
            span: 6,
          },
        ],
        [
          {
            type: 'tree',
            treeurl: this.$urlList.common.orgTree,
            treetitle: '机构树',
            defaultProps: {
              children: 'children',
              label: function (a, b) {
                return a.name;
              },
            },
            name: 'search_IN_deptCode',
            value: '',
            label: '内部机构代码',
            span: 6,
          },
          {
            type: 'select',
            name: 'search_EQ_uploadFlag',
            value: '',
            customOption: { 0: '未上传', 1: '已上传' },
            label: '授权档案上传状态',
            span: 6,
          },
        ],
      ],
      paramTable: {
        bussName: 'authorize',
        tableHeader: [
          {
            // 详情demo
            field: 'custId',
            title: '客户号',
            width: 120,
          },
          {
            field: 'entName',
            title: '企业名称',
            width: 120,
          },
          {
            field: 'entCertType',
            title: '企业身份标识类型',
            width: 120,
            oper: {
              name: 'dic',
              type: 'InfoIDType2',
            },
          },
          {
            field: 'entCertNum',
            title: '企业身份标识号码',
            width: 120,
          },
          {
            field: 'deptCode',
            title: '内部机构代码',
            width: 120,
            oper: {
              name: 'dic',
              type: 'deptCode',
            },
          },
          {
            field: 'uploadFlag',
            title: '授权档案上传状态',
            width: 150,
            oper: {
              name: 'showText',
            },
          },
          {
            field: 'button',
            title: '操作',
            width: 100,
            tooltip: false,
            oper: {
              name: 'button_v1',
              btnObj: {
                edit: {
                  name: '上传',
                  icon: 'shangchuan',
                  flag: 'edit_btn',
                  clickFun: this.uploaddia,
                  noShowBtn: this.noShowBtnFalse,
                },
                delete: {
                  name: '下载',
                  icon: 'daochu',
                  flag: 'delete_btn',
                  clickFun: this.fileDowload,
                  noShowBtn: this.noShowBtn,
                },
              },
            },
          },
        ],
      },
      detailUrl: {
        delUrl: '',
        paramDataId: 'id', // 字段名
        id: 'id', // 获取表格数据的字段名
        resId: '', // 获取的id
      },
      tableData: [],
    };
  },
  watch: {},
  methods: {
    noShowBtnFalse() {
      return false;
    },
    noShowBtn(row) {
      return row.uploadFlag !== '1';
    },
    // 报文文件上传弹窗
    uploaddia(row) {
      this.row = row;
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
        url:
          'authorize/upload?custId=' +
          this.row.custId +
          '&&deptCode=' +
          this.row.deptCode,
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
          this.loading = false;
          this.$refs.upload.clearFiles();
          this.upload.fileList = [];
          if (res.data.code == '0') {
            this.common
              .MessageBoxalert(
                res.data.message || res.data.msg,
                '消息',
                '确认',
                'success'
              )
              .then(() => {
                window.reload();
              });
          } else {
            this.common.MessageBoxalert(res.data.msg, '消息', '确认', 'error');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fileDowload(row) {
      this.common.downLoad(this.$urlList.authorize.fileDowload, {
        custId: row.custId,
        deptCode: row.deptCode,
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
