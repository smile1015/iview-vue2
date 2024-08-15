<template>
  <div class="i-display" ref="display"></div>
</template>
<script>
import Vue from "vue";
import randomStr from "@/utils/random_str";

export default {
  name: 'iDisplay',
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      html: '',
      js: '',
      css: '',
      component: null,
      id: randomStr()
    }
  },
  watch: {
    code() {
      this.destroyCode();
      this.renderCode();
    }
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode() {
      this.js = this.getSource(this.code, 'script').replace(/export default/, 'return ')
      this.css = this.getSource(this.code, 'style')
      this.html = this.getSource(this.code, 'template')
    },
    renderCode() {
      this.splitCode()

      if (this.html !== '' && this.js !== '') {
        const parseStrToFunc = new Function(this.js)()
        console.log(parseStrToFunc)

        parseStrToFunc.template = this.html
        const Component = Vue.extend(parseStrToFunc)
        this.component = new Component().$mount()

        this.$refs.display.appendChild(this.component.$el)

        if (this.css !== '') {
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style)
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id)
      if ($target) $target.parentNode.removeChild($target)

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = null
      }
    }
  },
  mounted() {
    this.renderCode()
  },
  beforeDestroy() {
    this.destroyCode()
  }
}
</script>
