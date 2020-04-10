<template>
  <div>
    <h1>hello world</h1>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- 指定语言 为 scss lang="scss" -->
<style lang="scss" scoped>
    /* 定义变量 */
  $font-color:red;
  h1{
    color:$font-color
  }
  p{
    color:$font-color
  }
</style>