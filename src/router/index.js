import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import music from '@/components/music'
// import musicList from '@/components/musicList'
import musicDetails from '@/components/musicDetails'
import article from '@/components/article'
import writeArticle from '@/components/writeArticle'
import articleDetails from '@/components/articleDetails'
import user from '@/components/user'
//import userCredit from '@/components/userCredit'
import userCreditIn from '@/components/userCreditIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta:{
        index:1
      }
    },
    {
      path: '/login',
      component: login
    },
    {
      path:'/article',
      component:article,
      meta:{
        index:2
      }
    },
    {
      path:'/music',
      component:music,
      meta:{
        index:3
      },
      children:[
        {
          path:'musicDetails',
          component:musicDetails
        },
      ]
    },
    {
      path:'/user',
      component:user,
      meta:{
        index:4
      },
      children:[
        {
          path:'userCreditIn',
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
      component:writeArticle
    },
    {
      path:'/articleDetails:id',
      component:articleDetails
    },
    
  ]
})
