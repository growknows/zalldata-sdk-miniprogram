
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
        getApp().zalldata.registerApp({
            $distinctIdType: 3,
            $originalIdType: 4
        })
        getApp().zalldata.login('123456')
  },
  onTrack() {
    getApp().zalldata.track('MemberRegister', {content: '他是谁'})
  },

  onChange() {
    getApp().zalldata.registerApp({
        $platform: 'miniapp'
    })
  },
  onChangeProfile() {
    getApp().zalldata.setProfile({
        $title: '你好'
    })
  }
})
