<template>
  <div id="musicDetails">
    <div class="bg-box" :style="{'background-image':'url('+musicPic+')'}"></div>
    <div class="details-layout">
      <div class="lyric">
        <div class="backBtn" @click="$router.go(-1)">
          <div class="name">{{musicName}}</div>
          <div class="author">{{musicAuthor}}</div>
        </div>
        <div class="swiper-container" v-swiper:mySwiper="swiperOption" ref="mySwiper">
          <div class="swiper-wrapper">
            <div :class="currentIndex==index?'on':''"  v-for="(value,key,index) in lastLyric" ref="active" data-index="index" class="swiper-slide">
              {{value}}
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <div class="control-slide">
      <div class="play-btn" @click="changePlay">
         <img src="../assets/playin.png" v-if="playBtn">
         <img src="../assets/pausein.png" v-else>
      </div>
      <div class="musicTime">
        <van-slider v-model="audioDuration" active-color="rgba(0, 212, 124, 0.3)" @change="onChange" class="audioSlider" ref="slider">
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
        <div class="audioTime">
          <div class="current">{{leftTime}}</div>
          <div class="total">{{rightTime}}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  name: 'musicDetails',
  data () {
    return {
      audioId:null,
      musicPic:'',
      currentKey:'',   //
      lyric:'', //原始获取到的歌词
      audioUrl:'', //MP4资源
      isPlay: false,
      lastLyric:[], //处理过的时间和歌词 歌词这里要使用对象，不可使用数组
      //currentTime:'', //音乐当前播放时间
      timeIndex:[], //当前歌词的序列号
      currentIndex:'',
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 13,
        speed:'1500',
        centeredSlides: true,
        spaceBetween: 10,
        grabCursor: true,
        observer:true,
      },
      musicName:'',
      musicAuthor:'',
      audioDuration:100,
      duration:0,//audio时长
      leftTime:"00:00",//显示的当前时间
      rightTime:"00:00"//显示的总时间
    }
  },
  beforeCreate(){
    this.$store.commit('headerShowOr',false)
  },
  beforeMount(){

  },
  created(){
    this.$nextTick(() => {
      if(!this.audioId){
        Dialog.alert({
          message: '音乐资源获取失败，返回音乐列表',
        }).then(() => {
          this.$router.replace('/music')
        });
      }else{
        var slide=document.getElementsByClassName('van-slider__bar')[0]
        slide.style.width=0;
      }
    })
  },
  computed:{
    currentTime:{
      get:function(){
        return this.$store.state.currentTime;
      },
      set:function(){
        
      }
    },
    playBtn:{
      get:function(){
        return this.$store.state.musicPlayBtn;
      },
      set:function(){
        
      }
    },
    // leftTime:{
    //   get:function(){
    //     return this.currentTime;
    //   },
    //   set:function(){
        
    //   }
    // },
    
  },
  watch:{
    currentTime(){
      this.handleCurrentTime()
       var audioCurTime=Math.floor(this.$store.state.currentTime);
       let timeObj = this.lastLyric[audioCurTime]
       var percent;
       var duration=this.duration
       percent=(audioCurTime/duration)*100+"%"
       //console.log(percent)
       if(document.getElementsByClassName('van-slider__bar')[0]){
        var slide=document.getElementsByClassName('van-slider__bar')[0]
        slide.style.width=percent
       }
       if (timeObj != undefined) { //检测歌词才滚动
         this.lyricScroll(audioCurTime)
       }
    },
    playBtn(){

    }
  }
  ,
  methods: {
    lyricScroll(time) {
      var key=Math.floor(time)
      this.currentIndex=this.timeIndex.map((item) => item).indexOf(key)
      this.mySwiper.slideTo(this.currentIndex)
    },
    cutLyric(){
      var lyric=[];
      var time='';
      var temLyric=[];
      var temTime=[]
      var temarr={};
      lyric=this.lyric.split('\n')
      // console.log(lyric)
      for(let i=0;i<lyric.length;i++){
        if(lyric[i].length!==0){  //避免单行空格造成的后续代码错误
          let time=lyric[i].match(/\[(\S*)\]/ig)[0]
          let lastLyric=lyric[i].replace(time,'')
          let lastTime=time.slice(1,time.length-1)
          //let gcTime=(Number(lastTime.match(/(\S*):/)[1]*60)+parseFloat(lastTime.match(/:(\S*)/)[1])).toFixed(2)
          let gcTime=Math.floor(Number(lastTime.match(/(\S*):/)[1]*60)+parseFloat(lastTime.match(/:(\S*)/)[1]))
          temTime.push(gcTime)
          temLyric.push(lastLyric)
        }
      }
      for(var key in temLyric){
        temarr[temTime[key]]=temLyric[key]
      }
      this.lastLyric=temarr;
      this.timeIndex=[...new Set(temTime)]
    },
    onChange(value) {
      var currentTime=Math.floor((value/100)*this.duration);
      console.log(currentTime)
      this.$store.commit('changeTemCurTime',currentTime)
    },
    handleCurrentTime(){
      var totalTime=this.currentTime;
      this.leftTime=this.addZero(Math.floor(totalTime/60))+':'+this.addZero(totalTime%60)
    },
    headleTotalTime(){
      var totalTime=this.duration;
      this.rightTime=this.addZero(Math.floor(totalTime/60))+':'+this.addZero(totalTime%60)
    },
    addZero(val){
      return val >= 0 && val < 10 ? '0' + val : '' + val;
    },
    changePlay(){
      var bool=this.$store.state.musicPlayBtn;
      this.$store.commit('changeMusicPlayBtn',!bool)
      this.playBtn=this.$store.state.musicPlayBtn;
    }
  },
  activated(){
    this.$store.commit('headerShowOr',false)
    this.lastLyric='';
    this.audioId=this.$store.state.audioId;
    this.musicPic=this.$store.state.bgAudioPic;
    this.audioUrl=this.$store.state.bgAudioUrl;
    this.musicName=this.$store.state.musicName;
    this.musicAuthor=this.$store.state.musicAuthor;
    this.currentTime=this.$store.state.currentTime;
    this.duration=this.$store.state.duration;
    this.headleTotalTime();
    if(this.audioUrl){
      var audio=document.getElementById('audio')
    }
    this.$jsonp('https://music.163.com/api/song/media',{
      id:this.audioId
    }).then((res)=>{
    　this.lyric=res.lyric
      this.cutLyric()
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
  color: #42b983;
}
#musicDetails{position: fixed;height: 100vh;width: 100%;top: 0;left: 0;box-sizing: border-box;}
.bg-box{position: fixed;width: 100%;height: 100%;top: 0;left: 0;background-size: cover;background-position: center;background-repeat: no-repeat;z-index: -1;}
.lyric{background-color: rgba(0,0,0,0.7);height: 100vh;box-sizing: border-box;font-size: 0.48rem;line-height: 2em;color: #fff;overflow: hidden;top: 0;left: 0;box-sizing: border-box;padding:1.5rem 0.3rem 0;}
.custom-button {width: 0.2rem;height: 0.2rem;color: #fff;font-size: 10px;line-height: 18px;text-align: center;background-color: #fff;border-radius: 100px;}
.lyric .swiper-container{height: 80%;margin-top: 0.5rem;color: rgba(255,255,255,0.6)}
.swiper-slide.on{color: #fff;}
.backBtn{position: fixed;top: 0;left: 2%;z-index: 4;background: url(../assets/musicBak.png) left center no-repeat;background-size:auto 0.6rem;padding-left: 1rem;}
.backBtn .name{line-height: 1.2em;padding: 0.2rem 0;font-size: 0.45rem;text-align: left;}
.backBtn .author{font-size: 0.3rem;text-align: left;color: rgba(255,255,255,0.7);line-height: 1.2em;}
.control-slide{position: fixed;bottom: 1rem;width: 90%;left: 0;right: 0;margin: 0 auto;z-index: 9;padding-left: 2rem;box-sizing: border-box;}
.audioSlider{width: 100%;}
.musicTime{position: relative;padding:0 1.2rem;box-sizing: border-box;}
.audioTime{position: absolute;bottom: 0.5rem;left: 0;right: 0;margin: 0 auto;bottom:0;color: #fff;margin-bottom: -0.2rem;z-index: -1;}
.audioTime .current{float: left;}
.audioTime .total{float: right;}
.play-btn{position: absolute;left: 0;top: 0;margin-top: -0.5rem;width: 1rem;height: 1rem;border-radius: 50%;}
.play-btn img{width: 100%;}

</style>
