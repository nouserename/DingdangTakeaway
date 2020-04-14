import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
Vue.use(Router)

const home = () => import('../page/home/home')
const city = () => import('../page/city/city')
const msite = () => import('../page/msite/msite')
const food = () => import('../page/food/food')
const login = () => import('../page/login/login')
const forget = () => import('../page/forget/forget')
const shop = () => import('../page/shop/shop')
const shopDetail = () => import('../page/shop/children/shopDetail')
const confirmOrder = () => import('../page/confirmOrder/confirmOrder')
const payment = () => import('../page/confirmOrder/children/payment')
const remark = () => import('../page/confirmOrder/children/remark')
const chooseAddress = () => import('../page/confirmOrder/children/chooseAddress')
const addAddress = () => import('../page/confirmOrder/children/children/addAddress')
const searchAddress = () => import('../page/confirmOrder/children/children/children/searchAddress')
const search = () => import('../page/search/search')
const order = () => import('../page/order/order')
const orderDetail = () => import('../page/order/children/orderDetail')
const profile = ()=> import('../page/profile/profile')
const info = ()=> import('../page/profile/children/info')
const address = ()=> import('../page/profile/children/children/address')
const setusername = ()=> import('../page/profile/children/children/setusername')
const add = ()=> import('../page/profile/children/children/children/add')
const addDetail = ()=> import('../page/profile/children/children/children/children/addDetail')



export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: App,
    children: [{
        path: '', //地址为空时，自动跳转到 /home
        redirect: '/home'
      },
      {
        path: '/home',
        component: home
      },
      {
        //home 页面 会将城市的 id 传给 city页，在路由中指明参数 ：id
        path: '/city/:cityid',
        component: city
      },
      {
        //home 页面 会将城市的 id 传给 city页，在路由中指明参数 ：id
        path: '/msite',
        component: msite
      },
      {
        path: '/food',
        component: food
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/forget',
        component: forget
      },
      {
        path: '/shop',
        component: shop,
        children: [{
          path: 'shopDetail',
          component: shopDetail
        }]
      },
        //确认订单页
        {
          path: '/confirmOrder',
          component: confirmOrder,
          children: [{
              path: 'remark', //订单备注
              component: remark,
          }, 
          {
              path: 'payment', //付款页面
              component: payment,
          }, 
           {
              path: 'chooseAddress', //选择地址
              component: chooseAddress,
              children: [{
                  path: 'addAddress', //添加地址
                  component: addAddress,
                  children: [{
                      path: 'searchAddress', //搜索地址
                      component: searchAddress,
                  }]
              }, ]
          }, ]
      },
      //搜索页
      {
        path:'search/:geohash',
        component:search,
        name:'search'
      },
      //订单列表页
      {
        path:'/order',
        component:order,
        children: [{
          path: 'orderDetail',
          component: orderDetail
        }]
      },
        //个人信息页
        {
          path: '/profile',
          component: profile,
          children: [{
              path: 'info', //个人信息详情页
              component: info,
              children: [{
                  path: 'setusername',
                  component: setusername,
              },{
                  path: 'address',
                  component: address,     //编辑地址
                  children:[{
                      path:'add',
                      component:add,
                      children:[{
                          path:'addDetail',
                          component:addDetail
                      }]
                  }]
              }]
          },
]
      },
    ]
  }]
})