// 成员操作
const mutations = {//第一个参数是vuex中的state,第二个参数是该方法被调用时传递过来的参数
	changeUserName(state,val){   //修改用户名
		state.user_name=val; 
	},
	setAudioPic(state,val){
		state.bgAudioPic=val.picUrl;
		state.bgAudioUrl=`https://music.163.com/song/media/outer/url?id=${val.musicId}.mp3`;
		state.audioId=val.musicId;
		state.musicName=val.musicName;
		state.musicAuthor=val.musicAuthor;
	},
	musicPlayPause(state,val){
		state.audioShow=val
	},
	changeAudioUrl(state,val){

	},
	changeMusicPlayBtn(state,val){
		state.musicPlayBtn=val;
	},
	headerShowOr(state,val){
		state.header=val;
	},
	footerShowOr(state,val){
		state.footer=val;
	},
	changeCurrentTime(state,val){
		state.currentTime=val.currentTime
		state.duration=val.duration
	},
	changeAudioCur(state,val){
		state.currentTime=val
	},
	changeTemCurTime(state,val){
		state.temCurrentTime=val
	}


}
export default mutations