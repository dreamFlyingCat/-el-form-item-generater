<template>
  <fragment>
    <el-row class="generate-form-wrapper">
      <el-col v-for="item in getforms" :key="item.name" :span="item.col || 8">
        <!-- slot -->
        <slot v-if="item.slot" :name="item.name" />
        <!-- 仅用于展示 -->
        <div v-else-if="justShow" :class="'generate-show-item ' + (item.class || '')">
          <span class="form-label">{{ item.label }}:&nbsp;&nbsp;&nbsp;</span>
          <Upload
            v-if="item.type === 'upload'"
            :type="item.uploadType"
            :image-url="item.imageUrl"
            :file-name="item.fileName"
            :on-success="item.onSuccess"
            :on-change="item.handleChange"
            :action="item.action"
            :limit="item.limit"
            :pattern="item.patterns"
          />
          <el-link v-else-if="item.type === 'link'" type="primary" @click="item.tolink">{{ item.name }}</el-link>
          <span v-else class="form-value">{{ getValues(item) }}</span>
        </div>
        <!-- 各种表单处理 -->
        <el-form-item
          v-else 
          :prop="item.name"
          :class="item.class || ''"
          :label="item.label"
          :label-width="item.width || '300'"
        >
          <!-- 文本和数字输入框 -->
          <el-input
            v-if="item.type === 'input' || item.type === 'number'"
            v-model="models[item.bindKey || item.name]"
            :disabled="!!item.disabled"
            :type="item.type"
            :placeholder="item.placeholder || '请输入'"
            clearable
          >
            <template v-if="item.unit" slot="append">{{ item.unit }}</template>
          </el-input>
          <!-- 日期和日期范围 -->
          <el-date-picker
            v-else-if="item.type === 'date' || item.type === 'daterange'"
            v-model="models[item.bindKey || item.name]"
            :disabled="!!item.disabled"
            :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
            :type="item.type"
            :placeholder="item.placeholder || '选择日期'"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="item.change && item.change()"
          />
          <!-- 下拉选择 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="models[item.bindKey || item.name]"
            :disabled="item.disabled"
            :multiple="item.multiple"
            :clearable="item.clearable"
            :placeholder="item.placeholder || '请选择'"
            filterable
          >
            <el-option
              v-for="sel in item.data"
              :key="item.optionKey ? sel[item.optionKey] : sel.value"
              :label="item.optionLabel ? sel[item.optionLabel] : sel.label"
              :value="item.optionValue ? sel[item.optionValue] : sel.value"
              @change="item.change && item.change()"
            />
          </el-select>
          <!-- 单选 -->
          <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="models[item.bindKey || item.name]"
            :disabled="!!item.disabled"
            @change="item.change && item.change()"
          >
            <el-radio v-for="op in item.data" :key="op.value" :disabled="op.disabled" :label="op.value">{{
              op.label
            }}</el-radio>
          </el-radio-group>
          <!-- checkbox -->
          <el-checkbox-group v-else-if="item.type === 'checkbox'" v-model="models[item.bindKey || item.name]">
            <el-checkbox v-for="op in item.data" :key="op.value" :disabled="op.disabled" :label="op.value">{{
              op.label
            }}</el-checkbox>
          </el-checkbox-group>
          <!-- textarea -->
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="models[item.bindKey || item.name]"
            :disabled="!!item.disabled"
            type="textarea"
            :rows="item.row || 3"
            :placeholder="item.placeholder || '请输入内容'"
            clearable
          />
          <!-- 图片上传 -->
          <Upload
            v-else-if="item.type === 'upload'"
            :type="item.uploadType"
            :image-url="item.imageUrl"
            :file-name="item.fileName"
            :on-success="item.onSuccess"
            :on-change="item.handleChange"
            :action="item.action"
            :limit="item.limit"
          />
          <!-- link -->
        </el-form-item>
      </el-col>
    </el-row>
  </fragment>
</template>
<script>
import Upload from './Upload.vue'
export default {
  name: 'GenerateFormItem',
  components: {
    Upload
  },
  props: {
    forms: {
      type: Array,
      default: () => [],
      require: true
    },
    models: {
      type: Object,
      default: () => ({}),
      require: true
    },
    showValues: {
      // 展示的值合集
      type: Object,
      default: () => ({}),
      require: true
    },
    justShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    getforms() {
      return this.justShow ? this.forms.filter(item => !item.isnotshow) : this.forms
    }
  },
  methods: {
    onSucess(res, file, item) {
      this.models[item.bindKey || item.name] = res.data.link
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    getValues(item) {
      const value = this.showValues[item.bindKey || item.name]
      const { type, data, optionLabel = '', optionValue = '' } = item
      try {
        if (!['radio', 'select', 'checkbox'].includes(type)) return value
        const labelKey = optionLabel || 'label'
        const valueKey = optionValue || 'value'
        // 数组处理
        if (value instanceof Array) {
          const valueArr = []
          value.forEach(v => {
            const selected = data.find(item => {
              if (typeof v === 'number') return Number(item[valueKey]) === v
              else return item[valueKey] === v
            })
            selected && valueArr.push(selected[labelKey])
          })
          return valueArr.join('，')
        } else {
          const selected = data.find(item => {
            if (typeof value === 'number') return Number(item[valueKey]) === value
            else return item[valueKey] === value
          })
          if (selected) return selected[labelKey]
        }
        return value
      } catch (e) {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.generate-form-wrapper {
  display: flex;
  flex-wrap: wrap;
  .el-col {
    margin-bottom: 20px;
  }
  .el-form-item {
    margin: 0;
    display: flex;
    .el-form-item__label {
      flex-shrink: 0;
    }
    > .el-form-item__content,
    .el-select,
    .el-date-editor {
      // display: flex;
      flex: 1;
      width: 100%;
    }
  }
  .form-label {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
  }
  .generate-show-item {
    display: flex;
  }
}
</style>
