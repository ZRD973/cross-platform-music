let qqRoutes = [
    {
        path: "/qqMusic",
        name: "qqMusic",
        component: () => import(/* webpackChunkName: "qqMusic" */ "@/views/qqMusic/index.vue"),
        // component: function (resolve) { require(["@/views/qqMusic/index.vue"], resolve); },
        redirect: "/featured",
        meta:{
            title:"qqMusic"
        },
        children: [
            // 音乐馆 -------------------
            {
                path: "/featured",
                name: "featured",
                component:() => import("@/views/qqMusic/musicHall/featured.vue"),
                meta:{ QQ:true }
            },
            {
                path: "/qqRank",
                name: "qqRank",
                component:() => import("@/views/qqMusic/musicHall/rank.vue"),
                meta:{ QQ:true }
            },
            {
                path: "/qqSinger",
                name: "qqSinger",
                component:() => import("@/views/qqMusic/musicHall/singer.vue"),
                meta:{ QQ:true }
            },
            {
                path: "/qqCategory",
                name: "qqCategory",
                component:() => import("@/views/qqMusic/musicHall/category.vue"),
                meta:{ QQ:true }
            },


            // 视频-------------------
            {
                path: "/qqVideoRecommend",
                name: "qqVideoRecommend",
                component:() => import("@/views/qqMusic/video/videoRecommend.vue"),
                meta:{ QQ:true }
            },
            {
                path: "/qqVideoRank",
                name: "qqVideoRank",
                component:() => import("@/views/qqMusic/video/qqVideoRank.vue"),
                meta:{ QQ:true }
            },
            {
                path: "/qqVideolibrary",
                name: "qqVideolibrary",
                component:() => import("@/views/qqMusic/video/qqVideolibrary.vue"),
                meta:{ QQ:true }
            },


            
        ]
    },
    {
        path: "/qqDetail",
        name: "qqDetail",
        component:() => import("@/views/qqMusic/detail.vue"),
        meta:{ QQ:true }
    },
    {
        path: "/qqRankDetail",
        name: "qqRankDetail",
        component:() => import("@/views/qqMusic/rankDetail.vue"),
        meta:{ QQ:true }
    },
    {
        path: "/qqDiskDetail",
        name: "qqDiskDetail",
        component:() => import("@/views/qqMusic/diskDetail.vue"),
        meta:{ QQ:true }
    },
];

export { qqRoutes };
