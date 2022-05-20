<template>
    <div id="detail_wrapper">
        <div v-if="playInfo">
            <div class="wrapper">
                <div class="img">
                    <img style="width: 150px;height:150px;" :src="playInfo.picurl" alt="">
                </div>
                <div class="left" style="margin-left: 30px;">
                    <div style="font-size: 36px;font-weight:600;">{{playInfo.title}}</div>
                    <div style="font-size: 20px;font-weight:500;margin-top: 5px;"><i class="el-icon-user"></i> {{playInfo.ar[0].name}}</div>
                    <div style="margin-top: 5px;">流派：{{playInfo.genre}}</div>
                    <div style="margin-top: 5px;">发行时间：{{playInfo.ctime}}</div>
                </div>
                <div class="right">
                    <div style="margin-top: 5px;">语种：{{playInfo.language}}</div>
                    <div style="margin-top: 5px;">类型：{{playInfo.albumType}}</div>
                    <div style="margin-top: 5px;">唱片公司：{{playInfo.company}}</div>
                </div>
                <div class="desc" :class="[isMore?'more':'']">
                    <el-button @click="clickMore" size="small">{{isMore?'收起':'更多'}}</el-button>
                    简介：{{playInfo.desc}}
                </div>

            </div>
            <el-tabs class="mt-3" v-model="tab">
                <el-tab-pane lazy :label="`歌曲${songList.total}`" name="tracks">
                    <song-list-detail @handelSong="handleClickSong" :isRank="true" :songList="songList.list"></song-list-detail>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import info from '#/common/info.vue';
import songListDetail from '#/common/songListDetail.vue';
export default {
    name: "diskDetail",
    components:  { info,songListDetail },
    data() {
        return {
            isMore:false,
            tab:'tracks',
            playInfo:{},
            songList:[],
        };
    },
    watch: {
        $route(to,from){
            if(this.$route.query.mid){
                this.init()
            }
        }
    },
    methods: {
        async init(){
            this.playInfo=""
            this.tab = 'tracks';
            const res = await this.$request.get("/album",{ 
                params: { albummid: this.$route.query.mid},
                baseURL: 'http://127.0.0.1:3300',
            });
            console.log(res);
            this.playInfo = res.data;
            const data = await this.$request.get("/album/songs",{ 
                params: { albummid: this.$route.query.mid},
                baseURL: 'http://127.0.0.1:3300',
            });
            console.log(data);
            this.songList = data.data;
        },
        handleClickSong(item){
            console.log(item);
        },
        clickMore(){
            this.isMore = !this.isMore
        },
        playAll(){},
        collect(){}
    },
    computed: {},
    created() {
        this.init()
    },
    
};
</script>

<style lang="less" scoped>
#detail_wrapper {
    padding: 10px 10px 10px 30px;
    .wrapper{
        display: flex;
        // height: 200px;
        .left{
            width: 200px;
            // height: 200px;
            white-space: nowrap;
        }
        .right{
            width: 180px;
            // height: 200px;
            margin-left: 30px;
            margin-top: 60px;
            white-space: nowrap;
        }
        .desc{
            width: 400px;
            height: 70px;
            margin-top: 60px;
            margin-left: 30px;
            overflow: hidden;
        }
    }
}
.more{
     height: 100% !important;
     z-index: 999;
     background-color: #F5F5F7;
     position: fixed;
     right: 20px;
}
</style>
