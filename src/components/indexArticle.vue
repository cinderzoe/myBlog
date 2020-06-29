<template>
  <div id="indexArticle">
    <div class="lastArticle">
    	<div class="list" v-for="(item,i) in article">
    		<router-link :to="'/articleDetails'+item.id">
    			<div class="pic" :style="{'backgroundImage':' url(http://www.lazyzoe.cn/myblog/images/h'+i+'.jpg)'}"></div>
    			<div class="title">{{item.title}}</div>
    			<div class="content">{{item.temContent}}</div>
    			<div class="time">{{item.time}}</div>
    		</router-link>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexArticle',
  data () {
    return {
    	article:'',
    	pic:'http://www.lazyzoe.cn/myblog/images/h1.jpg'
    }
  },
  created(){
  	this.$axios.post('/articleGet',{
  		num:3
  	}).then(res=>{
  		console.log(res)
  		this.article=res.data
  	}).catch(err=>{
  		console.log(err)
  	})

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
  color: #333;
}
.lastArticle{word-break: break-all;}
.lastArticle .title{font-size: .49rem;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;margin:0.2rem 0;}
.lastArticle .content{color: #999;max-height: 1.25rem;overflow: hidden;}
.lastArticle .pic{height: 4rem;width: 100%;background-position: center;background-repeat: no-repeat;background-size: cover;border-radius: 0.1rem;}
.lastArticle .list{border-top: 1px solid #f0f0f0;margin-top: -1px;margin-bottom: 0.5rem;padding-top: 0.5rem;}
.lastArticle .time{padding-left: 0.8rem;background:url(../assets/time.png) left center no-repeat;background-size: 0.55rem 0.55rem;margin-top: 0.2rem;}
</style>