<template>
    <div class="wrapper">
        <tab :data="tabData" ref="tabWrapper" />
    </div>
</template>

<script>
import tab from "#/common/tab.vue";
export default {
    name: "qqMusichall",
    components: { tab },
    data() {
        return {
            tabData: {
                title: "音乐馆",
                list: [
                    {
                        label: "精选",
                        name: "featured",
                    },
                    {
                        label: "排行",
                        name: "qqRank",
                    },
                    {
                        label: "歌手",
                        name: "qqSinger",
                    },
                    {
                        label: "分类歌单",
                        name: "qqCategory",
                    },
                    // {
                    //     label: "数字专辑",
                    //     name: "album",
                    // },
                    // {
                    //     label: "有声节目",
                    //     name: "sound",
                    // },
                ],
            },
        };
    },
    methods: {},
    computed: {},
    created() {},
};
</script>

<style lang="less" scoped>
.wrapper{
    padding-left: 30px;
}
</style>
