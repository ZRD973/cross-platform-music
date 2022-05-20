<template>
    <div id="detail_wrapper">
        <div class="p-5" v-if="playInfo">
            <div style="display: flex;">
                <img style="width: 150px;height:150px;" :src="playInfo.picUrl" alt="">
                <div style="margin-left: 30px;margin-top:30px;font-size:36px;">{{playInfo.title}}</div>
            </div>
            <el-tabs class="mt-3" v-model="tab">
                <el-tab-pane lazy :label="`歌曲 ${songnum}`" name="tracks">
                    <song-list-detail @handelSong="handleClickSong" :isRank="true" :songList="songList"></song-list-detail>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import info from '#/common/info.vue';
import songListDetail from '#/common/songListDetail.vue';
export default {
    name: "rankDetail",
    components:  { info,songListDetail },
    data() {
        return {
            tab:'tracks',
            songnum:0,
            playInfo:{},
            songList:[],
        };
    },
    watch: {
        $route(to,from){
            if(this.$route.query.topId){
                this.init()
            }
        }
    },
    methods: {
        async init(){
            this.playInfo=""
            this.tab = 'tracks';
            const res = await this.$request.get("/top",{ 
                params: { id: this.$route.query.topId},
                baseURL: 'http://127.0.0.1:3300',
            });
            this.playInfo = res.data.info;
            this.songList = res.data.list;
            this.songnum = res.data.total
        },
        handleClickSong(item){
            console.log(item);
        },
        playAll(){ },
        collect(){
            console.log(1231312312);
        }
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
}
</style>
