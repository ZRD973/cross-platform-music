<template>
<div>
    <div v-for="item in allRank">
        <div class="header">{{item.title}}</div>
        <div class="listCard" >
            <!-- sub.value || sub.topId -->
            <div class="listCardItem" v-for="sub in item.list" @click="clickListCardItem(sub)" >
                <div class="image">
                    <img :src="(sub.picUrl || sub.coverImgUrl) + '?param=400y400'" alt="" />
                </div>
                <div class="playNUm">
                    <i class="el-icon-headset"></i>
                    {{(sub.listenNum/10000).toFixed(1)}} 万</div>
                <i class="mod_cover__icon_play"></i>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "qqRecommend",
    data() {
        return {
            allRank:[],
        };
    },
    methods: {
        clickListCardItem(sub) {
            this.$router.push({
                path:'/qqRankDetail',
                query:sub
            })        
            console.log(sub);
        },
       
    },
    async created() {
        let res = await this.$request.get("/top/category", {
            baseURL: "http://127.0.0.1:3300",
        });
        this.allRank = res.data;
    },
    watch: {
       
    },
};
</script>

<style lang="less" scoped>
.header{
    font-size: 22px;
    font-weight: 600;
}
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
    bottom: 10px;
    z-index: 9999;
    color: white;
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

.title {
    margin-top: 8px;
    padding: 0 2px;
    font-size: 12px;
    color: black;
    line-height: 17px;
    /* 两行溢出 */
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
