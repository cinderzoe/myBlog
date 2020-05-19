// 初始化状态
const state = {
    user_name: '',
    isLogin:false,
    currentUser:null,
    token:'',
    bgAudioPic:'', //音乐背景图
    audioShow:false, //旋转音乐盒是否显示
    bgAudioUrl:'', //MP4资源
    musicPlayBtn:false,
    audioId:'',//音乐id,获取歌词
    header:true, //头部显示
    footer:false,//底部显示
    musicName:'', //音乐名
    musicAuthor:'', //音乐人
    currentTime:0,//audio当前播放时间
    duration:0,//audio时长
    temCurrentTime:-1,//临时的当前时间，做判断
    musicNav:false,//音乐导航显示
    userNav:false,//用户名导航显示
    articleNav:false,//文章导航显示

}


export default state