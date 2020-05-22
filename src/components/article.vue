<template>
  <div class="Article">
    <div class="wrap">
      <div class="articleList">
        <div class="lists" v-for="(item,i) in articleLists">
          <router-link :to="'/articleDetails'+item.id">
            <div class="author">{{item.niname}}</div>
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
  created(){
    this.getArticle()
  }
  ,
  activated(){
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
.articleList{text-align: left;}
.articleList pre{white-space: normal;}
.title{font-size: .47rem;font-weight: bold;color: #333;line-height: 1.5em;}
.lists{padding:.2rem 0 .4rem;border-bottom: 1px solid #f0f0f0;margin-bottom: .3rem;}
.content{margin: .1rem 0 .3rem;max-height: 2.97rem;overflow: hidden;}
.author{padding-left: 1rem;background: url(../assets/user.png) left center no-repeat;background-size: auto 100%;line-height: 2em;}
</style>