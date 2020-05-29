<template>
  <div class="music">
    <music-list></music-list>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import musicList from './musicList'
export default {
  name: 'music',
  data () {
    return {
      transitionName:''
    }
  },
  components: {
      'music-list':musicList
  },
  mounted(){
    this.$store.commit('changeNavShow',{music:true,user:false,article:false})
  },
  watch: {
    '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-up' : 'slide-down'
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
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
 
.slide-up-enter {
  opacity: 0; 
  transform: translateY(-0.3rem);
}
 
.slide-up-leave-active {
  opacity: 0; 
  transform: translateY(0.3rem);
}
 
.slide-down-enter {
  opacity: 0; 
  transform: translateY(0.3rem);
}
 
.slide-down-leave-active {
  opacity: 0; 
  transform: translateY(-0.3rem);
}
</style>
