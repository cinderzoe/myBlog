<template>
  <div id="app">
    <!-- <app-header v-if="!(this.$route.path==='/login')"></app-header> -->
    <app-header v-if="headerShow"></app-header>
    <transition :name="transitionName">
      <router-view/>
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
        if (res.data.status==200) {
          _this.$store.commit('changeUserName', res.data.user)
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
  // watch: {
  //   '$route' (to, from) {
  //   const toDepth = to.meta.index
  //   const fromDepth = from.meta.index
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // }

}
</script>

<style>
#app {
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  padding: 1.4rem 0 0;
  font-size: 0.45rem;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fafafa;
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
  top: 0px;
  /* position: absolute; */
  backface-visibility: hidden;
  perspective: 1000;
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
