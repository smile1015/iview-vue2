<template>
  <div class="i-radio-group">
    <slot></slot>
  </div>
</template>

<script>

import {findComponentsDownward} from "@/utils/assist";

export default {
  name: 'iRadioGroup',
  props: {
    value: {
      type: [String, Number],
      default: ''
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
      this.updateModel()
    }
  },
  methods: {
    change(data) {
      this.currentValue = data
      this.$emit('input', data)
    },
    updateModel() {
      this.children = findComponentsDownward(this, 'iRadio')
      if (this.children) {
        this.children.forEach(child => {
          const {value} = this
          child.model = value
          child.group = true
        })
      }
    }
  },
  mounted() {
    this.updateModel()
  }
}
</script>
