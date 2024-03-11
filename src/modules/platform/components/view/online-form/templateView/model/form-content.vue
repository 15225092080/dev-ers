<template>
  <div>
    <el-row v-for="(arr, index) in arrList"
            :key="index">
      <el-col :span="currentSpan(item[1].view)"
              v-for="(item,idx) in arr"
              :key="idx">
        <el-form-item :label="item[1].title"
                      :prop="item[0]">
          <!-- 'file','image' -->
          <o-upload v-if="['file','image'].indexOf(item[1].view)!==-1"
                    :type="item[1].view"
                    v-model.trim="form[item[0]]"
                    :field="item[0]"
                    :disabled="isDisabled(item[1])"
                    :limit="getUploadLimit(item[1].fieldExtendJson)"
                    :uploadUrl="uploadUrl"
                    @validateField="validateField">
          </o-upload>
          <!-- 'date','datetime' -->
          <el-date-picker v-if="['date','datetime'].indexOf(item[1].view)!==-1"
                          v-model.trim="form[item[0]]"
                          :key="item[0]"
                          :type="item[1].view"
                          :editable="false"
                          :value-format="dateFormat[item[1].view]"
                          :placeholder="isDisabled(item[1]) ? '' : preObj[item[1].view] + item[1].title"
                          :disabled="isDisabled(item[1])">
          </el-date-picker>
          <!-- radio -->
          <div v-if="item[1].view === 'radio'">
            <el-radio-group v-model.trim="form[item[0]]"
                            :disabled="isDisabled(item[1])">
              <el-radio v-for="(radio,idx) in item[1].enum"
                        :key="idx"
                        :label="radio.value">{{radio.label || radio.text || radio.title}}</el-radio>
            </el-radio-group>
          </div>
          <!-- checkbox -->
          <template v-if="item[1].view === 'checkbox'">
            <o-check-box v-model.trim="form[item[0]]"
                         :disabled="isDisabled(item[1])"
                         :options="item[1].enum"></o-check-box>
          </template>
          <!-- select -->
          <o-select v-if="['list','list_multi'].indexOf(item[1].view)!==-1"
                    :multiple="item[1].view === 'list_multi'"
                    v-model.trim="form[item[0]]"
                    :dictCode="item[1].dictCode"
                    :dictTable="item[1].dictTable"
                    :dictText="item[1].dictText"
                    :options="item[1].enum"
                    :placeholder="preObj[item[1].view] + item[1].title"
                    :disabled="isDisabled(item[1])"></o-select>
          <!-- inputNumber -->
          <el-input-number v-if="item[1].view === 'number'"
                           v-model.trim="form[item[0]]"
                           controls-position="right"
                           :placeholder="isDisabled(item[1]) ? '' : preObj[item[1].view] + item[1].title"
                           :disabled="isDisabled(item[1])"></el-input-number>
          <!-- textarea -->
          <el-input v-if="item[1].view === 'textarea'"
                    type="textarea"
                    :rows="4"
                    v-model.trim="form[item[0]]"
                    :maxlength="item[1].maxLength"
                    :placeholder="isDisabled(item[1]) ? '' : preObj[item[1].view] + item[1].title"
                    :disabled="isDisabled(item[1])">
          </el-input>
          <!-- input -->
          <el-input v-if="item[1].view === 'text'"
                    v-model.trim="form[item[0]]"
                    :maxlength="item[1].maxLength"
                    :placeholder="isDisabled(item[1]) ? '' : preObj[item[1].view] + item[1].title"
                    :disabled="isDisabled(item[1])"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import oCheckBox from '../../common/components/checkbox.vue';
import oSelect from '../../common/components/select.vue';
import oUpload from '../../common/components/upload.vue';
export default {
  components: { oSelect, oUpload, oCheckBox },
  data() {
    return {
      uploadUrl: process.env.API_ROOT_PLATFORM + this.$urlList.onlineCommon.upload,
      dateFormat: {
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
      },
    };
  },
  props: {
    formTemplate: {
      type: String | Number,
      default: '2',
    },
    preObj: {
      type: Object,
      default: function () {
        return {};
      },
    },
    arrList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    editParam: {
      type: Object,
      default: function () {
        return {};
      },
    },
    form: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    currentSpan() {
      return (view) => {
        return ['file', 'image', 'textarea'].indexOf(view) == -1 ? Math.floor(24 / this.formTemplate) : 24;
      };
    },
    isDisabled() {
      return (obj) => {
        return this.editParam.isDetail || (obj.ui && obj.ui.widgetattrs && obj.ui.widgetattrs.disabled);
      };
    },
    getUploadLimit() {
      return (fieldExtendJson) => {
        if (fieldExtendJson) {
          const extend = JSON.parse(fieldExtendJson);
          return extend.uploadnum ? parseInt(extend.uploadnum) : 0;
        } else {
          return 0;
        }
      };
    },
  },
  methods: {
    validateField(field) {
      this.$parent.validateField(field);
    },
  },
};
</script>
