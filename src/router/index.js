import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

const home = ()=>import('../page/home/home')
const city = ()=>import('../page/city/city')

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: App,
    children:[
      {
        path:'',//��ַΪ��ʱ���Զ���ת�� /home
        redirect:'/home'
      },
      {
        path:'/home',
        component:home
      },
      {
        //home ҳ�� �Ὣ���е� cityid ���� cityҳ����·����ָ������ cityid
        path:'/city/:cityid',
        component:city
      }
    ]
  }]
})