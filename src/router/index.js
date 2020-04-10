import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'  //@ 会根据配置自动 转换成src 文件夹
import Home from '@/components/Home'
import App from '../App' //引入 App.vue

Vue.use(Router) //在vue中注册 vue-router

export default new Router({
  mode:'hash',//指定路由为 hash 模式
  routes: [
    {
      path: '/',
      component: App,
      children:[ //二级路由
      {
          path:'',//路由为根路由自动重定向到 /home
          redirect:'/home'
      },
        {
        path:'/home',
        component:Home
      },
      {
        path:'/helloworld',
        component:HelloWorld
      }
      ]
    }
  ]
})