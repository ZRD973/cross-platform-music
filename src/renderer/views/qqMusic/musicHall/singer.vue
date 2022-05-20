<template>
    <div class="singer_wrapper">
        <div class="singer_wrapper_filter">
            <div v-for="(option,type) in options" class="filter_row">
                <div type="text"
                    v-for="(item,subIndex) in option" :key="subIndex" @click="optionChange(type,item)">
                    <span class="filter_row_item" 
                    :class="{active:(item.id == pageData.area && type=='area') || (item.id == pageData.genre && type=='genre')
                    || (item.id == pageData.index && type=='index') || (item.id == pageData.sex && type=='sex') }">
                    {{ item.name }}</span>
                </div>
            </div>
        </div>
        <div class="artists">
            <div v-for="item in artists" :key="item.id" class="image" >
                <img :src="item.singer_pic" alt="" />
                <div class="text">{{ item.singer_name }}</div>
            </div>
        </div>
        <div class="btn">
            <el-button-group>
                <el-button type="success" plain @click="loadMore('pre')" icon="el-icon-arrow-left">上一页</el-button>
                <el-button type="success" plain @click="loadMore('next')">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
            </el-button-group>
        </div>
    </div>

</template>

<script>
export default {
    name: "qqRecommend",
    components: {},
    data() {
        return {
            pageData:{
                area:-100, // 地区，默认 
                genre: -100, //风格，默认 -100
                index: -100,// 首字母，默认 -100
                sex: -100,//性别/组合，默认 -100
                pageNo: 1,//默认 1
            },
            options:[],
            artists:[],

        };
    },
    methods: {
        optionChange(type,item){
            switch (type) {
                case 'area':this.pageData.area = item.id
                    break;
                case 'genre':this.pageData.genre = item.id
                    break;
                case 'index':this.pageData.index = item.id
                    break;
                case 'sex':this.pageData.sex = item.id
                    break;
                default:
                    break;
            }
            this.getSingers();
        },
        async getOptions(){
            let res = await this.$request.get("/singer/category",{ baseURL: 'http://127.0.0.1:3300', });
            this.options = res.data;
        },
        async getSingers(){
            let res = await this.$request.get("/singer/list",{ baseURL: 'http://127.0.0.1:3300',params: { ...this.pageData }, });
            this.artists = res.data.list;
            console.log(res);
        },
        loadMore(type){
            if(type=="pre" && this.pageData.pageNo>1){
                this.pageData.pageNo--
                this.getSingers();
            }
            if(type=="next" && !(this.artists.length<80)){
                this.pageData.pageNo++
                this.getSingers();
            }
        }
    },
    computed: {},
    created() {
        this.getOptions();
        this.getSingers();
    },
};
</script>

<style lang="less" scoped>
.singer_wrapper{
    width: 100%;
    .singer_wrapper_filter{
        width: 100%;
        height: 100%;
        .filter_row{
            display: flex;
            flex-wrap: nowrap;
            height: 30px;
            margin: 10px 0px;
            .filter_row_item{
                margin: 0 4px;
                padding: 2px 5px;
                cursor: pointer;
                white-space:nowrap;
            }
            .filter_row_item:hover{
                color: #31C27C;
            }
        }
    }
    .artists{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 20px 0;

        .image{
            border-radius: 50%;
            
            img{
                border-radius: 50%;
                margin:10px 10px;
                width: 150px;
                height: 150px;
                cursor: pointer;
            }
            .text{
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                margin-bottom:10px;
                cursor: pointer;
            }
        }
        .image:hover .text{
            color: #31C27C;
        }
    }
}
.btn{
    display: flex;
    justify-content: center;
}
.active{
    background-color: #31C27C;
    color: white !important;
}
</style>
