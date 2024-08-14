<template>
  <div class="i-checkbox">
    <label>
      <span>
        <input v-if="group" type="checkbox" :value="label" v-model="model" @change="change">
        <input v-else type="checkbox" :checked="currentValue" @change="change">
      </span>
      <slot></slot>
    </label>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'
import {findComponentUpward} from "@/utils/assist";

export default {
  name: 'iCheckbox',
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value === this.trueValue,
      group: false,
      parent: null,
      model: []
    }
  },
  watch: {
    value(newValue) {
      if (newValue === this.trueValue || newValue === this.falseValue) {
        this.currentValue = this.value
      } else {
        throw 'value should be trueValue or falseValue'
      }
    }
  },
  methods: {
    updateModel() {
      this.currentValue = this.value === this.trueValue
    },
    change(e) {
      const checked = e.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue;

      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('input', value)
        this.$emit('on-change', value)
        this.dispatch('iFormItem', 'on-form-change')
      }
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')

    if (this.parent) {
      this.group = true
    }

    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  }
}
</script>

<style scoped></style>
