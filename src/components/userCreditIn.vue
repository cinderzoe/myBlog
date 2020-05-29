<template>
  <div id="userCreditIn">
    <div class="wrap">
      <div class="back" @click="back"></div>
      <div class="save" @click="save" :class="change?'active':''">保存</div>
      <div class="title">修改{{creditInfo.title}}</div>
      <van-form class="form">
        <div class="name" v-if="creditInfo.attribute=='niname'">
          <div class="tit">你的姓名</div>
          <van-field class="txt" v-model="creditInfo.msg" name="名字" type="txt" maxlength="10"></van-field>
          <div>{{creditInfo.msg.length}}/10</div>
        </div>
        <div class="introduction" v-if="creditInfo.attribute=='introduction'">
          <div class="tit">个人简介</div>
          <van-field class="txt" v-model="creditInfo.msg" rows="3" type="textarea" maxlength="50"></van-field>
          <div>{{creditInfo.msg.length}}/50</div>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'userCreditIn',
  data () {
    return {
      creditCont:'',
      change:false,
      backBool:false
    }
  },
  props: ['creditInfo'],
  methods:{
  	back(){
      this.$router.replace('/user')
  	},
    save(){
      var _this=this
      this.$axios.post('/updateSelfInfo',{
        username:_this.$store.state.user_name,
        attribute:_this.creditInfo.attribute,
        content:_this.creditInfo.msg
      }).then(res=>{
        _this.change=false;
        _this.$router.go(-1)
        if(_this.creditInfo.attribute=='niname'){
          _this.$store.commit('changeNiname',_this.creditInfo.msg)
        }
        else if(_this.creditInfo.attribute=='introduction'){
          _this.$store.commit('changeIntroduction',_this.creditInfo.msg)
        }
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    getRegion(){

    }
  },
  created(){
    this.creditCont=this.creditInfo.msg
    console.log(this.creditInfo)
  },
  watch:{
    'creditInfo.msg'(){
      if(this.creditCont!==this.creditInfo.msg){
        console.log("改变了")
        this.change=true;
      }else{
        console.log("没变")
        this.change=false;
      }
      
    }
  },
  beforeRouteLeave(to,from,next){
    if(this.change==true){
      this.$dialog.confirm({
        message: '是否保存修改',
        confirmButtonText:'放弃'
      })
      .then(() => {
        this.backBool=true
        next()
      })
      .catch(() => {
        console.log("取消")
      });
    }else{
      next()
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
#userCreditIn{position: fixed;width: 100%;height: 100vh;top: 0;left: 0;background-color: #fff;}
.back{width: .9rem;height: .9rem;background: url(../assets/creditBack.png) left center no-repeat;background-size: auto 100%;position: absolute;top: .2rem;left: .2rem;}
.title{font-size: .5rem;text-align: center;line-height: 1.3rem;border-bottom: 1px solid #f5eded;}
.form{padding:.5rem 0;}
.form >>> .van-cell{font-size: .47rem;}
.txt{border: 1px solid #c3c3c3;border-radius: 3px;margin-bottom: .5rem;}
.tit{padding-bottom: .3rem;font-size: .4rem;}
.get-region{font-size:.45rem;}
.region .txt{border: none;font-size: .47rem;}
.save{position: fixed;top: 0;right: 0.5rem;line-height: 1.3rem;color: #999;font-size: .47rem;cursor: pointer;}
.save.active{color: #ee0a24;}
</style>