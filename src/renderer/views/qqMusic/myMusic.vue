<template>
    <div id="my_music_wrapper">
      <div v-if="music">
        <audio controls="controls" autoplay style="display: none;">
          <source :src="music" type="audio/mp3" />
          <!-- <source src="http://isure.stream.qqmusic.qq.com/C400000hBf9000XCGz.m4a?guid=2796982635&vkey=7E847FE2EF7BA0F5A53E2D666FFB9A05ADD68A5C56235708143721231E4CDBBC98076F8305C228B790F828454EA84AEE7D45B77890EDDD62&uin=2412636730&fromtag=120002" type="audio/mp3" /> -->
          <!-- <source :src="music" type="audio/mp3" /> -->
        </audio>
      </div>
      <div class="user" v-if="isLogin==1 && isFinish">
        <img :src="userInfo.creator.headpic" />
        <div style="margin-left: 20px;margin-top: 25px;">
          <div style="font-size: 30px;">{{userInfo.creator.nick}}</div>
          <div>暂无</div>
          <div>关注:{{userInfo.creator.nums.follownum}}</div>
        </div>
        <el-button type="info" size="small" class="loOut" @click="Logout">退出</el-button>
      </div>

      <div v-if="isLogin==0">
          <el-button @click="goLogin">点击登录</el-button>
          <el-button @click="loginFinish(QQ)">登录完成？</el-button>
      </div>

      <div class="list">
        <el-tabs v-if="isLogin==1 && isFinish" v-model="activeName">
            <el-tab-pane :label="`我喜欢${userInfo.mymusic[0].num0}`" name="qqMyLike"> 
              <songListDetail @handelSong="handleClickSong" :songList="myLike.songlist"></songListDetail>
            </el-tab-pane>
            <el-tab-pane :label="`创建的歌单${userInfo.mydiss.num}`" name="qqCreate"> 
              <div class="create">
                <div class="item" v-for="item in userInfo.mydiss.list" @click="handleClickItem(item)">
                  <img class="img" :src="item.picurl" alt="">
                  <i class="mod_cover__icon_play"></i>
                  <div class="title">{{item.title}}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="`收藏的歌单${userInfo.mymusic[0].num2}`" name="qqCollect">
              <div class="create">
                <div class="item" v-for="item in myCollect.list" @click="handleClickItem(item)">
                  <img class="img" :src="item.picurl || item.logo" alt="">
                  <i class="mod_cover__icon_play"></i>
                  <div class="title">{{item.title}}</div>
                </div>
              </div>
            </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import { Axios } from '@/utils/axios';
