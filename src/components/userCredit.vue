<template>
		<div id="userCredit">
			<div class="wrap">
				<div class="back" @click="backUser"></div>
				<div class="title">编辑资料</div>
        <router-link to='/user/userCreditIn'></router-link>
        <div class="headPic" :style="{'backgroundImage':'url('+headPicUrl+')'}">
          <div class="head-credit">编辑<br>头像</div>
          <input class="file" type="file" name="" @change="getPic">
        </div>
        <div class="form">
          <div class="rels clear" @click="creditText({'msg':niname,'attribute':'niname','title':'名字'})">
            <div class="rels-tit fl">名字</div>
            <div class="rels-cont fr">{{niname}}</div>
          </div>
          <div class="rels clear" @click="creditText({'msg':introduction,'attribute':'introduction','title':'简介'})">
            <div class="rels-tit fl">简介</div>
            <div class="rels-cont fr">{{introduction}}</div>
          </div>
        </div>
			</div>
		</div>
		
</template>

<script>
export default {
  name: 'userCredit',
  data () {
    return {
      headPicUrl:'',
    }
  },
  created(){
    this.headPicUrl=this.$store.state.user_headPic
  },
  methods:{
  	backUser(){
  		this.$emit('showCredit',true)
  	},
    getPic(){

    },
    creditText(e){
      this.$emit('pushMsg',e)
      this.$router.push('/user/userCreditIn')
    },
  },
  computed:{
    niname:{
      get:function(){
        return this.$store.state.niname
      },
      set:function(){

      }
    },
    introduction:{
      get:function(){
        return this.$store.state.introduction
      },
      set:function(){

      }
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
.back{width: .9rem;height: .9rem;background: url(../assets/creditBack.png) left center no-repeat;background-size: auto 100%;position: absolute;top: .2rem;left: .2rem;}
.title{font-size: .5rem;text-align: center;line-height: 1.3rem;border-bottom: 1px solid #f5eded;}
.headPic{width: 2rem;height: 2rem;border-radius: 50%;margin-top: -1rem;background-size: cover;background-repeat: no-repeat;background-position: center;margin: .3rem auto;position: relative;overflow: hidden;}
.headPic .head-credit{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-color: rgba(0,0,0,0.2);color: #fff;text-align: center;padding-top: .5rem;box-sizing:border-box;z-index: 1;}
.file{opacity: 0;;position: relative;z-index: 2;width: 100%;height: 100%;}
.form{padding:.5rem 0;margin-top: .5rem;border-top: 1px solid #fafafa;font-size: .5rem;}
.rels{padding:.3rem 0;color: #929292;background: url(../assets/creditRel.png) right center no-repeat; background-size: auto .7rem;}
.rels-cont{max-width: 8rem;padding-right: .7rem;text-align: right;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;box-sizing: border-box;}
</style>