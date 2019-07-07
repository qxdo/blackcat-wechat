// pages/all/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   * 经纬度，是否显示地图
   * 以及地图的控件，包括控制控件和地图点
   */
  data: {
    longitude: 0,
    latitude: 0,
    showmap: false,
    controls: null,
    markers: null,
    url: null


  },
  //吊起微信的扫码功能
  scan: function(){
    const self = this
    wx.scanCode({
      success(res) {
        console.log("result：" +res.result)
        self.charge(res.result)
      }
    })
  },
  //从URL中解析出来目标数据
  parseCode: function (url) {
    const FAST = 'https://bestblackcat.com/device/'
    const SLOW = 'https://bestblackcat.com/slow-device/'
    let id
    let pos = ''
    let type
    console.log(url)
    if (url.indexOf(FAST) === 0) {
      id = url.slice(32)
      type = 'FAST'
    } else if (url.indexOf(SLOW) === 0) {
      type = 'SLOW'
      let data = url.slice(37).split('-')
      id = data[0]
      pos = data[1] || ''
    }
    if (id && /^\d+$/.test(id)) {
      return {
        id,
        pos,
        type
      }
    }
  },
  charge: function(url){
    let self = this
    console.log( "charge:"+url)
    let data  =  self.parseCode(url)
    if(data != null || data!= undefined){
      console.log(data)
      wx.navigateTo({
        url: '/pages/charger/start',
        data: data
      })
    }else{
      wx.showToast({
        title: '解析二维码失败！',
        icon: 'none'
      })
      return
    }
  },
  handleControlTap: function(e){
    const self = this
    console.log(e.controlId)
    switch (e.controlId) {
      case 'location':
        console.log('catch location event')
        break
      case 'trouble':
        console.log('catch trouble event')
        wx.navigateTo({
          url: '/pages/trouble/index',
        })
        break
      case 'scan':
        console.log('catch scan event')
        self.scan()
        break
      default:
        break
    }

  },
  goPay: function () {
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  initMap: function () {
    console.log("initMap...")
    let self = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        self.setData({ longitude: res.longitude })
        self.setData({ latitude: res.latitude })
        self.setData({ showmap: true })
      },
      error: function (res) {
        console.log("Error...", res)
      }
    })
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        self.setData({ x: res.screenWidth /2 -30})
        self.setData({ y: res.screenHeight/2 -30})
      },
    })
    
  },
  drawControls: function(width,height){
    let self = this

    console.log("drawControls")
    let controls = [
      {
        id: 1,
        iconPath: '../assets/images/icon-center.png',
        position: {
          left: width / 2 - 20,
          top: height / 2 - 80,
          width: 40,
          height: 40
        }
      },
      {
        id: 'location',
        iconPath: '../assets/images/icon-location.png',
        position: {
          top: height - 230,
          left: 15,
          width: 40,
          height: 40
        },
        clickable: true
      },
      /*
      {
        id: 'profile',
        iconPath: '../assets/images/icon-person.png',
        position: {
          top: height - 250,
          left: width - 60,
          width: 40,
          height: 40
        },
        clickable: true
      },*/
      {
        id: 'trouble',
        iconPath: '../assets/images/icon-setting.png',
        position: {
          top: height- 230 ,
          left:  width -55,
          width: 40,
          height: 40
        },
        clickable: true
      },
      {
        id: 'scan',
        iconPath: '../assets/images/icon-scan.png',
        position: {
          top: height - 290,
          left: width / 2 - 60,
          width: 120,
          height: 120
        },
        clickable: true
      }
    ]
    console.log(controls)
    controls.forEach(item => {
      item.position.top -= 60
    })
    self.setData({controls: controls})
    console.log(controls)
  },
  drawMarkers: function (longitude, latitude){
    console.log("drawMarkers...")
    const self = this
    console.log(longitude, latitude)
    wx.request({
      url: 'https://apitest.bestblackcat.com/api/chargers',
      data: {
        latitude,
        longitude,
        type: this.activeIndex
      },
      header: {
        'X-Cat-Server-Version': '0.0.2',
        Authorization: ''
      },
      success:function(res){
        console.log(res)
        const self = this
        if(res.data){
          let markers = res.data;
          markers = list.map(item => {
            return {
              item,
              width: 40,
              height: 40,
              iconPath: '../assets/images/icon-marker.png'
            }
          })
          self.setData({ markers: markers })
        }
       
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    let windowWidth = 0;
    let windowHeight = 0;
    self.initMap()
    wx.getSystemInfo({
      success: function(res) {
        self.drawControls(res.screenWidth,res.screenHeight)
      },
    })
    console.log(self.latitude ,self.longitude)
    self.drawMarkers(121.400809, 31.123729)

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
    console.log("share...")

  }
})