
<template>
  <div id="userInfo">
    <div class="back" @click="backIndex"></div>
  	<div class="user-layout">
      <div class="user-bg" :style="{'backgroundImage':'url('+personalBg+')'}"></div>
  		<div class="wrap">
        <div class="info clear">
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
        <div class="tabs">文章发布</div>
        <router-link class="fr to-write-btn" to="/writeArticle">写文章</router-link>
        <template v-if='articleLists.length'>
          <articleList :articleInfo="articleLists" :selfInfo='selfInfo' :editBtn='editBtn'></articleList>
        </template>
        <template v-else>
          <div class="empty-article">
            <p style="margin: 0.4rem 0;">还没有发表任何文章~</p>
            <van-button type="primary" class="to-artile" @click="$router.replace('/writeArticle')">发表文章></van-button>
          </div>
        </template>
      </div>
      
    </div>
  </div>
</template>


<script>
import articleList from './articleList'
export default {
  name: 'userInfo',
  data () {
    return {
      articleLists:'',
      personalBg:'',
      show:false,
      active: 1,
      selfInfo:true,
      editBtn:true
    }
  },
  components:{
    'articleList':articleList
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
    },
    headPicUrl:{
      get:function(){
        return this.$store.state.user_headPic
      },
      set:function(){

      }
    }
  },
  created(){
    this.personalBg=this.$store.state.user_bgPic;
  },
  mounted(){
    this.getArticle()
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
    },
    getArticle(){
      console.log(this.username)
      this.$axios.post('/articleGet',{
        username:this.username,
        attr:'self'
      }).then(res=>{
        this.articleLists=res.data
        console.log(this.articleLists)
        for(var key in this.articleLists){
          this.text.push(this.articleLists[key].content)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
  },
  watch:{
    'username'(){
      if(this.username!==''){
        this.getArticle()
      }
    }
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headPic{width: 2rem;height: 2rem;border-radius: 50%;margin-top: -1rem;border: .2rem solid #fafafa;background-size: cover;background-repeat: no-repeat;background-position: center;position: relative;background-color: #eee;}
.info{padding:.3rem 0 .5rem;border-bottom: .5rem solid #fafafa;}
.selfInfo{padding:0 .2rem;}
.username{font-size: .55rem;padding:.1rem 0 .25rem;}
.username span,.introduction span{font-size: .4rem;}
.niname{font-size: .55rem;padding-top: .2rem;}
.user-bg{height: 3rem;background-position: center;background-repeat: no-repeat;background-size: 100% auto;opacity: 0;animation: fadeIn .6s forwards;background-color: #999;}
@keyframes fadeIn{
  0%{opacity: 0}
  100%{opacity: 1}
}
.user-layout >>> .creditInfo{font-size: .5rem;margin-left: .5rem;color: #fff;background-color: #5d5d5d;border-radius: 5px;}
.credit{position: fixed;top: 0;left: 0;height: 100vh;width: 100%;z-index: 99999;background-color: #f7f7f7;}
.close{width: 1rem;height: 1rem;background: url(../assets/creditClose.png) center no-repeat;background-size: auto;margin: 0.15rem;}
.credit >>> .van-cell{font-size: .47rem;}
.credit-layout{padding-top: .3rem;}
.back{width: .9rem;height: .9rem;background: url(../assets/userBack.png) left center no-repeat;background-size: auto 100%;position: absolute;top: .2rem;left: .2rem;z-index: 1;}
.signOut{margin-left: .7rem;color: #3385ff;margin-top: .65rem;}
.article .wrap{padding:0 .2rem;}
.to-artile{font-size: .47rem;margin-bottom: 0.5rem;}
#userInfo >>> .title{font-size: .55rem;}
.article .tabs{margin:0 0.25rem 0;line-height: 1.2rem;display: inline-block;border-bottom: 2px solid #ea6f5a;color: #ea6f5a;}
.empty-article{padding:0 0.2rem;}
.to-write-btn{line-height: 1.2rem;font-size: 0.4rem;margin-right: 0.25rem;color: #42b983;}
.article >>> .lists{border-top: .05rem solid #fafafa;}
#userInfo .articleList{padding-top: 0;}
#userInfo .lists{padding-top: 0.5rem;}
</style>