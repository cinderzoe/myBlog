<template>
  <div id="articleDetails">
  	<div class="comeBack" @click="$router.go(-1)"></div>
    <div class="wrap">
      <div class="articleDetails-layout">
        <div class="title">{{this.article.title}}</div>
        <div class="headImg fl" :style="{'backgroundImage':'url('+this.article.headImg+')'}"></div>
        <div class="person">
          <div class="niname">{{this.article.niname}}</div>
          <div class="time">{{this.article.time}}</div>
        </div>
        <div class="content">
          <div class="contentText" v-html="this.article.content">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'articleDetails',
  data () {
    return {
     id: 0,
     article:'',
     
    }
  },
  created(){
    this.id=this.$route.params.id;
    this.$store.commit('changeNavShow',{music:false,user:false,article:false})
    this.$axios.post('/articleDetailsGet',{
      id:this.id
    }).then(res=>{
      console.log(res)
      this.article=res.data[0]
      console.log(this.article)
    }).catch(err=>{
      console.log(err)
    })
  },
  methods:{
  	cedit(){
  		console.log(this.value)
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
  color: #333; 
}
#articleDetails{text-align: left;word-break:break-all;border-radius: 0.2rem;margin:0.2rem 0;}
#articleDetails .title{font-size: .6rem;font-weight: bold;padding: .2rem 0 .4rem;}
#articleDetails .person{padding-left: 1.4rem;}
#articleDetails .time{font-size: .4rem;color: #999;}
#articleDetails .content{padding:.5rem 0;line-height: 1.8em;white-space: normal;}
.headImg{width: 1rem;height: 1rem;border-radius: 50%;background-size: cover;background-repeat: no-repeat;background-position: center;}
.contentText >>> .w-e-text{box-sizing: border-box;}
.articleDetails-layout{padding:0 0.2rem;}
</style>