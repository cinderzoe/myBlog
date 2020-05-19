<template>
  <div id="app">
    <!-- <app-header v-if="!(this.$route.path==='/login')"></app-header> -->
    <app-header v-if="headerShow"></app-header>
    <keep-alive><router-view/></keep-alive>
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
    }
  },
  components: {
      'app-header':Header,
      'app-footer':Footer,
  },
  beforeCreate(){
    
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
    // footerShow:{
    //   get:function(){
    //     return this.$store.state.footer;
    //   },
    //   set:function(){
        
    //   }
    // }
  },
  created(){
    this.headerShow=this.$store.state.header
  },
  methods:{
    
  }

}
</script>

<style>
#app {
  font-family: '黑体','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 1.5rem 0 0;
  font-size: 0.4rem;
}
</style>
