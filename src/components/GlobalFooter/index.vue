<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a>巡检平台</a>
<!--      <a href="https://www.github.com/vueComponent/pro-layout" target="_blank">巡检平台</a>-->
<!--      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>-->
<!--      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>-->
    </template>
    <template v-slot:copyright>
<!--      <a href="https://github.com/vueComponent" target="_blank">巡检平台</a>-->
      <a>&copy;2022 近物所</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
