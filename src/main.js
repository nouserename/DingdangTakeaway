// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App';
import store from './store';
//引入rem移动端适配方案
import './config/rem'
VutionTip e.config.produc= false

new Vue({
  el: '#app',
  router,
  store,
  components:{App},
  template:'<App/>'
})