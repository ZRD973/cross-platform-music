<template>
    <div class="slider_wrapper">
        <div class="slider_title">
            <span>{{title}}</span>
        </div>
        <div class="slider_tab"> 
            <span class="index_tab__item" v-for="(item,index) in tab"  :class="[ index==current ? 'active':'']" @click="chooseTab(item,index)">
                {{item.name}}
            </span>
        </div>

        <div class="mod_slide">
            <ul class="mod_slide_list">
                <li v-for="item in data" class="mod_slide_item">
                    <div class="mod_slide_item_box" @click="handleClick(item)"> 
                        <div class="mod_slide_item_cove">
                            <el-image class="img" :src="item.cover || item.cover_url_medium" fit="fill">
                                <div slot="error" class="image-slot">
                                    <img class="img" :src="errorImg" alt="解析出错">
                                </div>
                            </el-image>
                            <i class="mod_cover__mask"></i>
                            <i class="mod_cover__icon_play"></i>
                        </div>
                        <div class="mod_slide_item_title">
                            <span class="playlist__title_txt">{{item.title}}</span>
                        </div>
                        <div class="mod_slide_item_other">播放量：{{item.listen_num || item.access_num}}</div>
                    </div>
                </li>
            </ul>
            <div class="prev_button" @click="prev_button"> <i class="el-icon-arrow-left"></i></div>
            <div class="next_button" @click="next_button"> <i class="el-icon-arrow-right"></i></div>
        </div>

        <div class="mod_slide_switch">
            <i v-for="(item,index) in num"  @click="slideSwitch(index)" :class="[ index==number ? 'slide_switch__item--current':'']" class="slide_switch__item"></i>
        </div>


    </div>
</template>
<script>
import errorImg from "@/assets/images/playlist_error.png";
export default {
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        tab: {
            type: Array,
            default() {
                return [];
            },
        },
        title:String,
    },
    data(){
        return{
            number:0,
            errorImg,
            current:0
        }
    },
    methods:{
        handleClick(item){
            this.$emit("click",item)
        },
        chooseTab(item,index){
            this.number = 0;
            $('.mod_slide_list').css({'left': '0%'})
            this.current = index;
            this.$emit("chooseTab",item)
        },
        slideSwitch(index){
            this.number = index;
            $('.mod_slide_list').css({'left': '-' + index + '00%'})
        },
        prev_button(){
            this.number--;
            if(this.number==-1){
                this.number = this.num - 1
            }
            $('.mod_slide_list').css({'left': '-' + this.number + '00%'})
        },
        next_button(){
            this.number++;
            if(this.number==this.num){
                this.number = 0
            }
            $('.mod_slide_list').css({'left': '-' + this.number + '00%'})
        }
    },
   computed:{
       num:{
           get(){
               return Math.ceil(this.data.length / 5)
           },
       }
   }
};
</script>

<style lang="less">
.slider_wrapper {
    // max-width: 1200px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    .slider_title {
        position: relative;
        padding: 10px 0;
        font-size: 24px;
        font-weight: 600;
    }
    .slider_tab {
        // margin-bottom: 10px;
        height: 50px;
        font-size: 0;
        .index_tab__item{
            cursor: pointer;
            display: inline-block;
            font-size: 15px;
            margin-right: 24px;
            color: #333;
            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .active{
            color: var(--themeColor);
        }
    }
    .mod_slide {
        overflow: hidden;
        margin-bottom: 20px;
        margin-right: -20px;
        .mod_slide_list {
            position: relative;
            font-size: 0;
            width: 1250%;
            transition: 0.5s;
            left: 0%;
            .mod_slide_item {
                position: relative;
                width: 1.6%;
                padding-bottom: 0;
                display: inline-block;
                overflow: hidden;
                font-size: 14px;
                vertical-align: top;
                list-style: none;
                border-radius: 5%;
                .mod_slide_item_box {
                    margin-right: 20px;
                    border-radius: 5%;
                    .mod_slide_item_cove {
                        position: relative;
                        display: block;
                        overflow: hidden;
                        padding-top: 100%;
                        margin-bottom: 15px;
                        zoom: 1;
                        border-radius: 5%;
                        cursor: pointer;
                        .img {
                            height: 100%;
                            object-fit: cover;
                            transform: scale(1) translateZ(0);
                            transition: transform 0.75s;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            border-radius: 5%;
                        }
                        .mod_cover__mask{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            background-color: #000;
                            opacity: 0;
                            transition: opacity .5s;
                            border-radius: 5%;
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

                    }
                    .mod_slide_item_cove:hover .img{
                       transform: scale(1.1);
                    }
                    .mod_slide_item_cove:hover .mod_cover__mask{
                        opacity: 0.2;
                    }
                    .mod_slide_item_cove:hover .mod_cover__icon_play{
                        opacity: 1;
                        transform: scale(0.9);
                    }
                    .mod_slide_item_title{
                        overflow: hidden;
                        font-size: 100%;
                        cursor: pointer;
                        .playlist__title_txt{
                            float: left;
                            max-width: 100%;
                            font-weight: 400;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            line-height: 22px;
                            max-height: 44px;
                            white-space: nowrap;
                            font-size: 14px;
                        }
                    }
                    .mod_slide_item_other{
                        cursor: pointer;
                        color: #999;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        height: 22px;
                        font-size: 14px;
                    }
                }
            }
        }
        .prev_button,
        .next_button{
            font-size: 50px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            transition-duration: .5s;
            background-color: rgba(163, 161, 161, 0.5);
        }
        .prev_button{
            left: -10%;
        }
        .next_button{
            right: -10%;
        }

    }
    .mod_slide_switch{
        width: 100%;
        text-align: center;
        font-size: 0;
        .slide_switch__item{
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 10px;
            border-radius: 50%;
            margin: 0 10px;
            background: transparent;
            cursor: pointer;
            background-color: rgba(0,0,0,.3);
        }
        .slide_switch__item--current{
            background-color: rgba(0,0,0,.6);
        }
    }
}
.slider_wrapper:hover .prev_button{
    left: 0;
}
.slider_wrapper:hover .next_button{
    right: 0;
}
</style>
