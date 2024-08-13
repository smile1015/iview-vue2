<template>
  <div class="i-checkbox">
    <label>
      <span>
        <input type="checkbox" :checked="checked" @change="change">
      </span>
      <slot></slot>
    </label>
  </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
  name: 'iCheckbox',
  mixins: [emitter],
  props: {
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
      currentValue: this.value
    }
  },
  computed: {
    checked() {
      return this.currentValue === this.trueValue
    }
  },
  watch: {
    value(newValue) {
      console.log('this.value', newValue)
      // Ensure the value is correctly handled for empty string ""
      if (newValue === '' || newValue === this.trueValue || newValue === this.falseValue) {
        this.currentValue = newValue
      } else {
        throw 'value should be trueValue or falseValue'
      }
    }
  },
  methods: {
    change(e) {
      this.currentValue = e.target.checked ? this.trueValue : this.falseValue
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)

      this.dispatch('iFormItem', 'on-form-change')
    }
  }
}
</script>

<style scoped></style>
