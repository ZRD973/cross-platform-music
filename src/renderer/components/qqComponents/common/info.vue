<template>
    <div class="info_wrapper">
        <div class="left">
            <img :src="playInfo.logo" alt="">
        </div>
        <div class="right">
            <div class="content">
                <div class="title">{{playInfo.dissname}}</div>
                <div class="user gap"> <i class="el-icon-user"></i> {{playInfo.nickname}}</div>
                <div class="desc gap"><span class="text" :alt="playInfo.desc" >{{playInfo.desc}}</span></div>
                <div class="tags gap"> 
                    标签: <span v-for="item in playInfo.tags"> {{ item.name || '……' }} </span> 
                    <span class="views gap">播放量：{{(playInfo.visitnum / 10000).toFixed(2)}}万</span>
                </div>
            </div>
            <div class="btn_ground">
                <el-button class="btn" style="width: 117px;" icon="el-icon-video-play" type="success" @click="playAll">播放全部</el-button>
                <el-button style="width: 117px;" icon="el-icon-star-off" @click="collect">
                    {{"收藏"}}
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"songListDetail",
    props: {
        playInfo: {
            type: Object,
            default() {
                return {};
            },
        },
        playAll:{
            type:Function,
            default: () => {}
        },
        collect:{
            type:Function,
            default: () => {}
        }
    },
    data(){
        return{
        }
    },
    methods:{
    },
   computed:{
   }
};
</script>

<style lang="less" scoped>
.info_wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    .left{
        width: 20%;
        height: 200px;
        display: flex;
        justify-content: center;
            align-items: center;
        img{
            width: 200px;
            height: 200px;
            border-radius: 20px;
        }
    }
    .right{
        padding: 10px 20px;
        width: 80%;
        height: 200px;
            .title{
                font-size: 30px;
                font-weight: 700;
            }
            .user{
                font-size: 20px;
            }
            .views{
                padding-left: 100px;
            }
            .desc{
                width: 60vw;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .gap{
                margin:5px 0;
            }
            .btn_ground{
               .btn{
                   background-color: var(--themeColor);
               }
            }
    }
}
.text{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
