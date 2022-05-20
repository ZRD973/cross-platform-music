<template>
    <div id="detail_wrapper">
        <div class="p-5" v-if="playInfo">
        <info :playInfo="playInfo" :playAll="()=>playAll()" :collect="()=>collect()"></info>
            <el-tabs class="mt-3" v-model="tab">
                <el-tab-pane lazy :label="`歌曲 ${songnum}`" name="tracks">
                    <song-list-detail @handelSong="handleClickSong" :songList="songList"></song-list-detail>
                </el-tab-pane>
                <!-- <el-tab-pane lazy label="评论" name="comments">
                    评论
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import info from '#/common/info.vue';
import songListDetail from '#/common/songListDetail.vue';
export default {
    name: "detail",
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
            if(this.$route.query.content_id){
                this.init()
            }
            if(this.$route.query.dissid){
                this.init()
            }
            if(this.$route.query.id){
                this.init()
            }
        }
    },
    methods: {
        async init(){
            this.playInfo=""
            this.tab = 'tracks';
            const res = await this.$request.get("/songlist",{ 
                params: { id: this.$route.query.content_id || this.$route.query.dissid || this.$route.query.id},
                baseURL: 'http://127.0.0.1:3300',
            });
            console.log(res);
            this.playInfo = res.data;
            this.songList = res.data.songlist;
            this.songnum = res.data.songnum
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
