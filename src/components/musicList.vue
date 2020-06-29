<template>
  <div class="musicList" ref="bigMusic">
  	<div class="wrap">
  		<div :class="musicIndex===i?'active lists':'lists'" v-for="(item,i) in musicLists">
    		<div class="list-cont clear" @click="selectMusic(i,item.al.picUrl,item.id,item.name,item.ar[0].name)">
    			<div class="pic fl" :style="{'backgroundImage':'url('+item.al.picUrl+')'}"></div>
    			<div class="info fl">
    				<div class="name">{{item.name}}</div>
    				<div class="author">{{item.ar[0].name}}</div>
    			</div>
    		</div>
    		<div @click="addLove(i)" :class="musicListIt[i].bool?'store-btn loveSong':'store-btn'" style="display: none;"></div>
    	</div>
    	<p style="color: #999;font-size: 0.4rem;text-align: center;">这里已经是底部了~</p>
  	</div>
  </div> 
</template>

<script>
export default {
  name: 'musicList',
  data () {
    return {
      musicAll:'', //获取到的全部音乐
      musicLists:'',//显示的部分音乐
      musicIndex:-1,//当前播放音乐的序列号
      loveList:[88361920,87339204,88361920],//喜欢的音乐id列表
      musicListIt:[] //音乐收藏或否切换
    }
  },
  created(){
    if(this.musicIndex!==-1){
      this.$store.commit('musicPlayPause',true);
      
    }
  },
  beforeMount(){
  	this.$axios.post('http://hellojinx.cn:4000/top/list?idx=0')
    .then(res=>{
  		this.musicAll=res.data.playlist.tracks;
  		this.musicLists=this.musicAll.slice(0,15)
  		this.addBool()
  	}).catch(err=>{
  		console.log(err)
  	})
  },
  mounted(){
	  window.addEventListener("scroll", this.handleScroll, true);
  },
  methods:{
  	selectMusic(i,picUrl,musicId,musicName,musicAuthor){
  		if(this.musicIndex==i){
  			this.musicIndex=-1
  			this.$store.commit('changeMusicPlayBtn',false)
  		}else{
  			this.musicIndex=i;
  			this.$store.commit('changeMusicPlayBtn',true)
  		}
  		this.$store.commit('setAudioPic',{picUrl,musicId,musicName,musicAuthor});
  		this.$store.commit('musicPlayPause',true);
      this.$store.commit('footerShowOr',true)
  	},
  	addLove(i){
  		var arr=this.musicLists
  		for(var key in arr){
  			if(key==i){
  				this.musicListIt[i].bool=!this.musicListIt[i].bool
  			}
  		}
  	},
  	handleScroll() {
	  	var scrollTop =document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset; 
	  	var windowHeight =document.documentElement.clientHeight || document.body.clientHeight; //变量windowHeight是可视区的高度
	  	var scrollHeight =document.documentElement.scrollHeight || document.body.scrollHeight;//变量scrollHeight是滚动条的总高度
      this.$toast(scrollTop+'/'+windowHeight+'/'+scrollHeight)
	  	if (scrollTop + windowHeight == scrollHeight) {
	  		this.addMoreMusic();
        this.$toast('滚到底部')
	  	}
     //  let scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//页面滚动高度
     //  let windowHeight=window.innerHeight;//窗口高度
     //  let card_sectionTop=card_section.offsetTop;//card_section距离顶部的偏移高度（card_section为你的照片或div元素ID）
     //  let card_sectionHeight=card_section.offsetHeight;//card_section的高度
     //  if(card_sectionTop+card_sectionHeight<scroll+windowHeight){
     //          this.$toast('滚到底部')
	    // }
    },
	  addMoreMusic(){
	  	var minLength=this.musicLists.length;
	  	var maxLength=this.musicLists.length+10
	  	var lishilis=this.musicAll.slice(minLength,maxLength)
	  	this.musicLists.push.apply(this.musicLists, lishilis)
      this.addBool()
	  },
    addBool(){
      var list=this.musicLists;
      var arr=this.loveList;
      for(var key in list){
        this.musicListIt.push({bool:false})
        arr.some((val)=>{
          if(val==this.musicLists[key].al.id){
            this.musicListIt[key].bool=true;
          }
        })
      }
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
  color: #42b983;
}
.musicList{padding-top: .3rem;}
.lists{position: relative;}
.list-cont{padding: 0.2rem 0;text-align: left;background: url(../assets/music-pause.png) 95% center no-repeat;background-size: 0.8rem 0.8rem;}
.lists.active .list-cont{background-image: url(../assets/music-play.png);}
.list-cont .pic{width: 1.4rem;height: 1.4rem;background-repeat: no-repeat;background-position: center;background-size: 100% auto;border-radius: 0.1rem;}
.list-cont .info{padding-left: 0.15rem;}
.list-cont .name{font-size: 0.47rem;margin:0.1rem 0 0.15rem;height: 0.5rem;line-height: 0.5rem;width: 5rem;overflow: hidden;}
.list-cont .author{font-size: 0.35rem;color: #999;}
.store-btn{width: 0.84rem;height: 0.84rem;background: url(../assets/notlike.png) center no-repeat;background-size: 100% 100%;position: absolute;left: 87%;top: 50%;margin-top: -0.42rem;z-index: 3;}
.store-btn.loveSong{background-image: url(../assets/like.png);}
</style>
