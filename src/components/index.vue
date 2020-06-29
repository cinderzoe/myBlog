<template>
  <div class="index">
    <div class="index-swiper">
      <div class="wrap">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="tip">文章</div>
              <router-link to="/article"><img src="http://www.lazyzoe.cn/myblog/images/index_book.jpg"></router-link>
            </div>
            <div class="swiper-slide">
              <div class="tip">音乐</div>
              <router-link to="/music"><img src="http://www.lazyzoe.cn/myblog/images/index_music.jpg"></router-link>
            </div>
            <!-- <div class="swiper-slide"><router-link to="/"><img src="http://www.lazyzoe.cn/myblog/images/selfbg.jpg"></router-link></div> -->
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="index-article">
      <div class="wrap">
        <div class="index-article-layout">
          <div class="article-title">最新文章<router-link to="/article" class="more fr">更多+</router-link></div>
          
          <div class="item-list">
            <indexArticle></indexArticle>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import indexArticle from './indexArticle'
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  beforeCreate(){
    this.$store.commit('headerShowOr',true)
  },
  mounted(){
    this.$store.commit('changeNavShow',{music:false,user:true,article:false})
    this.initSwiper();
  },
  components:{
    'indexArticle':indexArticle
  },
  methods:{
    getInfo(){
    },
    initSwiper () {
      new Swiper('.swiper-container', {
        loop: false,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    }
  },
  
}
</script>

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
.index{padding-top: 0.3rem;}
.index-swiper >>> .swiper-pagination-bullet{background-color: #fff;opacity: 0.8;border-radius: 0.1rem;transition: 0.3s;}
.index-swiper >>> .swiper-pagination-bullet-active{background-color:#12b7de;width: 0.5rem;}
.index-swiper .swiper-slide{position: relative;}
.index-swiper .swiper-slide .tip{position: absolute;bottom: -0.5rem;right: 0.5rem;color: #fff;opacity: 0;transition: .5s;}
.index-swiper .swiper-slide-active .tip{bottom: 0.5rem;opacity: 0.7;}
.index-swiper img{width: 100%;}
.index-article{margin-top: 0.5rem;}
.index-article .article-title{padding:0.2rem 0;position: relative;}
.index-article .article-title:after{content: '';display: block;width: 1.8rem;height: 2px;background-color: #1da7da;left: 0;bottom: -1px;position: absolute;}
.index-article-layout{padding:0.4rem;}
.index-article .more{color: #42b983;font-size: .42rem;}
</style>
