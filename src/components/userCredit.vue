<template>
	<!-- <transition :name="transitionName"> -->
		<div id="userCredit">
			<div class="wrap">
				这里是编辑页
			</div>
		</div>
	<!-- </transition> -->
</template>

<script>
export default {
  name: 'userCredit',
  data () {
    return {
     	transitionName:'slide'
    }
  },
  // beforeRouteEnter (to, from, next) {
  // 	next(vm => {
	 // 		vm.transitionName='slide'
		// })
  // }
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
.slide-enter-active{
  transition: .2s ease-out;
  transform: translateX(0);
}
.slide-leave-active {
  transition: .2s ease-out;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>