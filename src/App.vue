<template>
  <div id="app">
    <!-- <app-header v-if="!(this.$route.path==='/login')"></app-header> -->
    <app-header v-if="headerShow"></app-header>
    <transition :name="transitionName">
      <keep-alive><router-view/></keep-alive>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './common/header'
import Footer from './common/footer'
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to My blor',
      transitionName:''
    }
  },
  components: {
      'app-header':Header,
      'app-footer':Footer,
  },
  beforeCreate(){
    var _this=this;
    if(window.localStorage.getItem('tokenid')){
      this.$axios.post('/checktoken',{
        headers:{
            Authorization:window.localStorage.getItem('tokenid')
          }
      })
      .then(res=>{
        console.log(res)
        if (res.data.status==200) {
          _this.$store.commit('changeUserName', res.data.user)
          console.log(res.data.user)
          console.log(_this.$store.state.user_name)
        }else if(res.data.status=202){
          this.$router.replace('/login')
        }
      })
      .catch(err=>{
        this.$router.replace('/login')
      });
    }else{
      this.$router.replace('/login')
    }
  },
  computed:{
    // headerShow:function(){
    //   return this.$store.state.header;
    // },
    // footerShow:function(){
    //   return this.$store.state.footer;
    // }
    headerShow:{
      get:function(){
        return this.$store.state.header;
      },
      set:function(){
        
      }
    },
  },
  created(){
    console.log("有经过app.vue页面")
    this.headerShow=this.$store.state.header
  },
  methods:{
    
  },
  activated(){
    console.log(this.transitionName)
  },
  watch: {
    '$route' (to, from) {
      if(to){
        console.log("左")
        console.log(to)
        this.transitionName ='slide-left'
      }else{
        console.log('右')
        this.transitionName ='slide-right'
      }
      //this.transitionName =''
    }
  }

}
</script>

<style>
#app {
  font-family: '黑体','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1.4rem 0 0;
  font-size: 0.45rem;
  min-height: 100vh;
  box-sizing: border-box;
}
.views {
  position: absolute;
  width: 100%;
  transition: all .8s ease;
  top: 0;
 }

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
 
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
 
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
 
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
 
.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
