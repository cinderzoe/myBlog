//加工state成员给外界
//Getters中的方法有两个默认参数
//state 当前VueX对象中的状态对象
//getters 当前getters对象，用于将getters下的其他getter拿来用
getters:{
    nameInfo(state){
        return "姓名:"+state.name
    },
    fullInfo(state,getters){
        return getters.nameInfo+'年龄:'+state.age
    }  
}

//组件中调用：this.$store.getters.fullInfo
//这里有一个疑问：getters和mutations的区别