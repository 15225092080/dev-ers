<template>
  <div>
    <el-dialog :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               width="70%"
               custom-class="model-dialog el-dialog-s ui-online-data-dict-item-dialog">
      <span slot="title"
            class="clearfix">
        <span class="dialog-title">字典列表</span>
        <span class="dialog-title-bg"></span>
      </span>
      <div class="ui-content">
        <el-form :inline="true"
                 :model="form">
          <el-form-item label="名称">
            <el-input v-model.trim="form.itemText"
                      placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <o-select ref="select"
                      :options="statusOptions"
                      :clearable="true"
                      v-model="form.status"></o-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="query"
                       class="search_btn"><i class="DHCiconfont">&#xe6b1;</i>检索</el-button>
            <el-button @click="clearForm"
                       class="empty_btn"><i class="DHCiconfont">&#xe69e;</i>清空</el-button>
          </el-form-item>
        </el-form>
        <div class="btn-wrap">
          <el-button class="add_btn"
                     plain
                     @click="add"><i class="DHCiconfont">&#xe6c3;</i>创 建</el-button>
        </div>
        <v-table ref="dataTable"
                 tHeight="'atuo'"
                 :param="paramTable"></v-table>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button class="close_btn"
                   @click="closeDialog"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
      </div>
    </el-dialog>
    <dict-item-edit v-if="visibleEdit"
                    :dialogVisible.sync="visibleEdit"
                    :param="paramEdit"
                    @closed="closeEditDialog"></dict-item-edit>
  </div>
</template>
<script>
import dictItemEdit from './dict-item-edit.vue';
import oSelect from '../../common/components/select.vue';
export default {
  name: 'child',
  components: { dictItemEdit, oSelect },
  props: {
    param: {
      type: Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visibleEdit: false,
      form: {
        dictId: this.param.id,
        itemText: '',
        status: '',
      },
      statusOptions: [
        { label: '禁用', value: 0 },
        { label: '正常', value: 1 },
      ],
      paramEdit: {
        title: '',
        dictId: this.param.id,
        form: {
          itemText: '',
          itemValue: '',
          description: '',
          sortOrder: '',
          status: 1,
        },
      },
      paramTable: {
        bussName: 'onlineDictItem',
        where: { dictId: this.param.id, itemText: '', status: '' },
        tableHeader: [
          {
            field: 'itemText',
            title: '名称',
            width: 120,
            tooltip: true,
          },
          {
            field: 'itemValue',
            title: '数据值',
            width: 110,
            tooltip: true,
          },
          {
            field: 'description',
            title: '描述',
            width: 130,
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
                edit: {
                  name: '编辑',
                  icon: 'bianji',
                  flag: 'edit_btn',
                  clickFun: this.edit,
                },
                delete: {
                  name: '删除',
                  icon: 'shanchu',
                  flag: 'delete_btn',
                  clickFun: this.delete,
                },
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    query() {
      const _this = this;
      this.$refs.dataTable.param.where = { ...this.form };
      this.$nextTick(() => {
        _this.$refs.dataTable.getTableData();
      });
    },
    clearForm() {
      this.$set(this.form, 'itemText', '');
      this.$refs.select.empty();
    },
    delete(row) {
      const _this = this;
      this.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, async function (action) {
        if (action == 'confirm') {
          const res = await _this.http.apiDelete(_this.$urlList.onlineDictItem.delete, {
            params: {
              id: row.id,
            },
          });
          if (res.code == 0) {
            _this.common.message(true, '保存成功', 'success', 1000);
            _this.$refs.dataTable.getTableData();
          } else {
            _this.common.MessageBoxalert(res.message, '提示', '确定', 'warning');
          }
        }
      });
    },
    add() {
      this.$store.dispatch('user/setOperatState', 'add');
      this.$set(this.paramEdit, 'title', '字典列表-创建');
      this.visibleEdit = true;
    },
    edit(row) {
      this.$store.dispatch('user/setOperatState', 'edit');
      this.$set(this.paramEdit, 'title', '字典列表-编辑');
      this.$set(this.paramEdit, 'form', { ...row });
      this.visibleEdit = true;
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false);
    },
    closeEditDialog() {
      this.visibleEdit = false;
      for (let key in this.paramEdit.form) {
        this.paramEdit.form[key] = key === 'status' ? 1 : '';
      }
    },
  },
  created() {},
};
</script>
<style lang="less">
.ui-online-data-dict-item-dialog {
  .ui-content {
    margin: 20px 30px;
    .btn-wrap {
      margin-bottom: 10px;
    }
    .el-table--mini {
      min-height: 160px !important;
    }
  }
}
</style>
