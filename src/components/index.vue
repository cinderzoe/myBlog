<template>
  <div class="index">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '这里是主页面22'
    }
  },
  beforeCreate(){
    
  },
  methods:{
    getInfo(){
    }
  },
  activated(){
    this.$store.commit('changeNavShow',{music:false,user:true,article:false})
  }

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
  color: #42b983;
}
</style>
