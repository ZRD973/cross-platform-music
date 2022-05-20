<template>
    <div class="wrapper">
         <div>推荐123</div>
    </div>
</template>

<script>
export default {
    name: "qqRecommend",
    components: {},
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
    },
    computed: {},
    created() {},
};
</script>

<style lang="less" scoped>
#wrapper{
    width: 100%;
    height: 100%;
    .el-menu{
        position: sticky;
        top: 0;
        display: flex;
        justify-content: center;
    }
    .main{
        border: 1px solid red;
        padding: 10px;
        width: 100%;
    }
}
</style>
