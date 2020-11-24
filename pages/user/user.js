// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //点击登录
  login:function(e){
    wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          wx.setStorage({
            key:"token",
            data:res.code
          }),
          //发起网络请求
          wx.request({
            url: 'http://weixin.com/xcx/login',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // login:function(){
    //获取用户信息
  //   console.log(111)
  //   wx.getUserInfo({
  //     success: res=>{
  //       console.log(res)
  //     },
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})