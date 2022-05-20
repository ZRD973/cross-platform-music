import ls from "store";
const state = {
    primaryColor:"#c62f2f",
    primaryTextColor:"black",
    isChangingColor: false,
    redirect: "/home",
    partRefreshFlag: false,
    isShowVisual: false,
    isOnline: navigator.onLine,
    noLimitRoutes: ["music_local", "music_download", "setting"],
    platform: process.platform,
};

const mutations = {
    CHANGE_COLOR(state, commitColor) {
        state.primaryColor = commitColor.color;
        state.primaryTextColor = commitColor.textColor;
        ls.set("DEFAULT_COLOR", commitColor);
    },
    SET_IS_CHANGING_COLOR(state, status) {
        state.isChangingColor = status;
    },
    SET_REDIRECT(state, url) {
        state.redirect = url;
    },
    SHOW_VIEW(state, flag) {
        state.isShowVisual = flag;
    },
    SET_ONLINE(state, flag) {
        state.isOnline = flag;
    },
};

const actions = {
    toggleColor({ commit }, color) {
        commit("CHANGE_COLOR", color);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
