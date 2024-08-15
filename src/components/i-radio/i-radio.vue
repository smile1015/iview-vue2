<template>
  <div class="i-radio">
    <label>
      <input type="radio" :value="label" v-model="model" @change="change">
      <slot></slot>
    </label>
  </div>
</template>

<script>
import {findComponentUpward} from "@/utils/assist";

export default {
  name: 'iRadio',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: '',
      parent: null,
      group: false
    }
  },
  methods: {
    change() {
      console.log('dddd', this.parent)
      this.parent.change(this.model)
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, 'iRadioGroup')
    if (this.parent) {
      this.group = true
    }

    if (!this.group) {
      console.warn('i-radio组件需要和i-radio-group配合使用!')
    }

  }
}

</script>

<style scoped>

</style>
