<template>
  <div class="featured">
    <slider :images="image_list"></slider>
    <banner title="歌单推荐" :tab="songMenuTab" :data="songMenu" @click="enterDetail" @chooseTab="chooseTab"></banner>
    <bannerNew title="新歌首发" :tab="newSongTab" :data="newSong" @handleClickNew="handleClickNew" @chooseTab="getNewSong"></bannerNew>
    <bannerDisk title="新碟首发" :tab="newDiskTab" :data="newDisk" @handleClickDisk="handleClickDisk" @chooseTab="getNewDisk"></bannerDisk>
  </div>
</template>

<script>
import banner from "#/common/songListBanner.vue";
import bannerNew from "#/common/newSongBanner.vue";
import bannerDisk from "#/common/newDiskBanner.vue";
import slider from "#/common/slider.vue";
export default {
  components: {
    slider,
    banner,
    bannerNew,
    bannerDisk,
  },
  created(){
    this.getBanner()
    this.getRecommendForMe()
    this.getNewSong();
    this.getNewDisk();
  },
  data() {
    return {
      activeIndex: 0,
      image_list: [],
      songMenu:[],
      songMenuTab:[
        {id:0,name: '为你推荐'},
        {id:3317,name: '官方歌单'},
        {id:59,name: '经典'},
        {id:71,name: '情歌'},
        {id:3056,name: '网络歌曲'},
        {id:64,name: 'KTV热歌'},
      ],
      newSong:[],
      newSongTab:[
        {id:0,name: '最新'},
        {id:1,name: '内地'},
        {id:2,name: '港台'},
        {id:3,name: '欧美'},
        {id:4,name: '韩国'},
        {id:5,name: '日本'},
      ],
      newDisk:[],
      newDiskTab:[
        {id:1,name: '内地'},
        {id:2,name: '港台'},
        {id:3,name: '欧美'},
        {id:4,name: '韩国'},
        {id:5,name: '日本'},
        {id:6,name: '其他'},
      ],
    };
  },
  methods:{
    async getBanner (){
      let res = await this.$request.get("/recommend/banner",{
        baseURL: 'http://127.0.0.1:3300',
      });
      this.image_list = res.data;
    },
    async getRecommendForMe (){
      let res = await this.$request.get("/recommend/playlist/u",{
        baseURL: 'http://127.0.0.1:3300',
      });
      this.songMenu = res.data.list;
    },
    async chooseTab(item){
      if(item.id){
        let res = await this.$request.get("/recommend/playlist",
        { params: { id: item.id },
          baseURL: 'http://127.0.0.1:3300',
        });
        this.songMenu = res.data.list;
      }else{
        this.getRecommendForMe()
      }
    },
    enterDetail(item){
      this.$router.push({
        path:'/qqDetail',
        query:item
      })
    },

    async getNewSong(item=0){
      let res = await this.$request.get("/new/songs",
        { params: { type: item?item.id:item },
          baseURL: 'http://127.0.0.1:3300',
        });
        this.newSong = res.data.list.slice(0,30);
    },
    handleClickNew(item){
      console.log(item);
    },

    async getNewDisk(item=1){
      let res = await this.$request.get("/new/album",
        { params: { type: item.id?item.id:item,num:30 },
          baseURL: 'http://127.0.0.1:3300',
        });
        this.newDisk = res.data.list;
    },
    handleClickDisk(item){
      console.log(item);
      this.$router.push({
        path:'/qqDiskDetail',
        query:item
      })
    },
    
    
  }
};
</script>

<style scoped lang="less">
.featured {
  .sub-title {
    font-size: 14px;
    color: #dedede;
    -webkit-user-select: none;
  }
  .card-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: auto;
  }
  .tab-list {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-around;
    color: #dedede;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }
}
.active {
  color: #17d28d !important;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
