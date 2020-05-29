<template>
	<div id="writeArticle">
		<div class="comeBack" @click="$router.replace('/article')"></div>
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
            <div id="editorMenu" class="editorMenu"></div>
            <div id="editor" class="editor" ref="editor"></div>
					</div>
					<van-button type="info" @click="submit" class="fr submit">发表</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Editor from "wangeditor";
export default {
  name: 'writeArticle',
  data () {
    return {
     articleTitle:'',
     articleContent:'',
     editor: null,
     editorContent: '',
     temEditor:null,
     hasSubmit:false,
    }
  },
  mounted(){
    this.temEditor = new Editor('#editorMenu', '#editor')
    this.temEditor.create()
  },
  created(){
    this.$store.commit('musicPlayPause',false);
  	this.$store.commit('changeNavShow',{music:false,user:false,article:false})
  },
  methods:{
  	submit(){
      this.articleContent=this.temEditor.txt.html()
      console.log(this.articleContent)
      if(this.articleTitle==''){
        this.$toast('标题不能为空');
        return;
      }
      if(this.temEditor.txt.text()==''){
        this.$toast('内容不能为空')
        return;
      }
      else{
        console.log(this.articleContent.length)
        this.$axios.post('/articleWrite',{
         username:this.$store.state.user_name,
         title:this.articleTitle,
         content:this.articleContent,
         time:this.getTime()
        }).then(res=>{
         console.log(res)
         if(res.status=='200'){
          this.hasSubmit=true
          this.$router.replace('/article')
         }
        }).catch(err=>{
         console.log(err)
        })
      }
  	},
    getTime(){
      var date=new Date()
      var month=this.addZero(date.getMonth()+1)
      var day=this.addZero(date.getDate())
      return `${date.getFullYear()}.${month}.${day}`;
    },
    addZero(val){
      return val<10?'0'+val:val
    }
  },
  beforeRouteLeave (to, from , next) {
   if (this.hasSubmit||this.temEditor.txt.text()=='') {
     next(); // 允许离开或者可以跳到别的路由 上面讲过了
    } 
    else {
     //next(false); // 取消离开
    this.$dialog.confirm({
      title: '提示',
      message: '文章未保存，是否离开',
    })
    .then(() => {
      next()
    })
    .catch(() => {
      // on cancel
    });
    }
  }
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
#writeArticle{text-align: left;padding-top: .3rem;}
#writeArticle .Details-layout{line-height: 1.2rem;font-size: 0.45rem;}
#writeArticle .title{padding-left: 1.5rem;position: relative;}
#writeArticle .title .leftRow{position: absolute;left: 0;top: 0;}
#writeArticle .rightRow{width: 100%;}
#writeArticle .rightRow input{width: 100%;border-radius: 5px;border: none;background-color: #fff;border: 1px solid #e2e2e2;padding:0 0.2rem;box-sizing: border-box;resize:none;}
#writeArticle .content{padding-top: 0.5rem;}
#writeArticle .submit{margin-top: 0.3rem;}
#writeArticle .w-e-toolbar{flex-wrap:wrap!important;}
#writeArticle .w-e-toolbar .w-e-menu{max-width: 10%;display: inline-block;float: left;padding:0 .25rem;line-height: .8rem;}
#writeArticle #editor{height:60vh;border: 1px solid #e2e2e2;border-radius: 5px;z-index: 5!important;}
</style>