import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

const home = ()=>import('../page/home/home')
const city = ()=>import('../page/city/city')
//引入新创建的 msite
const msite = ()=>import('../page/msite/msite')


export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: App,
    children:[
      {
        path:'',//地址为空时，自动跳转到 /home
        redirect:'/home'
      },
      {
        path:'/home',
        component:home
      },
      {
        //home 页面 会将城市的 id 传给 city页，在路由中指明参数 ：id
        path:'/city/:cityid',
        component:city
      },
        {
        //home 页面 会将城市的 id 传给 city页，在路由中指明参数 ：id
        path:'/msite',
        component:msite
      }
    ]
  }]
})