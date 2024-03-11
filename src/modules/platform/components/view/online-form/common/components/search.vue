<template>
  <div class="online-template-view-search-wrap">
    <el-card class="searchBody">
      <div ref="filter"
           slot="header"
           class="clearfix">
        <span class="leftFont">
          <i class="DHCiconfont">&#xe666;</i>检索条件
        </span>
        <span class="icongroup_header icongroup">
          <el-button @click="queryPage"
                     class="search_btn"><i class="DHCiconfont">&#xe6b1;</i>检索</el-button>
          <el-button @click="clearForm"
                     class="empty_btn"><i class="DHCiconfont">&#xe69e;</i>清空</el-button>
        </span>
        <el-form v-if="arrList.length > 0"
                 ref="searchForm"
                 :inline="true"
                 label-width="120px"
                 label-position="right"
                 :model="form">
          <div class="form-body">
            <el-row>
              <el-col v-for="(item, idx) in arrList"
                      :key="idx"
                      :xl="getLayoutSpan(item,'xl')"
                      :lg="getLayoutSpan(item,'lg')"
                      :md="getLayoutSpan(item,'md')">
                <template v-if="item.mode === 'single'">
                  <el-form-item :label="item.label">
                    <!-- single: 'date','datetime' -->
                    <el-date-picker v-if="['date','datetime'].indexOf(item.view)!==-1"
                                    v-model.trim="form[item.dbField]"
                                    :key="item.dbField"
                                    :type="item.view"
                                    :editable="false"
                                    :value-format="dateFormat[item.view]"
                                    :placeholder="'请选择' + item.label">
                    </el-date-picker>
                    <!-- single: select -->
                    <o-select v-if="['list','list_multi'].indexOf(item.view)!==-1"
                              :multiple="item.view === 'list_multi'"
                              v-model="form[item.dbField]"
                              :dictCode="item.dictCode"
                              :dictTable="item.dictTable"
                              :dictText="item.dictText"
                              :options="dictOptions[item.dictCode]"
                              :placeholder="'请选择' + item.label"></o-select>
                    <!--single: input -->
                    <el-input v-if="item.view === 'text'"
                              v-model.trim="form[item.dbField]"
                              :placeholder="'请输入' + item.label"></el-input>
                  </el-form-item>
                </template>
                <template v-if="item.mode === 'group'">
                  <el-form-item :label="item.label">
                    <!--group: 'date','datetime' -->
                    <div v-if="['date','datetime'].indexOf(item.view)!==-1"
                         class="group-item-wrap">
                      <el-date-picker v-model.trim="form[item.dbField + '_begin']"
                                      :key="item.dbField + '_begin'"
                                      :type="item.view"
                                      :editable="false"
                                      :value-format="dateFormat[item.view]"
                                      :placeholder="'请选择开始' + item.label"> </el-date-picker>
                      <span class="item-split">-</span>
                      <el-date-picker v-model.trim="form[item.dbField + '_end']"
                                      :key="item.dbField + '_end'"
                                      :type="item.view"
                                      :editable="false"
                                      :value-format="dateFormat[item.view]"
                                      :placeholder="'请选择结束' + item.label"> </el-date-picker>
                    </div>
                    <!--group: select -->
                    <div v-if="['list','list_multi'].indexOf(item.view)!==-1"
                         class="group-item-wrap">
                      <o-select :multiple="item.view === 'list_multi'"
                                v-model="form[item.dbField + '_begin']"
                                :dictCode="item.dictCode"
                                :dictTable="item.dictTable"
                                :dictText="item.dictText"
                                :options="dictOptions[item.dictCode]"
                                :placeholder="'请选择开始' + item.label"></o-select>
                      <span class="item-split">-</span>
                      <o-select :multiple="item.view === 'list_multi'"
                                v-model="form[item.dbField + '_end']"
                                :dictCode="item.dictCode"
                                :dictTable="item.dictTable"
                                :dictText="item.dictText"
                                :options="dictOptions[item.dictCode]"
                                :placeholder="'请选择结束' + item.label"></o-select>
                    </div>
                    <!--group: input -->
                    <div v-if="item.view === 'text'"
                         class="group-item-wrap">
                      <el-input v-model.trim="form[item.dbField + '_begin']"
                                :placeholder="'请输入开始' + item.label"></el-input>
                      <span class="item-split">-</span>
                      <el-input v-model.trim="form[item.dbField + '_end']"
                                :placeholder="'请输入结束' + item.label"></el-input>
                    </div>
                  </el-form-item>
                </template>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import MinXin from '@/common/script/mixin';
import oSelect from './select.vue';
export default {
  components: { oSelect },
  mixins: [MinXin],
  data() {
    return {
      layoutObj: {
        xl: 4,
        lg: 6,
        md: 8,
      },
      dateFormat: {
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
      },
      dateTypeGroup: {
        date: 'daterange',
        datetime: 'datetimerange',
      },
    };
  },
  props: ['form', 'arrList', 'dictOptions'],
  methods: {
    getLayoutSpan({ mode }, size) {
      if (mode === 'single') {
        return this.layoutObj[size];
      } else {
        return this.layoutObj[size] * 2;
      }
    },
    queryPage() {
      this.$emit('queryPage');
    },
    clearForm() {
      this.$emit('clearForm');
    },
  },
  created() {},
};
</script>
<style lang="less">
.online-template-view-search-wrap {
  .el-form--inline .el-form-item {
    display: flex;
    .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
  .group-item-wrap {
    position: relative;
    display: flex;
    .item-split {
      padding: 0 6px;
    }
  }
}
</style>
