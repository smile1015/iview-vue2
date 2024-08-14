<template>
  <div class="i-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>

import {findComponentsDownward} from "@/utils/assist";
import emitter from '@/mixins/emitter'

export default {
  name: 'iCheckboxGroup',
  mixins: [emitter],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: this.value,
      children: []
    }
  },
  watch: {
    value() {
      this.updateModel(true)
    }
  },
  methods: {
    updateModel(update) {
      this.children = findComponentsDownward(this, 'iCheckbox')
      console.log(this.children)
      if (this.children) {
        const {value} = this
        this.children.forEach(child => {
          child.model = value

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })

      }
    },
    change(data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('iFormItem', 'on-form-change')
    }
  },
  mounted() {
    this.updateModel(true)
  }
}
</script>
