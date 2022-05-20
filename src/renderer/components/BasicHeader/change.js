let lessNodesAppended;
const updateTheme = (primaryColor,_this) => {
  // Determine if the component is remounted
  if (!primaryColor) {
    return;
  }
  // console.info(`正在编译主题!`)
  function buildIt() {
    // 正确的判定less是否已经加载less.modifyVars可用
    if (!window.less || !window.less.modifyVars) {
      return;
    }
    // less.modifyVars可用
    window.less.modifyVars({
      '@primary-color': primaryColor,
    }).then(() => {
      // _this.$message.success("主题更改成功!");
    }).catch(() => {
      _this.$message.error("主题更新失败!");
    });
  }
  if (!lessNodesAppended) {
    const lessStyleNode = document.createElement('link');
    const lessConfigNode = document.createElement('script');
    const lessScriptNode = document.createElement('script');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', process.env.BASE_URL +'color.less');
    console.log(process.env.BASE_URL);
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `;
    lessScriptNode.src = process.env.BASE_URL +'less.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      buildIt();
      lessScriptNode.onload = null;
    };
    document.head.appendChild(lessStyleNode);
    document.head.appendChild(lessConfigNode);
    document.head.appendChild(lessScriptNode);
    lessNodesAppended = true;
  } else {
    buildIt();
  }
};

const updateColorWeak = colorWeak => {
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
};

export { updateTheme, updateColorWeak }