<template>
    <div>
        <!-- 希望能把这个模板写在计算属性里，算是v-for的一种优化 by lb-->
        <el-form ref="formItem" :model="formItem" :label-width="labelWidth" :label-position="labelPosition">
            <div class="form-body">
                <el-row :index="(index+'')" v-for="(item,index) in arrList" :key="index" :gutter="gutter">
                    <p  :style="record" :index="(itemIndex+'')" v-for="(i,itemIndex) in item"  v-if="i.header" :key="itemIndex"
                       >{{i.header}} <el-button v-if="i.buttonmsg" :class="i.buttonclass" style="float: right;margin-top:-5px;" size="mini" @click = i.clickfun>{{i.buttonmsg}}</el-button></p>
                    <el-col :index="(itemIndex+'')" v-for="(i,itemIndex) in item" :key="i.itemIndex" :span="i.span" :lg="i.lg" :xl="i.xl" :md="i.md">
                        <el-form-item v-if="i.type=='select'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <v-select :paramtype="i.param" :options="i.customOption" :optionConfig="i.optionConfig" :filter="i.filter" v-model="formItem[i.name]"
                                :disabled="i.disabled" :clearable ="!i.noReset" :change="i.eventChange" @eventChange="eventChange"
                                :name="i.name"></v-select>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='selectMultiple'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <v-select :paramtype="i.param" :multiple="true" :options="i.customOption" :filter="i.filter" v-model="formItem[i.name]"
                                :disabled="i.disabled" :clearable ="!i.noReset" :change="i.eventChange" @eventChange="eventChange"
                                :name="i.name"></v-select>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='textarea'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                              <el-input type="textarea" :id="i.id?i.name:''" @focus="eventFocus($event,i)" v-model.trim="formItem[i.name]" :rows="6" :disabled="i.disabled"></el-input>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='date'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <el-date-picker v-model.trim="formItem[i.name]" type="date" :editable="false" value-format="yyyy-MM-dd"
                                placeholder="选择日期" :disabled="i.disabled" :picker-options="i.pickerOptions" @change="eventChange({e: $event, sname: i.name})">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='dates'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <el-date-picker v-model.trim="formItem[i.name]" type="dates" :default-value="i.timeDefaultShow" :picker-options="i.pickerOptions" format="dd" :popper-class="i.pickerClass" :editable="false" value-format="yyyy-MM-dd"
                                placeholder="选择日期" :disabled="i.disabled">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='time'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                          <el-time-picker  v-model.trim="formItem[i.name]" :editable="false"  placeholder="选择时间"  format='HH:mm:ss' value-format="HH:mm:ss"
                           :disabled="i.disabled" :picker-options="i.pickerOptions">
                          </el-time-picker>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='daterange'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <el-date-picker v-model.trim="formItem[i.name]" :editable="false" range-separator=" ~ " type="daterange"
                                start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd" :disabled="i.disabled"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='password'&&!i.hide" :prop="i.name"  :rules="i.rule" :label="i.label">
                            <el-input type="password" v-model.trim="formItem[i.name]" :disabled="i.disabled"></el-input>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='tree'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label">
                            <!-- 这个是在页面展示得数据 -->
                            <span @click="menutreeshow(i)">
                                <el-input v-model="search_IN_orgId_fake" readonly :disabled="i.disabled"></el-input>
                            </span>
                            <!-- 向后台发送这个数据 -->
                            <el-input v-model.trim="formItem[i.name]"  v-show="false"></el-input>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='input'&&!i.hide" :prop="i.name" :rules="i.rule" :label="i.label"  >
                            <span @click="eventClick(i)">
                              <el-input v-if="!i.isTrim" v-model.trim="formItem[i.name]" :disabled="i.disabled" :readonly="i.readonly" :placeholder="i.placeholder?i.placeholder:''" @blur="eventBlur($event,i)" :class="i.eventClick?'eventClickStyle':''" >
                                  <el-button slot="append" icon="el-icon-close" v-if="i.delete" @click="remove(i.name)" :disabled="i.btnDisabled" ></el-button>
                                  <el-button slot="append" size="mini" @click="addItem(i.name)"  v-if="i.addItem" icon="el-icon-plus"></el-button>
                              </el-input>
                              <el-input v-else v-model="formItem[i.name]" :disabled="i.disabled" :readonly="i.readonly" :placeholder="i.placeholder?i.placeholder:''" @blur="eventBlur($event,i)" :class="i.eventClick?'eventClickStyle':''" >
                                  <el-button slot="append" icon="el-icon-close" v-if="i.delete" @click="remove(i.name)" :disabled="i.btnDisabled" ></el-button>
                                  <el-button slot="append" size="mini" @click="addItem(i.name)"  v-if="i.addItem" icon="el-icon-plus"></el-button>
                              </el-input>
                            </span>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='cascader'&&!i.hide" :label="i.label" :prop="i.name" :rules="i.rule">
                            <v-cascader v-model.trim="formItem[i.name]" :disabled="i.disabled" ></v-cascader>
                        </el-form-item>
                        <el-form-item v-else-if="i.type=='checkbox'&&!i.hide" :label="i.label" :prop="i.name" :rules="i.rule" >
                            <el-checkbox-group v-model.trim="formItem[i.name]" :disabled="i.disabled">
                                <el-checkbox v-for="ch in i.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item  v-else-if="i.type=='upload'&&!i.hide"   :label="i.label">
                            <el-input type="input" v-for="(file,index) in files" :key="index" v-model="file.name" readonly v-if="index==files.length-1"></el-input>
                            <file-upload ref="upload" v-model="files" :multiple="true" @input-file="inputFile"  @input-filter="((newVal, oldVal,prevent)=>{inputFilter(newVal, oldVal,prevent,i.accept,i.size)})" :post-action="i.action" :data="{test:222}">
                                <el-button class="right chooseFile_btn" :for="name"><i class="DHCiconfont">&#xe72e;</i>选择文件</el-button>
                            </file-upload>
                        </el-form-item>
                        <div class="filterCheckbox" v-else-if="i.type=='filterCheckbox'&&!i.hide">
                           <input v-model="filterText" class="native"  placeholder="输入关键字进行检索">
                           <el-form-item :label="i.label">
                              <el-checkbox-group v-model.trim="formItem[i.name]" :disabled="i.disabled">
                                <!-- 公共的组件里怎么会有个别页面的专属字段 比如这个stepId和stepName -->
                                <el-checkbox v-for="ch in i.checkboxs" :label="ch.stepId" :key="ch.value">{{ch.stepName}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row >   <!-- 树结构 -->
                    <slot name="slotRecord"></slot>
                    <el-col :lg="20" :offset="2" :xl="20">
                        <el-card>
                            <slot name="slotTree"></slot>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <slot name="custom" ></slot>
                    </el-col>
                </el-row>
            </div>
            <div :class="footerButton?'formFooterFixBottom':'formFooter'">
                <el-row v-if="!search" :style="buttonGroup&&buttonGroup.length>0||!buttonGroup?formFooterPop:{}">     <!-- 弹出层 -->
                    <el-col>
                        <el-form-item  style="float:right" v-if="buttonGroup">
                            <slot name="slotBtn"></slot>   <!-- 插槽 -->
                            <el-button @click="submitForm(url,'formItem',customSubmit)"  v-if="buttonGroup.includes('submit')" class="submit_btn"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
                            <el-button @click="cancleForm"  v-if="buttonGroup.includes('cancle')" class="empty_btn"><i class="DHCiconfont">&#xe69e;</i>清 空</el-button>
                            <el-button @click="reset(findById.url,findById.param)" v-if="buttonGroup.includes('reset')" class="reset_btn"><i class="DHCiconfont">&#xe6b0;</i>重 置</el-button>
                            <el-button @click="close" class="close_btn" v-if="buttonGroup.includes('close')"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
                        </el-form-item>
                        <el-form-item  style="float:right" v-else>
                            <slot name="slotBtn"></slot>   <!-- 插槽 -->
                            <el-button @click="submitForm(url,'formItem',customSubmit)" v-if="submitFun" class="submit_btn"><i class="DHCiconfont">&#xe6b3;</i>提 交</el-button>
                            <el-button @click="cancleForm" v-if="this.$store.getters.operatState=='add'&&!search || isBtnShow.cancle" class="empty_btn"><i class="DHCiconfont">&#xe69e;</i>清 空</el-button>
                            <el-button @click="reset(findById.url,findById.param)" v-if="this.$store.getters.operatState=='edit'&&!search || isBtnShow.reset"  class="reset_btn"><i class="DHCiconfont">&#xe6b0;</i>重 置</el-button>
                            <el-button @click="close" v-if="!search&&!router.includes($route.path) || isBtnShow.closeBtn" class="close_btn"><i class="DHCiconfont">&#xe67f;</i>关 闭</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        <v-tree v-bind:param="param" :orgIdfake.sync="search_IN_orgId_fake" :orgId.sync="formItem[search_IN_org]" @eventChange="eventChange"></v-tree>
    </div>
    <!-- 如果放在表单里，点击所属机构过滤条件，在ie浏览器下会有兼容性问题 -->
</template>
<script>
import {recursion, closeDialog, filterArray, getTree, upload, deepcopyArr} from '@/common/script/vForm';
import vTree from '@/common/components/treedialog';
let id;
let checkboxArr;
let isFirst = true;
let deepcopy;
export default {
  // mixins: [MinXin],
  name: 'vForm',
  components: {
    vTree
  },
  inject: ['reload'],
  data() {
    return {
      files: [],
      formItem: {},
      noresetItem: [],
      defaultItem: [],
      resultData: {},
      search_IN_orgId_fake: '',
      search_IN_org: '',
      param: {},
      treeNodes: [],
      addIndex: 0,
      flag: [],
      router: ['/system-user-edit', '/system-org-edit', '/system-org-detail', '/system-user-detail', '/userInfoDetail'],
      checkedKeys: [],
      test: [],
      record: {
        position: 'relative',
        width: '18%',
        color: '#676767',
        left: this.gutter ? this.labelWidth : '0px',
        fontSize: '14px',
        borderBottom: '1px solid rgb(221, 218, 218)',
        marginBottom: '10px',
        paddingBottom: '10px'
      },
      filterText: '',
      formFooterPop: {
        borderTop: '1px solid #ECEDF2',
        padding: '10px 20px 0px',
        zIndex: '999'
      },
      scrollbarHeight: {
        height: ''
      }
    };
  },
  props: {
    arrList: {
      type: Array
    }, // 跨域请求标志
    search: {
      type: Boolean
    },
    submitFun: {
      type: Boolean
    },
    url: {
      type: String
    },
    labelWidth: {
      type: String
    },
    labelPosition: {
      type: String
    },
    findById: {
      type: Object
    },
    convertResData:{
      type:Function
    },
    formTemplate: {
      type: Object
    },
    isBtnShow: {
      type: Object,
      default: function () {
        return {};
      }
    },
    buttonGroup: {
      type: Array
    },
    gutter: {
      type: Number
    },
    footerButton: {
      type: Boolean
    },
    // 自定义条件提交
    customSubmit: {
      type: Function
    },
    // 详情请求成功后的回调
    reqFun: {
      type: Function
    }
  },
  computed: { // 破坏原型链，否则监听不到旧值
    arrListnew() {
      return JSON.parse(JSON.stringify(this.arrList));
    }
  },
  watch: {
    filterText(val) {
      if (isFirst) {
        let deepcopyArray = deepcopyArr(this.arrList).filter((item, index) => item.findIndex(i => i.type == 'filterCheckbox') > -1);
        let deepcopyObj = deepcopyArray[0].find((i) => i.type == 'filterCheckbox');
        deepcopy = deepcopyObj.checkboxs;
        isFirst = false;
      }
      let array = this.arrList.filter((item, index) => item.findIndex(i => i.type == 'filterCheckbox') > -1);
      let obj = array[0].find((i) => i.type == 'filterCheckbox');
      if (val) {
        obj.checkboxs = obj.checkboxs.filter((e) => e.stepName.includes(val) === true);
      } else {
        return obj.checkboxs = deepcopy;
      }
    }
  },
  methods: {
    updateFormItem(key, value) {
      this.formItem[key] = value;
    },
    submitForm(url, formItem,customSubmit) { // 提交的公共方法可新增可编辑
      let that = this;
      let param;
      upload(that.files, that);
      if (this.$parent.$parent.$refs.tree) {
        if (this.$parent.$parent.$refs.tree.getHalfCheckedKeys().length <= 0) {
          that.formItem[this.$parent.$parent.name] = this.$parent.$parent.$refs.tree.getCheckedKeys();
        } else {
          that.formItem[this.$parent.$parent.name] = this.$parent.$parent.$refs.tree.getHalfCheckedKeys() + ',' + this.$parent.$parent.$refs.tree.getCheckedKeys();
        }
      }
      if (Object.keys(this.formItem).some((value) => value.includes('addflag'))) { // 判断下如果传的参数中包含动态添加字段携带的特有标识‘addflag’;就进行处理
        param = this.coupling(Object.assign({}, this.formItem));
      } else {
        param = this.formItem;
      }
      this.$refs[formItem].validate(valid => {
        if (valid) {
          if(customSubmit){
            let flag = customSubmit(param);
            if(!flag){
              return false;
            }
          }
          this.http.apiPost(url, param, {
            showLoading: true
          }).then(res => {
            if (that.router.includes(that.$route.path)) {
              that.common.submitMsg(res).then(() => {
                if(res.code != 0) return;
                setTimeout(() => {
                  window.reload();
                  that.$store.dispatch('user/setOperatState', 'edit');
                  id = that.formItem[that.formTemplate.paramsValue];
                }, 350);
              });
            } else {
              that.common.submitMsg(res).then(() => {
                if (res.code != 0) return;
                if (this.$parent.$parent.$children[0].$el.className.includes('el-dialog__wrapper')) { // 有弹窗的情况下
                  that.close();
                } else { // 跳转路由的情况
                  that.reload();
                  that.$router.go(-1);
                }
              });
            }
          });
        } else {
          this.common.message(true, '验证不通过，提交失败', 'warning', '1800', function () {
            return false;
          });
        }
      });
    },
    queryPageForm() { // 检索
      this.$refs.formItem.validate(valid => {
        if (valid) {
          let parent = this.$parent.$parent;
          recursion(parent, this.formItem);
        } else {
          return false;
        }
      });
    },
    cancleForm() { // 清空
      for (let key in this.formItem) {
        let index = this.noresetItem.findIndex((v) => {
          return v == key;
        });
        let defaultData = this.defaultItem.find((v,i) => {
          return v.name == key;
        });
        if(defaultData && defaultData.name){
            this.formItem[key] = defaultData.value;
            continue;
        }
        if (index == -1) {
          if (Array.prototype.isPrototypeOf(this.formItem[key])) {
            this.formItem[key] = [];
          }else{
            this.formItem[key] = '';
            this.search_IN_orgId_fake = '';
            this.$refs.formItem.clearValidate();
          }
        }
      }
      if (this.$parent.$parent.$refs.tree) {
        this.$parent.$parent.$refs.tree.setCheckedKeys([]);
      }
    },
    reset(url, params) { // 重置
      if (this.formTemplate && typeof (params.params[this.formTemplate.paramsKey]) == 'undefined') {
        params.params[this.formTemplate.paramsKey] = id;
      }
      this.common.setVal(url, params).then(result => {
        // 当定义数据处理方法时调用对返回对象进行数据处理
        if(this.convertResData){
          result = this.convertResData(result);
        }
        this.arrList.filter( // 对不同类型的处理、这是必要的
          (item) => item.filter(
            (i) => {
              if (i.eventChange) {
                this.$emit('eventChange', {e: result[i.name], sname: i.name});
              }
              if (i.type == 'filterCheckbox') {
                checkboxArr = i.checkboxs;
              }
              if (i.type == 'tree') {
                if (i.name == 'parentResourceId') {
                  getTree(i, this);
                } else {
                  this.search_IN_orgId_fake = JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_getOrgName'])[result[i.name]];
                }
              }
            }
          )
        );
        // --------------------------------------------------------------------------- 对动态自增自减表单的自动处理，没用到的请忽略
        this.flag.splice(0);
        this.test.forEach( // 临时测试，下次提交封装
          (item, index) => item.forEach(
            (i, iIndex) => {
              if (result[i.name]) {
                if (i.addItem && result[i.name].length > 0) {
                  let data = (({type, value, label, span, rule, addItem, btnDisabled}) => ({type, value, label, span, rule, addItem, btnDisabled}))(i);// 动态添加的表单
                  result[i.name].forEach((j, ind, arr) => {
                    if (ind > 0 && ind < arr.length - 1) {
                      this.flag.push({'name': i.name + 'addflag' + ind, type: data.type, value: data.value, span: data.span, label: data.label, rule: data.rule, addItem: false, delete: true, btnDisabled: data.btnDisabled});// 每次在新增表单位置后再次新增
                      result[i.name + 'addflag' + ind] = j;
                    } else if (ind == arr.length - 1) {
                      if (arr.length == 1) {
                        this.flag.push({'name': i.name, type: data.type, value: data.value, span: data.span, label: data.label, rule: data.rule, addItem: true, delete: true, btnDisabled: data.btnDisabled});
                        result[i.name] = j;
                      } else {
                        this.flag.push({'name': i.name + 'addflag' + ind, type: data.type, value: data.value, span: data.span, label: data.label, rule: data.rule, addItem: true, delete: true, btnDisabled: data.btnDisabled});
                        result[i.name + 'addflag' + ind] = j;
                      }
                    } else {
                      this.flag.push({'name': i.name, type: data.type, value: data.value, span: data.span, label: data.label, rule: data.rule, addItem: false, delete: true, btnDisabled: data.btnDisabled});
                      result[i.name] = j;
                    }
                    this.addIndex = arr.length;
                  });
                  for (let x = 0; x < this.test.length; x++) {
                    this.arrList[x] = [];
                    for (let j = 0; j < this.test[x].length; j++) {
                      this.arrList[x][j] = this.test[x][j];
                    }
                  }
                  let arrayx = this.arrList.find((t) => t.findIndex(s => s.name == i.name) > -1);// 需要新增的字段所在数组
                  arrayx.splice(iIndex, 1);
                  this.flag.map(itemFlag => {
                    this.arrList[index].push(itemFlag);
                  });
                }
                if (i.toStriing && result[i.name]) {
                  result[i.name] = result[i.name].join();
                }
                if (i.type == 'checkbox' && result[i.name] === null) {
                  result[i.name] = [];
                }
              }
            })
        );
        this.formItem = result;
        if(this.reqFun){
            this.reqFun(this.formItem)
        }
      });
      if (this.$parent.$parent.$refs.tree) {
        this.$emit('getrole');
      }
    },
    close() { // 关闭
      let parent = this.$parent;
      closeDialog(parent);// 因为弹出窗所在层级不确定，我觉得暂时递归关闭最方便
    },
    menutreeshow(i) { // 加载树结构
      if (!i.disabled) {
        this.http.apiGet(i.treeurl).then(res => {
          this.param = {
            visible: true,
            title: i.treetitle,
            treedata: res.data,
            defaultProps: i.defaultProps,
            name: i.name,
            checkbox:i.checkbox,
            checkboxStrictly:i.checkboxStrictly
          };
          localStorage.setItem('ms_orgCode', res.data[0].id);
        });
      }
    },
    eventChange(e) { // 下拉change事件
      this.$emit('eventChange', e);
    },
    eventBlur(e, i) { // 表单失去焦点事件
      if (i.eventBlur) {
        this.$emit('eventBlur', {e: e.target.value, sname: i.name});
      }
    },
    eventFocus(e, i) { // 表单获取焦点事件
      if (i.eventFocus) {
        this.$emit('eventFocus', {e: e.target.value, ele: i, sname: i.name});
      }
    },
    eventClick(i){
      if (i.eventClick) {
        // this.$emit('eventClick', {e: e.target.value, sname: i.name});
        this.$emit('eventClick');
      }
    },
    addItem(sname) { // 动态添加表单
      let array = this.arrList.find((item) => item.findIndex(i => i.name == sname) > -1); // 需要新增的字段所在数组
      let index = array.findIndex(i => i.addItem); // 需要新增的字段的索引位置，每次新增都在
      let data = (({type, name, value, label, span, rule, addItem}) => ({type, name, value, label, span, rule, addItem}))(array[index]); // 动态添加的表单
      if (!data.name.includes('addflag')) {
        data.name = data.name + 'addflag' + this.addIndex;
      }
      Object.assign(data, {'name': data.name.substr(0, data.name.length - 1) + this.addIndex, 'delete': true});
      Object.assign(array[index], {'addItem': false});
      array.splice(index + this.addIndex + 1, 0, data); // 每次在新增表单位置后再次新增
      this.formItem = Object.assign({}, this.formItem, {[data.name + this.addIndex]: ''}); // 绑定表单的value值
      this.addIndex++;
    },
    remove(items) { // 移除动态新增的表单
      let array = this.arrList.find((item) => item.findIndex(i => i.name == items) > -1); // 需要新增的字段所在数组
      let index = array.findIndex(i => i.name == items); // 需 要新增的字段的索引位置，每次新增都在
      array.splice(index, 1);
      array[array.length - 1].addItem = true;
      if (array.length == 1) {
        array[0]['delete'] = false;
      }
      //   添加部门后的删除按钮X，点击后直接清空页面所有填写内容 注释this.render 后就可以了
      //   this.render(this.arrList);
      delete this.formItem[items];
    },
    coupling(formItem) { // 对包含动态新增的数据进行处理
      let name;
      let array = [];
      for (let v in formItem) {
        if (v.includes('addflag')) {
          name = v.slice(0, v.indexOf('addflag'));
          array.push(formItem[v]);
          delete formItem[v];
        }
      }
      array.unshift(formItem[name]);
      Object.assign(formItem, {[name]: filterArray(array).join()});
      return formItem;
    },
    render(arr) { // 渲染模板
      arr.forEach((item) => {
        item.forEach((i) => {
          let obj = {};
          obj = {
            [i.name]: i.value
          };
          this.formItem = Object.assign({}, this.formItem, obj); // 用于绑定各个表单值的对象
          if (i.noReset) { // 不
            ( // 断
              this.noresetItem.push(i.name) // 拓
            ); // 展
          } // 都
          if(i.default){
              if(i.param && i.optionConfig){
                  let obj = JSON.parse(sessionStorage.getItem(sessionStorage.getItem('systemId') + '_' + i.param));
                 i.default['value'] = Object.keys(obj)[0];
              }else if(i.customOption){
                  i.default['value'] = Object.keys(i.customOption)[0];
              }
              this.defaultItem.push(i.default)
          }
          if (i.type == 'filterCheckbox') { // 有
            checkboxArr = i.checkboxs; // 用
          }
          if (i.type == 'tree') {
            this.search_IN_org = i.name;
          }
        });
      });
    },
    init() {
      if (this.$store.getters.operatState != 'add') { // 编辑或者详情返显数据
        if (this.findById) {
          this.test = deepcopyArr(this.arrList);
          if (this.formTemplate) {
            if (typeof (this.findById.param.params[this.formTemplate.paramsKey]) == 'undefined') {
              this.reset(this.formTemplate.findById, {'params': {[this.formTemplate.paramsKey]: id}});
            } else {
              this.reset(this.findById.url, this.findById.param);
            }
          } else {
            this.reset(this.findById.url, this.findById.param);
          }
        }
        this.render(this.arrList);
      } else {
        this.render(this.arrList);
      }
    },
    inputFile: function () {
    //   if (newFile && !oldFile) {
    //     // 添加文件
    //   };
    //   // 暂时无此功能
    //   if (newFile && oldFile) {
    //     // 更新文件
    //     // 请求报文中带上这条公告的ID
    //     newFile.data = this.data;
    //     // 开始上传
    //     if (newFile.active !== oldFile.active) {
    //       console.log("Start upload", newFile.active, newFile);
    //       // 限定最小字节
    //       // if (newFile.size >= 0 && newFile.size < 100 * 1024 * 1024) {
    //       //   newFile = this.$refs.upload.update(newFile, { error: "size" });
    //       // }
    //     };

    //     // 上传进度
    //     if (newFile.progress !== oldFile.progress) {
    //       console.log("progress", newFile.progress, newFile);
    //     };
    //     // 上传错误
    //     if (newFile.error !== oldFile.error) {
    //       // 判断浏览器
    //       if (this.common.BrowserType() == "IE9") {
    //         this.common.MessageBoxalert('上传失败', "消息", "确认", "error").then(() => {
    //             window.reload();
    //         })
    //       }else {
    //         this.common.submitMsg(newFile.response);
    //       };
    //     };
    //     // 上传成功
    //     if (newFile.success !== oldFile.success) {
    //       let uploaded = this.$refs.upload.uploaded;
    //       // 记录已上传附件的数量
    //       this.uploadNum ++;
    //       // 筛选出新上传文件的长度，新上传文件都无noticeId，针对编辑页附件回显与新增
    //       // this.uploadHandle.parentIdKey，父集id名
    //       this.newFilesLength = this.newFilesLength ? this.newFilesLength : this.files.filter(item => !item[this.uploadHandle.parentIdKey]).length;
    //       // 全部上传成功之后，弹成功弹出框
    //       if (this.uploadNum == this.newFilesLength) {
    //         // 判断浏览器,IE9返回值newFile.response需单独处理，所以单独弹框
    //         if (this.common.BrowserType() == "IE9") {
      // let ieRes = newFile.response.replace(/<.+?>/g,'');
      // let resData = ieRes.replace(/\\/g,'');
      // this.common.submitMsg(JSON.parse(resData), this).then(() => {
      //   this.$emit('close');
      // });

    //         }else {
    //           // 返回的是text类型，需要转为对象
      // this.common.submitMsg(JSON.parse(newFile.response), this).then(() => {
      //   this.$emit('close');
      // });

    //         };
    //       };
    //     };
    //   };
    },
    // /**
    //  * Pretreatment
    //  * @param  Object|undefined   newFile   读写
    //  * @param  Object|undefined   oldFile   只读
    //  * @param  Function           prevent   阻止回调
    //  * @return undefined
    //  */
    // 添加，删除之前调的方法，根据新老文件状态判断上传文件状态
    // 如果 newFile 值为 undefined 则是删除
    // 如果 oldFile 值为 undefined 则是添加
    inputFilter: function (newFile, oldFile, prevent, accept, size) {
      if (newFile && !oldFile) {
        // 限制上传文件的格式
        if (accept) {
          // 拼接正则校验规则，拼接为'jpg|png'这种格式
          var formatCheck = accept.split(',').join('|');
          // 正则校验
          var regularCheck = new RegExp('.(' + formatCheck + ')$');
          if (
            !regularCheck.test(newFile.name)
          ) {
            this.$message({
              message: '上传格式不正确!',
              type: 'warning'
            });
            return prevent();
          }
        }
        // IE9上传处理，获取文件大小。（此组件size属性不支持IE9）
        if (this.common.BrowserType() == 'IE9') {
          var path = newFile.el.value; // 这里是你的文件路径
          var fso = new ActiveXObject('Scripting.FileSystemObject');
          var fileSize = fso.GetFile(path).size;
          newFile.size = fileSize;
        }
        // // 限制上传文件的大小小于100MB
        if (newFile.size > size * 1024 * 1024) {
          this.$message({
            message: '上传文件应小于 ' + size + 'MB!',
            type: 'warning'
          });
          return prevent();
        }
        // // 创建 blob 字段 用于图片预览
        // // 新增页面的预览
        // if (this.uploadHandle.operation == 'add' && this.uploadHandle.preview == true) {
        //   newFile.blob = "";
        //   let URL = window.URL || window.webkitURL;
        //   if (URL && URL.createObjectURL) {
        //     newFile.blob = URL.createObjectURL(newFile.file);
        //   }
        // };
      }
      return true;
    },
    bindForm(val, obj) {
      this.formItem[val] = obj.value;
    }
  },
  created() {
    this.init();
  },
  mounted() {
    window.bindForm = (val, obj) => {
      this.bindForm(val, obj);
    };
  }
};

</script>
<style scope="less">
    .record {
      position:relative;
      width: 10%;
      color: #676767;
      font-size: 14px;
      border-bottom: 1px solid rgb(221, 218, 218);
      margin-bottom: 10px;
      padding-bottom: 10px;
    }

    .title {
      padding-top: 20px;
      padding-bottom: 15px;
      text-align: center
    }
    .addItem{
        float: right;
    }
    .filterCheckbox{
        width: 90%;
        margin:0 auto;
        border:1px solid #DCDFE6;
        padding: 20px 30px 20px;
        border-radius: 4px;
        margin-left: 20px;
    }
    /* tags 标签被覆盖 */
    /* .el-scrollbar__wrap {
      overflow-x: hidden;
    } */
    /* 去掉el-scrollbar的滚动条 */
    .el-scrollbar__thumb{
      visibility: hidden;
    }
    .eventClickStyle input{
      cursor: pointer !important;
    }

    .formFooter{
        right: 60px;
        width: 100%;
        background-color:#fff;
        z-Index: 2;
    }
    .formFooterFixBottom{
      bottom: 3px;
      position: fixed;
      width: calc(100% - 235px);
      right: 5px;
      background-color:#fff;
      z-Index: 2;
    }
    .el-dialog .formFooter{
      border-radius: 0px 0px 12px 12px;
    }
</style>
