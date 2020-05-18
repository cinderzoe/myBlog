<template>
  <div class="music">
    <music-list></music-list>
  </div>
</template>

<script>
import musicList from './musicList'
export default {
  name: 'music',
  data () {
    return {
      musicPic:'http://p2.music.126.net/r5GreclAlTqB1vk2Yjke-A==/109951164968090284.jpg'
    }
  },
  components: {
      'music-list':musicList
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
</style>
