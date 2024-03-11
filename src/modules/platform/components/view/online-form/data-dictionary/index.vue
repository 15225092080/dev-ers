<template>
  <div class="querypage">
    <v-operation ref="filter"
                 v-bind:arrList="arrList"
                 labelWidth="80px"></v-operation>
    <el-card class="paddingtop">
      <div slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe683;</i>检索结果
        </span>
        <ul class="icongroup">
          <li>
            <el-button class="add_btn"
                       plain
                       @click="add"><i class="DHCiconfont">&#xe6c3;</i>创 建</el-button>
          </li>
        </ul>
      </div>
      <div>
        <v-table ref="dataTable"
                 tHeight="calc(100vh - 400px)"
                 :param="paramTable"></v-table>
      </div>
    </el-card>
    <edit v-if="visibleEdit"
          :dialogVisible.sync="visibleEdit"
          :param="paramEdit"
          @closed="closeEditDialog"></edit>
    <dict-item v-if="visible"
               :dialogVisible.sync="visible"
               :param="param">
    </dict-item>
  </div>
</template>
<script>
import edit from './model/edit.vue';
import dictItem from './model/dict-item.vue';
import MinXin from '@/common/script/mixin';
export default {
  name: 'system-role',
  mixins: [MinXin],
  inject: ['reload'],
  components: {
    edit,
    dictItem,
  },
  data() {
    return {
      visibleEdit: false,
      visible: false,
      paramEdit: {
        title: '',
        form: {
          dictCode: '',
          dictName: '',
          description: '',
        },
      },
      param: {
        dictCode: '',
      },
      arrList: [
        [
          { type: 'input', name: 'dictName', value: '', label: '字典名称', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
          { type: 'input', name: 'dictCode', value: '', label: '字典编号', span: 6, rule: [{ max: 512, message: '长度不超过512位', trigger: 'blur' }] },
        ],
      ],
      paramTable: {
        bussName: 'onlineDict',
        tableHeader: [
          {
            field: 'dictName',
            title: '字典名称',
            width: 130,
            tooltip: true,
          },
          {
            field: 'dictCode',
            title: '字典编号',
            width: 120,
            tooltip: true,
          },
          {
            field: 'description',
            title: '描述',
            width: 140,
            tooltip: true,
          },
          {
            field: 'button',
            title: '操作',
            width: 260,
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
                config: {
                  name: '字典配置',
                  icon: 'shezhi',
                  flag: 'edit_btn',
                  clickFun: this.editItem,
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
  watch: {},
  methods: {
    editItem(row) {
      this.$set(this.param, 'id', row.id);
      this.visible = true;
    },
    delete(row) {
      const _this = this;
      this.common.MessageBoxconfirm('确定删除？', '', '确定', '取消', 'warning', true, async function (action) {
        if (action == 'confirm') {
          const res = await _this.http.apiDelete(_this.$urlList.onlineDict.delete, {
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
      this.$set(this.paramEdit, 'title', 'Online数据字典-创建');
      this.visibleEdit = true;
    },
    edit(row) {
      this.$store.dispatch('user/setOperatState', 'edit');
      this.$set(this.paramEdit, 'title', 'Online数据字典-编辑');
      this.$set(this.paramEdit, 'form', { ...row });
      this.visibleEdit = true;
    },
    closeEditDialog() {
      this.visibleEdit = false;
      for (let key in this.paramEdit.form) {
        this.paramEdit.form[key] = '';
      }
    },
  },
  created() {},
  mounted() {},
  computed: {},
};
</script>
<style>
</style>
