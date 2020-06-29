<template>
	<div id="writeArticle">
		<div class="comeBack" @click="back"></div>
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
            <div id="editor" class="editor" ref="editor">
              <div v-html="articleContent"></div>
            </div>
					</div>
					<van-button v-if="!hasRouteData" type="info" @click="submit" class="fr submit">发表</van-button>
          <van-button v-else type="info" @click="update" class="fr submit">确定</van-button>
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
     temContent:'',
     hasRouteData:false,
     originalTitle:'',
     originalContent:''
    }
  },
  created(){
    this.$store.commit('musicPlayPause',false);
    this.$store.commit('changeNavShow',{music:false,user:false,article:false})
  },
  mounted(){
    this.temEditor = new Editor('#editorMenu', '#editor')
    this.temEditor.create()
    if(this.$route.params.id){
      console.log(this.$route.params.id)
      this.hasRouteData=true
      this.$axios.post('/articleDetailsGet',{
        id:this.$route.params.id
      }).then(res=>{
        console.log(res)
        this.originalTitle=res.data[0].title
        this.articleTitle=res.data[0].title
        this.originalContent=res.data[0].content
        this.articleContent=res.data[0].content
        
      }).catch(err=>{
        console.log(err)
      })
    }
    
  },
  methods:{
  	submit(){
      if(this.articleTitle==''){
        this.$toast('标题不能为空');
        return false;
      }
      if(this.temEditor.txt.text()==''){
        this.$toast('内容不能为空')
        return false;
      }
      else{
        this.getAritcleCont()
        this.$axios.post('/articleWrite',{
         username:this.$store.state.user_name,
         title:this.articleTitle,
         temContent:this.temContent,
         content:this.articleContent,
         time:this.getTime()
        }).then(res=>{
         console.log(res)
         if(res.status=='200'){
          this.hasSubmit=true
          this.hasRouteData=true
          this.$router.replace('/article')
         }
        }).catch(err=>{
         console.log(err)
        })
      }
  	},
    back(){
      this.$router.go(-1)
    },
    getTime(){
      var date=new Date()
      var month=this.addZero(date.getMonth()+1)
      var day=this.addZero(date.getDate())
      return `${date.getFullYear()}.${month}.${day}`;
    },
    addZero(val){
      return val<10?'0'+val:val
    },
    getAritcleCont(){
      this.articleContent=this.temEditor.txt.html()
      this.temContent=this.temEditor.txt.text().slice(0,110)
    },
    update(){
      this.getAritcleCont()
      this.$axios.post('/articleUpdate',{
        id:this.$route.params.data[0].id,
        title:this.articleTitle,
        temContent:this.temContent,
        content:this.articleContent
      }).then(res=>{
        console.log(res)
        this.hasSubmit=true
        this.$toast('编辑成功')
        this.$router.replace('/user')
      }).catch(err=>{

      })
    }
  },
  beforeRouteLeave (to, from , next) {
    if ((this.articleTitle!=='' || this.temEditor.txt.text()!=='') && !this.hasRouteData) {
      next(false); // 取消离开
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
    else {
      next()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#writeArticle{text-align: left;padding-top: .3rem;}
#writeArticle .Details-layout{line-height: 1.2rem;font-size: 0.45rem;}
#writeArticle .title{padding-left: 1.5rem;position: relative;}
#writeArticle .title .leftRow{position: absolute;left: 0;top: 0;}
#writeArticle .rightRow{width: 100%;}
#writeArticle .rightRow input{width: 100%;border-radius: 5px;border: none;background-color: #fff;border: 1px solid #e2e2e2;padding:0 0.2rem;box-sizing: border-box;resize:none;}
#writeArticle .content{padding-top: 0.5rem;}
#writeArticle .submit{margin-top: 0.3rem;}
#writeArticle .w-e-toolbar{flex-wrap:wrap!important;}
#writeArticle .w-e-toolbar .w-e-menu{max-width: 10%;display: inline-block;float: left;padding:0 .25rem;line-height: .8rem;z-index: 2!important;}
#writeArticle #editor{height:60vh;border: 1px solid #e2e2e2;border-radius: 5px;z-index: 5!important;overflow: hidden;}
.w-e-text{box-sizing: border-box;}
</style>