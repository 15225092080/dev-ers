<template>
  <div>
    <el-collapse v-model="activeNames"
                 class="v_collapse"
                 :class="{collapseWidth:offStatus =='false'}">
      <div v-for="(item,index) in collapseList.item"
           :key="index"
           @click="handleClick(item.name,item.bind)">
        <slot :name="item.bind + 'Btn'"></slot>
        <el-collapse-item v-if="!item.hidden"
                          class="d_jump"
                          :disabled="item.disabled"
                          :name="item.name"
                          :id="item.name"
                          :title="item.title">
          <div v-if="item.showField == 'form'"
               class="padright20">
            <!-- 新增或者编辑 -->
            <v-form v-if="!item.submitFun && item.callback"
                    :reqFun="item.reqFun"
                    @eventChange="eventChange"
                    @eventBlur="eventBlur"
                    :buttonGroup="buttonGroup"
                    :first="item.first"
                    :ref="item.bind"
                    :detailData="item.detailDataFun"
                    v-bind:arrList="collapseList[item.bind]"
                    :url="item.url"
                    :submitFun="item.submitFun"
                    labelWidth="180px"
                    :findById="item.findById">
              <el-button slot="slotBtn"
                         class="submit_btn"
                         @click="callback(item.url,'formItem',item.bind,index,item.name)"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
            </v-form>
            <!-- 新增或者编辑有自定义方法的 -->
            <v-form v-else-if="!item.submitFun && item.submitCustom"
                    :reqFun="item.reqFun"
                    @eventChange="eventChange"
                    :buttonGroup="buttonGroup"
                    @eventBlur="eventBlur"
                    :first="item.first"
                    :detailData="item.detailDataFun"
                    :ref="item.bind"
                    v-bind:arrList="collapseList[item.bind]"
                    :url="item.url"
                    :submitFun="item.submitFun"
                    labelWidth="180px"
                    :findById="item.findById">
              <el-button slot="slotBtn"
                         class="submit_btn"
                         @click="item.submitCustom(item.url,'formItem',item.bind,index,item.name,self)"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
            </v-form>
            <!-- 详情页面 -->
            <v-form v-else
                    :ref="item.bind"
                    v-bind:arrList="collapseList[item.bind]"
                    :url="item.url"
                    :buttonGroup="['']"
                    :submitFun="item.submitFun"
                    labelWidth="180px"
                    :detailData="item.detailDataFun"
                    :findById="item.findById">
            </v-form>
          </div>
          <div v-else
               class="padright20">
            <v-table v-if="!item.disabled"
                     :ref="item.bind"
                     :param="collapseList[item.bind]"></v-table>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
    <v-steps ref="steps"
             v-if="offStatus !='false'"
             :param="collapseList.param"
             :itemList="collapseList.item"></v-steps>
  </div>
