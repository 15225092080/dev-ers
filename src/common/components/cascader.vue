<template>
   <el-cascader
        :options="options"
        :props="defaultprops"
        v-model="svalue"
        style="width:100%;"
        clearable
         @change="handleChange"
         :disabled="disabled"
    ></el-cascader>
     <!-- 暂时只支持行政区划的级联（暂时需要级联的也只有行政区划） -->
</template>
<script>
export default {
  data() {
    return {
      options: [],
      svalue: [],
      defaultprops: {
        value: 'code',
        label: 'dictName'
      }
    };
  },
  watch: {
    svalue(val, oldVal) {
      if (val != oldVal) {
        this.$emit('input', this.svalue);
      }
    },
    value(val, oldVal) {
      if (val != oldVal) {
        this.svalue = this.value;
      }
    }
  },
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    handleChange(areaArr) {
      this.svalue = areaArr[areaArr.length - 1];
    }
  },
  mounted() {
    this.svalue = this.value;
    let systemId = sessionStorage.getItem('systemId');
    // 判断缓存中是否有行政区域数据，若无则请求
    if (sessionStorage.getItem(systemId + '_getArea')) {
      this.options = JSON.parse(sessionStorage.getItem(systemId + '_getArea'));
    } else {
      this.http.apiGet(this.$urlList.common.getArea, {params: {typeId: 'T_MB_0001'}}).then((res) => {
        this.options = res.data || res;
        sessionStorage.setItem(systemId + '_getArea', JSON.stringify(this.options));
      });
    }
  }
};
</script>

<style>

</style>
