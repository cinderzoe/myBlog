<template>
  <div id="articleList" class="articleList">
    <div class="wrap">
        <div class="lists" v-for="(item,i) in articleInfo">
          <router-link :to="'/articleDetails'+item.id">
            <div class="author" v-if='!selfInfo'>
              <div class="head" :style="{'backgroundImage':'url('+item.headImg+')'}"></div>
              <div class="name">{{item.niname}}</div>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="content" v-html='item.temContent'></div>
            <div class="time">{{item.time}}</div>
          </router-link>
          <div class="clear" v-if="editBtn">
          	<div class="articleEdit fr art-btn" @click.stop='editArticle(item.id)'>编辑</div>
          	<div class="articleDelete fr art-btn" @click.stop='deleteArticle(item.id,i)'>删除</div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'articleList',
  data () {
    return {
      articleInfos:[]
    }
  },
  props:['articleInfo','selfInfo','editBtn'],
  created(){
    // this.articleInfos=this.articleInfo
  },
  methods:{
  	deleteArticle(idVal,indexVal){
      var _this=this
      this.$dialog.confirm({
        title: '确认删除该文章',
      })
      .then(() => {
        this.$axios.post('/articleDelete',{
          id:idVal
        }).then((res)=>{
          console.log(res)
          if(res.data.status=200){
            this.articleInfo.splice(indexVal,1)
            this.$toast(res.data.msg);
          }
        }).catch((err)=>{
          console.log(err)
        })
      })
      .catch(() => {

      });
  	},
  	editArticle(valId){
  		this.$router.push({
  			name:'writeArticle',
			  params: { id:valId}
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
  color: #999;
}
.articleList{text-align: left;padding-top: .3rem;}
.articleList pre{white-space: normal;}
.title{font-size: .47rem;font-weight: bold;color: #333;line-height: 1.5em;}
.lists{padding:.2rem 0.2rem .4rem;border-top: .2rem solid #fafafa;margin-bottom: .3rem;}
.content{margin: .1rem 0 .3rem;max-height: 2.97rem;overflow: hidden;}
.author{padding-bottom: 0.1rem;}
.author .head{background-position:center;background-repeat: no-repeat;background-size: auto 100%;width: 0.9rem;height: 0.9rem;border-radius: 50%;float: left;border: 1px solid #e4e4e4;box-sizing: border-box;}
.author .name{line-height: 0.9rem;padding-left: 1.2rem;}
.art-btn{color: #ea6f5a;}
.articleDelete{margin-right: .5rem;}
</style>