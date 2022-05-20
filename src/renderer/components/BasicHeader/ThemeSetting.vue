<template>
    <a-popover
        v-model="themeVisible"
        trigger="click"
        placement="bottom"
        :autoAdjustOverflow="true"
        overlayClassName="user-wrapper"
        :overlayStyle="{ width: '240px', top: '50px' }"
    >
        <template slot="content">
            <div class="colorBlock">
                <li
                    class="color-item"
                    v-for="(item, index) in colorList"
                    :key="index"
                    :style="'background-color: ' + item.color"
                    @click="changeColor(item.color,item.key)"
                >
                    <z-icon type="wangyiyunyinle1" class="z-icon"></z-icon>
                    <div class="name">{{ item.key }}</div>
                    <a-icon
                        type="check-circle"
                        class="a-icon"
                        :style="'background-color: ' + item.color"
                        v-if="primaryColor === item.color"
                    />
                </li>
            </div>
        </template>
        <a-icon type="skin" class="icon" />
    </a-popover>
</template>

<script>
import { mapState } from "vuex";
import ZIcon from "@/components/ZIcon";
import { colorList } from "@/config/config";
import config from "@/config/defaultSettings";
import ls from "store";
import { updateTheme } from './change'

export default {
    data() {
        return {
            themeVisible: false,
            colorList,
            defaultSettings: Object.assign({}, config),
            commitColor:{
                color:"",
                textColor : 'black'
            },
            isSameColor:""
        };
    },
    components: {
        ZIcon,
    },
    computed: {
        ...mapState("App", ["primaryColor","primaryTextColor"]),
    },
    created() {
        // 当主题色不是默认色时，才进行主题编译
        if (this.primaryColor !== config.primaryColor) {
            if(!this.primaryColor){
                this.changeColor(config.primaryColor, this);
            }else{
                this.changeColor(this.primaryColor, this);
            }
            
        }
    },
    methods: {
        changeColor(color, name) {
            this.defaultSettings.primaryColor = color;
            if (this.textColor !== color) {
                this.commitColor.color = color;
                document.getElementsByTagName("body")[0].style.setProperty(`--themeColor`, color);
                if(name == "酷黑"){
                    this.commitColor.textColor = "white";
                    document.getElementsByTagName("body")[0].style.setProperty(`--themeTextColor`, this.commitColor.textColor);
                }else{
                    this.commitColor.textColor = "black";
                    document.getElementsByTagName("body")[0].style.setProperty(`--themeTextColor`, this.commitColor.textColor);
                }
                this.$store.commit("App/CHANGE_COLOR", this.commitColor);

                this.updateTheme(color,this);
                this.textColor = color;
            }
        },
        updateTheme(primaryColor,data) {
            updateTheme(primaryColor,data)
        },
    },
};
</script>

<style lang="less" scoped>
.colorBlock {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .color-item {
        position: relative;
        width: 60px;
        height: 60px;
        cursor: pointer;
        margin-bottom: 10px;
        color: #fff;
        .name {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding-left: 4px;
            line-height: 20px;
            background: rgba(0, 0, 0, 0.2);
            font-size: 11px;
        }
        .a-icon {
            position: absolute;
            right: -6px;
            bottom: -6px;
            font-size: 22px;
            border-radius: 50%;
            color: #fff;
        }
        .z-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 40px;
            opacity: 0.9;
        }
    }
}
</style>
