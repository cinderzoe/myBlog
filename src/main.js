// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import './assets/public.css'
import axios from '../node_modules/axios'
import store from './store/store';
import 'lib-flexible'
import {Button,Form,Field,Toast,Slider} from 'vant'
import 'es6-promise/auto'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import vueJsonp from 'vue-jsonp'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(Vuex)
Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)
Vue.use(Slider)
Vue.use(VueAwesomeSwiper)
Vue.use(vueJsonp)


if (window.location.href.indexOf('lazyzoe.cn') != -1) {
  window.mode = 'API'
  axios.defaults.baseURL = 'http://www.lazyzoe.cn:3000'
} else {
  window.mode = 'DEV'
  axios.defaults.baseURL = 'http://localhost:3000'  //这里是访问的后端接口
}


new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})