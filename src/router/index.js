import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'  //@ 会根据配置自动 映射成src 文件夹
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/home',//路由路径
      name:'Home',
      component:Home //路由指定渲染那个组件
    }
  ]
})