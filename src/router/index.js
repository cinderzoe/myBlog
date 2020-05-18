import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import music from '@/components/music'
import musicList from '@/components/musicList'
import musicDetails from '@/components/musicDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/music',
      name:'music',
      component:music
    },
    {
      path:'/musicList',
      name:'musicList',
      component:musicList
    },{
      path:'/musicDetails',
      name:'musicDetails',
      component:musicDetails
    }
  ]
})