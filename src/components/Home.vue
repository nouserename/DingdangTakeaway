<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>count:{{this.$store.state.count}}</p>
    <!-- 绑定点击事件 -->
    <button @click="add">ADD</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'home'
    }
  },
  methods:{
    add:function(){
      //使用 commit 触发muations 还可以使用 vuex 辅助函数 mapMutations 自动映射
      this.$store.commit('add')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>