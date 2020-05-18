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
  created(){
    var _this=this;
    this.$axios.post('/checktoken',{
      headers:{
          Authorization:window.localStorage.getItem('tokenid')
        }
    })
    .then(function (res) {
      console.log(res)
      if (res.data.status==200) {
        _this.$store.commit('changeUserName', res.data.user)
        console.log(res.data.user)
        console.log(_this.$store.state.user_name)
      }
    })
    .catch(function (err) {
      this.$router.replace('/login')
    });
  },
  methods:{
    getInfo(){
    }
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
