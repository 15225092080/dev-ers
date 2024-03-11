<template>
    <div>
        <el-select v-model="svalue" v-if="!multiple" :placeholder="disabled?'':'请选择'" @change="eventChange" :clearable="clearable" :disabled="disabled">
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-select v-model="svalue" v-else multiple :placeholder="disabled?'':'请选择'" @change="eventChange" :clearable="clearable" :disabled="disabled">
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
  name: 'seltopn',
  data() {
    return {
      option: [],
      placeholder: '请选择',
      svalue: ''
    };
  },
  methods: {
    arrayUnique(arr, name) {
      // 去重
      var hash = {};
      return arr.reduce(function (item, next) {
        // hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
        hash[next[name]] ? hash[next[name]] = '' : (hash[next[name]] = true && item.push(next));
        return item;
      }, []);
    },
    emptyDefault() {
      this.svalue = null;
    },
    eventChange(e) {
      let sname = this.name;
      if (this.change) { // 如果绑定就允许绑定下拉事件
        this.$emit('eventChange', {e, sname});
      }
    },
    dicCallBack(){
      let obj;
      if (this.paramtype && sessionStorage.getItem('systemId') + '_' + this.paramtype) {
        obj = JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_' + this.paramtype]);
      } else {
        obj = this.options;
      }

      for (let i in obj) {
        let o = {
          value: i,
          label: obj[i]
        };
        this.option.push(o);
      }
      if (this.filter) {
      // this.filter.map((val, index) => {
        this.filter.map((val) => {
          this.option = this.arrayUnique(this.option, 'value').filter(item => item
            .value != val);
        });
      } else {
        this.option = this.arrayUnique(this.option, 'value');
      }
		if(this.value){
			this.svalue = this.value;
		}else if(this.optionConfig){
            this.svalue = this.option[0] ? this.option[0].value : '';
            if(this.optionConfigFun){
                this.optionConfigFun();
            }
		}
	}
  },
  watch: {
    // 判断下拉框的值是否有改变
    svalue(val, oldVal) {
      if (val != oldVal) {
        this.$emit('input', this.svalue);
      }
    },
    value(val, oldVal) {
      if (val != oldVal) {
        this.svalue = this.value;
      }
    },
    options(newval) {
      this.option = [];
      for (let i in newval) {
        let o = {
          value: i,
          label: newval[i]
        };
        this.option.push(o);
      }
      if (this.filter) {
        this.filter.map((val) => {
          this.option = this.arrayUnique(this.option, 'value').filter(item => item
            .value != val);
        });
      } else {
        this.option = this.arrayUnique(this.option, 'value');
      }
    },
    filter(newval) {
      let obj;
      if (this.paramtype && sessionStorage.getItem('systemId') + '_' + this.paramtype) {
        obj = JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_' + this.paramtype]);
      } else {
        obj = this.options;
      }
      for (let i in obj) {
        let o = {
          value: i,
          label: obj[i]
        };
        this.option.push(o);
      }
      newval.map((val) => {
        this.option = this.arrayUnique(this.option, 'value').filter(item => item
          .value != val);
      });
    }
  },
  props: {
    paramtype: {// 字典参数
      type: String
    }, // 跨域请求标志

    value: {
      type: String
    },
    disabled: {// 是否禁用
      type: Boolean
    },
    multiple: {// 是否多选
      type: Boolean
    },
    clearable: {// 是否允许删除
      type: Boolean
    },
    filter: { // 过滤不需要显示的值
      type: Array
    },
    change: { // 是否绑定change事件
      type: Boolean
    },
    name: {
      type: String
    },
    optionConfig: { // 是否默认选中true 选中第一个
      type: Boolean
    },
    optionConfigFun: { // 是否默认选中true 选中第一个
      type: Function
    },
    options: {
      type: Object
    }
  },
  created() { // 初始化 DOM没渲染
    if (this.paramtype) {
      this.common.getdic(this.$urlList.common.dic, this.paramtype, this.dicCallBack);
    }else{
      this.svalue = this.value;
      this.dicCallBack();
    }
  },
  mounted() {
    // 初始话下拉框的值
    if(this.value){
        this.svalue = this.value;
    }else if(this.optionConfig){
        this.svalue = this.option[0] ? this.option[0].value : '';
    }
    /* setTimeout(() => {
      let obj;
      if (this.paramtype && sessionStorage.getItem('systemId') + '_' + this.paramtype) {
        obj = JSON.parse(sessionStorage[sessionStorage.getItem('systemId') + '_' + this.paramtype]);
      } else {
        obj = this.options;
      }

      for (let i in obj) {
        let o = {
          value: i,
          label: obj[i]
        };
        this.option.push(o);
      }
      if (this.filter) {
        // this.filter.map((val, index) => {
        this.filter.map((val) => {
          this.option = this.arrayUnique(this.option, 'value').filter(item => item
            .value != val);
        });
      } else {
        this.option = this.arrayUnique(this.option, 'value');
      }
    }, 550); */
  }
};

</script>
