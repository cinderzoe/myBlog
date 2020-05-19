<template>
	<div id="articleDetails">
		<div class="comeBack" @click="$router.go(-1)"></div>
		<div class="Details-layout">
			<div class="wrap">
				<div class="title clear">
					<div class="leftRow fl">标题:</div>
					<div class="rightRow fr">
						<input type="text" placeholder="请输入标题" v-model="articleTitle">
					</div>
				</div>
				<div class="content">
					<div class="rightRow">
						<textarea v-model="articleContent"></textarea>
					</div>
					<van-button type="info" size="large" @click="submit">发布</van-button>
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
     articleTitle:'',
     articleContent:'',
    }
  },
  beforeCreate(){
  	
  },
  activated(){
  	this.$store.commit('changeNavShow',{music:false,user:false,article:false})
  },
  methods:{
  	submit(){
  		console.log("title:"+this.articleTitle+"content:"+this.articleContent)
  		this.$axios.post('/articleWrite',{
  			articleTitle:this.articleTitle,
  			articleContent:this.articleContent
  		}).then(res=>{
  			console.log(res)
  		}).catch(err=>{
  			console.log(err)
  		})
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
#articleDetails{}
.comeBack{position: fixed;top: 0;right: .5rem;height: 1.4rem;width: 1rem;background: url(../assets/back.png) center no-repeat;background-size: 100% auto;z-index: 100;}
.Details-layout{line-height: 1.2rem;font-size: 0.45rem;}
.title{padding-left: 1.5rem;position: relative;}
.title .leftRow{position: absolute;left: 0;top: 0;}
.rightRow{width: 100%;}
.rightRow input,.rightRow textarea{width: 100%;border-radius: 5px;border: none;background-color: #fff;border: 1px solid #e2e2e2;padding:0 0.2rem;box-sizing: border-box;resize: none;}
.content{padding-top: 0.5rem;}
.content textarea{height: 65vh;padding-top: 0.2rem;padding-bottom: 0.2rem;line-height: 0.6rem;}
</style>