</template>
<script>
import Bus from '@/common/script/bus.js';
export default {
  name: 'child',
  components: {},
  data() {
    return {
      activeNames: [],
      buttonGroup: ['cancle'],
      self: this,
    };
  },
  props: {
    collapseList: {
      type: Object,
      default: function () {
        return { item: [] };
      },
    },
  },
  computed: {
    offStatus() {
      return this.$route.meta.offsideStatus;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    eventChange(obj) {
      this.$emit('eventChange', obj);
    },
    eventBlur(obj) {
      this.$emit('eventBlur', obj);
    },
    // 提交表单
    callback(url, formItem, refsBind, i, name) {
      let _this = this;
      let formData = this.$refs[refsBind][0];
      if (formData.treeData) {
        formData.treeData.forEach((item, index) => {
          formData.formItem[item.name] = this.common.unique(formData.treeNodes);
        });
      }

      formData.$refs[formItem].validate((valid) => {
        if (valid) {
          let param;
          let flag;
          //   if(i == 0 && Object.keys(this.$route.query).length > 0 && _this.$store.getters.arrListFormItem){
          //       let formItemData = {};
          //       for(let k in formData.formItem){
          //           if(formData.formItem[k]){
          //               formItemData[k] = formData.formItem[k];
          //           }
          //       }
          //       param = Object.assign(_this.$store.getters.arrListFormItem,formItemData);
          //       url = _this.collapseList.item[i].update;
          //       flag = false;
          //   }else
          if (_this.$store.getters.arrListFormData[name]) {
            let formItemData = {};
            for (let k in formData.formItem) {
              if (formData.formItem[k]) {
                formItemData[k] = formData.formItem[k];
              }
            }
            param = Object.assign(
              _this.$store.getters.arrListFormData[name],
              formItemData
            );
            url = _this.collapseList.item[i].update;
            flag = false;
          } else if (
            _this.collapseList.item[i].comData &&
            _this.collapseList.item[i].comData.id
          ) {
            // comData 有值是编辑， 没有值是新增
            param = Object.assign(
              _this.collapseList.item[i].comData,
              formData.formItem
            );
            url = _this.collapseList.item[i].update;
            flag = false;
          } else {
            url = _this.collapseList.item[i].create;
            flag = true;
            if (formData.formItem && formData.formItem.id) {
              url = _this.collapseList.item[i].update;
              flag = false;
            }
            param = formData.formItem;
          }
          for (let k in _this.collapseList.item[i].search) {
            param[_this.collapseList.item[i].search[k]] =
              _this.$store.getters.arrListFormItem[
                _this.collapseList.item[i].search[k]
              ];
          }
          // 对k段的年利率进行双精度处理
          if (param.annIntRate) {
            if (typeof param.annIntRate == 'number' || 'string') {
              param.annIntRate = Number(param.annIntRate).toFixed(2);
            }
          }
          this.http
            .apiPost(url, param, {
              showLoading: true,
            })
            .then((res) => {
              this.common.submitMsg(res).then(() => {
                if (res.code == '00000000') {
                  // 新增提交之后下面折叠栏可以点击
                  if (i == 0) {
                    this.$store.dispatch('user/setFormItem', param);
                    Bus.$emit('successCallback', flag);
                    this.$nextTick(() => {
                      this.collapseList.item.forEach((item) => {
                        if (item.showField == 'table') {
                          for (var k in item.where) {
                            let val = item.where[k];
                            this.collapseList[item.bind].where[k] =
                              _this.$store.getters.arrListFormItem[val];
                          }
                        }
                        item.disabled = false;
                      });
                    });
                  }

                  this.collapseList.item[i].url = this.$urlList[name].update;
                  this.collapseList.item[i].comData = JSON.parse(
                    res.comData
                  ).data;
                }
              });
            });
        } else {
          this.common.message(
            true,
            '验证不通过，提交失败',
            'warning',
            '800',
            function () {
              return false;
            }
          );
        }
      });
    },
    handleClick(val, bind) {
      for (var i = 0; i < this.collapseList.item.length; i++) {
        if (this.collapseList.item[i].name == val) {
          if (this.collapseList.item[i].disabled) {
            this.common.message(
              true,
              '请先完善基础段信息!',
              'warning',
              '1000',
              function () {
                return false;
              }
            );
          }
        }
      }
    },
    init() {
      sessionStorage.setItem('bussNum', this.$route.path);
      // this.$store.dispatch('user/setModaltState','')
      // 判断是新增还编辑 修改提交的接口
      if (this.$store.getters.operatState == 'add') {
        this.collapseList.item.forEach((val) => {
          if (val.showField == 'form') {
            val.url = val.create;
          }
        });
      } else if (this.$store.getters.operatState == 'edit') {
        this.collapseList.item.forEach((val) => {
          if (val.showField == 'form') {
            val.url = val.update;
          }
        });
        this.collapseList.item.forEach((item) => {
          item.disabled = false;
        });
        this.collapseList.activeNames = [];
      }
      // 折叠面板展示默认展示第一个 这个this.collapseList.activeNames 为空 展示全部
      if (
        this.collapseList.activeNames &&
        this.collapseList.activeNames.length > 0
      ) {
        this.activeNames = this.collapseList.activeNames;
      } else if (this.collapseList.item && this.collapseList.item.length > 0) {
        for (let i = 0; i < this.collapseList.item.length; i++) {
          this.activeNames.push(this.collapseList.item[i].name);
        }
      }
    },
  },
  destroyed() {
    //   第一个form表单的值
    this.$store.dispatch('user/setFormItem', '');
    // 置空存储的所有表单数据
    this.$store.dispatch('user/setFormData', {});
    //  新增或者编辑表格新增编辑状态
    this.$store.dispatch('user/setModaltState', '');
  },
  created() {
    //   如果初始化是不清空 在打开表格新增的时候 刷新编辑页面数据不会显
    this.$store.dispatch('user/setModaltState', '');
    // 置空存储的所有表单数据
    this.$store.dispatch('user/setFormData', {});
    this.$store.dispatch('user/setFormItem', '');
    this.init();
  },
};
</script>
<style>
#app {
  background-color: white !important;
}
</style>
