<template>
    <div class="detail_wrapper">
        <div v-if="music">
            <audio controls="controls" autoplay style="display: none;">
                <source :src="music" type="audio/mp3" />
            </audio>
        </div>
        <div class="header">
            <div style="width:50%;">歌曲</div>
            <div style="width:20%;">歌手</div>
            <div style="width:20%;">专辑</div>
            <div style="width:10%;">时长</div>
        </div>
        <div class="content_wrapper">

            <div class="content hover" v-for="item in songList">
                <div class="hover" style="width:50%;padding: 0 10px;" 
                    @click="handleClick(item)">
                    {{ isRank? item.title:item.songname}}
                </div>
                <div class="hover" style="width:20%;padding: 0 10px;">
                    <span v-for="sub in item.singer">{{sub.name}}</span>
                </div>
                <div class="hover" style="width:20%;padding: 0 10px;">
                    {{isRank? item.album.title : item.albumname}}
                </div>
                <div style="width:10%;padding: 0 10px;">{{formatDuring(item.interval)}}</div>
            </div>
        </div>

    </div>
</template>
<script>
import { Axios } from '@/utils/axios';
export default {
    name:"songListDetail",
    props: {
        songList: {
            type: Array,
            default() {
                return [];
            },
        },
        isRank:{
            type: Boolean,
            default() {
                return false;
            },
        }
    },
    created(){

    },
    data(){
        return{
            music:""
        }
    },
    methods:{
        async handleClick(item){
            console.log(item);
            let res  = await Axios({ url:'/song/urls',params:{id:item.songmid || item.mid}})
            this.music = res.data[item.songmid || item.mid]
            let data  = await Axios({ url:'/lyric',params:{songmid:item.songmid || item.mid}})
            console.log(data);
            // this.$emit('handelSong',item)
        },
        formatDuring(during) {
            const s = Math.floor(during) % 60;
            during = Math.floor(during / 60);
            const i = during % 60;
            const ii = i < 10 ? `0${i}` : i;
            const ss = s < 10 ? `0${s}` : s;
            return ii + ':' + ss;
        }
    },
   computed:{

   }
};
</script>

<style lang="less" scoped>
.detail_wrapper{
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .content_wrapper{
        .content{
            padding: 5px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 600;
            overflow: hidden;
            .hover{
                overflow: hidden;  
                white-space: nowrap;  
                text-overflow: ellipsis;  
            }
            .hover:hover{
                color: var(--themeColor);
                cursor: pointer;
            }
        }
    }
}
</style>
