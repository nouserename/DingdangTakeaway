<template>
  <div>
    <p>home page</p>
    <router-link to="/helloworld">helloworld</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  $font-color:red;

  p{
    color:$font-color
  }
</style>