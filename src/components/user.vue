<template>
	<transition :name="transitionName">
		<div id="user">
			<userInfo class="user" :class="userShow?'':'on'" @showCredit="showCredit"></userInfo>
			<userCredit class="userCredit" :class="userShow?'':'on'" @showCredit='showCredit'  @pushMsg="getMsg"></userCredit>
			<transition :name="transitionName"><router-view :creditInfo="creditInfo"></router-view></transition>
		</div>
	</transition>
</template>

<script>
import userInfo from './userInfo'
import userCredit from './userCredit'
export default {
  name: 'user',
  data () {
    return {
      userShow:true,
      transitionName:'',
      creditInfo:'',
    }
  },
  beforeCreate(){
  	this.$store.commit('headerShowOr',false)
  },
  created(){
    console.log("触发")
    this.getPersonInfo()
  },
  computed:{
    username:{
      get:function(){
        return this.$store.state.user_name
      },
      set:function(){

      }
    }
  },
  components: {
      'userInfo':userInfo,
      'userCredit':userCredit,
  },
  methods:{
  	showCredit(val){
  		this.userShow=val
  	},
  	showCredit(val){
  		this.userShow=val
  	},
    getMsg(val){
      this.creditInfo=val
      console.log(val)
    },
    getPersonInfo(){
      this.$axios.post('/getSelfInfo',{
        username:this.username
      }).then(res=>{
        console.log(res)
        this.$store.commit('changeNiname',res.data[0].niname)
        this.$store.commit('changeIntroduction',res.data[0].introduction)
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  beforeRouteLeave(to,from,next){
  	this.userShow=true
  	this.$store.commit('headerShowOr',true)
  	next()
  },
  watch: {
    '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    },
    'username'(){
      if(this.username!==''){
        this.getPersonInfo()
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#user{margin-top: -1.4rem;position: relative;overflow: hidden;min-height: 100vh;}
.user{left: 0;top: 0;width: 100%;transition: .3s}
.user.on{transform: translateX(-100%);}
.userCredit{position: absolute;right: 0;top: 0;width: 100%;transform: translateX(100%);transition: .3s;height: 100%;}
.userCredit.on{transform: translateX(0);}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  transform: translateX(100%);
}
 
.slide-right-leave-active {
  transform: translateX(0);
}
.slide-left-leave-active {
  transform: translateX(100%);
}
</style>