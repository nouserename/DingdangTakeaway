import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'  //@ ����������Զ� ת����src �ļ���
import Home from '@/components/Home'
import App from '../App' //���� App.vue

Vue.use(Router) //��vue��ע�� vue-router

export default new Router({
  mode:'hash',//ָ��·��Ϊ hash ģʽ
  routes: [
    {
      path: '/',
      component: App,
      children:[ //����·��
      {
          path:'',//·��Ϊ��·���Զ��ض��� /home
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