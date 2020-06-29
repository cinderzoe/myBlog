import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import music from '@/components/music'
import musicDetails from '@/components/musicDetails'
import article from '@/components/article'
import writeArticle from '@/components/writeArticle'
import articleDetails from '@/components/articleDetails'
import user from '@/components/user'
import userCreditIn from '@/components/userCreditIn'
import indexArticle from '@/components/indexArticle'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      name:'index',
      component: index,
      meta:{
        index:1
      }
    },
    {
      path: '/login',
      name:'login',
      component: login
    },
    {
      path:'/article',
      name:'article',
      component:article,
      meta:{
        index:2
      }
    },
    {
      path:'/music',
      name:'music',
      component:music,
      meta:{
        index:3
      },
      children:[
        {
          path:'musicDetails',
          name:'musicDetails',
          component:musicDetails
        },
      ]
    },
    {
      path:'/user',
      name:'user',
      component:user,
      meta:{
        index:4
      },
      children:[
        {
          path:'userCreditIn',
          name:'userCreditIn',
          component:userCreditIn
        }
      ]
      // children:[
      // {
      //   path:'user',
      //   component:user
      // },
      // {
      //   path:'userCredit',
      //   component:userCredit
      // } 
      // ]
    },
    // {
    //   path:'/userCredit',
    //   component:userCredit,
    //   children:[
    //     {
    //       path:'userCreditIn',
    //       component:userCreditIn
    //     }
    //   ]
    // }, 
    {
      path:'/writeArticle',
      name:'writeArticle',
      component:writeArticle
    },
    {
      path:'/articleDetails:id',
      name:'articleDetails',
      component:articleDetails
    },
    {
      path:'/indexArticle',
      name:'indexArticle',
      component:indexArticle
    },
    
  ]
})
