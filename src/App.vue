<template>
  <div id="app">
    <i-form :model="model" :rules="rules">
      <i-form-item label="username" prop="username">
        <i-input></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import IForm from '@/components/i-form/i-form.vue'
import IFormItem from '@/components/i-form/i-form-item.vue'
import IInput from '@/components/i-input/i-input.vue'

export default {
  name: 'App',
  components: {
    IForm,
    IFormItem,
    IInput
  },
  data() {
    return {
      model: {
        username: ''
      },
      rules: {
        username: [
          { type: 'string', required: true, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
