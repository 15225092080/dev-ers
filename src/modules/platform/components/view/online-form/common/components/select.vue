<template>
  <el-select v-model="currentVal"
             value-key="value"
             :multiple="multiple"
             :placeholder="disabled ? '' :placeholder"
             @change="eventChange"
             :clearable="clearable"
             :disabled="disabled"
             :filterable="filterable"
             :allow-create="allowCreate">
    <el-option v-for="item in currentOptions"
               :key="item.value"
               :label="item.label || item.text || item.title"
               :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'oSelect',
  data() {
    return {
      currentOptions: [],
      currentVal: '',
    };
  },
  props: {
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false,
    },
    clearable: {
      // 是否允许删除
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: [String, Number, Array],
    },
    dictCode: {
      type: String,
    },
    dictTable: {
      type: String,
    },
    dictText: {
      type: String,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    changeEventParam: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        const value = this.multiple && !Array.isArray(val) ? (val ? val.split(',') : []) : val;
        this.currentVal = value;
      },
    },
  },
  methods: {
    eventChange(val) {
      const value = this.multiple ? (val && val.length > 0 ? val.join(',') : '') : val;
      this.$emit('input', value);
      this.$nextTick(() => {
        if (this.changeEventParam) {
          this.$emit('eventChange', this.changeEventParam);
        }
      });
    },
    empty() {
      this.currentVal = this.multiple ? [] : '';
    },
  },
  created() {},
  mounted() {
    if (this.options.length > 0) {
      this.currentOptions = this.options;
    }
  },
};
</script>
