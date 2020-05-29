
<template>
  <div id="userInfo">
    <div class="back" @click="backIndex"></div>
  	<div class="user-layout">
      <div class="user-bg" :style="{'backgroundImage':'url('+personalBg+')'}"></div>
  		<div class="info">
        <div class="wrap clear">
          <div class="headPic fl" :style="{'backgroundImage':'url('+headPicUrl+')'}"></div>
          <van-button class="creditInfo fl" @click="credit">编辑资料</van-button>
          <div class="fl signOut" @click="signOut">退出登陆</div>
          <div class="selfInfo clear">
            <div class="niname">{{niname}}</div>
            <div class="username"><span>账号:</span>{{username}}</div>
            <div class="introduction"><span>简介:</span>{{introduction}}</div>
          </div>
        </div>
  		</div>
  	</div>
    <div class="article">
      <div class="wrap">
        文章编辑
      </div>
      
    </div>
  </div>
</template>


<script>
export default {
  name: 'userInfo',
  data () {
    return {
     	headPicUrl:'',
      personalBg:'',
      show:false,
    }
  },
  computed:{
  	username:{
  		get:function(){
  			return this.$store.state.user_name
  		},
  		set:function(){

  		}
  	},
    niname:{
      get:function(){
        return this.$store.state.niname
      },
      set:function(){

      }
    },
    introduction:{
      get:function(){
        return this.$store.state.introduction
      },
      set:function(){

      }
    }
  },
  created(){
    this.headPicUrl=this.$store.state.user_headPic
    this.personalBg=this.$store.state.user_bgPic
  },
  methods:{
    credit(){
      this.$emit('showCredit',this.show)
    },
    backIndex(){
      this.$router.replace('/')
    },
    signOut(){
      this.$store.commit('changeUserName','')
      window.localStorage.removeItem('tokenid')
      this.$router.replace('/login')
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
.headPic{width: 2rem;height: 2rem;border-radius: 50%;margin-top: -1rem;border: .2rem solid #fafafa;background-size: cover;background-repeat: no-repeat;background-position: center;}
.info{padding:.3rem 0 .5rem;border-bottom: 2px solid #fafafa;}
.selfInfo{padding-left: .3rem;}
.username{font-size: .55rem;padding:.1rem 0 .25rem;}
.username span,.introduction span{font-size: .4rem;}
.niname{font-size: .55rem;padding-top: .2rem;}
.user-bg{height: 3rem;background-position: center;background-repeat: no-repeat;background-size: 100% auto;}
.user-layout >>> .creditInfo{font-size: .5rem;margin-left: .5rem;color: #fff;background-color: #5d5d5d;border-radius: 5px;}
.credit{position: fixed;top: 0;left: 0;height: 100vh;width: 100%;z-index: 99999;background-color: #fafafa;}
.close{width: 1rem;height: 1rem;background: url(../assets/creditClose.png) center no-repeat;background-size: auto;margin: 0.15rem;}
.credit >>> .van-cell{font-size: .47rem;}
.credit-layout{padding-top: .3rem;}
.back{width: .9rem;height: .9rem;background: url(../assets/userBack.png) left center no-repeat;background-size: auto 100%;position: absolute;top: .2rem;left: .2rem;}
.signOut{margin-left: .7rem;color: #3385ff;margin-top: .65rem;}
.article .wrap{padding:0 .4rem;}
</style>