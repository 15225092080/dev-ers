<template>
  <el-dialog title="编辑快捷入口"
             :visible.sync="param.visible"
             width="50%"
             :close-on-click-modal="false"
             custom-class="model-dialog el-dialog-m">
    <span slot="title"
          class="clearfix">
      <span class="dialog-title el-dialog-titleM">{{param.title}}</span>
      <span class="dialog-title-bg"></span>
    </span>
    <span>
      <el-checkbox-group v-model="menuIds">
        <ul>
          <li v-for="(item,index) in cardTab"
              :key="index">
            <fieldset>
              <legend>{{item.name}}</legend>
              <el-checkbox class="selectItem"
                           v-for="(childitem,index) in item.childMenus"
                           :key="index"
                           :label="childitem.id"
                           size="medium">
                <i :class="`icon DHCiconfont DHC-${childitem.menuStyle}`"></i>
                <span class="checkboxB">{{childitem.name}}</span>
              </el-checkbox>
            </fieldset>
          </li>
        </ul>
      </el-checkbox-group>
    </span>
    <span slot="footer"
          class="dialog-footer">
      <el-button class="submit_btn"
                 @click="submitForm">提 交</el-button>
      <el-button class="empty_btn"
                 @click="clear">清 空</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Bus from '@/common/script/bus';
export default {
  name: 'mychild',
  data() {
    return {
      items: [],
      linkitems: [],
      cardTab: [],
      menuIds: this.param.cardListId,
    };
  },
  computed: {
    cardListId() {
      return this.param.cardListId;
    },
  },
  watch: {
    cardListId(newList) {
      //   deep: true,
      this.menuIds = newList;
    },
  },
  props: ['param'],
  methods: {
    // 提交选中的快捷菜单
    submitForm() {
      let params = {
        menuIds: this.menuIds.join(),
        root: sessionStorage.getItem('id'),
      };
      this.http.apiPost(this.$creditPerUrl.common.saveShortcut, params);
      Bus.$emit('param', (this.param.visible = false));

      this.$message({
        message: '操作成功',
        type: 'success',
        duration: '200',
        onClose: () => {
          // 传递给父组件请求数据
          this.$emit('init');
        },
      });
    },
    // 清空
    clear() {
      this.menuIds = [];
    },
    // 请求数据
    shortinit() {
      let params = { root: sessionStorage.getItem('id') };
      this.http.apiPost(this.$creditPerUrl.common.getUserLinkMenu, params).then((res) => {
        this.cardTab = res;
      });
    },
  },
  created() {
    // this.shortinit();
  },
};
</script>
<style scoped>
li {
  list-style: none;
}
fieldset {
  width: 90%;
  margin: 0 auto;
  border-radius: 5px;
  border-color: #e6e6e6;
  padding: 0;
  border-width: 1px;
  border-style: solid;
  margin-bottom: 20px;
}
fieldset legend {
  margin-left: 20px;
  padding: 0 10px;
  font-size: 20px;
  font-weight: 300;
}
fieldset ul li {
  float: left;
  width: 110px;
  line-height: 60px;
  position: relative;
}
.icon {
  line-height: 80px;
  font-size: 50px !important;
  position: absolute;
  left: 40px;
  top: 0;
}
.selectItem .el-checkbox__input {
  position: absolute;
  left: -10px;
  bottom: 0;
}
.checkboxB {
  position: absolute;
  left: 37px;
  bottom: 10px;
}
.selectItem:hover {
  color: #3075c7 !important;
}
.el-checkbox {
  font-size: 60px;
}
.selectItem {
  width: 130px;
  height: 100px;
  margin-bottom: 10px;
  margin-left: 20px;
  float: left;
  color: #666;
  font-size: 98px;
  font-weight: normal;
}
.selectItem span {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.menu_group {
  border: 1px solid #ccc;
  padding-right: 20px;
  padding-top: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.menu_group legend {
  padding: 0 10px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 300;
}

.card_cont {
  padding: 5px;
}

.menu_icon {
  text-align: center;
}

.menu_icon .icon {
  font-size: 48px;
  color: #909090;
}

.menu_icon .checked {
  color: #3075c7;
}

.el-checkbox__label {
  text-align: center;
}

.bottom {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
