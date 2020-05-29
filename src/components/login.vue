<template>
  <div class="app-login">
    <van-form>
      <div class="login-tit">{{loginStatus?'登陆':'注册'}}</div>
	  <van-field v-model="username" name="用户名" left-icon="contact" label="用户名" placeholder="用户名" />
	  <van-field v-if="!loginStatus" v-model="niname" name="昵称" left-icon="smile-o" label="昵称" placeholder="昵称" />
	  <van-field v-model="password" left-icon="closed-eye" type="password" name="密码" label="密码" placeholder="密码" />
	  <van-field v-if="!loginStatus" left-icon="closed-eye" v-model="passwordrep" type="password" name="确认密码" label="确认密码" placeholder="确认密码" />
	  <div style="margin: 16px;">
	    <van-button v-if="loginStatus" round block type="info" native-type="submit" @click="loginSubmit">登陆</van-button>
	    <van-button v-else round block type="info" native-type="submit" @click="registerSubmit">注册</van-button>
	    <div @click="change" class="register">{{loginStatus?'没有账户，注册':'已有账户，登陆'}}</div>

	  </div>
	</van-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      niname:'',
      username: '',
      password: '',
      passwordrep: '',
      loginStatus:true,
      userTip:'',
    }
  },
  beforeCreate:function(){
    this.$store.commit('headerShowOr',false)
  },
  created:function () {
  	if(this.$store.state.user_name!==''){
  		this.$router.replace('/')
  	}
  	this.$emit('header', false);
    console.log(this.$store.state.header)
  },
  methods:{
  	change(){
  		this.loginStatus=!this.loginStatus;
  		this.loginTitle=false;
  		this.niname='';
  		this.username='';
  		this.password='';
  		this.passwordrep='';
  	},
  	loginSubmit(){
  		if(this.username.length==0){
  			this.$toast('请输入用户名');
  			return;
  		}
  		if(this.password.length==0){
  			this.$toast('请输入密码');
  			return;
  		}
  		else{
  			var _this=this;
  			this.$axios.post('/login', {
              username: this.username,
              password: this.password
            }).then(res=>{
              console.log(res)
              if(res.data.status==202){
                this.username=''
                this.password=''
              }
              else if(res.data.status==201){
                this.password=''
              }
              else{
                this.$store.commit('changeUserName', this.username)
                window.localStorage.setItem('tokenid',res.data.tokenid)
              	this.$router.replace('/')
                this.$store.commit('headerShowOr',true)
              }
              this.$toast(res.data.msg);
              
            }).catch(err=>{
              console.log(err)
            })
  		}
  		
  	},
  	registerSubmit(){
  		// ^[a-zA-Z_]$
  		if(this.username.length==0){
  			this.$toast('请输入用户名');
  			return;
  		}
  		else if(!/^[0-9a-zA-Z]+$/.test(this.username)){
  			this.$toast('用户名只能使用英文或数字');
  			return;
  		}
  		else if(this.username.length<5){
  			this.$toast('用户名不能少于6位数');
  			return;
  		}
  		if(this.niname.length==0){
  			this.$toast('请输入昵称');
  			return;
  		}
  		else if(this.password.length==0){
  			this.$toast('请输入密码');
  			return;
  		}
  		else if(this.password.length<5){
  			this.$toast('密码不能少于6位数');
  			return;
  		}
  		else if(this.passwordrep.length==0){
  			this.$toast('请输入确认密码');
  			return;
  		}
  		else if(this.passwordrep!==this.password){
  			this.$toast('二次输入密码不正确');
  			return;
  		}else{
  			this.$axios.post('/register', {
              username: this.username,
              niname:this.niname,
              password: this.password
            }).then(res=>{
            	console.log(res)
              if(res.data.status==202){
              	this.password='';
              	this.passwordrep='';
              }
              else{
                // this.$cookies.set('username', this.manageName)
                // this.manageName=this.$cookies.get('username');
  				setTimeout(()=>{
  					this.loginStatus=!this.loginStatus;
  					this.username='';
              		this.niname='';
  					this.password='';
              		this.passwordrep='';
  				},800)
              }
              this.$toast(res.data.msg);
            }).catch(err=>{
              console.log(err)
            })
  			
  		}

  		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
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
.app-login{height: 70vh;display: flex;flex-direction: column;justify-content: center;text-align: center;}
.register{color: #999;font-size: 0.43rem;margin-top: 0.5rem;text-decoration: underline;cursor: pointer;}
.register:hover{color: #333;}
.login-tit{font-size: 0.6rem;margin-bottom: 1rem;}
.van-cell{font-size: 0.47rem;}
.van-field__left-icon .van-icon, .van-field__right-icon .van-icon{font-size: 0.5rem;}
.van-button--normal{font-size: 0.52rem;}
</style>

