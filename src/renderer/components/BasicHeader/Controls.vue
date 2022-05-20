<template>
    <div class="arrows_group">
        <div class="arrows" @click="back">
            <a-icon type="left" />
        </div>
        <div class="arrows" @click="forward">
            <a-icon type="right" />
        </div>
        <div class="arrows" @click="refresh">
            <a-icon type="reload" />
        </div>
    </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
    methods: {
        back() {
            this.$router.go(-1);
        },
        forward() {
            this.$router.go(1);
        },
        refresh() {
            eventBus.$emit("refresh");
        },
    },
};
</script>

<style lang="less" scoped>
.arrows_group{
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .arrows{
        width: 30%;
        cursor: pointer;
    }
}
</style>
