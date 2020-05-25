<template>
  <div id="user">
  	<div class="user-layout">
      <div class="user-bg" :style="{'backgroundImage':'url('+personalBg+')'}"></div>
  		<div class="info">
        <div class="wrap clear">
          <div class="headPic fl" :style="{'backgroundImage':'url('+headPicUrl+')'}"></div>
          <van-button class="creditInfo fl" type="default" @click="toCredit">编辑资料</van-button>
          <div class="selfInfo clear">
            <div class="niname" @click="">{{niname}}</div>
            <div class="username"><span>账号:</span>{{username}}</div>
          </div>
        </div>
  		</div>
  	</div>
    <!-- <transition name="van-slide-right">
      <div class="credit" v-if="show">
        <div class="close fr" @click="show=!show"></div>
        <div class="credit-layout clear">
          <div class="wrap">
            <van-field v-model="niname" name="昵称" label="昵称" :value="niname" />
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
     	headPicUrl:'http://www.lazyzoe.cn/myblog/images/user.jpg',
      niname:'小前端的鸡零狗碎',
      personalBg:'http://www.lazyzoe.cn/myblog/images/selfbg.jpg',
      show:false
    }
  },
  computed:{
  	username:{
  		get:function(){
  			return this.$store.state.user_name
  		},
  		set:function(){

  		}
  	}
  }
  ,
  activated(){
  	this.$store.commit('changeNavShow',{music:false,user:false,article:false})
  },
  methods:{
    toCredit(){
      this.$router.push('/userCredit')
      //this.show=!this.show
    }
  }
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
.username{font-size: .55rem;padding:.1rem 0;}
.username span{font-size: .4rem;}
.niname{font-size: .55rem;padding-top: .2rem;}
.user-bg{height: 3rem;background-position: center;background-repeat: no-repeat;background-size: 100% auto;}
.user-layout >>> .creditInfo{font-size: .5rem;margin-left: .5rem;color: #fff;background-color: #5d5d5d;border-radius: 5px;}
/*#user >>> .van-action-sheet{max-height: 100%;height: 100vh;z-index: 999999!important;border-radius: 0;}*/
.credit{position: fixed;top: 0;left: 0;height: 100vh;width: 100%;z-index: 99999;background-color: #fafafa;}
.close{width: 1rem;height: 1rem;background: url(../assets/creditClose.png) center no-repeat;background-size: auto;margin: 0.15rem;}
.credit >>> .van-cell{font-size: .47rem;}
.credit-layout{padding-top: .3rem;}
</style>