<template>
  <div class="tab-wrapper">
    <header id="tab-header" class="fixed">
      <span class="title">{{ data.title }}</span>
      <div class="tab-list">
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="item in data.list"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </header>
    <main class="tab-view">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    data: {
      type: Object,
      default() {
        return {
          title: "",
          list: []
        };
      }
    }
  },
  data() {
    return {
      activeName: null
    };
  },
  methods: {
    setActiveName() {
      this.activeName = this.data.list.length && this.data.list[0]["name"];
    }
  },
  watch: {
    activeName(val) {
      this.$router.push({ name: val });
    }
  },
  created() {
    this.setActiveName();
  }
};
</script>

<style scoped lang="less">
.tab-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  #tab-header {
    background-color: #F5F5F7;
    & .title {
      color: black;
      font-size: 30px;
      font-weight: 600;
      font-family: "source-beauty";
    }
    .tab-list {
      /deep/ .el-tabs__item {
        color: black;
        font-family: "source-beauty";
      }
      /deep/ .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: transparent;
        z-index: 1;
      }
    }
  }
  .tab-view{
    padding: 10px;
  }
}
.fixed {
  position:sticky;
  top: 0px;
  z-index: 999;
}
::v-deep .el-tabs__item.is-active{
  color: var(--themeColor) !important;
}
::v-deep .el-tabs__active-bar{
  background-color: var(--themeColor) !important;
}
::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: flex-start !important;
}
</style>
