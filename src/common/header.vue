<template>
  <div id="header">
    <div class="">
      <transition name="menufade">
        <div id="menu" @click="toggleNav" :class="{'active':menuToggle}">
        </div>
      </transition>
      <transition name="navfade">
        <div id="nav" v-if="navShow">
          <div @click="toggleNav" class="nav-in index-nav"><router-link to="/">首页</router-link></div>
          <div @click="toggleNav" class="nav-in article-nav"><router-link to="/article">文章</router-link></div>
          <div @click="toggleNav" class="nav-in music-nav"><router-link to="/music">音乐</router-link></div>
          <div @click="toggleNav" class="nav-in user-nav"><router-link to="/user">个人中心</router-link></div>
        </div>
      </transition>
      <!-- 音乐导航 -->
      <div class="music-navin item-nav" v-if="musicShow">
        <div class="music-router">热歌推荐</div>
      </div>
      <!-- 用户登陆 -->
      <div id="userId" class="fr item-nav" v-if="userShow"><router-link to="/user">{{username}}</router-link></div>
      <!-- 文章 -->
      <div class="writeArticle item-nav fr" v-if="articleShow"><router-link to="/writeArticle">写文章</router-link></div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'Header',
    data() {
      return {
        loginPopu:false,
        navShow:false,
        menuToggle:false,
      };
    },
    computed:{ //computed里面的属性不能在data里面绑定
      username:{
        get:function(){
          return this.$store.state.niname;
        },
        set:function(){
          
        }
      },
      musicShow:{
        get:function(){
          return this.$store.state.musicNav
        },
        set:function(){
          
        }
      },
      userShow:{
        get:function(){
          return this.$store.state.userNav
        },
        set:function(){
          
        }
        
      },
      articleShow:{
        get:function(){
          return this.$store.state.articleNav
        },
        set:function(){
          
        }
      }
    },
    created(){
      this.logoName=this.$store.state.user_name;
    },
    mounted(){
      document.addEventListener('click',e => {
         if(!this.$el.contains(e.target)){
            this.navShow = false//点击其他区域关闭
            this.menuToggle=false;
          }
      })
    },
    methods:{
      toggleNav(){
        this.navShow=!this.navShow;
        this.menuToggle=!this.menuToggle;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  display: block;
  color: #fff;
}
#header{background:linear-gradient(to right, #ccb739, #2f907e, #c1625a);width: 100%;position: fixed;top: 0;left: 0;height: 1.4rem;font-size: 0.4rem;color: #fff;z-index: 99999;text-align: center;padding:0 0.25rem;}
#userId{font-size: 0.5rem;color: #fff;line-height: 1.4rem;font-family: "黑体"}
#userId a{color: #fff;}
#closePopu{background-image: url(../assets/login_close.svg);background-size: 100%;background-repeat: no-repeat;background-position: center;position: absolute;right: 10px;top: 10px;width: 15px;height: 15px;cursor: pointer;}
#user-name{color: #399c9c;font-size: 18px;} /*预留色#399c9c*/
#menu{position: absolute;top: 0;height: 0.8rem;width: 1rem;top: 0.3rem;cursor: pointer;z-index: 2;transition: 0.3s;background: url(../assets/menu.png) center no-repeat;background-size: 100% auto;}
#menu.active{transform: translateX(2.5rem);background-image: url(../assets/close.png);}
#nav{position: fixed;width: 4rem;background-color: #339a6c;top: 0;left: 0;height: 100vh;color: #fff;padding-top: 1.3rem;box-sizing: border-box;box-shadow: 0px 0px 10px rgba(0,0,0,0.5)}
#nav a{color: #fff;padding:0.27rem 0 0.27rem 1.3rem;text-align: left;display: block;font-size: 0.5rem;}
#nav .nav-in{background-position: 0.3rem center;background-repeat: no-repeat;background-size: 0.6rem;}
#nav .index-nav{background-image: url(../assets/indexIcon.png);}
#nav .article-nav{background-image: url(../assets/articleIcon.png);}
#nav .music-nav{background-image: url(../assets/musicIcon.png);}
#nav .user-nav{background-image: url(../assets/userIcon.png);}
.navfade-enter-active, .navfade-leave-active {
  transition: .2s ease-out;
}
.navfade-enter, .navfade-leave-to {
  opacity: 0;
  transform: translateX(-4rem);
}
.menufade-enter-active, .menufade-leave-active {
  transition: .2s ease-out;
}
.menufade-enter, .menufade-leave-to {
  transform: translateX(4rem);
}
.item-nav{display: inline-block;line-height: 1.4rem;margin: 0 0.4rem;font-size: 0.5rem;}
.music-navin{display: inline-block;}
.writeArticle{display: inline-block;padding-left: 0.8rem;background: url(../assets/write.png) left center no-repeat;background-size: auto 0.8rem;}
.writeArticle a{color: #fff;}
</style>
