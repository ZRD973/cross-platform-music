<template>
    <div id="qq_music_wrapper">
        <el-tabs v-model="activeName">
            <el-tab-pane label="音乐馆" name="qqMusicHall">
                <MusicHall v-if="activeName=='qqMusicHall'"></MusicHall>
            </el-tab-pane>
            <!-- <el-tab-pane label="推荐" name="qqRecommend">
                <recommend v-if="activeName=='qqRecommend'"></recommend>
            </el-tab-pane> -->
            <!-- <el-tab-pane label="视频" name="qqVideo">
                <qqVideo v-if="activeName=='qqVideo'"></qqVideo>
            </el-tab-pane> -->
            <el-tab-pane label="我的音乐" name="qqMyMusic"> 
                <myMusic v-if="activeName=='qqMyMusic'"></myMusic>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import MusicHall from "./MusicHall.vue";
import recommend from "./recommend.vue";
import qqVideo from "./qqVideo.vue";
import myMusic from "./myMusic.vue";

export default {
    name: "index",
    components:  { MusicHall, recommend, qqVideo, myMusic },
    data() {
        return {
            activeName: null,
        };
    },
    watch: {},
    methods: {},
    computed: {},
    created() {
        this.activeName = "qqMusicHall";
    },
};
</script>

<style lang="less" scoped>
#qq_music_wrapper {
    width: 100%;
    // padding-left: 30px;
    // border: 1px solid red;

    ::v-deep .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
    }
    ::v-deep .el-tabs__active-bar {
        background-color: var(--themeColor);
    }
    ::v-deep .el-tabs__item.is-active {
        color: var(--themeColor);
    }
    ::v-deep .el-tabs__header{
        margin:0;
    }

    ::v-deep .el-tabs__content{ 
    position: absolute;
    top:90px;
    bottom: 60px;
    left: 210px;
    right: 0px;
    overflow-y: auto;
    background-color: #fff;
  }
}
</style>
