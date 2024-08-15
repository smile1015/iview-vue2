<template>
  <div id="app">
    <i-form ref="form" :model="model" :rules="rules">
      <i-form-item label="用户名" prop="username">
        <i-input v-model="model.username"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="model.email"></i-input>
      </i-form-item>

      <i-form-item prop="agree">
        <i-checkbox v-model="model.agree" trueValue="Y" falseValue="N">是否同意上述协议</i-checkbox>
      </i-form-item>

      <i-form-item prop="habit">
        <i-checkbox-group v-model="model.habits">
          <i-checkbox label="eat">吃饭</i-checkbox>
          <i-checkbox label="sleep">睡觉</i-checkbox>
        </i-checkbox-group>
      </i-form-item>

      <i-form-item prop="sex">
        <i-radio-group v-model="model.sex">
          <i-radio label="man">男</i-radio>
          <i-radio label="woman">女</i-radio>
        </i-radio-group>
      </i-form-item>

      <button @click="submit">提交</button>
      <button @click="reset">重置</button>
    </i-form>
    {{ model }}
    <div>

      <i-display :code="code"></i-display>
    </div>
  </div>
</template>

<script>
import IForm from '@/components/i-form/i-form.vue'
import IFormItem from '@/components/i-form/i-form-item.vue'
import IInput from '@/components/i-input/i-input.vue'
import ICheckbox from '@/components/i-checkbox/i-checkbox.vue'
import ICheckboxGroup from "@/components/i-checkbox/i-checkbox-group.vue";
import IRadioGroup from "@/components/i-radio/i-radio-group.vue";
import IRadio from "@/components/i-radio/i-radio.vue";
import IDisplay from "@/components/i-display/display.vue";
import defaultCode from '@/view/default-code'

export default {
  name: 'App',
  components: {
    IDisplay,
    IRadio,
    IRadioGroup,
    ICheckboxGroup,
    IForm,
    IFormItem,
    IInput,
    ICheckbox
  },
  data() {
    return {
      code: defaultCode,
      model: {
        username: '',
        email: '',
        agree: 'N',
        habits: [],
        sex: 'woman'
      },
      rules: {
        username: [
          { type: 'string', required: true, message: '必须填写用户名', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '必须填写邮箱', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请先勾选协议', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    'model.agree'() {
      console.log('model', this.model)
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('校验通过')
        } else {
          console.log('校验不通过')
        }
      })
    },
    reset() {
      this.$refs.form.reset()
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
