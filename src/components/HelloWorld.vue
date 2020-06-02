<template>
  <div>
    <h1>hello world</h1>
    <p>{{msg}}</p>
    <!-- router-link router内置组件可以实现路由跳转 to属性指定跳转到那个路由 -->
    <router-link to="/home">Home</router-link>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $font-color:red;
  h1{
    color:$font-color
  }
  p{
    color:$font-color
  }
</style>