<template>
<div>
  <div class="screen_wrap">
    <div class="screen_line" v-for="(item, idx) in staticScreen.slice(0,showLength)" :key="idx">
      <span class="screen_label">{{ item.type }}</span>
      <span class="screen_item" v-for="(val, index) in item.list"
        :class="{ current: currentId == val.id }"
        @click="chooseItem(val.id)"
        >{{ val.name }}
      </span>
    </div>
    <el-button class="btn" size="small" type="info" @click="handleShowMore">{{isShowMore?"收起":"更多"}}</el-button>
  </div>

  <div class="song_wrap">
        <div class="listCard" >
            <div class="listCardItem" v-for="item in songList" @click="clickListCardItem(item)" >
                <div class="image">
                    <img :src="item.imgurl" alt="" />
                </div>
                <div class="playNUm">
                    <i class="el-icon-headset"></i>
                    {{(item.listennum/10000).toFixed(1)}} 万
                </div>
                <i class="mod_cover__icon_play"></i>
                <div class="text">{{item.dissname}}</div>
                <div>{{item.creator.name}}</div>
            </div>
        </div>
  </div>
   <div class="btn">
        <el-button-group>
            <el-button type="success" plain @click="loadMore('pre')" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="success" plain @click="loadMore('next')">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
        </el-button-group>
    </div>
</div>

</template>

<script>
export default {
    name: "qqRecommend",
    components: {},
    data() {
        return {
            isShowMore:false,
            showLength:3,
            currentId:10000000,
            staticScreen:[],
            req:{
                pageSize:  30,
                pageNo: 1,
                sort: 5,// 5: 推荐，2: 最新，其他数字的排列值最后都会返回推荐
                category: 10000000,// （全部），其他值从上面的分类接口获取
            },
            songList:[],
        };
    },
    methods: {
        async getcategory(){
            let res = await this.$request.get("/songlist/category",{ baseURL: 'http://127.0.0.1:3300' });
            this.staticScreen = res.data;
        },
        async getSongList(){
            let res = await this.$request.get("/songlist/list",{ baseURL: 'http://127.0.0.1:3300',params:{...this.req} });
            this.songList = res.data.list;
        },
        chooseItem(id){
            this.currentId = id;
            this.req.category = id;
            this.getSongList();
        },
        handleShowMore(id){
            this.isShowMore = !this.isShowMore
            if(this.isShowMore){
                this.showLength = this.staticScreen.length;
            }else{
                this.showLength = 3
            }
        },
        clickListCardItem(item){
            // console.log(item);
            this.$router.push({
                path:'/qqDetail',
                query:item
            })
        },
        loadMore(type){
            if(type=="pre" && this.req.pageNo>1){
                this.req.pageNo--
                this.getSongList();
            }
            if(type=="next" && !(this.songList.length<30)){
                this.req.pageNo++
                this.getSongList();
            }
        }
    },
    computed: {},
    created() {
        this.getcategory();
        this.getSongList();
    },
};
</script>

<style lang="less" scoped>
  .screen_wrap {
    background: rgba(175, 175, 175, 0.5);
    position: relative;
    border-radius: 4px;
    background-color: #f8f8f8;
    word-break: break-all;
    margin-bottom: 20px;
    .screen_line {
      color: #666;
      padding: 0;
      position: relative;
      margin: 10px 0;
      padding-left: 60px;
      .screen_label {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 50px;
        margin-right: 20px;
        padding: 0 5px;
        border-radius: 16px 0 16px 16px;
        background-color: #7f7f8c;
        color: #fff;
        line-height: 32px;
        text-align: center;
      }
      .screen_item {
        cursor: pointer;
        display: inline-block;
        margin: 2px;
        padding: 0 7px;
        border-radius: 15px;
        line-height: 28px;
        vertical-align: top;
      }
      .screen_item:last-of-type{
          margin-right: 70px;
      }
      .screen_item:hover {
        color: var(--themeColor);
      }
      .current {
        position: relative;
        background-color: #f7eae8;
        color: #ff5c38;
        color: var(--themeColor);
        font-weight: 700;
      }
    }
    .screen_line::after {
      position: absolute;
      top: -14px;
      right: 0;
      left: 90px;
      height: 1px;
      background-color: #eee;
      content: "";
    }
    .screen_line:nth-of-type(1)::after {
      background-color: unset;
      content: "";
    }
    .btn{
        position: absolute;
        right:20px;
        bottom: 0px;
    }
  }
  .song_wrap{
      .listCard {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
}

.listCardItem {
    width: 18.4%;
    margin: 0 2% 20px 0;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border-radius: 10px;
    transition-duration: .5s;
}
.text{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.mod_cover__icon_play{
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -35px;
    width: 70px;
    height: 70px;
    opacity: 0;
    transform: scale(.7) translateZ(0);
    transition-property: opacity,transform;
    transition-duration: .5s;
    zoom: 1;
    background-image: url('../../../assets/images/cover_play.png');
}
.listCardItem:hover .mod_cover__icon_play{
    opacity: 1;
    transform: scale(0.9);
}
.listCardItem:hover{
    transform:translateY(-10px);
}

.listCardItem:nth-child(5n) {
    margin-right: 0;
}

.image {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    position: relative;
}
.playNUm{
    position: absolute;
    right: 10px;
    bottom: 50px;
    z-index: 99;
    color: white;
    padding: 2px 10px;
    background-color: rgba(61, 60, 60, 0.7);
}
.image::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../../../assets/images/imgLoading.png") no-repeat center;
    background-size: contain;
    border-radius: 10px;
    z-index: -1;
}

.image img {
    width: 100%;
    border-radius: 10px;
    height: 100%;
    object-fit: cover;
    transform: scale(1) translateZ(0);
    transition: transform 0.75s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // border-radius: 5%;
}

  }
  .btn{
    display: flex;
    justify-content: center;
}
</style>
