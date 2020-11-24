//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    background: ['/images/discount-banner.jpg', '/images/draw-banner.jpg', '/images/nursing-banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    list:[],
    page:1,
    pagesize:10
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function(){
    this.data.page++;
    this.getGoodsList();
  }, 
  getGoodsList:function(){
    //获取商品数据
    let _this = this
    wx.request({
      url: 'http://weixin.com/xcx/goodslist', //仅为示例，并非真实的接口地址
      data: {
       page:_this.data.page,
       size:_this.data.pagesize
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res)
        let new_list = _this.data.list.concat(res.data.data.goods)
        _this.setData({
          list:new_list
        })
      }
    })
  },
  onLoad: function () {
    this.getGoodsList();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  catchTap:function(e){
    let goodsId = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url:"/pages/detail/detail?goods_id="+goodsId
    })
  }
})
