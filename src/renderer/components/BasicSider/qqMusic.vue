<template>
    <a-menu
        mode="inline"
        :selectable="false"
        :defaultOpenKeys="['playlist_create']"
    >
      <a-menu-item key="1" 
        @click="enterQQ"
        style="padding: 8px 16px !important;
        font-size: 14px;
        line-height: 1.5;">
        <span>QQ音乐</span>
      </a-menu-item>
    </a-menu>
</template>

<script>
import { mapGetters } from "vuex";
import ZIcon from "@/components/ZIcon";
import PlaylistCreate from "@/components/Playlist/Create.vue";
export default {
    data() {
        return {
            visible: false,
            loading: false,
            formData: {
                name: "",
                privacy: false,
            },
        };
    },
    components: {
        ZIcon,
        PlaylistCreate,
    },
    computed: {
        ...mapGetters("User", ["userId", "createdList", "likedsongIds"]),
    },
    methods: {
        enterQQ(){
            if(!this.$route.meta.QQ){
                this.$router.push({path: "/featured"})
            }

        },
    },
};
</script>
<style lang="less" scoped>
.ant-menu-item:hover, :hover {
    color:var(--themeColor);
}
</style>