import songListDetail from '#/common/songListDetail.vue';
export default {
    name: "myQQMusic",
    components: { songListDetail },
    data() {
        return {
            QQ:2412636730,
            isQQ:localStorage.getItem('isQQ'),
            isLogin:localStorage.getItem('isQQ'),
            isFinish:false,
            activeName: "qqMyLike",
            userInfo:{},
            myLike:{},
            myCollect:{},
            music:"",
            qqCookie:"pgv_pvid=1103937080; fqm_pvqid=83670207-e77f-4147-b09a-ce94934bf483; ts_uid=5027746210; RK=gd39FrYU6s; ptcz=6dca291718f44a58f0c1839a93a5c22c204c2acf7eeb6b7958557cba6a6cc250; euin=owv5owCi7wSion**; tmeLoginType=2; fqm_sessionid=ac0eafad-c42e-4ace-ad1a-17759112223f; pgv_info=ssid=s1514626525; ts_last=y.qq.com/; _qpsvr_localtk=0.29205018441495856; login_type=1; uin=2412636730; qm_keyst=Q_H_L_5Cjf54tZVxBKiaN_XVrzHmp6TB7OXphVPozVLreAX1KCHftalb32XbQ; wxrefresh_token=; psrf_qqaccess_token=72C77E05169E40C417E2CCEF4A0FF97B; qm_keyst=Q_H_L_5Cjf54tZVxBKiaN_XVrzHmp6TB7OXphVPozVLreAX1KCHftalb32XbQ; wxopenid=; wxunionid=; psrf_qqrefresh_token=C2FF5F40953845900FA19CB4D1646A36; qqmusic_key=Q_H_L_5Cjf54tZVxBKiaN_XVrzHmp6TB7OXphVPozVLreAX1KCHftalb32XbQ; psrf_musickey_createtime=1652947653; psrf_qqopenid=0DBA4C1847D2BBAB8089149C5C63BD9E; psrf_access_token_expiresAt=1660723653; psrf_qqunionid=25C6B935D3D0F015B92A2AE404FEAD4C",
        };
    },
    methods: {
      goLogin() {
            const winURL ='https://y.qq.com';
            const remote = require("electron").remote;
            // const { BrowserWindow, globalShortcut } = this.$electron.remote;
            let win = new remote.BrowserWindow({
                width: 1000,
                height: 600,
                // frame: false,
                // fullscreen: false,
                webPreferences: {
                //     nodeIntegration: true,
                //     nodeIntegrationInWorker: true,
                //     webSecurity: false,
                //     devTools: false
                },
            });
            win.on('close',()=>{
              this.get_Cookie(this.QQ)
              win = null
            })
            win.loadURL(winURL);
      },
      async Logout(){
        localStorage.setItem('isQQ',0);
        this.isLogin = localStorage.getItem('isQQ');
        // let res  = await Axios({ url:'/user/cookie' })
        // console.log(res);
        let res  = await Axios({ url:'/user/logOut'})
        let setCookie  = await Axios({ url:'/user/setCookie',method:'post', 
          data:{data:""}
        })
        console.log(setCookie);
        let getCookie  = await Axios({ url:'/user/getCookie',params:{id:this.QQ} })
        console.log(getCookie);
        console.log(res);
      },
      get_Cookie(uin) {
            const infoUrl = `https://u.y.qq.com/cgi-bin/musicu.fcg?format=json&&loginUin=${uin}&hostUin=0inCharset=utf8&outCharset=utf-8&platform=yqq.json&needNewCode=0&data=${encodeURIComponent(
              JSON.stringify({
                comm: { ct: 24, cv: 0 },
                vip: {
                  module: 'userInfo.VipQueryServer',
                  method: 'SRFVipQuery_V2',
                  param: { uin_list: [uin] },
                },
                base: {
                  module: 'userInfo.BaseUserInfoServer',
                  method: 'get_user_baseinfo_v2',
                  param: { vec_uin: [uin] },
                },
              })
            )}`;
            Axios({ url:infoUrl }).then(res=>{
              console.log(res);
            })
      },
      async loginFinish(uin){
        let setCookie  = await Axios({ url:'/user/setCookie',method:'post', 
          data:{data:this.qqCookie}
        })
        console.log(setCookie);

        let getCookie  = await Axios({ url:'/user/getCookie',params:{id:uin} })
        console.log(getCookie);

        let res  = await Axios({ url:'/user/cookie' })
        console.log(res);

        // let detail  = await Axios({ url:'/user/detail',params:{id:uin} })
        // console.log(detail);
        this.isLogin = 1;
        localStorage.setItem('isQQ',1);
        this.getUser()
      },
      async getUser(){
        let detail  = await Axios({ url:'/user/detail',params:{id:this.QQ} })
        if(detail.result==301){
          this.isFinish = false;
          localStorage.setItem('isQQ',0);
          this.isQQ = localStorage.getItem('isQQ')
          this.isLogin = localStorage.getItem('isQQ')
          this.$Message({message:detail.errMsg,offset:200,center:true,duration:1500})
          return;
        }
        this.userInfo = detail.data
        this.isFinish = true
        this.getMySongList(detail.data.mymusic[0].id)
        this.getMyCollect(detail.data.mymusic[0].id)
      },
      async getMySongList(id){
        let res  = await Axios({ url:'/songlist',params:{id:id} })
        this.myLike = res.data
      },
      async getMyCollect(id){
        let res  = await Axios({ url:'/user/collect/songlist',params:{id:this.QQ} })
        this.myCollect = res.data
      },
      async handleClickSong(item){
        // this.music = ""
        // let res  = await Axios({ url:'/song/urls',params:{id:item.songmid}})
        // console.log(res);
        // this.music = res.data[item.songmid]
        // let data  = await Axios({ url:'/lyric',params:{songmid:item.songmid}})
        // console.log(data);
      },
      handleClickItem(item){
        console.log(item);
        this.$router.push({
          path:'/qqDetail',
          query:item
        })
      }

    },
    computed: {},
    created() {
      let isQQ = localStorage.getItem('isQQ')
      if(isQQ == null || isQQ == undefined){
        localStorage.setItem('isQQ',0);
      }
      if(isQQ==1){
        this.getUser();
      }
    },
};
</script>

<style lang="less" scoped>
#my_music_wrapper {
  margin-left: 30px;
  .user{
    display: flex;
    position: relative;
    img{
      border-radius: 50%;
    }
    .loOut{
      position: absolute;
      right: 50px;
      bottom: 20px;
    }
  }
  .list{
    display: flex;
  }
    ::v-deep .el-tabs__nav-scroll {
        // display: flex !important;
        justify-content: flex-start !important;
    }
    ::v-deep .el-tabs__active-bar {
        background-color: var(--themeColor);
    }
    ::v-deep .el-tabs__item.is-active {
        color: var(--themeColor);
    }
    ::v-deep .el-tabs__header {
        margin: 0;
    }

    ::v-deep .el-tabs__content {
        position: relative !important;
        padding: 10px;
        // margin-left: 20px;
        top:10px !important;
        // bottom: 0px;
        left: 0px !important;
        right: 0px !important;
        // overflow-y: auto;
        // background-color: #fff;
    }
}
.create{
  .item{
    float: left;
    margin:15px;
    position: relative;
    .img{
      width: 150px;
      height: 150px;
      cursor: pointer;
      border-radius: 15px;
      object-fit: cover;
      transform: scale(1) translateZ(0);
      transition: transform 0.75s;
      // position: absolute;
      // top: 0;
      // left: 0;
    }
    .mod_cover__icon_play{
        position: absolute;
        left: 50%;
        top: 40%;
        margin: -35px;
        width: 70px;
        height: 70px;
        opacity: 0;
        // transform: translate(-50%,-50%);
        transform: scale(.7) translateZ(0);
        transition-property: opacity,transform;
        transition-duration: .5s;
        zoom: 1;
        background-image: url('../../assets/images/cover_play.png');
    }
    
    .title{
      margin-top: 10px;
      margin-left:10px;
      cursor: pointer;
    }
    .title:hover{
      color: var(--themeColor);
    }
  }
}
.item:hover .img{
    transform:translateY(-10px);
}
.item:hover .mod_cover__icon_play{
  opacity: .7;
  transform: scale(0.9);
}

</style>
