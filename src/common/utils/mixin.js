export const globalMixin = {
  // rpx转px
  methods: {
    rpxToPx(rpx) {
      const screenWidth = uni.getSystemInfoSync().screenWidth
      return (rpx * Number.parseInt(screenWidth)) / 750
    },
  },
  computed: {
    // 获取可使用窗口高度
    windowHeight() {
      return uni.getSystemInfoSync().windowHeight
    },
  },
}