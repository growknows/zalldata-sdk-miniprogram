
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad() {

  },
  // 开启分享, 此时可上报分享事件
  onShareAppMessage() {
        return {
            title: '埋点采集',
            path: "pages/sensors/index"
        }
  },
  onLogin() {
        getApp().sensors.registerApp({
            $distinctIdType: 3
        })
        getApp().sensors.login('123456')
  },
  onTrack() {
    getApp().sensors.track('MemberRegister', {content: '他是谁'})
  },

  onChange() {
    getApp().sensors.registerApp({
        $platform: 'miniapp'
    })
  },
  onChangeProfile() {
    getApp().sensors.setProfile({
        $title: '你好'
    })
  }
})
