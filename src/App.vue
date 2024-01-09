<script>
export default {
  globalData: {
    query: undefined,
    userInfo:undefined,
    userId:undefined
  },
  onLaunch: function (options) {
    console.log("App onLaunch", options);
    this.globalData.query=options.query;
    // 首次登陆
    this.$store
      .dispatch("Login")
      .then((res) => {
        console.log("登陆");
      })
      .catch(() => {
        uni.reLaunch({
          url: "/pages/services/index",
        });
      });
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "vant/lib/index.css";
@import "static/css/common.css";
scroll-view ::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
}
.van-toast{
  z-index: 1000 !important;
}
</style>
