// pages/person/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showuserInfo : false,


  },
  ongetUserInfo: function(e){
    console.log(e)
    const self = this

    wx.getSetting({
      success(res){
        console.log(res)
        if (!res.authSetting["scope.userInfo"]){




          //说明没有授权过
          /*wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.getUserInfo({
                
              })
            }
          })*/

          

        }else{
          //有授权的
        }
      }
    })
  },

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
  onShareAppMessage: function (options) {
    return {
      title: '黑猫充电',
      path: 'pages/all/index'
    }

  }
})