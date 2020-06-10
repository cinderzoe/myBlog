<template>
  <div class="Article">
    <div class="wrap">
      <div class="articleList">
        <div class="lists" v-for="(item,i) in articleLists">
          <router-link :to="'/articleDetails'+item.id">
            <div class="author">
              <div class="head" :style="{'backgroundImage':'url('+item.headImg+')'}"></div>
              <div class="name">{{item.niname}}</div>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="content" v-html='item.content'></div>
            <div class="time">{{item.time}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
     articleLists:'',
     text:[],
     content:''
    }
  },
  computed:{
    username:{
      get:function(){
        return this.$store.state.user_name;
      },
      set:function(){

      }
      
    }
  },
  watch:{
    username(){
      if(this.username!==''){
        this.getArticle()
      }
    }
  },
  mounted(){
    this.getArticle()
    this.$store.commit('headerShowOr',true)
    if(this.$store.state.bgAudioUrl!==''){
      this.$store.commit('musicPlayPause',true)
    }
  	this.$store.commit('changeNavShow',{music:false,user:false,article:true})
  },
  methods:{
  	getUser(){
  		this.username=this.$store.state.user_name
  	},
    getArticle(){
      var _this=this
      _this.$axios.post('/articleGet',{
        username:_this.username
      }).then(res=>{
        this.articleLists=res.data
        console.log(this.articleLists)
        for(var key in this.articleLists){
          this.text.push(this.articleLists[key].content)
        }
        this.content='this.text'
      }).catch(err=>{
        console.log(err)
      })
    },
    toArticleDetails(){
      //console.log("点击了")
      this.$router.push('/articleDetails')
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
  color: #999;
}
.articleList{text-align: left;padding-top: .3rem;}
.articleList pre{white-space: normal;}
.title{font-size: .47rem;font-weight: bold;color: #333;line-height: 1.5em;}
.lists{padding:.2rem 0 .4rem;border-bottom: 1px solid #f0f0f0;margin-bottom: .3rem;}
.content{margin: .1rem 0 .3rem;max-height: 2.97rem;overflow: hidden;}
.author{padding-bottom: 0.1rem;}
.author .head{background-position:center;background-repeat: no-repeat;background-size: auto 100%;width: 0.9rem;height: 0.9rem;border-radius: 50%;float: left;border: 1px solid #e4e4e4;box-sizing: border-box;}
.author .name{line-height: 0.9rem;padding-left: 1.2rem;}
</style>