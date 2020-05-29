<template>
  <div id="footer">
    <div class="music-float" v-if="audioShow" @click="toMusicDetail">
      <router-link to='./music/musicDetails'>
       <div class="music-inner">
         <img :src="musicPic" :class="playBtn?'musicRotate':''">
         <!-- <audio id="audio" :src="audioUrl"></audio> -->
         <div class="play-btn">
            <img src="../assets/playin.png" v-if="playBtn">
            <img src="../assets/pausein.png" v-else>
         </div>
       </div>
      </router-link>
    </div>
    <audio :src="audioUrl" id="audio" ref="audio" @error="audioerr" @timeupdate='updateTime' @canplay="getDuration"></audio>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  name: 'Footer',
  data () {
    return {
      currentTime:'', //audio当前时间
      duration:0,//audio时长
      //audioPlay:false,//audio播放
    }
  },
  computed:{ //computed里面的属性不能在data里面绑定
    musicPic(){
      return this.$store.state.bgAudioPic;
    },
    audioShow(){
      return this.$store.state.audioShow;
    },
    audioUrl(){
      return this.$store.state.bgAudioUrl;
    },
    playBtn(){
      return this.$store.state.musicPlayBtn;
    },
    showAudioMenu(){
      return this.$store.state.footer;
    }
  },
  watch:{
    playBtn(){
      if(this.playBtn){
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      }else{
        this.$refs.audio.pause()
      }
      //console.log(this.$refs.audio.currentTime)
    },
    audioUrl(){
      this.$refs.audio.currentTime=0; //当播放另外一首歌曲，audio重新开始播放
      this.$nextTick(() => {
          this.$refs.audio.play()
        })
    }
  },
  created(){

  }
  ,
  methods:{
    toMusicDetail(){
      //this.$router.push('/musicDetails')
      this.$store.commit('musicPlayPause',false)
    },
    audioerr(e){
      if(e.srcElement.currentSrc){  //避免列表刚开始加载时audio的src为空的情况下也出现提示，只有资源错误时才提示
        Dialog.alert({
          message: '音乐资源获取失败',
        })
      }
    },
    updateTime(e) {
       if(this.$store.state.temCurrentTime!==-1){
          this.$refs.audio.currentTime=this.$store.state.temCurrentTime;
          this.$store.commit('changeTemCurTime',-1)
       }
       this.currentTime = e.target.currentTime;  //获取audio当前播放时间
       var currentTime=Math.floor(this.currentTime);
       var _this=this;
       var duration=_this.duration;
       this.$store.commit('changeCurrentTime',{currentTime,duration})
    },
    getDuration() {
      this.duration=Math.floor(this.$refs.audio.duration)
    },
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
.music-float{position: fixed;right: 0.5rem;bottom: 1rem;width: 1.2rem;height: 1.2rem;border-radius: 50%;overflow: hidden;border: 0.02rem solid #f39a73;z-index: 3;}
.music-inner{position: relative;}
.play-btn{position: absolute;width: 100%;height: 100%;top: 0;left: 0;display: flex;justify-content: center;align-items: center;}
.musicRotate{animation: musicRotate 10s linear infinite;}
@keyframes musicRotate{
  0%{transform: rotateZ(0deg);}
  100%{transform: rotateZ(360deg);}
}
#audio{position: fixed;bottom: 0;width: 90%;left: 0;left: 5%;}
</style>
