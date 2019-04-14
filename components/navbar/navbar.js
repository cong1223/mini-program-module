const app = getApp();
Component({
  properties: {
    //小程序页面的标题
    title: {
      type: String,
      default: '标题'
    },
    // 标题字体颜色
    color: {
      type: String,
      default: ''
    },
    //返回和主页按钮是普通形状还(common)是胶囊形状(capsule)
    mode: {
      type: String,
      default: 'capsule'
    },
    //是否要显示返回按钮
    back: {
      type: Boolean,
      default: true
    },
    //左侧是否显示标题
    leftText: {
      type: String,
      default: '左侧标题部分'
    }
  },

  data: {
    statusBarHeight: 0,
    titleBarHeight: 0
  },

  ready: function () {
    // 因为很多地方都需要用到，所有保存到全局对象中
    if (app.globalData && app.globalData.statusBarHeight && app.globalData.titleBarHeight) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight
      });
    } else {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          if (!app.globalData) {
            app.globalData = {}
          }
          if (res.model.indexOf('iPhone') !== -1) {
            app.globalData.titleBarHeight = 44
          } else {
            app.globalData.titleBarHeight = 48
          }
          app.globalData.statusBarHeight = res.statusBarHeight
          that.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
          });
        },
        fail(error) {
          console.log(error)
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      })
    }
  },

  methods: {
    headerBack() {
      wx.navigateBack({
        delta: 1,
        fail(e) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    },
    headerHome() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
})
