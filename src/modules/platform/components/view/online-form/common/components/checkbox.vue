<template>
  <el-checkbox-group v-model.trim="currentVal"
                     :disabled="disabled"
                     @change="handleChange">
    <el-checkbox v-for="(chk,idx) in currentOptions"
                 :key="idx"
                 :label="chk.value">{{chk.label || chk.text || chk.title}}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  data() {
    return {
      currentOptions: [],
      currentVal: [],
    };
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        const value = val ? val.split(',') : [];
        this.currentVal = value;
      },
    },
  },
  methods: {
    handleChange(val) {
      const value = val ? val.join(',') : '';
      this.$emit('input', value);
    },
  },
  mounted() {
    if (this.options.length > 0) {
      this.currentOptions = this.options;
    }
  },
};
</script>
