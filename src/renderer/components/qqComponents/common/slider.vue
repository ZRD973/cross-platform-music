<template>
  <el-carousel
    :interval="3000"
    type="card"
    height="200px"
  >
    <el-carousel-item v-for="(item,index) in images" :key="item.id">
      <img class="medium" :src="item.picUrl" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "slider",
  props:{
    images:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  created(){},
  data() {
    return {}
  }
};
</script>

<style scoped lang="less">
.el-carousel__item img {
  height: 100%;
  line-height: 200px;
  margin: 0;
}
</style>
