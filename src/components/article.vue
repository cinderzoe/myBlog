<template>
  <div class="Article">
    <list :articleInfo="articleLists"></list>
  </div>
</template>
<script>
import articleList from './articleList'
export default {
  name: 'Article',
  data () {
    return {
     articleLists:'',
     text:[],
    }
  },
  components:{
    'list':articleList
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
    getArticle(){
      var _this=this
      _this.$axios.post('/articleGet').then(res=>{
        this.articleLists=res.data
        console.log(this.articleLists)
        for(var key in this.articleLists){
          this.text.push(this.articleLists[key].content)
        }
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