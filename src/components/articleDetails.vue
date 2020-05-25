<template>
  <div id="articleDetails">
  	<div class="comeBack" @click="$router.go(-1)"></div>
    <div class="wrap">
      <div class="articleDetails-layout">
        <div class="title">{{this.article.title}}</div>
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
  activated(){
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
#articleDetails{text-align: left;}
#articleDetails .title{font-size: .6rem;font-weight: bold;padding: .2rem 0 .4rem;}
#articleDetails .person{padding:.1rem 0;padding-left: 1.4rem;background: url(../assets/user.png) left center no-repeat;background-size: auto 1.1rem;background-color: #f0f0f0;color: #ed7961;font-size: .42rem;}
#articleDetails .time{font-size: .4rem;color: #999;}
#articleDetails .content{padding:.5rem 0;line-height: 1.8em;white-space: normal;}
</style>